#!/usr/bin/env bash

set -euo pipefail

usage() {
    cat <<'EOF'
Usage:
  git_sync_lfs_guard.sh [--remote origin] [--base main] [--threshold-mb 100] [--initial]
EOF
}

log() {
    printf '[git_sync_lfs] %s\n' "$*"
}

fail() {
    printf '[git_sync_lfs] ERROR: %s\n' "$*" >&2
    exit 1
}

remote="origin"
base="main"
threshold_mb=100
initial=0

while [[ $# -gt 0 ]]; do
    case "$1" in
        --initial)
            initial=1
            shift
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
        --threshold-mb)
            [[ $# -ge 2 ]] || fail "missing value for --threshold-mb"
            threshold_mb="$2"
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

case "${threshold_mb}" in
    ''|*[!0-9]*)
        fail "--threshold-mb must be a positive integer"
        ;;
esac

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "not inside a git repository"
cd "${repo_root}"

base_ref="refs/remotes/${remote}/${base}"
if (( initial )); then
    scan_revision="HEAD"
else
    git rev-parse --verify "${base_ref}" >/dev/null 2>&1 || fail "missing remote ref ${base_ref}"
    scan_revision="${base_ref}..HEAD"
fi

git diff --quiet || fail "working tree must be clean before LFS migration"
git diff --cached --quiet || fail "index must be clean before LFS migration"

threshold_bytes="$((threshold_mb * 1024 * 1024))"
tmpdir="$(mktemp -d "${TMPDIR:-/tmp}/git_sync_lfs_guard.XXXXXX")"
trap 'rm -rf "${tmpdir}"' EXIT

scan_file="${tmpdir}/large_blobs.tsv"
patterns_file="${tmpdir}/patterns.txt"
unique_scan_file="${tmpdir}/large_blobs_unique.tsv"
lfs_fixup_scan_file="${tmpdir}/lfs_fixup.tsv"
lfs_fixup_unique_scan_file="${tmpdir}/lfs_fixup_unique.tsv"
lfs_policy_scan_file="${tmpdir}/lfs_policy.tsv"

path_to_pattern() {
    local path="$1"

    printf '%s\n' "${path}"
}

blob_first_line() {
    local oid="$1"
    git cat-file -p "${oid}" | sed -n '1p'
}

blob_lfs_pointer_payload_size() {
    local oid="$1"
    local first_line
    local size_line

    first_line="$(blob_first_line "${oid}")"
    if [[ "${first_line}" != "version https://git-lfs.github.com/spec/v1" ]]; then
        return 1
    fi

    size_line="$(git cat-file -p "${oid}" | awk '/^size / { print $2; exit }')"
    [[ -n "${size_line}" ]] || return 1
    printf '%s\n' "${size_line}"
}

blob_policy_size() {
    local oid="$1"
    local pointer_size

    if pointer_size="$(blob_lfs_pointer_payload_size "${oid}")"; then
        printf '%s\n' "${pointer_size}"
        return 0
    fi

    git cat-file -s "${oid}"
}

scan_large_blob_paths() {
    local output_path="$1"
    local oid
    local path
    local size
    local filter_attr

    : > "${output_path}"

    while IFS= read -r line; do
        oid="${line%% *}"
        path="${line#* }"
        [[ "${line}" != "${oid}" ]] || continue

        size="$(git cat-file -s "${oid}")"
        if (( size < threshold_bytes )); then
            continue
        fi

        filter_attr="$(git check-attr filter -- "${path}" | awk -F': ' 'END { print $3 }')"
        printf '%s\t%s\t%s\n' "${size}" "${filter_attr}" "${path}" >> "${output_path}"
    done < <(git rev-list --objects "${base_ref}..HEAD")
}

scan_lfs_fixup_paths() {
    local output_path="$1"
    local oid
    local path
    local size
    local filter_attr
    local first_line

    : > "${output_path}"

    while IFS= read -r line; do
        oid="${line%% *}"
        path="${line#* }"
        [[ "${line}" != "${oid}" ]] || continue

        filter_attr="$(git check-attr filter -- "${path}" | awk -F': ' 'END { print $3 }')"
        [[ "${filter_attr}" == "lfs" ]] || continue

        size="$(blob_policy_size "${oid}")"
        if (( size < threshold_bytes )); then
            fail "sub-threshold file must not be LFS-tracked: ${path}"
        fi

        if (( size > 1024 )); then
            printf '%s\t%s\t%s\n' "${size}" "${filter_attr}" "${path}" >> "${output_path}"
            continue
        fi

        first_line="$(git cat-file -p "${oid}" | sed -n '1p')"
        if [[ "${first_line}" != "version https://git-lfs.github.com/spec/v1" ]]; then
            printf '%s\t%s\t%s\n' "${size}" "${filter_attr}" "${path}" >> "${output_path}"
        fi
    done < <(git rev-list --objects "${base_ref}..HEAD")
}

scan_lfs_pointer_policy_violations() {
    local output_path="$1"
    local oid
    local path
    local size

    : > "${output_path}"

    while IFS= read -r line; do
        oid="${line%% *}"
        path="${line#* }"
        [[ "${line}" != "${oid}" ]] || continue

        if ! size="$(blob_lfs_pointer_payload_size "${oid}")"; then
            continue
        fi

        if (( size < threshold_bytes )); then
            printf 'sub_threshold\t%s\t%s\n' "${size}" "${path}" >> "${output_path}"
        fi
    done < <(git rev-list --objects "${base_ref}..HEAD")
}

scan_all_ahead_blobs() {
    python3 - \
        "${scan_revision}" \
        "${threshold_bytes}" \
        "${scan_file}" \
        "${lfs_policy_scan_file}" \
        "${lfs_fixup_scan_file}" <<'PY'
import subprocess
import sys

scan_revision = sys.argv[1]
threshold_bytes = int(sys.argv[2])
scan_file = sys.argv[3]
lfs_policy_scan_file = sys.argv[4]
lfs_fixup_scan_file = sys.argv[5]


def run_git(*args, input_bytes=None):
    return subprocess.run(
        ["git", *args],
        input=input_bytes,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )


rev_list = run_git("rev-list", "--objects", scan_revision).stdout
if not rev_list:
    open(scan_file, "w").close()
    open(lfs_policy_scan_file, "w").close()
    open(lfs_fixup_scan_file, "w").close()
    sys.exit(0)

batch = run_git(
    "cat-file",
    "--batch-check=%(objectname) %(objecttype) %(objectsize) %(rest)",
    input_bytes=rev_list,
).stdout

records = []
paths = []
for raw_line in batch.splitlines():
    parts = raw_line.decode("utf-8", "surrogateescape").split(" ", 3)
    if len(parts) != 4:
        continue
    oid, object_type, size_text, path = parts
    if object_type != "blob" or not path:
        continue
    records.append((oid, int(size_text), path))
    paths.append(path)

unique_paths = sorted(set(paths))
attr_input = "\0".join(unique_paths).encode("utf-8", "surrogateescape") + b"\0"
attr_output = run_git("check-attr", "-z", "--stdin", "filter", input_bytes=attr_input).stdout
attr_parts = attr_output.split(b"\0")
filter_by_path = {}
for index in range(0, len(attr_parts) - 1, 3):
    path = attr_parts[index].decode("utf-8", "surrogateescape")
    value = attr_parts[index + 2].decode("utf-8", "surrogateescape")
    filter_by_path[path] = value

small_or_lfs_oids = [
    oid
    for oid, size, path in records
    if size <= 1024 or filter_by_path.get(path) == "lfs"
]
pointer_payload_size_by_oid = {}
if small_or_lfs_oids:
    pointer_input = ("\n".join(small_or_lfs_oids) + "\n").encode("ascii")
    pointer_proc = subprocess.Popen(
        ["git", "cat-file", "--batch"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    stdout, stderr = pointer_proc.communicate(pointer_input)
    if pointer_proc.returncode != 0:
        sys.stderr.buffer.write(stderr)
        sys.exit(pointer_proc.returncode)

    cursor = 0
    while cursor < len(stdout):
        line_end = stdout.find(b"\n", cursor)
        if line_end < 0:
            break
        header = stdout[cursor:line_end].decode("ascii").split()
        cursor = line_end + 1
        if len(header) < 3:
            break
        oid, object_type, size_text = header[:3]
        size = int(size_text)
        payload = stdout[cursor : cursor + size]
        cursor += size
        if cursor < len(stdout) and stdout[cursor : cursor + 1] == b"\n":
            cursor += 1
        if object_type != "blob":
            continue
        if not payload.startswith(b"version https://git-lfs.github.com/spec/v1\n"):
            continue
        for payload_line in payload.splitlines():
            if payload_line.startswith(b"size "):
                pointer_payload_size_by_oid[oid] = int(payload_line.split()[1])
                break

with open(scan_file, "w", encoding="utf-8") as large_out, \
    open(lfs_policy_scan_file, "w", encoding="utf-8") as policy_out, \
    open(lfs_fixup_scan_file, "w", encoding="utf-8") as fixup_out:
    for oid, size, path in records:
        filter_attr = filter_by_path.get(path, "unspecified")

        if size >= threshold_bytes:
            large_out.write(f"{size}\t{filter_attr}\t{path}\n")

        pointer_payload_size = pointer_payload_size_by_oid.get(oid)
        if pointer_payload_size is not None:
            if pointer_payload_size >= threshold_bytes:
                policy_out.write(f"oversized_lfs_pointer\t{pointer_payload_size}\t{path}\n")
            else:
                policy_out.write(f"sub_threshold\t{pointer_payload_size}\t{path}\n")

        if filter_attr != "lfs":
            continue
        policy_size = pointer_payload_size if pointer_payload_size is not None else size
        if policy_size < threshold_bytes:
            print(f"[git_sync_lfs] ERROR: sub-threshold file must not be LFS-tracked: {path}", file=sys.stderr)
            sys.exit(1)

        if pointer_payload_size is None:
            fixup_out.write(f"{policy_size}\t{filter_attr}\t{path}\n")
PY
}

scan_all_ahead_blobs
if [[ -s "${scan_file}" ]]; then
    sort -u -k3,3 "${scan_file}" > "${unique_scan_file}"

    log "detected oversized local-ahead blobs in ${base_ref}..HEAD:"
    while IFS=$'\t' read -r size filter_attr path; do
        printf '[git_sync_lfs]   %s bytes | filter=%s | %s\n' "${size}" "${filter_attr}" "${path}"
    done < "${unique_scan_file}"
    fail "oversized files must be removed from local history and ignored, not pushed or migrated to LFS"
fi

scan_all_ahead_blobs
if [[ -s "${lfs_policy_scan_file}" ]]; then
    log "detected disallowed LFS-tracked paths in ${base_ref}..HEAD:"
    while IFS=$'\t' read -r violation_kind size path; do
        printf '[git_sync_lfs]   %s | %s bytes | %s\n' "${violation_kind}" "${size}" "${path}"
    done < "${lfs_policy_scan_file}"
    fail "disallowed LFS-tracked paths remain in ${base_ref}..HEAD"
fi

if [[ -s "${lfs_fixup_scan_file}" ]]; then
    sort -u -k3,3 "${lfs_fixup_scan_file}" > "${lfs_fixup_unique_scan_file}"

    log "detected local-ahead files that match LFS rules but are plain Git blobs:"
    while IFS=$'\t' read -r size filter_attr path; do
        printf '[git_sync_lfs]   %s bytes | filter=%s | %s\n' "${size}" "${filter_attr}" "${path}"
    done < "${lfs_fixup_unique_scan_file}"
    fail "LFS-tracked plain blobs remain in local history; fix attributes or remove the files before pushing"
fi

scan_all_ahead_blobs
if [[ -s "${scan_file}" ]]; then
    fail "oversized plain Git blobs remain in ${base_ref}..HEAD after LFS migration"
fi

if [[ -s "${lfs_fixup_scan_file}" ]]; then
    fail "plain Git blobs remain under current LFS-tracked paths in ${base_ref}..HEAD after fixup migration"
fi

log "no oversized or LFS-mismatched plain Git blobs remain in ${base_ref}..HEAD"
