/* Portfolio migration. Stable internal IDs preserve saved selections and brochure links. */
(function (root) {
  "use strict";
  var domains = [
    [
      "strategy",
      "Strategy",
      "Market demand, opening scope, service portfolio, growth and patient access.",
    ],
    [
      "governance",
      "Governance & Activation",
      "Program governance, integrated planning, readiness gates, opening and stabilization.",
    ],
    [
      "finance",
      "Finance",
      "Feasibility, financial planning, budgets, reporting and revenue cycle.",
    ],
    [
      "regulatory",
      "Regulatory",
      "Licensing, permits, credentialing requirements and accreditation readiness.",
    ],
    [
      "facilities",
      "Facilities & Equipment",
      "Clinical design inputs, equipment planning, commissioning and handover.",
    ],
    [
      "digital",
      "Digital",
      "Clinical systems, infrastructure, cybersecurity, data, analytics and digital activation.",
    ],
    [
      "clinical",
      "Clinical Operations",
      "Models of care, service lines, nursing and clinical support services.",
    ],
    [
      "workforce",
      "Human Resource",
      "Workforce planning, recruitment, medical staff, onboarding and education.",
    ],
    [
      "sqpe",
      "SQPE",
      "Safety, quality, infection prevention, improvement and patient experience.",
    ],
    [
      "support",
      "Support Services",
      "Supply chain, logistics, facilities operations and non-clinical support.",
    ],
  ].map(function (d, i) {
    var codes = [
      "STR",
      "GOV",
      "FIN",
      "REG",
      "FAC",
      "DIG",
      "CLIN",
      "HR",
      "SQPE",
      "SUP",
    ];
    return { id: d[0], name: d[1], short: d[1], blurb: d[2], code: codes[i] };
  });
  var primary = {
    "FIN-01": "strategy",
    "FIN-02": "strategy",
    "FIN-07": "strategy",
    "SL-02": "strategy",
    "SL-06": "governance",
    "IT-06": "governance",
    "REC-05": "regulatory",
    "SL-07": "regulatory",
    "SL-01": "clinical",
    "SL-03": "clinical",
    "SL-04": "clinical",
    "SL-05": "workforce",
  };
  var secondary = {
    "FIN-01": ["finance"],
    "FIN-02": ["finance"],
    "FIN-07": ["finance", "governance"],
    "SL-02": ["clinical", "finance"],
    "SL-06": ["clinical", "facilities", "support", "sqpe"],
    "IT-06": ["digital"],
    "REC-05": ["workforce"],
    "SL-07": ["clinical", "sqpe"],
    "SL-05": ["clinical"],
    "IT-02": ["facilities"],
    "IT-07": ["strategy"],
    "SQPE-03": ["facilities", "regulatory"],
  };
  var old = {
    finance: "finance",
    digital: "digital",
    education: "workforce",
    recruitment: "workforce",
    sqpe: "sqpe",
    serviceline: "clinical",
  };
  (root.CC_CATALOG || []).forEach(function (p) {
    p.legacyDomain = p.domain;
    p.domain = primary[p.id] || p.primaryDomain || old[p.domain];
    p.secondaryDomains = secondary[p.id] || [];
    if (!p.proposed)
      p.scopeStatus =
        "Existing offering; engagement scope confirmed at proposal";
  });
  // Number the complete catalog once, before hospital-type filters are applied.
  domains.forEach(function (d) {
    root.CC_CATALOG.filter(function (p) {
      return p.domain === d.id;
    }).forEach(function (p, i) {
      p.number = i + 1;
      p.code = d.code + "-" + String(p.number).padStart(2, "0");
    });
  });
  var finder = root.CC_FINDER;
  var packet = finder.domains.filter(function (d) {
    return d.id === "finance";
  })[0].packet;
  domains.filter(function (d) {
    return d.id === "finance";
  })[0].packet = packet;
  finder.domains = domains;
  /* Include existing offerings and explicitly labelled proposed scopes in each domain. */
  finder.questions = {};
  domains.forEach(function (d) {
    var products = root.CC_CATALOG.filter(function (p) {
      return p.domain === d.id;
    });
    finder.questions[d.id] = products.length
      ? [
          {
            id: d.id + "-priority",
            short: "Priority",
            title: "What would help you most?",
            help: "Choose the outcome closest to your current need.",
            options: products.map(function (p) {
              var scores = {};
              scores[p.id] = 10;
              return {
                id: p.id,
                label: p.title,
                detail: p.subtitle,
                status: p.fit,
                scores: scores,
              };
            }),
          },
        ]
      : [];
  });
  root.CC_DOMAINS = domains;
  root.CC_PACKAGES = []; // Replaced by project-specific advisory selections in Hospital Planner.
})(typeof window !== "undefined" ? window : globalThis);
