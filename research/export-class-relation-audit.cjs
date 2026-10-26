const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function buildAudit() {
  const root = path.join(__dirname, "..", "graph-class-example");
  const context = { window: {} };
  for (const file of ["data.js", "relation-sources.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context);
  }
  const graph = context.window.GRAPH_CLASS_EXAMPLE;
  const evidence = context.window.GRAPH_CLASS_RELATION_SOURCES;
  const relations = evidence.records.map((record, index) => {
    const proof = evidence.trace(record.source, record.target, record.type);
    return {
      id: record.id,
      source: record.source,
      target: record.target,
      type: record.type,
      status: proof.kind,
      active: evidence.isActive(index),
      citations: evidence.citations(proof).map((entry) => ({
        sourceId: entry.id,
        locators: entry.locators
      })),
      steps: proof.steps.map((step) => ({
        source: step.source,
        target: step.target,
        type: step.type,
        status: step.kind,
        sourceIds: step.sourceIds,
        locator: step.locator,
        ...(step.sourceLocators ? { sourceLocators: step.sourceLocators } : {})
      })),
      ...(["incorrect", "conditional", "unchecked"].includes(proof.kind)
        ? { reason: record.note } : {})
    };
  });
  const byStatus = {};
  for (const relation of relations) {
    byStatus[relation.status] = (byStatus[relation.status] || 0) + 1;
  }
  const audit = {
    checkedOn: "2026-10-26",
    conventions: {
      scope: "Disconnected graphs are included.",
      distance: "Distance between vertices in different components is infinite.",
      maxLeaf: "Maximum total leaf count of a spanning forest, not maximum component max-leaf.",
      reducedMaxLeaf: "Isolated red vertices do not count as leaves.",
      chordality: "Minimum number of chordal graphs whose edge intersection is the graph.",
      tracks: "Interval-track number and track-layout number are distinct.",
      radiusComparison: "fw_r(G) <= 4^(mw_(2r-1)(G)); the source node is explicitly radius 2r-1, not r.",
      unchecked: "Not verified here; does not assert an open problem or a conjecture."
    },
    counts: {
      classes: graph.classes.length,
      references: Object.keys(evidence.sources).length,
      rawRelations: relations.length,
      supported: relations.filter((relation) => ["paper", "derived", "definition", "elementary"].includes(relation.status)).length,
      excluded: relations.filter((relation) => !relation.active).length,
      unchecked: byStatus.unchecked || 0,
      byStatus
    },
    references: evidence.sources,
    relations
  };
  return JSON.parse(JSON.stringify(audit));
}

if (require.main === module) {
  const audit = buildAudit();
  const destination = path.join(__dirname, "class-relation-audit-2026-10-26.json");
  fs.writeFileSync(destination, `${JSON.stringify(audit, null, 2)}\n`);
  console.log(JSON.stringify(audit.counts, null, 2));
}

module.exports = { buildAudit };
