(function () {
  "use strict";

  const data = window.GRAPH_CLASS_EXAMPLE;
  const sources = {
    rank: ["Oum & Seymour", 2006, "Approximating clique-width and branch-width", "https://web.math.princeton.edu/~pds/papers/rankwidth/paper.pdf"],
    linear: ["Adler & Kante", 2015, "Linear rank-width and linear clique-width of trees", "https://doi.org/10.1016/j.tcs.2015.04.021"],
    nlc: ["Gurski & Wanke", 2005, "On the relationship between NLC-width and linear NLC-width", "https://doi.org/10.1016/j.tcs.2005.05.018"],
    boolean: ["Bui-Xuan, Telle & Vatshelle", 2011, "Boolean-width of graphs", "https://doi.org/10.1016/j.tcs.2011.05.022"],
    clique: ["Courcelle & Olariu", 2000, "Upper bounds to the clique width of graphs", "https://doi.org/10.1016/S0166-218X(99)00184-5"],
    sparseClique: ["Gurski & Wanke", 2000, "The tree-width of clique-width bounded graphs without K(n,n)", "https://doi.org/10.1007/3-540-40064-8_19"],
    bramble: ["Seymour & Thomas", 1993, "Graph Searching and a Min-Max Theorem for Tree-Width", "https://doi.org/10.1006/jctb.1993.1027"],
    twin: ["Bonnet et al.", 2022, "Twin-width I: tractable FO model checking", "https://arxiv.org/abs/2004.14789v3"],
    twinVariants: ["Baril, Couceiro & Lagerkvist", 2026, "Improved Bounds for Twin-Width Parameter Variants with Algorithmic Applications to Counting Graph Colorings", "https://doi.org/10.1007/s00224-025-10233-y"],
    flip: ["Torunczyk", 2023, "Flip-width: Cops and Robber on dense graphs", "https://arxiv.org/pdf/2302.00352"],
    merge: ["Dreier & Torunczyk", 2025, "Merge-width and First-Order Model Checking", "https://arxiv.org/html/2502.18065v2"],
    shrub: ["Ganian et al.", 2019, "Shrub-depth: Capturing Height of Dense Graphs", "https://arxiv.org/html/1707.00359v4"],
    rankDepth: ["Kwon, McCarty, Oum & Wollan", 2021, "Obstructions for bounded shrub-depth and rank-depth", "https://arxiv.org/abs/1911.00230v3"],
    modular: ["Gajarsky, Lampis & Ordyniak", 2013, "Parameterized Algorithms for Modular-Width", "https://arxiv.org/abs/1308.2858v2"],
    omim: ["Bergougnoux, Korhonen & Razgon", 2023, "New Width Parameters for Independent Set: One-sided-mim-width and Neighbor-depth", "https://arxiv.org/abs/2302.10643v2"],
    simultaneous: ["Beisegel et al.", 2024, "The Simultaneous Interval Number", "https://arxiv.org/html/2404.10670"],
    treeInd: ["Dallard, Milanic & Storgel", 2024, "Treewidth versus Clique Number. II. Tree-Independence Number", "https://arxiv.org/abs/2111.04543"],
    chordal: ["Gavril", 1972, "Algorithms for Minimum Coloring, Maximum Clique, Minimum Covering by Cliques, and Maximum Independent Set of a Chordal Graph", "https://doi.org/10.1137/0201001"],
    tied: ["Harvey & Wood", 2017, "Parameters Tied to Treewidth", "https://arxiv.org/abs/1312.3401v2"],
    branchDepth: ["DeVos, Kwon & Oum", 2020, "Branch-depth: Generalizing tree-depth of graphs", "https://arxiv.org/abs/1903.11988v2"],
    edgeCrossing: ["Chang, Kwon & Lee", 2023, "A new width parameter of graphs based on edge cuts: alpha-edge-crossing width", "https://arxiv.org/abs/2302.04624v3"],
    slim: ["Ganian & Korchemna", 2024, "Slim Tree-Cut Width", "https://doi.org/10.1007/s00453-024-01241-4"],
    treeBandwidth: ["Jacob, Lochet & Paul", 2025, "On a tree-based variant of bandwidth and forbidding simple topological minors", "https://arxiv.org/abs/2502.11674"],
    reduced: ["Bonnet, Chang, Duron, Geniet & Kwon", 2026, "Moderately Beyond Clique-Width: Reduced Component Max-Leaf and Related Parameters", "https://arxiv.org/abs/2604.19138"],
    stretch: ["Bonnet & Duron", 2023, "Stretch-Width", "https://doi.org/10.4230/LIPIcs.IPEC.2023.8"],
    boxAcyclic: ["Esperet & Joret", 2013, "Boxicity of graphs on surfaces", "https://arxiv.org/abs/1107.1953v2"],
    twinSparse: ["Bonnet et al.", 2022, "Twin-width II: small classes", "https://arxiv.org/abs/2006.09877"],
    stableTwin: ["Gajarsky, Pilipczuk & Torunczyk", 2022, "Stable graphs of bounded twin-width", "https://arxiv.org/abs/2107.03711v2"],
    rankStable: ["Nesetril et al.", 2021, "Rankwidth meets stability", "https://arxiv.org/abs/2007.07857"],
    linearStable: ["Nesetril, Ossona de Mendez, Rabinovich & Siebertz", 2020, "Linear rankwidth meets stability", "https://arxiv.org/abs/1911.07748"],
    polyChi: ["Bonamy & Pilipczuk", 2020, "Graphs of bounded cliquewidth are polynomially chi-bounded", "https://arxiv.org/abs/1910.00697"],
    vcTree: ["Paszke & Pilipczuk", 2020, "VC Density of Set Systems Definable in Tree-Like Graphs", "https://doi.org/10.4230/LIPIcs.MFCS.2020.78"],
    vcSparse: ["Pilipczuk, Siebertz & Torunczyk", 2018, "On the number of types in sparse graphs", "https://arxiv.org/abs/1705.09336"],
    structuralExpansion: ["Gajarsky et al.", 2020, "First-Order Interpretations of Bounded Expansion Classes", "https://doi.org/10.1145/3382093"],
    layouts: ["Dujmovic, Morin & Wood", 2005, "Layout of Graphs with Bounded Tree-Width", "https://arxiv.org/abs/cs/0406024"],
    treePages: ["Ganley & Heath", 2001, "The pagenumber of k-trees is O(k)", "https://doi.org/10.1016/S0166-218X(00)00178-5"],
    properChordal: ["Paul & Protopapas", 2024, "Tree-Layout Based Graph Classes: Proper Chordal Graphs", "https://doi.org/10.4230/LIPIcs.STACS.2024.55"],
    vertexMinors: ["Oum", 2005, "Rank-width and vertex-minors", "https://doi.org/10.1016/j.jctb.2005.03.003"],
    trackLayouts: ["Dujmovic, Por & Wood", 2004, "Track Layouts of Graphs", "https://arxiv.org/abs/cs/0407033"],
    surfaceStack: ["Malitz", 1994, "Genus g Graphs Have Pagenumber O(sqrt(g))", "https://doi.org/10.1006/jagm.1994.1028"],
    perfect: ["Chudnovsky, Robertson, Seymour & Thomas", 2006, "The strong perfect graph theorem", "https://annals.math.princeton.edu/2006/164-1/p02"],
    ptolemaic: ["Howorka", 1981, "A characterization of ptolemaic graphs", "https://doi.org/10.1002/jgt.3190050314"],
    thin: ["Mannino & Oriolo", 2002, "Solving Stability Problems on a Superclass of Interval Graphs", "https://optimization-online.org/2002/04/465/"],
    expansion: ["Nesetril & Ossona de Mendez", 2008, "Grad and classes with bounded expansion I. Decompositions", "https://doi.org/10.1016/j.ejc.2006.07.013"],
    treePartitions: ["Bodlaender, Groenland & Jacob", 2024, "On the parameterized complexity of computing tree-partitions", "https://dmtcs.episciences.org/15047"],
    circleOuter: ["Wessel & Poschel", 1985, "On circle graphs", "https://wwwpub.zih.tu-dresden.de/~poesch-r/poePUBLICATIONSpdf/1985_Wessel_Poe.pdf"],
    distanceHereditary: ["Bandelt & Mulder", 1986, "Distance-hereditary graphs", "https://doi.org/10.1016/0095-8956(86)90043-2"],
    meanGirth: ["Bekkai & Kouider", 2010, "On mean distance and girth", "https://arxiv.org/abs/0806.1438"],
    transductions: ["Braunfeld, Nesetril, Ossona de Mendez & Siebertz", 2025, "On first-order transductions of classes of graphs", "https://lmcs.episciences.org/15918"],
    sparsity: ["Nesetril & Ossona de Mendez", 2012, "Sparsity: Graphs, Structures, and Algorithms", "https://doi.org/10.1007/978-3-642-27875-4"]
  };

  function normalize(label) {
    return String(label).trim().toLowerCase().replace(/\s+/g, " ");
  }

  function resolveClassLabel(label) {
    const bare = normalize(label).replace(/^bounded\s+/, "");
    const replacement = data.labelAliases?.[bare];
    return replacement ? `Bounded ${replacement}` : label;
  }

  function key(source, target, type = "subset") {
    const ends = [normalize(source), normalize(target)];
    if (type === "equivalent") ends.sort();
    return JSON.stringify([type, ...ends]);
  }

  const evidence = new Map();
  function record(pairs, type, kind, sourceIds, locator, note) {
    const sourceLocators = typeof locator === "object" ? locator : undefined;
    pairs.forEach(([source, target]) => evidence.set(key(source, target, type), {
      kind, sourceIds, locator: sourceLocators ? Object.values(sourceLocators).join("; ") : locator,
      ...(sourceLocators ? { sourceLocators } : {}), note, checkedOn: "2026-10-26"
    }));
  }
  function paper(pairs, sourceIds, locator, note, type = "subset") {
    record(pairs, type, "paper", sourceIds, locator, note);
  }
  function elementary(pairs, note, type = "subset") {
    record(pairs, type, "elementary", [], "Elementary argument", note);
  }

  paper([["Bounded clique-width", "Bounded rank-width"]], ["rank"], "Proposition 6.3 (author version)", "rw(G) <= cw(G) <= 2^(rw(G)+1) - 1. This is functional equivalence, not equality of parameter values.", "equivalent");
  paper([["Bounded clique-width", "Bounded NLC-width"]], ["nlc", "shrub"], { nlc: "NLC expression comparisons", shrub: "Section 2, width comparisons" }, "NLC-width(G) <= cw(G) <= 2 NLC-width(G).", "equivalent");
  paper([["Bounded clique-width", "Bounded boolean-width"]], ["boolean"], "Width comparisons", "Boolean-width and clique-width are bounded on exactly the same graph classes.", "equivalent");
  paper([["Bounded linear clique-width", "Bounded linear NLC-width"]], ["nlc"], "Linear expression definitions and simulations", "The linear NLC and clique-width expression models simulate one another with a bounded number of labels.", "equivalent");
  paper([["Bounded linear clique-width", "Bounded linear rank-width"]], ["linear"], "Introduction, linear width comparisons", "Linear clique-width and linear rank-width are bounded on exactly the same graph classes.", "equivalent");
  paper([["Bounded linear rank-width", "Bounded total twin-width"]], ["linear", "twinVariants"], { linear: "Introduction, linear width comparisons", twinVariants: "Section 3.3" }, "Linear rank-width is functionally equivalent to linear clique-width, which is functionally equivalent to total twin-width. This entry combines those two results.", "equivalent");
  paper([["Bounded clique-width", "Bounded component twin-width"]], ["twinVariants"], "Sections 1 and 3", "The paper gives linear bounds between clique-width and component twin-width.", "equivalent");
  paper([["Bounded clique-width", "Bounded twin-width"]], ["twin", "boolean"], { twin: "Section 4, Theorem 3", boolean: "Width comparisons" }, "A boolean-width bound yields a twin-width bound. Combine this with the functional equivalence of boolean-width and clique-width.");
  paper([["Bounded tree-width", "Bounded clique-width"]], ["clique"], "Tree-width upper bound", "Clique-width is bounded by a function of treewidth; the converse does not hold in general.");
  paper([["Bounded clique-width \\cap Weakly sparse", "Bounded tree-width"]], ["sparseClique", "clique"], { sparseClique: "Excluded-biclique treewidth bound", clique: "Tree-width upper bound" }, "If cw(G) <= k and G excludes K(t,t) as a subgraph, then tw(G) <= 3k(t-1)-1. In the reverse direction bounded treewidth gives bounded clique-width and excludes a fixed biclique.", "equivalent");
  paper([["Bounded bramble number", "Bounded tree-width"]], ["bramble"], "Treewidth duality theorem", "The maximum order of a bramble is tw(G)+1. Here bramble number means this maximum order.", "equivalent");
  paper([["Bounded \u221e-flip-width", "Bounded clique-width"]], ["flip", "rank"], { flip: "Section 5.3, Theorem 5.17 (2024 full version)", rank: "Proposition 6.3 (author version)" }, "Infinite-radius flip-width and rank-width, hence clique-width, are functionally equivalent.", "equivalent");
  paper([["Bounded flip-width", "Monadically dependent"]], ["flip"], "Corollary 8.4", "Classes of bounded flip-width are monadically dependent. The reverse implication is not asserted.");
  paper([["Bounded flip-width \\cap Weakly sparse", "Bounded expansion"]], ["flip"], "Theorem 6.3 (2024 full version)", "Bounded flip-width plus exclusion of a fixed biclique as a subgraph characterizes bounded expansion.", "equivalent");
  paper([["Monadically dependent \\cap Weakly sparse", "Nowhere dense"]], ["flip"], "Fact 10.4 and Theorem 10.9", "Within weakly sparse classes, monadic dependence is equivalent to nowhere denseness.", "equivalent");
  paper([["Monadically stable \\cap Weakly sparse", "Nowhere dense"]], ["flip"], "Section 10.1, Facts 10.4-10.5", "Nowhere dense classes are monadically stable. Conversely, monadic stability implies monadic dependence, which characterizes nowhere denseness in the weakly sparse setting.", "equivalent");
  paper([["Structurally nowhere dense", "Monadically stable"]], ["flip"], "Section 10.1", "Monadic stability is preserved under FO transductions, and nowhere dense classes are monadically stable.");
  paper([["Bounded twin-width", "Bounded merge-width"]], ["merge"], "Theorem 1.4; Lemma 7.2", "Bounded twin-width gives bounded radius-r merge-width for every fixed r. No converse is claimed.");
  paper([["Bounded merge-width", "Bounded flip-width"]], ["merge"], "Theorem 1.7; Theorem 7.6", "A class with bounded radius-r merge-width for every fixed r has bounded radius-r flip-width for every fixed r. The reverse implication is not asserted.");
  paper([["Bounded twin-width", "Bounded (2\ud835\udc5f-1)-merge-width"]], ["merge"], "Lemma 7.2", "A contraction sequence gives a merge sequence of width bounded in terms of twin-width and any fixed radius, including 2r-1.");
  paper([["Bounded (2\ud835\udc5f-1)-merge-width", "Bounded \ud835\udc5f-flip-width"]], ["merge"], "Theorem 7.6", "For every positive integer r, fw_r(G) <= 4^(mw_(2r-1)(G)). The source node uses radius 2r-1; no same-radius comparison is asserted.");
  paper([["Bounded tree-depth", "Bounded shrub-depth"]], ["shrub"], "Proposition 3(a)", "Classes of bounded tree-depth have bounded shrub-depth.");
  paper([["Bounded shrub-depth", "Bounded linear clique-width"]], ["shrub"], "Proposition 3(b)", "A tree-model of height d with m labels gives a linear expression with m(d+1) labels.");
  paper([["Bounded shrub-depth", "Bounded rank-depth"]], ["rankDepth"], "Introduction; bounded rank-depth/shrub-depth equivalence", "Rank-depth and shrub-depth are bounded on the same graph classes.", "equivalent");
  paper([["Bounded modular-width", "Bounded clique-width"], ["Bounded neighborhood diversity", "Bounded modular-width"]], ["modular"], "Parameter comparisons", "Modular-width generalizes neighborhood diversity and bounds clique-width.");
  paper([["Bounded mim-width", "Bounded o-mim-width"], ["Bounded o-mim-width", "Bounded sim-width"]], ["omim"], "Definitions and parameter hierarchy", "The cut measures satisfy sim <= o-mim <= mim; the same inequalities hold after minimizing over decompositions.");
  paper([["Bounded simultaneous interval number", "Bounded path-independence number"]], ["simultaneous"], "Corollary 17", "The path-independence number is at most the simultaneous interval number.");
  paper([["Bounded simultaneous interval number", "Bounded thinness"]], ["simultaneous"], "Theorem 13", "thin(G) <= 2^si(G).");
  paper([["Bounded edge clique cover number", "Bounded simultaneous interval number"]], ["simultaneous"], "Theorem 22; Corollary 23", "si(G) <= ecc(G), using the paper's edge clique cover convention.");
  paper([["Bounded path-width", "Bounded simultaneous interval number"]], ["simultaneous"], "Theorem 19", "si(G) <= pw(G)^2 + pw(G).");
  paper([["Bounded simultaneous interval number", "Bounded interval track number"]], ["simultaneous"], "Theorem 11", "Use the interval-track interpretation of t(G), not track layouts.");
  elementary([["Bounded interval track number", "Bounded interval number"]], "Place the tracks in disjoint ranges on one line. Each vertex uses at most one interval per track.");
  paper([["Chordal", "Perfect"]], ["chordal"], "Chordal coloring and clique algorithms", "Every induced subgraph of a chordal graph has chromatic number equal to its clique number.");
  paper([["Bounded tree-width", "Bounded tree-independence number"]], ["treeInd"], "Definition of tree-independence number", "Every bag of a width-w tree decomposition has independence number at most w+1.");

  elementary([["Bounded linear clique-width", "Bounded clique-width"], ["Bounded path-width", "Bounded tree-width"], ["Bounded linear mim-width", "Bounded mim-width"], ["Bounded path-independence number", "Bounded tree-independence number"]], "A linear/path decomposition is a restricted tree decomposition. Dropping that restriction cannot increase the minimum width.");
  elementary([["Bounded maximum matching", "Bounded vertex cover number"]], "nu(G) <= tau(G) <= 2 nu(G): every cover meets each matching edge, and the endpoints of a maximum matching form a vertex cover.", "equivalent");
  elementary([["Bounded arboricity", "Bounded degeneracy"]], "If arboricity is a, every subgraph has a vertex of degree at most 2a-1. Conversely a degeneracy ordering partitions the edges into at most d forests, so arboricity <= degeneracy.", "equivalent");
  elementary([["Bounded degeneracy", "Bounded chromatic number"]], "Greedy coloring in reverse degeneracy order uses at most d+1 colors.");
  elementary([["Bounded maximum degree", "Bounded degeneracy"], ["Bounded maximum degree", "Bounded chromatic number"]], "Every subgraph has maximum degree at most Delta, so degeneracy <= Delta and greedy coloring uses at most Delta+1 colors.");
  elementary([["Bounded degeneracy", "Bounded average degree"]], "A degeneracy ordering orients every edge with outdegree at most d, giving |E(G)| <= d|V(G)| and average degree at most 2d.");
  elementary([["Bounded average degree", "Bounded minimum degree"]], "The minimum degree does not exceed the average degree.");
  elementary([["Bounded diameter", "Bounded average distance"], ["Bounded diameter", "Bounded max diameter of components"]], "Every finite pair distance and every component diameter is at most the graph diameter. Infinite distances between components do not affect this implication from bounded graph diameter.");
  elementary([["Bounded maximum degree", "Bounded \ud835\udc50-closure"]], "Two nonadjacent vertices have at most Delta common neighbors, so the graph is (Delta+1)-closed.");
  elementary([["Bounded chromatic number", "Bounded maximum clique"]], "Every vertex of a clique must receive a different color, so omega(G) <= chi(G).");
  elementary([["Bounded chromatic number", "Bounded cochromatic number"], ["Bounded clique cover number", "Bounded cochromatic number"]], "A coloring partitions vertices into independent sets; a clique cover partitions them into cliques. Both are permitted in a cochromatic partition.");
  elementary([["Bounded clique cover number", "Bounded maximum independent set"]], "An independent set contains at most one vertex from each clique in a clique cover.");
  elementary([["Bounded maximum independent set", "Bounded domination number"]], "Every maximal independent set is dominating; in particular the domination number is at most the independence number.");
  elementary([["Bounded maximum independent set", "Bounded maximum induced matching"]], "Choosing one endpoint of each edge of an induced matching gives an independent set of the same cardinality.");
  elementary([["Bounded vertex cover number", "Bounded maximum induced matching"]], "An induced matching is a matching, and every matching has size at most the vertex cover number.");
  elementary([["Bounded vertex cover number", "Bounded tree-depth"]], "Place a vertex cover of size k on a rooted path and attach every remaining vertex below it. Its closure contains G and has height at most k+1.");
  elementary([["Bounded vertex cover number", "Bounded neighborhood diversity"]], "Outside a vertex cover of size k, vertices with the same neighborhood in the cover form one type. There are at most 2^k such types and at most k additional cover vertices.");
  elementary([["Bounded vertex cover number", "Bounded twin-cover"]], "Every vertex cover is a twin-cover: there are no edges left outside it.");
  elementary([["Bounded twin-cover", "Bounded distance to Cluster"]], "After deleting a twin-cover, every remaining edge joins true twins, so each remaining component is a clique.");
  elementary([["Bounded feedback edge set number", "Bounded feedback vertex set number"]], "Choose one endpoint of each edge in a feedback edge set. Deleting the chosen vertices removes every cycle.");
  elementary([["Bounded feedback vertex set number", "Bounded distance to Bipartite"], ["Bounded feedback vertex set number", "Bounded distance to Chordal"], ["Bounded feedback vertex set number", "Bounded distance to Outerplanar"]], "Deleting a feedback vertex set leaves a forest; forests are bipartite, chordal and outerplanar.");
  elementary([["Bounded distance to Linear forest", "Bounded feedback vertex set number"]], "A linear forest is a forest, so a deletion set to a linear forest is also a feedback vertex set.");
  elementary([["Bounded tree-depth", "Bounded path-width"]], "Traverse a witnessing rooted forest depth first and use root-to-current-vertex ancestor sets as bags. Each bag has at most td(G) vertices.");
  elementary([["Bounded crossing number", "Bounded genus"]], "Each crossing in a drawing can be eliminated by adding a handle, giving a genus bound in terms of the crossing number.");
  elementary([["Bounded geometric thickness", "Bounded thickness"], ["Bounded stack number", "Bounded geometric thickness"]], "Straight-line planar layers are planar layers. For a stack layout, place the spine vertices on a convex curve: each page becomes a crossing-free straight-line layer.");
  elementary([["Bounded thickness", "Bounded average degree"]], "A union of k planar layers has at most 3k|V(G)| edges, so its average degree is at most 6k.");
  record([["Bounded merge-width", "Bounded (2\ud835\udc5f-1)-merge-width"], ["Bounded flip-width", "Bounded \ud835\udc5f-flip-width"]], "subset", "definition", [], "Radius quantifiers", "The source requires a width bound for every fixed radius. In particular, it supplies a bound for the target radius, whether r or 2r-1. The reverse implication for a single radius is not asserted.");

  const elementaryClasses = [
    ["Bipartite", "Comparability", "Orient all edges from one side of a bipartition to the other. There is no directed two-edge path, so the orientation is transitive."],
    ["Bipartite", "Perfect", "Every induced subgraph is bipartite. Its chromatic and clique numbers are both 2 when it has an edge, and both 1 when nonempty and edgeless."],
    ["Bipartite", "Bounded chromatic number", "A bipartition is a proper coloring with at most two colors."],
    ["Forest", "Bipartite", "Color vertices by the parity of their distance from the root in each tree component."],
    ["Forest", "Chordal", "A forest contains no cycle, hence no induced cycle of length at least four."],
    ["Forest", "Outerplanar", "Every forest admits a planar drawing with all vertices incident with the outer face."],
    ["Interval", "Chordal", "In any induced subgraph, an interval with the earliest right endpoint is simplicial. A graph with this elimination ordering is chordal."],
    ["Interval", "Circular-arc", "Embed the interval representation into a proper subarc of a circle, leaving an unused point."],
    ["Interval", "Co-comparability", "Orient nonedges from the interval lying completely on the left to the one on the right. This is a transitive orientation of the complement."],
    ["Interval", "Trapezoid", "Represent each interval by a rectangle between two parallel lines, with identical top and bottom intervals."],
    ["Line graph", "Claw-free", "The neighbors of a vertex representing edge uv lie in the union of the two cliques of edges incident with u or v. They cannot contain three pairwise nonadjacent vertices."],
    ["Split", "Chordal", "In a split partition, vertices in the independent set cannot form consecutive edges of a hole; two nonconsecutive clique vertices would give a chord."],
    ["Cluster", "Cograph", "A cluster graph is a disjoint union of cliques, hence can be built by the disjoint-union and join operations defining cographs."],
    ["Co-cluster", "Cograph", "Cographs are closed under complementation, and the complement of a co-cluster graph is a disjoint union of cliques."],
    ["Cograph", "Bounded clique-width", "Use disjoint union and complete join recursively along a cotree. Two labels suffice to implement those operations."],
    ["Cograph", "Distance-hereditary", "A cograph has no induced P4. Every connected induced subgraph therefore has diameter at most two, preserving all distances of its vertices."],
    ["Distance-hereditary", "Parity", "Every induced path is a shortest path by distance heredity, so all induced paths with the same endpoints have the same length and parity."],
    ["Planar", "Bounded crossing number", "A planar graph has a drawing with no crossings."],
    ["Planar", "Bounded genus", "Planar graphs have genus zero."],
    ["Planar", "Excluded minor", "Planarity is minor-closed and K5 is nonplanar, so planar graphs exclude K5 as a minor."],
    ["Grid", "Bipartite", "The parity of the sum of integer coordinates is a bipartition of a grid or any of its subgraphs."],
    ["Grid", "Bounded maximum degree", "Every vertex in a two-dimensional square grid has degree at most four."],
    ["Grid", "Planar", "Draw grid edges as their horizontal and vertical unit segments."],
    ["Wall", "Planar", "An elementary wall is obtained from a planar grid by edge and vertex deletions; subdivision preserves planarity."],
    ["Wall", "Bounded maximum degree", "Elementary walls are subcubic, and subdivisions preserve the maximum-degree bound three."],
    ["Wall", "Bounded crossing number", "A wall has a planar drawing, so its crossing number is zero."],
    ["Perfect", "Linearly \\chi - bounded", "For every induced subgraph H of a perfect graph, chi(H)=omega(H), giving the linear chi-bound f(x)=x."],
    ["Bounded chromatic number", "Linearly \\chi - bounded", "If every graph in the class is k-colorable, so is every induced subgraph. The function f(x)=kx is a linear chi-bound for nonempty graphs."]
  ];
  elementaryClasses.forEach(([source, target, note]) => elementary([[source, target]], note));
  elementary([["Bipartite chain", "Chordal bipartite"]], "Nested neighborhoods exclude an induced 2K2. Every induced even cycle of length at least six contains an induced 2K2, so no such cycle is possible.");
  elementary([["Proper interval", "Proper circular-arc"]], "Place a proper interval representation inside an open arc of a circle. Intersections and the absence of proper containment are preserved.");

  const definitionPairs = [
    ["Tree", "Forest"], ["Path", "Tree"], ["Path", "Linear forest"], ["Path", "Caterpillar"],
    ["Caterpillar", "Tree"], ["Linear forest", "Forest"], ["Star", "Complete bipartite"],
    ["Complete bipartite", "Bipartite"], ["Complete bipartite", "Complete multipartite"],
    ["Bipartite chain", "Bipartite"],
    ["Bipartite permutation", "Bipartite"], ["Bipartite permutation", "Permutation"],
    ["Chordal bipartite", "Bipartite"], ["Strongly chordal", "Chordal"], ["Proper chordal", "Chordal"],
    ["Proper interval", "Interval"],
    ["Proper circular-arc", "Circular-arc"], ["Split permutation", "Permutation"], ["Split permutation", "Split"],
    ["Linearly \\chi - bounded", "Polynomially \\chi - bounded"], ["Polynomially \\chi - bounded", "\\chi - bounded"],
    ["Bounded polynomial expansion", "Bounded expansion"]
  ];
  record(definitionPairs, "subset", "definition", [], "Class definitions", "The defining condition of the source class includes the defining condition of the target class.");
  record([["Complete multipartite", "Co-cluster"]], "equivalent", "definition", [], "Complement definitions", "The complement of a complete multipartite graph is a disjoint union of cliques, and conversely.");

  const additionalArguments = [
    ["Bounded acyclic chromatic number", "Bounded degeneracy", "The edges between each pair of colors form a forest; arboricity is at most binomial(a,2)."],
    ["Bounded bandwidth", "Bounded cut-width", "At each cut of a bandwidth-b order, only the last b vertices can meet later vertices, each at distance at most b."],
    ["Bounded bandwidth", "Bounded bisection width", "Bisect a bandwidth order; the crossing edges are among at most 2b vertices."],
    ["Bounded bisection width", "Bounded distance to Disconnected", "Delete endpoints on one side of a minimum bisection cut. If that side is exhausted, its size, and hence the graph order up to one, was already bounded."],
    ["Bounded carving-width", "Bounded maximum degree", "The cut isolating a leaf of the carving tree has order equal to the represented vertex degree."],
    ["Bounded cut-width", "Bounded carving-width", "A linear layout gives a caterpillar carving decomposition; its cuts are layout cuts or single-vertex cuts."],
    ["Bounded cut-width", "Bounded path-width", "At each layout cut keep earlier vertices with a later neighbor. There are at most cutwidth many."],
    ["Bounded distance to Bipartite", "Bounded chromatic number", "Color the bipartite remainder with two colors and give each deleted vertex its own color."],
    ["Bounded distance to Clique", "Bounded clique cover number", "The remaining clique and singleton deleted vertices form a bounded clique partition."],
    ["Bounded distance to Clique", "Bounded edge clique cover number", "Use the remaining clique, one clique for each deleted vertex together with its neighbors in the remainder, and singleton edges inside the deletion set."],
    ["Bounded distance to Linear forest", "Bounded path-width", "A linear forest has pathwidth at most one. Add the deletion set to every bag."],
    ["Bounded distance to Linear forest", "Bounded ℎ-index", "Outside a deletion set of size k, all degrees are at most k+2; at most k vertices are exceptional."],
    ["Bounded distance to Outerplanar", "Bounded tree-width", "An outerplanar graph has treewidth at most two; add the deletion set to every bag."],
    ["Bounded edge clique cover number", "Bounded neighborhood diversity", "Membership in a fixed k-clique edge cover determines the open or closed twin type; there are at most 2^k types."],
    ["Bounded feedback edge set number", "Bounded genus", "A spanning forest embeds in the sphere; add a handle for each remaining edge."],
    ["Bounded feedback edge set number", "Bounded 𝑐-closure", "Two nonadjacent vertices with t common neighbors induce t-1 independent cycles, so t is at most the feedback edge number plus one."],
    ["Bounded maximum degree", "Bounded ℎ-index", "The h-index never exceeds the maximum degree."],
    ["Bounded minimum degree", "Bounded domatic number", "Every closed neighborhood meets every part of a domatic partition, hence domatic number <= minimum degree + 1."],
    ["Bounded minimum degree", "Bounded distance to Disconnected", "Deleting a minimum-degree vertex's neighbors isolates it, unless the whole graph already has bounded order."],
    ["Bounded ℎ-index", "Bounded acyclic chromatic number", "Delete the at most h vertices of degree greater than h. Color the square of the remainder greedily and use new colors for deleted vertices."],
    ["Bounded twin-cover", "Bounded modular-width", "Each component outside a twin-cover is a module and a clique. Contract these modules; the quotient has bounded neighborhood diversity."],
    ["Bounded vertex cover number", "Bounded distance to Co-Cluster", "The independent remainder is a complete multipartite graph, hence a co-cluster graph."],
    ["Bounded vertex cover number", "Bounded distance to Linear forest", "The independent remainder is a linear forest."],
    ["Bounded tree-partition-width", "Bounded tree-width", "Use the union of the two endpoint bags of each tree-partition edge as a tree-decomposition bag."],
    ["Bipartite chain", "Bipartite permutation", "Order one bipartition by nested neighborhoods. A two-line representation with the other part interleaved realizes exactly those nested neighborhoods."],
    ["Block", "Chordal", "Any cycle lies inside a block. Since each block is a clique, a cycle of length at least four has a chord."],
    ["Block", "Ptolemaic", "A block graph is chordal and distance-hereditary: every induced path follows the unique block-cut-tree route and is geodesic."],
    ["Cactus", "Outerplanar", "Draw the cycle and edge blocks with all vertices on the outer face, gluing blocks at cut vertices."],
    ["Caterpillar", "Interval", "Represent consecutive spine vertices by overlapping intervals and each leaf by a small disjoint interval inside the private part of its spine interval."],
    ["Chordal", "Bounded chordality", "Chordality here is chordal intersection dimension, not maximum induced-cycle length; one chordal factor suffices."],
    ["Chordal", "Weakly chordal", "A long hole is excluded by chordality. An antihole of length at least five either is C5 or contains an induced C4."],
    ["Chordal bipartite", "Weakly chordal", "There is no long hole by definition and bipartiteness. A long antihole either is C5 or contains a triangle."],
    ["Clique", "Cluster", "A clique is a cluster with one component."],
    ["Clique", "Co-cluster", "The complement is an independent set, which is a cluster graph."],
    ["Clique", "Interval", "Use identical intervals."],
    ["Clique", "Proper interval", "Use equal-length intervals with distinct, sufficiently close centers."],
    ["Clique", "Threshold", "Build the clique by adding universal vertices."],
    ["Cluster", "Block", "Each nontrivial block is one of the clique components."],
    ["Cluster", "Interval", "Use identical intervals within each component and disjoint ranges for distinct components."],
    ["Cluster", "Proper interval", "Use equal-length intervals with close centers within each component and separated ranges between components."],
    ["Cograph", "Perfect", "Disjoint union takes the maximum of chromatic and clique numbers; complete join takes their sum. Induct on a cotree, including every induced subgraph."],
    ["Complete bipartite", "Bipartite chain", "All vertices on either side have the same neighborhood, so those neighborhoods are nested."],
    ["Linear forest", "Bounded maximum degree", "Every path component has maximum degree at most two."],
    ["Linear forest", "Proper interval", "Represent each path by equal-length intervals with consecutive overlap, using disjoint ranges for different components."],
    ["Path", "Bounded maximum degree", "A path has maximum degree at most two."],
    ["Path", "Grid", "A path is a one-row square grid."],
    ["Permutation", "Comparability", "Orient crossing pairs according to one endpoint order. Two consecutive oriented edges force the third crossing, so the orientation is transitive."],
    ["Permutation", "Co-comparability", "Reversing one endpoint order complements a permutation graph. Apply the same transitive orientation argument."],
    ["Permutation", "Circle", "Put the two endpoint lines on two disjoint arcs of a circle, reversing the traversal of one arc. Segment crossings become chord crossings."],
    ["Permutation", "Trapezoid", "Enlarge each representing segment by a sufficiently small amount to a trapezoid, preserving all intersections."],
    ["Proper circular-arc", "Claw-free", "Three disjoint arcs meeting a fourth arc force the middle intersecting arc to be properly contained in it, contrary to properness."],
    ["Series-parallel", "Bounded chromatic number", "A partial 2-tree is 2-degenerate and hence 3-colorable."],
    ["Series-parallel", "Bounded tree-width", "Series-parallel graphs are partial 2-trees; the usual series/parallel recursion supplies bags of size at most three."],
    ["Series-parallel", "Planar", "Series and parallel composition preserve a plane embedding with the two terminals on the outer face."],
    ["Star", "Bipartite chain", "The leaf-side neighborhoods are identical."],
    ["Star", "Caterpillar", "Deleting leaves leaves at most one vertex."],
    ["Star", "Split", "The center is a clique and the leaves form an independent set."],
    ["Star", "Threshold", "Add isolated leaves, then one universal center."],
    ["Threshold", "Cograph", "Adding an isolated or a universal vertex is respectively disjoint union or complete join with K1."],
    ["Threshold", "Permutation", "Maintain a permutation representation: put an isolated vertex at the same extreme in both orders, a universal vertex at opposite extremes."],
    ["Threshold", "Split", "Universal additions form a clique; isolated additions form an independent set."],
    ["Threshold", "Split permutation", "Combine the split partition and the permutation representation of a threshold graph."],
    ["Threshold", "Trivially perfect", "Starting from K1, disjoint union with a vertex and adding a universal vertex preserve trivially perfectness."],
    ["Tree", "Cactus", "Each block of a tree is an edge, so every edge belongs to at most one cycle."],
    ["Tree", "Block", "Every block of a tree is K2 or an isolated vertex."],
    ["Trivially perfect", "Cograph", "The rooted-forest closure construction uses only disjoint unions and adding universal vertices."],
    ["Trivially perfect", "Strongly chordal", "Trivially perfect graphs are chordal and contain no induced P4. Every sun of order at least three contains an induced P4."],
    ["Bounded boxicity", "Bounded chordality", "Every interval factor in a box representation is chordal. Chordality here denotes intersection dimension."],
    ["Bounded chromatic number", "Bounded chordality", "For each independent color class make its complement a clique; each resulting split graph is chordal, and their intersection is the original graph."],
    ["Bounded distance to Chordal", "Bounded chordality", "Make the k deleted vertices universal in a chordal factor, and intersect with k split factors correcting their adjacencies. This is chordal intersection dimension."],
    ["Bounded distance to Cograph", "Bounded clique-width", "Distinguish cograph labels by their neighborhoods in the k added vertices, using at most 2^(k+1)+k labels."],
    ["Bounded clique-width", "Bounded mim-width", "For the cut tree of a k-expression, the endpoints on one side of a cut of an induced matching have distinct labels, hence its size is at most k."],
    ["Bounded modular-width", "Bounded max diameter of components", "A connected substitution into a quotient with at most m vertices has diameter at most max(2,m-1); disjoint union and complete join preserve this bound."],
    ["Bounded twin-cover", "Bounded linear rank-width", "Process true-twin clique components outside the k-vertex twin-cover one at a time. Each cut matrix has rank at most k+1."]
  ];
  additionalArguments.forEach(([source, target, note]) => elementary([[source, target]], note));
  record([["Bounded distance to Cograph", "Bounded chordality"]], "subset", "incorrect", [], "Counterexample: complements of matchings", "The complement of n disjoint edges is a cograph. A chordal supergraph can omit at most one of those edges, otherwise it contains an induced C4. Its chordal intersection dimension is n, so the recorded implication is false.");

  ["branch-width", "tangle number", "linkedness", "well-linked number", "fractional Hadwiger number"].forEach((name) => {
    paper([[`Bounded ${name}`, "Bounded tree-width"]], ["tied"], "Theorem 1; Sections 6, 8, 9 and 12", "The parameter and treewidth are functionally equivalent.", "equivalent");
  });
  paper([["Bounded separation number", "Bounded tree-width"]], ["tied"], "Section 5, Lemma 9", "Separation number and treewidth are functionally equivalent.", "equivalent");
  paper([["Bounded branch-depth", "Bounded tree-depth"]], ["branchDepth"], "Theorem 3.4", "bd(G)-1 <= td(G) <= max(2bd(G)^2-bd(G)+1,2).", "equivalent");
  paper([["Bounded shrub-depth", "Bounded rank-depth"]], ["branchDepth"], "Theorem 4.11", "Rank-depth and shrub-depth are bounded on the same classes.", "equivalent");
  paper([["Bounded acyclic chromatic number", "Bounded boxicity"]], ["boxAcyclic"], "Lemma 1", "box(G) <= a(G)(a(G)-1), apart from the edgeless trivial case.");
  paper([["Bounded edge-crossing width", "Bounded tree-partition-width"]], ["edgeCrossing"], "Section 5.3, Lemmas 5.10 and 5.17", "The two parameters are functionally equivalent.", "equivalent");
  paper([["Bounded slim tree-cut width", "Bounded α-edge-crossing width"]], ["edgeCrossing"], "Theorem 5.8 and Lemma 5.9", "Combine the comparison through super edge-cut width.");
  paper([["Bounded α-edge-crossing width", "Bounded tree-partition-width"]], ["edgeCrossing"], "Section 5.1 and Section 5.3", "Drop the fixed bag-size restriction, then use the edge-crossing/tree-partition equivalence.");
  paper([["Bounded edge-cut width", "Bounded slim tree-cut width"]], ["slim"], "Super edge-cut characterization; Corollary 24", "Super edge-cut width is at most edge-cut width and is tied to slim tree-cut width.");
  elementary([["Bounded slim tree-cut width", "Bounded tree-cut width"]], "Suppressing degree-two peripheral vertices in addition to degree-one vertices can only reduce the torso size.");
  paper([["Bounded carving-width", "Bounded slim tree-cut width"]], ["slim"], "Proposition 21, with the carving cut-to-bag construction", "A carving decomposition of width k gives bounded treewidth and maximum degree. Proposition 21 bounds even zero-tree-cut width in those two quantities.");
  paper([["Bounded tree bandwidth", "Bounded tree-width"], ["Bounded tree-partition-width", "Bounded tree bandwidth"], ["Bounded tree-depth", "Bounded tree bandwidth"]], ["treeBandwidth"], "Introduction: Treebandwidth and tree-partition-width; Proposition 1", "Apply the tree-layout comparisons.");
  paper([["Bounded clique-width", "Bounded stretch-width"], ["Bounded stretch-width", "Bounded reduced bandwidth"]], ["stretch"], "Parameter comparisons in the introduction", "The two comparisons are boundedness implications, not equivalences.");
  paper([["Bounded rank-width", "Bounded reduced component max-leaf"]], ["rank", "reduced"], { rank: "Proposition 6.3 (author version)", reduced: "Section 1, reduced-parameter hierarchy" }, "Combine rank/clique-width equivalence with the component-size contraction bound.");
  paper([["Bounded reduced component max-leaf", "Bounded reduced bandwidth"]], ["reduced"], "Section 1, parameter hierarchy; Section 2.2", "Bounded component max-leaf bounds bandwidth in each red graph.");
  elementary([["Bounded reduced bandwidth", "Bounded reduced cut-width"]], "A red graph of bandwidth b has cutwidth at most b(b+1)/2. Use the same contraction sequence.");
  elementary([["Bounded reduced cut-width", "Bounded twin-width"]], "Every red graph of cutwidth k has maximum degree at most 2k. Use the same contraction sequence.");
  elementary([["Bounded reduced max-leaf", "Bounded reduced component max-leaf"]], "The maximum leaf count of one component does not exceed the spanning-forest leaf count. Keep the same contraction sequence.");
  paper([["Bounded sparse twin-width", "Bounded expansion"], ["Excluded minor", "Bounded sparse twin-width"]], ["twinSparse"], "Section 7.1, sparse twin-width characterizations; Section 3.1", "Use the proper-minor-closed contraction result and the sparse characterizations.");
  paper([["Bounded genus", "Bounded twin-width"]], ["twinSparse"], "Section 3.1, proper minor-closed classes", "Every fixed-genus class is contained in a proper minor-closed class.");
  paper([["Bounded linear clique-width \\cap Weakly sparse", "Bounded path-width"]], ["linearStable", "sparseClique"], { linearStable: "Section 2, sparse width comparisons", sparseClique: "Linear width and excluded-biclique comparisons" }, "The sparse linear clique/rank-width comparison characterizes bounded pathwidth.", "equivalent");
  elementary([["Bounded path-width", "Bounded linear clique-width"]], "A width-p path decomposition gives a linear expression using p+2 labels: maintain active vertices individually and forget finished vertices to an inactive label.");
  paper([["Bounded rank-width", "Monadically low VC-density"]], ["rank", "vcTree"], { rank: "Proposition 6.3 (author version)", vcTree: "Theorem 1" }, "Combine rank/clique-width equivalence with the CMSO1 VC-density theorem, also for unary expansions.");
  paper([["Structurally nowhere dense", "Monadically low VC-density"]], ["vcSparse"], "Main type-counting theorem; closure under FO transductions", "Translate each formula through the witnessing transduction and use the nowhere-dense type bound.");
  paper([["Structurally bounded expansion", "Low linear rank-width covers"]], ["structuralExpansion", "shrub"], { structuralExpansion: "Low shrubdepth cover characterization", shrub: "Proposition 3(b)" }, "Convert each bounded-shrubdepth cover piece to a bounded-linear-clique-width piece.");
  paper([["Low linear rank-width covers", "Linearly \\chi - bounded"]], ["linearStable"], "Linear chi-bound theorem; p=1 cover", "Partition vertices among a bounded number of cover pieces and apply the linear chi-bound on each piece.");
  paper([["Low rank-width covers", "Polynomially \\chi - bounded"]], ["polyChi", "rank"], { polyChi: "Polynomial chi-bound theorem", rank: "Proposition 6.3 (author version)" }, "Partition a p=1 cover into bounded-rankwidth pieces and sum their polynomial chi-bounds.");
  paper([["Structurally bounded path-width", "Monadically stable bounded linear clique-width"]], ["linearStable", "stableTwin"], { linearStable: "Linear sparsification theorem", stableTwin: "Theorem 1.2; Section 3.2" }, "Use the pathwidth transduction characterization and preservation of monadic stability.");
  paper([["Structurally bounded tree-width", "Monadically stable bounded clique-width"]], ["rankStable", "stableTwin"], { rankStable: "Rankwidth sparsification theorem", stableTwin: "Theorem 1.3; Section 3.2" }, "Use the treewidth transduction characterization and preservation of monadic stability.");
  paper([["Structurally bounded sparse twin-width", "Monadically stable bounded twin-width"]], ["stableTwin", "twin"], { stableTwin: "Theorem 1.5; Section 3.2", twin: "FO-transduction closure" }, "Sparse twin-width classes are stable, and twin-width is bounded under FO transductions.");
  paper([["Structurally bounded tree-depth", "Monadically stable bounded shrub-depth"]], ["shrub", "stableTwin"], { shrub: "Shrub-depth transduction characterization", stableTwin: "Section 3.2, stability under transductions" }, "FO transductions of bounded-treedepth classes have bounded shrub-depth and are monadically stable.");
  paper([["Structurally bounded expansion", "Monadically stable bounded merge-width"]], ["merge", "stableTwin"], { merge: "Theorems 1.6 and 1.12", stableTwin: "Section 3.2" }, "Bounded expansion has bounded merge-width; both merge-width boundedness and monadic stability are preserved by FO transductions.");
  paper([["Proper chordal", "Strongly chordal"], ["Proper interval", "Proper chordal"]], ["properChordal"], "Section 3, class comparisons; Figure 4", "Use the forbidden tree-layout characterization.");
  paper([["Distance-hereditary", "Bounded rank-width"], ["Distance-hereditary", "Bounded clique-width"]], ["vertexMinors", "rank"], { vertexMinors: "Rank-width-one characterization", rank: "Proposition 6.3 (author version)" }, "Distance-hereditary graphs have rankwidth at most one.");
  record([["Bounded rank-width", "Low rank-width covers"], ["Bounded linear rank-width", "Low linear rank-width covers"], ["Low linear rank-width covers", "Low rank-width covers"]], "subset", "definition", [], "Cover definitions", "Use the whole graph as the only cover set, or replace a linear width bound by its unrestricted bound.");
  record([["Monadically low VC-density", "Monadically dependent"], ["Monadically stable", "Monadically dependent"]], "subset", "definition", [], "Model-theoretic definitions", "Finite VC-density implies NIP; stability excludes the independence property.");
  paper([["Bounded queue number", "Bounded track layout number"]], ["trackLayouts"], "Queue-number and track-number comparison", "These layout parameters are functionally equivalent.", "equivalent");
  paper([["Bounded stack number", "Bounded acyclic chromatic number"], ["Bounded track layout number", "Bounded acyclic chromatic number"]], ["trackLayouts"], "Acyclic coloring corollaries", "Apply the layout coloring bound.");
  paper([["Bounded tree-width", "Bounded track layout number"]], ["layouts"], "Section 7, treewidth and track layouts", "Treewidth bounds track-layout number.");
  paper([["Bounded genus", "Bounded stack number"]], ["surfaceStack"], "Main theorem", "A fixed genus bounds page number.");
  elementary([["Bounded track layout number", "Bounded geometric thickness"]], "Draw each ordered track on a parallel line and give each pair of tracks a separate layer; perturb to general position. No layer has crossings.");
  paper([["Bounded tree-width", "Bounded stack number"]], ["treePages"], "Theorem 1", "A graph of treewidth k is a subgraph of a k-tree and has stack number at most k+1.");
  elementary([["Bounded bandwidth", "Bounded track layout number"]], "Partition a bandwidth-b vertex order into consecutive blocks of b vertices. Tracks are determined by position within the block and block index modulo three.");
  record([["Bounded interval number", "Bounded track layout number"]], "equivalent", "incorrect", ["simultaneous", "trackLayouts"], "Different track-number definitions", "The previous equivalence merged interval representations and graph-drawing layouts. They are different notions; the unsupported equivalence is excluded. Interval-track number is now a separate node.");
  paper([["Bounded thinness", "Bounded boxicity"]], ["thin"], "Theorem 4.5 (author preprint)", "box(G) <= thin(G).");
  paper([["Bounded thinness", "Bounded linear mim-width"]], ["simultaneous"], "Section 3.1, following Definition 14", "The paper records linear-mim(G) <= thin(G) and its original reference.");
  paper([["Ptolemaic", "Chordal"], ["Ptolemaic", "Distance-hereditary"]], ["ptolemaic"], "Chordal distance-hereditary characterization", "A graph is ptolemaic exactly when it is chordal and distance-hereditary.");
  elementary([["Comparability", "Perfect"]], "A transitive orientation defines a poset. Color each vertex by the length of a longest chain ending there; both chromatic and clique numbers equal the poset height, including in each induced subgraph.");
  paper([["Co-comparability", "Perfect"], ["Weakly chordal", "Perfect"], ["Meyniel", "Perfect"], ["Parity", "Perfect"]], ["perfect"], "Strong perfect graph theorem", "The defining conditions exclude odd holes and odd antiholes. Apply the Berge-graph characterization.");
  elementary([["Distance-hereditary", "Meyniel"]], "An odd cycle of length at least five with zero or one chord gives a hole or an induced path that is not geodesic, contradicting distance heredity.");
  elementary([["Outerplanar", "Series-parallel"]], "Triangulate each outerplanar block. Repeatedly remove an ear of the triangulated outer polygon to obtain a 2-tree construction; take the original subgraph.");
  elementary([["Excluded minor", "Excluded topological minor"]], "A topological minor is a minor, so excluding H as a minor also excludes H as a topological minor.");
  elementary([["Bounded tree-width", "Excluded minor"]], "Treewidth does not increase under minors; treewidth at most k excludes K(k+2) as a minor.");
  elementary([["Bounded genus", "Excluded minor"]], "Genus is minor-monotone, while the genus of complete graphs grows without bound.");
  elementary([["Bounded crossing number", "Excluded minor"]], "Bounded crossing number bounds genus; exclude a complete graph whose genus exceeds that bound.");
  elementary([["Bounded feedback edge set number", "Bounded edge-cut width"]], "For any maximal spanning forest, every local fundamental-cycle edge is among the feedback edges. Thus edge-cut width <= feedback edge number + 1.");
  paper([["Bounded distance to Planar", "Bounded twin-width"]], ["twinSparse"], "Proper-minor-closed contraction theorem; bounded vertex additions", "For k added vertices, refine each contraction part by its neighborhood in them and keep those vertices uncontracted until the end; the width cost depends only on k and the original bound.");
  elementary([["Bounded cut-width", "Bounded path-width \\cap Bounded max-degree"]], "Pathwidth <= cutwidth and maximum degree <= 2 cutwidth. Conversely an ordering from a width-p path decomposition has at most (p+1)Delta crossing edges.", "equivalent");
  paper([["Bounded tree-cut width", "Bounded tree-partition-width"]], ["treePartitions"], "Theorem 5.6", "Tree-partition-width is polynomially bounded by tree-cut width.");
  paper([["Bounded tree-independence number", "Bounded o-mim-width"]], ["omim"], "Theorem 1.2", "o-mim-width <= tree-independence number.");
  paper([["Bounded minor-matching hypertree-width", "Bounded sim-width"]], ["omim"], "Theorem 3.4", "sim-width <= minor-matching hypertreewidth.");
  elementary([["Bounded tree-independence number", "Bounded minor-matching hypertree-width"]], "Choose a bag endpoint from each edge of a bag-intersecting induced matching. These endpoints form an independent set in the bag.");
  paper([["Outerplanar", "Circle"]], ["circleOuter"], "Theorems 7 and 11", "Use the outerplanar representation theorem on each block and then combine blocks.");
  paper([["Distance-hereditary", "Circle"]], ["distanceHereditary", "circleOuter"], { distanceHereditary: "Pendant/twin construction", circleOuter: "Theorem 6" }, "Combine the distance-hereditary construction with preservation of circle representations under pendant and twin additions.");
  paper([["Excluded topological minor", "Bounded expansion"]], ["expansion"], "Examples and shallow-minor density bounds", "A fixed excluded topological minor yields bounded expansion.");
  paper([["Excluded minor", "Bounded polynomial expansion"]], ["expansion"], "Examples: proper minor-closed classes", "All shallow minors still exclude the same minor, so their density has a constant bound; constant expansion is polynomial.");
  elementary([["Bounded expansion", "Nowhere dense"]], "At depth r all shallow minors have average degree at most f(r), so a clique of order greater than f(r)+1 is excluded as a depth-r minor.");
  paper([["Bounded shrub-depth \\cap Weakly sparse", "Bounded tree-depth"]], ["sparsity", "transductions", "shrub"], { sparsity: "Proposition 6.4", transductions: "Example 21.4", shrub: "Proposition 3(a)" }, "Weakly sparse bounded-shrubdepth classes have bounded treedepth; use Proposition 3(a) for the reverse implication.", "equivalent");
  paper([["Bounded strong ∞-coloring number", "Bounded tree-width"]], ["sparsity"], "Generalized coloring numbers: col_infinity = tw + 1", "The unlimited strong reachability parameter equals treewidth plus one.", "equivalent");
  paper([["Bounded weak ∞-coloring number", "Bounded tree-depth"]], ["sparsity"], "Generalized coloring numbers: wcol_infinity = td", "The unlimited weak reachability parameter equals treedepth.", "equivalent");
  paper([["Bounded max leaf number", "Bounded bandwidth"]], ["reduced"], "Section 2.2, bounded-size subdivision characterization", "Suppress degree-two chains to a bounded-size core. Order all subdivided core edges in synchronized layers to obtain bounded bandwidth.");
  elementary([["Bounded distance to Linear forest", "Bounded distance to Block"]], "After the same deletion, each component is a path and every block is an edge.");
  elementary([["Bounded burning number", "Bounded max diameter of components"]], "A b-round burning process covers each component by at most b balls of radius at most b-1. A chain of their intersecting or adjacent regions bounds each component diameter by a function of b.");
  elementary([["Bounded distance to Cograph", "Bounded max diameter of components"]], "A geodesic uses at most k deleted vertices. The remaining at most k+1 path segments have at most three vertices each, giving component diameter at most 4k+2.");
  elementary([["Bounded domination number", "Bounded max diameter of components"]], "A fixed vertex dominates at most three vertices of a geodesic. Hence each component diameter is at most three times the domination number minus one.");
  elementary([["Bounded tree-depth", "Bounded max diameter of components"]], "A graph of treedepth t has no path on 2^t vertices, so each component diameter is at most 2^t-2.");
  paper([["Bounded distance to Planar", "Bounded acyclic chromatic number"]], ["trackLayouts", "surfaceStack"], { trackLayouts: "Bounded page number implies bounded acyclic chromatic number", surfaceStack: "Fixed-genus page bound" }, "Planar graphs have bounded page number and thus bounded acyclic chromatic number. Give the bounded deletion set distinct new colors.");
  record([["Bounded average distance", "Bounded girth"]], "subset", "incorrect", ["meanGirth"], "The source theorem requires connected non-tree graphs", "Stars have bounded average distance but infinite girth under the usual forest convention. The connected non-tree theorem does not justify this unrestricted inclusion.");
  record([["Bounded max diameter of components", "Bounded average distance"]], "subset", "incorrect", [], "Disconnected-distance convention", "Two isolated vertices have maximum component diameter zero but infinite average distance when distances between components are infinite.");
  record([["Bounded distance to Cograph", "Bounded diameter"], ["Bounded domination number", "Bounded diameter"], ["Bounded maximum induced matching", "Bounded diameter"], ["Bounded tree-depth", "Bounded diameter"]], "subset", "incorrect", [], "Counterexample: two isolated vertices", "Two isolated vertices have cograph deletion distance zero, domination number two, induced matching number zero and treedepth one, but infinite diameter. The maximum-component-diameter version is valid instead.");
  paper([["Bounded max leaf number", "Bounded distance to Linear forest"], ["Bounded max leaf number", "Bounded feedback edge set number"]], ["reduced"], "Section 2.2, bounded-size subdivision characterization; componentwise sum", "For disconnected graphs max-leaf is the maximum total leaf count of a spanning forest, not component max-leaf. Apply the bounded-core characterization per nontrivial component; deleting the cores and one vertex per remaining cycle gives a linear forest.");
  paper([["Bounded linear rank-width", "Bounded reduced max-leaf"]], ["linear", "twinVariants"], { linear: "Introduction, linear width comparisons", twinVariants: "Section 3.3" }, "Linear rankwidth bounds linear clique-width and hence total twin-width. Every red graph has at most twice its number of red edges many degree-one leaves; isolated red vertices are not counted, as specified by the user.");
  elementary([["Bounded maximum induced matching", "Bounded max diameter of components"]], "A geodesic of length d contains an induced matching with at least floor((d+2)/3) edges; hence every component diameter is bounded by the induced matching number.");

  function getEvidence(edge) {
    const explicit = evidence.get(key(edge.source, edge.target, edge.type));
    if (explicit) return { ...explicit };
    const source = normalize(edge.source);
    const target = normalize(edge.target);
    if (edge.type !== "equivalent") {
      if (target === "all graphs") return {
        kind: "definition", sourceIds: [], locator: "Universal graph class",
        note: "Every graph in the source class is a graph, so the source class is contained in All graphs."
      };
      if (target === `bounded distance to ${source}`) return {
        kind: "definition", sourceIds: [], locator: "Deletion-distance definition",
        note: "The graph already belongs to the target base class, so the deletion distance is zero."
      };
      if (source.includes("\\cap") && source.split("\\cap").map(normalize).includes(target)) return {
        kind: "definition", sourceIds: [], locator: "Intersection definition",
        note: "A class satisfying both conditions also satisfies each condition separately."
      };
      if (source.startsWith("monadically stable ") && source.slice("monadically stable ".length) === target) return {
        kind: "definition", sourceIds: [], locator: "Intersection with monadic stability",
        note: "Dropping the additional monadic-stability requirement preserves membership in the underlying bounded-parameter class."
      };
      if (source.startsWith("monadically stable ") && target === "monadically stable") return {
        kind: "definition", sourceIds: [], locator: "Intersection definition",
        note: "Drop the additional bounded-parameter condition."
      };
      if (target.startsWith("structurally ") && target.slice("structurally ".length) === source) return {
        kind: "definition", sourceIds: [], locator: "FO-transduction definition",
        note: "The identity transduction witnesses this inclusion."
      };
    }
    return { kind: "unchecked", sourceIds: [], locator: "", note: "A supporting source or elementary argument has not yet been verified for this relation. This is not a claim that the relation is open." };
  }

  const records = data.relations.map((edge, index) => {
    const relation = { ...edge, type: edge.type === "equivalent" ? "equivalent" : "subset", id: `relation-${index}` };
    return { ...relation, ...getEvidence(relation) };
  });
  const adjacency = new Map();
  function addArc(source, step) {
    const id = normalize(source);
    if (!adjacency.has(id)) adjacency.set(id, []);
    adjacency.get(id).push(step);
  }
  records.forEach((relation) => {
    if (["incorrect", "conditional"].includes(relation.kind)) return;
    addArc(relation.source, relation);
    if (relation.type === "equivalent") addArc(relation.target, { ...relation, source: relation.target, target: relation.source });
  });

  const traceCache = new Map();
  function trace(source, target, type = "subset") {
    const from = normalize(source);
    const to = normalize(target);
    const cacheKey = JSON.stringify([from, to, type]);
    if (traceCache.has(cacheKey)) return { ...traceCache.get(cacheKey), source, target };
    const restricted = records.find((record) => ["incorrect", "conditional"].includes(record.kind) && key(record.source, record.target, record.type) === key(source, target, type));
    if (restricted) return { source, target, type, kind: restricted.kind, steps: [restricted], sourceIds: restricted.sourceIds };
    const distances = new Map([[from, 0]]);
    const previous = new Map();
    const pending = new Set([from]);
    // Prefer a fully supported proof even when an unchecked shortcut is shorter.
    const uncheckedCost = data.classes.length + 1;
    while (pending.size) {
      const current = [...pending].reduce((best, id) => distances.get(id) < distances.get(best) ? id : best);
      pending.delete(current);
      if (current === to) break;
      for (const step of adjacency.get(current) || []) {
        if (type === "equivalent" && step.type !== "equivalent") continue;
        const next = normalize(step.target);
        const cost = distances.get(current) + 1 + (step.kind === "unchecked" ? uncheckedCost : 0);
        if (cost >= (distances.get(next) ?? Infinity)) continue;
        distances.set(next, cost);
        previous.set(next, { current, step });
        pending.add(next);
      }
    }
    const steps = [];
    for (let current = to; previous.has(current);) {
      const entry = previous.get(current);
      steps.unshift(entry.step);
      current = entry.current;
    }
    const supported = steps.length > 0 && steps.every((step) => step.kind !== "unchecked");
    const result = {
      source, target, type, steps,
      kind: !supported ? "unchecked" : steps.length > 1 ? "derived" : steps[0].kind,
      sourceIds: [...new Set(steps.flatMap((step) => step.sourceIds))]
    };
    traceCache.set(cacheKey, result);
    return result;
  }

  // Lift only verified inclusions through vertex-deletion distance, intersections,
  // and FO transductions. Keep every contributing reference for the citation list.
  for (let changed = true; changed;) {
    changed = false;
    for (const relation of records) {
      if (relation.kind !== "unchecked" || relation.type !== "subset") continue;
      const source = normalize(relation.source);
      const target = normalize(relation.target);
      let bases;
      let rule;
      for (const [prefix, description] of [
        ["bounded distance to ", "Vertex-deletion distance monotonicity"],
        ["monadically stable ", "Intersection with monadic stability"],
        ["structurally ", "Composition of FO transductions"]
      ]) {
        if (source.startsWith(prefix) && target.startsWith(prefix)) {
          bases = [source.slice(prefix.length), target.slice(prefix.length)];
          rule = description;
          break;
        }
      }
      if (!bases) continue;
      const proof = trace(...bases);
      if (!["paper", "definition", "elementary", "derived"].includes(proof.kind)) continue;
      Object.assign(relation, {
        kind: "derived", sourceIds: proof.sourceIds, locator: rule,
        note: `Apply ${rule.toLowerCase()} to the verified base-class inclusion.`,
        basis: proof.steps, checkedOn: "2026-10-26"
      });
      traceCache.clear();
      changed = true;
    }
  }

  function citations(proof) {
    const entries = new Map(proof.sourceIds.map((id) => [id, { id, reference: sources[id], locators: [] }]));
    function visit(step) {
      if (step.basis) step.basis.forEach(visit);
      else step.sourceIds.forEach((id) => {
        const entry = entries.get(id);
        const locator = step.sourceLocators?.[id] || step.locator;
        if (entry && locator && !entry.locators.includes(locator)) entry.locators.push(locator);
      });
    }
    proof.steps.forEach(visit);
    return [...entries.values()];
  }

  function isActive(index) {
    return !["incorrect", "conditional"].includes(records[index]?.kind);
  }

  function optionsForClass(source, related, visible = []) {
    const candidates = [
      ...visible,
      ...(related.equivalents || []).map((target) => ({ source, target, type: "equivalent" })),
      ...(related.subclasses || []).map((from) => ({ source: from, target: source, type: "subset" })),
      ...(related.superclasses || []).map((target) => ({ source, target, type: "subset" }))
    ];
    const seen = new Set();
    return candidates.filter((relation) => {
      const id = key(relation.source, relation.target, relation.type);
      if (seen.has(id) || normalize(relation.source) === normalize(relation.target)) return false;
      const proof = trace(relation.source, relation.target, relation.type);
      if (!proof.steps.length || ["incorrect", "conditional"].includes(proof.kind)) return false;
      seen.add(id);
      return true;
    });
  }

  window.GRAPH_CLASS_RELATION_SOURCES = { sources, records, trace, key, normalize, citations, isActive, resolveClassLabel, optionsForClass };
})();
