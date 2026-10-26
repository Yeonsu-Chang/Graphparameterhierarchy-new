(function () {
  "use strict";
  const relationSources = window.GRAPH_CLASS_RELATION_SOURCES;

  const sources = {
    matching: ["Edmonds", 1965, "Paths, Trees, and Flowers", "https://www.cambridge.org/core/journals/canadian-journal-of-mathematics/article/paths-trees-and-flowers/08B492B72322C4130AE800C0610E0E21"],
    mso: ["Courcelle, Makowsky & Rotics", 2000, "Linear Time Solvable Optimization Problems on Graphs of Bounded Clique-Width", "https://doi.org/10.1007/s002249910009"],
    rankApprox: ["Hlineny & Oum", 2008, "Finding Branch-Decompositions and Rank-Decompositions", "https://doi.org/10.1137/070685920"],
    cwHard: ["Fomin et al.", 2010, "Intractability of Clique-Width Parameterizations", "https://sites.cs.ucsb.edu/~daniello/papers/cliquewidth.pdf"],
    cwCut: ["Fomin et al.", 2014, "Almost Optimal Lower Bounds for Problems Parameterized by Clique-Width", "https://fedorvf.github.io/articles/2014/2014b.pdf"],
    cwHamilton: ["Fomin et al.", 2019, "Clique-width III: Hamiltonian Cycle and the Odd Case of Graph Coloring", "https://fedorvf.github.io/articles/2019/2019h.pdf"],
    perfect: ["Grotschel, Lovasz & Schrijver", 1984, "Polynomial Algorithms for Perfect Graphs", "https://ir.cwi.nl/pub/10054/"],
    splitDS: ["Bertossi", 1984, "Dominating sets for split and bipartite graphs", "https://doi.org/10.1016/0020-0190(84)90126-1"],
    shortCycles: ["Raman & Saurabh", 2008, "Short Cycles Make W-hard Problems Hard", "https://www.imsc.res.in/~vraman/pub/algmcadometc.pdf"],
    chordalBipartiteDS: ["Muller & Brandstadt", 1987, "The NP-completeness of Steiner tree and dominating set for chordal bipartite graphs", "https://doi.org/10.1016/0304-3975(87)90067-3"],
    chordalHamilton: ["Muller", 1996, "Hamiltonian circuits in chordal bipartite graphs", "https://doi.org/10.1016/0012-365X(95)00057-4"],
    chordalBipartiteFVS: ["Kloks, Liu & Poon", 2012, "Feedback vertex set on chordal bipartite graphs", "https://arxiv.org/abs/1104.3915v2"],
    strongDS: ["Farber", 1984, "Domination, independent domination, and duality in strongly chordal graphs", "https://doi.org/10.1016/0166-218X(84)90061-1"],
    arcDS: ["Chang", 1998, "Efficient Algorithms for the Domination Problems on Interval and Circular-Arc Graphs", "https://doi.org/10.1137/S0097539792238431"],
    cocoDS: ["Kratsch & Stewart", 1993, "Domination on Cocomparability Graphs", "https://doi.org/10.1137/0406032"],
    cocoHamilton: ["Deogun & Steiner", 1994, "Polynomial Algorithms for Hamiltonian Cycle in Cocomparability Graphs", "https://doi.org/10.1137/S0097539791200375"],
    cocoLongest: ["Mertzios & Corneil", 2012, "A Simple Polynomial Algorithm for the Longest Path Problem on Cocomparability Graphs", "https://doi.org/10.1137/100793529"],
    arcColor: ["Garey et al.", 1980, "The Complexity of Coloring Circular Arcs and Chords", "https://doi.org/10.1137/0601025"],
    hColor: ["Chaplick & Zeman", 2017, "Combinatorial Problems on H-graphs", "https://arxiv.org/pdf/1706.00575"],
    circleColor: ["Unger", 1988, "On the k-colouring of circle-graphs", "https://link.springer.com/chapter/10.1007/BFb0035832"],
    circleThreeColor: ["E S, Ganian, Lokshtanov & Surianarayanan", 2025, "A Quasi-Polynomial Time Algorithm for 3-Coloring Circle Graphs", "https://arxiv.org/abs/2511.09707"],
    circleIS: ["Gavril", 1973, "Algorithms for a maximum clique and a maximum independent set of a circle graph", "https://doi.org/10.1002/net.3230030305"],
    circleDS: ["Bousquet et al.", 2012, "Parameterized Domination in Circle Graphs", "https://arxiv.org/abs/1205.3728"],
    clawDS: ["Cygan et al.", 2011, "Dominating Set is Fixed Parameter Tractable in Claw-free Graphs", "https://arxiv.org/abs/1011.6239v2"],
    degenerateDS: ["Alon & Gutner", 2009, "Linear Time Algorithms for Finding a Dominating Set of Fixed Size in Degenerated Graphs", "https://doi.org/10.1007/s00453-008-9204-0"],
    edgeColor: ["Holyer", 1981, "The NP-Completeness of Edge-Coloring", "https://doi.org/10.1137/0210055"],
    planarHard: ["Garey, Johnson & Stockmeyer", 1976, "Some simplified NP-complete graph problems", "https://www.math.ucdavis.edu/~deloera/MISC/LA-BIBLIO/trunk/JohnsonDavid2.pdf"],
    planarDS: ["Kikuno, Yoshida & Kakuda", 1980, "The NP-Completeness of the Dominating Set Problem in Cubic Planer Graphs", "https://globals.ieice.org/en_transactions/transactions/10.1587/e63-e_6_443/_p"],
    grid: ["Itai, Papadimitriou & Szwarcfiter", 1982, "Hamilton Paths in Grid Graphs", "https://doi.org/10.1137/0211056"],
    planarCut: ["Hadlock", 1975, "Finding a Maximum Cut of a Planar Graph in Polynomial Time", "https://doi.org/10.1137/0204019"],
    splitCut: ["Bodlaender & Jansen", 1991, "On the complexity of the Maximum Cut problem", "https://ics-archive.science.uu.nl/research/techreps/repo/CS-1991/1991-39.pdf"],
    intervalCut: ["Adhikary et al.", 2021, "Complexity of Maximum Cut on Interval Graphs", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SoCG.2021.7"],
    boolean: ["Bui-Xuan, Telle & Vatshelle", 2013, "Fast dynamic programming for locally checkable vertex subset and vertex partitioning problems", "https://doi.org/10.1016/j.tcs.2013.01.009"],
    modular: ["Gajarsky, Lampis & Ordyniak", 2013, "Parameterized Algorithms for Modular-Width", "https://arxiv.org/abs/1308.2858v2"],
    shrub: ["Gajarsky & Hlineny", 2012, "Faster Deciding MSO Properties of Trees of Fixed Height, and Some Consequences", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FSTTCS.2012.112"],
    mim: ["Fomin, Golovach & Raymond", 2020, "On the tractability of optimization problems on H-graphs", "https://arxiv.org/abs/1709.09737v4"],
    xnlp: ["Bodlaender et al.", 2025, "XNLP-Completeness for Parameterized Problems on Graphs with a Linear Structure", "https://doi.org/10.1007/s00453-024-01274-9"],
    treeInd: ["Dallard et al.", 2024, "Computing Tree Decompositions with Small Independence Number", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ICALP.2024.51"],
    omim: ["Bergougnoux, Korhonen & Razgon", 2023, "New Width Parameters for Independent Set: One-sided-mim-width and Neighbor-depth", "https://arxiv.org/abs/2302.10643v2"],
    treeMu: ["Bodlaender, Fomin & Korhonen", 2026, "Finding sparse induced subgraphs on graphs of bounded induced matching treewidth", "https://arxiv.org/abs/2507.07975"],
    twwFO: ["Bonnet et al.", 2022, "Twin-width I: tractable FO model checking", "https://arxiv.org/abs/2004.14789v3"],
    twwAlgorithms: ["Bonnet et al.", 2021, "Twin-width III: Max Independent Set, Min Dominating Set, and Coloring", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ICALP.2021.35"],
    twwColor: ["Bonnet", 2026, "Coloring Hardness on Low Twin-Width Graphs", "https://arxiv.org/abs/2512.23680v2"],
    merge: ["Dreier & Torunczyk", 2025, "Merge-width and First-Order Model Checking", "https://arxiv.org/abs/2502.18065v2"],
    mergeFast: ["Bonnet et al.", 2026, "Fast Shortest Path in Graphs with Sparse Signed Tree Models and Applications", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ICALP.2026.40"],
    expansion: ["Dvorak, Kral & Thomas", 2013, "Testing first-order properties for subclasses of sparse graphs", "https://arxiv.org/abs/1109.5036v2"],
    nowhere: ["Grohe, Kreutzer & Siebertz", 2017, "Deciding first-order properties of nowhere dense graphs", "https://arxiv.org/abs/1311.3899v2"],
    stable: ["Dreier et al.", 2024, "First-Order Model Checking on Monadically Stable Graph Classes", "https://arxiv.org/abs/2311.18740"],
    intervalFO: ["Ganian et al.", 2015, "FO Model Checking of Interval Graphs", "https://arxiv.org/html/1302.6043v4"],
    geometryFO: ["Hlineny & Pokryvka", 2022, "Twin-width and Limits of Tractability of FO Model Checking on Geometric Graphs", "https://arxiv.org/html/2204.13742v2"],
    dependent: ["Dreier et al.", 2026, "Neighborhood Complexity and Radius-1 Merge-Width in Monadically Dependent Graph Classes", "https://arxiv.org/abs/2607.10941"],
    alpha: ["Fomin et al.", 2026, "Path Cover, Hamiltonicity, and Independence Number: An FPT Perspective", "https://arxiv.org/abs/2403.05943v3"],
    simultaneous: ["Beisegel et al.", 2024, "The Simultaneous Interval Number", "https://arxiv.org/html/2404.10670"],
    closure: ["Kanesh et al.", 2022, "Further Exploiting c-Closure for FPT Algorithms and Kernels for Domination Problems", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.STACS.2022.39"],
    closureKernel: ["Koana, Komusiewicz & Sommer", 2020, "Exploiting c-Closure in Kernelization Algorithms for Graph Problems", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2020.65"],
    colorCoding: ["Alon, Yuster & Zwick", 1995, "Color-Coding", "https://doi.org/10.1145/210332.210337"],
    vertexCover: ["Chen, Kanj & Xia", 2010, "Improved upper bounds for vertex cover", "https://doi.org/10.1016/j.tcs.2010.06.026"],
    steiner: ["Dreyfus & Wagner", 1971, "The steiner problem in graphs", "https://doi.org/10.1002/net.3230010302"],
    intervalSteiner: ["de Figueiredo et al.", 2024, "Parameterized algorithms for Steiner tree and (connected) dominating set on path graphs", "https://doi.org/10.1002/net.22220"],
    msoTree: ["Courcelle", 1990, "The monadic second-order logic of graphs. I. Recognizable sets of finite graphs", "https://doi.org/10.1016/0890-5401(90)90043-H"],
    oct: ["Reed, Smith & Vetta", 2004, "Finding odd cycle transversals", "https://doi.org/10.1016/j.orl.2003.10.009"],
    fvs: ["Iwata & Kobayashi", 2019, "Improved Analysis of Highest-Degree Branching for Feedback Vertex Set", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.IPEC.2019.22"],
    edgeDS: ["Xiao, Kloks & Poon", 2011, "New parameterized algorithms for edge dominating set", "https://arxiv.org/abs/1104.4160"],
    edgeDSHard: ["Yannakakis & Gavril", 1980, "Edge Dominating Sets in Graphs", "https://doi.org/10.1137/0138030"],
    induced: ["Cameron", 1989, "Induced matchings", "https://doi.org/10.1016/0166-218X(92)90275-F"],
    inducedWeak: ["Cameron, Sritharan & Tang", 2003, "Finding a maximum induced matching in weakly chordal graphs", "https://doi.org/10.1016/S0012-365X(02)00803-8"],
    listTree: ["Jansen & Scheffler", 1997, "Generalized coloring for tree-like graphs", "https://doi.org/10.1016/S0166-218X(96)00085-6"],
    listHard: ["Fellows et al.", 2011, "On the complexity of some colorful problems parameterized by treewidth", "https://fedorvf.github.io/articles/2011/2011b.pdf"],
    listUnit: ["Marx", 2006, "Precoloring extension on unit interval graphs", "https://doi.org/10.1016/j.dam.2005.10.008"],
    listBipartite: ["Sahakyan", 2021, "List coloring of block graphs and complete bipartite graphs", "https://rspublisher.org/index.php/ws/article/view/2112"],
    dominationVariants: ["Goyal et al.", 2025, "Parameterized complexity of dominating set variants in almost cluster and split graphs", "https://arxiv.org/html/2405.10556v1"],
    gi: ["Babai", 2016, "Graph Isomorphism in Quasipolynomial Time", "https://people.cs.uchicago.edu/~laci/quasi25.pdf"],
    giTree: ["Lokshtanov et al.", 2017, "Fixed-Parameter Tractable Canonization and Isomorphism Test for Graphs of Bounded Treewidth", "https://doi.org/10.1137/140999980"],
    giRank: ["Grohe & Neuen", 2023, "Canonisation and Definability for Graphs of Bounded Rank Width", "https://arxiv.org/abs/1901.10330v2"],
    giInterval: ["Lueker & Booth", 1979, "A Linear Time Algorithm for Deciding Interval Graph Isomorphism", "https://doi.org/10.1145/322123.322125"],
    giPlanar: ["Hopcroft & Wong", 1974, "Linear time algorithm for isomorphism of planar graphs", "https://doi.org/10.1145/800119.803896"],
    giDegree: ["Luks", 1982, "Isomorphism of graphs of bounded valence can be tested in polynomial time", "https://doi.org/10.1016/0022-0000(82)90009-5"],
    circleFVS: ["Nash", 2026, "A New Simple Algorithm for Computing Maximum Weight Induced Forests in Circle Graphs", "https://doi.org/10.7155/jgaa.v30i1.3137"],
    atFVS: ["Kratsch, Muller & Todinca", 2008, "Feedback vertex set on AT-free graphs", "https://doi.org/10.1016/j.dam.2007.10.006"],
    arcSteiner: ["Bhore et al.", 2019, "Balanced Connected Subgraph Problem in Geometric Intersection Graphs", "https://arxiv.org/abs/1909.03872"],
    permutationCut: ["de Figueiredo et al.", 2023, "MaxCut on permutation graphs is NP-complete", "https://doi.org/10.1002/jgt.22948"],
    lineCut: ["Guruswami", 1999, "Maximum cut on line and total graphs", "https://doi.org/10.1016/S0166-218X(99)00056-6"],
    giCircle: ["Kalisz, Klavik & Zeman", 2019, "Circle Graph Isomorphism in Almost Linear Time", "https://arxiv.org/abs/1908.09151"],
    giPermutation: ["Colbourn", 1981, "On testing isomorphism of permutation graphs", "https://doi.org/10.1002/net.3230110103"],
    atInduced: ["Chang", 2003, "Induced matchings in asteroidal triple-free graphs", "https://doi.org/10.1016/S0166-218X(03)00390-1"],
    planarFVS: ["Kunz et al.", 2022, "Most Classic Problems Remain NP-Hard on Relative Neighborhood Graphs and Their Relatives", "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SWAT.2022.29"]
  };

  const problems = [
    ["independent-set", "Independent Set"],
    ["clique", "Clique"],
    ["vertex-cover", "Vertex Cover"],
    ["dominating-set", "Dominating Set"],
    ["connected-dominating-set", "Connected Dominating Set"],
    ["total-dominating-set", "Total Dominating Set"],
    ["independent-dominating-set", "Independent Dominating Set"],
    ["edge-dominating-set", "Edge Dominating Set"],
    ["coloring", "Coloring"],
    ["list-coloring", "List Coloring"],
    ["hamiltonian-path", "Hamiltonian Path"],
    ["hamiltonian-cycle", "Hamiltonian Cycle"],
    ["longest-path", "Longest Path"],
    ["feedback-vertex-set", "Feedback Vertex Set"],
    ["odd-cycle-transversal", "Odd Cycle Transversal"],
    ["max-cut", "Max-Cut"],
    ["steiner-tree", "Steiner Tree"],
    ["matching", "Maximum Matching"],
    ["induced-matching", "Induced Matching"],
    ["graph-isomorphism", "Graph Isomorphism"]
  ];
  const logics = [["fo", "FO"], ["mso1", "MSO\u2081"], ["mso2", "MSO\u2082"]];
  const problemForms = {
    "independent-set": { optimization: "Maximum Independent Set", decision: "k-Independent Set", threshold: "\u2265 k vertices", symbol: "k", definition: "An independent set with at least k vertices; equivalently, one with exactly k vertices." },
    clique: { optimization: "Maximum Clique", decision: "k-Clique", threshold: "\u2265 k vertices", symbol: "k", definition: "A clique with at least k vertices." },
    "vertex-cover": { optimization: "Minimum Vertex Cover", decision: "k-Vertex Cover", threshold: "\u2264 k vertices", symbol: "k", definition: "A vertex cover with at most k vertices." },
    "dominating-set": { optimization: "Minimum Dominating Set", decision: "k-Dominating Set", threshold: "\u2264 k vertices", symbol: "k", definition: "A dominating set with at most k vertices." },
    "connected-dominating-set": { optimization: "Minimum Connected Dominating Set", decision: "k-Connected Dominating Set", threshold: "\u2264 k vertices", symbol: "k", definition: "A connected dominating set with at most k vertices." },
    "total-dominating-set": { optimization: "Minimum Total Dominating Set", decision: "k-Total Dominating Set", threshold: "\u2264 k vertices", symbol: "k", definition: "A total dominating set with at most k vertices; every vertex has a neighbor in the set." },
    "independent-dominating-set": { optimization: "Minimum Independent Dominating Set", decision: "k-Independent Dominating Set", threshold: "\u2264 k vertices", symbol: "k", definition: "An independent dominating set with at most k vertices; an exactly-k requirement is not assumed." },
    "edge-dominating-set": { optimization: "Minimum Edge Dominating Set", decision: "k-Edge Dominating Set", threshold: "\u2264 k edges", symbol: "k", definition: "An edge dominating set with at most k selected edges." },
    coloring: { optimization: "Minimum Coloring", decision: "q-Coloring", threshold: "\u2264 q colors", symbol: "q", definition: "A proper vertex coloring using at most q colors, where q is part of the input." },
    "list-coloring": { decision: "List Coloring", definition: "A proper coloring from the arbitrary allowed color list supplied for each vertex." },
    "hamiltonian-path": { decision: "Hamiltonian Path", definition: "A path visiting every vertex exactly once; no size parameter k is supplied." },
    "hamiltonian-cycle": { decision: "Hamiltonian Cycle", definition: "A cycle visiting every vertex exactly once; this is not k-Cycle." },
    "longest-path": { optimization: "Longest Path", decision: "k-Path", threshold: "\u2265 k vertices", symbol: "k", definition: "A simple path with at least k vertices, not k edges; equivalently, one with exactly k vertices." },
    "feedback-vertex-set": { optimization: "Minimum Feedback Vertex Set", decision: "k-Feedback Vertex Set", threshold: "\u2264 k vertices", symbol: "k", definition: "Delete at most k vertices to obtain a forest." },
    "odd-cycle-transversal": { optimization: "Minimum Odd Cycle Transversal", decision: "k-Odd Cycle Transversal", threshold: "\u2264 k vertices", symbol: "k", definition: "Delete at most k vertices to obtain a bipartite graph." },
    "max-cut": { optimization: "Maximum Cut", decision: "Max-Cut \u2265 k", threshold: "\u2265 k crossing edges", symbol: "k", definition: "A two-part cut with at least k crossing edges; this is not the k-partition Cut problem." },
    "steiner-tree": { optimization: "Minimum Steiner Tree", decision: "k-Steiner Tree", threshold: "\u2264 k edges", symbol: "k", definition: "A tree containing all supplied terminals with at most k edges; t denotes the number of terminals." },
    matching: { optimization: "Maximum Matching", decision: "k-Matching", threshold: "\u2265 k edges", symbol: "k", definition: "A matching containing at least k edges." },
    "induced-matching": { optimization: "Maximum Induced Matching", decision: "k-Induced Matching", threshold: "\u2265 k edges", symbol: "k", definition: "An induced matching containing at least k edges." },
    "graph-isomorphism": { decision: "Graph Isomorphism", definition: "Whether the two supplied graphs are isomorphic." }
  };

  function getProblemRows(results, form) {
    if (!["optimization", "decision"].includes(form)) throw new Error(`Unknown problem form: ${form}`);
    const rows = results.problems.flatMap((row) => {
      const variant = problemForms[row.id];
      if (!variant[form]) return [];
      const findings = [];
      row.findings.forEach((finding) => {
        const sourceForm = finding.form || "both";
        if (form === "decision" && sourceForm === "optimization") return;
        const parameters = (finding.parameter || "").split(/[+,]/).map((symbol) => symbol.trim());
        // Input-size thresholds are not structural parameters for optimization.
        if (form === "optimization" && parameters.some((symbol) => ["k", "q"].includes(symbol))) return;
        let projected = { ...finding, form, sourceIds: [...finding.sourceIds] };
        if (form === "optimization" && sourceForm === "decision") {
          if (!finding.status.endsWith("-complete")) return;
          projected = {
            ...projected, status: finding.status.replace(/-complete$/, "-hard"),
            inference: [finding.inference, "Decision hardness implies optimization hardness."].filter(Boolean).join(" ")
          };
        }
        const existing = findings.find((known) => known.status === projected.status && known.parameter === projected.parameter && known.condition === projected.condition && known.certainty === projected.certainty);
        if (existing) existing.sourceIds = [...new Set([...existing.sourceIds, ...projected.sourceIds])];
        else findings.push(projected);
      });
      return [{
        id: `${form}-${row.id}`, baseId: row.id, form, title: variant[form], findings,
        definition: form === "decision" ? variant.definition : "Compute an optimum solution, without an input solution-size bound.",
        threshold: form === "decision" ? variant.threshold || "" : "",
        parameters: form === "decision" && variant.symbol ? [variant.symbol] : []
      }];
    });
    const independent = rows.find((row) => row.baseId === "independent-set");
    const cover = rows.find((row) => row.baseId === "vertex-cover");
    // Complementing a solution preserves structural parameters, but not its size k.
    const complementary = independent && cover ? [[independent.findings.slice(), cover], [cover.findings.slice(), independent]] : [];
    for (const [findings, target] of complementary) {
      findings.forEach((finding) => {
        if ((finding.parameter || "").split(/[+,]/).some((symbol) => symbol.trim() === "k")) return;
        if (!["P", "FPT", "XP", "Quasipolynomial"].includes(finding.status) && !/(?:hard|complete)$/.test(finding.status)) return;
        const sameBound = target.findings.some((known) => known.status === finding.status && known.parameter === finding.parameter && known.condition === finding.condition);
        if (sameBound) return;
        target.findings.push({ ...finding, inference: "tau(G) = |V(G)| - alpha(G); solution-size k is not preserved.", explanation: [finding.explanation, "Use tau(G) = |V(G)| - alpha(G)."].filter(Boolean).join(" ") });
      });
    }
    if (form === "decision") {
      rows.forEach((row) => {
        if (!problemForms[row.baseId].symbol) return;
        const hasParameterizedResult = row.findings.some((finding) => finding.parameter && finding.certainty !== "conjecture" && (["FPT", "XP", "Quasipolynomial"].includes(finding.status) || /(?:hard|complete)$/.test(finding.status)));
        // Keep classical hardness in the catalog/optimization view, not beside a parameterized decision result.
        if (hasParameterizedResult) row.findings = row.findings.filter((finding) => finding.status !== "NP-complete" || finding.parameter);
      });
    }
    return rows;
  }
  const dominationProblems = ["connected-dominating-set", "total-dominating-set", "independent-dominating-set"];
  const foSolutionProblems = ["independent-set", "clique", "dominating-set", ...dominationProblems, "induced-matching"];
  const subsetProblems = ["independent-set", "clique", "vertex-cover", "dominating-set", ...dominationProblems, "feedback-vertex-set", "odd-cycle-transversal", "induced-matching", "steiner-tree"];
  const fixedWidthProblems = [...subsetProblems, "edge-dominating-set", "coloring", "hamiltonian-path", "hamiltonian-cycle", "max-cut"];
  const perfectProblems = ["independent-set", "clique", "vertex-cover", "coloring"];

  function normalize(label) {
    return String(label).toLowerCase().replace(/\s+/g, " ").trim();
  }

  function group(names) {
    return new Set(names.map(normalize));
  }

  function getParameterLegend(results) {
    const definitions = {
      k: "size threshold",
      w: "structural parameter",
      t: "number of terminals",
      q: "number of colors",
      r: "modulator size",
      d: "twin-width",
      c: "closure number",
      m: "tree-model label count",
      h: "tree-model height",
      "\u03b1": "independence number",
      "\u03c9": "clique number",
      "\u03b3": "domination number",
      "|\u03c6|": "formula length"
    };
    const used = new Map();
    const exactNames = new Map();
    [...results.problems, ...results.logic].forEach((row) => {
      (row.parameters || []).forEach((symbol) => {
        if (!used.has(symbol)) used.set(symbol, definitions[symbol]);
      });
      row.findings.forEach((finding) => {
        if (!finding.parameter) return;
        finding.parameter.split(/[+,]/).map((symbol) => symbol.trim()).forEach((symbol) => {
          if (!used.has(symbol)) used.set(symbol, definitions[symbol] || finding.parameterName);
        });
        if (["w", "d", "r"].includes(finding.parameter) && finding.parameterName) {
          if (!exactNames.has(finding.parameter)) exactNames.set(finding.parameter, new Set());
          exactNames.get(finding.parameter).add(finding.parameterName);
        }
      });
    });
    return [...used].map(([symbol, description]) => {
      const names = exactNames.get(symbol);
      if (names) description = [...names][0].replace(/\\cap/g, "\u2229");
      if (symbol === "d" && names?.size > 1) description = "degree / degeneracy bound";
      return {
        symbol,
        description,
        detail: symbol === "k"
          ? "At least k vertices or edges for maximization decisions; at most k selected/deleted vertices or edges for minimization decisions. For k-Path, k counts path vertices."
          : description
      };
    });
  }

  const basicTreewidth = group(["Tree", "Forest", "Path", "Linear forest", "Star", "Caterpillar", "Cactus", "Outerplanar", "Series-parallel"]);
  const basicCliquewidth = group(["Cograph", "Threshold", "Trivially perfect", "Cluster", "Co-cluster", "Clique", "Complete bipartite", "Complete multipartite", "Distance-hereditary", "Block", "Ptolemaic"]);
  const bipartite = group(["Bipartite", "Chordal bipartite", "Bipartite permutation", "Bipartite chain", "Complete bipartite", "Forest", "Tree", "Path", "Linear forest", "Star", "Caterpillar", "Grid", "Wall"]);
  const perfect = group(["Perfect", "Comparability", "Meyniel", "Parity", "Weakly chordal", "Chordal", "Split", "Strongly chordal", "Interval", "Proper interval", "Permutation", "Trapezoid", "Co-comparability", "Bipartite permutation", "Bipartite chain", "Split permutation"]);
  const chordal = group(["Chordal", "Split", "Strongly chordal", "Interval", "Proper interval"]);
  const cocomparability = group(["Co-comparability", "Permutation", "Trapezoid", "Interval", "Proper interval", "Bipartite permutation", "Bipartite chain", "Split permutation"]);
  const splitHard = group(["Split", "Chordal", "Perfect", "Comparability", "Meyniel", "Parity", "Weakly chordal", "Bipartite"]);
  const treewidth = group(["Bounded tree-width", "Bounded path-width", "Bounded tree-depth", "Bounded bandwidth", "Bounded cut-width", "Bounded tree bandwidth", "Bounded vertex cover number", "Bounded maximum matching", "Bounded feedback vertex set number", "Bounded feedback edge set number", "Bounded path-width \\cap Bounded max-degree"]);
  const cliquewidth = group(["Bounded clique-width", "Bounded rank-width", "Bounded NLC-width"]);
  const linearCliquewidth = group(["Bounded linear clique-width", "Bounded linear rank-width", "Bounded linear NLC-width", "Bounded total twin-width"]);
  const nearTreewidth = group(["Bounded distance to Linear forest", "Bounded distance to Outerplanar"]);
  const nearCliquewidth = group(["Bounded distance to Clique", "Bounded distance to Cluster", "Bounded distance to Co-Cluster", "Bounded distance to Cograph", "Bounded distance to Block"]);
  const expansion = group(["Bounded expansion", "Bounded polynomial expansion", "Bounded maximum degree", "Bounded genus", "Excluded minor", "Excluded topological minor", "Planar"]);
  const degenerate = group(["Bounded degeneracy", "Bounded arboricity", "Bounded acyclic chromatic number", "Bounded \u210e-index", "Bounded maximum degree"]);
  const structural = group(["Structurally bounded expansion", "Structurally bounded path-width", "Structurally bounded sparse twin-width", "Structurally bounded tree-depth", "Structurally bounded tree-width", "Structurally nowhere dense"]);
  const equivalentProfiles = ["Bounded clique-width", "Bounded linear clique-width", "Bounded tree-width", "Bounded path-width", "Bounded tree-depth", "Bounded vertex cover number", "Bounded cut-width", "Bounded degeneracy"];
  const profileCache = new Map();

  function equivalentProfile(label) {
    if (!relationSources) return null;
    const name = normalize(label);
    if (profileCache.has(name)) return profileCache.get(name);
    let result = null;
    for (const canonical of equivalentProfiles) {
      if (normalize(canonical) === name) break;
      const proof = relationSources.trace(label, canonical, "equivalent");
      if (!["paper", "derived", "elementary", "definition"].includes(proof.kind)) continue;
      result = { canonical, proof };
      break;
    }
    profileCache.set(name, result);
    return result;
  }

  function inheritProfile(label, profile) {
    const results = getResults(profile.canonical);
    const comparisonIds = relationSources.citations(profile.proof).map(({ id, reference }) => {
      const sourceId = `equivalence-${id}`;
      sources[sourceId] = reference;
      return sourceId;
    });
    const parameterName = (label.includes("\\cap") ? profile.canonical : label).replace(/^Bounded\s+/i, "");
    const copy = (rows) => rows.map((row) => ({ ...row, findings: row.findings.map((finding) => {
      if (finding.origin === "All graphs") return { ...finding, sourceIds: [...finding.sourceIds] };
      const parameters = (finding.parameter || "").split(/[+,]/).map((symbol) => symbol.trim());
      let name = finding.parameterName;
      if (parameters.includes("w") && !name?.startsWith("supplied ")) {
        name = parameterName + (parameters.includes("|\u03c6|") ? " and formula length" : "");
      }
      if (parameters.includes("d") && normalize(profile.canonical) === "bounded degeneracy") {
        name = parameterName + (parameters.includes("k") ? " and solution size" : "");
      }
      return {
        ...finding, parameterName: name,
        sourceIds: [...new Set([...finding.sourceIds, ...comparisonIds])],
        origin: finding.origin || profile.canonical,
        inference: [finding.inference, `Functional equivalence with ${profile.canonical}.`].filter(Boolean).join(" ")
      };
    }) }));
    return { problems: copy(results.problems), logic: copy(results.logic) };
  }

  function getResults(label) {
    label = relationSources?.resolveClassLabel(label) || label;
    const profile = equivalentProfile(label);
    if (profile) return inheritProfile(label, profile);
    const name = normalize(label);
    const rows = new Map([...problems, ...logics].map(([id, title]) => [id, { id, title, findings: [] }]));

    function finding(status, sourceIds, options = {}) {
      const parameters = (options.parameter || "").split(/[+,]/).map((symbol) => symbol.trim());
      const form = options.form || (status === "NP-hard" ? "optimization" : status.endsWith("-complete") || parameters.some((symbol) => ["k", "q"].includes(symbol)) ? "decision" : "both");
      return { status, sourceIds, ...options, form };
    }

    function set(ids, status, sourceIds, options = {}) {
      (Array.isArray(ids) ? ids : [ids]).forEach((id) => {
        rows.get(id).findings = [finding(status, sourceIds, options)];
      });
    }

    function add(id, status, sourceIds, options = {}) {
      rows.get(id).findings.push(finding(status, sourceIds, options));
    }

    function parameterized(ids, sourceIds, parameter, parameterName, condition = "") {
      set(ids, "FPT", sourceIds, { parameter, parameterName, condition });
    }

    function applyTreewidth(parameter, parameterName, condition = "") {
      parameterized([...fixedWidthProblems, "longest-path"], ["msoTree", "mso"], parameter, parameterName, condition);
      parameterized(["fo", "mso1", "mso2"], ["msoTree"], parameter + " + |\u03c6|", parameterName + " and formula length", condition);
      set("list-coloring", "XP", ["listTree"], { parameter, parameterName, condition });
      parameterized("graph-isomorphism", ["giTree"], parameter, parameterName);
    }

    function applyCliquewidth(parameter, parameterName, condition = "", fullHardness = false) {
      parameterized(subsetProblems, ["mso", "rankApprox"], parameter, parameterName, condition);
      parameterized(["fo", "mso1"], ["mso", "rankApprox"], parameter + " + |\u03c6|", parameterName + " and formula length", condition);
      set("graph-isomorphism", "XP", ["giRank"], { parameter, parameterName });
      ["coloring", "hamiltonian-path", "hamiltonian-cycle", "max-cut", "edge-dominating-set"].forEach((id) => {
        const refs = id === "coloring" ? ["cwHard"] : ["max-cut", "edge-dominating-set"].includes(id) ? ["cwCut"] : ["cwHamilton"];
        set(id, "XP", refs, { parameter, parameterName, condition });
        if (fullHardness && id !== "hamiltonian-path") add(id, "W[1]-hard", id === "edge-dominating-set" ? ["cwHard"] : refs, { parameter, parameterName, condition });
      });
    }

    // General algorithms remain available unless a class has a specialization.
    set("matching", "P", ["matching"], { origin: "All graphs" });
    set("vertex-cover", "FPT", ["vertexCover"], { parameter: "k", parameterName: "solution size", origin: "All graphs", explanation: "Branching on either endpoint of an uncovered edge already gives an elementary FPT algorithm; the cited paper gives a stronger parameter-k algorithm." });
    set("longest-path", "FPT", ["colorCoding"], { parameter: "k", parameterName: "number of vertices in the requested path", origin: "All graphs" });
    set("steiner-tree", "FPT", ["steiner"], { parameter: "t", parameterName: "number of terminals", origin: "All graphs" });
    set("graph-isomorphism", "Quasipolynomial", ["gi"], { origin: "All graphs" });

    if (basicTreewidth.has(name)) {
      set([...fixedWidthProblems, "longest-path"], "P", ["msoTree", "mso"], { origin: "Constant treewidth" });
      set("list-coloring", "P", ["listTree"], { origin: "Constant treewidth" });
      set("graph-isomorphism", "P", ["giTree"], { origin: "Constant treewidth" });
      parameterized(["fo", "mso1", "mso2"], ["msoTree"], "|\u03c6|", "formula length");
    }
    if (basicCliquewidth.has(name)) {
      set(subsetProblems, "P", ["mso"], { origin: "Constant clique-width" });
      set("coloring", "P", ["cwHard"], { origin: "Constant clique-width" });
      set(["hamiltonian-path", "hamiltonian-cycle"], "P", ["cwHamilton"], { origin: "Constant clique-width" });
      set("max-cut", "P", ["cwCut"], { origin: "Constant clique-width" });
      set("edge-dominating-set", "P", ["cwCut"], { origin: "Constant clique-width" });
      set("graph-isomorphism", "P", ["giRank"], { origin: "Constant rank-width" });
      parameterized(["fo", "mso1"], ["mso"], "|\u03c6|", "formula length");
    }
    if (bipartite.has(name)) {
      set(["independent-set", "vertex-cover"], "P", ["matching"], { explanation: "Bipartite matching and Konig's theorem." });
      set(["clique", "coloring", "max-cut"], "P", [], { explanation: "Directly from a bipartition." });
      set("odd-cycle-transversal", "P", [], { explanation: "The empty set is optimal: the input is already bipartite." });
    }
    if (perfect.has(name)) set(perfectProblems, "P", ["perfect"]);
    if (chordal.has(name)) {
      set(["feedback-vertex-set", "odd-cycle-transversal"], "P", ["treeMu"], { origin: "Tree-independence number 1", explanation: "On chordal graphs, a triangle-free induced subgraph is a forest, so the two deletion optima coincide." });
    }
    if (cocomparability.has(name)) {
      set("dominating-set", "P", ["cocoDS"]);
      set("hamiltonian-path", "P", ["cocoLongest"], { explanation: "A Hamiltonian path exists exactly when a longest path contains all vertices." });
      set("hamiltonian-cycle", "P", ["cocoHamilton"]);
      set("longest-path", "P", ["cocoLongest"]);
      set(dominationProblems, "P", ["cocoDS"]);
      set("feedback-vertex-set", "P", ["atFVS"], { origin: "AT-free superclass" });
      set("induced-matching", "P", ["atInduced"], { origin: "AT-free superclass" });
    }
    if (splitHard.has(name)) {
      set("dominating-set", "NP-complete", ["splitDS"]);
      add("dominating-set", "W[2]-complete", ["shortCycles"], { parameter: "k", parameterName: "solution size" });
    }
    if (["bipartite", "perfect", "comparability", "meyniel", "parity"].includes(name)) {
      set(["hamiltonian-path", "hamiltonian-cycle"], "NP-complete", ["grid"], { origin: "Bipartite subclass" });
    }
    if (["chordal", "split", "strongly chordal", "weakly chordal"].includes(name)) {
      set(["hamiltonian-path", "hamiltonian-cycle"], "NP-complete", ["chordalHamilton"], { origin: "Strongly chordal split subclass" });
    }
    if (["chordal", "split"].includes(name)) set("max-cut", "NP-complete", ["splitCut"]);
    if (["interval", "strongly chordal", "co-comparability", "trapezoid"].includes(name)) {
      set("max-cut", "NP-complete", ["intervalCut"], { origin: "Interval subclass" });
    }
    if (name === "strongly chordal") set(["dominating-set", "independent-dominating-set"], "P", ["strongDS"]);
    if (["chordal bipartite", "bipartite permutation", "bipartite chain"].includes(name)) {
      set("feedback-vertex-set", "P", ["chordalBipartiteFVS"]);
    }
    if (name === "chordal bipartite") {
      set(["dominating-set", "steiner-tree"], "NP-complete", ["chordalBipartiteDS"]);
      set(["hamiltonian-path", "hamiltonian-cycle"], "NP-complete", ["chordalHamilton"]);
    }
    if (["interval", "proper interval", "circular-arc", "proper circular-arc"].includes(name)) {
      set("dominating-set", "P", ["arcDS"]);
    }
    if (["interval", "proper interval"].includes(name)) set("steiner-tree", "P", ["intervalSteiner"]);
    if (name === "chordal") set("steiner-tree", "NP-complete", ["intervalSteiner"]);
    if (["circular-arc", "proper circular-arc"].includes(name)) {
      set(["clique", "independent-set", "vertex-cover"], "P", ["mim"], { origin: "Fixed H-graph" });
      set("steiner-tree", "P", ["arcSteiner"]);
    }
    if (name === "circular-arc") {
      set("coloring", "NP-complete", ["arcColor"]);
      add("coloring", "FPT", ["hColor"], {
        form: "decision", parameter: "q", parameterName: "number of colors", locator: "Proposition 4.3; circular-arc graphs are K3-graphs",
        explanation: "List coloring from a common q-color palette is FPT on each fixed H-graph class, without requiring an H-representation; ordinary q-Coloring is the special case where every list is the whole palette"
      });
    }
    if (name === "circle") {
      set(["clique", "independent-set", "vertex-cover"], "P", ["circleIS"]);
      set("dominating-set", "NP-complete", ["circleDS"]);
      add("dominating-set", "W[1]-hard", ["circleDS"], { parameter: "k", parameterName: "solution size" });
      set("coloring", "NP-hard", ["arcColor"], { form: "optimization" });
      add("coloring", "para-NP-complete", ["circleColor"], {
        form: "decision", parameter: "q", parameterName: "number of colors", condition: "Fixed q \u2265 4", locator: "Main fixed-color hardness theorem",
        explanation: "For every fixed q >= 4, q-Coloring is NP-complete on circle graphs; this does not assert hardness at q = 3"
      });
      add("coloring", "Quasipolynomial", ["circleThreeColor"], {
        form: "decision", condition: "q = 3", locator: "Theorem 3.1; full-palette 3-Coloring case",
        explanation: "The 2025 preprint gives an n^{O(log n)} algorithm specifically for 3-Coloring, not for arbitrary input q"
      });
      set("feedback-vertex-set", "P", ["circleFVS"]);
      set("graph-isomorphism", "P", ["giCircle"]);
    }
    if (["line graph", "claw-free"].includes(name)) {
      set(["independent-set", "vertex-cover"], "P", [name === "line graph" ? "matching" : "clawDS"]);
      set("coloring", "NP-hard", ["edgeColor"], { form: "optimization", explanation: "Vertex coloring of a line graph is edge coloring of its root graph." });
      add("coloring", "para-NP-complete", ["edgeColor"], {
        form: "decision", parameter: "q", parameterName: "number of colors", condition: "q = 3", locator: "Cubic edge-coloring hardness; line-graph reduction",
        explanation: "Distinguishing chromatic index 3 from 4 is NP-hard for cubic graphs. Their line graphs are claw-free, and proper colorings have polynomially checkable certificates"
      });
      parameterized("dominating-set", ["clawDS"], "k", "solution size");
    }
    if (name === "line graph") {
      set("clique", "P", [], { explanation: "In a simple root graph, pairwise incident edges form a star or a triangle; line-graph recognition and reconstruction are polynomial-time." });
      set("max-cut", "P", ["lineCut"]);
    }
    if (name === "planar") {
      set(["independent-set", "vertex-cover"], "NP-complete", ["planarHard"]);
      set("coloring", "NP-hard", ["planarHard"], { form: "optimization" });
      add("coloring", "para-NP-complete", ["planarHard"], {
        form: "decision", parameter: "q", parameterName: "number of colors", condition: "q = 3", locator: "Section 2; Theorems 2.2 and 2.3",
        explanation: "Planar 3-Colorability remains NP-complete even when the maximum degree is at most four"
      });
      set("dominating-set", "NP-complete", ["planarDS"]);
      set(["hamiltonian-path", "hamiltonian-cycle"], "NP-complete", ["grid"]);
      set("max-cut", "P", ["planarCut"]);
      set("clique", "P", [], { explanation: "Every planar clique has at most four vertices." });
      set("graph-isomorphism", "P", ["giPlanar"]);
      set("feedback-vertex-set", "NP-complete", ["planarFVS"], { explanation: "Planar maximum-degree-4 hardness is used in Section 4; membership in NP is immediate." });
    }
    if (["interval", "circular-arc", "chordal", "strongly chordal", "perfect", "weakly chordal", "co-comparability", "trapezoid"].includes(name)) {
      set("fo", "AW[*]-complete", ["intervalFO"], { parameter: "|\u03c6|", parameterName: "formula length", origin: "Interval graphs" });
      set(["mso1", "mso2"], "para-NP-hard", ["intervalFO"], { parameter: "|\u03c6|", parameterName: "formula length", origin: "Unit interval subclass" });
    }
    if (name === "proper interval") {
      parameterized("fo", ["intervalFO"], "|\u03c6|", "formula length");
      set(["mso1", "mso2"], "para-NP-hard", ["intervalFO"], { parameter: "|\u03c6|", parameterName: "formula length" });
    }
    if (["permutation", "circle"].includes(name)) {
      set("fo", "AW[*]-hard", ["geometryFO"], { parameter: "|\u03c6|", parameterName: "formula length", explanation: "The standard model-checking setting allows unary vertex labels." });
    }

    if (["interval", "proper interval"].includes(name)) set("graph-isomorphism", "P", ["giInterval"]);
    if (name === "permutation") set("max-cut", "NP-complete", ["permutationCut"]);
    if (chordal.has(name) || ["weakly chordal", "chordal bipartite", "bipartite permutation", "bipartite chain"].includes(name)) {
      set("induced-matching", "P", ["inducedWeak"]);
    }
    if (["bipartite", "perfect", "comparability", "meyniel", "parity"].includes(name)) {
      set("induced-matching", "NP-complete", ["induced"], { origin: "Bipartite subclass" });
      set("feedback-vertex-set", "NP-complete", ["planarFVS"], { origin: "Bipartite subclass", explanation: "Subdivide every edge of a planar hard instance once. The result is bipartite and subdivision preserves the feedback vertex number (Section 4)." });
    }
    if (["permutation", "bipartite permutation", "bipartite chain", "split permutation"].includes(name)) set("graph-isomorphism", "P", ["giPermutation"]);
    if (["planar", "bipartite", "perfect", "comparability", "meyniel", "parity"].includes(name)) {
      set("edge-dominating-set", "NP-complete", ["edgeDSHard"], { origin: name === "planar" ? "Planar graphs of maximum degree 3" : "Bipartite graphs of maximum degree 3" });
    }
    if (["split", "chordal", "perfect", "weakly chordal"].includes(name)) {
      set(["connected-dominating-set", "total-dominating-set"], "NP-complete", ["dominationVariants"], { origin: "Split subclass", explanation: "The Set Cover reduction in Lemma 3.11 has a clique solution, which is also connected; its total-domination variant is proved explicitly." });
    }
    if (["split", "split permutation"].includes(name)) {
      set("independent-dominating-set", "P", ["dominationVariants"]);
    }
    // Arbitrary input color lists are not covered by the MSO graph-coloring rules.
    if (["cograph", "distance-hereditary", "co-cluster", "complete bipartite", "complete multipartite", "bipartite", "chordal bipartite", "bipartite permutation", "bipartite chain", "permutation", "trapezoid", "co-comparability", "perfect", "comparability", "meyniel", "parity", "weakly chordal"].includes(name)) {
      set("list-coloring", "NP-complete", ["listBipartite"], { origin: "Complete bipartite subclass", explanation: "Already lists of at most three colors per vertex; the total palette is unbounded." });
    }
    if (["proper interval", "interval", "proper circular-arc", "circular-arc", "chordal", "strongly chordal"].includes(name)) {
      set("list-coloring", "NP-complete", ["listUnit"], { origin: "Unit interval subclass", explanation: "Precoloring Extension reduces to List Coloring using singleton lists for precolored vertices." });
    }
    if (name === "block") set("list-coloring", "P", ["listBipartite"]);
    if (["clique", "cluster"].includes(name)) set("list-coloring", "P", ["matching"], { explanation: "For each clique, match its vertices to distinct allowed colors in a bipartite incidence graph." });

    if (treewidth.has(name)) applyTreewidth("w", label.replace(/^Bounded\s+/i, ""));
    if (cliquewidth.has(name)) applyCliquewidth("w", label.replace(/^Bounded\s+/i, ""), "", true);
    if (linearCliquewidth.has(name)) {
      applyCliquewidth("w", label.replace(/^Bounded\s+/i, ""));
      ["coloring", "max-cut"].forEach((id) => {
        add(id, "XNLP-complete", ["xnlp"], { parameter: "w", parameterName: "supplied linear expression width", condition: "Linear expression given" });
      });
    }
    if (name === "bounded tree-width") add("list-coloring", "W[1]-hard", ["listHard"], { parameter: "w", parameterName: "treewidth" });
    if (cliquewidth.has(name) || linearCliquewidth.has(name)) {
      set("list-coloring", "NP-complete", ["listBipartite"], { condition: "Already at constant width", origin: "Complete bipartite subclass" });
    }
    if (nearTreewidth.has(name)) applyTreewidth("r", "modulator size", "Modulator given");
    if (nearCliquewidth.has(name)) applyCliquewidth("r", "modulator size", "Modulator given");
    if (["bounded clique-width \\cap weakly sparse", "bounded linear clique-width \\cap weakly sparse"].includes(name)) {
      applyCliquewidth("w", "clique-width");
    }
    if (["bounded modular-width", "bounded neighborhood diversity"].includes(name)) {
      applyCliquewidth("w", label.replace(/^Bounded\s+/i, ""));
      parameterized(["coloring", "hamiltonian-path", "hamiltonian-cycle"], ["modular"], "w", label.replace(/^Bounded\s+/i, ""));
    }
    if (name === "bounded boolean-width") {
      parameterized(["independent-set", "dominating-set"], ["boolean"], "w", "boolean-width", "Decomposition given");
    }
    if (["bounded shrub-depth", "monadically stable bounded shrub-depth", "bounded shrub-depth \\cap weakly sparse"].includes(name)) {
      parameterized(subsetProblems, ["mso"], "m,h", "tree-model label count m and height h");
      parameterized(["fo", "mso1"], ["shrub"], "m,h,|\u03c6|", "tree-model label count, height and formula length");
    }
    if (["bounded mim-width", "bounded linear mim-width"].includes(name)) {
      ["independent-set", "dominating-set", "feedback-vertex-set"].forEach((id) => {
        set(id, "XP", [id === "feedback-vertex-set" ? "omim" : "mim"], { parameter: "w", parameterName: "mim-width", condition: "Decomposition given" });
        add(id, name === "bounded linear mim-width" ? "XNLP-complete" : "W[1]-hard", ["xnlp"], { parameter: "w", parameterName: "supplied decomposition width", condition: "Decomposition given" });
      });
    }
    if (["bounded tree-independence number", "bounded path-independence number"].includes(name)) {
      set("independent-set", "XP", ["treeInd"], { parameter: "w", parameterName: "tree-independence number", explanation: "No decomposition is required as input." });
      set("feedback-vertex-set", "XP", ["treeMu"], { parameter: "w", parameterName: "tree-independence number" });
      set("odd-cycle-transversal", "XP", ["treeMu"], { parameter: "w", parameterName: "tree-independence number", explanation: "A maximum induced bipartite subgraph has treewidth bounded by twice the bag independence bound." });
      if (name === "bounded tree-independence number") set("dominating-set", "NP-complete", ["splitDS"], { condition: "Already at width 1" });
    }
    if (name === "bounded o-mim-width") {
      set(["independent-set", "feedback-vertex-set"], "XP", ["omim"], { parameter: "w", parameterName: "o-mim-width", condition: "Decomposition given" });
      add("independent-set", "Quasipolynomial", ["omim"], { condition: "No decomposition needed" });
    }
    if (name === "bounded sim-width") set("independent-set", "Quasipolynomial", ["omim"], { explanation: "No decomposition is required as input." });
    if (["bounded twin-width", "bounded sparse twin-width", "monadically stable bounded twin-width"].includes(name)) {
      foSolutionProblems.forEach((id) => {
        const refs = ["independent-set", "clique", "dominating-set"].includes(id) ? ["twwFO", "twwAlgorithms"] : ["twwFO"];
        set(id, "FPT", refs, {
          parameter: "d+k", parameterName: "twin-width d and solution size k", condition: "Contraction sequence given",
          explanation: "For each fixed twin-width bound d, this is FPT in k; the FO formula length is bounded by a function of k"
        });
      });
      if (name === "bounded twin-width") {
        // Keep optimization lower bounds separate from the solution-size FO entries.
        ["independent-set", "dominating-set", "coloring"].forEach((id) => {
          add(id, "NP-hard", ["twwColor"], {
            form: "optimization", condition: id === "coloring" ? "Already at twin-width 3" : "Already at twin-width 4"
          });
        });
        add("coloring", "para-NP-complete", ["twwColor"], {
          form: "decision", parameter: "q", parameterName: "number of colors",
          condition: "q = 3; twin-width \u2264 4",
          explanation: "Section 4, Theorem 2 proves NP-hardness for fixed q = 3, even with a supplied 4-sequence; a proper coloring is an NP certificate. Corollary 3 covers every fixed q >= 3. The width-3 result in Theorem 1 uses an unbounded color budget and is not a fixed-q claim"
        });
        add("hamiltonian-cycle", "NP-complete", ["twwColor"], {
          form: "decision", condition: "Already at twin-width 4",
          explanation: "The cited decision lower bound together with a polynomially verifiable solution certificate gives NP-completeness."
        });
        set(["mso1", "mso2"], "para-NP-hard", ["twwColor"], { condition: "Already at twin-width 4" });
      }
      parameterized("fo", ["twwFO"], "d+|\u03c6|", "twin-width and formula length", "Contraction sequence given");
    }
    if (["bounded merge-width", "monadically stable bounded merge-width"].includes(name)) {
      parameterized("fo", ["merge", "mergeFast"], "|\u03c6|", "formula length on a fixed bounded-merge-width class", "Construction sequence given");
      parameterized(foSolutionProblems, ["merge"], "k", "solution size on a fixed bounded-merge-width class", "Construction sequence given");
    }
    if (expansion.has(name) || name === "nowhere dense") {
      const ref = name === "nowhere dense" ? "nowhere" : "expansion";
      parameterized("fo", [ref], "|\u03c6|", "formula length on a fixed class");
      foSolutionProblems.forEach((id) => {
        if (rows.get(id).findings.some((result) => result.status === "P")) return;
        add(id, "FPT", [ref], { parameter: "k", parameterName: "solution size on a fixed class" });
      });
    }
    if (name.startsWith("monadically stable") || structural.has(name)) {
      parameterized("fo", ["stable"], "|\u03c6|", "formula length on a fixed class");
      foSolutionProblems.forEach((id) => {
        if (rows.get(id).findings.some((result) => result.status === "P")) return;
        add(id, "FPT", ["stable"], { parameter: "k", parameterName: "solution size on a fixed class" });
      });
    }
    if (name === "monadically stable bounded clique-width") applyCliquewidth("w", "clique-width");
    if (name === "monadically stable bounded linear clique-width") applyCliquewidth("w", "linear clique-width");
    if (name === "monadically dependent") {
      set("fo", "Conjectured FPT", ["merge", "dependent"], { certainty: "conjecture", parameter: "|\u03c6|", parameterName: "formula length", explanation: "Conjecture, not a proved algorithmic result. The general FPT statement remains conjectural in the cited work." });
    }
    if (degenerate.has(name)) {
      parameterized("clique", [], "d", "degeneracy", "Degeneracy ordering");
      parameterized("independent-set", [], "d+k", "degeneracy and solution size", "Greedy bound + enumeration");
      if (!expansion.has(name)) parameterized("dominating-set", ["degenerateDS"], "d+k", "degeneracy and solution size");
    }
    if (name === "bounded \ud835\udc50-closure") {
      set("independent-set", "FPT", ["closureKernel"], {
        parameter: "c+k", parameterName: "closure number and solution size", locator: "Proposition 1.3",
        explanation: "The ck^2-vertex kernel yields FPT in c+k"
      });
      set("dominating-set", "FPT", ["closureKernel"], {
        parameter: "c+k", parameterName: "closure number and solution size", locator: "Theorem 4.17",
        explanation: "The stated (ck)^{O(k)} algorithm is FPT in c+k"
      });
    }
    if (["bounded maximum independent set", "bounded clique cover number"].includes(name)) {
      parameterized(["hamiltonian-path", "hamiltonian-cycle"], ["alpha"], "\u03b1", "independence number");
      set(["independent-set", "vertex-cover"], "XP", [], { parameter: "\u03b1", parameterName: "independence number", explanation: "Enumerate independent sets up to the promised bound; vertex cover is their complement." });
    }
    if (name === "bounded maximum clique") set("clique", "XP", [], { parameter: "\u03c9", parameterName: "clique number", explanation: "Enumerate candidate cliques up to the promised bound." });
    if (name === "bounded domination number") set("dominating-set", "XP", [], { parameter: "\u03b3", parameterName: "domination number", explanation: "Enumerate candidate dominating sets up to the promised bound." });
    if (name === "bounded simultaneous interval number") {
      parameterized("clique", ["simultaneous"], "d", "simultaneous interval number", "No representation needed");
      parameterized(["independent-set", "dominating-set"], ["simultaneous"], "d+k", "simultaneous interval number and solution size", "Representation given");
      set("coloring", "NP-complete", ["simultaneous"], { condition: "Already at d = 2" });
      add("coloring", "FPT", ["simultaneous"], {
        form: "decision", parameter: "d+q", parameterName: "simultaneous interval number and number of colors", locator: "Theorem 40",
        explanation: "Theorem 40 solves List q-Coloring from a common q-color palette in q^{O(dq)} n time from the graph alone; ordinary q-Coloring is a special case. Theorem 39 instead uses an unbounded input color budget"
      });
    }

    if (name === "bounded maximum degree") set("graph-isomorphism", "XP", ["giDegree"], { parameter: "d", parameterName: "maximum degree of the two input graphs" });
    if (name === "bounded distance to cluster") {
      parameterized(["dominating-set", "total-dominating-set", "independent-dominating-set"], ["dominationVariants"], "r", "cluster vertex deletion number");
    }
    const distanceBase = new Map([
      ["bounded distance to bipartite", "Bipartite"],
      ["bounded distance to chordal", "Chordal"],
      ["bounded distance to interval", "Interval"],
      ["bounded distance to perfect", "Perfect"],
      ["bounded distance to planar", "Planar"]
    ]).get(name);
    if (distanceBase) {
      // Distance zero includes the whole base class, so hardness transfers upwards.
      const base = getResults(distanceBase);
      [...base.problems, ...base.logic].forEach((row) => {
        const hard = row.findings.filter((result) => /^(?:para-)?NP-(?:hard|complete)$/.test(result.status) || result.status.startsWith("AW[*]"));
        if (hard.length) rows.get(row.id).findings = hard.map((result) => ({ ...result, condition: [result.condition, "Already at distance 0"].filter(Boolean).join("; "), origin: distanceBase }));
      });
    }

    rows.get("hamiltonian-path").findings.forEach((finding) => {
      if (finding.parameter || finding.certainty === "conjecture" || !["NP-hard", "NP-complete"].includes(finding.status)) return;
      const { status, sourceIds, ...options } = finding;
      add("longest-path", status, sourceIds, {
        ...options, inference: "Hamiltonian Path is the k = |V(G)| case of k-Path."
      });
    });

    // A classical lower bound does not cancel an algorithm for a different parameter.
    const generalFPT = [
      ["vertex-cover", ["vertexCover"], "k", "solution size"],
      ["longest-path", ["colorCoding"], "k", "number of vertices in the requested path"],
      ["max-cut", [], "k", "number of crossing edges required"],
      ["steiner-tree", ["steiner"], "t", "number of terminals"],
      ["feedback-vertex-set", ["fvs"], "k", "deletion set size"],
      ["odd-cycle-transversal", ["oct"], "k", "deletion set size"],
      ["edge-dominating-set", ["edgeDS"], "k", "number of selected edges"]
    ];
    generalFPT.forEach(([id, sourceIds, parameter, parameterName]) => {
      const known = rows.get(id).findings;
      if (known.some((result) => result.status === "P" || (result.status === "FPT" && result.parameter === parameter))) return;
      const explanation = {
        "vertex-cover": "Branching on either endpoint of an uncovered edge already gives an elementary FPT algorithm; the cited paper gives a stronger parameter-k algorithm.",
        "max-cut": "If m >= 2k, a cut of at least k edges exists by the random-cut bound. Otherwise at most 4k vertices are incident with edges, so enumerate their bipartitions. This is an unweighted, size-k decision algorithm."
      }[id] || "";
      add(id, "FPT", sourceIds, { parameter, parameterName, origin: "All graphs", explanation });
    });

    function finalize(catalog) {
      return catalog.map(([id]) => {
        const row = rows.get(id);
        const seen = new Set();
        row.findings = row.findings.filter((result) => {
          const key = [result.status, result.parameter || "", result.condition || "", result.form].join("|");
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        return row;
      });
    }

    return { problems: finalize(problems), logic: finalize(logics) };
  }

  window.GRAPH_CLASS_COMPLEXITY = { checkedOn: "2026-10-26", sources, problems, logics, problemForms, getResults, getProblemRows, getParameterLegend };
})();
