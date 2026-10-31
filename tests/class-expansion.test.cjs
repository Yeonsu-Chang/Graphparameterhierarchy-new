const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const context = { window: {} };
for (const file of ["data.js", "relation-sources.js", "chi-binding-data.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(root, "graph-class-example", file), "utf8"), context);
}
const graph = context.window.GRAPH_CLASS_EXAMPLE;
const evidence = context.window.GRAPH_CLASS_RELATION_SOURCES;
const chi = context.window.GRAPH_CLASS_CHI_BINDING;
const inventory = JSON.parse(fs.readFileSync(path.join(root, "research", "published-class-additions-2026-11-01.json"), "utf8"));
const supported = (from, to, type) => assert.ok(["paper", "derived", "elementary", "definition"].includes(evidence.trace(from, to, type).kind), `${from} -> ${to}`);

test("the thirteen published additions are reachable, categorized and have class references", () => {
  assert.equal(inventory.addedClasses.length, 13);
  assert.equal(new Set(inventory.addedClasses).size, 13);
  for (const label of inventory.addedClasses) {
    assert.doesNotMatch(label, /-free/i);
    assert.equal(graph.classes.filter((name) => name === label).length, 1, label);
    assert.equal(graph.classLabels.filter((group) => group.classes.includes(label)).length, 1, label);
    const details = graph.classDetails[label];
    assert.ok(details.description && details.references.length, label);
    for (const { sourceId, locator } of details.references) {
      assert.ok(evidence.sources[sourceId], `${label}: ${sourceId}`);
      assert.ok(locator, label);
    }
    supported(label, "All graphs");
  }
});

test("all twenty-four deferred classes are absent from every live node entry point", () => {
  assert.equal(inventory.deferredClasses.length, 24);
  assert.equal(new Set(inventory.deferredClasses).size, 24);
  assert.deepEqual(inventory.retainedExistingFreeClasses, ["Claw-free"]);
  const deferred = new Set(inventory.deferredClasses);
  for (const label of deferred) {
    assert.match(label, /-free/i);
    assert.ok(!graph.classes.includes(label), label);
    assert.ok(!graph.classLabels.some((group) => group.classes.includes(label)), label);
    assert.ok(!Object.hasOwn(graph.classDetails, label), label);
  }
  for (const [alias, target] of Object.entries(graph.classAliases || {})) assert.ok(!deferred.has(target), alias);
  for (const relation of [...graph.relations, ...evidence.records]) {
    assert.ok(!deferred.has(relation.source), relation.source);
    assert.ok(!deferred.has(relation.target), relation.target);
  }
  for (const finding of chi.findings) assert.ok(finding.classes.every((label) => !deferred.has(label)), finding.classes.join(", "));
  assert.deepEqual(Array.from(graph.classes).filter((label) => /-free/i.test(label)), inventory.retainedExistingFreeClasses);
});

test("retained alternate names navigate to existing nodes without inventing equivalences", () => {
  for (const [alias, label] of Object.entries(graph.classAliases)) {
    assert.ok(graph.classes.includes(label), alias);
    assert.equal(evidence.resolveClassLabel(alias), label, alias);
  }
  assert.equal(evidence.resolveClassLabel("P4-free"), "Cograph");
  assert.equal(evidence.resolveClassLabel("Bounded induced matching treewidth"), "Bounded minor-matching hypertree-width");
  assert.ok(!graph.classes.includes("P4-free"));
  assert.ok(!graph.classes.includes("Bounded induced matching treewidth"));
});

test("published dense-width refinements retain their hypotheses and direction", () => {
  supported("Proper interval", "Twin-width at most 2");
  supported("Twin-width at most 2", "Bounded reduced component max-leaf");
  for (const [from, to] of [
    ["Twin-width at most 2", "Bounded rank-width"],
    ["Bounded induced P3-packing treewidth", "Bounded sim-width"],
    ["Bounded sim-width", "Bounded induced P3-packing treewidth"],
    ["Bounded thinness", "Bounded proper mixed-thinness"],
    ["Linear neighborhood complexity", "Monadically dependent"],
    ["Bounded VC-dimension", "Bounded twin-width"]
  ]) assert.equal(evidence.trace(from, to).kind, "unchecked", `${from} -> ${to}`);
  const product = evidence.trace("Bounded tree-independence number \\cap Bounded tree-chromatic number", "Bounded tree-width", "equivalent");
  assert.ok(product.sourceIds.includes("treeChromaticJoint"));
  assert.ok(product.sourceIds.includes("treeChromaticProduct"));
});

test("published inclusion proofs have checked sources and no unreviewed shortcut", () => {
  for (const record of evidence.records.filter((entry) => entry.checkedOn === "2026-10-29")) {
    supported(record.source, record.target, record.type);
    assert.ok(record.note && record.locator, record.id);
    if (["definition", "elementary"].includes(record.kind)) assert.equal(record.sourceIds.length, 0, record.id);
    if (["paper", "derived"].includes(record.kind)) assert.ok(record.sourceIds.length, record.id);
  }
});

test("subset relations stay acyclic after declared equivalences are collapsed", () => {
  const parent = new Map(graph.classes.map((name) => [name, name]));
  const find = (name) => parent.get(name) === name ? name : find(parent.get(name));
  const records = evidence.records.filter((_, index) => evidence.isActive(index));
  records.filter((record) => record.type === "equivalent").forEach(({ source, target }) => parent.set(find(source), find(target)));
  const adjacency = new Map();
  for (const { source, target, type } of records) {
    if (type === "equivalent" || find(source) === find(target)) continue;
    const edges = adjacency.get(find(source)) || new Set();
    edges.add(find(target));
    adjacency.set(find(source), edges);
  }
  const active = new Set(), done = new Set();
  const visit = (node) => {
    assert.ok(!active.has(node), `Subset cycle at ${node}`);
    if (done.has(node)) return;
    active.add(node);
    for (const target of adjacency.get(node) || []) visit(target);
    active.delete(node);
    done.add(node);
  };
  for (const node of graph.classes) visit(find(node));
});
