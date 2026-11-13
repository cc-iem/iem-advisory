/* Advisory relationships are distinct from the hospital's delivery responsibilities. */
(function (root) {
  "use strict";
  var T = root.CC_GREENFIELD,
    C = root.CC_CATALOG;
  var byCode = Object.fromEntries(C.map((p) => [p.code, p]));
  var leads = [
    "GOV-03",
    "STR-04",
    "FIN-06",
    "REG-03",
    "FAC-01",
    "FAC-02",
    "DIG-07",
    "CLIN-04",
    "WORK-15",
    "CLIN-05",
    "CLIN-06",
    "SQPE-08",
    "WORK-15",
    "WORK-16",
    "SUP-01",
    "SUP-02",
    "STR-05",
    "GOV-02",
  ];
  var original = Object.fromEntries(
    T.workstreams.map((w) => [w.id, w.products.slice()]),
  );
  var post = {
    "FIN-01": [3],
    "CLIN-01": [8],
    "WORK-07": [8, 14],
    "WORK-14": [9, 10, 13],
    "SQPE-01": [12],
    "SQPE-02": [12],
    "SQPE-06": [12, 14],
  };
  var conditional = {
    "STR-02": {
      workstreams: [1, 2, 3],
      flag: "partnershipAdvisory",
      label: "When a partnership or transaction is in scope",
    },
    "DIG-05": {
      workstreams: [1, 7, 12],
      flag: "aiAdvisory",
      label: "When AI systems are in the opening scope",
    },
  };
  var patterns = {
    "STR-01":
      "market|demand|business.case|financ|budget|growth|capacity|volume",
    "STR-02": "partnership|affiliation|transaction|joint.venture",
    "STR-03": "business.case|financ|budget|capital|capacity|funding|ramp",
    "STR-04":
      "service|model.of.care|clinical.vision|portfolio|scope|phasing|capacity|operating.model",
    "STR-05":
      "marketing|communications|brand|referral|access|contact|booking|opening.announcement|channel|demand",
    "GOV-01":
      "digital|system|HIS|EHR|cutover|go.live|downtime|readiness|data|validation|test",
    "GOV-02":
      "activation|readiness|go.live|mock|command|simulation|handover|risk|scope|governance|workstream|checklist|plan|leadership|gate",
    "GOV-03":
      "governance|scope|lead|workstream|steering|risk|budget|schedule|decision|report|gate|program|programme|resourcing",
    "FIN-01": "profit|margin|cost|reforecast|revenue|budget.vs.actual",
    "FIN-02": "report|month.end|dashboard|performance|cost.centre",
    "FIN-03":
      "budget|financ.*model|business.case|ramp|forecast|pricing|payor|payer",
    "FIN-04":
      "finance.*model|master.data|asset|cost.centre|close|staff|control",
    "FIN-05":
      "revenue|payor|payer|bill|claim|pricing|price|catalogue|cashier|collection|coding|registration|insur",
    "FIN-06":
      "finance|budget|master.data|cost.centre|asset|close|report|control|mock",
    "REG-01":
      "accredit|appraisal|inspection|evidence|audit|quality|performance",
    "REG-02":
      "physician|practitioner|medical.staff|credential|privileg|practi[sc]ing|registration|qualification",
    "REG-03":
      "licen[cs]|permit|dossier|regulat|certificat|approval|inspection|service.list|documentation",
    "REG-04": "accredit|appraisal|audit|inspection|quality|policy|evidence",
    "FAC-01":
      "design|layout|adjacen|room|flow|technical.requirement|user.group|brief",
    "FAC-02":
      "equipment|procurement|specification|vendor|tender|order|delivery|purchase|room.by.room",
    "FAC-03":
      "commission|handover|acceptance|readiness|test|occupancy|defect|fit.up|set.up",
    "FAC-04":
      "biomedical|maintenance|asset|calibration|warranty|equipment.*train|acceptance",
    "DIG-01":
      "IT.scope|digital.plan|roadmap|strategy|IT.lead|platform|architecture",
    "DIG-02":
      "infrastructure|network|cabl|interface|integrat|interoper|cyber|downtime|security|ICT|IT.room",
    "DIG-03": "EHR|HIS|clinical.system|workflow|LIS|PACS|RIS|formulary",
    "DIG-04": "data|dashboard|metric|analytic|report",
    "DIG-05": "artificial.intelligence|AI.governance|AI.system",
    "DIG-06":
      "patient.access|contact.centre|booking|scheduling|channel|digital|patient.journey",
    "DIG-07":
      "system|interface|integrat|test|validation|workflow|data|migration|build|cutover|downtime|EHR|HIS|LIS|PACS",
    "CLIN-01": "maturity|evaluation|performance|utilisation|improvement",
    "CLIN-02":
      "governance|charter|service.line|centre|center|clinical.vision|scope.of.service",
    "CLIN-03":
      "pathway|protocol|care.path|order.set|workflow|patient.flow|medication|transfusion|specimen",
    "CLIN-04":
      "model|service|patient.flow|committee|policy|policies|clinical|scope|protocol|readiness|mock",
    "CLIN-05": "nurs|roster|unit|medication|competenc|orientation|staffing",
    "CLIN-06":
      "laboratory|pharmacy|imaging|sterile|blood|transfusion|clinical.support|medicin|reagent|consumable|competenc",
    "WORK-01": "placement|observation|visiting|clinical.education",
    "WORK-02": "placement|fellow|rotation|research|clinical.education",
    "WORK-03": "leadership|leader|executive|director",
    "WORK-04":
      "orientation|onboarding|culture|patient.experience|communicat|caregiver",
    "WORK-05": "simulat|mock|scenario|rehears|skills|resuscitation",
    "WORK-06":
      "faculty|knowledge|education.calendar|best.practice|education.strategy",
    "WORK-07": "clinical.review|second.opinion|complex.case",
    "WORK-08": "staff|skill.mix|workforce|competenc|roster|FTE|nurs.*model",
    "WORK-09":
      "organi[sz]ation|structure|hiring.wave|leadership|reporting.line|staffing.plan",
    "WORK-10": "profile|role|job|selection.criteria|demand.by.specialty",
    "WORK-11": "recruit|sourc|hiring|candidate|workforce|foreign",
    "WORK-12": "recruit|selection|appointed|director|head.of|on.board",
    "WORK-13": "onboard|orientation|relocation|foreign|in.post",
    "WORK-14": "retention|engagement|succession|performance|ramp.up",
    "WORK-15":
      "staff|recruit|hir|workforce|physician|headcount|onboard|cohort|in.post|appointed|arrival",
    "WORK-16":
      "training|education|competenc|orientation|simulation|rehears|assessment|sign.off",
    "WORK-17":
      "HR|payroll|handbook|policy|policies|housing|transport|badge|uniform|occupational|onboard|system|vaccinat",
    "SQPE-01": "quality|metric|improvement|incident|patient.experience",
    "SQPE-02": "maturity|culture|assessment|improvement",
    "SQPE-03":
      "quality|safety|infection|policy|SQPE|patient.experience|design|readiness",
    "SQPE-04": "policy|practice|guide|medication|nurs|infection|patient.ident",
    "SQPE-05": "training|education|learning|competenc",
    "SQPE-06": "train|culture|communicat|reliability",
    "SQPE-07": "speaker|session|knowledge|training|education|culture",
    "SQPE-08":
      "safety|quality|infection|risk|incident|policy|policies|emergency|disaster|patient.experience|environment|medication|readiness",
    "SUP-01":
      "supply|inventor|stock|logistic|procurement|warehouse|storage|par.level|material|consumable|reagent|cold.chain|supplier|requisition",
    "SUP-02":
      "support.service|clean|food|linen|security|transport|waste|contract|outsourc|set.up|mock|functional.department|service.level",
    "SUP-03":
      "facilit|maintenance|engineering|utilit|life.safety|handover|building.system|asset|service.contractor",
  };
  C.forEach((p) => {
    var numbers =
      p.workstreamNumbers ||
      T.workstreams
        .filter((w) => original[w.id].includes(p.id))
        .map((w) => w.number);
    if (post[p.code]) {
      numbers = post[p.code];
      p.lifecycle = "Post-opening";
    } else p.lifecycle = "Development and activation";
    if (conditional[p.code]) {
      numbers = conditional[p.code].workstreams;
      p.conditionFlag = conditional[p.code].flag;
      p.conditionLabel = conditional[p.code].label;
    }
    p.workstreamNumbers = numbers;
  });
  T.workstreams.forEach((w) => {
    w.leadProduct = byCode[leads[w.number - 1]].id;
    w.products = C.filter(
      (p) => p.workstreamNumbers.includes(w.number) && !p.conditionFlag,
    ).map((p) => p.id);
    w.conditionalProducts = C.filter(
      (p) => p.workstreamNumbers.includes(w.number) && p.conditionFlag,
    ).map((p) => p.id);
    w.coverage =
      "Primary advisory home and supporting scopes mapped; hospital and vendor delivery responsibilities remain explicit";
  });
  T.tasks.forEach((t) => {
    var w = T.workstreams.find((w) => w.id === t.workstream),
      text = t.name + " " + t.deliverable;
    t.products = C.filter(
      (p) =>
        p.workstreamNumbers.includes(w.number) &&
        new RegExp(patterns[p.code] || "$^", "i").test(text),
    ).map((p) => p.id);
    var proposed = t.products.some((id) => C.find((p) => p.id === id).proposed);
    t.advisorySupport =
      t.advisory === "Owner-led" &&
      proposed &&
      /model|plan|strategy|list|scope|review|readiness|register|process|protocol|requirement|checklist|schedule|test|handover|training|commission|procurement|inventory|par.level|mock|acceptance|stocking|quality|contract|mobili[sz]/i.test(
        text,
      );
  });
  C.forEach((p) => {
    p.workstreamLinks = p.workstreamNumbers.map((number) => {
      var w = T.workstreams.find((w) => w.number === number);
      return {
        id: w.id,
        number: w.number,
        name: w.name,
        role: p.conditionFlag
          ? "Conditional"
          : p.lifecycle === "Post-opening"
            ? "Post-opening"
            : w.leadProduct === p.id
              ? "Primary advisory home"
              : "Supporting scope",
        activities: T.tasks
          .filter((t) => t.workstream === w.id && t.products.includes(p.id))
          .slice(0, 4)
          .map((t) => t.name),
      };
    });
  });
  T.solutionMappingVersion = "greenfield-solutions-v2";
  root.CC_SOLUTION_MAPPING = {
    version: T.solutionMappingVersion,
    proposedCount: root.CC_NEW_SOLUTIONS.length,
    principle:
      "A workstream is a delivery responsibility; a solution is a scoped advisory contribution with defined deliverables and evidence.",
  };
})(typeof window !== "undefined" ? window : globalThis);
