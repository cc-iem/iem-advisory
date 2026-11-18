# Advisory Solution Builder

Advisory catalog and interactive Hospital Planner, based on the public site at <https://ccconnected-advisory-builder.pages.dev/>, captured on November 12, 2026.

The original copy was verified byte for byte before enhancement. The workspace now has ten advisory domains, a persistent left navigation, and a generalized greenfield Hospital Planner. The catalog has 63 solutions: 42 existing offerings with their original brochures and 21 explicitly labelled proposed advisory scopes. No framework, dependency installation, or build step is required.

Domain badges and advisory reference codes use STR (Strategy), GOV (Governance & Activation), FIN (Finance), REG (Regulatory), FAC (Facilities & Equipment), DIG (Digital), CLIN (Clinical Operations), HR (Human Resource), SQPE, and SUP (Support Services). Product codes run sequentially within the primary domain using the complete **All hospitals** catalog, e.g. STR-01. Hospital filters do not renumber products. Saved selections, internal IDs and original brochure filenames remain compatible. Every domain now has solutions and every workstream has a primary advisory home. Proposed scopes include detailed deliverables, client inputs, purchase rationale and ownership boundaries; they do not imply a confirmed delivery capability or an existing brochure.

## Selected Solutions and hospital planning

The dashboard has one persistent advisory plan shared by Advisory Planner, Selected Solutions and Package. Open **Project Planner** to configure the hospital's type, name, capacity, services and dates. Valid configuration edits save automatically. Add/remove controls in Package and Selected Solutions update the same selected-product list immediately. Finder answers and the current step also survive reloads. All four Advisory Planner steps are clickable from the start; each question has an eligible default, so jumping to Recommendation works immediately. Back and step changes retain answers. Changing domain or hospital type replaces incompatible choices with valid defaults. Advisory-area choices show numbered squares for their eligible solutions, matching the Portfolio and its stable solution numbers.

Advisory Planner contains Domains and Selected Solutions as child navigation items. Domains expands to the ten advisory domains. Both navigation groups remember expansion independently. Project Planner is the second parent node, containing Workstreams, Gates, Accountable Role and Readiness. Workstreams expands to its 18 child pages. Every navigation node uses a relevant outline icon with the same stroke weight; domain/workstream codes remain in link tooltips and keep their colored tags in dashboard content. The separate Advisory catalog caption is removed. Selected Solutions groups the complete solution table under collapsible advisory domains, with standard workstream-tag previews visible while collapsed. Domain Add/Remove buttons select or remove all solutions in that domain; Clear removes the whole domain, including a partial selection. Expansion is remembered independently in Selected Solutions and Package. Selected rows have a clear background, edge marker and status badge; Add and Remove use distinct button treatments. Domain containers, controls and tags follow the rectangular Roboto design system. It lists all 63 available solutions, with related workstream tags, numbered activity heatmaps beneath each tag and Add/Remove controls. The heatmaps reuse the advisory catalogue renderer, including the same status colors, full-code tooltips and activity-profile actions. Package uses the exact same row component, order, columns, profile links and responsive layout, filtered to selected solutions only. Adding/removing services updates both views immediately and preserves the page scroll position. Existing Example Hospital settings, activity progress and selections migrate into the shared plan; all 18 MS Project-derived workstreams and 347 reference activities remain available. The migration retains the old records and a separate migration backup in browser storage. Fresh plans have no preselected demo solutions. Clearing selections does not re-add the seed offerings on reload.

The Workstreams parent page is the interactive Gantt previously shown on Timeline. The separate Timeline page is removed and legacy Timeline links open Workstreams. All 18 workstreams retain dedicated child pages in the left navigation. Each child has Table and Timeline views over the same activity IDs, advisory connections, shared search, scoped CSV export, clickable breadcrumbs and previous/next navigation. Full-page view preferences survive reloads; RHS workstream profiles always open in Timeline and keep an explicit Table choice while open. Existing `?ws=WS-*` links open the corresponding child page.

Explore the Gantt, change duration or earliest-start assumptions, inspect dependencies and critical activities, record readiness evidence, select advisory support and export backups or schedules. The Scenarios & Exports page and backup/download footer are removed; existing comparison history stays in saved data. CSV and MS Project XML schedule exports remain on Workstreams. The requested opening date and dependency forecast remain distinct.

The single plan is saved in the current browser. There is no shared cloud project storage; stored backup/import compatibility is retained. Reference durations, workload coefficients, local requirements and resourcing require specialist confirmation. See [the method and limitations](docs/planner-method.md).

Every dashboard page uses the Advisory Planner blue canvas, with a dark navy left navigation and top bar and a white Package button. Solution catalog rows include a Workstreams column opening a workstream RHS profile with the same activity content, Table/Timeline views and actions as the dedicated child page; the old domain-level workstream callout is removed. Solution profiles show their connected workstreams using the shared Gantt by default, with a Table toggle. Both show every mapped workstream, including those outside the current service scope. All RHS profiles close on an outside click; interacting inside or dragging a form control outside keeps the pane open. Explicit solution/workstream labels keep overlapping titles from receiving duplicate tags. Workstream status colors use the saved plan consistently across the catalogue, navigation and RHS profiles, including after configuration/activity edits and changes in another tab. Catalogue workstream links omit scope subtitles; detailed connection roles remain available in solution profiles.

Page content and table rows reveal in a short stagger as they appear; timeline bars grow from their start dates to their scheduled widths. Reduced-motion settings show content immediately.

Activity RHS profiles include **Pre-requisite** and **Dependency** lists from the same scheduled graph as Readiness, with relationship type, working-day lag and source/generalization provenance. In every timeline, click an activity code to select its relationships; click the name or bar to open its profile. Incoming arrows flow from prerequisites into the focused activity; outgoing arrows flow to its dependents. They remain hidden without a selection or open activity profile. Summary timelines support Show activities, and a labeled relationship context includes any endpoints outside the current workstream or filter. Clear the selection or close the profile to hide the arrows; reduced motion keeps the arrows static.

Selected Solutions and Hospital Planner use the full blue workspace style. Hospital setup starts with prefilled dates, name, capacity and service choices; quantities use sliders with common-value presets. Radio cards show the selected default for stage, planning scale, digital foundation, teams and international hiring. A confirmed building-handover date is optional. Capacity and service-count limits keep the form consistent, and the live preview recalculates as choices change.

Hospital Planner shows one numbered question per page, with its own step URL and a blue left navigation containing every question, Back, reset-to-opened-values and a live Your answers summary. Only the active question is visible; all default/current form values remain available for real-time scheduling. No Back/Next buttons or backup footer are added to the center question pages. Hospital Planner is the configuration page for the shared plan.

A collapsible right pane shows a live, white-wireframe 3D hospital concept alongside the form. Below the model, a compact timeline lists all 18 workstreams with start/completion dates and planning-start, target-opening and forecast-opening summaries. It updates on every valid setup edit using the same schedule and workstream ranges as the dashboard and RHS profiles; out-of-scope workstreams are identified without invented dates. Invalid/incomplete edits retain the last saved schedule with an explanatory message. Bed capacity, department count, selected services and hospital/large-hospital/campus scale visibly change its massing, department modules and expansion reserve. Every element has a label, hidden initially; the latest edited or added element receives the only focused label. Click a model element or choose it in the inspector to reveal its label. Drag to orbit, Shift/right-drag to pan, scroll or pinch to zoom, or use the zoom, north, top-view and reset controls. Auto-rotation can be paused and starts paused when reduced motion is requested. Collapse the pane to restore form width. This schematic preview is illustrative, not an architectural design or capacity validation; dates and delivery assumptions also update labeled planning overlays, rather than inventing clinical space.

Duration labels throughout pages and RHS profiles use rectangular light-lavender badges (#EDE9FE) with dark-violet text (#5B21B6). All Table/Timeline/Gantt toggles give the active choice a contrasting fill. Package omits the hospital-fit text and marker squares while preserving the numbered activity heatmaps. The new/existing hospital options have fixed green/blue square prefixes.

Accountable roles use a circular initials avatar, role title and plain department/company name, without domain or workstream tags inside the role card. The Accountable Role page lists every reference activity owner and workstream lead, plus gate owners, decision authorities, advisers, current activity owners, evidence reviewers and condition owners. Its Gates column uses clickable magenta tags opening gate RHS profiles; duplicate role names are merged without losing gate associations.

Rectangular domain and solution tags follow the shared hospital type: green for a new hospital and blue for an existing hospital, across navigation, tables, profiles, selectors and Portfolio squares. Hospital-fit labels and tooltips still describe each solution's eligibility separately. Workstreams and their numbered activities use yellow/orange/red status tags. Each catalogue workstream includes a heatmap of all reference activity numbers and any current generated capacity gates, with the same status colors as the full code tags. In-scope cells open activity profiles; tooltips identify full codes, titles and status. Out-of-scope references remain visible without an inactive profile action. All 347 reference activities have stable parent-based codes (for example `PMO-01`); additional capacity-review gates continue their parent sequence. Internal source IDs remain unchanged for saved records and dependencies. See [codes and status rules](docs/planner-method.md#display-codes-and-status-tags).

The complete mapping is available at `reports/advisory-workstream-map.html`. `data/workstream-solutions.js` separates primary, supporting, conditional and post-opening relationships, and narrows activity links by workstream and subject. Owner-led delivery responsibilities remain unchanged. Workstream cards identify which workstreams are connected to the selected solutions. All selections use the same shared record; the template library remains available when a solution is removed.

Run automated planner and migration checks with `npm test`.

The initial implementation passed 21 planner/migration/export tests, six Git sync integration tests, and 19 local browser checks. Browser evidence is in `verification/hospital-planner-browser.json`; screenshots include the overview, interactive timeline, and mobile setup. An exported MS Project XML file was also read back successfully with MPXJ, including its workstream summaries and dependencies.

## Program gates

Open **Gates** alongside Workstreams to review six program decisions (`GATE-01`–`GATE-06`) and the existing generated capacity reviews (`GATE-07` onward). Magenta rectangular tags and diamond markers distinguish gates from hospital-fit badges, activity status and duration labels. Table and Gantt views use the same gate objects. Targets follow draft opening-relative month offsets; forecasts roll up the existing milestones. A first-year review does not move or replace the earlier stabilization milestone.

Gate profiles use the existing dismissible RHS panel, default to a source-milestone Gantt and also provide Table view. They show prerequisite evidence, original FS/SS relationships, accountable-role profiles, supporting solutions, criteria, decision history and target overrides. Gate selection reveals the real source milestones and their dependency arrows; no fictitious dependencies are added to composite reviews. Workstream timelines, solution profiles and the Hospital Planner model pane use one pinned gate row above the activity rows, with clickable magenta tags and full-height vertical date guides. The date axis and gate row stay visible during vertical chart scrolling. Nearby labels stack within the single row without moving their dates. The Gates page keeps individual gate rows; expand a row in either Table or Gantt view to inspect every related workstream and prerequisite/source activity. Expansion is remembered across both views. The phase strip remains on the Gates Gantt.

Reviews are manually recorded in the current browser. Approval needs every prerequisite activity verified, all review criteria accepted, a reviewer, evidence and a valid date. Conditional approvals require conditions, a named owner and a due date. Material schedule or evidence changes flag approved reviews for reassessment; adding/removing products does not certify readiness. Existing milestone completion records remain intact. CSV export includes current decisions, evidence and conditions; full project backups retain review history.

Hospital Planner also records construction status, single/phased opening and post-opening advisory support with default choices. Phased opening identifies the need for separate service-release reviews; the current source schedule represents the first opening. Selected Solutions and Package share saved Advise / Advise & Assure / Co-lead choices. Package gate preparation and solution gate links describe advisory coverage separately from hospital obligations. See [gate sources and rules](docs/planner-method.md#program-gate-register).

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
