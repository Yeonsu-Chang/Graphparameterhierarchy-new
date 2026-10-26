(function () {
  "use strict";

  const data = window.GRAPH_CLASS_COMPLEXITY;
  const problemBody = document.getElementById("complexity-problems");
  const logicBody = document.getElementById("complexity-logic");
  if (!data || !problemBody || !logicBody) return;
  const formTabs = [...document.querySelectorAll(".complexity-form-tab")];
  const problemPanel = document.getElementById("complexity-problem-panel");
  let problemForm = "optimization";
  let selectedLabel;

  function tone(status) {
    if (status === "P" || status === "FPT") return "tractable";
    if (status === "XP" || status === "Quasipolynomial") return "moderate";
    if (status.includes("hard") || status.includes("complete")) return "hard";
    return "unconfirmed";
  }

  function renderRows(container, rows) {
    const fragment = document.createDocumentFragment();
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.dataset.problem = row.id;
      if (row.form) tr.dataset.form = row.form;
      const name = document.createElement("th");
      name.scope = "row";
      name.textContent = row.title;
      if (row.definition) name.title = row.definition;
      if (row.threshold) {
        const threshold = document.createElement("span");
        threshold.className = "complexity-threshold";
        threshold.textContent = row.threshold;
        name.appendChild(threshold);
      }
      const resultCell = document.createElement("td");
      const resultList = document.createElement("div");
      resultList.className = "complexity-findings";
      const paperCell = document.createElement("td");
      paperCell.className = "complexity-papers";

      if (!row.findings.length) {
        const empty = document.createElement("span");
        empty.className = "complexity-unrecorded";
        empty.textContent = "Unchecked";
        empty.title = "The literature for this entry has not yet been verified for this site. This does not mean the problem is open.";
        resultList.appendChild(empty);
      }

      const sourceIds = new Set();
      const sourceLocations = new Map();
      row.findings.forEach((finding) => {
        const conjecture = finding.certainty === "conjecture" || /^Conjectured\b/i.test(finding.status);
        const item = document.createElement("div");
        item.className = conjecture ? "complexity-finding is-conjecture" : "complexity-finding";
        if (conjecture) {
          const label = document.createElement("strong");
          label.className = "complexity-conjecture-label";
          label.textContent = "CONJECTURE";
          item.appendChild(label);
        }
        const badge = document.createElement("span");
        if (row.form) badge.dataset.form = finding.form;
        badge.className = `complexity-status ${conjecture ? "conjecture" : tone(finding.status)}`;
        const status = conjecture ? finding.status.replace(/^Conjectured\s+/i, "") : finding.status;
        badge.textContent = finding.parameter ? `${status}(${finding.parameter})` : status;
        if (conjecture) badge.setAttribute("aria-label", `Conjecture, not proved: ${badge.textContent}`);
        badge.title = [
          finding.parameterName ? `Parameter: ${finding.parameterName}` : "",
          finding.origin ? `Applies via: ${finding.origin}` : "",
          finding.locator || "",
          finding.explanation || "",
          finding.inference || "",
          finding.condition || ""
        ].filter(Boolean).join(". ");
        const resultLine = document.createElement("div");
        resultLine.className = "complexity-result-line";
        resultLine.appendChild(badge);
        if (finding.origin === "All graphs" && selectedLabel.trim().toLowerCase() !== "all graphs") {
          const scope = document.createElement("span");
          scope.className = "complexity-general-scope";
          scope.textContent = "All graphs";
          scope.title = "This result holds on general graphs, with the displayed parameter; it does not use a restriction to this graph class.";
          resultLine.appendChild(scope);
        }
        item.appendChild(resultLine);
        if (conjecture) {
          const note = document.createElement("span");
          note.className = "complexity-conjecture-note";
          note.textContent = "Not proved";
          item.appendChild(note);
        }
        if (finding.condition) {
          const note = document.createElement("span");
          note.className = "complexity-condition";
          note.textContent = finding.condition;
          item.appendChild(note);
        }
        resultList.appendChild(item);
        finding.sourceIds.forEach((id) => {
          sourceIds.add(id);
          if (finding.locator) {
            if (!sourceLocations.has(id)) sourceLocations.set(id, new Set());
            sourceLocations.get(id).add(finding.locator);
          }
        });
      });

      Array.from(sourceIds).forEach((id) => {
        const source = data.sources[id];
        if (!source) return;
        const link = document.createElement("a");
        link.href = source[3];
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = String(source[1]);
        link.title = [`${source[0]} (${source[1]}). ${source[2]}`, ...(sourceLocations.get(id) || [])].join(". ");
        link.setAttribute("aria-label", `${row.title}: ${link.title}`);
        paperCell.appendChild(link);
      });

      if (!sourceIds.size) {
        const empty = document.createElement("span");
        empty.className = "complexity-unrecorded";
        empty.textContent = "\u2014";
        empty.title = row.findings.length ? "Elementary consequence; no separate paper attached." : "No paper recorded.";
        paperCell.appendChild(empty);
      }
      resultCell.appendChild(resultList);
      tr.append(name, resultCell, paperCell);
      fragment.appendChild(tr);
    });
    container.replaceChildren(fragment);
  }

  window.renderClassComplexity = function (label) {
    selectedLabel = label;
    const results = data.getResults(label);
    const problemRows = data.getProblemRows(results, problemForm);
    formTabs.forEach((tab) => {
      const active = tab.dataset.form === problemForm;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) problemPanel?.setAttribute("aria-labelledby", tab.id);
    });
    const legend = document.getElementById("complexity-parameters");
    if (legend) {
      const entries = data.getParameterLegend({ problems: problemRows, logic: results.logic }).map(({ symbol, description, detail }) => {
        const entry = document.createElement("div");
        const term = document.createElement("dt");
        term.textContent = symbol;
        const definition = document.createElement("dd");
        definition.textContent = description;
        definition.title = detail;
        entry.append(term, definition);
        return entry;
      });
      legend.replaceChildren(...entries);
      legend.hidden = entries.length === 0;
    }
    renderRows(problemBody, problemRows);
    renderRows(logicBody, results.logic);
    document.getElementById("complexity-class-label").textContent = label.replace(/\\cap/g, "\u2229");
    document.getElementById("complexity").setAttribute("aria-label", `Complexity on ${label}`);
  };

  formTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      problemForm = tab.dataset.form;
      if (selectedLabel) window.renderClassComplexity(selectedLabel);
    });
    tab.addEventListener("keydown", (event) => {
      const next = { ArrowRight: (index + 1) % formTabs.length, ArrowLeft: (index + formTabs.length - 1) % formTabs.length, Home: 0, End: formTabs.length - 1 }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      formTabs[next].focus();
      formTabs[next].click();
    });
  });
})();
