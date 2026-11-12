# Advisory Solution Builder

An exact copy of the public site at <https://ccconnected-advisory-builder.pages.dev/>, captured on November 12, 2026.

The site serves readable HTML, CSS, and JavaScript directly. Those files are preserved unchanged, along with its catalog data, branding images, 42 solution brochures, finance packet, and package brochure. No framework, dependency installation, or build step is required.

## Run locally

Requires Python 3. From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>. If Node.js is installed, `npm start` or `npm run dev` runs the same server.

## Verify the copy

```sh
python3 scripts/verify_source.py
```

This compares every copied file with the SHA-256 checksum in `SOURCE.json` and with a fresh download from the original URL. It requires internet access and `curl`. A future change to the original website will be reported as a difference.

Initial acceptance checks passed: all 54 files matched the live site byte for byte, and the opening screenshots were also byte-identical. Eight settled browser states matched across the original and local copy, covering the finder, recommendation, EHR search, solution profile, package, and proposal fields. Evidence is saved in `verification/browser-checks.json`, `verification/original.jpg`, and `verification/local.jpg`.

## Scope

- Guided finder, catalog and search, solution details, package selection, request form, printing, and PDF links use the original implementation and data.
- Google Fonts is loaded from the same external URLs as the original, so an internet connection is needed for that font.
- The original configuration uses an email application for proposal requests. No request endpoint is configured.
- The public deployment provides the complete browser application. Unpublished development scripts and repository history are not included; comments in the copied files may refer to those original tools.

The Git repository is rooted at `/Users/kgb/Documents/GitHub/iem-advisory` and retains the existing `cc-iem/iem-advisory` remote.

## Git sync

The sync scripts and their required bootstrap and guards were copied from the local `iem-bd` project and configured for this repository's `origin` (`cc-iem/iem-advisory`). They require Git, Git LFS, and Python 3.9 or later. The source project is unchanged.

Run once per clone or worktree:

```sh
./scripts/bootstrap.sh
```

Then sync with:

```sh
git sync
# Or choose the commit message:
git sync --message "Describe the changes"
```

The repository-local shortcut stages all non-ignored changes, commits if needed, fetches and reconciles with `origin/main`, pushes, and checks that local and remote commits match. A verified sync ends with `SUCCESS`. It supports an empty remote and repeated runs without changes.

Overlapping edits favor upstream content; a backup branch preserves local commits before replay. Files at or above 100 MiB are ignored before staging, and oversized files already committed block the push.

Run the integration tests against temporary local remotes:

```sh
python3 -m unittest discover -s tests -p 'test_git_sync.py' -v
```
