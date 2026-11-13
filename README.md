# Advisory Solution Builder

Advisory catalog and interactive Hospital Planner, based on the public site at <https://ccconnected-advisory-builder.pages.dev/>, captured on November 12, 2026.

The original copy was verified byte for byte before enhancement. The workspace now has ten advisory domains, a persistent left navigation, and a generalized greenfield Hospital Planner. The catalog has 63 solutions: 42 existing offerings with their original brochures and 21 explicitly labelled proposed advisory scopes. No framework, dependency installation, or build step is required.

Domain badges and advisory reference codes use STR (Strategy), GOV (Governance & Activation), FIN (Finance), REG (Regulatory), FAC (Facilities & Equipment), DIG (Digital), CLIN (Clinical Operations), HR (Human Resource), SQPE, and SUP (Support Services). Product codes run sequentially within the primary domain using the complete **All hospitals** catalog, e.g. STR-01. Hospital filters do not renumber products. Saved selections, internal IDs and original brochure filenames remain compatible. Every domain now has solutions and every workstream has a primary advisory home. Proposed scopes include detailed deliverables, client inputs, purchase rationale and ownership boundaries; they do not imply a confirmed delivery capability or an existing brochure.

## Hospital Planner

Open the Hospital Planner from the left navigation and create a project. Enter opening beds, eventual capacity, department count, opening services, dates, delivery teams and other assumptions. The plan includes 18 workstreams and a generalized library of 347 activities derived from the supplied MS Project reference.

**Example Hospital is included under My Projects by default**, including in a fresh browser. It matches the illustrated 180-bed opening, 500-bed eventual capacity, 12 departments and eight service families. Its 18 MS Project-derived workstreams generate 346 applicable activities, with two saved example scenarios. Existing examples and user edits are preserved; reloads do not create duplicates. You can archive or customize the example.

Explore the Gantt, change duration or earliest-start assumptions, inspect dependencies and critical activities, record readiness evidence, select advisory support, save scenarios and export backups or schedules. The requested opening date and dependency forecast remain distinct.

Projects are saved in the current browser. Export JSON backups for portability; there is no shared cloud project storage. Reference durations, workload coefficients, local requirements and resourcing require specialist confirmation. See [the method and limitations](docs/planner-method.md).

My Projects and New Project use the full blue workspace style. Hospital setup starts with prefilled dates, name, capacity and service choices; quantities use sliders with common-value presets. Radio cards show the selected default for stage, planning scale, digital foundation, teams and international hiring. A confirmed building-handover date is optional. Capacity and service-count limits keep the form consistent, and the live preview recalculates as choices change.

Project setup includes a blue left-hand navigation panel with every question, Back, reset-to-opened-values and a live Your answers summary. Both New Project and existing project Setup use it.

A collapsible right pane shows a live, white-wireframe 3D hospital concept alongside the form. Bed capacity, department count and selected services change its massing and wings. Drag to orbit, Shift/right-drag to pan, scroll or pinch to zoom, or use the zoom, north, top-view and reset controls. Auto-rotation can be paused and starts paused when reduced motion is requested. Collapse the pane to restore form width. This schematic preview is illustrative, not an architectural design or capacity validation; dates and delivery assumptions affect the schedule rather than the building geometry.

The complete mapping is available at `reports/advisory-workstream-map.html`. `data/workstream-solutions.js` separates primary, supporting, conditional and post-opening relationships, and narrows activity links by workstream and subject. Owner-led delivery responsibilities remain unchanged. Example Hospital adopts the primary advisory selections once per mapping version while preserving prior selections, dates, capacity and task records. The global package is only changed by an explicit Add action.

Run automated planner and migration checks with `npm test`.

The initial implementation passed 21 planner/migration/export tests, six Git sync integration tests, and 19 local browser checks. Browser evidence is in `verification/hospital-planner-browser.json`; screenshots include the overview, interactive timeline, and mobile setup. An exported MS Project XML file was also read back successfully with MPXJ, including its workstream summaries and dependencies.

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

This compares application files with the original SHA-256 checksums in `SOURCE.json` and a fresh download from the source URL. It requires internet access and `curl`. It now intentionally reports enhanced application files as differences; use `npm test` for the revised application. The original manifest is retained for provenance.

Initial acceptance checks passed: all 54 files matched the live site byte for byte, and the opening screenshots were also byte-identical. Eight settled browser states matched across the original and local copy, covering the finder, recommendation, EHR search, solution profile, package, and proposal fields. Evidence is saved in `verification/browser-checks.json`, `verification/original.jpg`, and `verification/local.jpg`.

## Scope

- Product profiles, proposal requests and brochure links build on the original implementation. The domain taxonomy, finder questions, navigation and project-specific selections have been updated.
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
