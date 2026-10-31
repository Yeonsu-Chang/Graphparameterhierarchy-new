const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const context = { window: {} };
for (const file of ['data.js', 'relation-sources.js', 'chi-binding-data.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'graph-class-example', file), 'utf8'), context);
}
const graph = context.window.GRAPH_CLASS_EXAMPLE;
const evidence = context.window.GRAPH_CLASS_RELATION_SOURCES;
const chi = context.window.GRAPH_CLASS_CHI_BINDING;
const supported = (a, b) => assert.ok(['definition', 'elementary', 'paper', 'derived'].includes(evidence.trace(a, b).kind), `${a} -> ${b}`);
const absent = (a, b) => assert.equal(evidence.trace(a, b).kind, 'unchecked', `${a} -> ${b}`);

test('functionality remains published with its definition, category and primary references', () => {
  const label = 'Bounded functionality';
  assert.equal(graph.classes.filter((name) => name === label).length, 1);
  assert.equal(graph.classLabels.filter((group) => group.classes.includes(label)).length, 1);
  const detail = graph.classDetails[label];
  assert.ok(detail.description && detail.references.length);
  for (const { sourceId, locator } of detail.references) {
    assert.ok(evidence.sources[sourceId], sourceId);
    assert.ok(locator);
  }
  supported(label, 'All graphs');
  assert.equal(evidence.resolveClassLabel('Bounded graph functionality'), label);
});

test('functionality comparisons do not inherit chi bounds upward from subclasses', () => {
  for (const source of ['Bounded degeneracy', 'Bounded twin-width', 'Bounded clique-width', 'Interval', 'Proper interval', 'Permutation', 'Line graph']) supported(source, 'Bounded functionality');
  supported('Bounded functionality', 'Bounded VC-dimension');
  absent('Bounded functionality', '\\chi - bounded');
  absent('Bounded boxicity', 'Bounded functionality');
  const result = chi.getResults('Bounded functionality');
  assert.equal(result.status, 'unchecked');
  assert.equal(result.positive.length, 0);
  assert.equal(result.negative.length, 0);
  assert.equal(result.open.length, 0);
  assert.ok(result.unverified.some((finding) => finding.sourceIds.includes('functionality2021')));
});
