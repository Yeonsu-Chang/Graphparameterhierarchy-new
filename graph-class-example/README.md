# Bounded Parameter Graph Classes Example

This folder is independent from the homepage.

Open `index.html` in a browser to view the mockup.

## Mathematical convention

If bounded parameter A implies bounded parameter B, then:

```text
{ graph classes with bounded A } subset { graph classes with bounded B }
```

So the page uses nested Euler diagrams for known implications. A Venn-style overlap is used only when the example data does not record a clear inclusion.

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
counterparts. The merge/flip edge cites Theorem 7.6 with the source node explicitly
labeled `(2r-1)-merge-width` and the target `r-flip-width`. This records the proved
radius adjustment, not a same-radius comparison. Old r-merge and track-number
class links redirect to their corrected nodes through the recorded label aliases.

`All graphs` is the universal superclass. The previously maximal components
connect to it by definition; the remaining classes reach it through the existing
supported inclusions and equivalences. No paper citation is invented for these
definitional relations.

The expanded audit registers 61 references. Of 422 raw relation records (including
reciprocal equivalence records), 413 have a supported direct or composed argument,
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

The machine-readable audit is `../research/class-relation-audit-2026-10-26.json`.
Regenerate it with `node research/export-class-relation-audit.cjs` after changing
the relation data or evidence.

Run `node --test tests/*.test.cjs` from the repository root to check the citation
metadata, proof paths, equivalence groups and complexity catalog.
