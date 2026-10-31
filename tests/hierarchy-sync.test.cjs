const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const context = { window: {} };
for (const file of ["graph-data.js", "graph-class-example/data.js", "graph-class-example/relation-sources.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context);
}
const main = context.window.GRAPH_DATA.graph;
const classes = context.window.GRAPH_CLASS_EXAMPLE;
const evidence = context.window.GRAPH_CLASS_RELATION_SOURCES;
const bare = (label) => evidence.normalize(label).replace(/^bounded\s+/, "");
const classByParameter = new Map(classes.classes.filter((label) => /^Bounded /.test(label)).map((label) => [bare(label), label]));

test("the homepage cannot reintroduce relations excluded by the class-map audit", () => {
  const excluded = evidence.records.filter((record) => record.kind === "incorrect");
  for (const record of excluded) {
    assert.ok(!main.edges.some((edge) => bare(edge.source) === bare(record.source) && bare(edge.target) === bare(record.target) && (edge.type || "subset") === record.type), `${record.source} -> ${record.target}`);
  }
});

test("shared homepage parameter relations have supported class-map evidence", () => {
  for (const edge of main.edges) {
    const source = classByParameter.get(bare(edge.source));
    const target = classByParameter.get(bare(edge.target));
    if (!source || !target) continue;
    const proof = evidence.trace(source, target, edge.type || "subset");
    assert.ok(["paper", "derived", "definition", "elementary"].includes(proof.kind), `${source} -> ${target}: ${proof.kind}`);
  }
});

test("radius-adjusted and component-diameter relations agree on both pages", () => {
  for (const [source, target] of [
    ["(2𝑟-1)-merge-width", "𝑟-flip-width"],
    ["merge-width", "flip-width"],
    ["merge-width", "(2𝑟-1)-merge-width"],
    ["flip-width", "𝑟-flip-width"],
    ["diameter", "average distance"],
    ["diameter", "max diameter of components"],
    ["maximum induced matching", "max diameter of components"]
  ]) {
    assert.ok(main.edges.some((edge) => edge.source === source && edge.target === target), `${source} -> ${target}`);
    assert.notEqual(evidence.trace(`Bounded ${source}`, `Bounded ${target}`).kind, "unchecked");
  }
  assert.ok(!main.edges.some((edge) => edge.source === "𝑟-merge-width" || edge.target === "𝑟-merge-width"));
});

test("removing unsupported relations does not remove isolated or earlier parameters", () => {
  const labels = new Set([...main.nodes, ...main.edges.flatMap((edge) => [edge.source, edge.target])]);
  for (const label of ["girth", "diameter", "average distance", "vertex integrity", "row treewidth", "layered treewidth", "tree-γ", "tree-χ", "tree-μ"]) assert.ok(labels.has(label), label);
});

test("the undirected homepage excludes deferred digraph parameters and their configuration", () => {
  const directed = [
    "cycle rank", "DAG-depth", "DAG-width", "directed path-width", "directed tree-width", "Kelly-width",
    "weak (∞, →)-coloring number", "strong (∞, →)-coloring number"
  ];
  const labels = new Set([...main.nodes, ...main.edges.flatMap((edge) => [edge.source, edge.target])]);
  const configuredNames = [];
  const collectNames = (value) => {
    if (typeof value === "string") configuredNames.push(value);
    else if (Array.isArray(value)) value.forEach(collectNames);
    else if (value && typeof value === "object") {
      for (const [key, entry] of Object.entries(value)) {
        configuredNames.push(key);
        collectNames(entry);
      }
    }
  };
  collectNames(context.window.GRAPH_DATA.settings);
  for (const label of directed) {
    assert.ok(!labels.has(label), `${label}: deferred digraph node is still present`);
    assert.ok(!configuredNames.includes(label), `${label}: deferred configuration remains`);
  }
  for (const label of labels) assert.doesNotMatch(label, /\bdirected\b|\bDAG[- ]|\bKelly[- ]|→/i);
  for (const label of ["tree-depth", "tree-width", "path-width", "weak ∞-coloring number", "strong ∞-coloring number"]) {
    assert.ok(labels.has(label), `${label}: the undirected parameter must remain`);
  }
});
