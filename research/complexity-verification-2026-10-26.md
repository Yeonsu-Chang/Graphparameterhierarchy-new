# Complexity Re-verification, 26 October 2026

## Scope and Standard

All 190 class labels and both problem-form projections were checked for parameter
and form consistency. The affected scientific claims below were checked against
the primary paper's theorem, proof or publisher abstract, not just its title.
This ledger records the targeted re-verification; it is not a claim that every
possible class/problem combination has been classified or every cited paper
has been independently reproved.

A bare classical NP-completeness statement is not a parameterized lower bound.
FPT and classical NP-completeness can coexist. The Decision view prioritizes a
recorded parameterized result for a threshold problem; verified classical bounds
remain in the underlying catalog and Optimization view. This rule also runs after
Independent Set / Vertex Cover duality.

## Verified Changes

| Class and problem | Retained statement | Primary evidence and scope |
| --- | --- | --- |
| Circular-arc, q-Coloring | FPT(q), graph input sufficient | [Chaplick and Zeman 2017](https://arxiv.org/pdf/1706.00575), Proposition 4.3. Circular-arc graphs are K3-graphs. List q-Coloring uses a common q-color palette; ordinary coloring is a special case. |
| Simultaneous interval number d, q-Coloring | FPT(d+q), no representation required | [Beisegel et al. 2024](https://arxiv.org/html/2404.10670), Theorem 40: q^{O(dq)} n. Theorem 39's hardness at d=2 allows the color budget to grow with the input. |
| Circle, fixed q >= 4 | para-NP-complete(q) | [Unger 1988](https://link.springer.com/chapter/10.1007/BFb0035832), abstract explicitly states NP-completeness for every fixed q >= 4. No q=3 hardness is inferred. |
| Circle, q=3 | Quasipolynomial time, only this slice | [E S et al. 2025 preprint](https://arxiv.org/html/2511.09707), Theorem 3.1 and abstract. No arbitrary-q algorithm or polynomial-time claim is inferred. |
| Line graph and claw-free, q=3 | para-NP-complete(q) | [Holyer 1981](https://doi.org/10.1137/0210055), cubic edge-coloring hardness. Vertex coloring of the line graph is edge coloring of the root graph; line graphs are claw-free. Membership in NP is by a coloring certificate. |
| Planar, q=3 | para-NP-complete(q) | [Garey, Johnson and Stockmeyer 1976](https://www.acs.uwinnipeg.ca/ychen2/journalpapers/Garey-Johnson-2maxsat.pdf), Section 2, Theorems 2.2-2.3. The fixed-q condition is preserved for the distance-to-Planar class at distance zero. |
| c-closure, Independent Set | FPT(c+k) | [Koana et al. 2020](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2020.65), Proposition 1.3, a ck^2-vertex kernel. Replaces the later survey-style citation with the original result. |
| c-closure, Dominating Set | FPT(c+k) | Same paper, Theorem 4.17, (ck)^{O(k)} algorithm. Does not assert FPT(c) for unrestricted optimization. |
| Cocomparability, Hamiltonian Path | P | [Mertzios and Corneil 2012](https://doi.org/10.1137/100793529), Longest Path algorithm. Test whether its optimum is the graph order. Cycle retains its distinct cycle-algorithm citation. |

The fixed-q findings are explicitly decision-only. They do not transfer a
parameter-q algorithm or completeness classification to unrestricted Minimum
Coloring. Optimization retains its independently recorded NP-hardness.

The general FPT(k) Vertex Cover entry also links to
[Chen, Kanj and Xia 2010](https://doi.org/10.1016/j.tcs.2010.06.026),
Improved upper bounds for vertex cover. Its bibliography was checked against the
publisher record and an author's publication list. This is a supporting algorithm
reference, not an assertion that the elementary 2^k branching bound originated in
2010, nor that this paper gives the current fastest algorithm.

## Removed Unverified Annotation

Proper interval Maximum Cut had an explicit `Unchecked` result object containing
a paper link and a claim about the current literature status. The object and its
live bibliography entry were removed. Optimization now has an empty cell rendered
as `Unchecked`, with no paper. Decision retains the independently justified
general unweighted FPT(k) algorithm, visibly labeled `All graphs`.
No P, hardness, or currently-open assertion
is made for unrestricted Maximum Cut on this class.

Empty cells are not scientific open-problem claims. Correctly sourced conjectures
remain explicitly labeled CONJECTURE / Not proved, not as established algorithms.

## Additional High-risk Claims Rechecked and Retained

- [Mueller 1996](https://www.sciencedirect.com/science/article/pii/0012365X95000574):
  the primary abstract explicitly covers both Hamiltonian Circuit and Hamiltonian
  Path on chordal bipartite and strongly chordal split graphs. The Path claim was
  not deleted merely because the title says circuits.
- [Guruswami 1999](https://www.sciencedirect.com/science/article/pii/S0166218X99000566):
  Maximum Cut is polynomial on line graphs; the total-graph hardness is separate.
- [Nash 2026](https://jgaa.info/index.php/jgaa/article/view/3137): polynomial-time
  maximum-weight induced forest on circle graphs, hence polynomial FVS by
  complementing the vertex set.
- [Bhore et al. 2019](https://arxiv.org/pdf/1909.03872): Steiner Tree algorithms
  for interval and circular-arc graphs are explicitly discussed, not inferred
  from the paper's Balanced Connected Subgraph title alone.
- [Kratsch and Stewart 1993](https://epubs.siam.org/doi/abs/10.1137/0406032):
  the abstract explicitly lists minimum dominating, total dominating, connected
  dominating and independent dominating sets.
- [Beisegel et al. 2024](https://arxiv.org/html/2404.10670), Theorem 31 supports
  Maximum Clique FPT(d) without a supplied simultaneous representation; Theorem
  41 requires a representation for the Independent Set / Dominating Set bound.
- [Bodlaender et al. 2025](https://link.springer.com/article/10.1007/s00453-024-01274-9),
  Theorem 1 and Section 4: supplied linear expression / order requirements are
  retained. Fixed-q linear-mim-width hardness is not transferred to arbitrary
  color-budget XNLP membership.
- [Bonnet et al., Twin-width I](https://arxiv.org/abs/2004.14789v3) requires the
  contraction sequence. [Bonnet 2026](https://arxiv.org/html/2512.23680v2), Theorem
  2 and Corollary 3 concern fixed color budgets at width 4, not fixed-q hardness
  at width 3.
- [Raman and Saurabh](https://www.imsc.res.in/~vraman/pub/algmcadometc.pdf) explicitly
  covers parameter-k Dominating Set hardness on bipartite graphs; the catalog
  does not infer it from a minimum-solution optimization title.
- [Sahakyan 2021](https://rspublisher.org/index.php/ws/article/view/2112): arbitrary
  input lists on complete bipartite graphs are NP-complete even with list lengths
  at most three. This is not a fixed three-color palette and is not replaced by
  any of the common-palette List q-Coloring algorithms.

## Regression Checks

- Every class resolves; problem forms and source identifiers remain valid.
- Decision threshold rows do not mix an unparameterized classical NP-complete
  badge with a parameterized bound. The classical catalog is not mutated.
- Fixed q=3 and q>=4 conditions survive class inheritance and tab changes.
- No `Unchecked` finding object remains; empty cells have no attached assertions.
- New result and paper tooltips contain the checked theorem locations.
- Existing hierarchy and equivalence tests remain part of the test run.

## General Results and Provenance

`All graphs` is now a selectable basic graph class and the universal superclass.
The nine existing general-graph algorithm findings are collected there; no new
scientific claim is added. General fallback results and their citations also
remain available in other classes, including equivalent parameter profiles, so
known algorithms do not become `Unchecked`. Each general finding has an
`All graphs` scope label outside the universal class. Structural results in the
same row remain unmarked, and general algorithms do not acquire class-equivalence
citations. Unconditional class-specific P algorithms take precedence over the
general FPT fallback. Class-specific lower bounds, conjectures, supplied-input
conditions and the universal hierarchy node are unchanged. Optimization/Decision
filtering and the k/t parameter distinctions still apply in every class.
