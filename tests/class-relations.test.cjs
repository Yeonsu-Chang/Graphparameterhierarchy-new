const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..", "graph-class-example");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), context);
const source = fs.readFileSync(path.join(root, "relation-sources.js"), "utf8");
vm.runInNewContext(source, context);
const graph = context.window.GRAPH_CLASS_EXAMPLE;
const citations = context.window.GRAPH_CLASS_RELATION_SOURCES;

test("All graphs is the universal superclass with supported paths from every class", () => {
  assert.equal(graph.classes.filter((name) => name === "All graphs").length, 1);
  assert.equal(graph.classLabels.filter((group) => group.classes.includes("All graphs")).length, 1);
  assert.ok(!graph.relations.some((edge) => edge.source === "All graphs"));
  for (const name of graph.classes) {
    if (name === "All graphs") continue;
    const proof = citations.trace(name, "All graphs");
    assert.ok(["definition", "derived"].includes(proof.kind), name);
    assert.equal(proof.steps.at(-1).target, "All graphs", name);
    assert.equal(proof.steps.at(-1).kind, "definition", name);
    assert.equal(citations.trace("All graphs", name).kind, "unchecked", name);
    assert.equal(citations.trace(name, "All graphs", "equivalent").kind, "unchecked", name);
  }
});

test("the saved audit matches the current evidence model", () => {
  const { buildAudit } = require("../research/export-class-relation-audit.cjs");
  const saved = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "research", "class-relation-audit-2026-11-01.json"), "utf8"));
  assert.deepEqual(saved, buildAudit());
});

test("combined citations attach theorem locations to the correct paper", () => {
  const entries = citations.citations(citations.trace("Bounded rank-width", "Bounded merge-width"));
  const twin = entries.find((entry) => entry.id === "twin");
  const boolean = entries.find((entry) => entry.id === "boolean");
  assert.ok(twin.locators.includes("Section 4, Theorem 3"));
  assert.deepEqual(Array.from(boolean.locators), ["Width comparisons"]);
});

test("class-link migrations resolve navigation names without altering proof endpoints", () => {
  assert.equal(citations.resolveClassLabel("Bounded track number"), "Bounded track layout number");
  assert.equal(citations.resolveClassLabel("  TRACK number  "), "Bounded track layout number");
  assert.equal(citations.resolveClassLabel("Bounded 𝑟-merge-width"), "Bounded (2𝑟-1)-merge-width");
  assert.equal(citations.resolveClassLabel("Interval"), "Interval");
  assert.equal(citations.trace("Bounded 𝑟-merge-width", "Bounded 𝑟-flip-width").kind, "unchecked");
  for (const target of Object.values(graph.labelAliases)) assert.ok(graph.classes.includes(`Bounded ${target}`));
});

test("citation choices retain composed class relations when their graph edge is hidden", () => {
  const visible = [{ source: "Bounded clique-width", target: "Bounded rank-width", type: "equivalent", edgeId: "rank-visible" }];
  const options = citations.optionsForClass("Bounded clique-width", {
    equivalents: ["Bounded rank-width"],
    subclasses: ["Bounded tree-width"],
    superclasses: ["Bounded merge-width", "Bounded diameter"]
  }, visible);
  assert.equal(options.length, 3);
  assert.equal(options.find((option) => option.type === "equivalent").edgeId, "rank-visible");
  const composed = options.find((option) => option.target === "Bounded merge-width");
  assert.ok(composed);
  assert.equal(citations.trace(composed.source, composed.target).kind, "derived");
  const references = citations.citations(citations.trace(composed.source, composed.target));
  assert.ok(references.some((reference) => reference.id === "merge"));
  assert.ok(references.some((reference) => reference.id === "twin"));
  assert.equal(citations.optionsForClass("Bounded distance to Cograph", { superclasses: ["Bounded chordality"] }).length, 0);
});

test("every original relation retains its endpoints, type and valid evidence metadata", () => {
  assert.equal(citations.records.length, graph.relations.length);
  const names = new Set(graph.classes);
  for (const [index, record] of citations.records.entries()) {
    assert.equal(record.source, graph.relations[index].source);
    assert.equal(record.target, graph.relations[index].target);
    assert.equal(record.type, graph.relations[index].type || "subset");
    assert.ok(names.has(record.source), record.source);
    assert.ok(names.has(record.target), record.target);
    assert.ok(["paper", "definition", "elementary", "derived", "unchecked", "incorrect", "conditional"].includes(record.kind));
    assert.ok(record.note);
    if (record.kind === "paper") {
      assert.ok(record.sourceIds.length, record.id);
      assert.ok(record.locator, record.id);
      if (record.sourceIds.length > 1) {
        for (const id of record.sourceIds) assert.ok(record.sourceLocators?.[id], `${record.id}: ${id}`);
      }
    }
    for (const id of record.sourceIds) {
      const reference = citations.sources[id];
      assert.ok(reference, `${record.id}: ${id}`);
      assert.ok(reference[0] && reference[1] && reference[2]);
      assert.equal(new URL(reference[3]).protocol, "https:");
    }
  }
});

test("functional equivalence works in both directions and preserves the source", () => {
  for (const [left, right, sourceId] of [
    ["Bounded clique-width", "Bounded rank-width", "rank"],
    ["Bounded linear clique-width", "Bounded linear rank-width", "linear"],
    ["Bounded linear rank-width", "Bounded total twin-width", "twinContractions"]
  ]) {
    for (const [from, to] of [[left, right], [right, left]]) {
      const proof = citations.trace(from, to, "equivalent");
      assert.equal(proof.kind, "paper");
      assert.ok(proof.sourceIds.includes(sourceId));
      assert.equal(proof.steps[0].source, from);
      assert.equal(proof.steps[0].target, to);
    }
  }
});

test("all linear equivalents have a supported equivalence-only path", () => {
  const names = ["Bounded linear clique-width", "Bounded linear NLC-width", "Bounded linear rank-width", "Bounded total twin-width"];
  for (const from of names) for (const to of names) {
    if (from === to) continue;
    const proof = citations.trace(from, to, "equivalent");
    assert.notEqual(proof.kind, "unchecked", `${from} -> ${to}`);
    assert.ok(proof.steps.every((step) => step.type === "equivalent"));
  }
});

test("projected and transitive relations retain their intermediate evidence", () => {
  const proof = citations.trace("Bounded rank-width", "Bounded merge-width");
  assert.equal(proof.kind, "derived");
  assert.ok(proof.sourceIds.includes("rank"));
  assert.ok(proof.sourceIds.includes("merge"));
  assert.equal(proof.steps[0].source, "Bounded rank-width");
  assert.equal(proof.steps.at(-1).target, "Bounded merge-width");
  for (let i = 1; i < proof.steps.length; i++) {
    assert.equal(proof.steps[i - 1].target, proof.steps[i].source);
  }
  const interval = citations.trace("Interval", "Perfect");
  assert.equal(interval.kind, "derived");
  assert.ok(interval.steps.some((step) => step.kind === "elementary"));
  assert.ok(interval.sourceIds.includes("chordal"));
});

test("a checked multi-step proof is preferred over an unchecked shortcut", () => {
  const fixture = { window: { GRAPH_CLASS_EXAMPLE: {
    classes: ["Interval", "Chordal", "Perfect"],
    relations: [
      { source: "Interval", target: "Perfect" },
      { source: "Interval", target: "Chordal" },
      { source: "Chordal", target: "Perfect" }
    ]
  } } };
  vm.runInNewContext(source, fixture);
  const model = fixture.window.GRAPH_CLASS_RELATION_SOURCES;
  assert.equal(model.records[0].kind, "unchecked");
  const proof = model.trace("Interval", "Perfect");
  assert.equal(proof.kind, "derived");
  assert.equal(proof.steps.length, 2);
});

test("the merge-to-flip citation uses the proved radius adjustment", () => {
  const proof = citations.trace("Bounded (2𝑟-1)-merge-width", "Bounded 𝑟-flip-width");
  assert.equal(proof.kind, "paper");
  assert.ok(proof.sourceIds.includes("merge"));
  assert.equal(proof.steps.length, 1);
  assert.equal(proof.steps[0].locator, "Theorem 7.6");
  assert.ok(proof.steps.some((step) => step.note.includes("2r-1")));
  assert.ok(!graph.classes.includes("Bounded 𝑟-merge-width"));
  assert.equal(citations.trace("Bounded 𝑟-merge-width", "Bounded 𝑟-flip-width").kind, "unchecked");
  assert.equal(citations.trace("Bounded merge-width", "Bounded flip-width").kind, "paper");
  assert.equal(citations.trace("Bounded merge-width", "Bounded (2𝑟-1)-merge-width").kind, "definition");
  assert.equal(citations.trace("Bounded flip-width", "Bounded 𝑟-flip-width").kind, "definition");
  assert.equal(citations.trace("Bounded (2𝑟-1)-merge-width", "Bounded merge-width").kind, "unchecked");
});

test("definition and elementary arguments do not fabricate paper references", () => {
  for (const record of citations.records) {
    if (["definition", "elementary"].includes(record.kind)) assert.equal(record.sourceIds.length, 0);
  }
  assert.equal(citations.trace("Tree", "Forest").kind, "definition");
  assert.equal(citations.trace("Bounded vertex cover number", "Bounded tree-depth").kind, "elementary");
  const chordality = citations.trace("Bounded chromatic number", "Bounded chordality");
  assert.equal(chordality.kind, "elementary");
  assert.ok(chordality.steps[0].note.includes("chordal"));
});

test("directed subset cycles cannot manufacture an equivalence citation", () => {
  const fixture = { window: { GRAPH_CLASS_EXAMPLE: {
    classes: ["A", "B"],
    relations: [{ source: "A", target: "B" }, { source: "B", target: "A" }]
  } } };
  vm.runInNewContext(source, fixture);
  const proof = fixture.window.GRAPH_CLASS_RELATION_SOURCES.trace("A", "B", "equivalent");
  assert.equal(proof.kind, "unchecked");
  assert.equal(proof.steps.length, 0);
});

test("missing and unreviewed relations are not mislabeled as open conjectures", () => {
  const proof = citations.trace("Absent class", "Forest");
  assert.equal(proof.kind, "unchecked");
  assert.equal(proof.steps.length, 0);
  assert.ok(!["Open", "Conjecture"].includes(proof.kind));
});

test("interval-track and track-layout numbers no longer form one equivalence group", () => {
  assert.ok(graph.classes.includes("Bounded interval track number"));
  assert.ok(graph.classes.includes("Bounded track layout number"));
  assert.ok(!graph.classes.includes("Bounded track number"));
  assert.equal(citations.trace("Bounded simultaneous interval number", "Bounded interval track number").kind, "paper");
  assert.equal(citations.trace("Bounded queue number", "Bounded track layout number", "equivalent").kind, "paper");
  const oldEquivalence = citations.trace("Bounded interval number", "Bounded track layout number", "equivalent");
  assert.equal(oldEquivalence.kind, "incorrect");
  assert.ok(oldEquivalence.steps.every((step) => !citations.isActive(Number(step.id.slice(9)))));
  assert.equal(citations.trace("Bounded simultaneous interval number", "Bounded track layout number").kind, "unchecked");
});

test("invalid disconnected-distance claims cannot enter proof paths or the displayed graph", () => {
  const invalid = citations.records.filter((record) => record.kind === "incorrect");
  assert.equal(invalid.length, 9);
  for (const relation of invalid) {
    assert.equal(citations.trace(relation.source, relation.target, relation.type).kind, "incorrect");
    assert.ok(!citations.isActive(Number(relation.id.slice(9))));
  }
  for (const from of ["Bounded domination number", "Bounded tree-depth", "Bounded maximum induced matching", "Bounded distance to Cograph"]) {
    assert.equal(citations.trace(from, "Bounded diameter").kind, "incorrect");
    assert.notEqual(citations.trace(from, "Bounded max diameter of components").kind, "unchecked");
  }
  assert.equal(citations.trace("Bounded distance to Cograph", "Bounded chordality").kind, "incorrect");
  for (const relation of citations.records.filter((record) => citations.isActive(Number(record.id.slice(9))))) {
    assert.ok(citations.trace(relation.source, relation.target, relation.type).steps.every((step) => step.kind !== "incorrect"));
  }
});

test("all remaining active records have a supported argument after correcting the radius", () => {
  const unchecked = citations.records.filter((relation) => citations.trace(relation.source, relation.target, relation.type).kind === "unchecked");
  assert.equal(unchecked.length, 0);
  assert.equal(citations.trace("Bounded linear rank-width", "Bounded reduced max-leaf").kind, "derived");
});

test("ordinary max-leaf comparisons cite the older structural result, not the reduced parameter paper", () => {
  for (const target of ["Bounded bandwidth", "Bounded distance to Linear forest", "Bounded feedback edge set number"]) {
    const proof = citations.trace("Bounded max leaf number", target);
    assert.ok(proof.sourceIds.includes("maxLeaf"), target);
    assert.ok(!proof.sourceIds.includes("reduced"), target);
    assert.equal(citations.sources.maxLeaf[1], 2009);
  }
  const feedback = citations.trace("Bounded max leaf number", "Bounded feedback edge set number");
  assert.equal(feedback.kind, "derived");
  assert.match(feedback.steps[0].locator, /subdivision-invariance consequence/);
  assert.match(feedback.steps[0].note, /total leaf count.*not component max-leaf/);
  assert.match(feedback.steps[0].note, /isolated vertices contribute zero/);
});

test("reduced consequences retain the older premises without claiming a new theorem", () => {
  const bandwidth = citations.trace("Bounded reduced component max-leaf", "Bounded reduced bandwidth");
  assert.equal(bandwidth.kind, "derived");
  assert.deepEqual(Array.from(bandwidth.sourceIds), ["maxLeaf"]);
  assert.match(bandwidth.steps[0].note, /same contraction sequence/);
  const leaves = citations.trace("Bounded linear rank-width", "Bounded reduced max-leaf");
  assert.equal(leaves.kind, "derived");
  assert.ok(leaves.sourceIds.includes("twinContractions"));
  assert.match(leaves.steps[0].note, /isolated red vertices are not counted/);
  assert.ok(citations.trace("Bounded rank-width", "Bounded reduced component max-leaf").sourceIds.includes("reduced"));
});

test("existing twin-width equivalences cite the original characterization, not improved 2026 bounds", () => {
  for (const [source, target] of [["Bounded clique-width", "Bounded component twin-width"], ["Bounded linear rank-width", "Bounded total twin-width"]]) {
    const proof = citations.trace(source, target, "equivalent");
    assert.ok(proof.sourceIds.includes("twinContractions"));
    assert.ok(!proof.sourceIds.includes("twinVariants"));
    assert.equal(citations.sources.twinContractions[1], 2022);
    assert.ok(citations.citations(proof).some((entry) => entry.locators.some((locator) => locator.includes("Theorem 1"))));
  }
});

test("NLC-width comparisons retain Johansson's original attribution", () => {
  const proof = citations.trace("Bounded clique-width", "Bounded NLC-width", "equivalent");
  assert.ok(proof.sourceIds.includes("johansson"));
  assert.equal(citations.sources.johansson[1], 1998);
  assert.ok(!proof.sourceIds.includes("shrub"));
  assert.match(proof.steps[0].note, /institutional publication listing/);
});

test("thinness and treewidth comparisons retain their original theorem sources", () => {
  const thin = citations.trace("Bounded thinness", "Bounded linear mim-width");
  assert.deepEqual(Array.from(thin.sourceIds), ["thinMim"]);
  assert.equal(thin.steps[0].locator, "Theorem 9 (author preprint)");
  for (const name of ["branch-width", "tangle number"]) {
    const proof = citations.trace(`Bounded ${name}`, "Bounded tree-width", "equivalent");
    assert.deepEqual(Array.from(proof.sourceIds), ["graphMinorsX"]);
    assert.equal(citations.sources.graphMinorsX[1], 1991);
  }
  const separator = citations.trace("Bounded separation number", "Bounded tree-width", "equivalent");
  assert.deepEqual(Array.from(separator.sourceIds), ["separators"]);
  assert.match(separator.steps[0].note, /15 sn/);
  assert.ok(citations.trace("Bounded linkedness", "Bounded tree-width", "equivalent").sourceIds.includes("reed"));
});

test("classical perfectness and stability facts do not acquire later theorem attributions", () => {
  for (const name of ["Co-comparability", "Weakly chordal", "Meyniel", "Parity"]) {
    const proof = citations.trace(name, "Perfect");
    assert.ok(proof.sourceIds.length, name);
    assert.ok(proof.sourceIds.every((id) => citations.sources[id][1] < 2006), name);
  }
  for (const name of ["Monadically dependent \\cap Weakly sparse", "Monadically stable \\cap Weakly sparse"]) {
    const proof = citations.trace(name, "Nowhere dense", "equivalent");
    assert.equal(proof.kind, "derived");
    assert.ok(proof.sourceIds.includes("adler") && proof.sourceIds.includes("inducedSubdivisions"));
    assert.ok(!proof.sourceIds.includes("flip"));
  }
  assert.deepEqual(Array.from(citations.trace("Structurally nowhere dense", "Monadically stable").sourceIds), ["adler"]);
});

test("lifted inclusions preserve the base papers and their theorem locations", () => {
  const proof = citations.trace("Monadically stable bounded clique-width", "Monadically stable bounded twin-width");
  assert.equal(proof.kind, "derived");
  assert.ok(proof.sourceIds.includes("twin"));
  const entries = citations.citations(proof);
  assert.equal(entries.length, new Set(proof.sourceIds).size);
  assert.ok(entries.find((entry) => entry.id === "twin").locators.some((locator) => locator.includes("Theorem 3")));
});

test("combined citations contain each contributing paper once", () => {
  const proof = citations.trace("Bounded rank-width", "Monadically dependent");
  const entries = citations.citations(proof);
  assert.equal(entries.length, new Set(entries.map((entry) => entry.id)).size);
  assert.ok(entries.length > 1);
  assert.ok(entries.every((entry) => entry.reference === citations.sources[entry.id]));
});
