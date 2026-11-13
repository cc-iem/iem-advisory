/* Dependency scheduler: deterministic, calendar-aware and independent of the UI. */
(function (root) {
  "use strict";
  var DAY = 86400000;
  function iso(date) {
    return new Date(date).toISOString().slice(0, 10);
  }
  function parse(s) {
    var value = String(s);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
      throw new Error("Enter a valid date.");
    var d = new Date(value + "T00:00:00Z");
    if (!Number.isFinite(+d) || d.toISOString().slice(0, 10) !== value)
      throw new Error("Enter a valid date.");
    return d;
  }
  function addDays(date, n) {
    return iso(+parse(date) + n * DAY);
  }
  function calendar(start, holidays) {
    var excluded = new Set(holidays || []),
      origin = +parse(start),
      dates = [],
      offsets = new Map();
    function working(d) {
      var w = new Date(d).getUTCDay();
      return w !== 0 && w !== 6 && !excluded.has(iso(d));
    }
    var cursor = origin;
    function fill(n) {
      while (dates.length <= n) {
        if (working(cursor)) {
          offsets.set(iso(cursor), dates.length);
          dates.push(iso(cursor));
        }
        cursor += DAY;
        if (dates.length > 20000)
          throw new Error("Schedule exceeds the supported planning horizon.");
      }
    }
    function dateAt(n) {
      n = Math.max(0, Math.round(n));
      fill(n);
      return dates[n];
    }
    function indexOf(date) {
      var target = +parse(date);
      if (target <= origin) return 0;
      var n = 0;
      for (var d = origin; d < target; d += DAY) {
        if (working(d)) n++;
        if (n > 20000)
          throw new Error("Date exceeds the supported planning horizon.");
      }
      return n;
    }
    return { dateAt: dateAt, indexOf: indexOf };
  }
  function validate(project) {
    var errors = [];
    if (typeof project.name !== "string" || !project.name.trim())
      errors.push("Enter a project name.");
    if (
      !Number.isInteger(+project.openingBeds) ||
      +project.openingBeds < 1 ||
      +project.openingBeds > 10000
    )
      errors.push("Opening beds must be between 1 and 10,000.");
    if (
      !Number.isInteger(+project.totalBeds) ||
      +project.totalBeds < +project.openingBeds ||
      +project.totalBeds > 10000
    )
      errors.push(
        "Eventual capacity must be at least the opening capacity, up to 10,000 beds.",
      );
    if (!Array.isArray(project.departments) || !project.departments.length)
      errors.push("Select at least one opening service.");
    if (
      project.departmentCount !== undefined &&
      (!Number.isInteger(+project.departmentCount) ||
        +project.departmentCount < (project.departments || []).length ||
        +project.departmentCount > 200)
    )
      errors.push(
        "Department count must cover the selected service families, up to 200 departments.",
      );
    try {
      if (parse(project.targetDate) < parse(project.startDate))
        errors.push(
          "The target opening date must be on or after the planning start.",
        );
    } catch (e) {
      errors.push("Enter valid planning and target dates.");
    }
    if (
      !Number.isInteger(+project.teams) ||
      +project.teams < 1 ||
      +project.teams > 4
    )
      errors.push("Parallel teams must be between 1 and 4.");
    if (project.holidays && !Array.isArray(project.holidays))
      errors.push("Holiday dates must be a list.");
    (Array.isArray(project.holidays) ? project.holidays : []).forEach(
      function (d) {
        try {
          if (iso(parse(d)) !== d) throw new Error();
        } catch (e) {
          errors.push("Use YYYY-MM-DD for holiday dates.");
        }
      },
    );
    if (project.handoverDate)
      try {
        parse(project.handoverDate);
      } catch (e) {
        errors.push("Enter a valid handover date.");
      }
    if (
      project.taskStates &&
      (typeof project.taskStates !== "object" ||
        Array.isArray(project.taskStates))
    )
      errors.push("Activity records must be an object.");
    if (project.selectedProducts && !Array.isArray(project.selectedProducts))
      errors.push("Selected services must be a list.");
    Object.entries(project.taskStates || {}).forEach(function (entry) {
      var s = entry[1];
      if (!s || typeof s !== "object") {
        errors.push("Invalid activity record.");
        return;
      }
      ["notBefore", "actualFinish"].forEach(function (k) {
        if (s[k])
          try {
            parse(s[k]);
          } catch (e) {
            errors.push("Enter a valid " + k + " date for " + entry[0] + ".");
          }
      });
      if (
        s.status === "complete" &&
        (!String(s.owner || "").trim() ||
          !String(s.evidence || "").trim() ||
          !s.actualFinish)
      )
        errors.push(
          "Completed activities require owner, evidence and actual finish.",
        );
      if (
        s.actualFinish &&
        s.actualFinish >
          new Intl.DateTimeFormat("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date())
      )
        errors.push("Actual finish cannot be in the future.");
    });
    return errors;
  }
  function schedule(template, project) {
    var errors = validate(project);
    if (errors.length) throw new Error(errors.join(" "));
    var cal = calendar(project.startDate, project.holidays),
      library = template.tasks.slice();
    var capacityBase = template.tasks.find(function (t) {
      return t.id === "GF-447";
    });
    if (capacityBase && +project.totalBeds > +project.openingBeds) {
      var count = Math.min(
        6,
        Math.ceil(
          (+project.totalBeds - +project.openingBeds) /
            Math.max(25, Math.round(+project.openingBeds / 2)),
        ),
      );
      for (var c = 1; c <= count; c++)
        library.push(
          Object.assign({}, capacityBase, {
            id: "CAP-" + String(c).padStart(2, "0"),
            name:
              "Capacity review: " +
              Math.round(
                +project.openingBeds +
                  ((+project.totalBeds - +project.openingBeds) * c) / count,
              ) +
              " operational beds",
            deliverable:
              "Evidence-based decision on staff, licensing, demand and readiness for the next capacity phase",
            duration: 0,
            milestone: true,
            gate: true,
            scale: "fixed",
            modules: [],
            notes:
              "Illustrative review spacing is 20 working days. Confirm capacity-release criteria and timing before using this as an approved ramp-up plan.",
            dependencies: [
              {
                id:
                  c === 1 ? "GF-447" : "CAP-" + String(c - 1).padStart(2, "0"),
                type: "FS",
                lag: 20,
              },
            ],
          }),
        );
    }
    var all = new Map(
      library.map(function (t) {
        return [t.id, t];
      }),
    );
    var selected = library.filter(function (t) {
      return (
        (!t.modules.length ||
          t.modules.some(function (m) {
            return project.departments.indexOf(m) !== -1;
          })) &&
        (!t.internationalOnly || project.internationalHires)
      );
    });
    var active = new Set(
        selected.map(function (t) {
          return t.id;
        }),
      ),
      tasks = new Map(),
      order = [],
      visiting = new Set(),
      visited = new Set();
    function resolve(dep, trail) {
      if (active.has(dep.id)) return [dep];
      if (trail.has(dep.id))
        throw new Error("Circular dependency in optional module.");
      var skipped = all.get(dep.id);
      if (!skipped) return [];
      var next = new Set(trail);
      next.add(dep.id);
      return skipped.dependencies.flatMap(function (p) {
        return resolve(p, next);
      });
    }
    selected.forEach(function (t) {
      var override = (project.taskStates || {})[t.id] || {},
        factor = 1;
      if (
        override.duration !== undefined &&
        (!Number.isFinite(+override.duration) ||
          +override.duration < 1 ||
          +override.duration > 4000)
      )
        throw new Error(
          "Activity duration must be between 1 and 4,000 working days.",
        );
      if (t.scale === "workload")
        factor =
          (1 +
            Math.max(0, +project.openingBeds / 100 - 1) * 0.25 +
            Math.max(
              0,
              (project.departmentCount || project.departments.length) - 7,
            ) *
              0.08) /
          Math.sqrt(+project.teams);
      var duration = t.milestone
        ? 0
        : Math.max(
            1,
            Math.ceil(
              t.duration * (t.scale === "workload" ? Math.max(0.6, factor) : 1),
            ),
          );
      if (
        project.systems === "enterprise" &&
        t.workstream === "WS-07" &&
        /configuration|site build|workflow sessions/i.test(t.name)
      )
        duration = Math.max(1, Math.ceil(duration * 0.8));
      if (override.duration !== undefined && !t.milestone)
        duration = Math.max(1, Math.ceil(+override.duration));
      if (!Number.isFinite(duration) || duration > 4000)
        throw new Error(
          "Activity duration must be between 1 and 4,000 working days.",
        );
      var deps = t.dependencies.flatMap(function (d) {
        return resolve(d, new Set());
      });
      var unique = new Map();
      deps.forEach(function (d) {
        var key = d.id + ":" + d.type;
        var prev = unique.get(key);
        if (!prev || d.lag > prev.lag) unique.set(key, d);
      });
      var complete =
        override.status === "complete" &&
        !!(override.evidence || "").trim() &&
        !!(override.owner || "").trim() &&
        !!override.actualFinish;
      tasks.set(
        t.id,
        Object.assign({}, t, {
          duration: duration,
          dependencies: Array.from(unique.values()),
          state: override,
          verified: complete,
          start: 0,
          end: 0,
        }),
      );
    });
    function visit(id) {
      if (visited.has(id)) return;
      if (visiting.has(id))
        throw new Error("Circular activity dependency: " + id);
      visiting.add(id);
      tasks.get(id).dependencies.forEach(function (d) {
        visit(d.id);
      });
      visiting.delete(id);
      visited.add(id);
      order.push(id);
    }
    tasks.forEach(function (_, id) {
      visit(id);
    });
    var earliestOpening = 0;
    order.forEach(function (id) {
      var t = tasks.get(id),
        start = 0;
      if (
        t.verified &&
        t.gate &&
        t.dependencies.some(function (d) {
          return !tasks.get(d.id).verified;
        })
      )
        throw new Error(
          "Verify all direct prerequisites before completing " + t.name + ".",
        );
      t.dependencies.forEach(function (d) {
        var p = tasks.get(d.id);
        start = Math.max(start, (d.type === "SS" ? p.start : p.end) + d.lag);
      });
      if (t.state.notBefore)
        start = Math.max(start, cal.indexOf(t.state.notBefore));
      if (id === "GF-012" && project.handoverDate)
        start = Math.max(start, cal.indexOf(project.handoverDate));
      if (t.verified) {
        var actual = cal.indexOf(t.state.actualFinish);
        t.start = Math.max(0, actual - t.duration);
        t.end = actual;
      } else {
        if (id === "GF-016") {
          earliestOpening = start;
          start = Math.max(start, cal.indexOf(project.targetDate));
        }
        t.start = Math.ceil(start);
        t.end = t.start + t.duration;
      }
      t.startDate = t.verified ? t.state.actualFinish : cal.dateAt(t.start);
      t.finishDate = t.verified
        ? t.state.actualFinish
        : cal.dateAt(t.duration ? Math.max(t.start, t.end - 1) : t.end);
    });
    var launch = tasks.get("GF-016");
    if (launch.verified) earliestOpening = launch.start;
    var ancestors = new Set();
    function mark(id) {
      if (ancestors.has(id)) return;
      ancestors.add(id);
      tasks.get(id).dependencies.forEach(function (d) {
        mark(d.id);
      });
    }
    mark("GF-016");
    var latest = new Map();
    ancestors.forEach(function (id) {
      latest.set(id, Infinity);
    });
    latest.set("GF-016", earliestOpening);
    order
      .slice()
      .reverse()
      .forEach(function (id) {
        if (!ancestors.has(id)) return;
        var s = tasks.get(id);
        s.dependencies.forEach(function (d) {
          if (!ancestors.has(d.id)) return;
          var p = tasks.get(d.id);
          latest.set(
            d.id,
            Math.min(
              latest.get(d.id),
              latest.get(id) - d.lag - (d.type === "FS" ? p.duration : 0),
            ),
          );
        });
      });
    var target = cal.indexOf(project.targetDate),
      delta = target - earliestOpening;
    tasks.forEach(function (t, id) {
      var earliest = id === "GF-016" ? earliestOpening : t.start;
      t.slack = ancestors.has(id)
        ? Math.round(latest.get(id) - earliest)
        : null;
      t.targetSlack = t.slack === null ? null : t.slack + delta;
      t.critical = t.slack !== null && t.slack <= 0 && !t.verified;
      t.blocked = t.dependencies.some(function (d) {
        return !tasks.get(d.id).verified;
      });
    });
    var forecast = launch.startDate;
    return {
      tasks: Array.from(tasks.values()),
      order: order,
      earliestDate: cal.dateAt(earliestOpening),
      forecastDate: forecast,
      targetDate: project.targetDate,
      calendarShiftDays:
        cal.dateAt(earliestOpening) <= project.targetDate
          ? Math.max(
              0,
              Math.round((+parse(forecast) - +parse(project.targetDate)) / DAY),
            )
          : 0,
      gapDays: Math.max(
        0,
        Math.round((+parse(forecast) - +parse(project.targetDate)) / DAY),
      ),
      bufferDays: Math.max(
        0,
        Math.round(
          (+parse(project.targetDate) - +parse(cal.dateAt(earliestOpening))) /
            DAY,
        ),
      ),
      finishDate: cal.dateAt(
        Math.max.apply(
          null,
          Array.from(tasks.values()).map(function (t) {
            return t.end;
          }),
        ),
      ),
      omitted: library.length - tasks.size,
      criticalCount: Array.from(tasks.values()).filter(function (t) {
        return t.critical;
      }).length,
      verifiedCount: Array.from(tasks.values()).filter(function (t) {
        return t.verified;
      }).length,
    };
  }
  function recommendations(template, project, result, catalog) {
    var candidates = new Map();
    result.tasks
      .filter(function (t) {
        return !t.verified && (t.advisory !== "Owner-led" || t.advisorySupport);
      })
      .forEach(function (t) {
        t.products.forEach(function (id) {
          var p = catalog.find(function (x) {
            return x.id === id;
          });
          if (!p || !p.fit.includes("new")) return;
          if (p.conditionFlag && !project[p.conditionFlag]) return;
          var item = candidates.get(id) || {
            product: p,
            tasks: [],
            workstreams: [],
            score: 0,
          };
          item.tasks.push(t.id);
          if (!item.workstreams.includes(t.workstream))
            item.workstreams.push(t.workstream);
          item.score += t.critical ? 3 : 1;
          candidates.set(id, item);
        });
      });
    return Array.from(candidates.values()).sort(function (a, b) {
      return b.score - a.score;
    });
  }
  root.HospitalEngine = {
    schedule: schedule,
    validate: validate,
    calendar: calendar,
    iso: iso,
    addDays: addDays,
    recommendations: recommendations,
  };
  if (typeof module !== "undefined") module.exports = root.HospitalEngine;
})(typeof window !== "undefined" ? window : globalThis);
