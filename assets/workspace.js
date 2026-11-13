(function () {
  "use strict";
  const T = window.CC_GREENFIELD,
    E = window.HospitalEngine,
    D = window.CC_DOMAINS,
    C = window.CC_CATALOG;
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) =>
    String(s == null ? "" : s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const domain = (id) => D.find((d) => d.id === id),
    ws = (id) => T.workstreams.find((w) => w.id === id);
  const today = () =>
    new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  const date = (s) =>
    s
      ? new Date(s + "T12:00:00").toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Not set";
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const uid = () =>
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : "p-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (e) {
      return fallback;
    }
  }
  let projects = read("iem-hospital-projects-v1", []),
    ui = read("iem-workspace-ui-v1", {}),
    route = {},
    current = null,
    result = null,
    activeTask = null,
    toastTimer,
    setupCursor = "name";
  if (!Array.isArray(projects)) projects = [];
  const pages = [
    ["overview", "Overview"],
    ["setup", "Setup"],
    ["workstreams", "Workstreams"],
    ["timeline", "Timeline"],
    ["readiness", "Readiness"],
    ["advisory", "Advisory Plan"],
    ["scenarios", "Scenarios & Exports"],
  ];
  const services = [
    ["inpatient", "Inpatient"],
    ["outpatient", "Outpatient"],
    ["emergency", "Emergency"],
    ["icu", "Intensive care"],
    ["surgery", "Surgery"],
    ["imaging", "Imaging"],
    ["laboratory", "Laboratory"],
    ["pharmacy", "Pharmacy"],
  ];
  const paths = {
    finder: "M4 5h16M4 12h11M4 19h6",
    planner: "M4 5h16v15H4zM8 2v6M16 2v6M4 11h16",
    catalog: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    project: "M3 6h7l2 3h9v11H3z",
    plus: "M12 4v16M4 12h16",
    page: "M6 3h9l4 4v14H6zM9 12h7M9 16h7",
    timeline: "M4 4v16h17M7 7h7M10 12h10M7 17h9",
    check: "M5 12l4 4L19 6",
    arrow: "M5 12h14M14 7l5 5-5 5",
  };
  const icon = (name) =>
    '<span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' +
    (paths[name] || paths.page) +
    '"/></svg></span>';
  const link = (href, label, name, active = false, code = "") =>
    '<a class="nav-item" href="' +
    href +
    '"' +
    (active ? ' aria-current="page"' : "") +
    ">" +
    (code
      ? '<span class="nav-domain-code" aria-hidden="true">' +
        esc(code) +
        "</span>"
      : icon(name)) +
    "<span>" +
    esc(label) +
    "</span></a>";
  function saveUI() {
    try {
      localStorage.setItem("iem-workspace-ui-v1", JSON.stringify(ui));
    } catch (e) {
      toast("Navigation preferences could not be saved in this browser.");
    }
  }
  function saveProjects() {
    try {
      localStorage.setItem(
        "iem-hospital-projects-v1",
        JSON.stringify(projects),
      );
    } catch (e) {
      toast(
        "Browser storage is full or unavailable. Export a project backup before leaving.",
      );
      return false;
    }
    return true;
  }
  function toast(message) {
    let el = $("#plannerToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "plannerToast";
      el.className = "planner-toast";
      el.setAttribute("role", "status");
      document.body.append(el);
    }
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.hidden = true), 4500);
  }
  function newProject() {
    return {
      id: uid(),
      templateVersion: T.version,
      name: "New hospital",
      openingBeds: 100,
      totalBeds: 300,
      startDate: today(),
      targetDate: E.addDays(today(), 540),
      departments: services.map((s) => s[0]),
      departmentCount: 8,
      teams: 1,
      systems: "enterprise",
      internationalHires: false,
      location: "",
      stage: "planning",
      holidays: [],
      handoverDate: "",
      taskStates: {},
      scenarios: [],
      selectedProducts: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  function persist() {
    current.updatedAt = new Date().toISOString();
    saveProjects();
    renderNav();
  }
  function projectURL(page, id = current?.id) {
    return "#planner/" + encodeURIComponent(id) + "/" + page;
  }
  function navSection(key, title, body) {
    const open = ui.expanded?.[key] !== false;
    return (
      '<div class="nav-section"><div class="nav-link-row"><p class="nav-caption" style="flex:1;margin:0">' +
      title +
      '</p><button class="nav-expand" data-nav-toggle="' +
      key +
      '" type="button" aria-label="Expand ' +
      title +
      '" aria-expanded="' +
      open +
      '">›</button></div><div' +
      (open ? "" : " hidden") +
      ">" +
      body +
      "</div></div>"
    );
  }
  function renderNav() {
    let nav =
      '<div class="nav-section">' +
      link("#finder", "Guided Finder", "finder", route.section === "finder") +
      link(
        "#planner",
        "Hospital Planner",
        "planner",
        route.section === "planner" && !current,
      ) +
      "</div>";
    let projectNav =
      link(
        "#planner",
        "My Projects",
        "project",
        route.section === "planner" && !current && route.page !== "new",
      ) + link("#planner/new", "New Project", "plus", route.page === "new");
    projects
      .filter((p) => !p.archived)
      .forEach((p) => {
        const open = ui.expanded?.[p.id] !== false;
        projectNav +=
          '<div class="nav-link-row"><button class="nav-expand" type="button" data-nav-toggle="' +
          esc(p.id) +
          '" aria-label="Expand ' +
          esc(p.name) +
          '" aria-expanded="' +
          open +
          '">›</button><a class="nav-item nav-project-name" href="' +
          projectURL("overview", p.id) +
          '"' +
          (current?.id === p.id ? ' aria-current="page"' : "") +
          ">" +
          esc(p.name) +
          "</a></div>";
        if (open)
          projectNav +=
            '<div class="nav-children">' +
            pages
              .map(([key, label]) => {
                const item = link(
                  projectURL(key, p.id),
                  label,
                  key === "timeline"
                    ? "timeline"
                    : key === "readiness"
                      ? "check"
                      : "page",
                  current?.id === p.id && route.page === key,
                );
                if (key !== "workstreams") return item;
                const expanded = ui.expanded?.["ws-" + p.id] === true;
                return (
                  '<div class="nav-link-row">' +
                  item +
                  '<button class="nav-expand" data-nav-toggle="ws-' +
                  p.id +
                  '" type="button" aria-label="Expand hospital workstreams" aria-expanded="' +
                  expanded +
                  '">›</button></div>' +
                  (expanded
                    ? '<div class="nav-children">' +
                      T.workstreams
                        .map((w) =>
                          link(
                            projectURL("workstreams", p.id) + "?ws=" + w.id,
                            String(w.number).padStart(2, "0") + " " + w.name,
                            "",
                            false,
                          ),
                        )
                        .join("") +
                      "</div>"
                    : "")
                );
              })
              .join("") +
            "</div>";
      });
    nav += navSection("projects", "Hospital projects", projectNav);
    nav += navSection(
      "catalog",
      "Advisory catalog",
      link(
        "#catalog",
        "All offerings",
        "catalog",
        route.section === "catalog" && !route.domain,
      ) +
        '<div class="nav-children">' +
        D.map((d) =>
          link("#catalog/" + d.id, d.name, "", route.domain === d.id, d.code),
        ).join("") +
        "</div>",
    );
    nav +=
      '<div class="nav-foot">Plans are saved in this browser.<br>Export backups to move between devices.<br><button class="text-button" data-plan-action="method" style="margin-top:8px">Template ' +
      esc(T.version) +
      " · Planning assumptions</button></div>";
    $("#navContent").innerHTML = nav;
  }
  function parseRoute() {
    const parts = location.hash.replace(/^#/, "").split("?")[0].split("/");
    if (parts[0] === "portfolio") parts[0] = "catalog";
    return {
      section: ["finder", "catalog", "planner"].includes(parts[0])
        ? parts[0]
        : "planner",
      id: parts[0] === "planner" && parts[1] !== "new" ? parts[1] : null,
      page:
        parts[0] === "planner"
          ? parts[1] === "new"
            ? "new"
            : parts[2] || "projects"
          : "",
      domain: parts[0] === "catalog" ? parts[1] : null,
    };
  }
  function renderBreadcrumb() {
    let crumbs;
    if (route.section === "catalog") {
      crumbs = [["Advisory catalog", "#catalog"]];
      if (domain(route.domain))
        crumbs.push([domain(route.domain).name, "#catalog/" + route.domain]);
    } else if (route.section === "finder") {
      crumbs = [["Guided Finder", "#finder"]];
    } else {
      crumbs = [["Hospital Planner", "#planner"]];
      if (current) {
        crumbs.push([current.name, projectURL("overview")]);
        crumbs.push([
          pages.find((p) => p[0] === route.page)[1],
          projectURL(route.page),
        ]);
      } else {
        crumbs.push(
          route.page === "new"
            ? ["New Project", "#planner/new"]
            : ["My Projects", "#planner"],
        );
      }
    }
    $("#pageBreadcrumb").innerHTML =
      "<ol>" +
      crumbs
        .map(
          ([label, href], i) =>
            '<li><a href="' +
            esc(href) +
            '" title="' +
            esc(label) +
            '"' +
            (i === crumbs.length - 1 ? ' aria-current="page"' : "") +
            ">" +
            esc(label) +
            "</a></li>",
        )
        .join("") +
      "</ol>";
  }
  function render() {
    route = parseRoute();
    current = projects.find((p) => p.id === route.id) || null;
    if (route.id && !current) {
      location.hash = "planner";
      toast(
        "That project is not saved in this browser. Import a backup or create a project.",
      );
      return;
    }
    if (current && !pages.some((p) => p[0] === route.page)) {
      location.hash = projectURL("overview");
      return;
    }
    $("#finder").hidden = route.section !== "finder";
    $("#portfolio").hidden = route.section !== "catalog";
    $("#planner").hidden = route.section !== "planner";
    document.body.classList.toggle("finder-active", route.section === "finder");
    document.body.classList.toggle(
      "planner-blue",
      route.section === "planner" && (!current || route.page === "setup"),
    );
    document.body.classList.toggle(
      "project-setup-active",
      route.section === "planner" &&
        (route.page === "new" || (current && route.page === "setup")),
    );
    renderBreadcrumb();
    if (route.section === "catalog")
      window.CCApp.catalog(domain(route.domain) ? route.domain : null);
    if (route.section === "finder")
      requestAnimationFrame(() => window.CCApp.refresh());
    if (route.section === "planner") {
      try {
        result = current ? E.schedule(T, current) : null;
        $("#plannerContent").innerHTML = current
          ? renderProject()
          : route.page === "new"
            ? setupHTML(newProject(), true)
            : landingHTML();
        if ($("#projectForm")) {
          setupCursor = "name";
          renderSetupNavigation($("#projectForm"));
        }
      } catch (e) {
        $("#plannerContent").innerHTML =
          head("Project needs attention", e.message) +
          '<a class="btn btn-primary" href="#planner">Back to projects</a>';
      }
    }
    renderNav();
    $("#top").scrollTop = 0;
    if (window.innerWidth <= 760) {
      document.body.classList.add("nav-collapsed");
      $("#navToggle").setAttribute("aria-expanded", "false");
    }
  }
  function head(title, subtitle, actions = "", kicker = "Hospital Planner") {
    return (
      '<div class="page-head"><div><p class="page-kicker">' +
      esc(kicker) +
      '</p><h1 class="page-title">' +
      esc(title) +
      "</h1>" +
      (subtitle ? '<p class="page-sub">' + esc(subtitle) + "</p>" : "") +
      "</div>" +
      (actions ? '<div class="page-actions">' + actions + "</div>" : "") +
      "</div>"
    );
  }
  const button = (label, action, extra = "", primary = false) =>
    '<button type="button" class="btn ' +
    (primary ? "btn-primary" : "btn-secondary") +
    '" data-plan-action="' +
    action +
    '" ' +
    extra +
    ">" +
    label +
    "</button>";
  const stat = (label, value, note) =>
    '<div class="planner-stat"><small>' +
    esc(label) +
    "</small><strong>" +
    esc(value) +
    "</strong><span>" +
    esc(note) +
    "</span></div>";
  function notice() {
    if (result.calendarShiftDays)
      return (
        '<div class="plan-notice"><strong>The requested date is outside the working calendar.</strong> Planned opening moves to ' +
        date(result.forecastDate) +
        ". The model has " +
        result.bufferDays +
        " calendar days of buffer before the requested date; confirm the intended opening-day calendar.</div>"
      );
    return result.gapDays
      ? '<div class="plan-notice warning"><strong>Forecast is ' +
          result.gapDays +
          " calendar days after the requested opening.</strong> Review the critical activities, scope and assumptions before changing the target.</div>"
      : '<div class="plan-notice success"><strong>' +
          result.bufferDays +
          " calendar days of modelled buffer before the target.</strong> This dependency forecast still needs local, duration and resource confirmation.</div>";
  }
  function landingHTML() {
    const shown = projects.filter((p) => !!p.archived === !!ui.showArchived);
    return (
      '<div class="planner-hero"><p class="page-kicker">Hospital Planner</p><h1>From opening ambition<br>to an actionable plan.</h1><p>Shape a new hospital around its services, people and opening date. Connect every workstream to the decisions and advisory support it needs.</p><a class="btn btn-light" href="#planner/new">Create a hospital plan&nbsp; →</a><div class="hero-stats"><div><strong>18</strong><span>connected workstreams</span></div><div><strong>' +
      T.tasks.length +
      '</strong><span>reference activities</span></div><div><strong>10</strong><span>advisory domains</span></div></div></div><div class="page-head"><h2 class="section-heading">Your hospital projects</h2><div class="page-actions">' +
      button(
        ui.showArchived ? "Hide archived" : "Show archived",
        "toggle-archived",
      ) +
      button("Import project", "import") +
      "</div></div>" +
      (shown.length
        ? '<div class="hospital-projects">' +
          shown
            .map(
              (p) =>
                '<article class="hospital-project-card"><p class="page-kicker">' +
                (p.archived ? "Archived plan" : "Hospital plan") +
                '</p><h3><a href="' +
                projectURL("overview", p.id) +
                '">' +
                esc(p.name) +
                '</a></h3><p class="project-location">' +
                esc(p.location || "Location to be confirmed") +
                '</p><div class="project-metrics"><div><strong>' +
                p.openingBeds +
                "</strong><span>opening beds</span></div><div><strong>" +
                p.departments.length +
                '</strong><span>service families</span></div></div><p class="project-target">Target opening · ' +
                date(p.targetDate) +
                '</p><div class="project-card-actions"><a class="btn btn-light" href="' +
                projectURL("overview", p.id) +
                '">Open plan →</a>' +
                button(
                  p.archived ? "Restore" : "Archive",
                  p.archived ? "unarchive-project" : "archive-project",
                  'data-project="' + p.id + '"',
                ) +
                "</div></article>",
            )
            .join("") +
          "</div>"
        : '<div class="empty-state"><h3>Your first hospital plan starts here</h3><p>Start with the defaults, then tailor capacity, services and opening date.</p><a class="btn btn-light" href="#planner/new">Create project</a></div>') +
      '<div class="plan-notice" style="margin-top:22px">Generalized from a detailed MS Project activation reference. Reference estimates are a starting point for specialist review. Projects stay in this browser until you export or share them.</div>'
    );
  }
  function field(label, name, value, type = "text", note = "", attrs = "") {
    return (
      '<label class="form-field">' +
      label +
      '<input type="' +
      type +
      '" name="' +
      name +
      '" value="' +
      esc(value) +
      '" ' +
      attrs +
      ">" +
      (note ? "<small>" + note + "</small>" : "") +
      "</label>"
    );
  }
  function select(label, name, value, options, note = "") {
    return (
      '<label class="form-field">' +
      label +
      '<select name="' +
      name +
      '">' +
      options
        .map(
          ([v, l]) =>
            '<option value="' +
            v +
            '"' +
            (String(value) === String(v) ? " selected" : "") +
            ">" +
            l +
            "</option>",
        )
        .join("") +
      "</select>" +
      (note ? "<small>" + note + "</small>" : "") +
      "</label>"
    );
  }
  function choiceCards(label, name, value, options, note = "") {
    return (
      '<fieldset class="choice-group"><legend>' +
      esc(label) +
      '</legend><div class="choice-options">' +
      options
        .map(
          ([v, title, detail]) =>
            '<label class="choice-card"><input type="radio" name="' +
            name +
            '" value="' +
            esc(v) +
            '"' +
            (String(value) === String(v) ? " checked" : "") +
            "><span><strong>" +
            esc(title) +
            "</strong>" +
            (detail ? "<small>" + esc(detail) + "</small>" : "") +
            "</span></label>",
        )
        .join("") +
      "</div>" +
      (note ? '<p class="choice-note">' + esc(note) + "</p>" : "") +
      "</fieldset>"
    );
  }
  function rangeField(label, name, value, min, max, presets, note, unit = "") {
    return (
      '<div class="form-field range-field"><label for="setup-' +
      name +
      '"><span>' +
      esc(label) +
      '</span><output id="setup-' +
      name +
      '-value" for="setup-' +
      name +
      '">' +
      value +
      esc(unit) +
      '</output></label><input type="range" id="setup-' +
      name +
      '" name="' +
      name +
      '" value="' +
      value +
      '" min="' +
      min +
      '" max="' +
      max +
      '" step="1" data-default-min="' +
      min +
      '" data-default-max="' +
      max +
      '" data-unit="' +
      esc(unit) +
      '"><div class="range-presets">' +
      presets
        .map(
          ([n, l]) =>
            '<button type="button" data-plan-action="set-range" data-range-field="' +
            name +
            '" data-value="' +
            n +
            '" aria-pressed="' +
            (n === +value) +
            '" aria-label="Set ' +
            esc(label) +
            " to " +
            n +
            '">' +
            esc(l || n) +
            "</button>",
        )
        .join("") +
      "</div><small>" +
      esc(note) +
      "</small></div>"
    );
  }
  function setupHTML(p, isNew = false) {
    const horizon = Math.round(
        (Date.parse(p.targetDate) - Date.parse(p.startDate)) / 86400000,
      ),
      scale =
        Math.max(p.openingBeds, p.totalBeds) <= 1000
          ? 1000
          : Math.max(p.openingBeds, p.totalBeds) <= 3000
            ? 3000
            : 10000;
    const formHTML =
      head(
        isNew ? "Plan a new hospital" : "Project setup",
        "Start with a complete plan. Choose the closest options, then adjust the sliders to match your hospital.",
        isNew
          ? '<a class="btn btn-secondary" href="#planner">Cancel</a>'
          : button("Export backup", "export-json"),
      ) +
      '<form id="projectForm" data-project-id="' +
      esc(p.id) +
      '"><div id="projectError" class="form-error" role="alert" hidden></div>' +
      '<section class="planner-card setup-section"><p class="page-kicker">01 · Your hospital</p><h2>What are you planning?</h2><p class="card-intro">Everything has a starting value. Rename your project whenever you are ready.</p><div class="form-grid">' +
      field(
        "Project name",
        "name",
        p.name,
        "text",
        "",
        'required maxlength="100"',
      ) +
      field(
        "Country / location",
        "location",
        p.location || "To be confirmed",
        "text",
        "Confirm the location when it is known.",
        'maxlength="120"',
      ) +
      "</div>" +
      choiceCards(
        "Current stage",
        "stage",
        p.stage,
        [
          ["planning", "Planning / design"],
          ["construction", "Under construction"],
          ["activation", "Preparing to open"],
        ],
        "Stage provides context; completion still needs activity-level evidence.",
      ) +
      "</section>" +
      '<section class="planner-card setup-section"><p class="page-kicker">02 · Capacity</p><h2>How large is your hospital?</h2><p class="card-intro">Use a preset or move the sliders. Eventual capacity stays at least as large as opening capacity.</p>' +
      choiceCards("Planning scale", "capacityScale", scale, [
        [1000, "Hospital", "Up to 1,000 beds"],
        [3000, "Large hospital", "Up to 3,000 beds"],
        [10000, "Hospital campus", "Up to 10,000 beds"],
      ]) +
      '<div class="form-grid">' +
      rangeField(
        "Beds at opening",
        "openingBeds",
        p.openingBeds,
        1,
        scale,
        [[100], [250], [500], [1000]],
        "Initial operational beds, rather than the building’s eventual capacity.",
        " beds",
      ) +
      rangeField(
        "Eventual bed capacity",
        "totalBeds",
        p.totalBeds,
        p.openingBeds,
        scale,
        [[300], [500], [1000]],
        "Adds future capacity-review gates; their timing needs confirmation.",
        " beds",
      ) +
      rangeField(
        "Departments at opening",
        "departmentCount",
        p.departmentCount || p.departments.length,
        Math.max(1, p.departments.length),
        200,
        [[8], [12], [20], [40]],
        "At least one department for each selected service family.",
        " departments",
      ) +
      "</div></section>" +
      '<section class="planner-card setup-section"><p class="page-kicker">03 · Opening services</p><h2>Which services will open first?</h2><p class="card-intro">Choose the service families in your opening scope. New plans start with all eight; shared hospital functions remain.</p><div class="service-options">' +
      services
        .map(
          ([id, label]) =>
            '<label class="service-option"><input type="checkbox" name="departments" value="' +
            id +
            '"' +
            (p.departments.includes(id) ? " checked" : "") +
            "><span>" +
            label +
            "</span></label>",
        )
        .join("") +
      "</div></section>" +
      '<section class="planner-card setup-section"><p class="page-kicker">04 · Dates & delivery</p><h2>When do you want to open?</h2><p class="card-intro">A target date sets the ambition. The live forecast shows what the dependency plan currently supports.</p><div class="form-grid">' +
      field(
        "Planning start",
        "startDate",
        p.startDate,
        "date",
        "Defaults to today for a new project.",
        "required",
      ) +
      field(
        "Target first-patient date",
        "targetDate",
        p.targetDate,
        "date",
        "Updates automatically when you move the target slider.",
        "required",
      ) +
      rangeField(
        "Calendar days until target",
        "targetDays",
        horizon,
        0,
        7300,
        [
          [365, "1 year"],
          [540, "18 months"],
          [730, "2 years"],
          [1095, "3 years"],
        ],
        "Presets use 365, 540, 730 and 1,095 calendar days.",
        " days",
      ) +
      "</div>" +
      choiceCards(
        "Building handover",
        "handoverMode",
        p.handoverDate ? "set" : "none",
        [
          ["none", "No fixed date yet", "Use the dependency forecast"],
          ["set", "Set a handover date", "Add a confirmed external constraint"],
        ],
      ) +
      '<div id="handoverField"' +
      (p.handoverDate ? "" : " hidden") +
      ">" +
      field(
        "Earliest building handover",
        "handoverDate",
        p.handoverDate || E.addDays(p.startDate, Math.max(0, horizon - 90)),
        "date",
        "Only applied when “Set a handover date” is selected.",
      ) +
      "</div>" +
      choiceCards(
        "Digital foundation",
        "systems",
        p.systems,
        [
          [
            "enterprise",
            "Existing group systems",
            "Deploy an established platform",
          ],
          ["new", "New hospital systems", "Build or procure new platforms"],
        ],
        "An established platform reduces provisional configuration workload by 20%.",
      ) +
      choiceCards(
        "Parallel delivery teams",
        "teams",
        p.teams,
        [
          [1, "1 team"],
          [2, "2 teams"],
          [3, "3 teams"],
          [4, "4 teams"],
        ],
        "Affects workload activities only; fixed lead times remain unchanged.",
      ) +
      choiceCards(
        "International physician hires",
        "internationalHires",
        p.internationalHires ? "yes" : "no",
        [
          ["no", "Not in initial scope"],
          [
            "yes",
            "Include international hires",
            "Add recruitment and local licensing",
          ],
        ],
      ) +
      (isNew
        ? ""
        : '<label class="form-field">Non-working holiday dates<textarea name="holidays" placeholder="YYYY-MM-DD, one date per line">' +
          esc(p.holidays.join("\n")) +
          "</textarea><small>Weekends are already excluded.</small></label>") +
      "</section>" +
      '<details class="planner-card planning-basis"><summary>Planning basis & assumptions</summary><p class="card-intro">Reference estimates need review with the workstream leads before baselining.</p><ul class="plan-list">' +
      T.assumptions.map((a) => "<li>" + esc(a) + "</li>").join("") +
      "</ul></details>" +
      '<div id="setupPreview" class="plan-notice setup-preview" aria-live="polite">' +
      previewHTML(p) +
      '</div><div class="form-actions"><span class="muted">Saved in this browser · Template ' +
      T.version +
      '</span><button class="btn btn-primary" type="submit">' +
      (isNew ? "Generate hospital plan" : "Save & recalculate") +
      "</button></div></form>";
    const sidebarHTML =
      '<aside class="setup-side" id="setupSidebar" aria-label="Project setup navigation"><div class="setup-nav-controls"><button type="button" class="link-btn" id="setupBack" data-plan-action="setup-back">← Back</button><button type="button" class="link-btn" data-plan-action="reset-setup" title="Restore the values from when you opened this form">Reset answers</button></div><nav aria-label="Setup progress"><p class="finder-nav-title">Your hospital plan</p><p class="setup-nav-note">Every question has a starting answer. Select any question to review it.</p><ol class="setup-steps" id="setupSteps"></ol></nav><section class="setup-answers" id="setupAnswers" aria-label="Your answers"></section></aside>';
    return (
      '<div class="setup-shell"><button type="button" class="setup-nav-toggle" data-plan-action="toggle-setup-nav" aria-controls="setupSidebar" aria-expanded="false">Setup navigation <span aria-hidden="true">⌄</span></button>' +
      sidebarHTML +
      '<div class="setup-main">' +
      formHTML +
      "</div></div>"
    );
  }
  const setupQuestions = [
    ["name", "Project name"],
    ["location", "Country / location"],
    ["stage", "Current stage"],
    ["capacityScale", "Planning scale"],
    ["openingBeds", "Beds at opening"],
    ["totalBeds", "Eventual capacity"],
    ["departmentCount", "Departments at opening"],
    ["departments", "Opening services"],
    ["startDate", "Planning start"],
    ["targetDays", "Days until target"],
    ["targetDate", "Target opening"],
    ["handoverMode", "Building handover"],
    ["handoverDate", "Handover date"],
    ["systems", "Digital foundation"],
    ["teams", "Delivery teams"],
    ["internationalHires", "International hires"],
    ["holidays", "Holiday dates"],
  ];
  function visibleSetupQuestions(form) {
    return setupQuestions.filter(
      ([key]) =>
        form.querySelector('[name="' + key + '"]') &&
        (key !== "handoverDate" || !$("#handoverField", form).hidden),
    );
  }
  function setupAnswer(key, f) {
    const value = f.get(key);
    if (key === "departments")
      return f
        .getAll(key)
        .map((id) => services.find((s) => s[0] === id)?.[1] || id)
        .join(", ");
    if (["startDate", "targetDate", "handoverDate"].includes(key))
      return date(value);
    if (["openingBeds", "totalBeds"].includes(key)) return value + " beds";
    if (key === "departmentCount") return value + " departments";
    if (key === "targetDays") return value + " days";
    if (key === "teams") return value + (value === "1" ? " team" : " teams");
    if (key === "capacityScale")
      return "Up to " + Number(value).toLocaleString() + " beds";
    const labels = {
      planning: "Planning / design",
      construction: "Under construction",
      activation: "Preparing to open",
      enterprise: "Existing group systems",
      new: "New hospital systems",
      none: "No fixed date yet",
      set: "Confirmed date",
      no: "Not in initial scope",
      yes: "Include international hires",
    };
    if (
      ["stage", "systems", "handoverMode", "internationalHires"].includes(key)
    )
      return labels[value] || value;
    if (key === "holidays") return value?.trim() || "No additional dates";
    return value?.trim() || "Not set";
  }
  function renderSetupNavigation(form) {
    const questions = visibleSetupQuestions(form),
      f = new FormData(form);
    if (!questions.some(([key]) => key === setupCursor)) setupCursor = "name";
    $("#setupSteps").innerHTML = questions
      .map(
        ([key, label], i) =>
          "<li" +
          (key === setupCursor ? ' aria-current="step"' : "") +
          '><button type="button" data-plan-action="goto-setup" data-question="' +
          key +
          '"><span class="step-index" aria-hidden="true">' +
          (i + 1) +
          "</span>" +
          esc(label) +
          "</button></li>",
      )
      .join("");
    $("#setupBack").disabled = questions[0][0] === setupCursor;
    $("#setupAnswers").innerHTML =
      "<h3>Your answers</h3><dl>" +
      questions
        .map(
          ([key, label]) =>
            '<div class="answer-row"><dt>' +
            esc(label) +
            "</dt><dd>" +
            esc(setupAnswer(key, f)) +
            '</dd><button type="button" class="link-btn" data-plan-action="goto-setup" data-question="' +
            key +
            '" aria-label="Review ' +
            esc(label) +
            '">Review</button></div>',
        )
        .join("") +
      "</dl>";
  }
  function goSetupQuestion(key) {
    const form = $("#projectForm"),
      target =
        form.querySelector('[name="' + key + '"]:checked') ||
        form.querySelector('[name="' + key + '"]');
    if (!target) return;
    setupCursor = key;
    renderSetupNavigation(form);
    (
      target.closest(".form-field,.choice-group,.setup-section") || target
    ).scrollIntoView({ block: "center", inline: "nearest" });
    target.focus({ preventScroll: true });
    if (window.innerWidth <= 760) {
      $(".setup-shell").classList.remove("setup-nav-open");
      $(".setup-nav-toggle").setAttribute("aria-expanded", "false");
    }
  }
  function syncSetupControls(form, changed) {
    const opening = form.elements.openingBeds,
      total = form.elements.totalBeds;
    if (changed?.name === "capacityScale") {
      opening.max = total.max = form.elements.capacityScale.value;
    }
    total.min = opening.value;
    if (+total.value < +opening.value) total.value = opening.value;
    const selected = $$('input[name="departments"]:checked', form).length;
    if (!selected && changed?.name === "departments") {
      changed.checked = true;
      toast("Keep at least one opening service.");
    }
    const count = $$('input[name="departments"]:checked', form).length;
    form.elements.departmentCount.min = Math.max(1, count);
    if (+form.elements.departmentCount.value < count)
      form.elements.departmentCount.value = count;
    $("#handoverField", form).hidden =
      form.elements.handoverMode.value !== "set";
    $$('input[type="range"]', form).forEach((input) => {
      const output = $("#setup-" + input.name + "-value", form);
      if (output) output.value = input.value + (input.dataset.unit || "");
      $$('[data-range-field="' + input.name + '"]', form).forEach((b) =>
        b.setAttribute(
          "aria-pressed",
          String(+b.dataset.value === +input.value),
        ),
      );
    });
  }
  function projectFromForm(form) {
    const f = new FormData(form),
      p = current ? clone(current) : newProject();
    p.id = form.dataset.projectId;
    p.name = String(f.get("name")).trim();
    p.location = String(f.get("location")).trim();
    ["openingBeds", "totalBeds", "departmentCount", "teams"].forEach(
      (k) => (p[k] = +f.get(k)),
    );
    ["startDate", "targetDate", "handoverDate", "systems", "stage"].forEach(
      (k) => (p[k] = String(f.get(k) || "")),
    );
    if (f.get("handoverMode") === "none") p.handoverDate = "";
    p.departments = f.getAll("departments");
    p.internationalHires = f.get("internationalHires") === "yes";
    if (f.has("holidays"))
      p.holidays = String(f.get("holidays") || "")
        .split(/[\s,]+/)
        .filter(Boolean);
    p.templateVersion = T.version;
    return p;
  }
  function previewHTML(p) {
    try {
      const r = E.schedule(T, p);
      return (
        "<strong>Live planning preview</strong> · " +
        r.tasks.length +
        " activities · earliest opening " +
        date(r.earliestDate) +
        " · " +
        (r.gapDays && !r.calendarShiftDays
          ? r.gapDays + " calendar days beyond target"
          : r.bufferDays + " calendar days of modelled buffer") +
        (r.calendarShiftDays
          ? " · opening moves to " +
            date(r.forecastDate) +
            " for the working calendar"
          : "") +
        ". Save to apply this draft to the project."
      );
    } catch (e) {
      return (
        "<strong>Complete the setup to preview the plan.</strong> " +
        esc(e.message)
      );
    }
  }
  function renderProject() {
    switch (route.page) {
      case "setup":
        return setupHTML(current);
      case "workstreams":
        return workstreamsHTML();
      case "timeline":
        return timelineHTML();
      case "readiness":
        return readinessHTML();
      case "advisory":
        return advisoryHTML();
      case "scenarios":
        return scenariosHTML();
      default:
        return overviewHTML();
    }
  }
  function overviewHTML() {
    const critical = result.tasks
        .filter((t) => t.critical && t.id !== "GF-016")
        .slice(0, 6),
      gates = result.tasks.filter((t) => t.gate);
    return (
      head(
        current.name,
        "A connected opening plan for " +
          current.openingBeds +
          " beds, " +
          (current.departmentCount || current.departments.length) +
          " departments across " +
          current.departments.length +
          " service families and eventual capacity of " +
          current.totalBeds +
          " beds.",
        '<a class="btn btn-secondary" href="' +
          projectURL("setup") +
          '">Edit setup</a><a class="btn btn-primary" href="' +
          projectURL("timeline") +
          '">Open timeline →</a>',
      ) +
      notice() +
      '<div class="stat-grid">' +
      stat("Requested opening", date(current.targetDate), "Client target") +
      stat(
        "Forecast opening",
        date(result.forecastDate),
        "Dependency-based planning estimate",
      ) +
      stat(
        "Opening scope",
        current.openingBeds + " beds",
        (current.departmentCount || current.departments.length) +
          " departments · " +
          current.departments.length +
          " service families · " +
          current.totalBeds +
          " eventual beds",
      ) +
      stat(
        "Verified activities",
        result.verifiedCount + " / " + result.tasks.length,
        result.criticalCount +
          " critical activities · " +
          result.omitted +
          " omitted by scope",
      ) +
      "</div>" +
      '<div class="planner-grid"><section class="planner-card"><h3>Activities on the critical path</h3><p class="card-intro">Changes here can move the earliest opening forecast.</p><ul class="activity-list">' +
      critical
        .map(
          (t) =>
            '<li><div><button class="text-button" data-task="' +
            t.id +
            '">' +
            esc(t.name) +
            "</button><small>" +
            esc(ws(t.workstream).name) +
            " · " +
            t.duration +
            ' working days</small></div><span class="plan-tag critical">Critical</span></li>',
        )
        .join("") +
      '</ul><a class="domain-link" href="' +
      projectURL("timeline") +
      '">Explore dependencies →</a></section><section class="planner-card"><h3>Opening decisions & gates</h3><p class="card-intro">Dates are planned; sign-offs require evidence and accountable owners.</p><ul class="activity-list">' +
      gates
        .slice(0, 6)
        .map(
          (t) =>
            '<li><div><button class="text-button" data-task="' +
            t.id +
            '">' +
            esc(t.name) +
            "</button><small>" +
            date(t.startDate) +
            '</small></div><span class="plan-tag ' +
            (t.verified ? "verified" : "") +
            '">' +
            (t.verified ? "Verified" : "Needs evidence") +
            "</span></li>",
        )
        .join("") +
      '</ul><a class="domain-link" href="' +
      projectURL("readiness") +
      '">Review all gates →</a></section></div>' +
      '<section class="planner-card" style="margin-top:18px"><h3>18 workstreams. One opening plan.</h3><p class="card-intro">Each workstream has a primary domain, delivery owner and connected advisory support.</p>' +
      workstreamTable() +
      "</section>"
    );
  }
  function workstreamTable() {
    return (
      '<div style="overflow:auto"><table class="planner-table"><thead><tr><th>Workstream</th><th>Primary domain</th><th>Activities</th><th>Verified</th></tr></thead><tbody>' +
      T.workstreams
        .map((w) => {
          const ts = result.tasks.filter((t) => t.workstream === w.id);
          return (
            '<tr><td><a href="' +
            projectURL("workstreams") +
            "?ws=" +
            w.id +
            '">' +
            String(w.number).padStart(2, "0") +
            " · " +
            esc(w.name) +
            '</a></td><td><a href="#catalog/' +
            w.domain +
            '">' +
            esc(domain(w.domain).name) +
            "</a></td><td>" +
            ts.length +
            "</td><td>" +
            ts.filter((t) => t.verified).length +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div>"
    );
  }
  function filtersHTML(timeline = false) {
    return (
      '<div class="planner-toolbar"><label>Domain<select id="planDomain"><option value="">All 10 domains</option>' +
      D.map(
        (d) =>
          '<option value="' +
          d.id +
          '"' +
          (ui.domain === d.id ? " selected" : "") +
          ">" +
          esc(d.name) +
          "</option>",
      ).join("") +
      '</select></label><label>Find activity<input type="search" id="planSearch" placeholder="Name, deliverable or role" value="' +
      esc(ui.query || "") +
      '"></label>' +
      (timeline
        ? '<label><input type="checkbox" id="criticalOnly"' +
          (ui.criticalOnly ? " checked" : "") +
          "> Critical path only</label>" +
          button(
            ui.allExpanded ? "Collapse activities" : "Expand activities",
            "expand-all",
          )
        : "") +
      "</div>"
    );
  }
  function matchingTasks() {
    return result.tasks.filter(
      (t) =>
        (!ui.domain ||
          t.domain === ui.domain ||
          t.products.some((id) => {
            const p = C.find((x) => x.id === id);
            return (
              p?.domain === ui.domain || p?.secondaryDomains.includes(ui.domain)
            );
          })) &&
        (!ui.criticalOnly || route.page !== "timeline" || t.critical) &&
        (!ui.query ||
          [t.name, t.owner, t.deliverable, t.id]
            .join(" ")
            .toLowerCase()
            .includes(ui.query.toLowerCase())),
    );
  }
  function workstreamsHTML() {
    return (
      head(
        "Workstreams",
        "Explore the operational plan, its deliverables and the support each function needs.",
        button("Export activities", "export-csv"),
      ) +
      filtersHTML() +
      '<div id="workstreamResults">' +
      workstreamResultsHTML() +
      "</div>"
    );
  }
  function workstreamResultsHTML() {
    const visible = matchingTasks(),
      chosen = new URLSearchParams(location.hash.split("?")[1] || "").get("ws");
    return (
      '<div class="ws-list">' +
      T.workstreams
        .filter(
          (w) =>
            visible.some((t) => t.workstream === w.id) ||
            (!ui.domain && !ui.query),
        )
        .map((w) => {
          const ts = visible.filter((t) => t.workstream === w.id),
            verified = ts.filter((t) => t.verified).length;
          return (
            '<details class="ws-card" data-ws-details="' +
            w.id +
            '"' +
            (chosen === w.id || ui.openWS?.[w.id] ? " open" : "") +
            "><summary><div><strong>" +
            String(w.number).padStart(2, "0") +
            " · " +
            esc(w.name) +
            '</strong><a class="domain-link" href="#catalog/' +
            w.domain +
            '">' +
            esc(domain(w.domain).name) +
            "</a></div><span>" +
            ts.length +
            " activities · " +
            verified +
            ' verified　⌄</span></summary><div class="ws-detail"><div class="ws-meta"><span class="muted">Accountable role: ' +
            esc(w.owner) +
            '</span><span class="muted">' +
            esc(w.coverage) +
            "</span></div>" +
            workstreamSolutionsHTML(w) +
            (ts.length
              ? '<ul class="activity-list">' +
                ts
                  .map(
                    (t) =>
                      '<li><div><button class="text-button" data-task="' +
                      t.id +
                      '">' +
                      esc(t.name) +
                      "</button><small>" +
                      esc(t.deliverable) +
                      " · " +
                      date(t.startDate) +
                      " – " +
                      date(t.finishDate) +
                      '</small></div><span class="plan-tag ' +
                      (t.verified ? "verified" : t.critical ? "critical" : "") +
                      '">' +
                      (t.verified
                        ? "Verified"
                        : t.milestone
                          ? "Milestone"
                          : t.duration + " wd") +
                      "</span></li>",
                  )
                  .join("") +
                "</ul>"
              : '<p class="muted">No activities in this scope. The workstream remains available for coordination.</p>') +
            "</div></details>"
          );
        })
        .join("") +
      "</div>"
    );
  }
  function timelineHTML() {
    return (
      head(
        "Timeline",
        "One dependency schedule across all workstreams. Select an activity to inspect prerequisites, adjust estimates or record evidence.",
        button("Export activities", "export-csv") +
          button("Export MS Project XML", "export-xml"),
      ) +
      notice() +
      filtersHTML(true) +
      '<div class="gantt-legend"><span><i></i>Activity</span><span><i class="critical-key"></i>Critical path</span><span>◆ Milestone</span><span><i class="target-key"></i>Requested opening</span><span><i class="forecast-key"></i>Forecast opening</span></div><div id="timelineResults">' +
      ganttHTML() +
      '</div><p class="muted" style="margin-top:12px">Durations use working days. The chart uses calendar dates. Use the activity panel to change duration or earliest start; dependent activities recalculate. Resource levelling is not included.</p>'
    );
  }
  function ganttHTML() {
    const visible = matchingTasks(),
      origin = Date.parse(current.startDate),
      end =
        Math.max(
          Date.parse(result.finishDate),
          Date.parse(current.targetDate),
        ) +
        14 * 86400000,
      span = Math.max(1, end - origin),
      pos = (d) =>
        Math.max(0, Math.min(99.5, ((Date.parse(d) - origin) / span) * 100));
    const lines = () =>
      '<span class="gantt-target" style="left:' +
      pos(current.targetDate) +
      '%"></span><span class="gantt-forecast" style="left:' +
      pos(result.forecastDate) +
      '%"></span>';
    const bar = (t, group = false) => {
      const x = pos(t.startDate),
        width = Math.max(0.3, pos(E.addDays(t.finishDate, 1)) - x);
      return (
        '<button class="gantt-bar ' +
        (t.milestone ? "milestone " : "") +
        (t.verified ? "verified" : t.critical && !group ? "critical" : "") +
        '" ' +
        (group
          ? 'data-plan-action="toggle-gantt" data-ws="' + t.workstream + '"'
          : 'data-task="' + t.id + '"') +
        ' style="left:' +
        x +
        "%;width:" +
        width +
        '%" aria-label="' +
        esc(t.name) +
        ": " +
        date(t.startDate) +
        " to " +
        date(t.finishDate) +
        (t.critical && !group ? ", critical path" : "") +
        '" title="' +
        esc(t.name) +
        " · " +
        date(t.startDate) +
        " – " +
        date(t.finishDate) +
        '"></button>'
      );
    };
    let rows = "";
    T.workstreams.forEach((w) => {
      const ts = visible.filter((t) => t.workstream === w.id);
      if (!ts.length) return;
      const expanded = ui.allExpanded || ui.timelineWS?.[w.id];
      const starts = ts.map((t) => t.startDate).sort(),
        finishes = ts.map((t) => t.finishDate).sort();
      const group = {
        ...ts[0],
        name: w.name,
        startDate: starts[0],
        finishDate: finishes.at(-1),
        milestone: false,
      };
      rows +=
        '<div class="gantt-row group"><div class="gantt-label"><button class="text-button" data-plan-action="toggle-gantt" data-ws="' +
        w.id +
        '" aria-expanded="' +
        !!expanded +
        '">' +
        (expanded ? "▾" : "▸") +
        " " +
        String(w.number).padStart(2, "0") +
        " " +
        esc(w.name) +
        "</button><small>" +
        ts.length +
        '</small></div><div class="gantt-track">' +
        lines() +
        bar(group, true) +
        "</div></div>";
      if (expanded)
        ts.forEach(
          (t) =>
            (rows +=
              '<div class="gantt-row"><div class="gantt-label"><button class="text-button" data-task="' +
              t.id +
              '">' +
              esc(t.name) +
              '</button></div><div class="gantt-track">' +
              lines() +
              bar(t) +
              "</div></div>"),
        );
    });
    const ticks = Array.from({ length: 6 }, (_, i) =>
      date(E.iso(origin + (span * i) / 5)).replace(/\d{1,2} /, ""),
    );
    return rows
      ? '<div class="gantt-scroll" aria-label="Interactive hospital workstream Gantt"><div class="gantt"><div class="gantt-header"><div class="gantt-label">Workstream / activity</div><div class="gantt-axis">' +
          ticks.map((t) => "<span>" + t + "</span>").join("") +
          "</div></div>" +
          rows +
          "</div></div>"
      : '<div class="empty-state"><h3>No activities match</h3><p>Adjust the domain, search or critical-path filter.</p></div>';
  }
  function readinessHTML() {
    const gates = result.tasks.filter((t) => t.gate);
    return (
      head(
        "Readiness",
        "Opening decisions require evidence and accountable owners. Scheduled milestones do not certify readiness.",
        button("Export readiness", "export-readiness"),
      ) +
      '<div class="plan-notice">' +
      result.verifiedCount +
      " of " +
      result.tasks.length +
      ' activities have an owner, completion evidence and an actual finish date. Dates and purchased services do not mark activities complete.</div><div class="planner-grid">' +
      gates
        .map((t) => {
          const deps = t.dependencies.map((d) =>
              result.tasks.find((x) => x.id === d.id),
            ),
            done = deps.filter((t) => t.verified).length;
          return (
            '<section class="planner-card gate-card ' +
            (t.verified ? "is-verified" : "") +
            '"><div class="gate-head"><h3>' +
            esc(t.name) +
            '</h3><span class="plan-tag ' +
            (t.verified ? "verified" : "") +
            '">' +
            (t.verified
              ? "Verified"
              : t.blocked
                ? "Prerequisites open"
                : "Evidence needed") +
            '</span></div><p class="card-intro">Planned ' +
            date(t.startDate) +
            " · " +
            esc(t.state.owner || t.owner) +
            '</p><p class="muted">' +
            done +
            " / " +
            deps.length +
            ' direct prerequisites verified</p><div class="progress-track"><span style="width:' +
            (deps.length ? (done / deps.length) * 100 : 0) +
            '%"></span></div><div class="dependency-links">' +
            deps
              .slice(0, 5)
              .map(
                (p) =>
                  '<button data-task="' +
                  p.id +
                  '">' +
                  (p.verified ? "✓ " : "") +
                  esc(p.name) +
                  "</button>",
              )
              .join("") +
            '</div><div style="margin-top:16px">' +
            button("Review gate", "task", 'data-task-id="' + t.id + '"') +
            "</div></section>"
          );
        })
        .join("") +
      "</div>"
    );
  }
  function productButton(p) {
    return (
      '<button type="button" class="text-button" data-plan-action="product" data-product="' +
      p.id +
      '">' +
      esc(p.code + " · " + p.title) +
      "</button>"
    );
  }
  function workstreamSolutionsHTML(w) {
    const primary = C.find((p) => p.id === w.leadProduct),
      support = w.products
        .filter((id) => id !== w.leadProduct)
        .map((id) => C.find((p) => p.id === id));
    return (
      '<div class="ws-solutions"><p class="muted">Primary advisory home</p>' +
      productButton(primary) +
      (primary.proposed
        ? ' <span class="offering-status">Proposed scope</span>'
        : "") +
      '<details><summary>Supporting, conditional and post-opening solutions</summary><div class="dependency-links">' +
      support
        .concat(
          (w.conditionalProducts || []).map((id) => C.find((p) => p.id === id)),
        )
        .map((p) => productButton(p))
        .join("") +
      '</div></details><p class="muted">Hospital and vendor teams retain execution and approval responsibilities.</p></div>'
    );
  }
  function solutionMatrixHTML() {
    return (
      '<section class="planner-card"><h3>All 18 workstreams mapped</h3><p class="card-intro">Each workstream has a primary advisory home. Supporting, conditional and post-opening scopes are shown in the product profiles; a connection does not transfer delivery responsibility.</p><div class="planner-table-scroll"><table class="planner-table solution-matrix"><thead><tr><th>Workstream</th><th>Primary advisory solution</th><th>Owner</th></tr></thead><tbody>' +
      T.workstreams
        .map((w) => {
          const p = C.find((p) => p.id === w.leadProduct);
          return (
            '<tr><td><a href="' +
            projectURL("workstreams") +
            "?ws=" +
            w.id +
            '">' +
            String(w.number).padStart(2, "0") +
            " · " +
            esc(w.name) +
            "</a></td><td>" +
            productButton(p) +
            (p.proposed ? "<br><small>Proposed scope</small>" : "") +
            "</td><td>" +
            esc(w.owner) +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></section>"
    );
  }
  function additionalSolutionsHTML(recs) {
    const shown = new Set(recs.map((r) => r.product.id)),
      extras = (current.selectedProducts || [])
        .filter((id) => !shown.has(id))
        .map((id) => C.find((p) => p.id === id))
        .filter(Boolean);
    return (
      '<section class="planner-card"><h3>Choose any catalog solution</h3><p class="card-intro">Add a conditional, post-opening or additional scope to this project. This does not confirm eligibility or delivery terms.</p><label class="form-field">Additional solution<select id="extraSolution">' +
      D.map(
        (d) =>
          '<optgroup label="' +
          esc(d.name) +
          '">' +
          C.filter((p) => p.domain === d.id)
            .map(
              (p) =>
                '<option value="' +
                p.id +
                '">' +
                esc(
                  p.code +
                    " · " +
                    p.title +
                    (p.lifecycle === "Post-opening"
                      ? " · Post-opening"
                      : p.proposed
                        ? " · Proposed"
                        : ""),
                ) +
                "</option>",
            )
            .join("") +
          "</optgroup>",
      ).join("") +
      "</select></label>" +
      button("Add to this advisory plan", "select-extra", "", true) +
      extras
        .map(
          (p) =>
            '<div class="offering-row"><span class="ref">' +
            esc(p.code) +
            "</span><div>" +
            productButton(p) +
            "<p>" +
            esc(p.conditionLabel || p.lifecycle) +
            '</p></div><label class="service-option"><input type="checkbox" data-product-select="' +
            p.id +
            '" checked>Select</label></div>',
        )
        .join("") +
      "</section>"
    );
  }
  function advisoryHTML() {
    const recs = E.recommendations(T, current, result, C),
      selected = new Set(current.selectedProducts || []);
    return (
      head(
        "Advisory Plan",
        "Connect selected services to actual work. Engagement scope and delivery roles are agreed separately.",
        button("Review package", "cart") +
          button("Add selected to package", "add-selected", "", true),
      ) +
      '<div class="plan-notice">Select support for this hospital, then add it to the global package. <span id="advisorySelectionCount">' +
      selected.size +
      '</span> services selected. New offerings are proposed advisory scopes; specialist capability, delivery roles and terms are confirmed at proposal. Existing brochures retain their original scope.</div><section class="planner-card"><h3>Support matched to the opening plan</h3><p class="card-intro">Ordered by unresolved activity coverage, with extra weight on the critical path. These are potential connections, not confirmed delivery commitments.</p>' +
      recs
        .map(
          (r) =>
            '<div class="offering-row"><span class="ref">' +
            esc(r.product.code) +
            '</span><div><button class="text-button" data-plan-action="product" data-product="' +
            r.product.id +
            '">' +
            esc(r.product.title) +
            "</button>" +
            (r.product.proposed
              ? '<span class="offering-status">Proposed scope</span>'
              : "") +
            "<p>" +
            esc(domain(r.product.domain).name) +
            " · " +
            r.tasks.length +
            " related activities across " +
            r.workstreams.length +
            ' workstreams</p><details><summary class="domain-link">View connected activities</summary><div class="dependency-links">' +
            r.tasks
              .slice(0, 8)
              .map((id) => {
                const t = result.tasks.find((t) => t.id === id);
                return (
                  '<button data-task="' + id + '">' + esc(t.name) + "</button>"
                );
              })
              .join("") +
            '</div></details></div><label class="service-option"><input type="checkbox" data-product-select="' +
            r.product.id +
            '"' +
            (selected.has(r.product.id) ? " checked" : "") +
            ">Select</label></div>",
        )
        .join("") +
      "</section>" +
      additionalSolutionsHTML(recs) +
      solutionMatrixHTML()
    );
  }
  function scenariosHTML() {
    return (
      head(
        "Scenarios & Exports",
        "Save a comparison point before changing scope or estimates. A baseline is a reference snapshot, not an approval of readiness.",
        button("Save scenario", "snapshot", "", true),
      ) +
      '<div class="planner-grid"><section class="planner-card"><h3>Current plan</h3><p class="card-intro">' +
      current.openingBeds +
      " opening beds · " +
      current.departments.length +
      ' services</p><ul class="activity-list"><li>Requested opening<strong>' +
      date(current.targetDate) +
      "</strong></li><li>Forecast opening<strong>" +
      date(result.forecastDate) +
      "</strong></li><li>Reference template<strong>" +
      T.version +
      '</strong></li></ul><div class="page-actions" style="margin-top:18px">' +
      button("Set baseline", "baseline") +
      '<a class="btn btn-secondary" href="' +
      projectURL("setup") +
      '">Change parameters</a></div></section><section class="planner-card"><h3>Export this project</h3><p class="card-intro">Keep a portable backup and take the plan into review or further scheduling.</p><div class="page-actions">' +
      button("Project backup (JSON)", "export-json") +
      button("Activity schedule (CSV)", "export-csv") +
      button("MS Project XML", "export-xml") +
      button("Review report (HTML)", "export-report") +
      '</div></section></div><section class="planner-card" style="margin-top:18px"><h3>Saved comparisons</h3>' +
      (current.scenarios.length
        ? '<div style="overflow:auto"><table class="planner-table"><thead><tr><th>Scenario</th><th>Opening scope</th><th>Target</th><th>Forecast at save</th><th></th></tr></thead><tbody>' +
          current.scenarios
            .map(
              (s) =>
                "<tr><td><strong>" +
                esc(s.name) +
                "</strong>" +
                (s.baseline ? ' <span class="plan-tag">Baseline</span>' : "") +
                '<br><span class="muted">' +
                date(s.savedAt.slice(0, 10)) +
                "</span></td><td>" +
                s.project.openingBeds +
                " beds · " +
                s.project.departments.length +
                " services</td><td>" +
                date(s.project.targetDate) +
                "</td><td>" +
                date(s.forecastDate) +
                "</td><td>" +
                button(
                  "Restore as new project",
                  "restore",
                  'data-scenario="' + s.id + '"',
                ) +
                "</td></tr>",
            )
            .join("") +
          "</tbody></table></div>"
        : '<p class="card-intro">No saved scenarios. Save the current plan before exploring another opening scope.</p>') +
      "</section>"
    );
  }

  // Dialogs use native modal focus handling; the existing product and package panels are retained.
  const dialog = document.createElement("dialog");
  dialog.className = "activity-dialog";
  dialog.id = "activityDialog";
  dialog.setAttribute("aria-labelledby", "activityTitle");
  document.body.append(dialog);
  function openActivity(id) {
    const t = result?.tasks.find((t) => t.id === id);
    if (!t) return;
    activeTask = id;
    const successors = result.tasks.filter((x) =>
        x.dependencies.some((d) => d.id === id),
      ),
      state = t.state;
    dialog.innerHTML =
      '<header><div class="dialog-top"><small>' +
      t.id +
      " · " +
      esc(ws(t.workstream).name) +
      '</small><button class="dialog-close" type="button" data-plan-action="close-dialog" aria-label="Close activity">×</button></div><h2 id="activityTitle">' +
      esc(t.name) +
      '</h2></header><div class="dialog-scroll"><div class="detail-facts"><div><dt>Primary domain</dt><dd>' +
      esc(domain(t.domain).name) +
      "</dd></div><div><dt>Planned window</dt><dd>" +
      date(t.startDate) +
      " – " +
      date(t.finishDate) +
      "</dd></div><div><dt>Critical path</dt><dd>" +
      (t.critical ? "Yes · " + t.slack + " working days float" : "No") +
      '</dd></div></div><section class="detail-section"><h3>Required deliverable</h3><p>' +
      esc(t.deliverable) +
      "</p>" +
      (t.notes ? '<p style="margin-top:8px">' + esc(t.notes) + "</p>" : "") +
      '</section><section class="detail-section"><h3>Prerequisites</h3><div class="dependency-links">' +
      (t.dependencies.length
        ? t.dependencies
            .map((d) => {
              const p = result.tasks.find((x) => x.id === d.id);
              return (
                '<button data-task="' +
                d.id +
                '">' +
                (p.verified ? "✓ " : "") +
                esc(p.name) +
                " (" +
                d.type +
                (d.lag ? ", +" + d.lag + " wd" : "") +
                ")</button>"
              );
            })
            .join("")
        : "<p>No retained prerequisites. Confirm the activity can begin.</p>") +
      '</div></section><section class="detail-section"><h3>Activities that depend on this</h3><div class="dependency-links">' +
      (successors.length
        ? successors
            .map(
              (p) =>
                '<button data-task="' + p.id + '">' + esc(p.name) + "</button>",
            )
            .join("")
        : "<p>No direct successors.</p>") +
      '</div></section><form id="activityForm"><div id="activityError" class="form-error" role="alert" hidden></div><section class="detail-section"><h3>Plan & ownership</h3><div class="form-grid">' +
      field(
        "Accountable person / owner",
        "owner",
        state.owner || "",
        "text",
        "Reference role: " + esc(t.owner),
        'maxlength="150"',
      ) +
      field(
        "Duration (working days)",
        "duration",
        t.duration,
        "number",
        t.durationStatus,
        t.milestone ? "readonly" : 'min="1" max="4000" required',
      ) +
      field(
        "Earliest start constraint",
        "notBefore",
        state.notBefore || "",
        "date",
        "Optional; dependencies can move the activity later.",
      ) +
      select("Progress", "status", state.status || "not-started", [
        ["not-started", "Not started / unconfirmed"],
        ["in-progress", "In progress"],
        ["complete", "Complete — evidence required"],
      ]) +
      field(
        "Actual finish",
        "actualFinish",
        state.actualFinish || "",
        "date",
        "Required for verified completion; cannot be in the future.",
      ) +
      '<label class="form-field form-wide">Completion evidence<textarea name="evidence" placeholder="Sign-off reference, test report, approved document or review notes">' +
      esc(state.evidence || "") +
      '</textarea></label></div></section></form><section class="detail-section"><h3>Advisory contribution</h3><p>' +
      esc(t.advisory) +
      ' · scope to be agreed. The accountable hospital owner retains responsibility for delivery.</p><div class="dependency-links">' +
      t.products
        .filter((id) => C.some((p) => p.id === id))
        .map(
          (id) =>
            '<button data-plan-action="product" data-product="' +
            id +
            '">' +
            esc(
              C.find((p) => p.id === id).code +
                " · " +
                C.find((p) => p.id === id).title,
            ) +
            "</button>",
        )
        .join("") +
      '</div></section><p class="muted">Generalized source activity ' +
      t.sourceId +
      " · Template " +
      T.version +
      ". Reference dates, client names and contract terms are excluded.</p></div><footer>" +
      button("Close", "close-dialog") +
      '<button class="btn btn-primary" type="submit" form="activityForm">Save & recalculate</button></footer>';
    if (!dialog.open) dialog.showModal();
  }
  function methodDialog() {
    activeTask = null;
    dialog.innerHTML =
      '<header><div class="dialog-top"><small>Reference template ' +
      T.version +
      '</small><button class="dialog-close" data-plan-action="close-dialog" aria-label="Close assumptions">×</button></div><h2 id="activityTitle">Planning assumptions</h2></header><div class="dialog-scroll"><section class="detail-section"><h3>Source and generalization</h3><p>' +
      esc(T.source.scope) +
      '</p><p style="margin-top:12px">' +
      T.source.sourceRowCount +
      " source rows and " +
      T.source.sourceDependencyCount +
      " source links were reviewed for extraction. This template contains " +
      T.tasks.length +
      " generalized activities and " +
      T.tasks.reduce((n, t) => n + t.dependencies.length, 0) +
      ' retained links.</p></section><section class="detail-section"><h3>Schedule basis</h3><ul class="plan-list">' +
      T.assumptions.map((a) => "<li>" + esc(a) + "</li>").join("") +
      '</ul></section><section class="detail-section"><h3>Workload adjustment</h3><p>For flagged workload activities, the duration factor is 1 + 0.25 per additional 100 opening beds + 0.08 per service beyond seven, divided by the square root of parallel teams. The factor has a 0.6 floor. Existing enterprise systems reduce selected configuration estimates by 20%. These are transparent draft assumptions, not validated clinical benchmarks.</p></section><section class="detail-section"><h3>Progress and readiness</h3><p>A completed activity needs an accountable owner, evidence and an actual finish date. A gate also requires its direct prerequisites to be verified. The calendar and dependencies do not certify safe opening.</p></section><section class="detail-section"><h3>Storage and portability</h3><p>Projects and scenarios are saved in this browser. Export a JSON backup before clearing browser data or changing devices. No client source file is uploaded.</p></section></div><footer>' +
      button("Close", "close-dialog") +
      "</footer>";
    dialog.showModal();
  }
  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type })),
      a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const filename = () =>
    current.name
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "hospital-plan";
  function exportCSV(onlyGates = false) {
    const rows = [
      [
        "Activity ID",
        "Source ID",
        "Workstream",
        "Domain",
        "Activity",
        "Accountable owner",
        "Deliverable",
        "Start",
        "Finish",
        "Working days",
        "Predecessors",
        "Critical",
        "Float (working days)",
        "Status",
        "Evidence",
        "Advisory role",
      ],
    ];
    result.tasks
      .filter((t) => !onlyGates || t.gate)
      .forEach((t) =>
        rows.push([
          t.id,
          t.sourceId,
          ws(t.workstream).name,
          domain(t.domain).name,
          t.name,
          t.state.owner || t.owner,
          t.deliverable,
          t.startDate,
          t.finishDate,
          t.duration,
          t.dependencies
            .map((d) => d.id + " " + d.type + " +" + d.lag + "wd")
            .join("; "),
          t.critical ? "Yes" : "No",
          t.slack ?? "",
          t.verified ? "Verified" : t.state.status || "Unconfirmed",
          t.state.evidence || "",
          t.advisory,
        ]),
      );
    const safe = (v) => {
      v = String(v);
      if (/^[=+\-@\t\r]/.test(v)) v = "'" + v;
      return '"' + v.replace(/"/g, '""') + '"';
    };
    download(
      filename() + (onlyGates ? "-readiness" : "-schedule") + ".csv",
      "\uFEFF" + rows.map((r) => r.map(safe).join(",")).join("\r\n"),
      "text/csv;charset=utf-8",
    );
  }
  function xmlText(s) {
    return String(s).replace(
      /[<>&"']/g,
      (c) =>
        ({
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
          '"': "&quot;",
          "'": "&apos;",
        })[c],
    );
  }
  function exportXML() {
    download(
      filename() + ".xml",
      window.HospitalExport.xml(T, current, result, D),
      "application/xml",
    );
  }
  function exportReport() {
    const rows = result.tasks
      .filter((t) => t.gate)
      .map(
        (t) =>
          "<tr><td>" +
          esc(t.name) +
          "</td><td>" +
          date(t.startDate) +
          "</td><td>" +
          esc(t.state.owner || t.owner) +
          "</td><td>" +
          (t.verified ? "Verified" : "Evidence required") +
          "</td></tr>",
      )
      .join("");
    download(
      filename() + "-review.html",
      '<!doctype html><html lang="en"><meta charset="utf-8"><title>' +
        esc(current.name) +
        " — planning review</title><style>body{font:15px system-ui;max-width:1000px;margin:40px auto;color:#253f59;padding:20px}table{border-collapse:collapse;width:100%}td,th{text-align:left;padding:10px;border-bottom:1px solid #ddd}h1{font-weight:400}li{margin:8px 0}@media print{body{margin:0}}</style><h1>" +
        esc(current.name) +
        "</h1><p>" +
        current.openingBeds +
        " opening beds / " +
        current.totalBeds +
        " eventual beds · " +
        esc(current.departments.join(", ")) +
        "</p><p>Requested opening: " +
        date(current.targetDate) +
        "<br>Forecast: " +
        date(result.forecastDate) +
        "<br>Template " +
        T.version +
        " · Planning draft, subject to specialist confirmation</p><h2>Readiness gates</h2><table><tr><th>Gate</th><th>Planned date</th><th>Owner</th><th>Evidence</th></tr>" +
        rows +
        "</table><h2>Assumptions</h2><ul>" +
        T.assumptions.map((a) => "<li>" + esc(a) + "</li>").join("") +
        "</ul><h2>Selected advisory support</h2><ul>" +
        (current.selectedProducts || [])
          .map(
            (id) =>
              "<li>" +
              esc(
                (C.find((p) => p.id === id)?.code || id) +
                  " — " +
                  (C.find((p) => p.id === id)?.title || id),
              ) +
              "</li>",
          )
          .join("") +
        "</ul></html>",
      "text/html",
    );
  }

  document.addEventListener("click", (ev) => {
    if (ev.target.closest("[data-skip-main]")) {
      ev.preventDefault();
      $("#top").focus();
      return;
    }
    const task = ev.target.closest("[data-task]");
    if (task) {
      openActivity(task.dataset.task);
      return;
    }
    const toggle = ev.target.closest("[data-nav-toggle]");
    if (toggle) {
      ui.expanded = ui.expanded || {};
      ui.expanded[toggle.dataset.navToggle] =
        toggle.getAttribute("aria-expanded") !== "true";
      saveUI();
      renderNav();
      return;
    }
    const action = ev.target.closest("[data-plan-action]");
    if (!action) return;
    switch (action.dataset.planAction) {
      case "open-workstream": {
        const p =
          current ||
          projects.find((p) => p.exampleSeed && !p.archived) ||
          projects.find((p) => !p.archived) ||
          projects[0];
        window.CCApp.close();
        if (p)
          location.hash =
            projectURL("workstreams", p.id) +
            "?ws=" +
            action.dataset.workstream;
        break;
      }
      case "select-extra": {
        const id = $("#extraSolution").value;
        current.selectedProducts = Array.from(
          new Set([...(current.selectedProducts || []), id]),
        );
        persist();
        render();
        toast("Solution added to this advisory plan.");
        break;
      }
      case "goto-setup":
        goSetupQuestion(action.dataset.question);
        break;
      case "setup-back": {
        const questions = visibleSetupQuestions($("#projectForm")),
          i = questions.findIndex(([key]) => key === setupCursor);
        if (i > 0) goSetupQuestion(questions[i - 1][0]);
        break;
      }
      case "reset-setup": {
        const form = $("#projectForm");
        $$('input[type="range"]', form).forEach((input) => {
          input.min = input.dataset.defaultMin;
          input.max = input.dataset.defaultMax;
        });
        form.reset();
        syncSetupControls(form, { name: "capacityScale" });
        setupCursor = "name";
        renderSetupNavigation(form);
        $("#setupPreview").innerHTML = previewHTML(projectFromForm(form));
        $(".setup-main").scrollTop = 0;
        break;
      }
      case "toggle-setup-nav": {
        const open = $(".setup-shell").classList.toggle("setup-nav-open");
        action.setAttribute("aria-expanded", String(open));
        break;
      }
      case "set-range": {
        const form = action.closest("#projectForm"),
          input = form.elements[action.dataset.rangeField];
        input.value = Math.max(
          +input.min,
          Math.min(+input.max, +action.dataset.value),
        );
        input.dispatchEvent(new Event("input", { bubbles: true }));
        break;
      }
      case "close-dialog":
        dialog.close();
        break;
      case "close-nav":
        document.body.classList.add("nav-collapsed");
        if (window.innerWidth > 760) {
          ui.collapsed = true;
          saveUI();
        }
        $("#navToggle").setAttribute("aria-expanded", "false");
        break;
      case "task":
        openActivity(action.dataset.taskId);
        break;
      case "method":
        methodDialog();
        break;
      case "product":
        if (dialog.open) dialog.close();
        window.CCApp.detail(action.dataset.product, action);
        break;
      case "cart":
        window.CCApp.cart();
        break;
      case "add-selected":
        (current.selectedProducts || []).forEach((id) => window.CCApp.add(id));
        toast(
          (current.selectedProducts || []).length
            ? "Selected services added to your package."
            : "Select at least one advisory service first.",
        );
        break;
      case "expand-all":
        ui.allExpanded = !ui.allExpanded;
        saveUI();
        $("#plannerContent").innerHTML = timelineHTML();
        break;
      case "toggle-gantt":
        ui.timelineWS = ui.timelineWS || {};
        ui.timelineWS[action.dataset.ws] = !ui.timelineWS[action.dataset.ws];
        saveUI();
        $("#timelineResults").innerHTML = ganttHTML();
        break;
      case "export-json":
        download(
          filename() + ".json",
          JSON.stringify(
            {
              format: "iem-hospital-project",
              version: 1,
              templateVersion: T.version,
              project: current,
            },
            null,
            2,
          ),
          "application/json",
        );
        break;
      case "export-csv":
        exportCSV();
        break;
      case "export-readiness":
        exportCSV(true);
        break;
      case "export-xml":
        exportXML();
        break;
      case "export-report":
        exportReport();
        break;
      case "import":
        importPicker();
        break;
      case "toggle-archived":
        ui.showArchived = !ui.showArchived;
        saveUI();
        render();
        break;
      case "archive-project":
      case "unarchive-project": {
        const p = projects.find((p) => p.id === action.dataset.project);
        if (p) {
          p.archived = action.dataset.planAction === "archive-project";
          saveProjects();
          render();
          toast(
            p.archived
              ? "Project archived. Use Show archived to restore it."
              : "Project restored.",
          );
        }
        break;
      }
      case "snapshot":
      case "baseline":
        saveScenario(action.dataset.planAction === "baseline");
        break;
      case "restore": {
        const s = current.scenarios.find(
          (s) => s.id === action.dataset.scenario,
        );
        if (!s) return;
        const p = clone(s.project);
        p.id = uid();
        p.name = s.name + " — restored";
        p.scenarios = [];
        p.createdAt = new Date().toISOString();
        p.updatedAt = p.createdAt;
        projects.push(p);
        saveProjects();
        location.hash = projectURL("overview", p.id);
        toast("Scenario restored as a separate project.");
        break;
      }
    }
  });
  function saveScenario(baseline) {
    const p = clone(current);
    delete p.scenarios;
    const n = current.scenarios.length + 1;
    current.scenarios.push({
      id: uid(),
      name: (baseline ? "Baseline" : "Scenario") + " " + n,
      baseline: baseline,
      savedAt: new Date().toISOString(),
      forecastDate: result.forecastDate,
      project: p,
    });
    persist();
    $("#plannerContent").innerHTML = scenariosHTML();
    toast(
      "Current plan saved as " + (baseline ? "a baseline." : "a scenario."),
    );
  }
  function importPicker() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.addEventListener("change", async () => {
      try {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 8 * 1024 * 1024)
          throw new Error("Choose a project backup smaller than 8 MB.");
        const data = JSON.parse(await file.text());
        if (
          data.format !== "iem-hospital-project" ||
          data.version !== 1 ||
          data.templateVersion !== T.version
        )
          throw new Error(
            "Choose a compatible Hospital Planner project backup (template " +
              T.version +
              ").",
          );
        const p = data.project;
        if (!p || !Array.isArray(p.departments) || !Array.isArray(p.scenarios))
          throw new Error("The project backup is incomplete.");
        for (const s of p.scenarios) {
          if (
            !s ||
            typeof s.name !== "string" ||
            typeof s.id !== "string" ||
            typeof s.savedAt !== "string" ||
            !/^\d{4}-\d{2}-\d{2}T/.test(s.savedAt) ||
            !s.project ||
            E.validate(s.project).length
          )
            throw new Error("The backup contains an invalid saved scenario.");
        }
        const errors = E.validate(p);
        if (errors.length) throw new Error(errors.join(" "));
        if (p.departments.some((d) => !services.some((s) => s[0] === d)))
          throw new Error("Unknown service in project backup.");
        E.schedule(T, p);
        p.id = uid();
        p.name = String(p.name).slice(0, 85) + " — imported";
        p.updatedAt = new Date().toISOString();
        projects.push(p);
        saveProjects();
        location.hash = projectURL("overview", p.id);
        toast("Project imported as a separate copy.");
      } catch (e) {
        toast("Import failed: " + e.message);
      }
    });
    input.click();
  }
  document.addEventListener("submit", (ev) => {
    if (ev.target.id === "projectForm") {
      ev.preventDefault();
      const p = projectFromForm(ev.target);
      const errors = E.validate(p);
      if (errors.length) {
        $("#projectError").textContent = errors.join(" ");
        $("#projectError").hidden = false;
        $("#projectError").scrollIntoView({ block: "center" });
        return;
      }
      try {
        E.schedule(T, p);
      } catch (e) {
        $("#projectError").textContent = e.message;
        $("#projectError").hidden = false;
        return;
      }
      p.updatedAt = new Date().toISOString();
      const i = projects.findIndex((x) => x.id === p.id);
      if (i < 0) projects.push(p);
      else projects[i] = p;
      if (!saveProjects()) return;
      ui.domain = "";
      ui.query = "";
      ui.criticalOnly = false;
      saveUI();
      location.hash = projectURL("overview", p.id);
      toast("Hospital plan saved and recalculated.");
    }
    if (ev.target.id === "activityForm") {
      ev.preventDefault();
      const f = new FormData(ev.target),
        t = result.tasks.find((t) => t.id === activeTask),
        state = {
          owner: String(f.get("owner") || "").trim(),
          duration: +f.get("duration"),
          notBefore: String(f.get("notBefore") || ""),
          status: String(f.get("status")),
          actualFinish: String(f.get("actualFinish") || ""),
          evidence: String(f.get("evidence") || "").trim(),
        };
      let error = "";
      if (
        state.status === "complete" &&
        (!state.owner || !state.evidence || !state.actualFinish)
      )
        error =
          "Completion requires an accountable owner, an actual finish date and supporting evidence.";
      if (state.actualFinish && state.actualFinish > today())
        error = "Actual finish cannot be in the future.";
      if (
        !error &&
        state.status === "complete" &&
        t.gate &&
        t.dependencies.some(
          (d) => !result.tasks.find((x) => x.id === d.id).verified,
        )
      )
        error =
          "Verify every direct prerequisite before recording this gate as complete.";
      if (error) {
        $("#activityError").textContent = error;
        $("#activityError").hidden = false;
        return;
      }
      if (t.milestone) delete state.duration;
      const p = clone(current);
      p.taskStates[activeTask] = state;
      try {
        E.schedule(T, p);
      } catch (e) {
        $("#activityError").textContent = e.message;
        $("#activityError").hidden = false;
        return;
      }
      current.taskStates[activeTask] = state;
      persist();
      dialog.close();
      render();
      toast("Activity saved. Dependent dates recalculated.");
    }
  });
  document.addEventListener("focusin", (ev) => {
    const form = ev.target.closest("#projectForm");
    if (form && setupQuestions.some(([key]) => key === ev.target.name)) {
      setupCursor = ev.target.name;
      renderSetupNavigation(form);
    }
  });
  document.addEventListener("input", (ev) => {
    const f = ev.target.closest("#projectForm");
    if (f) {
      if (ev.target.name === "targetDays") {
        const n = +ev.target.value;
        if (Number.isFinite(n) && n >= 0 && n <= 7300)
          try {
            f.elements.targetDate.value = E.addDays(
              f.elements.startDate.value,
              n,
            );
          } catch (e) {}
      } else if (["startDate", "targetDate"].includes(ev.target.name)) {
        const n =
          (Date.parse(f.elements.targetDate.value) -
            Date.parse(f.elements.startDate.value)) /
          86400000;
        if (Number.isFinite(n)) f.elements.targetDays.value = Math.round(n);
      }
      syncSetupControls(f, ev.target);
      renderSetupNavigation(f);
      if ($("#setupPreview"))
        $("#setupPreview").innerHTML = previewHTML(projectFromForm(f));
    }
    if (ev.target.id === "planSearch") {
      ui.query = ev.target.value;
      saveUI();
      if (route.page === "timeline")
        $("#timelineResults").innerHTML = ganttHTML();
      else $("#workstreamResults").innerHTML = workstreamResultsHTML();
    }
  });
  document.addEventListener("change", (ev) => {
    if (ev.target.id === "planDomain" || ev.target.id === "criticalOnly") {
      ui.domain = $("#planDomain").value;
      ui.criticalOnly = $("#criticalOnly")?.checked || false;
      saveUI();
      if (route.page === "timeline")
        $("#timelineResults").innerHTML = ganttHTML();
      else $("#workstreamResults").innerHTML = workstreamResultsHTML();
    }
    if (ev.target.dataset.productSelect) {
      const id = ev.target.dataset.productSelect;
      current.selectedProducts = current.selectedProducts || [];
      if (ev.target.checked && !current.selectedProducts.includes(id))
        current.selectedProducts.push(id);
      else if (!ev.target.checked)
        current.selectedProducts = current.selectedProducts.filter(
          (x) => x !== id,
        );
      persist();
      if ($("#advisorySelectionCount"))
        $("#advisorySelectionCount").textContent =
          current.selectedProducts.length;
    }
  });
  document.addEventListener(
    "toggle",
    (ev) => {
      if (ev.target.dataset?.wsDetails) {
        ui.openWS = ui.openWS || {};
        ui.openWS[ev.target.dataset.wsDetails] = ev.target.open;
        saveUI();
      }
    },
    true,
  );
  $("#navToggle").addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("nav-collapsed");
    ui.collapsed = collapsed;
    saveUI();
    $("#navToggle").setAttribute("aria-expanded", String(!collapsed));
  });
  document.addEventListener("click", (ev) => {
    if (
      window.innerWidth <= 760 &&
      !ev.target.closest(".workspace-nav,#navToggle")
    ) {
      document.body.classList.add("nav-collapsed");
      $("#navToggle").setAttribute("aria-expanded", "false");
    }
  });
  const resizer = $("#navResizer");
  let dragging = false;
  resizer.addEventListener("pointerdown", (ev) => {
    dragging = true;
    resizer.setPointerCapture(ev.pointerId);
  });
  resizer.addEventListener("pointermove", (ev) => {
    if (dragging) {
      ui.width = Math.max(210, Math.min(380, ev.clientX));
      document.documentElement.style.setProperty(
        "--nav-width",
        ui.width + "px",
      );
    }
  });
  resizer.addEventListener("pointerup", () => {
    dragging = false;
    saveUI();
  });
  resizer.addEventListener("keydown", (ev) => {
    if (["ArrowLeft", "ArrowRight"].includes(ev.key)) {
      ev.preventDefault();
      ui.width = Math.max(
        210,
        Math.min(380, (ui.width || 258) + (ev.key === "ArrowRight" ? 10 : -10)),
      );
      document.documentElement.style.setProperty(
        "--nav-width",
        ui.width + "px",
      );
      saveUI();
    }
  });
  if (ui.width)
    document.documentElement.style.setProperty("--nav-width", ui.width + "px");
  if (ui.collapsed || window.innerWidth <= 760) {
    document.body.classList.add("nav-collapsed");
    $("#navToggle").setAttribute("aria-expanded", "false");
  }
  let wasMobile = window.innerWidth <= 760;
  window.addEventListener("resize", () => {
    const mobile = window.innerWidth <= 760;
    if (mobile !== wasMobile) {
      const collapsed = mobile || !!ui.collapsed;
      document.body.classList.toggle("nav-collapsed", collapsed);
      $("#navToggle").setAttribute("aria-expanded", String(!collapsed));
      wasMobile = mobile;
    }
  });
  const seeded = window.CCExampleProject.ensure(projects, T, E);
  projects = seeded.projects;
  if (seeded.changed) saveProjects();
  window.addEventListener("hashchange", render);
  render();
})();
