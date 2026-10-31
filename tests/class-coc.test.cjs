const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {} };
for (const file of ['data.js', 'relation-sources.js', 'chi-binding-data.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'graph-class-example', file), 'utf8'), context, { filename: file });
}
const graph = context.window.GRAPH_CLASS_EXAMPLE;
const evidence = context.window.GRAPH_CLASS_RELATION_SOURCES;
const chi = context.window.GRAPH_CLASS_CHI_BINDING;
const DISS = 'Bounded dissociation deletion number';
const RCOC = 'Bounded r-CoC (fixed r ≥ 2)';
const supportedKinds = new Set(['definition', 'elementary', 'paper', 'derived']);
const supported = (source, target) => assert.ok(supportedKinds.has(evidence.trace(source, target).kind), `${source} -> ${target}`);
const unsupported = (source, target) => assert.ok(!supportedKinds.has(evidence.trace(source, target).kind), `${source} -> ${target}`);
const normalizedFormula = (finding) => finding.formula.replace(/\s/g, '').replace(/[−]/g, '-');

// Independent small graph witnesses for the parameter conventions and false reverse inclusions.
function componentsOfOrderAtMost(adjacency, retained, r) {
  let unseen = retained;
  while (unseen) {
    const first = unseen & -unseen;
    let frontier = first, reached = 0;
    while (frontier) {
      const vertex = frontier & -frontier;
      frontier ^= vertex;
      if (reached & vertex) continue;
      reached |= vertex;
      frontier |= adjacency[Math.log2(vertex)] & retained & ~reached;
    }
    if (bitCount(reached) > r) return false;
    unseen &= ~reached;
  }
  return true;
}
function bitCount(value) {
  let count = 0;
  for (; value; value &= value - 1) count++;
  return count;
}
function componentDeletionNumber(adjacency, r) {
  const all = (1 << adjacency.length) - 1;
  let largestRetained = 0;
  for (let retained = all; ; retained = (retained - 1) & all) {
    const size = bitCount(retained);
    if (size > largestRetained && componentsOfOrderAtMost(adjacency, retained, r)) largestRetained = size;
    if (!retained) break;
  }
  return adjacency.length - largestRetained;
}
function disjointCliques(sizes) {
  const adjacency = new Array(sizes.reduce((a, b) => a + b, 0)).fill(0);
  let start = 0;
  for (const size of sizes) {
    for (let i = start; i < start + size; i++) {
      for (let j = start; j < start + size; j++) if (i !== j) adjacency[i] |= 1 << j;
    }
    start += size;
  }
  return adjacency;
}

test('the two COC additions have canonical definitions, one group and primary references', () => {
  for (const label of [DISS, RCOC]) {
    assert.equal(graph.classes.filter((entry) => entry === label).length, 1, label);
    assert.equal(graph.classLabels.filter((group) => group.classes.includes(label)).length, 1, label);
    const detail = graph.classDetails[label];
    assert.ok(detail?.description && detail.references?.length, label);
    for (const { sourceId, locator } of detail.references) {
      assert.ok(evidence.sources[sourceId], sourceId);
      assert.ok(locator, `${label}: locator`);
    }
    supported(label, 'All graphs');
  }
  assert.equal(evidence.resolveClassLabel('Bounded 2-CoC'), DISS);
  assert.equal(evidence.resolveClassLabel('Bounded r-CoC (fixed r)'), RCOC);
  assert.notEqual(evidence.resolveClassLabel('Bounded dissociation number'), DISS);
  assert.notEqual(evidence.resolveClassLabel('Dissociation number'), DISS);
  assert.match(graph.classDetails[DISS].description, /delet/i);
  assert.match(graph.classDetails[DISS].description, /not the maximum/i);
  assert.match(graph.classDetails[DISS].description, /not induced-P3/i);
  assert.match(graph.classDetails[RCOC].description, /uniform|fixed/i);
});

test('deletion to order two is separate from maximum dissociation size and from vertex cover', () => {
  const matching = disjointCliques([2, 2, 2, 2]);
  assert.equal(componentDeletionNumber(matching, 1), 4);
  assert.equal(componentDeletionNumber(matching, 2), 0);
  // The entire matching is a maximum induced subgraph of degree at most one.
  assert.equal(matching.length - componentDeletionNumber(matching, 2), 8);
  supported('Bounded vertex cover number', DISS);
  supported(DISS, RCOC);
  unsupported(DISS, 'Bounded vertex cover number');
  unsupported(DISS, 'Bounded maximum independent set');
});

test('fixed r and the deletion budget remain separate parameters', () => {
  const triangles = disjointCliques([3, 3, 3]);
  assert.equal(componentDeletionNumber(triangles, 2), 3);
  assert.equal(componentDeletionNumber(triangles, 3), 0);
  // Therefore the generic fixed-r family must not be identified with its r=2 specialization.
  unsupported(RCOC, DISS);
  for (const target of ['Bounded tree-depth', 'Bounded path-width']) supported(RCOC, target);
  unsupported('Bounded tree-depth', RCOC);
  unsupported('Bounded path-width', RCOC);
});

test('order-two residual components license cluster deletion without reversing it', () => {
  for (const target of ['Bounded distance to Cluster', 'Bounded distance to Linear forest', 'Bounded feedback vertex set number']) supported(DISS, target);
  // Arbitrarily large cliques have cluster-deletion distance zero and unbounded 2-COC.
  for (const n of [3, 5, 7]) assert.equal(componentDeletionNumber(disjointCliques([n]), 2), n - 2);
  unsupported('Cluster', DISS);
  unsupported('Bounded distance to Cluster', DISS);
  unsupported(RCOC, 'Bounded distance to Cluster');
  unsupported(RCOC, 'Bounded feedback vertex set number');
  unsupported(RCOC, 'Bounded distance to Linear forest');
});

test('constant chi bounds keep the deletion budget and fixed component-order threshold explicit', () => {
  const diss = chi.getResults(DISS), rcoc = chi.getResults(RCOC);
  assert.equal(diss.status, 'bounded');
  assert.equal(rcoc.status, 'bounded');
  assert.equal(diss.negative.length, 0);
  assert.equal(rcoc.negative.length, 0);
  const dissBound = diss.positive.find((finding) => finding.origin === DISS && normalizedFormula(finding) === 'k+2');
  const rcocBound = rcoc.positive.find((finding) => finding.origin === RCOC && normalizedFormula(finding) === 'k+r');
  for (const finding of [dissBound, rcocBound]) {
    assert.ok(finding);
    assert.equal(finding.kind, 'explicit');
    assert.equal(finding.growth, 'constant');
    assert.ok(['elementary', 'derived'].includes(finding.evidenceKind));
    assert.match(finding.condition, /\bk\b/);
  }
  assert.match(rcocBound.condition, /\br\b/);
  // K_(k+r) requires k deletions and k+r colors, so the constant cannot lose its r term.
  assert.equal(componentDeletionNumber(disjointCliques([6]), 2), 4);
  assert.equal(componentDeletionNumber(disjointCliques([6]), 3), 3);
});

test('COC upper bounds do not propagate upward to the broader width or deletion classes', () => {
  for (const label of ['All graphs', 'Bounded tree-depth', 'Bounded path-width', 'Bounded distance to Cluster', 'Bounded maximum independent set']) {
    const result = chi.getResults(label);
    assert.ok(result.positive.every((finding) => ![DISS, RCOC].includes(finding.origin)), label);
    assert.notEqual(result.status, 'conflict', label);
  }
});
