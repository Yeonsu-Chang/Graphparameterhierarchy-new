const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "graph-notation.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const notation = context.window.GRAPH_NOTATION;

test("graph indices have the same readable notation on canvas and in plain controls", () => {
  for (const [input, expected] of [
    ["P6-free", "P₆-free"],
    ["2P4-free", "2P₄-free"],
    ["(P6, K3,3)-free", "(P₆, K₃,₃)-free"],
    ["(Pt, Ks,s)-free (fixed t, s)", "(Pₜ, Kₛ,ₛ)-free (fixed t, s)"],
    ["P_6, P_{t+1}, K_{s,s}", "P₆, Pₜ₊₁, Kₛ,ₛ"],
    ["C_{2k}, H_h, Q3, W_n", "C₂ₖ, Hₕ, Q₃, Wₙ"],
    ["S(2,2,2)-free; S(t,t,t)-free", "S₂,₂,₂-free; Sₜ,ₜ,ₜ-free"],
    ["P6 \\cap K3-free", "P₆ ∩ K₃-free"]
  ]) {
    assert.equal(notation.toPlain(input), expected, input);
    assert.equal(notation.toPlain(expected), expected, "formatting is idempotent");
  }
});

test("graph notation leaves mathematical functions, formula scripts and ordinary words alone", () => {
  const text = "CMSO2, S(ω), P(ω), ω^{d}, log2(ω), 2026, Penev, Koutsoutis";
  assert.equal(notation.toPlain(text), text);
  assert.equal(notation.toPlain("P_{q}"), "P_{q}", "unsupported Unicode letter retains an explicit index");
});

test("search accepts ASCII, explicit scripts and displayed Unicode indices", () => {
  for (const names of [["P6-free", "P_6-free", "P_{6}-free", "P₆-free"], ["S(2,2,2)-free", "S₂,₂,₂-free"], ["Pt-free", "P_t-free", "Pₜ-free"]]) {
    assert.equal(new Set(names.map(notation.searchText)).size, 1);
  }
});

function documentStub() {
  class Node {
    constructor(tag, value = "") { this.tagName = tag; this.value = value; this.children = []; this.ownerDocument = document; }
    appendChild(node) { this.children.push(...(node.tagName === "fragment" ? node.children : [node])); return node; }
    replaceChildren(...nodes) { this.value = ""; this.children = []; nodes.forEach((node) => this.appendChild(node)); }
    get textContent() { return this.value + this.children.map((node) => node.textContent).join(""); }
    set textContent(value) { this.value = String(value); this.children = []; }
  }
  const elements = new Map();
  const document = {
    createElement: (tag) => new Node(tag),
    createTextNode: (text) => new Node("text", text),
    createDocumentFragment: () => new Node("fragment"),
    getElementById: (id) => { if (!elements.has(id)) elements.set(id, new Node("section")); return elements.get(id); }
  };
  return document;
}

test("DOM labels use real subscripts and never parse supplied text as HTML", () => {
  const document = documentStub();
  const fragment = notation.toFragment("2P4 and K3,3 <img src=x>", document);
  assert.equal(fragment.textContent, "2P4 and K3,3 <img src=x>");
  assert.deepEqual(fragment.children.filter((node) => node.tagName === "sub").map((node) => node.textContent), ["4", "3,3"]);
  assert.ok(!fragment.children.some((node) => node.tagName === "img"));
});

test("the chi renderer preserves formula scripts and displays sourced unchecked entries", () => {
  const document = documentStub();
  const window = {
    document,
    GRAPH_CLASS_CHI_BINDING: {
      getResults: () => ({ status: "unchecked", positive: [], negative: [], open: [], conditional: [], unverified: [{ kind: "unchecked", formula: "No verified χ-bound", note: "Includes P6-free examples; S(ω) and ω^{d} are distinct notation.", locator: "Section 2", sourceIds: ["structural"] }] }),
      citations: () => [{ reference: ["Author", 2026, "P6-free graphs", "https://example.com/paper"], locators: ["Section 2"] }]
    }
  };
  const context = { window, document, URL };
  vm.runInNewContext(source, context);
  vm.runInNewContext(fs.readFileSync(path.join(root, "graph-class-example/chi-binding.js"), "utf8"), context);
  window.renderClassChiBinding("Bounded functionality");
  const content = document.getElementById("chi-binding-content");
  const descendants = (node) => [node, ...node.children.flatMap(descendants)];
  const nodes = descendants(content);
  assert.ok(nodes.some((node) => node.className === "chi-bound-growth" && node.textContent === "Unchecked"));
  assert.ok(nodes.some((node) => node.className === "chi-bound-formula" && node.textContent === "No verified χ-bound"));
  assert.match(content.textContent, /P6-free examples/);
  assert.ok(nodes.some((node) => node.tagName === "sub" && node.textContent === "6"));
  assert.ok(nodes.some((node) => node.tagName === "sup" && node.textContent === "d"));
  assert.ok(!content.textContent.includes("f(ω) = No verified"));
});

test("both pages load the shared formatter before their renderers", () => {
  for (const file of ["index.html", "graph-class-example/index.html"]) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    assert.ok(html.indexOf("graph-notation.js") < html.indexOf("app.js"), file);
    if (file.includes("graph-class")) assert.ok(html.indexOf("graph-notation.js") < html.indexOf("chi-binding.js"), file);
  }
});
