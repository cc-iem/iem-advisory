# Hospital Planner: template and scheduling method

## Source and provenance

The generalized template was extracted locally from the MS Project activation reference supplied by the user. MPXJ read the MPP file into JSON. The original contains 450 schedule rows, including 76 summaries and 374 non-summary activities, and 500 dependency links.

`data/greenfield-template.js` contains 347 generalized activities, 18 operational workstreams, and 466 dependency links (462 retained links and four added completion checks). The source JSON and MPP are not stored in this repository. Each activity preserves its source task ID; the metadata records a hash of the local export and a template version.

Contract-specific advisory engagement rows, client names, absolute dates, private contract terms, actual progress, case-specific critical flags and regional licensing terminology were excluded or generalized. Notes are curated general planning observations, rather than copies of the client's commentary.

To rebuild with an MPXJ JSON export available locally:

```sh
python3 scripts/build_greenfield_template.py /absolute/path/to/export.json
```

The generated data is committed so running the website requires neither Java nor MPXJ.

## What is retained and changed

- Operational activities, deliverables, role-based ownership and applicable FS/SS predecessor relationships are retained.
- Pre-opening lag padding that positioned tasks on the client's particular calendar is removed. Original lag values remain as provenance on the dependency records. Post-opening review offsets remain provisional reference assumptions.
- The original compressed construction overlap is replaced with explicit completion checks. Fit-out waits for shell/core completion. Building commissioning waits for fit-out. Inspections, acceptance and handover records follow commissioning. Handover also waits for structure, construction completion and documentation.
- These added or converted links are marked `Generalization completion check`; original relationship types are retained on converted records.
- Only clearly service-specific activities are conditional. Shared, mixed-service and hospital-wide activities remain. Excluded nodes are rewired to their retained ancestors rather than leaving broken predecessor IDs.
- International physician hiring/licensing activities are conditional on the international-hire setting.
- Each workstream has one primary advisory domain. Products retain their IDs and brochures and may have secondary domain connections.

This is a reviewable planning template, not a specialist-approved universal hospital construction standard. Jurisdiction, scope, vendor lead times and local expertise remain essential.

## Inputs and duration rules

Inputs include opening beds, eventual bed capacity, department count, service families, planning start, requested launch date, current stage, enterprise versus new digital systems, parallel teams, international hires, external handover date and entered holidays.

Reference duration is converted using the source project's eight-hour working day. Only activities classified as workload-dependent are scaled:

```text
factor = (1 + 0.25 × max(0, openingBeds / 100 - 1)
            + 0.08 × max(0, departmentCount - 7)) / sqrt(parallelTeams)
duration = ceil(referenceDuration × max(0.6, factor))
```

Selected enterprise-system configuration activities receive a provisional 20% reduction when deploying existing group systems. Fixed-duration activities and milestones are not compressed by the bed or parallel-team rules. An activity's manually entered duration overrides the estimate.

These scaling coefficients are explicit draft assumptions and require calibration against additional projects. The reference 100-bed workload is a modelling anchor, not a claim that all hospitals of that size share the same effort. Current project stage is contextual and does not silently mark earlier work complete.

Eventual bed capacity adds up to six staged capacity-review milestones after the reference ramp-up activity. A provisional interval of 20 working days is visible in each gate's notes. The milestones are review decisions; they do not authorize beds to open automatically.

## Calendar and dependency forecast

The calendar excludes Saturday, Sunday and user-entered holiday dates. Dependencies are scheduled forward using finish-to-start and start-to-start relationships. External and activity-specific earliest dates remain constraints. Weekends move planned events to the next available working day.

The first-patient target is distinct from the earliest dependency forecast. When prerequisites forecast later, the planner reports the gap and uses the later date. A later requested opening is kept as the planned first-patient date; it does not change the earlier activity durations.

A backward pass over ancestors of first patient computes float and critical activities against the earliest opening. Post-opening work is scheduled separately downstream and does not inflate the opening critical path. Resource levelling, probabilistic confidence intervals, specialist staffing ratios and jurisdiction-specific legal approval forecasts are not implemented.

## Progress and readiness

Activity profiles and Readiness use `assets/activity-graph.js` over the current scheduler output. The Pre-requisite and Dependency sections list direct incoming and outgoing relationships with their actual FS/SS type and working-day lag. Each link identifies its MS Project-derived source task IDs, a marked generalization completion check or a generated capacity-review rule. Optional-service rewiring uses the current scheduler graph; no independent relationships are inferred by the UI.

Timeline code buttons select an activity without opening the profile; the name/bar opens it. `assets/timeline-links.js` shows only the focused activity’s direct edges, with arrowheads at the appropriate start/finish endpoints. Opening an activity temporarily takes focus over an explicit selection; closing it restores that selection, otherwise hides the arrows. Missing endpoints appear as actual activity rows in a labeled relationship context. Summary charts can expand their own activities. The same row/bar renderer and date axis are reused across full timelines, workstream profiles, solution profiles and the Hospital Planner model pane. No arrow connects an activity to an aggregate workstream bar. Selection is transient UI state and never changes plan data.

Verified completion requires a named accountable owner, completion evidence and an actual finish date. Gate completion additionally requires every direct prerequisite to be verified. The UI rejects future actual finish dates. Recording purchases or selecting advisory support does not complete activities.

Each of the 18 workstreams has a dedicated child page under Workstreams, reached through the directory, left navigation, catalog workstream column or project tables. Each page contains only its own activities and advisory connections, with separate activity search and a CSV export scoped to that workstream. Workstream URLs use their display code; legacy query links remain compatible. Each activity can be inspected from its workstream page, Gantt or readiness view. Its panel shows predecessors, successors, deliverables, reference role, advisory connections and provenance. Users can override duration and earliest start; dependent dates recalculate.

## Shared plan and downloads

`assets/single-project.js` owns one shared plan under `iem-advisory-project-v1`. Advisory Planner answers, the current Finder step, hospital configuration, selected products, task evidence and scenario comparisons belong to that record. The Finder fills each active question with its first eligible choice when no valid saved choice exists. All four steps are available immediately, including a direct jump to Recommendation. Navigation and Back preserve answers; changing a parent answer drops incompatible choices and defaults the active branch. Explicit Finder hospital-type changes retain the newly validated Finder answers, while hospital-type changes in Hospital Planner reset stale Finder answers. Package and planner selections are synchronized through project change events. Valid setup edits save automatically, while incomplete edits display a save-state message. Browser storage events keep other open tabs informed.

Migration adopts the active legacy project when it is identifiable, otherwise the most recently updated unarchived plan. It combines that plan's selected products with the old Package selections, preserves activity states, retains the untouched legacy records and writes `iem-advisory-single-project-migration-backup-v1`. Generic Example Hospital labels become My Hospital; user-defined names remain. The old seed utility remains available as the reference template/migration input, but is no longer called on startup to create a separate project or repopulate selections. Fresh shared plans start without demo selections or comparisons.

The UI has no project creation, switching or archive actions. Planner pages appear at the same navigation level as Advisory Planner; hospital/advisory-plan headings are removed. Selected Solutions replaces the former Hospital Planner overview. It contains only the all-63-solutions table, with colored related-workstream tags and package Add/Remove controls. Package uses the same renderer, ordering and responsive columns for its selected rows only. Selection changes preserve scroll and focus on the full page. Legacy overview/Selected Solutions URLs resolve to this page. Hospital Planner, previously New Project, edits the same plan as Finder. Legacy project URLs resolve to this plan's corresponding page. All 18 workstreams remain available, and cards identify connections to the selected solutions. Full-page Table/Timeline preferences are saved in workspace UI state; RHS profiles start in Timeline independently of those preferences. The Hospital Planner model pane includes an 18-workstream timeline with explicit start/completion dates, rendered by the same Gantt component. Every valid Dates & Delivery edit updates the saved schedule and all open profiles; filtered workstream summaries retain the full range of their scheduled activities. Target dates remain distinct from dependency forecasts and do not shorten fixed lead times. For incomplete/invalid form edits the pane identifies that it is showing the last saved schedule. Both full-page views render from the same filtered schedule, including generated capacity gates and the same detail actions.

The Scenarios & Exports page is removed. Existing comparison history is retained in the saved record and JSON backups. The backup/download footer is removed from Hospital Planner. CSV and MS Project XML remain available on the Workstreams Gantt; stored JSON backup compatibility is retained. Importing a JSON backup updates the current record and preserves its prior state in comparison history. This is not a shared cloud workspace or full MPP round-trip editor.

## Catalog migration

All 42 existing product IDs and brochure files remain. The ten domains are Strategy, Governance & Activation, Finance, Regulatory, Facilities & Equipment, Digital, Clinical Operations, Human Resource, SQPE, and Support Services.

The catalog now includes 21 additional proposed scopes, for 63 total solutions. Facilities & Equipment and Support Services have dedicated proposed offerings. Each proposed profile specifies deliverables, purchase rationale, client inputs and delivery boundaries; no brochure or confirmed delivery capability is implied. Every workstream has a primary advisory home, with supporting, conditional and post-opening connections kept distinct. Domain catalog tables list every connected workstream per solution, with role labels distinguishing primary, supporting, conditional and post-opening scope. The former domain-level callout is replaced by this solution-level column. Catalog workstream links open RHS profiles rendered from the same child-page body, with the same search, activity editing and scoped export, plus a local Table/Timeline toggle that defaults to Timeline on each opening. Solution profiles default to a Gantt of mapped workstream date ranges, with a Table toggle showing connection roles and dates. Empty optional workstreams remain visible as outside the current service scope. Both use the shared schedule and Gantt renderer; all changes feed the same saved plan. Explicit solution, workstream and activity labels prevent overlapping titles from gaining nested or duplicate tags.

`data/workstream-solutions.js` narrows activity-level connections by workstream and subject. A connection is advisory support, not an assignment to execute a hospital, vendor or contractor activity. Original `Owner-led` responsibility remains intact; proposed advisory support can review the relevant planning and readiness evidence. The model does not make advisers responsible for construction, clinical practice, procurement execution, licensing decisions or technical certification.

The old fixed twelve-product bundle is replaced in the UI by project-specific advisory selections. Opening recommendations include existing offerings and labelled proposed scopes suitable for new hospitals, ranked by unresolved related activities and critical-path coverage. Conditional partnership and AI scopes require their corresponding project condition; post-opening-only offerings are not forced into opening recommendations. Every catalog solution can also be selected explicitly through the additional-solution selector. Original `data/packages.js` and its brochure remain as provenance; the active portfolio migration clears the old runtime bundle.

## Verification

`npm test` checks migration completeness, workstream coverage, sanitization, valid dependencies, optional modules, calendar behavior, capacity rules, workload scaling, critical-path propagation, completion evidence and readiness gating. Browser evidence is stored separately under `verification/`.

`SOURCE.json` remains the unmodified original public-deployment snapshot. `npm run verify:source` intentionally reports changed application files after this implementation; it is a provenance comparison, not the revised application's acceptance test.


## Display codes and status tags

`data/workstream-codes.js` assigns the following stable display codes. A workstream that is its domain's sole primary workstream reuses the domain code. Other workstreams use distinct abbreviations. The original `WS-*` and `GF-*` keys remain the storage, import and dependency identifiers.

| Workstream | Code | Primary domain |
| --- | --- | --- |
| Governance & PMO | PMO | Governance & Activation |
| Strategy & Business Planning | BSP | Strategy |
| Finance | FIN | Finance |
| Regulatory & Licensing | REG | Regulatory |
| Building & Construction | BLD | Facilities & Equipment |
| Equipment & Biomedical Engineering | EQP | Facilities & Equipment |
| IT & Digital | DIG | Digital |
| Clinical Operations & Service Lines | COPS | Clinical Operations |
| Medical Staff | MED | Human Resource |
| Nursing | NURS | Clinical Operations |
| Clinical Support Services | CSUP | Clinical Operations |
| Safety, Quality & Patient Experience | SQPE | SQPE |
| Human Resources | HRES | Human Resource |
| Education & Training | EDU | Human Resource |
| Supply Chain | SCM | Support Services |
| Support Services & Facilities Operations | SUPP | Support Services |
| Marketing & Patient Access | MKT | Strategy |
| Activation & Operational Readiness | ACT | Governance & Activation |

Every reference activity is numbered sequentially in its parent workstream's original template order, such as `PMO-01`. Codes do not change when optional activities are filtered out. Dynamic capacity-review gates continue after the final reference activity in their parent workstream. Activity titles use sentence capitalization while preserving acronyms such as PMO, ICU and EHR; editorial fixes remove duplicate words and errors inherited from generalization. CSV exports include display codes and internal IDs, and MS Project XML names include display codes while retaining predecessor relationships.

Domain and solution tags use the same rectangular style, colored by the shared hospital type: green for a new hospital and blue for an existing hospital. The same selected color applies to navigation, tables, profiles, prose, selectors, Finder choices and Portfolio tiles. Changing hospital type updates existing rendered tags as well as future renders. Solution hospital-fit metadata and eligibility labels remain independent of this display color; colors do not widen eligibility. Numbered solution squares in advisory-area choices match the eligible Portfolio set and stable solution numbers.

Workstream and activity tags use a separate status palette, with text descriptions in tooltips and accessible labels:

- **Yellow:** on track/not started, in progress, or verified complete. Generic templates without a project are explicitly not assessed, and omitted workstreams are marked not in scope.
- **Orange:** an unfinished activity has negative target float, or its scheduled start is past and it has not been marked in progress.
- **Red:** an unfinished activity is past its scheduled finish, or an explicit blocked status is present.

Catalogue workstream heatmaps include every reference activity in its original order plus generated capacity reviews. Cells show only the numeric suffix of the activity code, use the same activity status color, and retain the complete code/title/status in their tooltip and accessible label. In-scope cells open the activity profile; out-of-scope references are visible without a profile action.

A workstream takes the most severe status of its unfinished activities. Future prerequisites alone do not make a workstream blocked. Verified completion still requires the existing evidence checks. Status is calculated separately for each project and uses the current local date.

## Live 3D concept and focused labels

The model uses schematic massing, not architectural sizing standards. Total beds change the tower count and dimensions. Opening beds change the active inpatient volume and the clinical wing sizes. Department counts add named-but-unspecified department modules, while service selections add or remove their specific wings. Hospital scale changes the spread and site/expansion reserve and is saved with the project. Partial camera fitting preserves visible size differences rather than normalizing every hospital to the same apparent size.

Every rendered segment belongs to a named element. Labels start hidden. A form edit focuses its corresponding element, highlights its outline and shows one anchored label; a newly added service or department receives focus. The next edit replaces that label. Removing an element focuses the remaining clinical podium and explains the removal. Clicking the model or using the element inspector can select an existing element or hide labels again. Date, stage, digital foundation, team and hiring settings update explicit planning markers, and name/location edits update their labels. These overlays represent planning context, not added clinical departments.

## Navigation and presentation

Hospital Planner presents each numbered question as its own step URL, keeping the underlying live controls and defaults in one shared form state so every real-time schedule and model update uses the complete configuration. Navigation stays in the left pane; there are no center Back/Next controls or backup footer. The Workstreams parent now contains the former Timeline Gantt, and old Timeline URLs resolve to it. Accountable role is a peer directory sourced from all reference activity owners and workstream leads; role profiles show initials and plain department names, protected from automatic code tagging.

Selected Solutions and Package share collapsible domain groups, bulk selection, workstream previews and activity heatmaps. All domain/solution, workstream/activity, numbered-square, duration and selection tags use zero-radius corners. Duration badges use #EDE9FE / #5B21B6. Active Table/Timeline/Gantt buttons use a different fill on both dark canvases and white RHS profiles.


## Program gate register

`data/gates.js` defines six proposed program-review groupings from the supplied `greenfield-builder.html` and `greenfield-activation.html`. `assets/gates-engine.js` projects these onto the existing scheduler result. The public example describes five pre-opening phases; the internal example adds a sixth first-year review. Their 287-task grouping is not substituted for the 347-activity generalized MS Project library.

| Gate | Review | Existing source milestones | Target offset |
| --- | --- | --- | --- |
| GATE-01 | Program authorized | GF-006 / ACT-02 | M−22 |
| GATE-02 | Model approved | GF-007 / ACT-03; GF-008 / ACT-04 | M−15 |
| GATE-03 | Build baseline accepted | GF-009 / ACT-05; GF-170 / EQP-05; GF-195 / DIG-07 | M−11 |
| GATE-04 | Activation authorized | GF-011 / ACT-07; GF-012 / ACT-08; GF-184 / EQP-18; GF-210 / DIG-21 | M−6 |
| GATE-05 | Opening authorized | GF-015 / ACT-11 | Around M0, before first patient |
| GATE-06 | Operational handover accepted | GF-017 / ACT-13, plus the first-year review horizon | M+12 |

M0 is requested first patient. Calendar-month offsets clamp to the last valid day of a month. These reference targets are not imposed on the activity scheduler and do not compress lead times. A target override is stored separately and may be cleared. Targets before engagement remain visible as inherited reviews. Forecast is the latest represented milestone finish; GATE-06 is additionally no earlier than twelve calendar months after forecast/actual first patient. This does not overwrite GF-017 stabilization timing. First patient (GF-016 / ACT-12) remains a separate event. Existing CAP-01 through CAP-06 projections receive stable GATE-07 through GATE-12 codes with no invented target baseline. Their original task codes, provisional spacing and source dependencies remain unchanged.

Readiness requires the existing prerequisite ancestry and any represented non-gate milestone to be verified, plus explicit review criteria with reviewer/evidence records. Gate decisions are stored under `project.gates[gateId]` as criteria, optional target override and append-only review history. They do not overwrite source activity progress or create duplicate schedule nodes. This is a browser-local planning record, not authenticated approval or permission to operate. Criteria are proposed checks requiring hospital agreement, not claimed extracts of detailed clinical or jurisdiction-specific standards. A recorded approval cannot have a future date or precede its prerequisite evidence; conditional decisions require a condition owner and due date. The first-year decision cannot be approved before the first-year horizon. A fingerprint of relevant setup, source dates/dependencies and evidence identifies approved/conditional records needing re-review after edits. Product selection and advisory involvement are excluded from that readiness fingerprint.

`assets/gates-ui.js` and `assets/gates.css` provide the register, RHS reviews, shared phase/gate timeline rows, target/forecast diamonds and full-chart guides. Magenta (#A61B72), white text and light-pink edges identify gates consistently; text describes readiness separately. Clicking a tag selects its source relationships; clicking a name/diamond opens its RHS. Composite reviews show the actual original source activity endpoints in relationship context instead of fabricating FS/SS edges to a new gate node. Both incoming and outgoing links preserve their original type, lag and provenance. The same renderer supplies master, child, solution, gate-profile and setup-model charts.

Post-opening advisory support, construction status and phased-opening context do not delete hospital requirements or mark inherited work complete. A phased-opening selection flags the need to agree additional service-release reviews; separate phase schedules are not synthesized without source dependencies and dates. `solutionInvolvement` stores Advise / Advise & Assure / Co-lead per product. Product-to-gate links follow the mapped source-activity ancestry and mean related preparation support; attendance, execution and approval responsibilities still need agreement. GATE-06 coverage requires first-year advisory support. The existing shared project store and backups preserve these fields; no new backend, project switcher or external storage is introduced.

### Gate presentation and expansion

All workstream charts use a single gate row pinned together with the date axis. Tags open the gate RHS; magenta vertical guides retain the underlying forecast position. Responsive label lanes prevent nearby or coincident dates from hiding tags. Gate dates, source milestones and dependencies remain unchanged.

The Gates register retains one expandable row per gate in Table and Gantt. Expansion reveals the gate's complete existing activity ancestry and source milestones, grouped by their actual workstreams, using the shared activity timeline renderer. Both views show the same IDs and dates. Expansion is stored as a browser UI preference, separate from gate approval records. Collapsing clears hidden timeline rows so dependency arrows cannot attach to invisible endpoints.
