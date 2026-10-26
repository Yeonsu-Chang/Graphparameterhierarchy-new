# Hierarchy Source Provenance Review

Reviewed on 2026-10-26. Scope: the Class Map relation registry, with special
attention to recent papers used for comparisons that were already known.
This changes evidence and attribution, not the class set or relation endpoints.
The review does not certify the earliest publication of every relation.

## Max-leaf comparisons

The ordinary max-leaf implications no longer cite the 2026 reduced-component
max-leaf paper as their basis. Use [Fellows et al. (2009)](https://doi.org/10.1007/s00224-009-9167-9),
with locations checked in the [author version](https://sites.cs.ucsb.edu/~daniello/papers/ecology1.pdf):

- Max-leaf to bandwidth: Section 5, proof of Theorem 6 explicitly constructs the
  bandwidth layout. The theorem's headline concerns topological bandwidth; the
  citation is deliberately to the ordinary-bandwidth construction in its proof.
- Max-leaf to feedback edge set: `Derived` from the bounded subdivision core in
  the proof of Theorem 5. Subdividing an edge preserves `|E|-|V|+cc`.
- Max-leaf to distance to linear forest: `Derived` from the same core. Delete
  core vertices and break any remaining cycle with one vertex.
- Reduced component max-leaf to reduced bandwidth: `Derived` by applying the old
  bandwidth bound to each red component along the same contraction sequence.

Disconnected graphs use the total spanning-forest leaf count, not its maximum
over components. Component bounds can therefore be summed. Isolated vertices
contribute no cycles and need no deletion. Arbitrarily many disjoint cycles
explain why component max-leaf alone would not bound total feedback edge set.

The 2009 paper itself uses older leaf/core bounds. This is a verified older
structural source, not a claim that it first proved every ingredient. The 2026
paper remains for its new reduced parameter and the comparisons that need it.

## Other Attribution Corrections

| Comparison | Previous basis | Revised basis and location |
| --- | --- | --- |
| Linear rank-width / total twin-width | Improved bounds (2026) | [Twin-width VI (2022)](https://arxiv.org/html/2111.00282v2), Theorem 1 and Section 3.1, Theorem 12. Use the total-width convention with red loops. |
| Clique-width / component twin-width | Improved bounds (2026) | Twin-width VI, Theorem 1 / Theorem 11, plus [Oum and Seymour (2006)](https://web.math.princeton.edu/~pds/papers/rankwidth/paper.pdf), Proposition 6.3. No improved linear bound is asserted. |
| Linear rank-width to reduced max-leaf | Improved bounds (2026) | `Derived` from Twin-width VI: bounded total red edges bound degree-one leaves. Isolated red vertices are not counted. |
| NLC-width / clique-width | Later shrub-depth exposition | Johansson (1998), with [Gurski and Wanke (2005)](https://doi.org/10.1016/j.tcs.2005.05.018), Section 2, as an expression-model reference. See access limitation below. |
| Thinness to linear mim-width | Simultaneous interval number (2024) | [Bonomo and de Estrada (2019)](https://arxiv.org/abs/1704.00379v3), Theorem 9 in the author preprint. |
| Branch-width / treewidth | Harvey and Wood (2017) | [Robertson and Seymour (1991)](https://web.math.princeton.edu/~pds/papers/GM10/paper.pdf), (5.1). |
| Tangle number / treewidth | Harvey and Wood (2017) | Robertson and Seymour (1991), (5.2) and (4.3). |
| Separation number / treewidth | Harvey and Wood's preliminary-bound citation | [Dvorak and Norin (2019)](https://arxiv.org/abs/1408.3869), Theorem 1 and the introductory reverse inequality. The proved upper bound is `tw <= 15 sn`. |
| Linkedness / treewidth | Harvey and Wood (2017) alone | [Reed (1997)](https://doi.org/10.1017/CBO9780511662119.006) and Seymour-Thomas bramble duality (1993). |
| Well-linked number / treewidth | Harvey and Wood (2017) alone | Add Reed's earlier definitions; retain Harvey and Wood, Section 9, Lemmas 16-17, for the explicit comparison proof, and bramble duality. |
| Co-comparability to perfect | Strong Perfect Graph Theorem (2006) | `Derived` from [Dilworth (1950)](https://mathweb.ucsd.edu/~asuk/dilworth.pdf), Theorem 1.1 on each induced subposet. |
| Weakly chordal to perfect | Strong Perfect Graph Theorem (2006) | [Hayward (1985)](https://doi.org/10.1016/0095-8956(85)90050-4), original perfectness theorem. |
| Meyniel to perfect | Strong Perfect Graph Theorem (2006) | [Meyniel (1976)](https://doi.org/10.1016/S0012-365X(76)80008-8), main theorem. |
| Parity to perfect | Strong Perfect Graph Theorem (2006) | `Derived` from [Burlet and Uhry (1982)](https://doi.org/10.1016/S0304-0208(08)72441-1), Theorem 1, and Meyniel (1976). Burlet and Uhry explicitly credit Sachs (1970) for an earlier direct perfectness proof; 1982 is not presented as its first proof. |
| Weakly sparse monadic dependence/stability / nowhere dense | Flip-width (2023) | `Derived` from [Adler and Adler (2014)](https://eprints.whiterose.ac.uk/id/eprint/101104/1/adlersquare-ejc.pdf), Theorems 7 and 9, and [Dvorak (2018)](https://arxiv.org/abs/1706.05766), Theorem 5. Flip-width Fact 10.4 explicitly identifies these older premises. |
| Structurally nowhere dense to monadically stable | Flip-width (2023) | `Derived` from Adler and Adler, Theorem 7, and preservation under FO transductions. |

## Retained Later References and Access Limits

- A later source is not automatically wrong. [Harvey and Wood (2017)](https://arxiv.org/abs/1312.3401v2)
  supply the displayed fractional-Hadwiger proof chain in Sections 11-12; an
  earlier statement without its proof is not substituted for that evidence.
- Rank-depth / shrub-depth already uses the original DeVos-Kwon-Oum result
  (2020), Theorem 4.11, rather than the later obstruction paper.
- The 2015 Adler-Kante introduction explicitly records the general linear
  rank-width / linear clique-width equivalence. Its forest-specific equality
  theorems are not used as statements about arbitrary graphs. The record is a
  verified reference, not an assertion that this equivalence originated in 2015.
- Johansson's 1998 publication metadata is confirmed by the
  [author's institutional listing](https://www.csc.kth.se/tcs/projects/graphs.html).
  Attribution of the factor-two comparison is corroborated by later primary
  papers, including [the 2010 relative-width paper](https://doi.org/10.1016/j.dam.2009.06.024)
  and the shrub-depth paper's Section 2.1. The original scan and the author's
  2001 thesis were not retrievable in this review. No original theorem number
  is invented; the UI link is explicitly identified as a publication listing.
- Reed's older attribution is explicit in Harvey and Wood's Lemma 15 and
  Section 9. This review did not obtain the full 1997 chapter; the later proof
  remains cited where needed.
- Recent sources for genuinely new parameters, quantitative improvements needed
  by the recorded statement, and explicitly composed consequences remain valid.

## Interface and Regression Checks

Grey complexity conditions now share the result line with badges and scope
labels, wrapping on narrow screens. `CONJECTURE` and `Not proved` remain distinct.
No optimization/decision result, general-graph scope rule, or complexity paper
entry is changed by this layout adjustment.

The regression suite checks the older source IDs, theorem locations, derived
consequences, disconnected-graph convention and inherited equivalence citations.
Regenerate the machine-readable relation audit after registry changes.

Verification: all 75 tests pass. Browser checks at 1440px and 390px confirm that
conditions share the result line, wrap within their cells, and do not introduce
horizontal page overflow. The max-leaf / feedback-edge relation displays
`Derived` with the 2009 reference. The monadically dependent FO entry still shows
both `CONJECTURE` and `Not proved`. No browser console errors were observed.
