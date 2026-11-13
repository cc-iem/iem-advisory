/* Generated locally; see docs/planner-method.md. */
(function(root){ root.CC_GREENFIELD = {
  "version": "1.0.0",
  "title": "Greenfield Hospital Opening Template",
  "source": {
    "format": "MS Project, parsed using MPXJ",
    "sourceRowCount": 450,
    "sourceDependencyCount": 500,
    "exportSha256": "4ee4a2b1fa148197328d7c13f34ee00e3369dd9c4d5b9f49d508776f3bcf4369",
    "scope": "Generalized operational workstreams and gates. Client contract and engagement records excluded.",
    "reviewStatus": "Planning draft; durations, local requirements and resourcing require confirmation."
  },
  "reference": {
    "openingBeds": 100,
    "departments": 7,
    "workingHoursPerDay": 8
  },
  "workstreams": [
    {
      "id": "WS-01",
      "number": 1,
      "name": "Governance & PMO",
      "domain": "governance",
      "owner": "Program Director",
      "products": [
        "SL-06"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-02",
      "number": 2,
      "name": "Strategy & Business Planning",
      "domain": "strategy",
      "owner": "Strategy Lead",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-03",
      "number": 3,
      "name": "Finance",
      "domain": "finance",
      "owner": "CFO",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-04",
      "number": 4,
      "name": "Regulatory & Licensing",
      "domain": "regulatory",
      "owner": "Regulatory Lead",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "coverage": "Coordination only; specialist scope to be agreed"
    },
    {
      "id": "WS-05",
      "number": 5,
      "name": "Building & Construction",
      "domain": "facilities",
      "owner": "Developer / Facilities Lead",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "coverage": "Coordination only; specialist scope to be agreed"
    },
    {
      "id": "WS-06",
      "number": 6,
      "name": "Equipment & Biomedical Engineering",
      "domain": "facilities",
      "owner": "Biomedical Engineering Lead",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "coverage": "Coordination only; specialist scope to be agreed"
    },
    {
      "id": "WS-07",
      "number": 7,
      "name": "IT & Digital",
      "domain": "digital",
      "owner": "CIO / IT Lead",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-08",
      "number": 8,
      "name": "Clinical Operations & Service Lines",
      "domain": "clinical",
      "owner": "CMO / Clinical Operations Lead",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-09",
      "number": 9,
      "name": "Medical Staff",
      "domain": "workforce",
      "owner": "Medical Staff / Recruitment Lead",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-10",
      "number": 10,
      "name": "Nursing",
      "domain": "clinical",
      "owner": "Chief Nursing Officer",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-11",
      "number": 11,
      "name": "Clinical Support Services",
      "domain": "clinical",
      "owner": "Clinical Support Leads",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "coverage": "Coordination only; specialist scope to be agreed"
    },
    {
      "id": "WS-12",
      "number": 12,
      "name": "Safety, Quality & Patient Experience",
      "domain": "sqpe",
      "owner": "Quality & Safety Lead",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-13",
      "number": 13,
      "name": "Human Resources",
      "domain": "workforce",
      "owner": "HR Lead",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-14",
      "number": 14,
      "name": "Education & Training",
      "domain": "workforce",
      "owner": "Education Lead",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-15",
      "number": 15,
      "name": "Supply Chain",
      "domain": "support",
      "owner": "Procurement / Logistics Lead",
      "products": [],
      "coverage": "Coordination only; specialist scope to be agreed"
    },
    {
      "id": "WS-16",
      "number": 16,
      "name": "Support Services & Facilities Operations",
      "domain": "support",
      "owner": "COO / Facilities Operations Lead",
      "products": [],
      "coverage": "Coordination only; specialist scope to be agreed"
    },
    {
      "id": "WS-17",
      "number": 17,
      "name": "Marketing & Patient Access",
      "domain": "strategy",
      "owner": "Growth / Patient Access Lead",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    },
    {
      "id": "WS-18",
      "number": 18,
      "name": "Activation & Operational Readiness",
      "domain": "governance",
      "owner": "Activation Lead",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "coverage": "Related offerings; engagement scope to be agreed"
    }
  ],
  "tasks": [
    {
      "id": "GF-003",
      "sourceId": 3,
      "name": "Construction start",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "build",
      "owner": "Steering Committee",
      "deliverable": "Construction start",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-006",
      "sourceId": 6,
      "name": "Program scope and governance approved",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "Steering Committee",
      "deliverable": "Signed-off scope, RACI, hours plan and governance cadence",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-048",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-047",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-050",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-051",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-045",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-049",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Joint decision",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-007",
      "sourceId": 7,
      "name": "Opening scope, staffing and budget approved",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "Steering Committee",
      "deliverable": "Approved opening scope (the planned opening capacity), staffing plan, pre-opening budget",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-095",
          "type": "FS",
          "lag": 0,
          "sourceLag": 3.0
        },
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-329",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-078",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-008",
      "sourceId": 8,
      "name": "Design freeze",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "Steering Committee",
      "deliverable": "Frozen layout and room data",
      "notes": "Confirm layout, equipment, digital, clinical-support and infection-prevention requirements together before design freeze.",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-145",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-144",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-169",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-190",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-281",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-304",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-009",
      "sourceId": 9,
      "name": "Operating models approved; activation launched",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "Steering Committee",
      "deliverable": "Operating models, staffing and business plan approved; activation team in place",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-063",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-064",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-428",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-330",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-097",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-010",
      "sourceId": 10,
      "name": "Shell and core complete",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Steering Committee",
      "deliverable": "Shell and core",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-140",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-011",
      "sourceId": 11,
      "name": "Opening workforce onboarded",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Steering Committee",
      "deliverable": "Opening headcount in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-339",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-340",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-250",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-268",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-012",
      "sourceId": 12,
      "name": "Building handover",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Steering Committee",
      "deliverable": "Accepted building, systems commissioned",
      "notes": "Handover follows shell/core, fit-out, commissioning, acceptance and documentation. Specialist review is required before permitting any overlap.",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-151",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-152",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-153",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-154",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-010",
          "type": "FS",
          "lag": 0,
          "origin": "Generalization completion check"
        },
        {
          "id": "GF-155",
          "type": "FS",
          "lag": 0,
          "origin": "Generalization completion check"
        },
        {
          "id": "GF-156",
          "type": "FS",
          "lag": 0,
          "origin": "Generalization completion check"
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-013",
      "sourceId": 13,
      "name": "Operating licence application submitted",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Steering Committee",
      "deliverable": "Submitted dossier",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-124",
          "type": "FS",
          "lag": 0,
          "sourceLag": 3.0
        },
        {
          "id": "GF-125",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-122",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-126",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-014",
      "sourceId": 14,
      "name": "Operating licence granted",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Steering Committee",
      "deliverable": "Hospital operating licence",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-131",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-015",
      "sourceId": 15,
      "name": "Go / No-Go decision",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Steering Committee",
      "deliverable": "Go / No-Go decision",
      "notes": "Opening requires an accountable decision against agreed evidence. Unresolved mandatory criteria require a scope or date decision.",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-442",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-016",
      "sourceId": 16,
      "name": "First patient",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Steering Committee",
      "deliverable": "Hospital open",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-015",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-443",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-017",
      "sourceId": 17,
      "name": "Stabilization complete",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "Steering Committee",
      "deliverable": "Program close-out",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": true,
      "dependencies": [
        {
          "id": "GF-449",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-045",
      "sourceId": 45,
      "name": "Workstream leads named for all 18 workstreams; advisory team counterparts named for the advisory workstreams",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Named leads list",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-046",
      "sourceId": 46,
      "name": "Joint leadership reset meeting: scope, roles, timeline and resourcing to the opening programme",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner CEO and advisory team IEM Vice President",
      "deliverable": "Decisions log",
      "notes": "",
      "duration": 2.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Joint decision",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-047",
      "sourceId": 47,
      "name": "Opening date, opening beds and service scope confirmed in writing",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner CEO",
      "deliverable": "Written confirmation of date and scope",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-046",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-048",
      "sourceId": 48,
      "name": "Responsibilities agreed: hospital teams execute; advisers advise and review",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "RACI by workstream",
      "notes": "Delivery roles are engagement-specific. Advisory services do not automatically include running the hospital PMO or executing client tasks.",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-046",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Joint decision",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-049",
      "sourceId": 49,
      "name": "Governance cadence agreed: PMO, steering committee, advisory reviews and gate decisions",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Governance charter",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-046",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Joint decision",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-050",
      "sourceId": 50,
      "name": "hospital owner Program Director / Activation Lead named: one accountable owner for the opening",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner CEO",
      "deliverable": "Appointment",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-046",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-051",
      "sourceId": 51,
      "name": "PMO staffing and resourcing plan approved",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner CEO",
      "deliverable": "Approved PMO structure and headcount",
      "notes": "Confirm PMO capacity separately from advisory hours; the schedule is not resource-levelled.",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-046",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-052",
      "sourceId": 52,
      "name": "hospital owner PMO team in post (program director, planners, leads for construction interface, IT, equipment, operations)",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "PMO team in post",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-051",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-054",
      "sourceId": 54,
      "name": "PMO toolkit: master schedule format, RAID log, status reporting, document management",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "PMO toolkit",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-006",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-055",
      "sourceId": 55,
      "name": "Integrated activation plan v1 authored by hospital owner (all 18 workstreams, owners, dependencies, critical path)",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Integrated master schedule v1",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-006",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-056",
      "sourceId": 56,
      "name": "Governance cadence - operations planning (weekly PMO, monthly steering committee)",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Status reports; steering committee minutes",
      "notes": "",
      "duration": 105.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-006",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-057",
      "sourceId": 57,
      "name": "Risk register and mitigation plan established",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Risk register",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-055",
          "type": "SS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-058",
      "sourceId": 58,
      "name": "advisory team review of integrated activation plan v1",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "advisory team Relationship Manager and SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-055",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-059",
      "sourceId": 59,
      "name": "Stage-gate criteria defined for Gates 4, 5 and 6",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Gate criteria",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-055",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-060",
      "sourceId": 60,
      "name": "Integrated activation plan v2 re-baselined after design freeze and advisory team comments",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Integrated master schedule v2 (baseline)",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-058",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-008",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-061",
      "sourceId": 61,
      "name": "Interim space confirmed: staging for early hires, training area, contact centre",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Interim space plan",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-062",
      "sourceId": 62,
      "name": "Cross-workstream dependency workshops",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Dependency log",
      "notes": "",
      "duration": 135.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-063",
      "sourceId": 63,
      "name": "Gate 4 review pack and steering committee decision",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Gate 4 pack",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-060",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-064",
      "sourceId": 64,
      "name": "All workstream operating models signed off",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "planning",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Signed operating models",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-229",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-287",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-195",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-260",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-390",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-373",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-098",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-066",
      "sourceId": 66,
      "name": "Integrated countdown plan through the first 90 days of operations",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "activation",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Countdown schedule",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-067",
      "sourceId": 67,
      "name": "Governance cadence - activation (weekly readiness review, monthly steering committee)",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "activation",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Readiness reports",
      "notes": "",
      "duration": 190.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-068",
      "sourceId": 68,
      "name": "Go / No-Go criteria and decision process approved",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "activation",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Go / No-Go criteria",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 50.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-069",
      "sourceId": 69,
      "name": "advisory team review of Go / No-Go criteria",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "activation",
      "owner": "advisory team Relationship Manager and SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-068",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-071",
      "sourceId": 71,
      "name": "Governance cadence - stabilization (daily command centre, then monthly steering committee)",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Steering committee minutes",
      "notes": "",
      "duration": 260.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-072",
      "sourceId": 72,
      "name": "Lessons learned captured and reusable template updated",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "advisory team IEM Advisory lead",
      "deliverable": "Lessons-learned report",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 115.0,
          "sourceLag": 115.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Defined deliverable",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-073",
      "sourceId": 73,
      "name": "PMO transition to hospital operations and program close-out",
      "workstream": "WS-01",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "hospital owner Program Director / PMO",
      "deliverable": "Close-out report",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 220.0,
          "sourceLag": 220.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-076",
      "sourceId": 76,
      "name": "Opening service portfolio and level of service agreed",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Opening service scope",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-077",
      "sourceId": 77,
      "name": "Market research and demand update for the the new hospital catchment",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Market assessment",
      "notes": "Complete demand assessment before committing staffing, equipment and opening budgets.",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-078",
      "sourceId": 78,
      "name": "Phased capacity plan: beds, operating rooms, ICU, clinics and imaging",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Capacity and phasing plan",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "SS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-079",
      "sourceId": 79,
      "name": "advisory team review: opening scope, service lines and phasing",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "advisory team Strategy SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-080",
      "sourceId": 80,
      "name": "Model of care and clinical vision for the new hospital",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Model of care",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-081",
      "sourceId": 81,
      "name": "Phasing and ramp-up strategy with capacity triggers planned capacity",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Ramp-up strategy",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-078",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-082",
      "sourceId": 82,
      "name": "Hospital plan: marketing and communications, product development, business plan",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Hospital business plan",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-077",
          "type": "FS",
          "lag": 0,
          "sourceLag": 30.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-083",
      "sourceId": 83,
      "name": "Payor, pricing and patient-access channel strategy",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Payor and access strategy",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-084",
      "sourceId": 84,
      "name": "Market validation",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Validation findings",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-077",
          "type": "FS",
          "lag": 0,
          "sourceLag": 50.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-085",
      "sourceId": 85,
      "name": "Referral network and partnerships defined",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "planning",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Referral agreements",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-087",
      "sourceId": 87,
      "name": "Year-1 operating targets and department scorecards",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "activation",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Year-1 scorecard",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-088",
      "sourceId": 88,
      "name": "Referral network activation (referrers, corporate and insurer accounts)",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "activation",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Active referral accounts",
      "notes": "",
      "duration": 80.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-085",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-090",
      "sourceId": 90,
      "name": "Operating-year strategy review and next capacity-phase decision",
      "workstream": "WS-02",
      "domain": "strategy",
      "phase": "stabilization",
      "owner": "hospital owner Strategy / Group Business Development",
      "deliverable": "Phase 2 decision paper",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 225.0,
          "sourceLag": 225.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "FIN-01",
        "FIN-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-093",
      "sourceId": 93,
      "name": "Pre-opening budget developed: organisation chart, staffing, recruitment, procurement, training",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Pre-opening budget",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Review",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-094",
      "sourceId": 94,
      "name": "Pre-opening budget reviewed by hospital owner BOD and departments",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Reviewed budget",
      "notes": "",
      "duration": 9.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-093",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-095",
      "sourceId": 95,
      "name": "Pre-opening budget approved by hospital owner CEO",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "hospital owner CEO",
      "deliverable": "Approved pre-opening budget",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-094",
          "type": "FS",
          "lag": 0,
          "sourceLag": 3.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-096",
      "sourceId": 96,
      "name": "Business case and financial model refreshed for the approved opening scope",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Business Case 2.0",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-097",
      "sourceId": 97,
      "name": "advisory team review of business case refresh and financial model",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "advisory team Finance SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-096",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-098",
      "sourceId": 98,
      "name": "Finance operating model: shared services with hospital owner head office, systems, staffing",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Finance operating model",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-099",
      "sourceId": 99,
      "name": "Pricing model, service catalogue and price list (input to licence licence submission)",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Approved price list",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-083",
          "type": "SS",
          "lag": 0,
          "sourceLag": 15.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-100",
      "sourceId": 100,
      "name": "Payor and insurer contracting",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "planning",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Draft payor contracts",
      "notes": "",
      "duration": 100.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-083",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-102",
      "sourceId": 102,
      "name": "Master data set up; dedicated cost centre created",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Master data; cost centre",
      "notes": "Master data must be ready for integrated system testing.",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 50.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-103",
      "sourceId": 103,
      "name": "Asset codes built; assets tagged as equipment is delivered",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Asset register",
      "notes": "",
      "duration": 80.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-104",
      "sourceId": 104,
      "name": "Revenue cycle readiness: registration, coding, billing; cashier training",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Trained cashiers; billing ready",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 115.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-105",
      "sourceId": 105,
      "name": "Opening-year operating budget approved",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "opening-year operating budget",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 115.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-106",
      "sourceId": 106,
      "name": "Service catalogue and prices uploaded",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Catalogue live in system",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-099",
          "type": "FS",
          "lag": 0,
          "sourceLag": 125.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-107",
      "sourceId": 107,
      "name": "Payor contracts signed",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Signed contracts",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-100",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-108",
      "sourceId": 108,
      "name": "Billing tested end to end with insurers (sample claims)",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Tested claims",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-106",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-104",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-107",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-109",
      "sourceId": 109,
      "name": "Finance mock operations complete",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "activation",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Mock operations sign-off",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-108",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-111",
      "sourceId": 111,
      "name": "First month-end close and management reporting",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "stabilization",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "First close",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-112",
      "sourceId": 112,
      "name": "Revenue cycle stabilization (claims, denials, cash collection)",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "stabilization",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Stable revenue cycle",
      "notes": "",
      "duration": 115.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-113",
      "sourceId": 113,
      "name": "Budget vs actual and ramp-up reforecast (quarterly)",
      "workstream": "WS-03",
      "domain": "finance",
      "phase": "stabilization",
      "owner": "hospital owner CFO / F&A",
      "deliverable": "Quarterly reforecast",
      "notes": "",
      "duration": 240.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "FIN-04",
        "FIN-05",
        "FIN-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-116",
      "sourceId": 116,
      "name": "Licensing roadmap: permits, authorities, sequence and locally confirmed lead times",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "planning",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Licensing roadmap",
      "notes": "Local licensing sequences and review times require confirmation by the responsible authority and local specialists.",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-117",
      "sourceId": 117,
      "name": "Practitioner licensing pathway defined, including foreign physicians",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "planning",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Licensing pathway and lead times",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-116",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-118",
      "sourceId": 118,
      "name": "Environmental, fire-safety and wastewater approvals tracked with developer",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "planning",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Approvals tracker",
      "notes": "",
      "duration": 105.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-119",
      "sourceId": 119,
      "name": "Technical service list prepared for operating licence application",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "planning",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Technical service list",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-120",
      "sourceId": 120,
      "name": "Special equipment permits: radiation sources, CT / MRI",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "planning",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Permits",
      "notes": "",
      "duration": 80.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-170",
          "type": "FS",
          "lag": 0,
          "sourceLag": 17.0
        }
      ],
      "modules": [
        "imaging"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-122",
      "sourceId": 122,
      "name": "Practising certificates obtained for foreign physicians",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Practising certificates",
      "notes": "Practitioner licensing and registration must be completed before affected clinicians practise.",
      "duration": 100.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-244",
          "type": "FS",
          "lag": 0,
          "sourceLag": 1.0
        }
      ],
      "modules": [],
      "internationalOnly": true,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-123",
      "sourceId": 123,
      "name": "Environmental and medical waste permits",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Permits",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-124",
      "sourceId": 124,
      "name": "Operating licence application compiled: legal, personnel, equipment and service scope",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "licence application",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-119",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-125",
      "sourceId": 125,
      "name": "Facility legal and technical documentation received from the developer",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Facility documentation for the dossier",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 90.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-126",
      "sourceId": 126,
      "name": "Periodic professional-practice audit plan issued (attached to the dossier)",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Audit plan",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 95.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-127",
      "sourceId": 127,
      "name": "Fire safety acceptance and occupancy certificate",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Certificates",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-151",
          "type": "SS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-128",
      "sourceId": 128,
      "name": "Radiation safety licence and operator certification",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Radiation licence",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-178",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [
        "imaging"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-129",
      "sourceId": 129,
      "name": "Practice registration with local regulator for medical staff added beyond the dossier list",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Registered staff list",
      "notes": "",
      "duration": 22.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-011",
          "type": "FS",
          "lag": 0,
          "sourceLag": 22.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-130",
      "sourceId": 130,
      "name": "Regulatory appraisal or inspection hosted",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Appraisal minutes",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-013",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-317",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-131",
      "sourceId": 131,
      "name": "Remediation of appraisal findings; licence issued",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Remediation report",
      "notes": "",
      "duration": 35.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-130",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-132",
      "sourceId": 132,
      "name": "Pharmacy registration and practice certification obtained, where applicable",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "activation",
      "owner": "Hospital Director / Head of Pharmacy",
      "deliverable": "pharmacy practice certificate",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-014",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [
        "pharmacy"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-134",
      "sourceId": 134,
      "name": "Warehouse and vaccination-service approvals obtained, where applicable",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "stabilization",
      "owner": "Hospital Director / Head of Pharmacy",
      "deliverable": "storage practice and vaccination certificates",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-014",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-135",
      "sourceId": 135,
      "name": "Regulatory reporting cadence in operation",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "stabilization",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Regulatory reports",
      "notes": "",
      "duration": 240.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-136",
      "sourceId": 136,
      "name": "Licence scope extended for subsequent service and bed phases",
      "workstream": "WS-04",
      "domain": "regulatory",
      "phase": "stabilization",
      "owner": "Hospital BOD / General Planning",
      "deliverable": "Extended licence scope",
      "notes": "",
      "duration": 170.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 50.0,
          "sourceLag": 50.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-05",
        "SL-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-139",
      "sourceId": 139,
      "name": "Concept design approved",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "design team",
      "deliverable": "Approved concept",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-140",
      "sourceId": 140,
      "name": "Substructure, structure and envelope",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Shell and core",
      "notes": "",
      "duration": 225.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-003",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-141",
      "sourceId": 141,
      "name": "Detailed layout submitted for approval",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "design team / hospital owner Set-up PMO",
      "deliverable": "Detailed layout",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-142",
      "sourceId": 142,
      "name": "advisory team clinical review of layout: patient flows, adjacencies, infection control, life safety",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "advisory team Buildings and Design SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-141",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-143",
      "sourceId": 143,
      "name": "Layout signed off by hospital owner clinical user groups",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "User-group sign-off",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-142",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-144",
      "sourceId": 144,
      "name": "Room data sheets, MEP, medical gases and IT infrastructure requirements frozen",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Room data sheets",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-142",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-145",
      "sourceId": 145,
      "name": "Detailed layout approved",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "design team / hospital owner Set-up PMO",
      "deliverable": "Approved layout",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-143",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-146",
      "sourceId": 146,
      "name": "Design change control during construction",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Change log",
      "notes": "",
      "duration": 195.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-008",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-147",
      "sourceId": 147,
      "name": "MEP installation and internal fit-out",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Fitted-out building",
      "notes": "Default sequencing waits for shell and core completion. Any proposed construction overlap must be reviewed with the developer.",
      "duration": 80.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-008",
          "type": "FS",
          "lag": 0,
          "sourceLag": 110.0
        },
        {
          "id": "GF-010",
          "type": "FS",
          "lag": 0,
          "origin": "Generalization completion check"
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-148",
      "sourceId": 148,
      "name": "Early access for building-dependent medical equipment and IT rooms",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "planning",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Early access granted",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-147",
          "type": "SS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-150",
      "sourceId": 150,
      "name": "Loose furniture ordered",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "activation",
      "owner": "COO",
      "deliverable": "Purchase orders",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-008",
          "type": "FS",
          "lag": 0,
          "sourceLag": 153.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-151",
      "sourceId": 151,
      "name": "Building systems testing and commissioning: HVAC, medical gases, electrical, BMS, fire, water",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Commissioning certificates",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-147",
          "type": "FS",
          "lag": 0,
          "sourceLag": 50.0,
          "sourceType": "SS",
          "origin": "Generalization completion check"
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-152",
      "sourceId": 152,
      "name": "Statutory building inspections",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "activation",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Inspection approvals",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-151",
          "type": "FS",
          "lag": 0,
          "sourceLag": 20.0,
          "sourceType": "SS",
          "origin": "Generalization completion check"
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-153",
      "sourceId": 153,
      "name": "Construction acceptance by functional department and patient / customer flow",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "Hospital BOD and Inspection and Acceptance Team",
      "deliverable": "Acceptance records by department",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-151",
          "type": "FS",
          "lag": 0,
          "sourceLag": 25.0,
          "sourceType": "SS",
          "origin": "Generalization completion check"
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-154",
      "sourceId": 154,
      "name": "Take-over of built-in medical equipment and facilities from the Construction Management Board",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "Hospital BOD and Inspection and Acceptance Team",
      "deliverable": "Handover records",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-151",
          "type": "FS",
          "lag": 0,
          "sourceLag": 25.0,
          "sourceType": "SS",
          "origin": "Generalization completion check"
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-155",
      "sourceId": 155,
      "name": "As-built documents and manuals; facilities team trained on building systems",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "activation",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "As-built set; trained engineers",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-151",
          "type": "FS",
          "lag": 0,
          "sourceLag": 25.0,
          "sourceType": "SS",
          "origin": "Generalization completion check"
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-156",
      "sourceId": 156,
      "name": "Construction completion",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Practical completion",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-147",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-151",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-157",
      "sourceId": 157,
      "name": "Snagging, defect rectification and close-out",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Defects closed",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-158",
      "sourceId": 158,
      "name": "Loose furniture received, installed and accepted",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "COO",
      "deliverable": "Installed furniture",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-150",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-159",
      "sourceId": 159,
      "name": "Signage ordered and installed: wayfinding, counters, external signage",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "build",
      "owner": "COO",
      "deliverable": "Installed signage",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-160",
      "sourceId": 160,
      "name": "Deep clean and environmental sampling (air, water) before clinical use",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "activation",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Clearance results",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-157",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-162",
      "sourceId": 162,
      "name": "Defects liability period management",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "stabilization",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Defects log",
      "notes": "",
      "duration": 260.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-163",
      "sourceId": 163,
      "name": "Post-occupancy evaluation of facility design (input to phases planned capacity)",
      "workstream": "WS-05",
      "domain": "facilities",
      "phase": "stabilization",
      "owner": "developer / design team / hospital owner Set-up PMO",
      "deliverable": "Evaluation report",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 120.0,
          "sourceLag": 120.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "IT-02"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-166",
      "sourceId": 166,
      "name": "Equipment preparation and purchase submissions: Purchasing Council, Group Procurement and Tendering",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Approved purchase submissions",
      "notes": "",
      "duration": 88.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-167",
      "sourceId": 167,
      "name": "Room-by-room equipment list for the opening scope, aligned to the approved layout",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Room-by-room list",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "SS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-168",
      "sourceId": 168,
      "name": "advisory team review of equipment list and specifications for priority service lines",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "advisory team clinical SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-167",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-169",
      "sourceId": 169,
      "name": "Equipment technical requirements issued to the design team (loads, shielding, power, cooling)",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Technical requirements",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-167",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-170",
      "sourceId": 170,
      "name": "Final equipment list and budget approved",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Approved list",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-166",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-168",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-171",
      "sourceId": 171,
      "name": "Long-lead and building-dependent orders placed: imaging, operating rooms, sterilisers",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Purchase orders",
      "notes": "Long-lead equipment procurement requires vendor-confirmed manufacturing, delivery and installation assumptions.",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-170",
          "type": "FS",
          "lag": 0,
          "sourceLag": 7.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-172",
      "sourceId": 172,
      "name": "Equipment - IT interface specification",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Interface specification",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-170",
          "type": "FS",
          "lag": 0,
          "sourceLag": 7.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-173",
      "sourceId": 173,
      "name": "Biomedical engineering support model and staffing",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "planning",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Support model",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 75.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-175",
      "sourceId": 175,
      "name": "Procurement, manufacture and delivery",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "build",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Delivered equipment",
      "notes": "",
      "duration": 140.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-171",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-176",
      "sourceId": 176,
      "name": "Delivery logistics, staging and warehousing plan",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "build",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Logistics plan",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 25.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-177",
      "sourceId": 177,
      "name": "Installation - building-dependent and fixed equipment",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "build",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Installed fixed equipment",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-148",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-178",
      "sourceId": 178,
      "name": "Radiation safety surveys and shielding verification",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "activation",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Survey reports",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-177",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [
        "imaging"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-179",
      "sourceId": 179,
      "name": "Installation and handover - remaining equipment",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "build",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Installed equipment",
      "notes": "",
      "duration": 24.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-175",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-180",
      "sourceId": 180,
      "name": "Acceptance testing, calibration and asset registration",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "build",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Acceptance certificates",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-179",
          "type": "SS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-181",
      "sourceId": 181,
      "name": "Equipment - IT interfaces tested",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "activation",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Tested interfaces",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-179",
          "type": "SS",
          "lag": 0,
          "sourceLag": 15.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-182",
      "sourceId": 182,
      "name": "Equipment operation training and commissioning for use",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "build",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Trained users",
      "notes": "",
      "duration": 21.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-179",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-183",
      "sourceId": 183,
      "name": "Planned preventive maintenance schedule loaded",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "activation",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "PPM schedule",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-180",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-184",
      "sourceId": 184,
      "name": "Medical equipment installation complete",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "build",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Equipment ready",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-182",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-180",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-181",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-186",
      "sourceId": 186,
      "name": "Warranty management and preventive maintenance",
      "workstream": "WS-06",
      "domain": "facilities",
      "phase": "stabilization",
      "owner": "Medical Equipment / Procurement Center",
      "deliverable": "Maintenance records",
      "notes": "",
      "duration": 260.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-02",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-189",
      "sourceId": 189,
      "name": "IT scope confirmed: enterprise systems rollout or new HIS / EHR, laboratory, imaging and ERP",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "planning",
      "owner": "hospital owner COO / IT",
      "deliverable": "Application portfolio",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-190",
      "sourceId": 190,
      "name": "IT infrastructure requirements issued to the design team (ICT rooms, risers, cabling, wireless)",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "planning",
      "owner": "hospital owner COO / IT",
      "deliverable": "Infrastructure requirements",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-189",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-191",
      "sourceId": 191,
      "name": "Site IT lead named; IT staffing plan",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "planning",
      "owner": "hospital owner COO / IT",
      "deliverable": "IT lead; staffing plan",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-189",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-192",
      "sourceId": 192,
      "name": "advisory team review of IT and digital plan for the new hospital",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "planning",
      "owner": "advisory team IT SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-191",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-193",
      "sourceId": 193,
      "name": "Clinical and business workflow sessions with all workstreams (site configuration)",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "planning",
      "owner": "hospital owner COO / IT",
      "deliverable": "Workflow designs",
      "notes": "",
      "duration": 50.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-192",
          "type": "FS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-194",
      "sourceId": 194,
      "name": "Medical device integration specification",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "planning",
      "owner": "hospital owner COO / IT",
      "deliverable": "Integration specification",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-170",
          "type": "FS",
          "lag": 0,
          "sourceLag": 7.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-195",
      "sourceId": 195,
      "name": "Workflows approved for system configuration",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "planning",
      "owner": "hospital owner COO / IT",
      "deliverable": "Approved workflows",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-193",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-224",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-197",
      "sourceId": 197,
      "name": "Application configuration and site build: HIS / EHR, LIS, RIS / PACS, pharmacy, ERP",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Configured systems",
      "notes": "",
      "duration": 80.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-195",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-198",
      "sourceId": 198,
      "name": "Master data and local content: formulary, service catalogue, order sets",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Loaded master data",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-197",
          "type": "SS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [
        "pharmacy"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-199",
      "sourceId": 199,
      "name": "Interfaces and device integration build",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Built interfaces",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-197",
          "type": "SS",
          "lag": 0,
          "sourceLag": 40.0
        },
        {
          "id": "GF-194",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-200",
      "sourceId": 200,
      "name": "IT equipment ordered: laptops, printers and peripherals",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Purchase orders",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 79.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-201",
      "sourceId": 201,
      "name": "Network and telecom installed on site; server rooms commissioned",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Live network",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-148",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-202",
      "sourceId": 202,
      "name": "Integrated testing: unit, integrated, user acceptance",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Test sign-off",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-197",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-203",
      "sourceId": 203,
      "name": "Premises inspected for cable routing and equipment installation",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Inspection report",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-147",
          "type": "SS",
          "lag": 0,
          "sourceLag": 65.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-204",
      "sourceId": 204,
      "name": "IT equipment received, installed and accepted; software installed",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Installed devices",
      "notes": "",
      "duration": 13.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-200",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-205",
      "sourceId": 205,
      "name": "IT equipment inventory by department",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "IT asset register",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-204",
          "type": "SS",
          "lag": 0,
          "sourceLag": 8.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-206",
      "sourceId": 206,
      "name": "End-user training (HIS / EHR / ERP); super-user network",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Trained users",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-202",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-207",
      "sourceId": 207,
      "name": "Downtime procedures and business continuity tested",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Tested downtime procedures",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-204",
          "type": "FS",
          "lag": 0,
          "sourceLag": 17.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-208",
      "sourceId": 208,
      "name": "Technical dress rehearsal and go-live readiness assessments (60 / 30 days)",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Readiness assessment",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-202",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-204",
          "type": "FS",
          "lag": 0,
          "sourceLag": 17.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-209",
      "sourceId": 209,
      "name": "Cutover plan; IT command centre and at-the-elbow support model",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "Cutover plan",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-208",
          "type": "SS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-210",
      "sourceId": 210,
      "name": "IT ready for mock operations; final system acceptance",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "activation",
      "owner": "hospital owner COO / IT",
      "deliverable": "System acceptance",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-208",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-206",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-207",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-209",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-212",
      "sourceId": 212,
      "name": "Go-live support and heavy end-user support period",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "stabilization",
      "owner": "hospital owner COO / IT",
      "deliverable": "Support log",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-213",
      "sourceId": 213,
      "name": "Post-implementation optimisation",
      "workstream": "WS-07",
      "domain": "digital",
      "phase": "stabilization",
      "owner": "hospital owner COO / IT",
      "deliverable": "Optimised systems",
      "notes": "",
      "duration": 130.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-212",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-01",
        "IT-02",
        "IT-03",
        "IT-04",
        "IT-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-216",
      "sourceId": 216,
      "name": "Clinical staffing model and skill mix by department (opening establishment)",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Clinical staffing model",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "SS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-217",
      "sourceId": 217,
      "name": "Service line detailing for the opening scope: procedures, acuity, level of service",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Service line definitions",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-218",
      "sourceId": 218,
      "name": "Clinical governance structure: committees, credentialing and privileging",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Clinical governance framework",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-217",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-219",
      "sourceId": 219,
      "name": "Inpatient and outpatient patient-flow mapping against the approved layout",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Patient-flow maps",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-008",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-220",
      "sourceId": 220,
      "name": "Department operating models (emergency, perioperative, ICU, inpatient, outpatient, imaging): adopt hospital owner system standards and localise",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Department operating models",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-217",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-221",
      "sourceId": 221,
      "name": "advisory team SME advisory sessions on operating models for priority service lines (on written request)",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "advisory team clinical SMEs",
      "deliverable": "Session notes and recommendations",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-220",
          "type": "SS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-222",
      "sourceId": 222,
      "name": "Care pathways for priority service lines localised",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Care pathways",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-217",
          "type": "FS",
          "lag": 0,
          "sourceLag": 25.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-223",
      "sourceId": 223,
      "name": "Clinical policies and procedures: gap analysis against hospital owner system policies; localisation",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Clinical policy set",
      "notes": "",
      "duration": 80.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-218",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-224",
      "sourceId": 224,
      "name": "Clinical workflows documented for system configuration",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Documented workflows",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-219",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-225",
      "sourceId": 225,
      "name": "On-call, rota and 24 / 7 coverage model",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Coverage model",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-216",
          "type": "FS",
          "lag": 0,
          "sourceLag": 60.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-226",
      "sourceId": 226,
      "name": "Emergency response, ambulance and inter-facility transfer arrangements (link to referral hospital)",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Transfer agreements",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 60.0
        }
      ],
      "modules": [
        "emergency"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-227",
      "sourceId": 227,
      "name": "advisory team review of the clinical operating model",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "advisory team clinical SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-220",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-228",
      "sourceId": 228,
      "name": "Multidisciplinary table-top workflow exercise",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Exercise findings",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-220",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-229",
      "sourceId": 229,
      "name": "Clinical operating model approved",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director / CMO",
      "deliverable": "Approved clinical operating model",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-227",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-228",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-225",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-226",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-231",
      "sourceId": 231,
      "name": "Department operational readiness plans and checklists",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Hospital Director / CMO",
      "deliverable": "Readiness plans",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-232",
      "sourceId": 232,
      "name": "Clinical policies finalised, approved and published",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Hospital Director / CMO",
      "deliverable": "Published policies",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-223",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-233",
      "sourceId": 233,
      "name": "Clinical teams onboarded into departments",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Hospital Director / CMO",
      "deliverable": "Teams in departments",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 50.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-234",
      "sourceId": 234,
      "name": "Department set-up and layout validation in the building",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Hospital Director / CMO",
      "deliverable": "Validated department set-up",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-235",
      "sourceId": 235,
      "name": "Department-level clinical simulations",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Hospital Director / CMO",
      "deliverable": "Simulation reports",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-234",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-233",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-236",
      "sourceId": 236,
      "name": "Clinical operations ready",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Hospital Director / CMO",
      "deliverable": "Clinical readiness sign-off",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-235",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-232",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-238",
      "sourceId": 238,
      "name": "Phased service ramp-up beyond the planned capacity",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "stabilization",
      "owner": "Hospital Director / CMO",
      "deliverable": "Ramp-up report",
      "notes": "",
      "duration": 205.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-239",
      "sourceId": 239,
      "name": "Daily safety huddles and tiered daily management",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "stabilization",
      "owner": "Hospital Director / CMO",
      "deliverable": "Huddle records",
      "notes": "",
      "duration": 260.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-240",
      "sourceId": 240,
      "name": "Clinical operating model review at six months",
      "workstream": "WS-08",
      "domain": "clinical",
      "phase": "stabilization",
      "owner": "Hospital Director / CMO",
      "deliverable": "Review report",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 125.0,
          "sourceLag": 125.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-02",
        "SL-03",
        "SL-04",
        "SL-05",
        "SL-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-243",
      "sourceId": 243,
      "name": "Physician demand by specialty for the opening scope; job profiles and selection criteria",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Physician demand and profiles",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-244",
      "sourceId": 244,
      "name": "International department heads recruited and onboarded, where required",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Department heads in post",
      "notes": "",
      "duration": 98.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 1.0
        }
      ],
      "modules": [],
      "internationalOnly": true,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-245",
      "sourceId": 245,
      "name": "Directors of centres, heads of department and specialty onboarded",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Heads in post",
      "notes": "",
      "duration": 141.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 1.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-246",
      "sourceId": 246,
      "name": "Advisory recruitment request agreed: specialties, search criteria, scope and deliverables",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Advisory request with search criteria",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-243",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": true,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-247",
      "sourceId": 247,
      "name": "Recruitment advisory response: agreed scope, effort, people and deliverable",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "planning",
      "owner": "advisory team Relationship Manager",
      "deliverable": "Scoped response",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-246",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": true,
      "scale": "workload",
      "advisory": "Defined deliverable",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-248",
      "sourceId": 248,
      "name": "Credentialing and privileging policy and process",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Credentialing policy",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-218",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-250",
      "sourceId": 250,
      "name": "Physician recruitment - opening cohort",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Physicians in post",
      "notes": "",
      "duration": 110.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-330",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-251",
      "sourceId": 251,
      "name": "Competency assessment, grading and clinical privileging",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Privileges granted",
      "notes": "",
      "duration": 130.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-248",
          "type": "FS",
          "lag": 0,
          "sourceLag": 45.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-252",
      "sourceId": 252,
      "name": "Physician onboarding and orientation",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Oriented physicians",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-250",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-253",
      "sourceId": 253,
      "name": "Medical staff committees operational",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Committee minutes",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-218",
          "type": "FS",
          "lag": 0,
          "sourceLag": 180.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-254",
      "sourceId": 254,
      "name": "Professional practice evaluation framework ready",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Evaluation framework",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-248",
          "type": "FS",
          "lag": 0,
          "sourceLag": 155.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-256",
      "sourceId": 256,
      "name": "Physician recruitment for ramp-up phases",
      "workstream": "WS-09",
      "domain": "workforce",
      "phase": "stabilization",
      "owner": "Hospital Director / HR Recruitment",
      "deliverable": "Ramp-up hires",
      "notes": "",
      "duration": 200.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "REC-02",
        "REC-03",
        "REC-04",
        "REC-05",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-259",
      "sourceId": 259,
      "name": "Nursing staffing model and skill mix for the opening scope",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Head of Nursing",
      "deliverable": "Nursing staffing model",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "SS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-260",
      "sourceId": 260,
      "name": "Nursing operating model, scope of practice and policies (adopt hospital owner standards)",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Head of Nursing",
      "deliverable": "Nursing operating model",
      "notes": "",
      "duration": 55.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-259",
          "type": "FS",
          "lag": 0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-261",
      "sourceId": 261,
      "name": "Medication administration model agreed with Pharmacy",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Head of Nursing",
      "deliverable": "Medication model",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [
        "pharmacy"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-262",
      "sourceId": 262,
      "name": "Head of Nursing appointed",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Hospital Director",
      "deliverable": "Head of Nursing in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 56.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-263",
      "sourceId": 263,
      "name": "Nursing education, competency framework and onboarding plan",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Head of Nursing",
      "deliverable": "Competency framework",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-262",
          "type": "FS",
          "lag": 0,
          "sourceLag": 9.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-264",
      "sourceId": 264,
      "name": "Nursing tools and equipment list",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Head of Nursing",
      "deliverable": "Tools list",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-262",
          "type": "FS",
          "lag": 0,
          "sourceLag": 19.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-265",
      "sourceId": 265,
      "name": "Initial nursing, technical and clinical pharmacy cohorts in post",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Head of Nursing",
      "deliverable": "Cohorts in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 76.0
        }
      ],
      "modules": [
        "pharmacy"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-266",
      "sourceId": 266,
      "name": "Head nurses and chief technicians hired",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Head of Nursing",
      "deliverable": "Head nurses in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-262",
          "type": "FS",
          "lag": 0,
          "sourceLag": 86.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-268",
      "sourceId": 268,
      "name": "Nurse recruitment - opening cohort",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Head of Nursing",
      "deliverable": "Nurses in post",
      "notes": "",
      "duration": 110.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-330",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-269",
      "sourceId": 269,
      "name": "Nursing tools and equipment procured",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Head of Nursing",
      "deliverable": "Delivered tools",
      "notes": "",
      "duration": 85.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-264",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-270",
      "sourceId": 270,
      "name": "HIS / EHR nursing workflows reviewed and signed off",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Head of Nursing",
      "deliverable": "Workflow sign-off",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-197",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-271",
      "sourceId": 271,
      "name": "Nursing orientation and competency validation",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Head of Nursing",
      "deliverable": "Validated competencies",
      "notes": "",
      "duration": 50.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-268",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-263",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-272",
      "sourceId": 272,
      "name": "Unit readiness: stocking, crash carts, medication rooms",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Head of Nursing",
      "deliverable": "Unit checklists",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-273",
      "sourceId": 273,
      "name": "Staffing rosters built for the first four weeks",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Head of Nursing",
      "deliverable": "Rosters",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-271",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-274",
      "sourceId": 274,
      "name": "Nursing pre-activation mock scenarios complete",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Head of Nursing",
      "deliverable": "Nursing readiness sign-off",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-273",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-272",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-276",
      "sourceId": 276,
      "name": "Nursing-sensitive indicators and nursing dashboard",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "stabilization",
      "owner": "Head of Nursing",
      "deliverable": "Nursing dashboard",
      "notes": "",
      "duration": 130.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-277",
      "sourceId": 277,
      "name": "Nurse retention and engagement programme",
      "workstream": "WS-10",
      "domain": "clinical",
      "phase": "stabilization",
      "owner": "Head of Nursing",
      "deliverable": "Retention plan",
      "notes": "",
      "duration": 200.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 40.0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-05",
        "EDU-04",
        "SQPE-04"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-280",
      "sourceId": 280,
      "name": "Scope and in-source / outsource decisions: reference laboratory, blood supply, imaging reads, sterile services",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Scope decisions",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-076",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-281",
      "sourceId": 281,
      "name": "Building requirements to the design team: laboratory, pharmacy, sterile services, imaging",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Design requirements",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-280",
          "type": "SS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-282",
      "sourceId": 282,
      "name": "Laboratory: test menu, equipment and LIS requirements, staffing",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Laboratory operating model",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-280",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [
        "laboratory"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-283",
      "sourceId": 283,
      "name": "Pharmacy: operating model, formulary framework, staffing",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Pharmacy operating model",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-280",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [
        "pharmacy"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-284",
      "sourceId": 284,
      "name": "Imaging: modality plan, RIS / PACS requirements, radiation safety programme",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Imaging operating model",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-280",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [
        "imaging"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-285",
      "sourceId": 285,
      "name": "Sterile services: operating model, instrument sets, tracking",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Sterile services operating model",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-280",
          "type": "FS",
          "lag": 0,
          "sourceLag": 30.0
        }
      ],
      "modules": [
        "surgery"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-286",
      "sourceId": 286,
      "name": "Blood supply and transfusion service plan",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Transfusion plan",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-282",
          "type": "SS",
          "lag": 0,
          "sourceLag": 25.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-287",
      "sourceId": 287,
      "name": "Clinical support operating models complete",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Signed operating models",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-282",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-283",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-284",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-285",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        },
        {
          "id": "GF-286",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-288",
      "sourceId": 288,
      "name": "Head of Pharmacy and level-2 clinical pharmacists in post",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "planning",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Pharmacy leaders in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 142.0
        }
      ],
      "modules": [
        "pharmacy"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-290",
      "sourceId": 290,
      "name": "Medication list and initial stock quantities",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Hospital Director / Head of Pharmacy",
      "deliverable": "Medication list",
      "notes": "Formulary and stock decisions feed master data, procurement and systems testing.",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-283",
          "type": "FS",
          "lag": 0,
          "sourceLag": 60.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-291",
      "sourceId": 291,
      "name": "Medicines and consumables processes: forecasting, requisition, issue, sale, storage, inventory, disposal",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Approved processes",
      "notes": "",
      "duration": 33.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-283",
          "type": "FS",
          "lag": 0,
          "sourceLag": 130.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-292",
      "sourceId": 292,
      "name": "Imaging: acceptance testing and protocols",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Imaging acceptance",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-178",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [
        "imaging"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-293",
      "sourceId": 293,
      "name": "Temperature and humidity monitoring equipment and records in place",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Monitoring records",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-294",
      "sourceId": 294,
      "name": "Pharmacy equipment, tools, shelving and racks installed to set-up standards",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Fitted pharmacy",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [
        "pharmacy"
      ],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-295",
      "sourceId": 295,
      "name": "Sterile services: steriliser qualification and instrument set assembly",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Qualification reports",
      "notes": "",
      "duration": 25.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [
        "surgery"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-296",
      "sourceId": 296,
      "name": "Laboratory: equipment and LIS validation",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Validation reports",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [
        "laboratory"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-297",
      "sourceId": 297,
      "name": "Staff competency sign-off: laboratory, pharmacy, imaging, sterile services",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Competency records",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-296",
          "type": "SS",
          "lag": 0,
          "sourceLag": 15.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-298",
      "sourceId": 298,
      "name": "Initial pharmaceutical and reagent stocking",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Opening stock",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-294",
          "type": "FS",
          "lag": 0,
          "sourceLag": 15.0
        },
        {
          "id": "GF-293",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-290",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-299",
      "sourceId": 299,
      "name": "Clinical support services ready",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "activation",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Readiness sign-off",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-298",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-296",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-292",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-295",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-297",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-291",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-301",
      "sourceId": 301,
      "name": "Turnaround-time and utilisation monitoring",
      "workstream": "WS-11",
      "domain": "clinical",
      "phase": "stabilization",
      "owner": "Heads of Pharmacy, Laboratory, Imaging",
      "deliverable": "Monitoring reports",
      "notes": "",
      "duration": 130.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-04",
        "SL-05",
        "IT-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-304",
      "sourceId": 304,
      "name": "Infection prevention and life-safety check of the layout before design freeze",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Design compliance check",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-142",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-305",
      "sourceId": 305,
      "name": "Quality and safety framework and locally appropriate accreditation pathway defined",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Quality framework",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-306",
      "sourceId": 306,
      "name": "Head of Quality (SQPE lead) named",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Hospital Director",
      "deliverable": "Quality lead in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-307",
      "sourceId": 307,
      "name": "Quality and safety committees chartered; document-control policy",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Committee charters",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-306",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-308",
      "sourceId": 308,
      "name": "Hospital-wide policy programme: adopt hospital owner system policies, localise, close gaps",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Policy library",
      "notes": "",
      "duration": 100.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-306",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-309",
      "sourceId": 309,
      "name": "Risk management framework and incident reporting system",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Incident reporting live",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-307",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-310",
      "sourceId": 310,
      "name": "Quality and outcome measures and dashboards defined",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Measure set",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-307",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-311",
      "sourceId": 311,
      "name": "advisory team SQPE advisory review: framework, measures and policy programme",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "advisory team SQPE SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-305",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-312",
      "sourceId": 312,
      "name": "Emergency and disaster preparedness plans; emergency codes",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Emergency plans",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-307",
          "type": "FS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [
        "emergency"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-313",
      "sourceId": 313,
      "name": "Patient experience programme: service standards, complaints, patient rights",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "planning",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Patient experience programme",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-307",
          "type": "FS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-315",
      "sourceId": 315,
      "name": "Policy training and trial implementation",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "activation",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Training records",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-308",
          "type": "FS",
          "lag": 0,
          "sourceLag": 60.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-316",
      "sourceId": 316,
      "name": "Culture of safety and patient-experience training for all caregivers",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "activation",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Training records",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-313",
          "type": "FS",
          "lag": 0,
          "sourceLag": 85.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-317",
      "sourceId": 317,
      "name": "Internal mock appraisal against local regulator criteria before the local regulator visit",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "activation",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Mock appraisal report",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-318",
      "sourceId": 318,
      "name": "Quality dashboards live; data validated",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "activation",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Live dashboards",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-310",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-202",
          "type": "FS",
          "lag": 0,
          "sourceLag": 15.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-319",
      "sourceId": 319,
      "name": "Emergency code and disaster drills in the building",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "activation",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Drill reports",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-312",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 30.0
        }
      ],
      "modules": [
        "emergency"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-320",
      "sourceId": 320,
      "name": "Environment-of-care safety sign-off",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "activation",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Sign-off",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-160",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-321",
      "sourceId": 321,
      "name": "Patient safety readiness sign-off for opening",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "activation",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Safety readiness sign-off",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-320",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-319",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-315",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-316",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-323",
      "sourceId": 323,
      "name": "Incident review, daily safety brief and early-warning monitoring",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "stabilization",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Incident reports",
      "notes": "",
      "duration": 260.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-324",
      "sourceId": 324,
      "name": "Patient experience surveys live; service recovery process",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "stabilization",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Survey results",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 10.0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-325",
      "sourceId": 325,
      "name": "Quality metrics and improvement projects agreed for the Membership Phase",
      "workstream": "WS-12",
      "domain": "sqpe",
      "phase": "stabilization",
      "owner": "Head of Quality (SQPE)",
      "deliverable": "Agreed quality metrics",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Joint decision",
      "products": [
        "SQPE-03",
        "SQPE-04",
        "SQPE-05",
        "SQPE-07"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-328",
      "sourceId": 328,
      "name": "Top-level organisation structure for the new hospital",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Organisation chart",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-329",
      "sourceId": 329,
      "name": "Staffing plan for opening: FTE by function, internal transfer vs new hire, foreign hires",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Staffing plan",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-328",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-216",
          "type": "SS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-259",
          "type": "SS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-330",
      "sourceId": 330,
      "name": "Recruitment plan and hiring waves set by licensing lead time",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Hiring schedule",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-329",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-117",
          "type": "SS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Review",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-331",
      "sourceId": 331,
      "name": "Compensation, expatriate terms, relocation and immigration support for foreign hires",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Expatriate package",
      "notes": "",
      "duration": 25.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": true,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-332",
      "sourceId": 332,
      "name": "Recruitment launched",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Open requisitions",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-095",
          "type": "FS",
          "lag": 0,
          "sourceLag": 4.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-333",
      "sourceId": 333,
      "name": "Hospital executive management team onboarded",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner BOD and HR",
      "deliverable": "Executive team in post",
      "notes": "",
      "duration": 98.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 1.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-334",
      "sourceId": 334,
      "name": "Hospital Director appointed and on board",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner BOD",
      "deliverable": "Hospital Director in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-332",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-335",
      "sourceId": 335,
      "name": "Head of HR, Head of General Planning and recruitment specialist in post",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "HR and planning leads in post",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-332",
          "type": "FS",
          "lag": 0,
          "sourceLag": 37.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-336",
      "sourceId": 336,
      "name": "HR policies, handbook, payroll and HR systems (hospital owner group systems)",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "HR policies; systems live",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-335",
          "type": "FS",
          "lag": 0,
          "sourceLag": 2.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-337",
      "sourceId": 337,
      "name": "Caregiver housing and transport for the the new hospital site",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "planning",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Housing and transport plan",
      "notes": "",
      "duration": 50.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-329",
          "type": "FS",
          "lag": 0,
          "sourceLag": 45.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-339",
      "sourceId": 339,
      "name": "Mass recruitment - clinical (nurses, technicians, pharmacists, allied health)",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Clinical staff in post",
      "notes": "",
      "duration": 110.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-330",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-340",
      "sourceId": 340,
      "name": "Mass recruitment - non-clinical and support",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Support staff in post",
      "notes": "",
      "duration": 85.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-330",
          "type": "FS",
          "lag": 0,
          "sourceLag": 95.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-341",
      "sourceId": 341,
      "name": "Onboarding programme (orientation waves as staff arrive)",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Onboarded staff",
      "notes": "",
      "duration": 85.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-336",
          "type": "FS",
          "lag": 0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-342",
      "sourceId": 342,
      "name": "Occupational health clearances and vaccinations",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Clearances",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 70.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-343",
      "sourceId": 343,
      "name": "Uniform list and procurement",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "COO",
      "deliverable": "Uniforms issued",
      "notes": "",
      "duration": 44.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 90.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-344",
      "sourceId": 344,
      "name": "ID badges and access rights issued",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Badges issued",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-345",
      "sourceId": 345,
      "name": "Staffing finalised; working areas arranged",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Hospital Director / COO",
      "deliverable": "Assigned working areas",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        },
        {
          "id": "GF-011",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-346",
      "sourceId": 346,
      "name": "HR function ready; opening headcount in post",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "activation",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "HR readiness sign-off",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-345",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-341",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-344",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-348",
      "sourceId": 348,
      "name": "Recruitment for ramp-up phases",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "stabilization",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Ramp-up hires",
      "notes": "",
      "duration": 200.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-349",
      "sourceId": 349,
      "name": "Engagement pulse survey at six months",
      "workstream": "WS-13",
      "domain": "workforce",
      "phase": "stabilization",
      "owner": "hospital owner HR / Recruitment",
      "deliverable": "Survey results",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 125.0,
          "sourceLag": 125.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "REC-01",
        "REC-02",
        "REC-03",
        "REC-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-352",
      "sourceId": 352,
      "name": "Training needs assessment and education strategy",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Training needs assessment",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-329",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-353",
      "sourceId": 353,
      "name": "Clinical education placements: scope, eligibility, candidates and schedule agreed",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Agreed programme and candidate list",
      "notes": "Education placements depend on eligibility, available places, travel and credential lead times.",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-243",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Defined deliverable",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-354",
      "sourceId": 354,
      "name": "Leadership development programme: scope, cohort and schedule agreed",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Agreed programme and cohort",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Defined deliverable",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-355",
      "sourceId": 355,
      "name": "Comprehensive training programme plan for staff of the new hospital",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Training programme plan",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-352",
          "type": "FS",
          "lag": 0,
          "sourceLag": 15.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-356",
      "sourceId": 356,
      "name": "Training plan for all groups: clinical and non-clinical",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Training plan by group",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-355",
          "type": "SS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-357",
      "sourceId": 357,
      "name": "Competency frameworks by role; training and simulation space plan",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "planning",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Competency frameworks",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-355",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-358",
      "sourceId": 358,
      "name": "advisory team review of the training master plan",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "planning",
      "owner": "advisory team Education SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-356",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Review",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-360",
      "sourceId": 360,
      "name": "Clinical training at advisory team delivered (observerships and preceptorships)",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "advisory team Education Institute",
      "deliverable": "Completed placements",
      "notes": "",
      "duration": 100.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-353",
          "type": "FS",
          "lag": 0,
          "sourceLag": 50.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Defined deliverable",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-361",
      "sourceId": 361,
      "name": "New-hire orientation in waves",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Orientation records",
      "notes": "",
      "duration": 85.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-356",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-362",
      "sourceId": 362,
      "name": "Global leadership training programme delivered",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "advisory team Education Institute",
      "deliverable": "Completed programme",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-354",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-333",
          "type": "FS",
          "lag": 0,
          "sourceLag": 26.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Defined deliverable",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-363",
      "sourceId": 363,
      "name": "Institutional training: safety, infection control, fire, life support, patient experience",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Training records",
      "notes": "",
      "duration": 50.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-356",
          "type": "FS",
          "lag": 0,
          "sourceLag": 100.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-364",
      "sourceId": 364,
      "name": "Departmental training deployed: workflows, policies, equipment",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Training records",
      "notes": "",
      "duration": 43.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-356",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-011",
          "type": "FS",
          "lag": 0,
          "sourceLag": 22.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-365",
      "sourceId": 365,
      "name": "Equipment and systems training coordinated (vendors and HIS / EHR)",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Training records",
      "notes": "",
      "duration": 35.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-202",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-366",
      "sourceId": 366,
      "name": "Simulation-based pre-opening training",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Simulation training records",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-234",
          "type": "FS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-367",
      "sourceId": 367,
      "name": "Training completion certified against target",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "activation",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Training completion certificate",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-366",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-364",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-363",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-365",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-182",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-206",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-369",
      "sourceId": 369,
      "name": "Ongoing education calendar and competency re-validation",
      "workstream": "WS-14",
      "domain": "workforce",
      "phase": "stabilization",
      "owner": "Head of Training (clinical & non-clinical)",
      "deliverable": "Education calendar",
      "notes": "",
      "duration": 200.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 40.0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "EDU-01",
        "EDU-02",
        "EDU-03",
        "EDU-04",
        "EDU-05",
        "EDU-06"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-372",
      "sourceId": 372,
      "name": "Supply chain input to the layout: docks, stores, logistics routes",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "planning",
      "owner": "COO / Procurement",
      "deliverable": "Design input",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-142",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-373",
      "sourceId": 373,
      "name": "Supply chain model for the new hospital: hospital owner central procurement, on-site stores, logistics",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "planning",
      "owner": "COO / Procurement",
      "deliverable": "Supply chain operating model",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 40.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-374",
      "sourceId": 374,
      "name": "Inventory strategy: par levels, storage, cold chain",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "planning",
      "owner": "COO / Procurement",
      "deliverable": "Inventory strategy",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-373",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-376",
      "sourceId": 376,
      "name": "Hospital supplies and materials list finalised",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "Head of Nursing / Head Nurses",
      "deliverable": "Supplies list",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-374",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-377",
      "sourceId": 377,
      "name": "Procurement lists: linen, housekeeping and engineering supplies",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "COO",
      "deliverable": "Procurement lists",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 90.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-378",
      "sourceId": 378,
      "name": "Procurement and delivery tracking; set-up",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Procurement",
      "deliverable": "Delivered supplies",
      "notes": "",
      "duration": 34.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-377",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-376",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-379",
      "sourceId": 379,
      "name": "Warehouse, shelving and cold storage ready; temperature and humidity monitoring",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "Hospital nurses",
      "deliverable": "Ready stores",
      "notes": "",
      "duration": 24.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-380",
      "sourceId": 380,
      "name": "Inventory processes finalised: forecasting, requisition, issue, storage, stock-take, disposal",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "Hospital nurses",
      "deliverable": "Approved processes",
      "notes": "",
      "duration": 33.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-374",
          "type": "FS",
          "lag": 0,
          "sourceLag": 127.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-381",
      "sourceId": 381,
      "name": "Surgeon preference cards built with the perioperative team",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Procurement",
      "deliverable": "Preference cards",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 115.0
        }
      ],
      "modules": [
        "surgery"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-382",
      "sourceId": 382,
      "name": "Supplies quality assessment",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "Hospital nurses",
      "deliverable": "Quality check records",
      "notes": "",
      "duration": 9.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-379",
          "type": "SS",
          "lag": 0,
          "sourceLag": 15.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-383",
      "sourceId": 383,
      "name": "Opening inventory received and put away",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Procurement",
      "deliverable": "Opening inventory",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-378",
          "type": "FS",
          "lag": 0,
          "sourceLag": 1.0
        },
        {
          "id": "GF-379",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-384",
      "sourceId": 384,
      "name": "Supply chain ready",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Procurement",
      "deliverable": "Readiness sign-off",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-383",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-380",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-381",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-382",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-386",
      "sourceId": 386,
      "name": "Par-level optimisation",
      "workstream": "WS-15",
      "domain": "support",
      "phase": "stabilization",
      "owner": "COO / Procurement",
      "deliverable": "Optimised par levels",
      "notes": "",
      "duration": 130.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-389",
      "sourceId": 389,
      "name": "Support services scope and in-source / outsource matrix: cleaning, food, linen, security, transport, waste",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "planning",
      "owner": "COO / Service Management",
      "deliverable": "Outsourcing matrix",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-390",
      "sourceId": 390,
      "name": "Support services operating models and outsourced contracts",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "planning",
      "owner": "COO / Service Management",
      "deliverable": "Operating models; contracts",
      "notes": "",
      "duration": 35.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-389",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-391",
      "sourceId": 391,
      "name": "Facilities management strategy, maintenance system and engineering team",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "planning",
      "owner": "COO / Service Management",
      "deliverable": "Facilities strategy",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-389",
          "type": "FS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-392",
      "sourceId": 392,
      "name": "Medical and hazardous waste management plan",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "planning",
      "owner": "COO / Service Management",
      "deliverable": "Waste plan",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-390",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-394",
      "sourceId": 394,
      "name": "Facilities team trained on building systems",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Trained engineers",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-151",
          "type": "SS",
          "lag": 0,
          "sourceLag": 15.0
        },
        {
          "id": "GF-391",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-395",
      "sourceId": 395,
      "name": "Service contractors mobilised",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Mobilised contractors",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-390",
          "type": "FS",
          "lag": 0,
          "sourceLag": 105.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-396",
      "sourceId": 396,
      "name": "Utilities and life-safety systems operations handover",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Operations handover",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-397",
      "sourceId": 397,
      "name": "Security go-live: access control and monitoring",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Security live",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-398",
      "sourceId": 398,
      "name": "Food service commissioning and menu testing",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Food service ready",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-395",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-399",
      "sourceId": 399,
      "name": "Environmental services start-up and terminal cleaning",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Cleaning sign-off",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-395",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-400",
      "sourceId": 400,
      "name": "Waste streams operational",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Waste streams live",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-123",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-395",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-401",
      "sourceId": 401,
      "name": "Overall review of the set-up of all functional departments, medication and consumables stores",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "All functional departments",
      "deliverable": "Set-up review",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-402",
      "sourceId": 402,
      "name": "Acceptance assessment of set-up against the hospital owner system checklist, with asset handover records",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "Hospital Director / COO",
      "deliverable": "Acceptance records",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-403",
      "sourceId": 403,
      "name": "Support services mock operations complete",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "activation",
      "owner": "COO / Service Management",
      "deliverable": "Mock operations sign-off",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-399",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        },
        {
          "id": "GF-398",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-400",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-397",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-405",
      "sourceId": 405,
      "name": "Service-level and KPI monitoring of support services",
      "workstream": "WS-16",
      "domain": "support",
      "phase": "stabilization",
      "owner": "COO / Service Management",
      "deliverable": "SLA reports",
      "notes": "",
      "duration": 125.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 10.0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-408",
      "sourceId": 408,
      "name": "Membership or partnership brand usage and approvals process agreed, where applicable",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "planning",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Brand guidance issued",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-006",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Defined deliverable",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-409",
      "sourceId": 409,
      "name": "Opening announcement and communications approved",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "planning",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Approved announcement",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-047",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-408",
          "type": "FS",
          "lag": 0,
          "sourceLag": 10.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Defined deliverable",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-410",
      "sourceId": 410,
      "name": "Patient access model: contact centre, scheduling, international patient services",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "planning",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Patient access model",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-007",
          "type": "FS",
          "lag": 0,
          "sourceLag": 75.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-411",
      "sourceId": 411,
      "name": "Communications and marketing programme for the opening developed and approved",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "planning",
      "owner": "Marketing Center",
      "deliverable": "Approved opening campaign",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-082",
          "type": "FS",
          "lag": 0,
          "sourceLag": 60.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-413",
      "sourceId": 413,
      "name": "Market teasing: introduce doctors and hospital strengths",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Published content",
      "notes": "",
      "duration": 110.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-244",
          "type": "FS",
          "lag": 0,
          "sourceLag": 1.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-414",
      "sourceId": 414,
      "name": "Channel updates: specialists, doctors and techniques across offline and online channels",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Updated channels",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-411",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-415",
      "sourceId": 415,
      "name": "Pre-opening awareness campaign",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Campaign live",
      "notes": "",
      "duration": 80.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-411",
          "type": "FS",
          "lag": 0,
          "sourceLag": 55.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-416",
      "sourceId": 416,
      "name": "Training on brand identity guidelines",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Training records",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 135.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-417",
      "sourceId": 417,
      "name": "Crisis communications plan",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Crisis plan",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 140.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-418",
      "sourceId": 418,
      "name": "Detailed agenda for the hospital opening event",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Opening agenda",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 160.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-419",
      "sourceId": 419,
      "name": "Contact centre live; appointment booking opens",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Bookings open",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-410",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-210",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-420",
      "sourceId": 420,
      "name": "Marketing and patient access ready",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "activation",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Readiness sign-off",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-419",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-418",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-417",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-414",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-422",
      "sourceId": 422,
      "name": "Opening ceremony",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "stabilization",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Ceremony",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-423",
      "sourceId": 423,
      "name": "Year-1 growth marketing",
      "workstream": "WS-17",
      "domain": "strategy",
      "phase": "stabilization",
      "owner": "Group Business Development / Marketing Center",
      "deliverable": "Growth plan",
      "notes": "",
      "duration": 220.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 20.0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "IT-07",
        "FIN-01"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-426",
      "sourceId": 426,
      "name": "Activation strategy: opening capacity, services and phased ramp-up",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "Activation Lead / COO",
      "deliverable": "Activation strategy",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-006",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-427",
      "sourceId": 427,
      "name": "Activation team appointed: lead plus a readiness champion in every department",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "Activation Lead / COO",
      "deliverable": "Activation team",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-050",
          "type": "FS",
          "lag": 0,
          "sourceLag": 5.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-428",
      "sourceId": 428,
      "name": "Operational readiness framework and department checklists (extend the hospital owner system checklist)",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "Activation Lead / COO",
      "deliverable": "Readiness framework",
      "notes": "",
      "duration": 25.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-426",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-427",
          "type": "FS",
          "lag": 0,
          "sourceLag": 25.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-429",
      "sourceId": 429,
      "name": "advisory team review of activation strategy and readiness framework",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "planning",
      "owner": "advisory team Relationship Manager and SMEs",
      "deliverable": "Written review comments",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-426",
          "type": "FS",
          "lag": 0,
          "sourceLag": 60.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Review",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-431",
      "sourceId": 431,
      "name": "Activation master plan and countdown schedule",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Activation master plan",
      "notes": "",
      "duration": 15.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-009",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-432",
      "sourceId": 432,
      "name": "Readiness dashboard and weekly readiness reviews",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Weekly readiness dashboard",
      "notes": "",
      "duration": 175.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-431",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-433",
      "sourceId": 433,
      "name": "Occupancy and move-in sequence plan (staged access by department)",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Move-in plan",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-431",
          "type": "FS",
          "lag": 0,
          "sourceLag": 35.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-434",
      "sourceId": 434,
      "name": "Building orientation and wayfinding for all caregivers",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Orientation records",
      "notes": "",
      "duration": 20.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-435",
      "sourceId": 435,
      "name": "Fit-up: furniture, equipment placement and stocking of every department",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Fitted-up departments",
      "notes": "",
      "duration": 30.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-012",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-433",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "workload",
      "advisory": "Owner-led",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-436",
      "sourceId": 436,
      "name": "Department readiness sign-offs: people, process, technology, facility, supplies",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Department sign-offs",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-435",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-234",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-272",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-401",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-402",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-437",
      "sourceId": 437,
      "name": "Day-in-the-Life simulation 1: department scenarios",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Simulation 1 report",
      "notes": "Retain two simulation cycles, issue resolution and retesting, followed by a live-systems dress rehearsal.",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-436",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-210",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-184",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-235",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-438",
      "sourceId": 438,
      "name": "Issue resolution and retest",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Closed issues log",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-437",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-439",
      "sourceId": 439,
      "name": "Day-in-the-Life simulation 2: integrated, hospital-wide, including emergency codes",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Simulation 2 report",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-438",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-319",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [
        "emergency"
      ],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-440",
      "sourceId": 440,
      "name": "Advisory readiness observation during integrated simulation, if agreed",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "advisory team Relationship Manager and SMEs",
      "deliverable": "Observation report",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-438",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-441",
      "sourceId": 441,
      "name": "Mock operations: full dress rehearsal with live systems",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Dress rehearsal report",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-439",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-109",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-403",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-442",
      "sourceId": 442,
      "name": "Readiness assessment against the Go / No-Go criteria",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Readiness assessment",
      "notes": "",
      "duration": 5.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-441",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-014",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-236",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-274",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-299",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-321",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-346",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-367",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-384",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-420",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-069",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-440",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-443",
      "sourceId": 443,
      "name": "Command centre established",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "activation",
      "owner": "Activation Lead / COO",
      "deliverable": "Staffed command centre",
      "notes": "",
      "duration": 10.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-441",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-445",
      "sourceId": 445,
      "name": "Command centre and hypercare (daily issue triage)",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "Activation Lead / COO",
      "deliverable": "Issue log",
      "notes": "",
      "duration": 60.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-446",
      "sourceId": 446,
      "name": "30 / 60 / 90-day post-opening reviews",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "Activation Lead / COO",
      "deliverable": "Review reports",
      "notes": "",
      "duration": 65.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 0.0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-447",
      "sourceId": 447,
      "name": "Capacity gates: staged release of additional beds and services",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "Activation Lead / COO",
      "deliverable": "Capacity gate decisions",
      "notes": "",
      "duration": 200.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-445",
          "type": "SS",
          "lag": 0,
          "sourceLag": 20.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-448",
      "sourceId": 448,
      "name": "Post-opening evaluation and benefits review",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "Activation Lead / COO",
      "deliverable": "Evaluation report",
      "notes": "",
      "duration": 40.0,
      "milestone": false,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-016",
          "type": "FS",
          "lag": 130.0,
          "sourceLag": 130.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    },
    {
      "id": "GF-449",
      "sourceId": 449,
      "name": "Steady-state operations confirmed",
      "workstream": "WS-18",
      "domain": "governance",
      "phase": "stabilization",
      "owner": "Activation Lead / COO",
      "deliverable": "Steady-state declaration",
      "notes": "",
      "duration": 0.0,
      "milestone": true,
      "gate": false,
      "dependencies": [
        {
          "id": "GF-447",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-073",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-113",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        },
        {
          "id": "GF-213",
          "type": "FS",
          "lag": 0,
          "sourceLag": 0.0
        }
      ],
      "modules": [],
      "internationalOnly": false,
      "scale": "fixed",
      "advisory": "Advise",
      "products": [
        "SL-06",
        "IT-06",
        "EDU-05",
        "SQPE-03"
      ],
      "durationStatus": "Reference estimate; specialist confirmation required"
    }
  ],
  "assumptions": [
    "Weekdays are working days; entered holiday dates are excluded.",
    "Pre-opening date-padding lags were removed; task relationships and post-opening review offsets were retained.",
    "Reference activity durations are provisional and are not validated universal benchmarks.",
    "Workload activities scale with opening beds, selected services and parallel teams; fixed lead times do not.",
    "Country-specific licence sequences require local specialist review.",
    "The model does not resource-level teams or guarantee an opening date."
  ]
}; })(typeof window !== "undefined" ? window : globalThis);
