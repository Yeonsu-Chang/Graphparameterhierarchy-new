(function () {
  "use strict";
  const model = window.GRAPH_CLASS_CHI_BINDING;
  const section = document.getElementById("chi-binding");
  if (!model || !section) return;
  const content = document.getElementById("chi-binding-content");
  const status = document.getElementById("chi-binding-status");
  const names = { constant: "Constant", linear: "Linear", polynomial: "Polynomial", quasipolynomial: "Quasipolynomial", exponential: "Exponential", factorial: "Factorial", "double-exponential": "Double exponential", unspecified: "χ-bounded" };

  // Render the small, curated formula notation as DOM text and superscripts/subscripts.
  // No formula or bibliography string is interpreted as HTML.
  function mathText(text) {
    text = String(text).replace(/log2/g, "log₂").replace(/\*/g, "·").replace(/>=/g, "≥").replace(/<=/g, "≤");
    const fragment = document.createDocumentFragment();
    let plain = "";
    // Parse formula scripts first; format graph names only in literal text runs.
    const flush = () => { if (plain) fragment.appendChild(window.GRAPH_NOTATION?.toFragment(plain) || document.createTextNode(plain)); plain = ""; };
    for (let i = 0; i < text.length; i++) {
      if (!["^", "_"].includes(text[i])) { plain += text[i]; continue; }
      const marker = text[i], start = i + 1;
      let end = start, inner;
      if (["{", "("].includes(text[start])) {
        const opening = text[start], closing = opening === "{" ? "}" : ")";
        let depth = 1;
        for (end = start + 1; end < text.length && depth; end++) {
          if (text[end] === opening) depth++;
          if (text[end] === closing) depth--;
        }
        if (depth) { plain += marker; continue; }
        inner = text.slice(start + 1, end - 1);
      } else {
        const token = text.slice(start).match(/^(?:[0-9]+|[a-zA-Zω])/);
        if (!token) { plain += marker; continue; }
        inner = token[0];
        end = start + inner.length;
      }
      flush();
      const script = document.createElement(marker === "^" ? "sup" : "sub");
      script.appendChild(mathText(inner));
      fragment.appendChild(script);
      i = end - 1;
    }
    flush();
    return fragment;
  }

  function bibliography(finding) {
    const entries = model.citations(finding);
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = entries.length ? `Sources (${entries.length})` : "Argument";
    details.appendChild(summary);
    if (!entries.length) {
      const note = document.createElement("p");
      note.appendChild(mathText(`${finding.locator}. ${finding.note}`));
      details.appendChild(note);
      return details;
    }
    const list = document.createElement("ul");
    list.className = "relation-proof-steps";
    for (const { reference, locators } of entries) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = reference[3];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(window.GRAPH_NOTATION?.toFragment(`${reference[0]} (${reference[1]}). ${reference[2]}`) || document.createTextNode(`${reference[0]} (${reference[1]}). ${reference[2]}`));
      item.appendChild(link);
      const location = document.createElement("p");
      location.className = "relation-proof-locator";
      location.appendChild(mathText(locators.join("; ")));
      item.appendChild(location);
      list.appendChild(item);
    }
    details.appendChild(list);
    return details;
  }

  function row(finding) {
    const item = document.createElement("li");
    item.className = `chi-bound ${finding.kind}`;
    const heading = document.createElement("div");
    heading.className = "chi-bound-heading";
    const badge = document.createElement("span");
    badge.className = "chi-bound-growth";
    badge.textContent = finding.kind === "negative" ? "Not χ-bounded" : finding.kind === "open" ? "Open" : finding.kind === "unchecked" ? "Unchecked" : finding.conditional ? "Additional hypothesis" : `${names[finding.growth]}${finding.kind === "existential" ? " · existence" : ""}`;
    heading.appendChild(badge);
    const formula = document.createElement("span");
    formula.className = "chi-bound-formula";
    const formulaText = finding.formula || (finding.kind === "unchecked" ? "No class-specific χ-bound verified" : "");
    formula.appendChild(mathText(["negative", "open", "unchecked"].includes(finding.kind) ? formulaText : `f(ω) = ${formulaText}`));
    heading.appendChild(formula);
    item.appendChild(heading);
    if (finding.condition) {
      const condition = document.createElement("p");
      condition.appendChild(mathText(finding.condition));
      item.appendChild(condition);
    }
    if (finding.inherited) {
      const origin = document.createElement("p");
      origin.className = "chi-bound-origin";
      origin.appendChild(document.createTextNode(finding.kind === "negative" ? "Contains counterexamples from " : "Applies via "));
      const link = document.createElement("a");
      const url = new URL(window.location.href);
      url.searchParams.set("class", finding.origin);
      url.hash = "chi-binding";
      link.href = url.href;
      link.appendChild(window.GRAPH_NOTATION?.toFragment(finding.origin) || document.createTextNode(finding.origin.replace(/\\cap/g, "∩").replace(/\\chi/g, "χ")));
      origin.appendChild(link);
      item.appendChild(origin);
    }
    if (finding.note) {
      const note = document.createElement("p");
      note.className = "chi-bound-note";
      note.appendChild(mathText(finding.note));
      item.appendChild(note);
    }
    item.appendChild(bibliography(finding));
    return item;
  }

  window.renderClassChiBinding = function (label) {
    const result = model.getResults(label);
    content.replaceChildren();
    status.textContent = { bounded: "Verified upper bounds", "not-bounded": "Not χ-bounded", open: "Open", unchecked: "Unchecked", conflict: "Review required" }[result.status];
    status.className = `chi-binding-status ${result.status}`;
    const findings = result.status === "bounded" ? result.positive : result.status === "not-bounded" ? result.negative : result.open.length ? result.open : (result.unverified || []);
    if (!findings.length) {
      const empty = document.createElement("p");
      empty.className = "chi-binding-empty";
      empty.textContent = "No class-specific χ-binding function has been verified in this catalog.";
      content.appendChild(empty);
      // A conditional slice does not establish χ-boundedness of the whole class.
    }
    const list = document.createElement("ul");
    list.className = "chi-bound-list";
    // Keep the strongest growth rate and directly stated alternatives visible.
    const featured = [];
    const add = (finding) => { if (finding && !featured.includes(finding) && featured.length < 3) featured.push(finding); };
    add(findings[0]);
    add(findings.find((finding) => !finding.inherited && finding.kind === "explicit"));
    const direct = findings.filter((finding) => !finding.inherited);
    (direct.length ? direct : findings).forEach(add);
    featured.forEach((finding) => list.appendChild(row(finding)));
    content.appendChild(list);
    if (findings.length > featured.length) {
      const more = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = `${result.status === "unchecked" ? "More entries" : "More verified bounds"} (${findings.length - featured.length})`;
      more.appendChild(summary);
      const rest = document.createElement("ul");
      rest.className = "chi-bound-list";
      findings.filter((finding) => !featured.includes(finding)).forEach((finding) => rest.appendChild(row(finding)));
      more.appendChild(rest);
      content.appendChild(more);
    }
    if (result.open.length && result.status === "bounded") {
      const questions = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "Open strengthening";
      questions.appendChild(summary);
      const list = document.createElement("ul");
      list.className = "chi-bound-list";
      result.open.forEach((finding) => list.appendChild(row(finding)));
      questions.appendChild(list);
      content.appendChild(questions);
    }
    if (result.conditional.length) {
      const restricted = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = `With additional hypotheses (${result.conditional.length})`;
      restricted.appendChild(summary);
      const list = document.createElement("ul");
      list.className = "chi-bound-list";
      result.conditional.forEach((finding) => list.appendChild(row(finding)));
      restricted.appendChild(list);
      content.appendChild(restricted);
    }
  };
})();
