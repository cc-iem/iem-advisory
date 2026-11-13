/* MS Project interchange output, also testable outside the browser. */
(function (root) {
  "use strict";
  function esc(s) {
    return String(s ?? "").replace(
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
  function xml(template, project, result, domains) {
    const byId = new Map(result.tasks.map((t) => [t.id, t])),
      ids = new Map(result.order.map((id, i) => [id, i + 1]));
    let row = 0;
    const weekdays = [1, 2, 3, 4, 5, 6, 7]
      .map(
        (d) =>
          "<WeekDay><DayType>" +
          d +
          "</DayType><DayWorking>" +
          ([1, 7].includes(d) ? 0 : 1) +
          "</DayWorking>" +
          ([1, 7].includes(d)
            ? ""
            : "<WorkingTimes><WorkingTime><FromTime>08:00:00</FromTime><ToTime>12:00:00</ToTime></WorkingTime><WorkingTime><FromTime>13:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime></WorkingTimes>") +
          "</WeekDay>",
      )
      .join("");
    const holidays = (project.holidays || []).length
      ? "<Exceptions>" +
        project.holidays
          .map(
            (d) =>
              "<Exception><TimePeriod><FromDate>" +
              d +
              "T00:00:00</FromDate><ToDate>" +
              d +
              "T23:59:59</ToDate></TimePeriod><Name>Project holiday</Name><DayWorking>0</DayWorking></Exception>",
          )
          .join("") +
        "</Exceptions>"
      : "";
    const taskXML = template.workstreams
      .map((w) => {
        const ts = result.order
          .map((id) => byId.get(id))
          .filter((t) => t.workstream === w.id);
        if (!ts.length) return "";
        const start = ts.map((t) => t.startDate).sort()[0],
          finish = ts
            .map((t) => t.finishDate)
            .sort()
            .at(-1);
        let group =
          "<Task><UID>" +
          (10000 + w.number) +
          "</UID><ID>" +
          ++row +
          "</ID><Name>" +
          esc((w.code ? w.code + " · " : "") + w.name) +
          "</Name><OutlineLevel>1</OutlineLevel><Summary>1</Summary><Start>" +
          start +
          "T08:00:00</Start><Finish>" +
          finish +
          "T17:00:00</Finish></Task>";
        group += ts
          .map((t) => {
            const constraint =
              t.id === "GF-016"
                ? project.targetDate
                : t.state.notBefore ||
                  (t.id === "GF-012" ? project.handoverDate : "");
            return (
              "<Task><UID>" +
              ids.get(t.id) +
              "</UID><ID>" +
              ++row +
              "</ID><Name>" +
              esc((t.code ? t.code + " · " : "") + t.name) +
              "</Name><OutlineLevel>2</OutlineLevel><Summary>0</Summary><Start>" +
              t.startDate +
              "T08:00:00</Start><Finish>" +
              t.finishDate +
              (t.milestone ? "T08:00:00" : "T17:00:00") +
              "</Finish><Duration>PT" +
              t.duration * 8 +
              "H0M0S</Duration><DurationFormat>7</DurationFormat><Milestone>" +
              (t.milestone ? 1 : 0) +
              "</Milestone><Notes>" +
              esc(
                t.id +
                  " | " +
                  domains.find((d) => d.id === t.domain).name +
                  " | " +
                  t.deliverable +
                  " | " +
                  (t.state.owner || t.owner) +
                  " | " +
                  template.source.reviewStatus,
              ) +
              "</Notes><ConstraintType>" +
              (constraint ? 4 : 0) +
              "</ConstraintType>" +
              (constraint
                ? "<ConstraintDate>" + constraint + "T08:00:00</ConstraintDate>"
                : "") +
              t.dependencies
                .map(
                  (d) =>
                    "<PredecessorLink><PredecessorUID>" +
                    ids.get(d.id) +
                    "</PredecessorUID><Type>" +
                    (d.type === "SS" ? 3 : 1) +
                    "</Type><LinkLag>" +
                    d.lag * 4800 +
                    "</LinkLag><LagFormat>7</LagFormat></PredecessorLink>",
                )
                .join("") +
              (t.verified
                ? "<ActualFinish>" +
                  t.state.actualFinish +
                  "T17:00:00</ActualFinish><PercentComplete>100</PercentComplete>"
                : "") +
              "</Task>"
            );
          })
          .join("");
        return group;
      })
      .join("");
    return (
      '<?xml version="1.0" encoding="UTF-8"?><Project xmlns="http://schemas.microsoft.com/project"><Name>' +
      esc(project.name) +
      "</Name><Title>" +
      esc(project.name) +
      "</Title><ScheduleFromStart>1</ScheduleFromStart><StartDate>" +
      project.startDate +
      "T08:00:00</StartDate><MinutesPerDay>480</MinutesPerDay><MinutesPerWeek>2400</MinutesPerWeek><DaysPerMonth>20</DaysPerMonth><CalendarUID>1</CalendarUID><Calendars><Calendar><UID>1</UID><Name>Project working calendar</Name><IsBaseCalendar>1</IsBaseCalendar><BaseCalendarUID>-1</BaseCalendarUID><WeekDays>" +
      weekdays +
      "</WeekDays>" +
      holidays +
      "</Calendar></Calendars><Tasks>" +
      taskXML +
      "</Tasks></Project>"
    );
  }
  root.HospitalExport = { xml: xml };
  if (typeof module !== "undefined") module.exports = root.HospitalExport;
})(typeof window !== "undefined" ? window : globalThis);
