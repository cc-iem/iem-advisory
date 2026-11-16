# Advisory Solution Builder

Advisory catalog and interactive Hospital Planner, based on the public site at <https://ccconnected-advisory-builder.pages.dev/>, captured on November 12, 2026.

The original copy was verified byte for byte before enhancement. The workspace now has ten advisory domains, a persistent left navigation, and a generalized greenfield Hospital Planner. The catalog has 63 solutions: 42 existing offerings with their original brochures and 21 explicitly labelled proposed advisory scopes. No framework, dependency installation, or build step is required.

Domain badges and advisory reference codes use STR (Strategy), GOV (Governance & Activation), FIN (Finance), REG (Regulatory), FAC (Facilities & Equipment), DIG (Digital), CLIN (Clinical Operations), HR (Human Resource), SQPE, and SUP (Support Services). Product codes run sequentially within the primary domain using the complete **All hospitals** catalog, e.g. STR-01. Hospital filters do not renumber products. Saved selections, internal IDs and original brochure filenames remain compatible. Every domain now has solutions and every workstream has a primary advisory home. Proposed scopes include detailed deliverables, client inputs, purchase rationale and ownership boundaries; they do not imply a confirmed delivery capability or an existing brochure.

## Hospital Planner

The dashboard has one persistent advisory plan shared by Guided Finder, Hospital Planner and Package. Open **Hospital Setup** to configure the hospital's type, name, capacity, services and dates. Valid configuration edits save automatically. Package additions/removals and planner solution checkboxes update the same selected-product list immediately. Finder answers also survive reloads.

Guided Finder, Hospital Planner, Hospital Setup, Workstreams, Timeline and Readiness are peers in the left navigation, without a hospital or advisory-plan group heading. Hospital Planner combines the hospital overview and selected solutions on one page. Existing Example Hospital settings, activity progress and selections migrate into the shared plan; all 18 MS Project-derived workstreams and 347 reference activities remain available. The migration retains the old records and a separate migration backup in browser storage. Fresh plans have no preselected demo solutions. Clearing selections does not re-add the seed offerings on reload.

The Workstreams page is a directory of 18 dedicated child pages, one per workstream. Each child has Table and Timeline views over the same activity IDs, advisory connections, shared search, scoped CSV export, clickable breadcrumbs and previous/next navigation. Full-page view preferences survive reloads; RHS workstream profiles always open in Timeline and keep an explicit Table choice while open. Existing `?ws=WS-*` links open the corresponding child page.

Explore the Gantt, change duration or earliest-start assumptions, inspect dependencies and critical activities, record readiness evidence, select advisory support and export backups or schedules. The Scenarios & Exports page is removed; Backups & downloads is a compact section on Hospital Planner, while existing comparison history stays in saved data. The requested opening date and dependency forecast remain distinct.

The single plan is saved in the current browser. Export JSON backups for portability; there is no shared cloud project storage. Reference durations, workload coefficients, local requirements and resourcing require specialist confirmation. See [the method and limitations](docs/planner-method.md).

Every dashboard page uses the Guided Finder blue canvas, with a dark navy left navigation and top bar and a white Package button. Solution catalog rows include a Workstreams column opening a workstream RHS profile with the same activity content, Table/Timeline views and actions as the dedicated child page; the old domain-level workstream callout is removed. Solution profiles show their connected workstreams using the shared Gantt by default, with a Table toggle. Both show every mapped workstream, including those outside the current service scope. Explicit solution/workstream labels keep overlapping titles from receiving duplicate tags. Workstream status colors use the saved plan consistently across the catalogue, navigation and RHS profiles, including after configuration/activity edits and changes in another tab. Catalogue workstream links omit scope subtitles; detailed connection roles remain available in solution profiles.

Page content and table rows reveal in a short stagger as they appear; timeline bars grow from their start dates to their scheduled widths. Reduced-motion settings show content immediately.

The plan overview and Hospital Setup use the full blue workspace style. Hospital setup starts with prefilled dates, name, capacity and service choices; quantities use sliders with common-value presets. Radio cards show the selected default for stage, planning scale, digital foundation, teams and international hiring. A confirmed building-handover date is optional. Capacity and service-count limits keep the form consistent, and the live preview recalculates as choices change.

Project setup includes a blue left-hand navigation panel with every question, Back, reset-to-opened-values and a live Your answers summary. Hospital Setup is the configuration page for the shared plan.

A collapsible right pane shows a live, white-wireframe 3D hospital concept alongside the form. Below the model, a compact timeline lists all 18 workstreams with start/completion dates and planning-start, target-opening and forecast-opening summaries. It updates on every valid setup edit using the same schedule and workstream ranges as the dashboard and RHS profiles; out-of-scope workstreams are identified without invented dates. Invalid/incomplete edits retain the last saved schedule with an explanatory message. Bed capacity, department count, selected services and hospital/large-hospital/campus scale visibly change its massing, department modules and expansion reserve. Every element has a label, hidden initially; the latest edited or added element receives the only focused label. Click a model element or choose it in the inspector to reveal its label. Drag to orbit, Shift/right-drag to pan, scroll or pinch to zoom, or use the zoom, north, top-view and reset controls. Auto-rotation can be paused and starts paused when reduced motion is requested. Collapse the pane to restore form width. This schematic preview is illustrative, not an architectural design or capacity validation; dates and delivery assumptions also update labeled planning overlays, rather than inventing clinical space.

Rectangular domain and solution tags use blue for existing hospitals, green for new hospitals and a diagonal blue/green split for both. Workstreams and their numbered activities use yellow/orange/red status tags. All 347 reference activities have stable parent-based codes (for example `PMO-01`); additional capacity-review gates continue their parent sequence. Internal source IDs remain unchanged for saved records and dependencies. See [codes and status rules](docs/planner-method.md#display-codes-and-status-tags).

The complete mapping is available at `reports/advisory-workstream-map.html`. `data/workstream-solutions.js` separates primary, supporting, conditional and post-opening relationships, and narrows activity links by workstream and subject. Owner-led delivery responsibilities remain unchanged. Workstream cards identify which workstreams are connected to the selected solutions. All selections use the same shared record; the template library remains available when a solution is removed.

Run automated planner and migration checks with `npm test`.

The initial implementation passed 21 planner/migration/export tests, six Git sync integration tests, and 19 local browser checks. Browser evidence is in `verification/hospital-planner-browser.json`; screenshots include the overview, interactive timeline, and mobile setup. An exported MS Project XML file was also read back successfully with MPXJ, including its workstream summaries and dependencies.

## Open the static dashboard

Open `index.html` directly in your browser. All application scripts and data are local files, so no server or build is needed. The browser stores this file's plan locally; JSON export/import provides portability. A browser may keep file-based and previously server-based storage separate.

`npm test` runs the local automated checks without starting a server. The existing `npm start` development shortcut remains available for optional development use.

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
