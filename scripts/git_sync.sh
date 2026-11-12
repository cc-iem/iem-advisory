#!/usr/bin/env bash

set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
if [[ $# -eq 0 ]]; then
    set -- --message "Sync iem-advisory changes"
fi
exec "${repo_root}/scripts/git_sync_main.sh" "$@"
