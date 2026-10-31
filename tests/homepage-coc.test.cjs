const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const context = { window: {} };
for (const file of ["graph-data.js", "graph-class-example/data.js", "graph-class-example/relation-sources.js", "graph-class-example/chi-binding-data.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), context, { filename: file });
}
const homepage = context.window.GRAPH_DATA;
const main = homepage.graph;
const classes = context.window.GRAPH_CLASS_EXAMPLE;
const evidence = context.window.GRAPH_CLASS_RELATION_SOURCES;
const chi = context.window.GRAPH_CLASS_CHI_BINDING;
const DISS = "dissociation deletion number";
const RCOC = "r-CoC (fixed r ≥ 2)";
const VI = "vertex integrity";
const classOf = (label) => homepage.settings.classMapLabels[label] || classByParameter.get(bare(label));
const bare = (label) => evidence.normalize(label).replace(/^bounded\s+/, "");
const classByParameter = new Map(classes.classes.filter((label) => /^Bounded /.test(label)).map((label) => [bare(label), label]));
const supported = new Set(["paper", "derived", "definition", "elementary"]);
const labels = new Set([...main.nodes, ...main.edges.flatMap((edge) => [edge.source, edge.target])]);
const chain = ["vertex cover number", DISS, RCOC, VI, "tree-depth"];

test("the requested CoC chain consists of real directed homepage edges", () => {
  for (const label of chain) assert.ok(labels.has(label), label);
  for (let i = 1; i < chain.length; i++) {
    const source = chain[i - 1], target = chain[i];
    const edge = main.edges.find((entry) => entry.source === source && entry.target === target);
    assert.ok(edge, `${source} -> ${target}`);
    assert.notEqual(edge.type, "equivalent", `${source} -> ${target}`);
    assert.ok(supported.has(evidence.trace(classOf(source), classOf(target)).kind), `${source} -> ${target}: Class Map evidence`);
  }
});

test("homepage graph data is dense and all endpoints use nonempty canonical names", () => {
  assert.ok(Array.isArray(main.nodes));
  assert.ok(Array.isArray(main.edges));
  for (let i = 0; i < main.nodes.length; i++) {
    assert.ok(Object.hasOwn(main.nodes, i), `missing node at ${i}`);
    assert.equal(typeof main.nodes[i], "string");
    assert.ok(main.nodes[i].trim(), `empty node at ${i}`);
  }
  for (let i = 0; i < main.edges.length; i++) {
    assert.ok(Object.hasOwn(main.edges, i), `missing edge at ${i}`);
    const edge = main.edges[i];
    assert.ok(edge && typeof edge === "object", `invalid edge at ${i}`);
    for (const side of ["source", "target"]) {
      assert.equal(typeof edge[side], "string", `edge ${i}: ${side}`);
      assert.ok(edge[side].trim(), `edge ${i}: empty ${side}`);
      assert.ok(!Object.hasOwn(homepage.settings.parameterAliases, edge[side]), `edge ${i}: alias used as a node: ${edge[side]}`);
    }
    assert.ok(!edge.type || ["subset", "equivalent"].includes(edge.type), `edge ${i}: invalid relation type`);
    assert.notEqual(edge.source, edge.target, `self edge at ${i}`);
  }
});

test("CoC navigation aliases target existing nodes without inventing equivalent parameters", () => {
  const aliases = homepage.settings.parameterAliases;
  for (const [alias, target] of Object.entries(aliases)) {
    assert.ok(labels.has(target), `${alias}: missing target ${target}`);
    assert.ok(!labels.has(alias), `${alias}: navigation alias became a duplicate graph node`);
  }
  assert.equal(aliases["2-CoC"], DISS);
  assert.equal(aliases["dissociation number (deletion)"], DISS);
  assert.equal(aliases["r-CoC"], RCOC);
  for (const name of [...labels, ...Object.keys(aliases)]) {
    assert.notEqual(bare(name), "dissociation number", "the ambiguous maximum/deletion name must not silently select a parameter");
  }
  for (const label of [DISS, RCOC]) {
    assert.ok(labels.has(label));
    assert.ok(!Object.hasOwn(homepage.settings.equivalentAliases, label), label);
    assert.ok(!Object.values(homepage.settings.equivalentAliases).includes(label), `${label}: use navigation aliases, not fake equivalent nodes`);
    assert.ok(!main.edges.some((edge) => edge.type === "equivalent" && [edge.source, edge.target].includes(label)), label);
    const classLabel = classOf(label);
    assert.equal(classes.classes.filter((entry) => entry === classLabel).length, 1, classLabel);
  }
  assert.equal(homepage.settings.classMapLabels[DISS], "Bounded dissociation deletion number");
  assert.equal(homepage.settings.classMapLabels[RCOC], "Bounded r-CoC (fixed r ≥ 2)");
  assert.match(classes.classDetails[classOf(RCOC)].description, /fixed integer r\s*≥\s*2/);
  assert.match(classes.classDetails[classOf(RCOC)].description, /r cannot grow/i);
});

test("every shared homepage relation has supported Class Map evidence", () => {
  for (const [parameter, classLabel] of Object.entries(homepage.settings.classMapLabels)) {
    assert.ok(labels.has(parameter), parameter);
    assert.ok(classes.classes.includes(classLabel), classLabel);
  }
  for (const edge of main.edges) {
    const source = classOf(edge.source), target = classOf(edge.target);
    if (!source || !target) continue;
    const proof = evidence.trace(source, target, edge.type || "subset");
    assert.ok(supported.has(proof.kind), `${edge.source} -> ${edge.target}: ${proof.kind}`);
  }
  for (const edge of main.edges.filter((entry) => [DISS, RCOC, VI].some((label) => label === entry.source || label === entry.target))) {
    assert.ok(classOf(edge.source), edge.source);
    assert.ok(classOf(edge.target), edge.target);
  }
});

test("vertex integrity has its own definition, original reference and constant chi bound", () => {
  const label = classOf(VI);
  assert.equal(label, "Bounded vertex integrity");
  assert.equal(classes.classes.filter((entry) => entry === label).length, 1);
  assert.equal(classes.classLabels.filter((group) => group.classes.includes(label)).length, 1);
  const details = classes.classDetails[label];
  assert.match(details.description, /vi\(G\)\s*=\s*min/);
  assert.match(details.description, /\|S\|.*max.*\|C\|/);
  assert.match(details.description, /maximum zero for an empty remainder/);
  const reference = details.references.find((entry) => entry.sourceId === "cocEnumPreprint2025");
  assert.ok(reference);
  assert.match(reference.locator, /Section 2.*Graph Parameters/);
  assert.equal(evidence.sources[reference.sourceId][1], 2025);
  assert.equal(new URL(evidence.sources[reference.sourceId][3]).protocol, "https:");
  const result = chi.getResults(label);
  assert.equal(result.status, "bounded");
  assert.equal(result.negative.length, 0);
  const bound = result.positive.find((finding) => finding.origin === label && finding.formula === "v");
  assert.ok(bound);
  assert.equal(bound.kind, "explicit");
  assert.equal(bound.growth, "constant");
  assert.match(bound.condition, /vi\(G\).*v.*fixed v/);
});

test("the vertex-integrity bridge does not reverse the CoC comparisons", () => {
  const vi = classOf(VI);
  for (const parameter of [DISS, RCOC]) {
    assert.equal(evidence.trace(vi, classOf(parameter)).kind, "unchecked", `${VI} -> ${parameter}`);
    assert.equal(evidence.trace(vi, classOf(parameter), "equivalent").kind, "unchecked", `${VI} equivalent to ${parameter}`);
    const origins = chi.getResults(vi).positive.map((finding) => finding.origin);
    assert.ok(!origins.includes(classOf(parameter)), `${VI}: inherited an upper bound from a subclass`);
  }
  assert.equal(evidence.trace(classOf(RCOC), classOf(DISS)).kind, "unchecked");
  assert.ok(!main.edges.some((edge) => edge.source === VI && [DISS, RCOC].includes(edge.target)));
});
