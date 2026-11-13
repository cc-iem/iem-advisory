/* Default illustrative project. All workstream content comes from CC_GREENFIELD. */
(function (root) {
  "use strict";
  const SEED = "greenfield-example-v1";
  const ID = "example-hospital";
  const SAVED_AT = "2026-11-13T00:00:00.000Z";

  function create(template, engine) {
    const project = {
      id: ID,
      exampleSeed: SEED,
      templateVersion: template.version,
      name: "Example Hospital",
      location: "Illustrative greenfield project",
      openingBeds: 180,
      totalBeds: 500,
      departmentCount: 12,
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
      targetDate: "2028-11-13",
      stage: "planning",
      teams: 1,
      systems: "enterprise",
      internationalHires: false,
      holidays: [],
      handoverDate: "",
      taskStates: {},
      selectedProducts: Array.from(
        new Set(template.workstreams.map((w) => w.leadProduct).filter(Boolean)),
      ),
      exampleCatalogVersion: template.solutionMappingVersion,
      exampleSource: {
        templateVersion: template.version,
        workstreams: template.workstreams.map((w) => w.id),
        description: "Generalized MS Project greenfield activation template",
      },
      createdAt: SAVED_AT,
      updatedAt: SAVED_AT,
    };
    const scenario = (id, name, targetDate, baseline) => {
      const snapshot = JSON.parse(JSON.stringify({ ...project, targetDate }));
      delete snapshot.exampleSeed;
      return {
        id,
        name,
        baseline,
        savedAt: SAVED_AT,
        forecastDate: engine.schedule(template, snapshot).forecastDate,
        project: snapshot,
      };
    };
    project.scenarios = [
      scenario("example-baseline", "Baseline 1", "2027-11-13", true),
      scenario("example-scenario", "Scenario 2", project.targetDate, false),
    ];
    return project;
  }

  function ensure(projects, template, engine) {
    const saved = Array.isArray(projects) ? projects : [];
    const existing = saved.findIndex(
      (p) =>
        p &&
        (p.exampleSeed === SEED ||
          p.id === ID ||
          p.name === "Example Hospital"),
    );
    if (existing !== -1) {
      if (
        saved[existing].exampleSeed === SEED &&
        saved[existing].exampleCatalogVersion ===
          template.solutionMappingVersion
      )
        return { projects: saved, changed: false };
      // Adopt the existing example without overwriting its settings or user edits.
      const adopted = saved.slice();
      adopted[existing] = {
        ...saved[existing],
        exampleSeed: SEED,
        exampleCatalogVersion: template.solutionMappingVersion,
        selectedProducts: Array.from(
          new Set([
            ...(saved[existing].selectedProducts || []),
            ...template.workstreams.map((w) => w.leadProduct).filter(Boolean),
          ]),
        ),
      };
      return { projects: adopted, changed: true };
    }
    return { projects: [create(template, engine), ...saved], changed: true };
  }

  root.CCExampleProject = { create, ensure };
  if (typeof module !== "undefined") module.exports = root.CCExampleProject;
})(typeof window !== "undefined" ? window : globalThis);
