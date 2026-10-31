(function () {
  "use strict";
  const graph = window.GRAPH_CLASS_EXAMPLE;
  const relations = window.GRAPH_CLASS_RELATION_SOURCES;
  const researchFindings = [
    {
      "classes": [
        "Circle"
      ],
      "formula": "2ω log2 ω + 2ω log2(log2 ω) + 10ω",
      "condition": "ω >= 2; f(1)=1.",
      "kind": "explicit",
      "growth": "polynomial",
      "sourceIds": [
        "circleChi2022"
      ],
      "locator": "Theorem 1; February 2022 author version",
      "note": "Growth is O(ω log ω). Theorem 2 gives an Ω(ω ln ω) lower bound, so the class of all circle graphs has no linear χ-binding function."
    },
    {
      "classes": [
        "Circular-arc",
        "Proper circular-arc"
      ],
      "formula": "2ω",
      "condition": "Every nonempty circular-arc graph, including proper circular-arc graphs.",
      "kind": "explicit",
      "growth": "linear",
      "sourceIds": [],
      "locator": "Elementary cut-at-a-point argument in a circular-arc model",
      "note": "Arcs covering a chosen point form a clique of size at most ω. Delete them; the remaining interval graph is ω-colorable. Give the deleted clique a disjoint palette of at most ω colors. This verified elementary bound is not claimed strongest.",
      "evidenceKind": "elementary"
    },
    {
      "classes": [
        "Claw-free"
      ],
      "formula": "R(3,ω) <= binom(ω+1,2)",
      "condition": "All nonempty claw-free graphs; R(a,b) is the ordinary two-color Ramsey number.",
      "kind": "explicit",
      "growth": "polynomial",
      "sourceIds": [
        "gyarfasPathChi"
      ],
      "locator": "Theorem 2.2 with forbidden star K1,3; neighborhood Ramsey argument",
      "note": "Every neighborhood contains neither an independent triple nor an ω-clique, so maximum degree is at most R(3,ω)-1. Greedy coloring and the standard Ramsey recurrence give the stated polynomial envelope. The entire claw-free class is not linearly chi-bounded.",
      "parameterSymbols": {
        "R(a,b)": "Smallest n forcing an a-clique or an independent b-set in every n-vertex graph; symmetric in a and b."
      }
    },
    {
      "classes": [
        "Claw-free"
      ],
      "formula": "ceil((R(3,ω) + ω + 1)/2)",
      "condition": "All nonempty claw-free graphs.",
      "kind": "explicit",
      "growth": "polynomial",
      "sourceIds": [
        "clawList2012"
      ],
      "locator": "Introduction, inequality (2), with k=ω+1",
      "note": "The research paper derives this bound from King's claw-free version of Reed's bound and the neighborhood Ramsey bound. Small-ω refinements in the same paper can improve it; no optimality claim is made.",
      "parameterSymbols": {
        "R(a,b)": "Ordinary two-color Ramsey number."
      }
    },
    {
      "classes": [
        "Line graph"
      ],
      "formula": "ω + 1",
      "condition": "Line graph of a simple graph; source host has no parallel edges.",
      "kind": "explicit",
      "growth": "linear",
      "sourceIds": [
        "vizing1964"
      ],
      "locator": "Appendix A.1, Corollary A.4, printed p. 272 (PDF p. 4); original Diskretnyi Analiz 3 (1964), pp. 25-30",
      "note": "For G=L(H), chi(G)=chi'(H)<=Delta(H)+1 and Delta(H)<=omega(G). The source reproduces Vizing's original 1964 paper in an authorized English translation published in 2012. Retain the host-simplicity condition if the map permits multigraph line graphs.",
      "conditional": true
    },
    {
      "classes": [
        "Line graph"
      ],
      "formula": "floor(3ω/2)",
      "condition": "Line graph of any loopless multigraph, including simple hosts.",
      "kind": "explicit",
      "growth": "linear",
      "sourceIds": [
        "shannon1949"
      ],
      "locator": "Main theorem, pp. 148-152; line-graph translation",
      "note": "Shannon's edge-coloring bound is chi'(H)<=floor(3Delta(H)/2), and Delta(H)<=omega(L(H)). This is safe even if the Line graph node permits parallel-edge hosts."
    },
    {
      "classes": [
        "Planar"
      ],
      "formula": "4",
      "condition": "All finite loopless planar graphs.",
      "kind": "explicit",
      "growth": "constant",
      "sourceIds": [
        "fourColor1997"
      ],
      "locator": "Four-colour theorem; abstract and main theorem",
      "note": "A constant upper bound. More restrictive subclasses may have smaller bounds."
    },
    {
      "classes": [
        "Outerplanar",
        "Series-parallel",
        "Cactus"
      ],
      "formula": "3",
      "condition": "Finite simple outerplanar, series-parallel or cactus graphs.",
      "kind": "explicit",
      "growth": "constant",
      "sourceIds": [],
      "locator": "Elementary 2-degeneracy argument",
      "note": "Each listed class is 2-degenerate, so reverse deletion of vertices of degree at most two yields a 3-coloring. This does not claim chi=3 on every instance.",
      "evidenceKind": "elementary"
    },
    {
      "classes": [
        "All graphs"
      ],
      "formula": "No chi-binding function exists",
      "condition": "Unrestricted finite simple graphs.",
      "kind": "negative",
      "growth": "none",
      "sourceIds": [
        "erdos1959"
      ],
      "locator": "High-girth, high-chromatic construction",
      "note": "Triangle-free graphs have clique number at most two and arbitrarily large chromatic number. A triangle-free condition alone is therefore not chi-bounded. Bipartite graphs, in contrast, are 2-colorable."
    },
    {
      "classes": [
        "Bounded clique-width"
      ],
      "formula": "C_k ω^{p_k}",
      "condition": "Clique-width at most a fixed k; ω ≥ 1.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "polyChi"
      ],
      "locator": "Theorem 1.1; Section 5.1, Corollary 5.1 and following paragraph",
      "note": "C_k,p_k depend only on k. The proof gives an exponent of order 2^{2^{O(k log k)}}, with unspecified absolute constants; this is not a numerically specified exponent."
    },
    {
      "classes": [
        "Bounded rank-width"
      ],
      "formula": "C_{2^{r+1}-1} ω^{p_{2^{r+1}-1}}",
      "condition": "Rank-width at most a fixed r; use the clique-width polynomial indexed by k=2^{r+1}−1.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "rank",
        "polyChi"
      ],
      "locator": "rank: Proposition 6.3; polyChi: Theorem 1.1",
      "note": "The rank-width/clique-width comparison changes the parameter; it does not preserve the numerical value of a width bound.",
      "sourceLocators": {
        "rank": "Proposition 6.3",
        "polyChi": "Theorem 1.1"
      }
    },
    {
      "classes": [
        "Bounded linear rank-width",
        "Bounded linear clique-width",
        "Bounded linear NLC-width"
      ],
      "formula": "(r+2)! 2^{r(r−1)/2} 3^{r+2} ω",
      "condition": "Linear rank-width at most r; the other equivalent boundedness classes must first supply such an r.",
      "kind": "explicit",
      "growth": "linear",
      "sourceIds": [
        "linearStable"
      ],
      "locator": "Theorem 1.3 and Corollary 1.3",
      "note": "The displayed r is linear rank-width, not linear clique-width or linear NLC-width."
    },
    {
      "classes": [
        "Low linear rank-width covers"
      ],
      "formula": "q (r+2)! 2^{r(r−1)/2} 3^{r+2} ω",
      "condition": "A cover of depth sufficient to cover single vertices, using at most q pieces of linear rank-width at most r.",
      "kind": "explicit",
      "growth": "linear",
      "sourceIds": [
        "linearStable"
      ],
      "locator": "Corollary 1.3; paragraph immediately following it",
      "note": "Assign each vertex to one containing cover piece and use disjoint palettes."
    },
    {
      "classes": [
        "Low rank-width covers"
      ],
      "formula": "q C_{2^{r+1}-1} ω^{p_{2^{r+1}-1}}",
      "condition": "At most q cover pieces, each of rank-width at most r, covering all vertices.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "rank",
        "polyChi"
      ],
      "locator": "rank: Proposition 6.3; polyChi: Theorem 1.1",
      "note": "Assign vertices to cover pieces and sum their bounds; q,r are uniform class constants.",
      "sourceLocators": {
        "rank": "Proposition 6.3",
        "polyChi": "Theorem 1.1"
      }
    },
    {
      "classes": [
        "Bounded twin-width"
      ],
      "formula": "C_d ω^{p_d}",
      "condition": "Twin-width at most a fixed d.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "twinPolyChi"
      ],
      "locator": "Theorem 1.2",
      "note": "The theorem proves polynomial existence for each d. Its Section 5 uses a separate almost-mixed-minor parameter, so it does not supply a numerical exponent directly in terms of d."
    },
    {
      "classes": [
        "Bounded twin-width"
      ],
      "formula": "(d+2)^{ω−1}",
      "condition": "Twin-width at most d; ω ≥ 1.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "twinAlgorithms"
      ],
      "locator": "Full version, Theorem 21",
      "note": "A supplied d-sequence is needed by the coloring algorithm; existence of the χ-bound does not require that a sequence be supplied."
    },
    {
      "classes": [
        "Twin-width at most 2"
      ],
      "formula": "4^{ω−1}",
      "condition": "Twin-width at most 2; ω ≥ 1.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "twinAlgorithms"
      ],
      "locator": "Theorem 21 with d=2",
      "note": "Theorem 18 also gives χ≤4 for triangle-free members. This is a verified numeric bound, not a claim of optimality."
    },
    {
      "classes": [
        "Twin-width at most 2"
      ],
      "formula": "C_2 ω^{p_2}",
      "condition": "Twin-width at most 2.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "twinPolyChi"
      ],
      "locator": "Theorem 1.2 with d=2",
      "note": "The theorem does not specify a numerical value of p_2."
    },
    {
      "classes": [
        "Monadically stable bounded twin-width",
        "Monadically stable bounded clique-width",
        "Monadically stable bounded linear clique-width",
        "Monadically stable bounded shrub-depth"
      ],
      "formula": "(2d+4)^{k−1} ω",
      "condition": "Twin-width at most d and index at most k, where index is defined at the start of Section 6 of the source.",
      "kind": "explicit",
      "growth": "linear",
      "sourceIds": [
        "stableTwin"
      ],
      "locator": "Theorem 6.1 and Corollary 6.2",
      "note": "Here d and k are uniform constants; k is the stability index defined by the source, with no explicit conversion from excluded half-graph order used here."
    },
    {
      "classes": [
        "Bounded reduced max-leaf",
        "Bounded reduced component max-leaf"
      ],
      "formula": "(k+2)^{ω−1}",
      "condition": "The indicated reduced leaf parameter is at most k; ω ≥ 1.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "reduced",
        "twinAlgorithms"
      ],
      "locator": "reduced: Section 2, reduced-parameter definitions; twinAlgorithms: Theorem 21",
      "note": "Derived: maximum degree of a connected graph is at most its maximum spanning-tree leaf number; extend a star centered at a maximum-degree vertex to a spanning tree. Thus these sequences are k-sequences.",
      "sourceLocators": {
        "reduced": "Section 2, reduced-parameter definitions",
        "twinAlgorithms": "Theorem 21"
      }
    },
    {
      "classes": [
        "Bounded reduced bandwidth"
      ],
      "formula": "(2b+2)^{ω−1}",
      "condition": "Reduced bandwidth at most b; ω ≥ 1.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "reduced",
        "twinAlgorithms"
      ],
      "locator": "reduced: Section 2, definitions; twinAlgorithms: Theorem 21",
      "note": "Derived: bandwidth b implies maximum degree at most 2b in every red graph.",
      "sourceLocators": {
        "reduced": "Section 2, definitions",
        "twinAlgorithms": "Theorem 21"
      }
    },
    {
      "classes": [
        "Bounded reduced cut-width"
      ],
      "formula": "(2c+2)^{ω−1}",
      "condition": "Reduced cut-width at most c; ω ≥ 1.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "reduced",
        "twinAlgorithms"
      ],
      "locator": "reduced: Section 2, definitions; twinAlgorithms: Theorem 21",
      "note": "Derived: an ordering of cut-width c has at most c earlier and at most c later neighbors at each vertex, so red degree is at most 2c.",
      "sourceLocators": {
        "reduced": "Section 2, definitions",
        "twinAlgorithms": "Theorem 21"
      }
    },
    {
      "classes": [
        "Bounded stretch-width"
      ],
      "formula": "(s+2)^{ω−1}",
      "condition": "Stretch-width at most s; ω ≥ 1.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "stretch",
        "twinAlgorithms"
      ],
      "locator": "stretch: Section 3, definition of interference/stretch; twinAlgorithms: Theorem 21",
      "note": "Derived: every red neighbor of a part interferes with that part, so the same sequence has red degree at most s.",
      "sourceLocators": {
        "stretch": "Section 3, definition of interference/stretch",
        "twinAlgorithms": "Theorem 21"
      }
    },
    {
      "classes": [
        "Bounded reduced max-leaf"
      ],
      "formula": "C_k ω^{p_k}",
      "condition": "Reduced max-leaf at most a fixed k.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "reduced",
        "twinPolyChi"
      ],
      "locator": "reduced: Section 2, reduced-parameter definitions; twinPolyChi: Theorem 1.2",
      "sourceLocators": {
        "reduced": "Section 2, reduced-parameter definitions",
        "twinPolyChi": "Theorem 1.2"
      },
      "note": "Derived: a connected graph of maximum degree Δ has a spanning tree with at least Δ leaves, by extending a Δ-leaf star. Thus maximum red degree is at most k. The polynomial coefficients and exponents remain symbolic."
    },
    {
      "classes": [
        "Bounded reduced component max-leaf"
      ],
      "formula": "C_k ω^{p_k}",
      "condition": "Reduced component max-leaf at most a fixed k.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "reduced",
        "twinPolyChi"
      ],
      "locator": "reduced: Section 2, reduced-parameter definitions; twinPolyChi: Theorem 1.2",
      "sourceLocators": {
        "reduced": "Section 2, reduced-parameter definitions",
        "twinPolyChi": "Theorem 1.2"
      },
      "note": "Derived: within every red component, extend a star at a maximum-degree vertex to a spanning tree; its number of leaves is at least that degree. Thus the same sequence has twin-width at most k. The polynomial coefficients and exponents remain symbolic."
    },
    {
      "classes": [
        "Bounded reduced bandwidth"
      ],
      "formula": "C_{2b} ω^{p_{2b}}",
      "condition": "Reduced bandwidth at most a fixed b.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "reduced",
        "twinPolyChi"
      ],
      "locator": "reduced: Section 2, reduced-parameter definitions; twinPolyChi: Theorem 1.2",
      "sourceLocators": {
        "reduced": "Section 2, reduced-parameter definitions",
        "twinPolyChi": "Theorem 1.2"
      },
      "note": "Derived: every vertex in a bandwidth-b ordering has at most b earlier and b later neighbors. Every red graph has maximum degree at most 2b, so twin-width is at most 2b. The polynomial coefficients and exponents remain symbolic."
    },
    {
      "classes": [
        "Bounded reduced cut-width"
      ],
      "formula": "C_{2c} ω^{p_{2c}}",
      "condition": "Reduced cut-width at most a fixed c.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "reduced",
        "twinPolyChi"
      ],
      "locator": "reduced: Section 2, reduced-parameter definitions; twinPolyChi: Theorem 1.2",
      "sourceLocators": {
        "reduced": "Section 2, reduced-parameter definitions",
        "twinPolyChi": "Theorem 1.2"
      },
      "note": "Derived: a cut-width-c ordering gives at most c earlier and c later neighbors at each vertex. Thus all red degrees are at most 2c, so twin-width is at most 2c. The polynomial coefficients and exponents remain symbolic."
    },
    {
      "classes": [
        "Bounded stretch-width"
      ],
      "formula": "C_s ω^{p_s}",
      "condition": "Stretch-width at most a fixed s.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "stretch",
        "twinPolyChi"
      ],
      "locator": "stretch: Section 3, definition of interference/stretch; twinPolyChi: Theorem 1.2",
      "sourceLocators": {
        "stretch": "Section 3, definition of interference/stretch",
        "twinPolyChi": "Theorem 1.2"
      },
      "note": "Derived: every red neighbor of a part interferes with that part. A sequence of stretch at most s is therefore an s-sequence. The polynomial coefficients and exponents remain symbolic."
    },
    {
      "classes": [
        "Bounded proper mixed-thinness"
      ],
      "formula": "(9k+2)^{ω−1}",
      "condition": "Proper mixed-thinness at most a fixed k.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "properMixedThin",
        "twinAlgorithms"
      ],
      "locator": "properMixedThin: Theorem 4.1; twinAlgorithms: Theorem 21",
      "note": "The structural χ-bound does not require a supplied representation.",
      "sourceLocators": {
        "properMixedThin": "Theorem 4.1",
        "twinAlgorithms": "Theorem 21"
      }
    },
    {
      "classes": [
        "Bounded proper mixed-thinness"
      ],
      "formula": "C_{9k} ω^{p_{9k}}",
      "condition": "Proper mixed-thinness at most a fixed k.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "properMixedThin",
        "twinPolyChi"
      ],
      "locator": "properMixedThin: Theorem 4.1; twinPolyChi: Theorem 1.2",
      "note": "Uses twin-width at most 9k.",
      "sourceLocators": {
        "properMixedThin": "Theorem 4.1",
        "twinPolyChi": "Theorem 1.2"
      }
    },
    {
      "classes": [
        "Non-crossing H-graphs (fixed H)"
      ],
      "formula": "(9q_H+2)^{ω−1}",
      "condition": "One uniform fixed multigraph H; m=|E(H)|≥1 and q_H=2^m(4^m−1)(m²+1)+m.",
      "kind": "explicit",
      "growth": "exponential",
      "sourceIds": [
        "nonCrossingH",
        "properMixedThin",
        "twinAlgorithms"
      ],
      "locator": "nonCrossingH: Theorem 8; properMixedThin: Theorem 4.1; twinAlgorithms: Theorem 21",
      "note": "The bound depends on the one fixed host H; it is not uniform over all hosts.",
      "sourceLocators": {
        "nonCrossingH": "Theorem 8",
        "properMixedThin": "Theorem 4.1",
        "twinAlgorithms": "Theorem 21"
      }
    },
    {
      "classes": [
        "Non-crossing H-graphs (fixed H)"
      ],
      "formula": "C_{9q_H} ω^{p_{9q_H}}",
      "condition": "One uniform fixed multigraph H; m=|E(H)|≥1 and q_H=2^m(4^m−1)(m²+1)+m.",
      "kind": "existential",
      "growth": "polynomial",
      "sourceIds": [
        "nonCrossingH",
        "properMixedThin",
        "twinPolyChi"
      ],
      "locator": "nonCrossingH: Theorem 8; properMixedThin: Theorem 4.1; twinPolyChi: Theorem 1.2",
      "note": "All host dependence is absorbed into constants; this is not a polynomial bound uniform over every H.",
      "sourceLocators": {
        "nonCrossingH": "Theorem 8",
        "properMixedThin": "Theorem 4.1",
        "twinPolyChi": "Theorem 1.2"
      }
    },
    {
      "classes": [
        "Bounded merge-width",
        "Monadically stable bounded merge-width"
      ],
      "formula": "(ω+1)! k^{2ω−2}",
      "condition": "Radius-2 merge-width at most k, with k≥1.",
      "kind": "explicit",
      "growth": "factorial",
      "sourceIds": [
        "neighborhoodMerge"
      ],
      "locator": "Theorem 1.2",
      "note": "For fixed k the growth is exp(O(ω log ω)); it is neither polynomial nor a fixed-base exponential in ω."
    },
    {
      "classes": [
        "Bounded merge-width"
      ],
      "formula": "Polynomial χ-binding function unknown",
      "condition": "The 2025 source leaves polynomial χ-boundedness open; no later resolution was verified in this audit.",
      "kind": "open",
      "growth": "unspecified",
      "sourceIds": [
        "neighborhoodMerge"
      ],
      "locator": "Conjecture 1.3",
      "note": "χ-boundedness itself is proved; only polynomial growth is conjectural.",
      "question": "polynomial"
    },
    {
      "classes": [
        "Bounded flip-width"
      ],
      "formula": "No χ-binding function verified",
      "condition": "The cited source asks whether the merge-width χ-bound extends to flip-width.",
      "kind": "open",
      "growth": "unspecified",
      "sourceIds": [
        "neighborhoodMerge"
      ],
      "locator": "Section 1.2, paragraph following Question 1.4",
      "note": "A conjectured equivalence with merge-width does not establish this claim."
    },
    {
      "classes": [
        "Bounded tree-independence number",
        "Bounded path-independence number"
      ],
      "formula": "R(a+1,ω+1)−1 ≤ binom(a+ω,a)−1",
      "condition": "Tree-independence number at most a; a≥1.",
      "kind": "explicit",
      "growth": "polynomial",
      "sourceIds": [
        "treeInd"
      ],
      "locator": "Lemma 3.2 and proof; combine with χ≤tw+1",
      "note": "For path-independence number at most a, use tree-independence number≤a. The polynomial has degree a."
    },
    {
      "classes": [
        "Bounded tree-independence number \\cap Bounded tree-chromatic number"
      ],
      "formula": "ac(1+floor(log₂ a))",
      "condition": "Tree-independence number≤a and tree-chromatic number≤c, with a,c fixed and a≥1.",
      "kind": "explicit",
      "growth": "constant",
      "sourceIds": [
        "treeChromaticProduct"
      ],
      "locator": "Theorem 1.3; combine with χ≤tw+1",
      "note": "This joint boundedness is much stronger than bounding tree-chromatic number alone."
    },
    {
      "classes": [
        "Bounded tree-chromatic number"
      ],
      "formula": "No χ-binding function exists",
      "condition": "Already false for tree-chromatic number≤2.",
      "kind": "negative",
      "growth": "none",
      "sourceIds": [
        "treeChromaticNotes"
      ],
      "locator": "Lemma 2.2 (HTML v1)",
      "note": "Shift graphs S_n are triangle-free, have path-χ=2 and hence tree-χ≤2, but χ(S_n)≥ceil(log₂ n)."
    },
    {
      "classes": [
        "Bounded minor-matching hypertree-width"
      ],
      "formula": "F(μ,ω)",
      "condition": "Induced matching treewidth at most μ; ω≥1. F(0,r)=F(μ,1)=1; for μ≥1,r≥2, F(μ,r)=2[F(μ−1,r)+(R₃(r+1,r+1,μ+1)−1)F(μ,r−1)].",
      "kind": "explicit",
      "growth": "unspecified",
      "sourceIds": [
        "inducedMatchingChi"
      ],
      "locator": "Theorem 1.3; Section 4 proof, final recurrence",
      "note": "R₃ is the three-color Ramsey number, not a two-color Ramsey number. This is the existing map node aliased as induced matching treewidth."
    },
    {
      "classes": [
        "Bounded minor-matching hypertree-width"
      ],
      "formula": "Polynomial χ-binding function unknown",
      "condition": "The cited November 2025 source leaves this question open; no later resolution was verified in this audit.",
      "kind": "open",
      "growth": "unspecified",
      "sourceIds": [
        "inducedMatchingRevisited"
      ],
      "locator": "Question 5.4",
      "note": "The known recursive χ-bound should not be relabeled polynomial.",
      "question": "polynomial"
    },
    {
      "classes": [
        "Bounded induced P3-packing treewidth"
      ],
      "formula": "F₃(k,ω)",
      "condition": "Induced P3-packing treewidth≤k. F₃(0,r)=2^{r−1}, F₃(k,1)=1; for k≥1,r≥2, a=F₃(k,r−1) and F₃(k,r)=2a+1+2[F₃(k−1,r)+(2^{r−1}+3ka)(1+4k)a].",
      "kind": "explicit",
      "growth": "unspecified",
      "sourceIds": [
        "packingTreewidthII"
      ],
      "locator": "Theorem 1.5; Section 4.1, Theorem 4.5 and its recurrence",
      "note": "This explicit recursive function specializes t=3. No polynomial claim is made."
    },
    {
      "classes": [
        "Bounded sim-width"
      ],
      "formula": "χ-boundedness is an open question in the cited source",
      "condition": "No later resolution was verified in this audit.",
      "kind": "open",
      "growth": "unspecified",
      "sourceIds": [
        "inducedMatchingChi"
      ],
      "locator": "Problem 5.5",
      "note": "The 2026 induced-packing result addresses additional excluded obstructions; it does not prove χ-boundedness for all bounded-sim-width classes."
    },
    {
      "classes": [
        "Bounded mim-width"
      ],
      "formula": "Polynomial χ-boundedness is an open question in the cited source",
      "condition": "For every fixed mim-width bound k; no later resolution verified in this audit.",
      "kind": "open",
      "growth": "unspecified",
      "sourceIds": [
        "mimChiQuestion"
      ],
      "locator": "Section 12, pages 8–9",
      "note": "This source asks specifically for polynomial χ-boundedness; it does not by itself settle whether a nonpolynomial χ-bound exists.",
      "question": "polynomial"
    },
    {
      "classes": [
        "Bounded o-mim-width",
        "Bounded linear mim-width"
      ],
      "formula": "No direct χ-binding formula verified by this audit",
      "condition": "Do not infer a positive formula from bounded clique-width or from bounded induced matching treewidth.",
      "kind": "unchecked",
      "growth": "unspecified",
      "sourceIds": [],
      "locator": "Audit gap",
      "note": "These labels are retained as unchecked rather than asserting an unsupported positive theorem or a stronger open-problem claim.",
      "evidenceKind": "elementary"
    },
    {
      "classes": [
        "Bounded functionality"
      ],
      "formula": "No χ-binding function verified in this audit",
      "condition": "The checked primary sources do not settle a χ-binding theorem for the full bounded-functionality family.",
      "kind": "unchecked",
      "growth": "unspecified",
      "sourceIds": [
        "functionality2021",
        "auditFunctionalityBoxes2024",
        "auditFunctionalityRandom2024"
      ],
      "locator": "Scope of this source audit",
      "sourceLocators": {
        "functionality2021": "Sections 1–3",
        "auditFunctionalityBoxes2024": "Introduction and Section 6",
        "auditFunctionalityRandom2024": "Abstract and introduction"
      },
      "note": "The cited papers establish structural comparisons and functionality bounds. No χ-binding theorem depending only on a fixed functionality bound was verified here; this is not a claim of failure or a sourced open problem."
    },
    {
      "classes": [
        "Bounded dissociation deletion number"
      ],
      "formula": "k + 2",
      "condition": "κ₂(G) ≤ k, where k is one fixed bound on the minimum deletion number for the entire class.",
      "kind": "explicit",
      "growth": "constant",
      "sourceIds": [],
      "locator": "Coloring after vertex deletion",
      "note": "Color the maximum-degree-one remainder with two colors and the at most k deleted vertices with fresh colors. The same bound holds for every induced subgraph by restricting the deletion set.",
      "evidenceKind": "elementary",
      "checkedOn": "2026-11-01"
    },
    {
      "classes": [
        "Bounded r-CoC (fixed r ≥ 2)"
      ],
      "formula": "k + r",
      "condition": "κ_r(G) ≤ k, with one fixed r ≥ 2 and one fixed k throughout the class. Here k bounds r-CoC deletion number.",
      "kind": "explicit",
      "growth": "constant",
      "sourceIds": [],
      "locator": "Coloring after vertex deletion",
      "note": "Reuse r colors across the components of G-X and give the at most k deleted vertices fresh colors. Restricting X proves the same bound on induced subgraphs.",
      "evidenceKind": "elementary",
      "checkedOn": "2026-11-01"
    },
    {
      "classes": [
        "Bounded vertex integrity"
      ],
      "formula": "v",
      "condition": "Vertex integrity vi(G) ≤ v, with one fixed v throughout the class.",
      "kind": "explicit",
      "growth": "constant",
      "sourceIds": [],
      "locator": "Coloring from a vertex-integrity modulator",
      "note": "Use |S| colors on a witnessing deletion set S and at most max|C| colors on every residual component, reusing that palette between components. Restrict the same deletion set for each induced subgraph; its vertex integrity remains at most v.",
      "evidenceKind": "elementary",
      "checkedOn": "2026-11-01"
    }
  ];
  const sources = relations.sources;
  const elementaryFindings = [
    { classes: ["Perfect"], formula: "ω", condition: "Every induced subgraph is perfect.", kind: "explicit", growth: "linear", sourceIds: [], locator: "Definition of a perfect graph", note: "χ(H) = ω(H) for every induced subgraph H.", evidenceKind: "definition" },
    { classes: ["Bipartite"], formula: "2", condition: "Nonempty bipartite graphs.", kind: "explicit", growth: "constant", sourceIds: [], locator: "Bipartition", note: "The two independent parts give a proper 2-coloring, also after vertex deletion.", evidenceKind: "elementary" },
    { classes: ["Bounded degeneracy"], formula: "d + 1", condition: "d is a fixed upper bound on degeneracy, including every induced subgraph.", kind: "explicit", growth: "constant", sourceIds: [], locator: "Greedy coloring in a degeneracy ordering", note: "Remove a vertex of degree at most d recursively and color in reverse order.", evidenceKind: "elementary" },
    { classes: ["Bounded tree-width"], formula: "w + 1", condition: "w is a fixed upper bound on treewidth.", kind: "explicit", growth: "constant", sourceIds: [], locator: "Treewidth bounds degeneracy", note: "A graph of treewidth at most w has degeneracy at most w. The bound is preserved by induced subgraphs.", evidenceKind: "elementary" },
    { classes: ["Bounded cochromatic number"], formula: "kω", condition: "k is a fixed upper bound on the number of clique or independent-set parts.", kind: "explicit", growth: "linear", sourceIds: [], locator: "Cochromatic partition", note: "Color the at most k parts with disjoint palettes; each clique or independent part uses at most ω colors when ω >= 1.", evidenceKind: "elementary" },
    { classes: ["Bounded vertex cover number"], formula: "k + 1", condition: "k is a fixed upper bound on the vertex cover number.", kind: "explicit", growth: "constant", sourceIds: [], locator: "Vertex cover and independent remainder", note: "Give the cover distinct colors and color its independent remainder with one additional color.", evidenceKind: "elementary" },
    { classes: ["Bounded distance to Bipartite"], formula: "k + 2", condition: "k vertices suffice to leave a bipartite graph.", kind: "explicit", growth: "constant", sourceIds: [], locator: "Coloring after vertex deletion", note: "Use two colors on the bipartite remainder and k fresh colors on the deleted vertices.", evidenceKind: "elementary" },
    { classes: ["Bounded distance to Perfect"], formula: "ω + k", condition: "k vertices suffice to leave a perfect graph.", kind: "explicit", growth: "linear", sourceIds: [], locator: "Coloring after vertex deletion", note: "The perfect remainder needs at most ω(G) colors; use fresh colors on the at most k deleted vertices. Restrict the same deletion set for each induced subgraph.", evidenceKind: "elementary" },
    { classes: ["Bounded chromatic number"], formula: "c", condition: "c is a uniform chromatic-number bound for the selected class.", kind: "explicit", growth: "constant", sourceIds: [], locator: "Definition", note: "Restrict a c-coloring to each induced subgraph.", abstract: true, evidenceKind: "definition" },
    { classes: ["Linearly \\chi - bounded"], formula: "aω + b", condition: "a and b are constants uniform over the selected class.", kind: "existential", growth: "linear", sourceIds: [], locator: "Definition", note: "The class property guarantees a linear binding function; this record gives no numeric coefficients.", abstract: true, evidenceKind: "definition" },
    { classes: ["Polynomially \\chi - bounded"], formula: "Cω^a", condition: "C and a are constants uniform over the selected class.", kind: "existential", growth: "polynomial", sourceIds: [], locator: "Definition", note: "The class property guarantees a polynomial binding function; this record gives no numeric exponent.", abstract: true, evidenceKind: "definition" },
    { classes: ["\\chi - bounded"], formula: "f𝒞(ω)", condition: "f𝒞 is a nondecreasing function depending only on the selected class.", kind: "existential", growth: "unspecified", sourceIds: [], locator: "Definition", note: "χ-boundedness supplies a binding function; no explicit rate is recorded in this entry.", abstract: true, evidenceKind: "definition" }
  ];
  const findings = [...elementaryFindings, ...researchFindings].map((finding, index) => ({ id: `chi-${index}`, ...finding }));
  const canonicalNames = new Map(graph.classes.map((label) => [relations.normalize(label), label]));
  const cache = new Map();
  const positiveKinds = new Set(["explicit", "existential"]);
  const growthOrder = { constant: 0, linear: 1, polynomial: 2, quasipolynomial: 3, exponential: 4, factorial: 5, "double-exponential": 6, unspecified: 7 };

  function resolve(label) {
    const migrated = relations.resolveClassLabel(label);
    return canonicalNames.get(relations.normalize(migrated)) || migrated;
  }

  function proof(from, to) {
    if (from === to) return { kind: "definition", sourceIds: [], steps: [] };
    const result = relations.trace(from, to);
    return ["paper", "derived", "definition", "elementary"].includes(result.kind) ? result : null;
  }

  function getResults(label) {
    const selected = resolve(label);
    if (cache.has(selected)) return cache.get(selected);
    const positive = [], negative = [], open = [], conditional = [], unverified = [];
    for (const finding of findings) {
      let candidates = [];
      for (const origin of finding.classes) {
        // Upper bounds restrict to subclasses. Counterexamples propagate to superclasses.
        const path = finding.kind === "negative" ? proof(origin, selected)
          : positiveKinds.has(finding.kind) ? proof(selected, origin)
          : selected === origin ? proof(selected, origin) : null;
        if (path) candidates.push({ ...finding, origin, inherited: selected !== origin, proof: path });
      }
      candidates.sort((a, b) => a.proof.steps.length - b.proof.steps.length);
      if (!candidates.length) continue;
      const result = candidates[0];
      if (positiveKinds.has(finding.kind) && finding.conditional) conditional.push(result);
      else if (positiveKinds.has(finding.kind)) positive.push(result);
      else if (finding.kind === "negative") negative.push(result);
      else if (finding.kind === "open") open.push(result);
      else if (finding.kind === "unchecked") unverified.push(result);
    }
    const concrete = positive.filter((finding) => !finding.abstract);
    const displayed = concrete.length ? concrete : positive;
    displayed.sort((a, b) => (growthOrder[a.growth] ?? 7) - (growthOrder[b.growth] ?? 7)
      || Number(a.inherited) - Number(b.inherited)
      || a.proof.steps.length - b.proof.steps.length);
    const result = {
      selected, positive: displayed, negative, open, conditional, unverified,
      status: displayed.length && negative.length ? "conflict" : displayed.length ? "bounded" : negative.length ? "not-bounded" : open.some((finding) => finding.question !== "polynomial") ? "open" : "unchecked"
    };
    cache.set(selected, result);
    return result;
  }

  function citations(finding) {
    const entries = new Map();
    for (const id of finding.sourceIds) entries.set(id, { id, reference: sources[id], locators: [finding.sourceLocators?.[id] || finding.locator] });
    for (const entry of relations.citations(finding.proof)) {
      if (!entries.has(entry.id)) entries.set(entry.id, { ...entry, locators: [...entry.locators] });
      else entries.get(entry.id).locators.push(...entry.locators);
    }
    return [...entries.values()].map((entry) => ({ ...entry, locators: [...new Set(entry.locators.filter(Boolean))] }));
  }

  window.GRAPH_CLASS_CHI_BINDING = { checkedOn: "2026-11-01", sources, findings, getResults, citations, resolve };
})();
