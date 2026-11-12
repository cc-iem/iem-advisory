#!/usr/bin/env bash

set -euo pipefail

usage() {
    cat <<'EOF'
Usage:
  ./scripts/bootstrap.sh [--check] [--force]

Options:
  --check   verify bootstrap state without installing or updating dependencies
  --force   ignore cached bootstrap state and rerun installable steps
EOF
}

log() {
    printf '[bootstrap] %s\n' "$*"
}

fail() {
    printf '[bootstrap] ERROR: %s\n' "$*" >&2
    exit 1
}

print_install_hint() {
    local dependency="$1"
    local platform

    platform="$(uname -s)"

    case "${platform}" in
        Darwin)
            case "${dependency}" in
                git-lfs)
                    printf '  Install with: brew install git-lfs && git lfs install\n' >&2
                    ;;
                python3)
                    printf '  Install with: brew install python\n' >&2
                    ;;
                *)
                    printf '  Install %s with your system package manager.\n' "${dependency}" >&2
                    ;;
            esac
            ;;
        Linux)
            case "${dependency}" in
                git-lfs)
                    printf '  Install with: apt-get install git-lfs\n' >&2
                    ;;
                python3)
                    printf '  Install with: apt-get install python3\n' >&2
                    ;;
                *)
                    printf '  Install %s with your system package manager.\n' "${dependency}" >&2
                    ;;
            esac
            ;;
        *)
            printf '  Install %s with your system package manager.\n' "${dependency}" >&2
            ;;
    esac
}

require_command() {
    local command_name="$1"
    local dependency_name="${2:-$1}"

    if ! command -v "${command_name}" >/dev/null 2>&1; then
        printf '[bootstrap] Missing required dependency: %s\n' "${dependency_name}" >&2
        print_install_hint "${dependency_name}"
        exit 1
    fi
}

compute_fingerprint() {
    local script_path="$1"

    python3 - "$script_path" "$repo_root" <<'PY'
import hashlib
import os
import sys

script_path = sys.argv[1]
repo_root = sys.argv[2]

h = hashlib.sha256()


def add_path(path):
    rel = os.path.relpath(path, repo_root)
    h.update(rel.encode("utf-8"))
    h.update(b"\0")
    if os.path.exists(path):
        with open(path, "rb") as handle:
            h.update(handle.read())
    h.update(b"\0")


add_path(script_path)
add_path(os.path.join(repo_root, ".gitattributes"))
add_path(os.path.join(repo_root, "scripts", "git_sync_guard.py"))
add_path(os.path.join(repo_root, "scripts", "git_sync_lfs_guard.sh"))
add_path(os.path.join(repo_root, "scripts", "git_sync.sh"))
print(h.hexdigest())
PY
}

count_lfs_pointer_files() {
    local path
    local header
    local count=0

    while IFS= read -r path; do
        [[ -n "${path}" ]] || continue
        [[ -f "${path}" ]] || continue
        IFS= read -r header < "${path}" || header=""
        if [[ "${header}" == "version https://git-lfs.github.com/spec/v1" ]]; then
            count=$((count + 1))
        fi
    done < <(git lfs ls-files -n 2>/dev/null || true)

    printf '%s' "${count}"
}

lfs_worktree_first_byte_count() {
    local path="$1"

    if [[ ! -f "${path}" ]]; then
        printf '0'
        return
    fi

    python3 - "${path}" <<'PY'
import signal
import sys


def timeout(_signum, _frame):
    raise TimeoutError


signal.signal(signal.SIGALRM, timeout)
signal.alarm(2)
try:
    with open(sys.argv[1], "rb", buffering=0) as handle:
        print(len(handle.read(1)))
except Exception:
    print(0)
finally:
    signal.alarm(0)
PY
}

list_broken_positive_size_lfs_files() {
    python3 -c '
import json
import sys
from pathlib import Path

try:
    payload = json.load(sys.stdin)
except json.JSONDecodeError:
    sys.exit(0)
if not isinstance(payload, dict):
    payload = {}

for entry in payload.get("files") or []:
    path_text = str(entry.get("name", "") or "")
    if not path_text:
        continue
    try:
        expected_size = int(entry.get("size", 0) or 0)
    except (TypeError, ValueError):
        continue
    if expected_size <= 0:
        continue
    try:
        with Path(path_text).open("rb", buffering=0) as handle:
            if handle.read(1):
                continue
    except OSError:
        pass
    print(path_text)
' < <(git lfs ls-files --json 2>/dev/null || printf '{"files":[]}')
}

count_broken_positive_size_lfs_files() {
    local path
    local count=0

    while IFS= read -r path; do
        [[ -n "${path}" ]] || continue
        count=$((count + 1))
    done < <(list_broken_positive_size_lfs_files)

    printf '%s' "${count}"
}

repair_clean_broken_lfs_files() {
    local path
    local repaired=0
    local dirty=0

    while IFS= read -r path; do
        [[ -n "${path}" ]] || continue
        if git diff --quiet -- "${path}"; then
            log "repairing unreadable Git LFS worktree file: ${path}"
            rm -f -- "${path}"
            git lfs checkout "${path}"
            if [[ "$(lfs_worktree_first_byte_count "${path}")" == "0" ]]; then
                fail "Git LFS file remains unreadable after repair: ${path}"
            fi
            repaired=$((repaired + 1))
        else
            printf '[bootstrap] ERROR: broken Git LFS worktree file has local modifications: %s\n' "${path}" >&2
            dirty=$((dirty + 1))
        fi
    done < <(list_broken_positive_size_lfs_files)

    if (( dirty > 0 )); then
        fail "refusing to repair user-modified broken Git LFS files"
    fi
    if (( repaired > 0 )); then
        log "repaired ${repaired} broken Git LFS worktree files"
    fi
}

check_mode=0
force_mode=0

while [[ $# -gt 0 ]]; do
    case "$1" in
        --check)
            check_mode=1
            shift
            ;;
        --force)
            force_mode=1
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            fail "unknown argument: $1"
            ;;
    esac
done

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "not inside a git repository"
git_dir="$(git rev-parse --git-dir)"
cd "${repo_root}"
guard_script="${repo_root}/scripts/git_sync_guard.py"
hooks_path_value="scripts/hooks"
sync_alias_value='!./scripts/git_sync.sh'

state_dir="${git_dir}/bootstrap"
stamp_file="${state_dir}/fingerprint"
mkdir -p "${state_dir}"

require_command git
require_command git-lfs git-lfs
require_command python3

log "repo root: ${repo_root}"
log "toolchain ok: git, git-lfs, python3"

fingerprint="$(compute_fingerprint "${repo_root}/scripts/bootstrap.sh")"
previous_fingerprint=""
if [[ -f "${stamp_file}" ]]; then
    previous_fingerprint="$(<"${stamp_file}")"
fi

if (( check_mode )); then
    current_hooks_path="$(git config --get core.hooksPath || true)"
    if [[ "${current_hooks_path}" != "${hooks_path_value}" ]]; then
        fail "repo-local hooks are not installed; run ./scripts/bootstrap.sh"
    fi
    if [[ "$(git config --local --get alias.sync || true)" != "${sync_alias_value}" ]]; then
        fail "iem-advisory git sync alias is not installed; run ./scripts/bootstrap.sh"
    fi

    pointer_count="$(count_lfs_pointer_files)"
    if [[ "${pointer_count}" != "0" ]]; then
        fail "Git LFS pointer files remain in the worktree; run ./scripts/bootstrap.sh"
    fi

    broken_lfs_count="$(count_broken_positive_size_lfs_files)"
    if [[ "${broken_lfs_count}" != "0" ]]; then
        fail "positive-size Git LFS files are unreadable or empty in the worktree; run ./scripts/bootstrap.sh"
    fi

    if [[ "${fingerprint}" != "${previous_fingerprint}" ]]; then
        fail "bootstrap state is stale; run ./scripts/bootstrap.sh"
    fi

    if ! python3 "${guard_script}" assert-tree-clean --repo-root "${repo_root}" --mode tracked; then
        fail "tracked duplicate-suffix paths remain; clean them before continuing"
    fi

    log "bootstrap state is current"
    exit 0
fi

log "checking Git LFS state"
git lfs install --local --force >/dev/null
repair_clean_broken_lfs_files
if git rev-parse --verify HEAD >/dev/null 2>&1; then
    git lfs checkout
fi
repair_clean_broken_lfs_files
pointer_count="$(count_lfs_pointer_files)"
if [[ "${pointer_count}" != "0" ]]; then
    log "found ${pointer_count} Git LFS pointer files; running git lfs pull"
    git lfs pull
    if git rev-parse --verify HEAD >/dev/null 2>&1; then
        git lfs checkout
    fi
    repair_clean_broken_lfs_files
    pointer_count="$(count_lfs_pointer_files)"
    if [[ "${pointer_count}" != "0" ]]; then
        fail "Git LFS pointer files remain after git lfs pull"
    fi
fi

if (( force_mode )) || [[ "${fingerprint}" != "${previous_fingerprint}" ]]; then
    log "bootstrap fingerprint refreshed"
else
    log "bootstrap fingerprint already current"
fi

git config core.hooksPath "${hooks_path_value}"
git config --local alias.sync "${sync_alias_value}"

if ! python3 "${guard_script}" assert-tree-clean --repo-root "${repo_root}" --mode tracked; then
    fail "tracked duplicate-suffix paths remain; clean them before continuing"
fi

printf '%s\n' "${fingerprint}" > "${stamp_file}"
log "bootstrap complete"
