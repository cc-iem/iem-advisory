/* Pre-built advisory packages shown after the domain sections in the catalog.
   Two offerings from each of the six areas, phased to the opening date.
   Each package lists existing offerings by phase; the full text is in brochures/package-content.json
   and the PDF is generated from it with scripts/render_brochures.js. */
window.CC_PACKAGES = [
  {
    id: "PKG-NEW",
    title: "All-in-One New Hospital Package",
    fit: ["new"],
    tagline: "Twelve Cleveland Clinic offerings across all six advisory areas, sequenced as one advisory program from design to opening day.",
    note: "One engagement lead coordinates all six areas. Offerings can be added or swapped at scoping.",
    pdf: "brochures/0_Packages/All-in-One_New_Hospital_Package_Profile.pdf",
    phases: [
      { name: "Plan", when: "Design and pre-construction", ids: ["SL-02", "FIN-05", "IT-01", "SQPE-03"] },
      { name: "Prepare", when: "During construction", ids: ["REC-01", "SL-04", "FIN-04", "SQPE-04"] },
      { name: "Activate", when: "The run-up to opening", ids: ["REC-05", "EDU-04", "IT-06", "EDU-05"] }
    ]
  }
];
