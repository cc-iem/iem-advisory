#!/usr/bin/env python3

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


NUMBERED_DUPLICATE_PATTERN = re.compile(
    r"^(?P<stem>.+) (?P<index>[2-9][0-9]*)(?P<suffix>(?:\.[^/]+)?)$"
)
COPY_DUPLICATE_PATTERN = re.compile(
    r"^(?P<stem>.+) (?P<label>copy|Copy)(?P<suffix>(?:\.[^/]+)?)$"
)


@dataclass(frozen=True)
class DuplicateFinding:
    offending_path: str
    canonical_path: str
    scope: str
    resolution_class: str

    def to_line(self) -> str:
        return "\t".join(
            (
                "duplicate",
                self.scope,
                self.resolution_class,
                self.offending_path,
                self.canonical_path,
            )
        )


def _run_git(repo_root: Path, *args: str, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(
        ["git", *args],
        cwd=str(repo_root),
        check=check,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=False,
    )


def _git_path_set(repo_root: Path, *args: str) -> list[str]:
    result = _run_git(repo_root, *args)
    raw_items = [item.decode("utf-8") for item in result.stdout.split(b"\0") if item]
    unique_items = []
    seen = set()
    for item in raw_items:
        if item in seen:
            continue
        seen.add(item)
        unique_items.append(item)
    return unique_items


def _changed_worktree_paths(repo_root: Path) -> list[str]:
    paths = []
    seen = set()
    for args in (
        ("ls-files", "-o", "--exclude-standard", "-z"),
        ("ls-files", "-d", "-z"),
        ("diff", "--cached", "--name-only", "-z"),
    ):
        for path_text in _git_path_set(repo_root, *args):
            if path_text in seen:
                continue
            seen.add(path_text)
            paths.append(path_text)
    return paths


def _tracked_paths(repo_root: Path) -> list[str]:
    return _git_path_set(repo_root, "ls-files", "-z")


def _path_exists(path: Path) -> bool:
    return path.exists() or path.is_symlink()


def _normalize_repo_relative_path(path_text: str) -> str:
    path = Path(path_text)
    if path.is_absolute():
        raise ValueError(f"target must be repo-relative: {path_text}")

    normalized_parts = []
    for part in path.parts:
        if part in ("", "."):
            continue
        if part == "..":
            raise ValueError(f"target must stay within repo root: {path_text}")
        normalized_parts.append(part)
    if not normalized_parts:
        raise ValueError("target must not be empty")
    return Path(*normalized_parts).as_posix()


def duplicate_canonical_path(path_text: str) -> str | None:
    relative_path = Path(path_text)
    for pattern in (NUMBERED_DUPLICATE_PATTERN, COPY_DUPLICATE_PATTERN):
        match = pattern.match(relative_path.name)
        if match is None:
            continue
        canonical_name = f"{match.group('stem')}{match.group('suffix')}"
        return relative_path.with_name(canonical_name).as_posix()
    return None


def _read_file_bytes(path: Path) -> bytes:
    return path.read_bytes()


def _is_same_target_symlink(left: Path, right: Path) -> bool:
    return left.is_symlink() and right.is_symlink() and os.readlink(left) == os.readlink(right)


def _is_exact_duplicate_path(candidate_path: Path, canonical_path: Path) -> bool:
    if _is_same_target_symlink(candidate_path, canonical_path):
        return True

    if candidate_path.is_symlink() or canonical_path.is_symlink():
        return False

    if not candidate_path.is_file() or not canonical_path.is_file():
        return False

    return _read_file_bytes(candidate_path) == _read_file_bytes(canonical_path)


def _path_mtime_ns(path: Path) -> int:
    return path.lstat().st_mtime_ns


def _select_newest_candidate(
    canonical_path_text: str,
    candidate_paths: list[tuple[str, Path]],
) -> tuple[str, Path]:
    return max(
        candidate_paths,
        key=lambda item: (
            _path_mtime_ns(item[1]),
            1 if item[0] == canonical_path_text else 0,
            item[0],
        ),
    )


def classify_duplicate_path(repo_root: Path, path_text: str, scope: str) -> DuplicateFinding | None:
    offending_path = _normalize_repo_relative_path(path_text)
    canonical_path = duplicate_canonical_path(offending_path)
    if canonical_path is None:
        return None

    offending_abspath = repo_root / offending_path
    canonical_abspath = repo_root / canonical_path

    if scope == "worktree" and not _path_exists(offending_abspath):
        return None

    if not _path_exists(canonical_abspath):
        resolution_class = "promote_to_canonical"
    elif scope == "worktree":
        if _is_exact_duplicate_path(offending_abspath, canonical_abspath):
            resolution_class = "delete_duplicate"
        elif _path_mtime_ns(offending_abspath) > _path_mtime_ns(canonical_abspath):
            resolution_class = "promote_to_canonical"
        else:
            resolution_class = "delete_duplicate"
    elif _is_exact_duplicate_path(offending_abspath, canonical_abspath):
        resolution_class = "delete_duplicate"
    else:
        resolution_class = "manual_merge_required"

    return DuplicateFinding(
        offending_path=offending_path,
        canonical_path=canonical_path,
        scope=scope,
        resolution_class=resolution_class,
    )


def assert_path_available(repo_root: Path, target: str) -> DuplicateFinding | None:
    normalized_target = _normalize_repo_relative_path(target)
    canonical_path = duplicate_canonical_path(normalized_target)
    if canonical_path is not None:
        resolution_class = (
            "delete_duplicate" if _path_exists(repo_root / canonical_path) else "promote_to_canonical"
        )
        return DuplicateFinding(
            offending_path=normalized_target,
            canonical_path=canonical_path,
            scope="path",
            resolution_class=resolution_class,
        )
    return None


def _duplicate_findings(repo_root: Path, scope: str, path_iterable: list[str]) -> list[DuplicateFinding]:
    findings = []
    seen = set()
    for path_text in path_iterable:
        finding = classify_duplicate_path(repo_root, path_text, scope)
        if finding is None:
            continue
        if finding.offending_path in seen:
            continue
        seen.add(finding.offending_path)
        findings.append(finding)
    findings.sort(key=lambda item: item.offending_path)
    return findings


def _remove_path(path: Path) -> None:
    if path.is_dir() and not path.is_symlink():
        shutil.rmtree(path)
        return
    path.unlink()


def _group_duplicate_findings(findings: list[DuplicateFinding]) -> dict[str, list[DuplicateFinding]]:
    grouped = {}
    for finding in findings:
        grouped.setdefault(finding.canonical_path, []).append(finding)
    for item in grouped.values():
        item.sort(key=lambda finding: finding.offending_path)
    return grouped


def _reconcile_group(
    repo_root: Path, canonical_path_text: str, findings: list[DuplicateFinding]
) -> list[DuplicateFinding]:
    canonical_path = repo_root / canonical_path_text
    candidate_paths: list[tuple[str, Path]] = []

    if _path_exists(canonical_path):
        candidate_paths.append((canonical_path_text, canonical_path))

    for finding in findings:
        duplicate_path = repo_root / finding.offending_path
        if _path_exists(duplicate_path):
            candidate_paths.append((finding.offending_path, duplicate_path))

    if not candidate_paths:
        return []

    selected_rel, selected_path = _select_newest_candidate(canonical_path_text, candidate_paths)

    if selected_rel != canonical_path_text:
        if _path_exists(canonical_path):
            _remove_path(canonical_path)
        canonical_path.parent.mkdir(parents=True, exist_ok=True)
        os.replace(selected_path, canonical_path)

    for finding in findings:
        duplicate_path = repo_root / finding.offending_path
        if _path_exists(duplicate_path):
            _remove_path(duplicate_path)
    return []


def _build_delta_manifest(repo_root: Path, base_ref: str):
    full_diff = _run_git(
        repo_root,
        "diff",
        "--binary",
        "--no-ext-diff",
        "--find-renames=100%",
        f"{base_ref}..HEAD",
    ).stdout
    changed_paths = _git_path_set(
        repo_root,
        "diff",
        "--name-only",
        "-z",
        "--find-renames=100%",
        f"{base_ref}..HEAD",
    )
    per_path = {}
    for path_text in changed_paths:
        patch = _run_git(
            repo_root,
            "diff",
            "--binary",
            "--no-ext-diff",
            "--find-renames=100%",
            f"{base_ref}..HEAD",
            "--",
            path_text,
        ).stdout
        per_path[path_text] = hashlib.sha256(patch).hexdigest()
    return {
        "base_ref": base_ref,
        "head_sha": _run_git(repo_root, "rev-parse", "HEAD").stdout.decode("utf-8").strip(),
        "full_diff_sha256": hashlib.sha256(full_diff).hexdigest(),
        "paths": per_path,
    }


def _write_json(path: Path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def _load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def _assert_path_available_command(args):
    repo_root = Path(args.repo_root).resolve()
    try:
        finding = assert_path_available(repo_root, args.target)
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    if finding is None:
        return 0

    print(finding.to_line())
    return 1


def _assert_tree_clean_command(args):
    repo_root = Path(args.repo_root).resolve()
    if args.mode == "worktree":
        path_iterable = _changed_worktree_paths(repo_root)
        duplicate_findings = _duplicate_findings(repo_root, "worktree", path_iterable)
        if not duplicate_findings:
            return 0
        for finding in duplicate_findings:
            print(finding.to_line())
        return 1

    tracked_findings = _duplicate_findings(repo_root, "tracked", _tracked_paths(repo_root))
    if not tracked_findings:
        return 0
    for finding in tracked_findings:
        print(finding.to_line())
    return 1


def _reconcile_worktree_command(args):
    repo_root = Path(args.repo_root).resolve()
    findings = _duplicate_findings(repo_root, "worktree", _changed_worktree_paths(repo_root))
    if not findings:
        return 1

    grouped = _group_duplicate_findings(findings)
    if not args.apply:
        for finding in findings:
            print(finding.to_line())
        return 0

    for canonical_path_text, group_findings in grouped.items():
        unresolved = _reconcile_group(repo_root, canonical_path_text, group_findings)
        if unresolved:
            for finding in unresolved:
                print(finding.to_line())
            return 2

    for finding in findings:
        print(finding.to_line())
    return 0


def _snapshot_delta_command(args):
    repo_root = Path(args.repo_root).resolve()
    manifest = _build_delta_manifest(repo_root, args.base_ref)
    _write_json(Path(args.output).resolve(), manifest)
    return 0


def _compare_delta_command(args):
    repo_root = Path(args.repo_root).resolve()
    before_manifest = _load_json(Path(args.expected).resolve())
    after_manifest = _build_delta_manifest(repo_root, args.base_ref)
    if before_manifest == after_manifest:
        return 0
    before_paths = before_manifest.get("paths", {})
    after_paths = after_manifest.get("paths", {})
    dropped = sorted(set(before_paths) - set(after_paths))
    added = sorted(set(after_paths) - set(before_paths))
    changed = sorted(
        path_text
        for path_text in set(before_paths) & set(after_paths)
        if before_paths[path_text] != after_paths[path_text]
    )
    payload = {
        "dropped": dropped,
        "added": added,
        "changed": changed,
        "before_head_sha": before_manifest.get("head_sha", ""),
        "after_head_sha": after_manifest.get("head_sha", ""),
    }
    print(json.dumps(payload, sort_keys=True))
    return 1


def main(argv=None):
    parser = argparse.ArgumentParser(description="Guard helper for repo sync and hooks")
    subparsers = parser.add_subparsers(dest="command", required=True)

    path_parser = subparsers.add_parser("assert-path-available")
    path_parser.add_argument("--repo-root", required=True)
    path_parser.add_argument("--target", required=True)
    path_parser.set_defaults(func=_assert_path_available_command)

    clean_parser = subparsers.add_parser("assert-tree-clean")
    clean_parser.add_argument("--repo-root", required=True)
    clean_parser.add_argument("--mode", choices=("worktree", "tracked"), required=True)
    clean_parser.set_defaults(func=_assert_tree_clean_command)

    scan_parser = subparsers.add_parser("scan-worktree")
    scan_parser.add_argument("--repo-root", required=True)
    scan_parser.set_defaults(
        func=lambda args: _assert_tree_clean_command(
            argparse.Namespace(repo_root=args.repo_root, mode="worktree")
        )
    )

    reconcile_parser = subparsers.add_parser("reconcile-worktree")
    reconcile_parser.add_argument("--repo-root", required=True)
    reconcile_parser.add_argument("--apply", action="store_true")
    reconcile_parser.set_defaults(func=_reconcile_worktree_command)

    snapshot_parser = subparsers.add_parser("snapshot-delta")
    snapshot_parser.add_argument("--repo-root", required=True)
    snapshot_parser.add_argument("--base-ref", required=True)
    snapshot_parser.add_argument("--output", required=True)
    snapshot_parser.set_defaults(func=_snapshot_delta_command)

    compare_parser = subparsers.add_parser("compare-delta")
    compare_parser.add_argument("--repo-root", required=True)
    compare_parser.add_argument("--base-ref", required=True)
    compare_parser.add_argument("--expected", required=True)
    compare_parser.set_defaults(func=_compare_delta_command)

    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
