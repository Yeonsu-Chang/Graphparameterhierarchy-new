const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const context = { window: {} };
for (const file of ["data.js", "relation-sources.js", "complexity-data.js"]) {
  const source = fs.readFileSync(path.join(__dirname, "..", "graph-class-example", file), "utf8");
  vm.runInNewContext(source, context);
}
const data = context.window.GRAPH_CLASS_COMPLEXITY;
const findings = (name, id) => {
  const result = data.getResults(name);
  return [...result.problems, ...result.logic].find((row) => row.id === id).findings;
};
const has = (name, id, status) => findings(name, id).some((result) => result.status === status);

test("all recorded classes resolve, with valid primary-source links", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    const result = data.getResults(name);
    assert.equal(result.problems.length, 20, name);
    assert.equal(new Set(result.problems.map((row) => row.id)).size, 20, name);
    assert.equal(result.logic.length, 3, name);
    for (const row of [...result.problems, ...result.logic]) {
      for (const finding of row.findings) {
        for (const id of finding.sourceIds) {
          assert.ok(data.sources[id], `${name}: missing source ${id}`);
          assert.equal(new URL(data.sources[id][3]).protocol, "https:");
        }
      }
    }
  }
});

test("classical hardness and parameterized algorithms remain distinct", () => {
  assert.ok(has("Planar", "dominating-set", "NP-complete"));
  assert.ok(has("Planar", "dominating-set", "FPT"));
  assert.ok(has("Bipartite", "dominating-set", "W[2]-complete"));
  assert.ok(has("Circle", "dominating-set", "W[1]-hard"));
  assert.ok(has("Interval", "max-cut", "NP-complete"));
  assert.ok(has("Interval", "steiner-tree", "P"));
  assert.ok(has("Strongly chordal", "dominating-set", "P"));
  assert.ok(!has("Strongly chordal", "dominating-set", "NP-complete"));
});

test("formula length remains a parameter even on fixed-width basic classes", () => {
  for (const logic of ["fo", "mso1", "mso2"]) {
    assert.ok(has("Tree", logic, "FPT"));
    assert.ok(!has("Tree", logic, "P"));
  }
  assert.ok(has("Proper interval", "fo", "FPT"));
  assert.ok(has("Proper interval", "mso1", "para-NP-hard"));
  assert.ok(has("Interval", "fo", "AW[*]-complete"));
});

test("equivalent linear parameters share the recorded lower bounds", () => {
  for (const name of ["Bounded linear clique-width", "Bounded linear rank-width", "Bounded linear NLC-width", "Bounded total twin-width"]) {
    assert.ok(has(name, "coloring", "XNLP-complete"));
    assert.ok(has(name, "max-cut", "XNLP-complete"));
  }
});

test("witness-dependent results retain their input requirements", () => {
  assert.ok(findings("Bounded twin-width", "fo").every((result) => result.condition.includes("sequence")));
  assert.ok(findings("Bounded mim-width", "independent-set").every((result) => result.condition.includes("Decomposition")));
  assert.ok(findings("Bounded simultaneous interval number", "dominating-set").every((result) => result.condition.includes("Representation")));
  assert.ok(has("Bounded sim-width", "independent-set", "Quasipolynomial"));
});

test("reduced max-leaf algorithms appear in both problem forms with their witness", () => {
  for (const name of ["Bounded reduced component max-leaf", "Bounded reduced max-leaf"]) {
    for (const id of ["independent-set", "clique", "induced-matching"]) {
      const raw = findings(name, id);
      assert.equal(raw.length, 1, `${name}: ${id}`);
      assert.equal(raw[0].status, "XP");
      assert.equal(raw[0].form, "both");
      for (const form of ["optimization", "decision"]) {
        const result = variantRow(name, form, id).findings.find((finding) => finding.sourceIds.includes("reduced"));
        assert.ok(result, `${name}: ${form}: ${id}`);
        assert.equal(result.parameter, "w");
        assert.equal(result.condition, "Contraction sequence given");
        assert.match(result.locator, /6\.5/);
        assert.notEqual(result.origin, "All graphs");
      }
    }
  }
});

test("sigma-Neighborhood specializations distinguish matching edges and the clique complement", () => {
  const name = "Bounded reduced component max-leaf";
  assert.match(findings(name, "independent-set")[0].explanation, /sigma = \{0\}/);
  assert.match(findings(name, "induced-matching")[0].explanation, /sigma = \{1\}.*2k.*k induced matching edges/);
  const clique = findings(name, "clique")[0];
  assert.match(clique.locator, /complement argument/);
  assert.match(clique.explanation, /complement.*preserves every red graph/);
  assert.ok(!clique.explanation.includes("sigma = {"));
  assert.ok(!findings(name, "matching").some((finding) => finding.sourceIds.includes("reduced")));
});

test("reduced max-leaf structural vertex cover bounds coexist with general parameter-k algorithms", () => {
  const name = "Bounded reduced component max-leaf";
  for (const form of ["optimization", "decision"]) {
    const results = variantRow(name, form, "vertex-cover").findings;
    const structural = results.find((finding) => finding.status === "XP" && finding.parameter === "w");
    assert.ok(structural.sourceIds.includes("reduced"));
    assert.match(structural.inference, /tau\(G\)/);
    assert.equal(structural.condition, "Contraction sequence given");
    assert.equal(results.some((finding) => finding.status === "FPT" && finding.parameter === "k" && finding.origin === "All graphs"), form === "decision");
  }
});

test("the finite-sigma theorem does not classify unrelated problems or wider reduced parameters", () => {
  for (const id of ["dominating-set", ...["connected", "total", "independent"].map((prefix) => `${prefix}-dominating-set`), "coloring", "feedback-vertex-set", "mso1", "mso2"]) {
    assert.ok(!findings("Bounded reduced component max-leaf", id).some((finding) => finding.sourceIds.includes("reduced")), id);
  }
  for (const name of ["All graphs", "Bounded twin-width", "Bounded reduced bandwidth", "Bounded reduced cut-width", "Bounded stretch-width"]) {
    for (const id of ["independent-set", "clique", "induced-matching"]) {
      assert.ok(!findings(name, id).some((finding) => finding.sourceIds.includes("reduced")), `${name}: ${id}`);
    }
  }
});

test("reduced max-leaf width names and the isolated-vertex convention survive display", () => {
  for (const name of ["Bounded reduced component max-leaf", "Bounded reduced max-leaf"]) {
    const results = data.getResults(name);
    const legend = data.getParameterLegend({ ...results, problems: data.getProblemRows(results, "optimization") });
    assert.equal(legend.find((entry) => entry.symbol === "w").description, name.replace(/^Bounded /, ""));
  }
  assert.match(findings("Bounded reduced max-leaf", "independent-set")[0].inference, /max\(1, total max-leaf\)/);
});

test("hardness is not inherited from a superclass to a restricted subclass", () => {
  assert.ok(!has("Bounded sparse twin-width", "independent-set", "NP-hard"));
  assert.ok(!has("Monadically stable bounded twin-width", "coloring", "NP-hard"));
  assert.ok(!has("Bounded modular-width", "coloring", "W[1]-hard"));
});

test("unsettled and unchecked results are not presented as established algorithms", () => {
  assert.ok(has("Monadically dependent", "fo", "Conjectured FPT"));
  assert.ok(findings("Monadically dependent", "fo").every((result) => result.certainty === "conjecture"));
  assert.ok(!has("Monadically dependent", "fo", "FPT"));
  assert.equal(variantRow("Proper interval", "optimization", "max-cut").findings.length, 0);
  assert.equal(findings("Bounded boxicity", "fo").length, 0);
});

test("conjectures have explicit certainty metadata and are not recorded as proved bounds", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    for (const row of [...data.getResults(name).problems, ...data.getResults(name).logic]) {
      for (const finding of row.findings) {
        if (finding.status.startsWith("Conjectured")) assert.equal(finding.certainty, "conjecture", `${name}: ${row.id}`);
        if (finding.certainty === "conjecture") {
          assert.ok(!["P", "FPT", "XP"].includes(finding.status), `${name}: ${row.id}`);
          assert.ok(finding.sourceIds.length, `${name}: ${row.id}`);
        }
      }
    }
  }
});

test("new matching and domination variants use their own results", () => {
  for (const id of ["connected-dominating-set", "total-dominating-set", "independent-dominating-set"]) {
    assert.ok(has("Interval", id, "P"));
    assert.ok(has("Bounded clique-width", id, "FPT"));
  }
  assert.ok(has("Split", "connected-dominating-set", "NP-complete"));
  assert.ok(has("Split", "total-dominating-set", "NP-complete"));
  assert.ok(has("Split", "independent-dominating-set", "P"));
  assert.ok(has("All graphs", "matching", "P"));
  assert.ok(has("Bipartite", "matching", "P"));
  assert.ok(has("Bipartite", "induced-matching", "NP-complete"));
  assert.ok(has("Chordal bipartite", "induced-matching", "P"));
  assert.ok(has("Bounded clique-width", "edge-dominating-set", "XP"));
  assert.ok(has("Bounded clique-width", "edge-dominating-set", "W[1]-hard"));
  assert.ok(!findings("Bounded clique-width", "edge-dominating-set").some((result) => result.status === "FPT" && result.parameter === "w"));
});

test("arbitrary-list coloring is not treated as ordinary or fixed-palette coloring", () => {
  assert.ok(has("Interval", "coloring", "P"));
  assert.ok(has("Interval", "list-coloring", "NP-complete"));
  assert.ok(has("Complete bipartite", "list-coloring", "NP-complete"));
  assert.ok(has("Block", "list-coloring", "P"));
  assert.ok(has("Tree", "list-coloring", "P"));
  assert.ok(has("Bounded tree-width", "list-coloring", "XP"));
  assert.ok(has("Bounded tree-width", "list-coloring", "W[1]-hard"));
  assert.ok(!has("Bounded tree-width", "list-coloring", "FPT"));
  assert.ok(!has("Bounded clique-width", "list-coloring", "FPT"));
});

test("previously unchecked classical cells have primary sources", () => {
  assert.ok(has("Permutation", "max-cut", "NP-complete"));
  assert.ok(has("Line graph", "max-cut", "P"));
  assert.ok(has("Line graph", "clique", "P"));
  assert.ok(has("Circle", "feedback-vertex-set", "P"));
  assert.ok(findings("Circular-arc", "feedback-vertex-set").every((result) => !result.sourceIds.includes("circleFVS")));
  assert.ok(has("Co-comparability", "feedback-vertex-set", "P"));
  assert.ok(has("Circular-arc", "steiner-tree", "P"));
  assert.ok(has("Strongly chordal", "hamiltonian-path", "NP-complete"));
  assert.ok(has("Chordal bipartite", "hamiltonian-path", "NP-complete"));
  assert.ok(has("Chordal", "fo", "AW[*]-complete"));
});

test("known general algorithms prevent unchecked cells without removing class-specific bounds", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    for (const [id, parameter] of [["vertex-cover", "k"], ["longest-path", "k"], ["steiner-tree", "t"], ["feedback-vertex-set", "k"], ["odd-cycle-transversal", "k"], ["edge-dominating-set", "k"], ["max-cut", "k"]]) {
      assert.ok(has(name, id, "P") || findings(name, id).some((result) => result.status === "FPT" && result.parameter === parameter), `${name}: ${id}`);
    }
  }
  assert.ok(has("Planar", "feedback-vertex-set", "NP-complete"));
  assert.ok(has("Planar", "feedback-vertex-set", "FPT"));
  assert.ok(has("Bipartite", "odd-cycle-transversal", "P"));
});

test("isomorphism separates general, bounded-width and special-class bounds", () => {
  assert.ok(has("All graphs", "graph-isomorphism", "Quasipolynomial"));
  assert.ok(has("Perfect", "graph-isomorphism", "Quasipolynomial"));
  for (const name of ["Interval", "Permutation", "Circle", "Planar"]) assert.ok(has(name, "graph-isomorphism", "P"));
  assert.ok(has("Bounded tree-width", "graph-isomorphism", "FPT"));
  assert.ok(has("Bounded clique-width", "graph-isomorphism", "XP"));
  assert.ok(!has("Bounded clique-width", "graph-isomorphism", "FPT"));
  assert.ok(has("Bounded maximum degree", "graph-isomorphism", "XP"));
});

test("distance-zero hardness is transferred only to the larger modulator class", () => {
  for (const name of ["Bounded distance to Chordal", "Bounded distance to Perfect", "Bounded distance to Planar"]) {
    assert.ok(findings(name, "hamiltonian-cycle").some((result) => result.status === "NP-complete" && result.condition === "Already at distance 0"));
  }
  assert.ok(!has("Bounded distance to Linear forest", "hamiltonian-cycle", "NP-complete"));
  assert.ok(!has("Bounded distance to Cograph", "hamiltonian-cycle", "NP-complete"));
});

test("no row combines an unconditional polynomial algorithm with NP-hardness", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    for (const row of data.getResults(name).problems) {
      if (row.findings.some((result) => result.status === "P")) {
        assert.ok(!row.findings.some((result) => ["NP-hard", "NP-complete"].includes(result.status)), `${name}: ${row.id}`);
      }
    }
  }
});

test("the parameter legend follows the selected results and their width parameter", () => {
  const legend = (name) => new Map(data.getParameterLegend(data.getResults(name)).map((entry) => [entry.symbol, entry.description]));
  assert.equal(legend("Bounded tree-width").get("w"), "tree-width");
  assert.equal(legend("Bounded clique-width").get("w"), "clique-width");
  assert.equal(legend("Bounded vertex cover number").get("w"), "vertex cover number");
  assert.equal(legend("Bounded twin-width").get("d"), "twin-width");
  assert.equal(legend("Bounded maximum degree").get("d"), "degree / degeneracy bound");
  assert.equal(legend("Bounded simultaneous interval number").get("d"), "simultaneous interval number");
  assert.ok(!legend("Interval").has("w"));
  assert.ok(!legend("Tree").has("k"));
});

test("every displayed parameter has a definition, including combined expressions", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    const results = data.getResults(name);
    const legend = data.getParameterLegend(results);
    const used = new Set([...results.problems, ...results.logic].flatMap((row) => row.findings.flatMap((finding) => finding.parameter ? finding.parameter.split(/[+,]/).map((symbol) => symbol.trim()) : [])));
    assert.deepEqual(new Set(legend.map((entry) => entry.symbol)), used, name);
    legend.forEach((entry) => assert.ok(entry.description && entry.detail, `${name}: ${entry.symbol}`));
  }
  const k = data.getParameterLegend(data.getResults("All graphs")).find((entry) => entry.symbol === "k");
  assert.match(k.detail, /vertices/);
  assert.match(k.detail, /edges/);
  assert.match(k.detail, /path/);
});

const variants = (name, form) => data.getProblemRows(data.getResults(name), form);
const variantRow = (name, form, id) => variants(name, form).find((row) => row.baseId === id);

test("every graph problem has an explicit decision form and only genuine optimization forms", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    assert.equal(variants(name, "optimization").length, 16, name);
    assert.equal(variants(name, "decision").length, 20, name);
    for (const form of ["optimization", "decision"]) {
      const rows = variants(name, form);
      assert.equal(new Set(rows.map((row) => row.id)).size, rows.length);
      rows.forEach((row) => assert.ok(row.title && row.definition && row.form === form));
    }
  }
  const optimizationIds = new Set(variants("Tree", "optimization").map((row) => row.baseId));
  for (const id of ["hamiltonian-path", "hamiltonian-cycle", "list-coloring", "graph-isomorphism"]) assert.ok(!optimizationIds.has(id));
  assert.throws(() => variants("Tree", "counting"), /Unknown problem form/);
});

test("maximum independent set is not confused with a size-k decision algorithm", () => {
  const optimization = variantRow("Bounded twin-width", "optimization", "independent-set");
  const decision = variantRow("Bounded twin-width", "decision", "independent-set");
  assert.equal(optimization.title, "Maximum Independent Set");
  assert.equal(decision.title, "k-Independent Set");
  assert.equal(decision.threshold, "\u2265 k vertices");
  assert.ok(optimization.findings.some((finding) => finding.status === "NP-hard"));
  assert.ok(!optimization.findings.some((finding) => finding.status === "FPT"));
  assert.ok(decision.findings.some((finding) => finding.status === "FPT" && finding.parameter === "d+k"));
  assert.ok(decision.findings.find((finding) => finding.status === "FPT").condition.includes("sequence"));
  assert.ok(variantRow("Bounded sim-width", "optimization", "independent-set").findings.some((finding) => finding.status === "Quasipolynomial"));
});

test("input thresholds never become optimization parameters or completeness claims", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    for (const row of variants(name, "optimization")) {
      assert.equal(row.parameters.length, 0, `${name}: ${row.id}`);
      for (const finding of row.findings) {
        assert.ok(!finding.status.endsWith("-complete"), `${name}: ${row.id}`);
        assert.ok(!(finding.parameter || "").split(/[+,]/).some((symbol) => ["k", "q"].includes(symbol.trim())), `${name}: ${row.id}`);
      }
    }
  }
  assert.ok(variantRow("Planar", "optimization", "independent-set").findings.some((finding) => finding.status === "NP-hard"));
  assert.ok(variantRow("Planar", "decision", "independent-set").findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"));
  assert.ok(variantRow("Bounded linear clique-width", "optimization", "coloring").findings.some((finding) => finding.status === "XNLP-hard"));
  assert.ok(variantRow("Bounded linear clique-width", "decision", "coloring").findings.some((finding) => finding.status === "XNLP-complete"));
});

test("structural algorithms and terminal-parameterized optimization retain their sources", () => {
  for (const form of ["optimization", "decision"]) {
    const independent = variantRow("Bounded clique-width", form, "independent-set");
    assert.ok(independent.findings.some((finding) => finding.status === "FPT" && finding.parameter === "w"));
    assert.ok(independent.findings.some((finding) => finding.sourceIds.includes("mso")));
    for (const name of ["All graphs", "Planar"]) {
      const steiner = variantRow(name, form, "steiner-tree");
      assert.ok(steiner.findings.some((finding) => finding.status === "FPT" && finding.parameter === "t" && finding.origin === "All graphs"));
    }
  }
  const longest = variantRow("Bounded boxicity", "optimization", "longest-path");
  assert.equal(longest.findings.length, 0);
  assert.ok(variantRow("Bounded boxicity", "decision", "longest-path").findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"));
  assert.ok(variantRow("All graphs", "decision", "longest-path").findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"));
});

test("decision thresholds distinguish minimum sets, paths, edges, colors and terminal counts", () => {
  const rows = new Map(variants("Interval", "decision").map((row) => [row.baseId, row]));
  assert.equal(rows.get("vertex-cover").threshold, "\u2264 k vertices");
  assert.equal(rows.get("edge-dominating-set").threshold, "\u2264 k edges");
  assert.equal(rows.get("longest-path").title, "k-Path");
  assert.equal(rows.get("longest-path").threshold, "\u2265 k vertices");
  assert.equal(rows.get("coloring").title, "q-Coloring");
  assert.equal(rows.get("coloring").threshold, "\u2264 q colors");
  assert.equal(rows.get("steiner-tree").threshold, "\u2264 k edges");
  assert.match(rows.get("steiner-tree").definition, /t denotes the number of terminals/);
  assert.notEqual(rows.get("max-cut").title, "k-Cut");
  assert.match(rows.get("independent-dominating-set").definition, /at most k/);
  assert.equal(rows.get("list-coloring").threshold, "");
});

test("displayed-form legends reflect thresholds even for polynomial-time decisions", () => {
  const legend = (name, form) => new Map(data.getParameterLegend({ problems: variants(name, form), logic: data.getResults(name).logic }).map((entry) => [entry.symbol, entry.description]));
  assert.ok(!legend("Tree", "optimization").has("k"));
  assert.equal(legend("Tree", "decision").get("k"), "size threshold");
  assert.equal(legend("Tree", "decision").get("q"), "number of colors");
  assert.equal(legend("Bounded clique-width", "optimization").get("w"), "clique-width");
  assert.ok(!legend("Bounded twin-width", "optimization").has("k"));
  assert.equal(legend("Bounded twin-width", "decision").get("d"), "twin-width");
});

test("form projection preserves the source catalog and existing uncertainty metadata", () => {
  const results = data.getResults("Proper interval");
  const before = JSON.stringify(results);
  data.getProblemRows(results, "optimization");
  data.getProblemRows(results, "decision");
  assert.equal(JSON.stringify(results), before);
  assert.equal(variantRow("Proper interval", "optimization", "max-cut").findings.length, 0);
  assert.ok(variantRow("Proper interval", "decision", "max-cut").findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"));
  assert.ok(data.getResults("Monadically dependent").logic.find((row) => row.id === "fo").findings.every((finding) => finding.certainty === "conjecture"));
});

test("degenerate domination cites the size-bounded algorithm, not a claw-free theorem", () => {
  const row = variantRow("Bounded degeneracy", "decision", "dominating-set");
  assert.ok(row.findings.some((finding) => finding.sourceIds.includes("degenerateDS")));
  assert.ok(!row.findings.some((finding) => finding.sourceIds.includes("clawDS")));
});

test("independent-set/vertex-cover duality transfers classical and structural bounds, not FPT(k)", () => {
  const optimizationCover = variantRow("Bounded twin-width", "optimization", "vertex-cover");
  assert.ok(optimizationCover.findings.some((finding) => finding.status === "NP-hard" && finding.inference.includes("alpha")));
  for (const form of ["optimization", "decision"]) {
    const simCover = variantRow("Bounded sim-width", form, "vertex-cover");
    assert.ok(simCover.findings.some((finding) => finding.status === "Quasipolynomial" && finding.sourceIds.includes("omim")));
  }
  const independent = variantRow("Bounded boxicity", "decision", "independent-set");
  assert.ok(!independent.findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"));
  assert.ok(variantRow("Bounded boxicity", "decision", "vertex-cover").findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"));
  assert.ok(variantRow("All graphs", "decision", "vertex-cover").findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"));
});

test("all verified clique-width equivalents share algorithms and lower bounds", () => {
  for (const name of ["Bounded clique-width", "Bounded rank-width", "Bounded NLC-width", "Bounded boolean-width", "Bounded component twin-width", "Bounded \u221e-flip-width"]) {
    for (const id of ["independent-set", "clique", "dominating-set", "fo", "mso1"]) assert.ok(has(name, id, "FPT"), `${name}: ${id}`);
    assert.ok(has(name, "coloring", "W[1]-hard"), name);
    assert.ok(has(name, "list-coloring", "NP-complete"), name);
    assert.equal(findings(name, "mso2").length, 0, name);
  }
  const component = findings("Bounded component twin-width", "independent-set").find((finding) => finding.parameter === "w");
  assert.equal(component.parameterName, "component twin-width");
  assert.ok(component.sourceIds.includes("equivalence-twinContractions"));
  assert.ok(component.sourceIds.includes("rankApprox"));
  assert.ok(!component.condition);
  assert.ok(findings("Bounded \u221e-flip-width", "fo").some((finding) => finding.sourceIds.includes("equivalence-flip")));
});

test("treewidth and treedepth equivalents retain their own parameter names", () => {
  for (const name of ["Bounded bramble number", "Bounded branch-width", "Bounded tangle number", "Bounded separation number", "Bounded linkedness", "Bounded well-linked number", "Bounded fractional Hadwiger number", "Bounded strong \u221e-coloring number"]) {
    assert.ok(has(name, "independent-set", "FPT"), name);
    assert.ok(has(name, "mso2", "FPT"), name);
    assert.ok(has(name, "list-coloring", "W[1]-hard"), name);
    assert.equal(findings(name, "independent-set").find((finding) => finding.parameter === "w").parameterName, name.replace(/^Bounded /, ""));
  }
  for (const name of ["Bounded branch-depth", "Bounded weak \u221e-coloring number"]) {
    assert.ok(has(name, "mso2", "FPT"), name);
    assert.ok(!has(name, "list-coloring", "W[1]-hard"), name);
  }
  const linear = findings("Bounded linear rank-width", "coloring").find((finding) => finding.status === "XNLP-complete");
  assert.equal(linear.condition, "Linear expression given");
  assert.equal(linear.parameterName, "supplied linear expression width");
});

test("Hamiltonian Path lower bounds remain in optimization, not beside parameter-k decision results", () => {
  for (const name of ["Planar", "Bipartite", "Chordal", "Bounded distance to Planar"]) {
    const optimization = variantRow(name, "optimization", "longest-path");
    const decision = variantRow(name, "decision", "longest-path");
    assert.ok(optimization.findings.some((finding) => finding.status === "NP-hard" && finding.inference.includes("Hamiltonian Path")), name);
    assert.ok(!decision.findings.some((finding) => finding.status === "NP-complete" && !finding.parameter), name);
    assert.ok(findings(name, "longest-path").some((finding) => finding.status === "NP-complete" && finding.inference.includes("Hamiltonian Path")), name);
    assert.ok(decision.findings.some((finding) => finding.status === "FPT" && finding.parameter === "k"), name);
    assert.ok(!optimization.findings.some((finding) => finding.parameter === "k"), name);
  }
  assert.ok(variantRow("Interval", "optimization", "longest-path").findings.every((finding) => finding.status === "P"));
});

test("unweighted size-k Max-Cut stays available on every class, not unrestricted optimization", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    const decision = variantRow(name, "decision", "max-cut");
    assert.ok(decision.findings.some((finding) => finding.status === "P" || (finding.status === "FPT" && finding.parameter === "k")), name);
    assert.ok(!variantRow(name, "optimization", "max-cut").findings.some((finding) => finding.parameter === "k"), name);
  }
  const elementary = variantRow("All graphs", "decision", "max-cut").findings.find((finding) => finding.parameter === "k");
  assert.equal(elementary.status, "FPT");
  assert.equal(elementary.sourceIds.length, 0);
  assert.match(elementary.explanation, /2k.*4k/);
  assert.equal(variantRow("Proper interval", "optimization", "max-cut").findings.length, 0);
});

test("decision projection excludes optimization-only findings and their attached metadata", () => {
  const results = data.getResults("Bounded boxicity");
  results.problems.find((row) => row.id === "independent-set").findings = [
    { status: "NP-hard", sourceIds: ["twwColor"], form: "optimization", condition: "Optimization-only condition" },
    { status: "FPT", sourceIds: ["mso"], form: "both", parameter: "w", parameterName: "width" },
    { status: "FPT", sourceIds: ["twwFO"], form: "decision", parameter: "k", parameterName: "solution size" }
  ];
  const before = JSON.stringify(results);
  const decision = data.getProblemRows(results, "decision").find((row) => row.baseId === "independent-set");
  assert.equal(decision.findings.length, 2);
  assert.ok(decision.findings.every((finding) => finding.form === "decision"));
  assert.ok(decision.findings.some((finding) => finding.parameter === "w"));
  assert.ok(decision.findings.some((finding) => finding.parameter === "k"));
  assert.ok(!decision.findings.some((finding) => finding.sourceIds.includes("twwColor") || finding.condition === "Optimization-only condition"));
  assert.ok(!decision.findings.some((finding) => finding.status === "NP-complete"));
  const optimization = data.getProblemRows(results, "optimization").find((row) => row.baseId === "independent-set");
  assert.ok(optimization.findings.some((finding) => finding.status === "NP-hard"));
  assert.ok(optimization.findings.some((finding) => finding.parameter === "w"));
  assert.ok(optimization.findings.every((finding) => finding.form === "optimization"));
  assert.equal(JSON.stringify(results), before);
});

test("each displayed finding belongs to its selected form across all classes", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    for (const form of ["optimization", "decision"]) {
      for (const row of variants(name, form)) {
        assert.ok(row.findings.every((finding) => finding.form === form), `${name}: ${row.title}`);
        const keys = row.findings.map((finding) => [finding.status, finding.parameter || "", finding.condition || ""].join("|"));
        assert.equal(new Set(keys).size, keys.length, `${name}: ${row.title}`);
        if (form === "decision") assert.ok(!row.findings.some((finding) => finding.status === "NP-hard"), `${name}: ${row.title}`);
      }
    }
  }
});

test("twin-width size-bounded entries do not reintroduce optimization hardness", () => {
  for (const id of ["independent-set", "vertex-cover", "dominating-set"]) {
    const decision = variantRow("Bounded twin-width", "decision", id);
    const optimization = variantRow("Bounded twin-width", "optimization", id);
    assert.ok(decision.findings.some((finding) => finding.status === "FPT"), id);
    assert.ok(!decision.findings.some((finding) => ["NP-hard", "NP-complete"].includes(finding.status)), id);
    assert.ok(!decision.findings.some((finding) => finding.sourceIds.includes("twwColor") || finding.condition === "Already at twin-width 4"), id);
    assert.equal(optimization.findings.filter((finding) => finding.status === "NP-hard").length, 1, id);
  }
  for (const name of ["Bounded twin-width", "Bounded sparse twin-width", "Monadically stable bounded twin-width"]) {
    for (const id of ["independent-set", "clique", "dominating-set"]) {
      const result = variantRow(name, "decision", id).findings.find((finding) => finding.status === "FPT");
      assert.equal(result.parameter, "d+k");
      assert.ok(result.sourceIds.includes("twwFO") && result.sourceIds.includes("twwAlgorithms"));
      assert.match(result.condition, /sequence/);
      assert.match(result.explanation, /fixed twin-width bound d.*FPT in k/);
    }
  }
});

test("separately verified decision hardness and shared width algorithms remain available", () => {
  assert.ok(variantRow("Bounded twin-width", "decision", "hamiltonian-cycle").findings.some((finding) => finding.status === "NP-complete"));
  assert.ok(variantRow("Bounded clique-width", "decision", "independent-set").findings.some((finding) => finding.status === "FPT" && finding.parameter === "w"));
  assert.ok(variantRow("Bounded clique-width", "decision", "coloring").findings.some((finding) => finding.status === "XP" && finding.parameter === "w"));
});

test("twin-width q-Coloring cites fixed-color decision hardness, not width-3 minimization", () => {
  const decision = variantRow("Bounded twin-width", "decision", "coloring");
  assert.equal(decision.findings.length, 1);
  const finding = decision.findings[0];
  assert.equal(finding.status, "para-NP-complete");
  assert.equal(finding.parameter, "q");
  assert.equal(finding.form, "decision");
  assert.equal(finding.condition, "q = 3; twin-width \u2264 4");
  assert.ok(finding.sourceIds.includes("twwColor"));
  assert.match(finding.explanation, /Section 4, Theorem 2/);
  assert.match(finding.explanation, /Corollary 3/);
  assert.match(finding.explanation, /supplied 4-sequence/);
  assert.match(finding.explanation, /not a fixed-q claim/);
  const optimization = variantRow("Bounded twin-width", "optimization", "coloring");
  assert.equal(optimization.findings.length, 1);
  assert.equal(optimization.findings[0].status, "NP-hard");
  assert.equal(optimization.findings[0].condition, "Already at twin-width 3");
});

test("a threshold decision row prioritizes parameterized bounds without deleting verified classical data", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    for (const row of variants(name, "decision")) {
      if (!row.parameters.length || !row.findings.some((finding) => finding.parameter)) continue;
      assert.ok(!row.findings.some((finding) => finding.status === "NP-complete" && !finding.parameter), `${name}: ${row.title}`);
    }
  }
  assert.ok(has("Planar", "independent-set", "NP-complete"));
  assert.ok(variantRow("Planar", "optimization", "independent-set").findings.some((finding) => finding.status === "NP-hard" && finding.sourceIds.includes("planarHard")));
  assert.ok(variantRow("Planar", "decision", "independent-set").findings.every((finding) => !finding.sourceIds.includes("planarHard")));
  assert.ok(variantRow("Planar", "decision", "hamiltonian-cycle").findings.some((finding) => finding.status === "NP-complete"));
});

test("circular-arc coloring uses the uniform FPT algorithm, not only a fixed-q polynomial claim", () => {
  const decision = variantRow("Circular-arc", "decision", "coloring");
  assert.equal(decision.findings.length, 1);
  assert.equal(decision.findings[0].status, "FPT");
  assert.equal(decision.findings[0].parameter, "q");
  assert.ok(decision.findings[0].sourceIds.includes("hColor"));
  assert.match(decision.findings[0].locator, /Proposition 4\.3/);
  const optimization = variantRow("Circular-arc", "optimization", "coloring");
  assert.equal(optimization.findings.length, 1);
  assert.equal(optimization.findings[0].status, "NP-hard");
  assert.ok(!optimization.findings[0].sourceIds.includes("hColor"));
});

test("simultaneous-interval coloring keeps the q parameter and theorem-40 input conditions", () => {
  const decision = variantRow("Bounded simultaneous interval number", "decision", "coloring");
  assert.equal(decision.findings.length, 1);
  assert.equal(decision.findings[0].status, "FPT");
  assert.equal(decision.findings[0].parameter, "d+q");
  assert.equal(decision.findings[0].locator, "Theorem 40");
  assert.match(decision.findings[0].explanation, /from the graph alone/);
  assert.ok(!decision.findings[0].condition);
  const optimization = variantRow("Bounded simultaneous interval number", "optimization", "coloring");
  assert.equal(optimization.findings.length, 1);
  assert.equal(optimization.findings[0].status, "NP-hard");
  assert.equal(optimization.findings[0].condition, "Already at d = 2");
  const clique = variantRow("Bounded simultaneous interval number", "optimization", "clique");
  assert.ok(clique.findings.some((finding) => finding.status === "FPT" && finding.parameter === "d" && finding.condition === "No representation needed"));
});

test("circle coloring distinguishes the hard q>=4 slices from the quasipolynomial q=3 slice", () => {
  const decision = variantRow("Circle", "decision", "coloring");
  assert.equal(decision.findings.length, 2);
  const hard = decision.findings.find((finding) => finding.status === "para-NP-complete");
  assert.equal(hard.parameter, "q");
  assert.equal(hard.condition, "Fixed q \u2265 4");
  assert.ok(hard.sourceIds.includes("circleColor"));
  const q3 = decision.findings.find((finding) => finding.status === "Quasipolynomial");
  assert.equal(q3.condition, "q = 3");
  assert.ok(!q3.parameter);
  assert.ok(q3.sourceIds.includes("circleThreeColor"));
  assert.match(q3.locator, /Theorem 3\.1/);
  const optimization = variantRow("Circle", "optimization", "coloring");
  assert.ok(optimization.findings.every((finding) => finding.status === "NP-hard" && !finding.parameter && !finding.condition));
  assert.ok(optimization.findings.every((finding) => !finding.sourceIds.includes("circleThreeColor")));
});

test("verified fixed-three-color hardness is explicit and cannot leak into optimization parameterizations", () => {
  for (const name of ["Line graph", "Claw-free", "Planar", "Bounded distance to Planar"]) {
    const decision = variantRow(name, "decision", "coloring");
    const hard = decision.findings.find((finding) => finding.status === "para-NP-complete");
    assert.ok(hard, name);
    assert.equal(hard.parameter, "q", name);
    assert.match(hard.condition, /q = 3/, name);
    if (name.startsWith("Bounded distance")) assert.match(hard.condition, /distance 0/);
    assert.ok(variantRow(name, "optimization", "coloring").findings.some((finding) => finding.status === "NP-hard" && !finding.parameter), name);
  }
});

test("unverified cells have no result objects or attached claims, rather than sourced unchecked placeholders", () => {
  assert.equal(variantRow("Proper interval", "optimization", "max-cut").findings.length, 0);
  assert.ok(variantRow("Proper interval", "decision", "max-cut").findings.some((finding) => finding.status === "FPT" && finding.parameter === "k" && !finding.sourceIds.length));
  assert.ok(!data.sources.properCut);
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    const results = data.getResults(name);
    for (const row of [...results.problems, ...results.logic]) {
      assert.ok(!row.findings.some((finding) => finding.status === "Unchecked"), `${name}: ${row.id}`);
    }
  }
});

test("c-closure algorithms cite their original kernel and algorithm results", () => {
  for (const [id, locator] of [["independent-set", "Proposition 1.3"], ["dominating-set", "Theorem 4.17"]]) {
    const result = variantRow("Bounded \ud835\udc50-closure", "decision", id).findings.find((finding) => finding.status === "FPT");
    assert.equal(result.parameter, "c+k");
    assert.ok(result.sourceIds.includes("closureKernel"));
    assert.equal(result.locator, locator);
  }
});

test("cocomparability Hamiltonian Path cites a path algorithm rather than a cycle-only title", () => {
  assert.ok(variantRow("Co-comparability", "decision", "hamiltonian-path").findings.every((finding) => finding.sourceIds.includes("cocoLongest")));
  assert.ok(variantRow("Co-comparability", "decision", "hamiltonian-cycle").findings.every((finding) => finding.sourceIds.includes("cocoHamilton")));
});

test("general provenance remains separate from structural bounds in all class profiles", () => {
  const expected = new Set(["matching", "vertex-cover", "longest-path", "steiner-tree", "graph-isomorphism", "feedback-vertex-set", "odd-cycle-transversal", "edge-dominating-set", "max-cut"]);
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    for (const form of ["optimization", "decision"]) {
      for (const row of variants(name, form)) {
        row.findings.filter((finding) => finding.origin === "All graphs").forEach((finding) => {
          assert.ok(expected.has(row.baseId), `${name}: ${row.title}`);
          assert.ok(!/[wdr]|\u03c6/.test(finding.parameter || ""), `${name}: ${row.title}`);
          assert.ok(finding.sourceIds.every((id) => !id.startsWith("equivalence-")), `${name}: ${row.title}`);
        });
      }
    }
  }
  const general = variants("All graphs", "decision");
  assert.equal(general.flatMap((row) => row.findings).filter((finding) => finding.origin === "All graphs").length, 9);
  assert.equal(variants("All graphs", "optimization").flatMap((row) => row.findings).filter((finding) => finding.origin === "All graphs").length, 2);
  const cover = variantRow("Bounded clique-width", "decision", "vertex-cover");
  assert.ok(cover.findings.some((finding) => finding.parameter === "k" && finding.origin === "All graphs"));
  assert.ok(cover.findings.some((finding) => finding.parameter === "w" && finding.origin !== "All graphs"));
  assert.ok(variantRow("Bounded twin-width", "decision", "independent-set").findings.every((finding) => finding.origin !== "All graphs"));
  assert.equal(variants("Bounded twin-width", "decision").flatMap((row) => row.findings).filter((finding) => finding.origin === "All graphs").length, 9);
  assert.equal(variants("Bounded twin-width", "optimization").flatMap((row) => row.findings).filter((finding) => finding.origin === "All graphs").length, 2);
});

test("every general parameter-k Vertex Cover result retains its algorithm citation", () => {
  for (const name of context.window.GRAPH_CLASS_EXAMPLE.classes) {
    const decision = variantRow(name, "decision", "vertex-cover");
    decision.findings.filter((finding) => finding.origin === "All graphs" && finding.parameter === "k").forEach((finding) => {
      assert.ok(finding.sourceIds.includes("vertexCover"), name);
    });
    assert.ok(variantRow(name, "optimization", "vertex-cover").findings.every((finding) => !finding.sourceIds.includes("vertexCover")), name);
  }
  const general = variantRow("All graphs", "decision", "vertex-cover").findings.find((finding) => finding.parameter === "k");
  assert.ok(general.sourceIds.includes("vertexCover"));
  assert.equal(general.origin, "All graphs");
  assert.equal(data.sources.vertexCover[1], 2010);
  assert.equal(data.sources.vertexCover[3], "https://doi.org/10.1016/j.tcs.2010.06.026");
});

test("All graphs does not inherit restricted-class results or invented logic bounds", () => {
  assert.ok(context.window.GRAPH_CLASS_EXAMPLE.classes.includes("All graphs"));
  assert.equal(findings("All graphs", "independent-set").length, 0);
  assert.ok(data.getResults("All graphs").logic.every((row) => row.findings.length === 0));
  assert.equal(JSON.stringify(data.getResults("ALL GRAPHS")), JSON.stringify(data.getResults("All graphs")));
});
