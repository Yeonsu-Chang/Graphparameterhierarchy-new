(function (root) {
  "use strict";

  // Display-only notation: canonical class names, IDs and URL values stay unchanged.
  const subscripts = {
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
    "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
    a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ",
    m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ",
    u: "ᵤ", v: "ᵥ", x: "ₓ", "+": "₊", "-": "₋", "=": "₌",
    ",": ",", " ": " "
  };
  const symbols = { cap: "∩", cup: "∪", Delta: "Δ", alpha: "α", chi: "χ", infty: "∞", rightarrow: "→", to: "→" };

  function normalizeSymbols(value) {
    return String(value ?? "")
      .replace(/\\(rightarrow|infty|Delta|alpha|chi|cap|cup|to)\b/g, (_, name) => symbols[name])
      .replace(/<->|<=>/g, "↔")
      .replace(/<-{1,2}/g, "←")
      .replace(/-{1,2}>/g, "→");
  }

  function tokens(value) {
    const text = normalizeSymbols(value);
    // Recognize graph symbols, rather than digits in names such as CMSO2 or source IDs.
    // A numeric coefficient (2P3) is deliberately outside the subscript.
    const pattern = /(^|[^A-Za-z\\])([PCKSHGWQ])(?:_\{([A-Za-z0-9,+\-=\s]+)\}|_([0-9]+(?:\s*,\s*[0-9]+)*|[a-z](?:\s*,\s*[a-z])*)|([0-9]+(?:\s*,\s*[0-9]+)*|[tnmksrh](?:\s*,\s*[tnmksrh])*)|\(([0-9t]+(?:\s*,\s*[0-9t]+){2})\))(?![A-Za-z0-9])/g;
    const result = [];
    let cursor = 0;
    for (const match of text.matchAll(pattern)) {
      if (match[6] && match[2] !== "S") continue;
      const start = match.index + match[1].length;
      if (start > cursor) result.push({ text: text.slice(cursor, start) });
      result.push({ base: match[2], subscript: (match[3] || match[4] || match[5] || match[6]).replace(/\s*,\s*/g, ",").trim() });
      cursor = match.index + match[0].length;
    }
    if (cursor < text.length) result.push({ text: text.slice(cursor) });
    return result;
  }

  function toPlain(value) {
    return tokens(value).map((token) => {
      if (token.text !== undefined) return token.text;
      const chars = [...token.subscript];
      return token.base + (chars.every((char) => subscripts[char] !== undefined)
        ? chars.map((char) => subscripts[char]).join("")
        : `_{${token.subscript}}`);
    }).join("");
  }

  function toFragment(value, ownerDocument = root.document) {
    const fragment = ownerDocument.createDocumentFragment();
    for (const token of tokens(value)) {
      if (token.text !== undefined) {
        fragment.appendChild(ownerDocument.createTextNode(token.text));
      } else {
        fragment.appendChild(ownerDocument.createTextNode(token.base));
        const subscript = ownerDocument.createElement("sub");
        subscript.className = "graph-subscript";
        subscript.textContent = token.subscript;
        fragment.appendChild(subscript);
      }
    }
    return fragment;
  }

  function setText(element, value) {
    element.replaceChildren(toFragment(value, element.ownerDocument));
  }

  function searchText(value) {
    return toPlain(value).normalize("NFKD").toLowerCase().replace(/⋂/g, "∩").replace(/[_\s{}]/g, "");
  }

  root.GRAPH_NOTATION = Object.freeze({ toPlain, toFragment, setText, searchText });
})(typeof window === "undefined" ? globalThis : window);
