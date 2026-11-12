#!/usr/bin/env bash

set -euo pipefail

sync_push_verified=0
tmpdir=""

usage() {
    cat <<'EOF'
Usage:
  git_sync_main.sh --message "commit message" [--remote origin] [--base main]
EOF
}

backup_branch_name() {
    local branch_name="$1"
    local timestamp="$2"
    printf 'backup/%s_sync_guard_%s' "${branch_name//\//_}" "${timestamp}"
}

log() {
    printf '[git_sync] %s\n' "$*"
}

fail() {
    printf '[git_sync] ERROR: %s\n' "$*" >&2
    exit 1
}

warn() {
    printf '[git_sync] WARN: %s\n' "$*" >&2
}

print_success_status() {
    printf '\033[32mSUCCESS\033[0m\n'
}

print_fail_status() {
    printf '\033[31mFAIL\033[0m\n'
}

cleanup_and_report_exit() {
    local exit_code=$?
    if [[ -n "${tmpdir:-}" ]] && [[ -d "${tmpdir}" ]]; then
        rm -rf "${tmpdir}"
    fi
    if (( exit_code == 0 )) && (( sync_push_verified == 1 )); then
        print_success_status
    else
        print_fail_status
    fi
    exit "${exit_code}"
}

log_multiline_output() {
    local prefix="$1"
    local output="$2"
    local line

    while IFS= read -r line; do
        [[ -n "${line}" ]] || continue
        log "${prefix}${line}"
    done <<< "${output}"
}

assert_tracked_tree_clean_or_fail() {
    local repo_root="$1"
    local guard_script="$2"
    local context="$3"
    local output

    if output="$("${guard_script}" assert-tree-clean --repo-root "${repo_root}" --mode tracked)"; then
        return 0
    fi

    if [[ -n "${output}" ]]; then
        printf '%s\n' "${output}" >&2
    fi
    fail "${context}"
}

format_gib() {
    python3 - "$1" <<'PY'
import sys

value = int(sys.argv[1])
print(f"{value / (1024 ** 3):.2f}")
PY
}

collect_lfs_push_stats() {
    local remote_name="$1"
    local dry_run_path="$2"

    git lfs push --dry-run "${remote_name}" HEAD > "${dry_run_path}"
    python3 - "${dry_run_path}" <<'PY'
import os
import sys

dry_run_path = sys.argv[1]
count = 0
total = 0

with open(dry_run_path, "r", encoding="utf-8") as handle:
    for raw_line in handle:
        line = raw_line.strip()
        if " => " not in line:
            continue
        _, path = line.split(" => ", 1)
        if os.path.exists(path):
            total += os.path.getsize(path)
        count += 1

print(f"{count}\t{total}")
PY
}

ignore_oversized_worktree_files() {
    local repo_root="$1"
    local threshold_bytes="$2"

    python3 - "${repo_root}" "${threshold_bytes}" <<'PY'
import os
import subprocess
import sys
from pathlib import Path

repo_root = Path(sys.argv[1])
threshold_bytes = int(sys.argv[2])
ignore_path = repo_root / ".gitignore"


def run_git(*args, input_bytes=None, check=True):
    return subprocess.run(
        ["git", *args],
        cwd=repo_root,
        input=input_bytes,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=check,
    )


def git_paths(*args):
    output = run_git(*args).stdout
    return [
        item.decode("utf-8", "surrogateescape")
        for item in output.split(b"\0")
        if item
    ]


def is_tracked(path):
    result = run_git("ls-files", "--error-unmatch", "--", path, check=False)
    return result.returncode == 0


def ignore_pattern(path):
    escaped = []
    for char in path:
        if char in "\\ #![]*?":
            escaped.append("\\" + char)
        else:
            escaped.append(char)
    return "/" + "".join(escaped)


candidate_paths = []
seen = set()
for args in (
    ("ls-files", "-o", "--exclude-standard", "-z"),
    ("ls-files", "-d", "-z"),
    ("diff", "--cached", "--name-only", "-z"),
):
    for path in git_paths(*args):
        if path in seen:
            continue
        seen.add(path)
        candidate_paths.append(path)

oversized_paths = []
for path in candidate_paths:
    full_path = repo_root / path
    if not full_path.is_file() or full_path.is_symlink():
        continue
    if full_path.stat().st_size < threshold_bytes:
        continue
    oversized_paths.append(path)

if not oversized_paths:
    sys.exit(0)

existing_lines = []
if ignore_path.exists():
    existing_lines = ignore_path.read_text(encoding="utf-8").splitlines()
existing_set = set(existing_lines)
lines_to_add = []

for path in oversized_paths:
    pattern = ignore_pattern(path)
    if pattern not in existing_set:
        lines_to_add.append(pattern)
        existing_set.add(pattern)

if lines_to_add:
    with ignore_path.open("a", encoding="utf-8") as handle:
        if existing_lines and existing_lines[-1] != "":
            handle.write("\n")
        for line in lines_to_add:
            handle.write(line + "\n")

for path in oversized_paths:
    if is_tracked(path):
        run_git("rm", "--cached", "--", path)

for path in oversized_paths:
    print(f"ignored oversized file >= {threshold_bytes} bytes: {path}")
PY
}

require_clean_operation_state() {
    local git_dir

    git_dir="$(git rev-parse --git-dir)"

    [[ ! -d "${git_dir}/rebase-merge" ]] || fail "rebase-merge already in progress"
    [[ ! -d "${git_dir}/rebase-apply" ]] || fail "rebase-apply already in progress"
    [[ ! -f "${git_dir}/MERGE_HEAD" ]] || fail "merge already in progress"
    [[ ! -f "${git_dir}/CHERRY_PICK_HEAD" ]] || fail "cherry-pick already in progress"
    [[ ! -f "${git_dir}/REVERT_HEAD" ]] || fail "revert already in progress"
}

has_unmerged_paths() {
    [[ -n "$(git ls-files -u)" ]]
}

recover_operation_state() {
    local git_dir
    local current_head
    local backup_branch=""
    local recovered_state=0
    local state_name abort_command
    local states=(
        "rebase-merge:git rebase --abort"
        "rebase-apply:git rebase --abort"
        "MERGE_HEAD:git merge --abort"
        "CHERRY_PICK_HEAD:git cherry-pick --abort"
        "REVERT_HEAD:git revert --abort"
    )

    git_dir="$(git rev-parse --git-dir)"
    current_head="$(git rev-parse --verify HEAD 2>/dev/null || true)"

    for state_entry in "${states[@]}"; do
        state_name="${state_entry%%:*}"
        abort_command="${state_entry#*:}"
        if [[ -d "${git_dir}/${state_name}" ]] || [[ -f "${git_dir}/${state_name}" ]]; then
            if [[ -z "${backup_branch}" ]]; then
                backup_branch="$(create_backup_ref "${current_branch}" "${current_head}")"
            fi
            log "recovering pre-existing git operation state ${state_name} (backup ${backup_branch})"
            if ! eval "${abort_command}" >/dev/null 2>&1; then
                warn "automatic abort for ${state_name} failed; resetting hard to ${current_head}"
                git reset --hard "${current_head}" >/dev/null
            fi
            recovered_state=1
        fi
    done

    if (( recovered_state == 0 )); then
        return 0
    fi

    if has_unmerged_paths; then
        warn "operation recovery left unresolved paths; resetting hard to ${current_head}"
        git reset --hard "${current_head}" >/dev/null
    fi

    require_clean_operation_state
    ! has_unmerged_paths || fail "automatic operation recovery did not converge"
}

create_backup_ref() {
    local branch_name="$1"
    local commit_sha="$2"
    local backup_branch

    backup_branch="$(backup_branch_name "${branch_name}" "$(date +%Y%m%d_%H%M%S)")"
    git branch "${backup_branch}" "${commit_sha}" >/dev/null 2>&1 || true
    printf '%s' "${backup_branch}"
}

git_remote_ref() {
    local remote_name="$1"
    local base_name="$2"
    printf 'refs/remotes/%s/%s' "${remote_name}" "${base_name}"
}

read_local_ahead_commits() {
    local remote_ref="$1"
    git rev-list --reverse "${remote_ref}..HEAD"
}

cherry_pick_is_empty() {
    git diff --cached --quiet --ignore-submodules &&
        git diff --quiet --ignore-submodules
}

continue_or_skip_cherry_pick() {
    local continue_output

    if git cherry-pick --continue >/dev/null 2>&1; then
        return 0
    fi
    if cherry_pick_is_empty; then
        git cherry-pick --skip >/dev/null 2>&1 || true
        return 0
    fi

    continue_output="$(git cherry-pick --continue 2>&1)" && return 0
    if [[ "${continue_output}" == *"previous cherry-pick is now empty"* ]] ||
        [[ "${continue_output}" == *"nothing to commit"* ]]; then
        git cherry-pick --skip >/dev/null 2>&1 || true
        return 0
    fi
    printf '%s\n' "${continue_output}" >&2
    return 1
}

cherry_pick_preserving_upstream() {
    local commit_sha="$1"
    local unmerged=()
    local path

    if git cherry-pick -X ours "${commit_sha}" >/dev/null 2>&1; then
        return 0
    fi

    git rev-parse -q --verify CHERRY_PICK_HEAD >/dev/null 2>&1 ||
        return 1

    while IFS= read -r path; do
        [[ -n "${path}" ]] || continue
        unmerged+=("${path}")
    done < <(git diff --name-only --diff-filter=U)
    if ((${#unmerged[@]} == 0)); then
        continue_or_skip_cherry_pick
        return $?
    fi

    warn "auto-resolving overlapping changes for ${commit_sha} by keeping newer upstream content"
    for path in "${unmerged[@]}"; do
        git checkout --ours -- "${path}" >/dev/null 2>&1 || true
        git add -- "${path}"
    done

    continue_or_skip_cherry_pick
}

tree_entry_at() {
    local revision="$1"
    local path="$2"
    local tree_entry

    tree_entry="$(git ls-tree "${revision}" -- "${path}")"
    if [[ -n "${tree_entry}" ]]; then
        printf '%s' "${tree_entry}"
    else
        printf '__missing__'
    fi
}

apply_commit_path_state() {
    local commit_sha="$1"
    local path="$2"
    local commit_entry="$3"

    if [[ "${commit_entry}" == "__missing__" ]]; then
        git rm -f --ignore-unmatch -- "${path}" >/dev/null 2>&1 || true
        return 0
    fi

    git checkout "${commit_sha}" -- "${path}" >/dev/null 2>&1
}

replay_commit_by_path() {
    local commit_sha="$1"
    local parent_sha
    local touched_paths=()
    local path
    local parent_entry commit_entry current_entry

    parent_sha="$(git rev-parse "${commit_sha}^")"
    while IFS= read -r path; do
        [[ -n "${path}" ]] || continue
        touched_paths+=("${path}")
    done < <(git diff-tree -m --first-parent --no-commit-id --name-only -r "${commit_sha}")

    log "falling back to path-level replay for ${commit_sha}"
    for path in "${touched_paths[@]}"; do
        parent_entry="$(tree_entry_at "${parent_sha}" "${path}")"
        commit_entry="$(tree_entry_at "${commit_sha}" "${path}")"
        current_entry="$(tree_entry_at HEAD "${path}")"

        if [[ "${current_entry}" == "${parent_entry}" ]]; then
            log "path-level replay applying local-only change for ${path}"
            apply_commit_path_state "${commit_sha}" "${path}" "${commit_entry}"
            continue
        fi

        if [[ "${current_entry}" == "${commit_entry}" ]]; then
            log "path-level replay skipping already-present change for ${path}"
            continue
        fi

        log "path-level replay keeping newer upstream content for ${path}"
    done

    if git diff --cached --quiet && git diff --quiet; then
        log "path-level replay produced no staged changes for ${commit_sha}; skipping synthetic commit"
        return 0
    fi

    git commit --reuse-message "${commit_sha}" >/dev/null
}

rebuild_branch_onto_remote() {
    local remote_ref="$1"
    local remote_sha current_head backup_branch
    local ahead_commits=()
    local commit_sha
    local ahead_commit

    remote_sha="$(git rev-parse "${remote_ref}")"
    current_head="$(git rev-parse HEAD)"

    if git merge-base --is-ancestor "${remote_sha}" "${current_head}"; then
        log "${current_branch} already contains ${remote_ref}; skipping replay"
        return 0
    fi

    while IFS= read -r ahead_commit; do
        [[ -n "${ahead_commit}" ]] || continue
        ahead_commits+=("${ahead_commit}")
    done < <(read_local_ahead_commits "${remote_ref}")

    if ((${#ahead_commits[@]} == 0)); then
        if [[ "${current_head}" != "${remote_sha}" ]]; then
            backup_branch="$(create_backup_ref "${current_branch}" "${current_head}")"
            log "no unique local commits remain; adopting ${remote_ref} (backup ${backup_branch})"
            git reset --hard "${remote_ref}" >/dev/null
        fi
        return 0
    fi

    backup_branch="$(create_backup_ref "${current_branch}" "${current_head}")"
    log "rebuilding ${current_branch} on ${remote_ref} from ${#ahead_commits[@]} local commit(s); backup ${backup_branch}"
    git reset --hard "${remote_ref}" >/dev/null

    for commit_sha in "${ahead_commits[@]}"; do
        log "replaying local commit ${commit_sha}"
        if ! cherry_pick_preserving_upstream "${commit_sha}"; then
            git cherry-pick --abort >/dev/null 2>&1 || true
            git reset --hard HEAD >/dev/null
            replay_commit_by_path "${commit_sha}" || fail "path-level replay failed for ${commit_sha}"
        fi
    done
}

push_rejected_for_remote_update() {
    local output="$1"

    [[ "${output}" == *"non-fast-forward"* ]] ||
        [[ "${output}" == *"[rejected]"* ]] ||
        [[ "${output}" == *"fetch first"* ]] ||
        [[ "${output}" == *"failed to push some refs"* ]]
}

message=""
remote="origin"
base="main"

while [[ $# -gt 0 ]]; do
    case "$1" in
        --message)
            [[ $# -ge 2 ]] || fail "missing value for --message"
            message="$2"
            shift 2
            ;;
        --remote)
            [[ $# -ge 2 ]] || fail "missing value for --remote"
            remote="$2"
            shift 2
            ;;
        --base)
            [[ $# -ge 2 ]] || fail "missing value for --base"
            base="$2"
            shift 2
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

[[ -n "${message}" ]] || fail "--message is required"
[[ "${message}" != *$'\n'* ]] || fail "--message must be a single line"
message="${message:0:72}"

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "not inside a git repository"
cd "${repo_root}"

current_branch="$(git branch --show-current)"
[[ -n "${current_branch}" ]] || fail "detached HEAD is not supported"

tmpdir="$(mktemp -d "${TMPDIR:-/tmp}/git_sync_main.XXXXXX")"
trap cleanup_and_report_exit EXIT

recover_operation_state
require_clean_operation_state
! has_unmerged_paths || fail "unresolved conflicts exist"
git remote get-url "${remote}" >/dev/null 2>&1 || fail "remote '${remote}' does not exist"

log "repo root: ${repo_root}"
log "current branch: ${current_branch}"
log "target remote/base: ${remote}/${base}"

bootstrap_script="${repo_root}/scripts/bootstrap.sh"
[[ -x "${bootstrap_script}" ]] || fail "missing executable bootstrap script at scripts/bootstrap.sh"
guard_script="${repo_root}/scripts/git_sync_guard.py"
[[ -x "${guard_script}" ]] || fail "missing executable git sync guard at scripts/git_sync_guard.py"
log "verifying bootstrap state"
"${bootstrap_script}" --check

log "checking worktree for duplicate-suffix leftovers"
while true; do
    if hygiene_output="$("${guard_script}" assert-tree-clean --repo-root "${repo_root}" --mode worktree)"; then
        break
    fi
    if reconcile_output="$("${guard_script}" reconcile-worktree --repo-root "${repo_root}" --apply)"; then
        log_multiline_output "reconciled " "${reconcile_output}"
        continue
    else
        reconcile_status=$?
        if (( reconcile_status == 2 )); then
            if [[ -n "${reconcile_output}" ]]; then
                printf '%s\n' "${reconcile_output}" >&2
            fi
            fail "duplicate-suffix reconciliation requires manual merge"
        fi
        if (( reconcile_status != 1 )); then
            fail "automatic duplicate-suffix reconciliation failed"
        fi
    fi
    printf '%s\n' "${hygiene_output}" >&2
    fail "worktree contains unsupported duplicate-suffix paths"
done

log "staging all changes"
ignore_oversized_worktree_files "${repo_root}" "$((100 * 1024 * 1024))"
git add -A
assert_tracked_tree_clean_or_fail "${repo_root}" "${guard_script}" \
    "tracked duplicate-suffix paths remain after staging"

if git diff --cached --quiet; then
    log "no staged changes to commit"
else
    log "creating commit"
    git commit -m "${message}"
fi

log "fetching ${remote}/${base}"
remote_ref="$(git_remote_ref "${remote}" "${base}")"

large_blob_guard="${repo_root}/scripts/git_sync_lfs_guard.sh"
[[ -x "${large_blob_guard}" ]] || fail "missing executable LFS guard at scripts/git_sync_lfs_guard.sh"

sync_attempt=0
while true; do
    sync_attempt=$((sync_attempt + 1))
    log "sync attempt ${sync_attempt}: fetching ${remote}/${base}"
    remote_head="$(git ls-remote --heads "${remote}" "refs/heads/${base}")" || fail "cannot read ${remote}/${base}"
    if [[ -n "${remote_head}" ]]; then
        git fetch "${remote}" "${base}"
        git rev-parse --verify "${remote_ref}" >/dev/null 2>&1 || fail "missing remote ref ${remote}/${base} after fetch"
        fetched_sha="$(git rev-parse "${remote_ref}")"
        log "fetched base sha: ${fetched_sha}"

        rebuild_branch_onto_remote "${remote_ref}"
        assert_tracked_tree_clean_or_fail "${repo_root}" "${guard_script}" \
            "tracked duplicate-suffix paths remain after replay"

        log "checking for oversized plain Git blobs in local ahead commits"
        "${large_blob_guard}" --remote "${remote}" --base "${base}" --threshold-mb 100
    else
        log "${remote}/${base} does not exist; checking all commits before the initial push"
        "${large_blob_guard}" --remote "${remote}" --base "${base}" --threshold-mb 100 --initial
    fi

    lfs_dry_run_path="${tmpdir}/git_lfs_push_dry_run.txt"
    IFS=$'\t' read -r lfs_object_count lfs_total_bytes < <(collect_lfs_push_stats "${remote}" "${lfs_dry_run_path}")

    if (( lfs_object_count == 0 )); then
        log "no pending Git LFS uploads"
    else
        lfs_concurrent_transfers=8
        if (( lfs_object_count > 10 || lfs_total_bytes > 2 * 1024 * 1024 * 1024 )); then
            lfs_concurrent_transfers=1
        fi

        log "pending Git LFS uploads: ${lfs_object_count} objects ($(format_gib "${lfs_total_bytes}") GiB), concurrent transfers=${lfs_concurrent_transfers}"
        log "uploading Git LFS objects explicitly before ref push"
        git -c lfs.concurrenttransfers="${lfs_concurrent_transfers}" lfs push "${remote}" HEAD
    fi

    log "pushing HEAD to ${remote}/${base} with explicit tracked-tree guard and pre-push hook skipped"
    if push_output="$(git push --no-verify "${remote}" "HEAD:${base}" 2>&1)"; then
        if [[ -n "${push_output}" ]]; then
            printf '%s\n' "${push_output}"
        fi
    else
        if [[ -n "${push_output}" ]]; then
            printf '%s\n' "${push_output}" >&2
        fi
        if push_rejected_for_remote_update "${push_output}"; then
            warn "push rejected because ${remote}/${base} moved; retrying"
            continue
        fi
        fail "push to ${remote}/${base} failed"
    fi

    log "verifying remote sync"
    git fetch "${remote}" "${base}"
    head_sha="$(git rev-parse HEAD)"
    remote_sha="$(git rev-parse "${remote_ref}")"
    if [[ "${head_sha}" != "${remote_sha}" ]]; then
        warn "HEAD (${head_sha}) no longer matches ${remote}/${base} (${remote_sha}); retrying"
        continue
    fi
    break
done

sync_push_verified=1
log "synced ${current_branch} to ${remote}/${base} at ${head_sha}"
