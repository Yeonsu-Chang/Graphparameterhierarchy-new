const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
// Exercise the app's name/URL functions without a canvas or browser dependency.
function functionSource(name) {
  const match = app.match(new RegExp(`  function ${name}\\([\\s\\S]*?\\n  \\}`));
  assert.ok(match, name);
  return match[0];
}

function fixture(href = "https://example.test/hierarchy/") {
  const labels = ["dissociation deletion number", "r-CoC (fixed r ≥ 2)", "vertex integrity", "(2𝑟-1)-merge-width"];
  const settings = {
    parameterAliases: { "2-CoC": labels[0], "dissociation deletion": labels[0], "r-CoC": labels[1], "(2r-1)-merge-width": labels[3] },
    displayLabels: { [labels[0]]: "dissociation deletion number (2-CoC)" },
    classMapLabels: { [labels[0]]: "Bounded dissociation deletion number", [labels[1]]: "Bounded r-CoC (fixed r ≥ 2)", [labels[2]]: "Bounded vertex integrity", [labels[3]]: "Bounded (2𝑟-1)-merge-width" }
  };
  const window = { location: { href } };
  window.history = { replaceState: (_state, _title, url) => { window.location.href = url; } };
  const context = { window, URL, settings, labels };
  vm.runInNewContext(fs.readFileSync(path.join(root, "graph-notation.js"), "utf8"), context);
  vm.runInNewContext(["normalizeParameterName", "createParameterNameIndex", "requestedParameter", "syncParameterUrl", "updateSelectionSummary"].map(functionSource).join("\n"), context);
  context.parameterNames = context.createParameterNameIndex(labels, {
    ...Object.fromEntries(Object.entries(settings.displayLabels).map(([canonical, display]) => [display, canonical])),
    ...settings.parameterAliases
  });
  context.normalizeKnownLabel = (value) => context.parameterNames.resolve(value, false) || value;
  return context;
}

test("search aliases resolve to canonical parameters without becoming equivalent nodes", () => {
  const context = fixture();
  const index = context.parameterNames;
  for (const alias of ["2-CoC", "DISSOCIATION DELETION", "dissociation deletion number (2-CoC)"]) {
    assert.equal(index.resolve(alias), "dissociation deletion number");
    assert.ok(index.matches("dissociation deletion number", alias));
  }
  assert.equal(index.resolve("r-CoC"), "r-CoC (fixed r ≥ 2)");
  assert.equal(index.resolve("r-merge-width", false), null, "a bare radius is not an alias for radius 2r-1");
  assert.equal(context.labels.length, 4);
  assert.equal(index.resolve("maximum dissociation number", false), null);
});

test("legacy radius names accept ASCII, mathematical italic r and minus variants", () => {
  const index = fixture().parameterNames;
  for (const alias of ["(2r-1)-merge-width", "(2𝑟-1)-merge-width", "(2r−1)-merge-width", "(2𝑟 − 1)-merge-width"]) {
    assert.equal(index.resolve(alias, false), "(2𝑟-1)-merge-width", alias);
    assert.ok(index.matches("(2𝑟-1)-merge-width", alias), alias);
  }
  assert.equal(index.resolve("𝑟-merge-width", false), null);
  assert.ok(!index.matches("(2𝑟-1)-merge-width", "r-merge-width"));
});

test("old homepage deep links preselect and migrate to the canonical parameter name", () => {
  for (const [key, value] of [["parameter", "(2𝑟−1)-merge-width"], ["class", "Bounded (2r-1)-merge-width"]]) {
    const url = new URL("https://example.test/hierarchy/");
    url.searchParams.set(key, value);
    const context = fixture(url.href);
    const selected = context.requestedParameter();
    assert.equal(selected, "(2𝑟-1)-merge-width");
    context.syncParameterUrl(selected);
    const migrated = new URL(context.window.location.href);
    assert.equal(migrated.searchParams.get("parameter"), "(2𝑟-1)-merge-width");
    assert.equal(migrated.searchParams.has("class"), false);
  }
});

test("the selected Class Map link uses the canonical class rather than a display alias", () => {
  const context = fixture();
  const ui = Object.fromEntries(["selectionTitle", "incomingCount", "outgoingCount", "equivalentCount", "selectionDock", "quickSearch", "classMapLink"].map((name) => [name, {}]));
  Object.assign(context, {
    ui, ADJ_IN: new Map(), ADJ_OUT: new Map(), toId: (value) => value,
    equivalentComponentNames: (label) => new Set([label]),
    resolveAnchorName: context.normalizeKnownLabel,
    toDisplayText: (label) => context.settings.displayLabels[label] || label,
    renderEquivalentPanel: () => {}, setQuickSearchClearVisibility: () => {}
  });
  context.updateSelectionSummary("2-CoC", "dissociation deletion number");
  assert.equal(ui.selectionTitle.textContent, "dissociation deletion number (2-CoC)");
  assert.equal(new URL(ui.classMapLink.href).searchParams.get("class"), "Bounded dissociation deletion number");
  assert.equal(new URL(context.window.location.href).searchParams.get("parameter"), "dissociation deletion number");
  context.updateSelectionSummary("(2r−1)-merge-width", "(2𝑟-1)-merge-width");
  assert.equal(new URL(ui.classMapLink.href).searchParams.get("class"), "Bounded (2𝑟-1)-merge-width");
});

test("the live homepage alias settings point to real parameters and canonical Class Map nodes", () => {
  const context = fixture();
  vm.runInNewContext(fs.readFileSync(path.join(root, "graph-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(root, "graph-class-example/data.js"), "utf8"), context);
  const data = context.window.GRAPH_DATA;
  const labels = [...new Set([...(data.graph.nodes || []), ...data.graph.edges.flatMap((edge) => [edge.source, edge.target])])];
  const index = context.createParameterNameIndex(labels, data.settings.parameterAliases);
  for (const [alias, canonical] of Object.entries(data.settings.parameterAliases)) {
    assert.equal(index.resolve(alias, false), canonical, alias);
    assert.ok(labels.includes(canonical), canonical);
  }
  assert.equal(index.resolve("2-CoC", false), "dissociation deletion number");
  assert.equal(index.resolve("r-CoC", false), "r-CoC (fixed r ≥ 2)");
  assert.equal(index.resolve("(2𝑟−1)-merge-width", false), "(2𝑟-1)-merge-width");
  assert.equal(index.resolve("r-merge-width", false), null, "the ambiguous bare-r alias must not change the radius");
  assert.equal(index.resolve("𝑟-merge-width", false), null);
  assert.ok(labels.includes("(2𝑟-1)-merge-width"));
  assert.ok(!labels.includes("𝑟-merge-width"));
  assert.ok(!labels.includes("2-CoC"), "a search alias is not an extra equivalent node");
  for (const target of Object.values(data.settings.classMapLabels)) {
    assert.ok(context.window.GRAPH_CLASS_EXAMPLE.classes.includes(target), target);
  }
});
