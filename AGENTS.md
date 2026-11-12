# Repository instructions

Work from this repository root (`cc-iem/iem-advisory`).

## Git sync

- When the user requests `git sync`, review outstanding changes and choose a single-line imperative commit message of at most 72 characters.
- Run `./scripts/bootstrap.sh --check`; if setup is missing or stale, run `./scripts/bootstrap.sh`, then repeat the check.
- Run `git sync --message "<summary>"`, including when there are no new changes. Plain `git sync` uses `Sync iem-advisory changes` as its default message.
- The shortcut stages all non-ignored changes, commits if needed, reconciles with `origin/main`, pushes, and verifies matching local and remote commits. It supports the initial push to an empty remote.
- Overlapping edits favor upstream content; a backup branch preserves local commits before replay. Review changes before invoking sync.
- Files at or above 100 MiB are ignored before staging. Oversized committed files or disallowed Git LFS objects block a push. A verified sync ends with `SUCCESS`; a failed sync ends with `FAIL`.
- Run `./scripts/bootstrap.sh` once per clone or worktree to install this repository's hooks and `git sync` alias. Do not change Git configuration globally or modify sibling repositories.

## Website provenance and verification

- `SOURCE.json` records the original public deployment's files and SHA-256 checksums. Keep it as the original snapshot when intentionally editing the application.
- Run `npm start` for the local website and `npm run verify:source` to compare the copied snapshot with the current live website.
- `verification/` contains the initial browser comparison evidence.
