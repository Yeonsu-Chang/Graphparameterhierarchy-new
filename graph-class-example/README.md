# Graph Class Map

Open `index.html` to explore the published Class Map. Its class data and evidence
are maintained in this folder. The map shares `../graph-notation.js` with the
homepage, and selected homepage parameters link to their canonical class entries.

## Mathematical convention

If bounded parameter A implies bounded parameter B, then:

```text
{ graph classes with bounded A } subset { graph classes with bounded B }
```

The graph displays supported inclusion and functional-equivalence relations.
Transitive reduction can hide redundant edges without removing their evidence
from the relation selector.

## Edit data

Change `data.js` to add parameters, implication edges, notes, and example comparisons.

## Complexity results

`complexity-data.js` records problem results and paper links independently of the
inclusion graph. `complexity.js` renders the selected class's results below the
relation graph, with separate graph-problem and model-checking lists.

FPT and XP labels include their parameter. Required representations or contraction
sequences remain visible beside conditional results. Grey conditions appear
inline with their result badges, like the `All graphs` scope labels; long
conditions wrap on narrow screens. Conjecture warnings remain separate and
prominent. A compact legend above the tables defines only the parameter symbols
currently shown; the meaning of `w`
follows the selected class's results. Result tooltips retain problem-specific units
for `k`, including deletion set size, selected edges, and requested path vertices.
Unverified entries are marked
`Unchecked`, not `Open`. An unverified cell has no finding object or paper link;
the renderer supplies the placeholder. Conjectural results carry `certainty: "conjecture"` and
display a separate `CONJECTURE` label, dashed result badge, and `Not proved` note;
they never use the established-algorithm color. The source
survey is in `../research/class-complexity-survey-2026-10-26.md`.

The catalog contains 20 graph problems and three model-checking problems. List
Coloring uses arbitrary input lists, not the list chromatic number. Edge Dominating
Set and Induced Matching are distinct from Maximum Matching. General-graph
algorithms are collected in the `All graphs` class, including FPT(k) for
Vertex Cover, k-Path, Feedback Vertex Set, Odd Cycle Transversal, Edge Dominating
Set and unweighted Max-Cut, FPT(t) for Steiner Tree, polynomial Matching, and
quasipolynomial Graph Isomorphism. These algorithms also remain available in
other classes rather than leaving known general results `Unchecked`. Each such
finding displays an `All graphs` scope label; a class-dependent finding in the
same row does not inherit that label. The universal class omits the redundant
scope labels beside its own results. Unconditional class-specific P algorithms
take precedence over general FPT fallbacks, while different parameterizations
remain distinct. `?class=All+graphs#complexity` opens the common results directly.

Graph problems have separate Optimization and Decision tabs. Optimization uses
Maximum/Minimum names (16 problems); Decision uses k-Independent Set, k-Vertex
Cover, q-Coloring, k-Path, and explicit size thresholds (20 problems). Hamiltonian
Path/Cycle, List Coloring and Graph Isomorphism are decision-only entries.
Solution-size and color-budget parameterizations stay in the Decision tab;
FPT(k) is not presented as an algorithm for unrestricted optimization. Structural
FPT/XP results and terminal-parameterized Steiner Tree remain available in both
forms. Completeness labels become hardness labels for optimization. Max-Cut's
decision form is not named k-Cut, which denotes a different problem.
Findings carry an explicit `form` (optimization, decision or both). Decision never
reuses optimization-only findings, paper links or conditions. Shared P/FPT/XP
algorithms remain available in both tabs. Twin-width Independent Set and
Dominating Set decision entries show their solution-size FPT results, citing FO
model checking and the direct algorithms in Twin-width III. Their optimization
hardness is not reintroduced as an inferred NP-complete decision entry (including
via Independent Set / Vertex Cover duality). This is a display distinction, not a
claim that FPT rules out classical NP-completeness. For fixed twin-width bound d,
FPT(d+k) is FPT in k, with the contraction sequence supplied. For twin-width,
q-Coloring uses the fixed-color decision result in Section 4, Theorem 2 and
Corollary 3 of Bonnet (2026): para-NP-complete in q, already for q=3 and
twin-width at most 4, even with a supplied 4-sequence. This completeness label
combines the stated NP-hardness with polynomial verification of a coloring.
Minimum Coloring keeps its width-3 optimization lower bound. Theorem 1 also
covers variable-budget decision coloring at width 3, but does not establish
fixed-q hardness there; that distinct result is not used for the parameter-q
entry. Hamiltonian Cycle retains its separately verified decision lower bound.
Projected duplicate bounds are merged without discarding their papers.
For threshold problems, Decision prioritizes recorded parameterized bounds: an
unparameterized classical NP-complete finding is omitted when that row has a
parameterized result. The classical finding and its optimization consequence stay
in the catalog and Optimization tab. This also applies after Independent Set /
Vertex Cover duality, preventing an omitted classical result from reappearing.
This presentation rule does not assert that FPT and NP-completeness contradict.

Reverified coloring entries distinguish the budget parameter from minimization:
Circular-arc has FPT(q) via Chaplick and Zeman, Proposition 4.3; simultaneous
interval number has FPT(d+q) via Theorem 40 of Beisegel et al. Circle graphs have
para-NP-complete(q) at each fixed q >= 4 (Unger 1988), while the q=3 slice has a
quasipolynomial algorithm (2025 preprint, Theorem 3.1). The latter is not an
algorithm for arbitrary q. Line graphs, claw-free graphs and planar graphs record
their q=3 hardness explicitly. Fixed-q results do not create a parameter-q
optimization claim. Arbitrary-list List Coloring remains a separate problem.

The latest verification ledger is
`../research/complexity-verification-2026-10-26.md`. Finding `locator` fields are
shown in result and citation tooltips without adding more visible table columns.
Independent Set and Vertex Cover transfer classical and structural bounds through
`tau(G) = |V(G)| - alpha(G)`, but never transfer a solution-size FPT(k) claim.
Hamiltonian Path lower bounds also apply to k-Path by setting k to the graph
order, hence imply hardness of Longest Path optimization without transferring a
parameter-k lower bound. The unweighted Max-Cut decision problem has a general
FPT(k) entry using the random-cut bound and enumeration on at most 4k incident
vertices; that entry does not appear in unrestricted optimization.

Verified equivalences connect clique-width, linear clique-width, treewidth,
pathwidth, treedepth, vertex-cover, cutwidth and degeneracy result profiles.
Transferred findings retain their input requirements and add the comparison
papers. Width names follow the selected parameter; representation-specific
widths remain explicitly named. Global algorithms do not acquire unnecessary
equivalence citations. Clique-width algorithms also cite FPT rank-decomposition
construction when no expression is supplied.

Use `?class=interval#complexity` to link directly to a class's complexity section.

Reduced component max-leaf records MIS and Maximum Induced Matching through
finite sigma-Neighborhood, and Maximum Clique through complementation. These
are `XP(w)` with a supplied contraction sequence, in both problem forms; Vertex
Cover also follows by solution complementation. The same sequence gives the
bound for reduced max-leaf. See `../research/reduced-max-leaf-complexity-2026-10-28.md`.

## Hierarchy sources

`relation-sources.js` records evidence for inclusion and functional-equivalence
relations independently of the graph's transitive reduction. Selecting an edge
or choosing a relation in the source selector shows a compact, deduplicated
bibliography with theorem locations below the map. Class lists contain only class
navigation buttons, without a separate citation button on every row.
The selector includes composed subclass/superclass relations even when transitive
reduction hides their graph edge, while visible-edge entries retain highlighting.
The selected relation appears only in the selector; intermediate relations and
routine prose proofs are retained in the evidence model, not repeated on screen.

Paper-backed steps, definitions and elementary arguments are distinguished.
Unchecked steps remain explicitly unverified, even when neighboring steps have
citations. Projected edges between equivalent representatives are explained by
paths in the original relation data; citations are not copied to unrelated edges.
The path finder prefers fully supported paths over unchecked shortcuts.

All-radius merge-width and flip-width classes are distinct from their fixed-radius
counterparts. The merge/flip edge keeps the explicit source radius
`(2r-1)-merge-width` and target `r-flip-width`, matching Theorem 7.6. The
all-radius merge/flip edge also retains its proof. The class bibliography
explains the radius adjustment; navigation aliases do not change proof endpoints.

`All graphs` is the universal superclass. The previously maximal components
connect to it by definition; the remaining classes reach it through the existing
supported inclusions and equivalences. No paper citation is invented for these
definitional relations.

The published audit registers 95 references. Of 493 raw relation records (including
reciprocal equivalence records), 484 have a supported direct or composed argument,
9 are excluded, and none remain Unchecked. Excluded records are retained for audit
but do not enter graph reduction, equivalence groups, or citation proof paths.
Homepage parameter edges are checked against these exclusions and every shared
parameter relation must have supported Class Map evidence.

The source-provenance review is recorded in
`../research/relation-source-provenance-2026-10-26.md`. Existing comparisons cite
their earlier source rather than treating a later restatement or improved bound
as the origin. A consequence of an older theorem is marked `Derived` with the
premise's citation. Later papers remain where they prove the displayed result or
supply a needed part of the proof; publication dates are not claims of priority.

Interval-track number and track-layout number are separate nodes. The old
interval-number/track-layout equivalence is excluded. Chordality means chordal
intersection dimension and is labeled accordingly. Disconnected graphs are in
scope, with infinite distance between components; finite component diameter is
handled by the separate maximum-component-diameter node. Max-leaf on disconnected
graphs uses the total leaf count of a spanning forest, not component max-leaf.
For reduced max-leaf, isolated red vertices are not leaves, as specified by the
user. This permits its bound through linear clique-width and total twin-width.

The current machine-readable audit is `../research/class-relation-audit-2026-11-01.json`.
Regenerate it with `node research/export-class-relation-audit.cjs` after changing
the relation data or evidence.

Run `node --test tests/*.test.cjs` from the repository root to check the citation
metadata, proof paths, equivalence groups and complexity catalog.

## Published additions, 1 November 2026

The published map contains 203 classes: the previous 190 classes and 13 additions.
The authoritative scope is
[`../research/published-class-additions-2026-11-01.json`](../research/published-class-additions-2026-11-01.json).
It records the published and deferred class names separately.

The additions cover these groups:

- Neighborhoods: `Linear neighborhood complexity`, `Almost linear neighborhood
  complexity`, and `Bounded VC-dimension`.
- Tree decompositions: `Bounded induced P3-packing treewidth`, `Bounded
  tree-chromatic number`, and the intersection of bounded tree-independence and
  bounded tree-chromatic number.
- Dense graph widths: `Twin-width at most 2`, `Bounded proper mixed-thinness`, and
  `Non-crossing H-graphs (fixed H)`.
- Functionality: `Bounded functionality`.
- Deletion and component parameters: `Bounded dissociation deletion number`,
  `Bounded r-CoC (fixed r ≥ 2)`, and `Bounded vertex integrity`.

The 24 deferred additions involving induced exclusions, including the intersection
node, are not part of this publication. Existing classes such as `Claw-free` remain.
Deferred working material is preserved locally in
`output/deferred-2026-11-01/free-classes.json`; it is not a published site asset.
The older local research fragments are not the specification for this release.

`classDetails` supplies definitions and expandable class bibliographies with
source locations. These references are separate from the evidence for an
individual inclusion. `classAliases` supports navigation without creating
duplicate nodes or equivalence claims. The unfiltered list includes every class.
Fixed hosts and structural parameter bounds are uniform throughout each
represented graph class, rather than chosen separately for each input graph.

Linear and almost-linear neighborhood complexity use traces N(v) intersect A
for all vertices v, including vertices in A. The corresponding inclusions do not
assert a converse to monadic dependence. Bounded VC-dimension does not imply
bounded twin-width. Induced P3-packing treewidth and sim-width are not identified;
the recorded comparisons retain their direction and hypotheses.

Bounded functionality receives the recorded degeneracy, twin-width, clique-width
and intersection-graph subclasses and implies bounded VC-dimension. The checked
structural papers do not supply a verified χ-binding function for the full
bounded-functionality family. Its χ panel therefore says `Unchecked`, without
asserting a counterexample or a sourced open problem. These structural additions
do not automatically add class-specific algorithms to the complexity catalog.

## χ-binding functions

`chi-binding-data.js` records 60 findings independently of coloring-algorithm
complexity. `chi-binding.js` renders explicit functions, existential bounds,
negative results, source-audit limitations and precisely scoped open questions.
The convention is χ(H) ≤ f(ω(H)) for every nonempty induced subgraph H, with all
structural parameters fixed uniformly across the class. Set χ=ω=0 for the empty
graph; logarithmic expressions are used only in their stated domain.

Width-dependent constants, unspecified coefficients and existential exponents
stay symbolic. Additional hypotheses, such as a simple root for a line graph,
appear separately and do not establish a bound for a larger class. The strongest
recorded growth and a directly stated explicit bound remain visible when many
superclass bounds are inherited. Upper bounds are not claimed optimal unless
stated and do not imply exact coloring running times.

Supported upper bounds transfer to subclasses; counterexample families transfer
to superclasses. Open questions stay attached to their stated class, and a
polynomial strengthening does not become an open ordinary χ-boundedness claim.
Bounded tree-chromatic number is not χ-bounded, as witnessed by shift graphs.
Its intersection with bounded tree-independence number has bounded treewidth
and hence a constant chromatic bound.

The 203 published classes split into 160 with verified upper bounds, 3 with
verified counterexamples, 2 with a cited open ordinary χ-boundedness question,
and 38 without an ordinary bound verified in this catalog. This coverage is a
catalog audit, not a completeness theorem. Likewise, zero Unchecked inclusion
records certifies evidence coverage; it does not mean every underlying paper
proof has been independently re-proved.

## Dissociation deletion and component order connectivity

`Bounded dissociation deletion number` means a uniform bound k on the minimum
vertex deletions leaving maximum degree at most one. Its aliases include
`Bounded 2-CoC` and `Bounded 3-path vertex-cover number`. This removes ordinary
P3 subgraphs, unlike induced-P3 removal for Cluster deletion. If d is the maximum
size of a retained set inducing maximum degree at most one, the deletion number
is n-d. No ambiguous bare dissociation-number alias is registered.

`Bounded r-CoC (fixed r ≥ 2)` uses one fixed component-order limit r and one
uniform deletion bound k for each represented class. The r=1 specialization is
vertex cover. The family receives 2-CoC without a reverse equivalence: disjoint
P3s distinguish the parameters when r≥3. Only the 2-CoC node has the recorded
links to bounded deletion distance to Cluster, Linear forest and Bipartite, and
to bounded feedback vertex set. These links are not claimed for arbitrary r≥3.

Both classes imply bounded treedepth, pathwidth and chromatic number. The
recorded elementary proofs give td≤k+r, pw≤k+r-1 and χ≤k+r, specialized to k+2,
k+1 and k+2 for 2-CoC. Restricting the deletion set proves the coloring bound for
every induced subgraph. Fixed r is essential.

Vertex integrity is vi(G)=min_S (|S|+max_C |C|), where C ranges over components of
G−S and an empty remainder has maximum zero. The explicit homepage chain is
vertex cover → dissociation deletion → fixed-r CoC → vertex integrity → treedepth.
The Class Map records the same supported inclusions and the constant bound
f(ω)=v for a uniform vertex-integrity bound v. The source papers establish the
parameter definitions and research context; the elementary coloring and
decomposition arguments are not presented as paper theorems.

## Display and navigation

Both pages share `../graph-notation.js`. DOM labels use real subscripts, while
canvas and select labels use Unicode indices. Search accepts ASCII, explicit
underscore notation and Unicode subscripts. Canonical names, relation keys and
URL class values are preserved. The renderer treats data as text and keeps
formula exponents and parameter subscripts separate from graph-name formatting.

Homepage search aliases include 2-CoC, r-CoC, treedepth and explicit merge-radius
spelling variants. They do not create extra equivalence nodes. The homepage and
Class Map retain `(2r-1)-merge-width` and its proved comparison to r-flip-width;
plain r-merge-width is not an interchangeable radius. All-radius merge→flip and
the recorded inputs from merge-width and twin-width remain supported.

Selected homepage parameters with a recorded Class Map mapping link to their
canonical classes. `?parameter=...` opens a homepage selection; `?class=...` opens
a Class Map selection. All published classes continue to reach `All graphs`.
