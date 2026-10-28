# Reduced Max-Leaf Complexity Check

Checked 2026-10-28 against [Bonnet, Chang, Duron, Geniet and Kwon (2026)](https://arxiv.org/html/2604.19138),
Theorems 1.4 / 6.5 and the opening of Section 6.

The Class Map had no dedicated algorithm profile for reduced component max-leaf.
It now records `XP(w)`, requiring a witnessing contraction sequence, for:

- Maximum Independent Set: finite sigma-Neighborhood with `sigma = {0}`.
- Maximum Induced Matching: `sigma = {1}`; divide the selected vertex count by
  two to obtain the number of edges. The decision threshold is `2k` vertices.
- Maximum Clique: MIS on the complement, whose red graphs and sequence width
  are unchanged. This is not a direct fixed-finite-sigma specialization.
- Minimum Vertex Cover: the site's existing solution-complement rule transfers
  MIS using `tau = n - alpha`.

Optimization and threshold decisions both retain the structural bound. The
general `FPT(k)` Vertex Cover decision algorithm remains separately scoped.
Polynomial time at each fixed width does not imply `FPT(w)`.

The reduced max-leaf profile also receives these algorithms: on every red graph,
component max-leaf is at most `max(1, total max-leaf)`, allowing the site's isolated
vertex convention without changing the supplied sequence.

The finite-sigma theorem does not establish Domination, Coloring, or full MSO
algorithms. It is not propagated to wider reduced-bandwidth/cutwidth classes.
No additional problem rows or unrelated complexity claims are introduced.
