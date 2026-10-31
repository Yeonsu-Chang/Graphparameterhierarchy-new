const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const context = { window: {} };
for (const file of ["data.js", "relation-sources.js", "chi-binding-data.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "graph-class-example", file), "utf8"), context, { filename: file });
}
const graph = context.window.GRAPH_CLASS_EXAMPLE;
const relations = context.window.GRAPH_CLASS_RELATION_SOURCES;
const model = context.window.GRAPH_CLASS_CHI_BINDING;
const supportedKinds = new Set(["paper", "derived", "elementary", "definition"]);
const fromSource = (rows, sourceId) => rows.filter((finding) => finding.sourceIds.includes(sourceId));
const results = (label) => model.getResults(label);
const allRows = (result) => [...result.positive, ...result.negative, ...result.open, ...result.conditional, ...result.unverified];
const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "research", "published-class-additions-2026-11-01.json"), "utf8"));

test("every class resolves without contradictory chi-boundedness conclusions", () => {
  for (const label of graph.classes) {
    const result = results(label);
    assert.equal(result.selected, label);
    assert.notEqual(result.status, "conflict", label);
    assert.ok(!(result.positive.length && result.negative.length), label);
    assert.ok(result.positive.every((finding) => !finding.conditional), label);
    assert.ok(result.conditional.every((finding) => finding.conditional), label);
  }
});

test("upper bounds restrict to subclasses and counterexamples extend only to superclasses", () => {
  for (const label of graph.classes) {
    const result = results(label);
    for (const finding of [...result.positive, ...result.conditional]) {
      if (label === finding.origin) continue;
      assert.ok(supportedKinds.has(relations.trace(label, finding.origin).kind), `${label}: upper bound from ${finding.origin}`);
      assert.equal(finding.proof.source, label);
      assert.equal(finding.proof.target, finding.origin);
    }
    for (const finding of result.negative) {
      if (label === finding.origin) continue;
      assert.ok(supportedKinds.has(relations.trace(finding.origin, label).kind), `${label}: counterexample from ${finding.origin}`);
      assert.equal(finding.proof.source, finding.origin);
      assert.equal(finding.proof.target, label);
    }
    assert.ok(result.open.every((finding) => finding.origin === label), `${label}: an open question must not be inherited`);
  }
  assert.ok(fromSource(results("Cograph").positive, "polyChi").length);
  assert.equal(fromSource(results("Bounded twin-width").positive, "linearStable").length, 0);
  assert.equal(results("All graphs").positive.length, 0);
  assert.ok(fromSource(results("All graphs").negative, "treeChromaticNotes").length);
  assert.equal(results("Perfect").negative.length, 0);
  assert.equal(results("Tree").negative.length, 0);
});

test("width-dependent polynomial existence keeps its exponent symbolic", () => {
  const rows = fromSource(results("Bounded twin-width").positive, "twinPolyChi");
  assert.ok(rows.length);
  for (const finding of rows) {
    assert.equal(finding.kind, "existential");
    assert.equal(finding.growth, "polynomial");
    assert.match(finding.formula, /ω\s*\^\s*\{?p/);
    assert.doesNotMatch(finding.formula, /ω\s*\^\s*\{?\d/);
    assert.match(finding.condition, /twin-width.*d/i);
  }
  const numerical = fromSource(results("Twin-width at most 2").positive, "twinAlgorithms");
  assert.ok(numerical.some((finding) => finding.kind === "explicit" && finding.growth === "exponential" && finding.formula === "4^{ω−1}"));
});

test("open polynomial strengthenings do not assert an open ordinary chi-boundedness question", () => {
  const merge = results("Bounded merge-width");
  assert.equal(merge.status, "bounded");
  assert.ok(merge.open.some((finding) => finding.question === "polynomial"));
  assert.ok(merge.positive.some((finding) => finding.growth === "factorial"));
  const mim = results("Bounded mim-width");
  assert.ok(mim.open.some((finding) => finding.question === "polynomial"));
  assert.notEqual(mim.status, "open");
  const sim = results("Bounded sim-width");
  assert.equal(sim.status, "open");
  assert.ok(sim.open.some((finding) => finding.question !== "polynomial"));
});

test("tree-chromatic counterexamples do not invalidate the bounded intersection", () => {
  const treeChi = results("Bounded tree-chromatic number");
  assert.equal(treeChi.status, "not-bounded");
  assert.ok(fromSource(treeChi.negative, "treeChromaticNotes").length);
  const joint = results("Bounded tree-independence number \\cap Bounded tree-chromatic number");
  assert.equal(joint.status, "bounded");
  assert.equal(joint.negative.length, 0);
  const product = fromSource(joint.positive, "treeChromaticProduct").find((finding) => finding.origin === joint.selected);
  assert.ok(product);
  assert.equal(product.growth, "constant");
  assert.match(product.condition, /a.*c.*fixed/i);
  assert.equal(fromSource(treeChi.positive, "treeChromaticProduct").length, 0);
});

test("deferred free-class origins have no live chi findings while existing Claw-free remains", () => {
  assert.equal(inventory.deferredClasses.length, 24);
  const deferred = new Set(inventory.deferredClasses);
  for (const finding of model.findings) {
    assert.ok(finding.classes.every((label) => !deferred.has(label)), finding.classes.join(", "));
  }
  for (const label of graph.classes) {
    for (const finding of allRows(results(label))) assert.ok(!deferred.has(finding.origin), `${label}: ${finding.origin}`);
  }
  const claw = results("Claw-free");
  assert.equal(claw.status, "bounded");
  assert.ok(claw.positive.some((finding) => finding.origin === "Claw-free"));
  assert.equal(claw.negative.length, 0);
});

test("Vizing's original bound retains its simple-host condition", () => {
  const result = results("Line graph");
  const restricted = fromSource(result.conditional, "vizing1964");
  assert.ok(restricted.length);
  assert.equal(restricted[0].formula, "ω + 1");
  assert.match(restricted[0].condition, /simple graph|no parallel edges/i);
  assert.equal(fromSource(result.positive, "vizing1964").length, 0);
  assert.ok(fromSource(result.positive, "shannon1949").some((finding) => finding.growth === "linear"));
  assert.equal(model.sources.vizing1964[1], 1964);
  assert.match(model.sources.vizing1964[2], /p-graph/i);
  assert.match(restricted[0].locator, /Corollary A\.4/);
});

test("every formula has valid evidence, including separate locators for combined papers", () => {
  const names = new Set(graph.classes);
  assert.equal(new Set(model.findings.map((finding) => finding.id)).size, model.findings.length);
  for (const finding of model.findings) {
    const description = finding.classes.join(", ");
    assert.ok(finding.formula && finding.condition && finding.locator, description);
    assert.ok(finding.classes.every((label) => names.has(label)), description);
    if (!finding.sourceIds.length) {
      assert.ok(["elementary", "definition"].includes(finding.evidenceKind), `${description}: unexplained source-free claim`);
    }
    for (const id of finding.sourceIds) {
      assert.ok(model.sources[id], `${description}: missing source ${id}`);
      assert.equal(new URL(model.sources[id][3]).protocol, "https:", id);
      if (finding.sourceIds.length > 1) assert.ok(finding.sourceLocators?.[id], `${description}: missing locator for ${id}`);
    }
    if (finding.sourceIds.length > 1) {
      const entries = model.citations({ ...finding, proof: { kind: "definition", sourceIds: [], steps: [] } });
      for (const id of finding.sourceIds) {
        const entry = entries.find((citation) => citation.id === id);
        assert.deepEqual(Array.from(entry.locators), [finding.sourceLocators[id]], `${description}: locator attributed to ${id}`);
      }
    }
  }
  for (const label of graph.classes) {
    for (const finding of allRows(results(label))) {
      for (const entry of model.citations(finding)) {
        assert.ok(entry.reference, `${label}: missing inherited source ${entry.id}`);
        assert.equal(new URL(entry.reference[3]).protocol, "https:", entry.id);
        assert.ok(entry.locators.length && entry.locators.every((locator) => typeof locator === "string" && locator.trim()), `${label}: missing inherited locator ${entry.id}`);
      }
    }
  }
});

test("equivalent linear widths preserve the linear-rank-width parameter in inherited formulas", () => {
  const rankBound = fromSource(results("Bounded linear rank-width").positive, "linearStable")
    .find((finding) => finding.growth === "linear" && finding.kind === "explicit");
  assert.ok(rankBound);
  assert.match(rankBound.formula, /\br\b/);
  assert.match(rankBound.condition, /linear rank-width.*r/i);
  for (const label of ["Bounded linear clique-width", "Bounded linear NLC-width"]) {
    const inherited = results(label).positive.find((finding) => finding.id === rankBound.id);
    assert.ok(inherited, label);
    assert.equal(inherited.formula, rankBound.formula, label);
    assert.equal(inherited.condition, rankBound.condition, label);
  }
  const coverBound = fromSource(results("Low linear rank-width covers").positive, "linearStable")
    .find((finding) => finding.origin === "Low linear rank-width covers");
  assert.ok(coverBound);
  assert.match(coverBound.formula, /\bq\b/);
  assert.match(coverBound.formula, /\br\b/);
  assert.match(coverBound.condition, /q.*linear rank-width.*r/i);
});
