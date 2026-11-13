const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.resolve(__dirname, ".."),
  context = { window: {} };
vm.createContext(context);
for (const f of [
  "data/products.js",
  "data/expansion-products.js",
  "data/finder.js",
  "data/packages.js",
  "data/domains.js",
  "data/greenfield-template.js",
  "data/workstream-solutions.js",
])
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), context);
const T = JSON.parse(JSON.stringify(context.window.CC_GREENFIELD));
const catalog = JSON.parse(JSON.stringify(context.window.CC_CATALOG));
const domains = JSON.parse(JSON.stringify(context.window.CC_DOMAINS));
const E = require("../assets/planner-engine.js");
const X = require("../assets/planner-export.js");
const Example = require("../data/example-project.js");
const project = (changes = {}) => ({
  name: "Test Hospital",
  openingBeds: 100,
  totalBeds: 300,
  departmentCount: 8,
  departments: [
    "inpatient",
    "outpatient",
    "emergency",
    "icu",
    "surgery",
    "imaging",
    "laboratory",
    "pharmacy",
  ],
  startDate: "2026-11-13",
  targetDate: "2028-05-15",
  teams: 1,
  systems: "enterprise",
  internationalHires: false,
  holidays: [],
  taskStates: {},
  ...changes,
});

test("a fresh browser receives Example Hospital with all 18 MS Project workstreams", () => {
  const seeded = Example.ensure([], T, E);
  assert.equal(seeded.changed, true);
  assert.equal(seeded.projects.length, 1);
  const p = seeded.projects[0];
  assert.equal(p.name, "Example Hospital");
  assert.equal(p.openingBeds, 180);
  assert.equal(p.totalBeds, 500);
  assert.equal(p.departmentCount, 12);
  assert.equal(p.templateVersion, T.version);
  assert.deepEqual(
    p.exampleSource.workstreams,
    T.workstreams.map((w) => w.id),
  );
  const plan = E.schedule(T, p);
  for (const w of T.workstreams)
    assert.ok(plan.tasks.some((t) => t.workstream === w.id));
  assert.equal(plan.tasks.length, 346);
  assert.equal(plan.forecastDate, "2028-11-13");
  assert.equal(p.scenarios.length, 2);
  assert.ok(p.scenarios[0].forecastDate > p.scenarios[0].project.targetDate);
});
test("reloading the default project does not add duplicates", () => {
  const first = Example.ensure([], T, E);
  const reloaded = Example.ensure(
    JSON.parse(JSON.stringify(first.projects)),
    T,
    E,
  );
  assert.equal(reloaded.changed, false);
  assert.equal(reloaded.projects.length, 1);
  assert.deepEqual(reloaded.projects, first.projects);
});
test("an existing Example Hospital is adopted without replacing user edits", () => {
  const existing = {
    ...project(),
    id: "existing-example",
    name: "Example Hospital",
    openingBeds: 210,
    totalBeds: 600,
    taskStates: { "GF-140": { duration: 240 } },
    selectedProducts: ["IT-06"],
    scenarios: [],
  };
  const original = structuredClone(existing);
  const seeded = Example.ensure([existing], T, E);
  assert.equal(seeded.projects.length, 1);
  assert.equal(seeded.projects[0].id, existing.id);
  assert.deepEqual(existing, original);
  const { exampleSeed, exampleCatalogVersion, selectedProducts, ...preserved } =
    seeded.projects[0];
  const { selectedProducts: originalSelected, ...originalFields } = original;
  assert.ok(originalSelected.every((id) => selectedProducts.includes(id)));
  assert.equal(exampleCatalogVersion, T.solutionMappingVersion);
  assert.ok(exampleSeed);
  assert.deepEqual(preserved, originalFields);
});
test("other projects are preserved when adding the default example", () => {
  const other = { ...project(), id: "client-project", name: "Client Hospital" };
  const seeded = Example.ensure([other], T, E);
  assert.equal(seeded.projects.length, 2);
  assert.equal(seeded.projects[1], other);
});
test("renaming or archiving the example does not cause it to be recreated", () => {
  const p = Example.create(T, E);
  p.name = "My customized hospital";
  p.archived = true;
  const seeded = Example.ensure([p], T, E);
  assert.equal(seeded.changed, false);
  assert.equal(seeded.projects.length, 1);
  assert.equal(seeded.projects[0].archived, true);
});
test("new example projects do not share mutable project or scenario data", () => {
  const a = Example.create(T, E),
    b = Example.create(T, E);
  a.departments.pop();
  a.scenarios[0].project.departments.pop();
  a.taskStates["GF-140"] = { duration: 300 };
  assert.equal(b.departments.length, 8);
  assert.equal(b.scenarios[0].project.departments.length, 8);
  assert.deepEqual(b.taskStates, {});
  assert.ok(!b.scenarios[0].project.exampleSeed);
});

test("all 42 original IDs survive migration, each with one of ten primary domains", () => {
  assert.equal(domains.length, 10);
  assert.equal(catalog.length, 63);
  assert.equal(new Set(catalog.map((p) => p.id)).size, 63);
  for (const p of catalog) {
    assert.ok(domains.some((d) => d.id === p.domain));
    if (p.proposed) {
      assert.equal(p.pdf, undefined);
      assert.ok(p.deliverables.length >= 5);
    } else {
      assert.ok(p.pdf.endsWith(".pdf"));
      assert.ok(fs.existsSync(path.join(root, p.pdf)));
    }
    for (const d of p.secondaryDomains)
      assert.ok(domains.some((x) => x.id === d));
  }
  assert.equal(context.window.CC_PACKAGES.length, 0);
});
test("domain codes are unique and products are sequential in the complete catalog", () => {
  assert.equal(new Set(domains.map((d) => d.code)).size, 10);
  assert.equal(new Set(catalog.map((p) => p.code)).size, 63);
  for (const d of domains) {
    assert.match(d.code, /^[A-Z]{1,4}$/);
    catalog
      .filter((p) => p.domain === d.id)
      .forEach((p, i) => {
        assert.equal(p.code, `${d.code}-${String(i + 1).padStart(2, "0")}`);
        assert.equal(p.number, i + 1);
      });
  }
  // Moved offerings acquire their primary-domain code without breaking saved IDs.
  assert.equal(catalog.find((p) => p.id === "FIN-01").code, "STR-01");
  assert.equal(catalog.find((p) => p.id === "SL-06").code, "GOV-02");
  assert.equal(catalog.find((p) => p.id === "REC-05").code, "REG-02");
});
test("Human Resource uses HR codes while saved product IDs remain stable", () => {
  const d = domains.find((d) => d.id === "workforce");
  assert.equal(d.name, "Human Resource");
  assert.equal(d.code, "HR");
  assert.equal(catalog.filter((p) => p.domain === d.id).length, 17);
  assert.ok(
    catalog
      .filter((p) => p.domain === d.id)
      .every((p) => p.code.startsWith("HR-")),
  );
  assert.equal(catalog.find((p) => p.id === "GF-WORK-15").code, "HR-15");
  assert.equal(
    catalog.find(
      (p) => p.id === T.workstreams.find((w) => w.number === 9).leadProduct,
    ).code,
    "HR-15",
  );
});
test("21 proposed solutions give all 18 workstreams a primary advisory home", () => {
  assert.equal(catalog.filter((p) => p.proposed).length, 21);
  assert.equal(catalog.filter((p) => !p.proposed && p.pdf).length, 42);
  for (const w of T.workstreams) {
    const lead = catalog.find((p) => p.id === w.leadProduct);
    assert.ok(lead, w.name);
    assert.equal(lead.domain, w.domain);
    assert.ok(
      lead.workstreamLinks.some(
        (link) => link.id === w.id && link.role === "Primary advisory home",
      ),
    );
  }
  for (const p of catalog) assert.ok(p.workstreamLinks.length, p.code);
  for (const t of T.tasks)
    for (const id of t.products) assert.ok(catalog.some((p) => p.id === id));
});
test("equipment procurement is mapped to equipment advisory without changing owner responsibility", () => {
  const t = T.tasks.find(
    (t) => t.name === "Procurement, manufacture and delivery",
  );
  assert.equal(t.advisory, "Owner-led");
  assert.ok(t.products.includes("GF-FAC-02"));
  assert.ok(!t.products.includes("IT-02"));
});
test("opening recommendations cover every workstream without forcing post-opening or conditional scopes", () => {
  const p = project(),
    r = E.schedule(T, p),
    recs = E.recommendations(T, p, r, catalog);
  for (const w of T.workstreams)
    assert.ok(
      recs.some((r) => r.workstreams.includes(w.id)),
      w.name,
    );
  assert.ok(
    recs.every(
      (r) => r.product.lifecycle !== "Post-opening" && !r.product.conditionFlag,
    ),
  );
});
test("Example Hospital selects the primary mapped scopes without adding them to a global package", () => {
  const p = Example.create(T, E);
  for (const w of T.workstreams)
    assert.ok(p.selectedProducts.includes(w.leadProduct));
  assert.equal(p.exampleCatalogVersion, T.solutionMappingVersion);
});
test("all 18 workstreams have a home and every domain has at least one workstream", () => {
  assert.equal(T.workstreams.length, 18);
  for (const w of T.workstreams)
    assert.ok(domains.some((d) => d.id === w.domain));
  for (const d of domains)
    assert.ok(T.workstreams.some((w) => w.domain === d.id));
});
test("reference contains generalized real activities and no client contract data", () => {
  assert.equal(T.tasks.length, 347);
  assert.equal(
    T.tasks.reduce((n, t) => n + t.dependencies.length, 0),
    466,
  );
  assert.doesNotMatch(
    JSON.stringify(T),
    /Vinmec|Vinhomes|Can Gio|Ha Long|\bSchedule [A-Z]\b/i,
  );
  for (const t of T.tasks) {
    assert.ok(t.sourceId);
    assert.ok(T.workstreams.some((w) => w.id === t.workstream));
    for (const d of t.dependencies)
      assert.ok(T.tasks.some((t) => t.id === d.id));
  }
});
test("full template schedules without cycles and honors FS and SS relationships", () => {
  const r = E.schedule(T, project()),
    by = new Map(r.tasks.map((t) => [t.id, t]));
  assert.ok(r.tasks.length > 330);
  assert.ok(r.criticalCount > 0);
  for (const t of r.tasks)
    for (const d of t.dependencies) {
      const p = by.get(d.id);
      assert.ok(
        t.start >= (d.type === "SS" ? p.start : p.end) + d.lag,
        `${t.id} depends on ${d.id}`,
      );
    }
});
test("removing departments removes optional tasks and rewires valid dependencies", () => {
  const full = E.schedule(T, project()),
    small = E.schedule(
      T,
      project({ departments: ["inpatient", "outpatient"], departmentCount: 2 }),
    );
  assert.ok(small.tasks.length < full.tasks.length);
  for (const t of small.tasks) {
    assert.ok(
      !t.modules.length ||
        t.modules.some((m) => ["inpatient", "outpatient"].includes(m)),
    );
    for (const d of t.dependencies)
      assert.ok(small.tasks.some((t) => t.id === d.id));
  }
});
test("international physician modules are included only when selected", () => {
  assert.ok(!E.schedule(T, project()).tasks.some((t) => t.id === "GF-122"));
  assert.ok(
    E.schedule(T, project({ internationalHires: true })).tasks.some(
      (t) => t.id === "GF-122",
    ),
  );
});
test("larger bed and department workloads increase relevant durations", () => {
  const a = E.schedule(T, project()),
    b = E.schedule(
      T,
      project({ openingBeds: 250, totalBeds: 500, departmentCount: 20 }),
    );
  for (const t of a.tasks.filter((t) => t.scale === "workload" && !t.milestone))
    assert.ok(b.tasks.find((x) => x.id === t.id).duration >= t.duration);
  assert.ok(
    a.tasks.some(
      (t) =>
        t.scale === "workload" &&
        b.tasks.find((x) => x.id === t.id).duration > t.duration,
    ),
  );
});
test("an urgent launch target never compresses fixed lead times", () => {
  const a = E.schedule(T, project()),
    b = E.schedule(T, project({ targetDate: "2027-02-01" }));
  for (const t of a.tasks.filter((t) => t.scale === "fixed"))
    assert.equal(b.tasks.find((x) => x.id === t.id).duration, t.duration);
  assert.ok(b.gapDays > 0);
  assert.equal(b.earliestDate, a.earliestDate);
});
test("additional teams affect workloads while fixed tasks stay unchanged", () => {
  const a = E.schedule(T, project()),
    b = E.schedule(T, project({ teams: 4 }));
  for (const t of a.tasks.filter((t) => t.scale === "fixed"))
    assert.equal(b.tasks.find((x) => x.id === t.id).duration, t.duration);
  assert.ok(
    a.tasks.some(
      (t) =>
        t.scale === "workload" &&
        b.tasks.find((x) => x.id === t.id).duration < t.duration,
    ),
  );
});
test("the working calendar excludes weekends and supplied holidays", () => {
  const c = E.calendar("2026-11-13", ["2026-11-16"]);
  assert.equal(c.dateAt(0), "2026-11-13");
  assert.equal(c.dateAt(1), "2026-11-17");
  assert.equal(c.indexOf("2026-11-17"), 1);
  const a = E.schedule(T, project()),
    b = E.schedule(T, project({ holidays: ["2026-11-16", "2026-11-17"] }));
  assert.ok(b.earliestDate > a.earliestDate);
});
test("a non-working requested launch is distinguished from a dependency delay", () => {
  const r = E.schedule(T, project({ targetDate: "2030-01-06" }));
  assert.ok(r.bufferDays > 0);
  assert.equal(r.calendarShiftDays, 1);
  assert.equal(r.forecastDate, "2030-01-07");
});
test("late external handover moves the forecast instead of moving its constraint", () => {
  const r = E.schedule(T, project({ handoverDate: "2029-01-01" }));
  assert.ok(r.forecastDate >= "2029-01-01");
  assert.ok(r.gapDays > 0);
});
test("generalized handover waits for structure, fit-out and commissioning", () => {
  const r = E.schedule(T, project()),
    by = new Map(r.tasks.map((t) => [t.id, t]));
  assert.ok(by.get("GF-147").start >= by.get("GF-010").end);
  assert.ok(by.get("GF-151").start >= by.get("GF-147").end);
  for (const id of ["GF-010", "GF-151", "GF-155", "GF-156"])
    assert.ok(by.get("GF-012").start >= by.get(id).end);
});
test("editing a critical duration recalculates the forecast", () => {
  const a = E.schedule(T, project());
  const t = a.tasks.find((t) => t.critical && !t.milestone);
  const b = E.schedule(
    T,
    project({ taskStates: { [t.id]: { duration: t.duration + 300 } } }),
  );
  assert.ok(b.earliestDate > a.earliestDate);
});
test("eventual bed capacity produces explicit capacity review gates", () => {
  const a = E.schedule(T, project({ totalBeds: 100 })),
    b = E.schedule(T, project({ totalBeds: 500 }));
  assert.equal(a.tasks.filter((t) => t.id.startsWith("CAP-")).length, 0);
  assert.ok(b.tasks.filter((t) => t.id.startsWith("CAP-")).length > 0);
  assert.match(
    b.tasks.filter((t) => t.id.startsWith("CAP-")).at(-1).name,
    /500/,
  );
});
test("completion requires evidence, owner and actual finish", () => {
  assert.throws(
    () =>
      E.schedule(
        T,
        project({ taskStates: { "GF-045": { status: "complete" } } }),
      ),
    /require/,
  );
  const r = E.schedule(
    T,
    project({
      taskStates: {
        "GF-045": {
          status: "complete",
          owner: "Project Lead",
          evidence: "Signed appointment record",
          actualFinish: "2026-11-12",
        },
      },
    }),
  );
  assert.equal(r.tasks.find((t) => t.id === "GF-045").verified, true);
  assert.equal(r.tasks.find((t) => t.id === "GF-045").finishDate, "2026-11-12");
});
test("readiness gates cannot be completed while prerequisites remain unverified", () => {
  assert.throws(
    () =>
      E.schedule(
        T,
        project({
          taskStates: {
            "GF-015": {
              status: "complete",
              owner: "Sponsor",
              evidence: "Decision",
              actualFinish: "2026-11-12",
            },
          },
        }),
      ),
    /prerequisites/,
  );
});
test("advisory recommendations reference actual new-hospital products and activities", () => {
  const p = project(),
    r = E.schedule(T, p),
    recs = E.recommendations(T, p, r, catalog);
  assert.ok(recs.length > 10);
  for (const item of recs) {
    assert.ok(item.product.fit.includes("new"));
    for (const id of item.tasks) assert.ok(r.tasks.some((t) => t.id === id));
  }
  assert.equal(r.verifiedCount, 0);
});
test("invalid capacities, impossible dates and durations are rejected", () => {
  assert.ok(E.validate(project({ openingBeds: 500, totalBeds: 100 })).length);
  assert.ok(E.validate(project({ startDate: "2026-02-30" })).length);
  assert.ok(E.validate(project({ departments: [] })).length);
  assert.throws(
    () =>
      E.schedule(T, project({ taskStates: { "GF-045": { duration: "bad" } } })),
    /duration/,
  );
});
test("scheduler detects circular template dependencies", () => {
  const t = structuredClone(T);
  t.tasks
    .find((t) => t.id === "GF-045")
    .dependencies.push({ id: "GF-016", type: "FS", lag: 0 });
  assert.throws(() => E.schedule(t, project()), /Circular/);
});
test("MS Project XML preserves 18 workstream summaries, activities, calendars and links", () => {
  const p = project({ holidays: ["2026-12-25"] }),
    r = E.schedule(T, p),
    xml = X.xml(T, p, r, domains);
  assert.equal(
    (xml.match(/<OutlineLevel>1<\/OutlineLevel>/g) || []).length,
    18,
  );
  assert.equal(
    (xml.match(/<OutlineLevel>2<\/OutlineLevel>/g) || []).length,
    r.tasks.length,
  );
  assert.equal(
    (xml.match(/<PredecessorLink>/g) || []).length,
    r.tasks.reduce((n, t) => n + t.dependencies.length, 0),
  );
  assert.match(xml, /<Exception>/);
  assert.match(xml, /2026-12-25/);
  assert.match(xml, /<ConstraintDate>2028-05-15T08:00:00/);
  const quoted = X.xml(T, project({ name: "A & B <Hospital>" }), r, domains);
  assert.match(quoted, /A &amp; B &lt;Hospital&gt;/);
});
