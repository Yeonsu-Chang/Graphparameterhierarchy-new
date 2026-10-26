# 그래프 클래스별 대표 문제의 계산 복잡도

기준일: 2026년 10월 26일. 대상은 `All graphs`를 포함한 현재 Class Map의 190개 항목이다. 대표 판정·최적화 문제와 FO, MSO₁, MSO₂ model checking의 결과를 구분한다. 마지막 대조표는 클래스 이름을 기록하고, 아래에서 확인한 결과 묶음에 연결한다. 이 문서는 문헌 조사 초안이며, 모든 클래스와 문제 조합의 완전한 분류를 주장하지 않는다. 재검증 및 표시 정책 변경 사항은 [검증 기록](complexity-verification-2026-10-26.md)에 정리했다.

## 표기와 문제 범위

`P`는 다항시간 알고리즘, `NPC`는 판정 버전의 NP-완전성을 뜻한다. 최적화 버전에는 NP-hard라는 표현을 사용한다. `FPT(p)`는 시간 `f(p) n^O(1)`, `XP(p)`는 시간 `n^f(p)`의 알고리즘을 뜻한다. W[1]-hard, W[2]-hard, AW[*]-hard와 알고리즘 상한은 별도 정보다. 예를 들어 어떤 문제는 NPC이면서 FPT(k)일 수 있고, XP(w)이면서 W[1]-hard일 수 있다.

`k`는 선택할 정점 수 또는 삭제할 정점 수, `q`는 색 수, `t`는 terminal 수, `w`는 해당 폭을 뜻한다. Formula 길이는 `|phi|`로 쓴다. 폭·해 크기·formula 길이를 서로 바꾸어 표기하지 않는다. Coloring은 q가 입력인 정상적인 vertex coloring이며, 고정된 q의 q-Coloring과 구분한다. Hamiltonian Cycle은 모든 정점을 지나는 cycle이고 k-Cycle이나 Longest Cycle과 구분한다.

대상은 단순 무방향 그래프의 unweighted 문제다. 가중치, 방향, list, connected, induced, counting 등의 변형은 별도 명시가 있을 때만 포함한다. Steiner Tree는 주어진 terminal들을 연결하는 최소 간선 수의 tree다. 최소 Steiner 정점 수를 parameter로 삼는 문제와 terminal 수 t로 parameterize하는 문제도 구별한다.

| 문제 | 비교할 결과 |
| --- | --- |
| Maximum Independent Set, Maximum Clique | 최적해 계산 및 크기 k인 해의 존재 |
| Minimum Vertex Cover, Minimum Dominating Set | 최적해 계산 및 크기 k 이하인 해의 존재 |
| Coloring | chromatic number 계산 및 입력 q에 대한 q-colorability |
| Hamiltonian Path, Hamiltonian Cycle | spanning path 또는 cycle의 존재 |
| Longest Path | 최장 path 계산 및 k-Path |
| Feedback Vertex Set | 최소 정점 삭제로 forest 만들기 |
| Max-Cut | cut을 가로지르는 최대 간선 수 |
| Steiner Tree | terminal을 연결하는 최소 tree |
| Maximum Matching | 최대 크기의 matching |
| Connected / Total / Independent Dominating Set | 연결성, open-neighborhood domination, 독립성 조건을 각각 추가한 최소 dominating set |
| Edge Dominating Set | 모든 간선을 인접한 선택 간선으로 지배하는 최소 간선 집합 |
| Induced Matching | 선택 간선의 끝점들이 추가 간선 없이 matching을 유도하도록 하는 최대 간선 집합 |
| Odd Cycle Transversal | 최소 정점 삭제로 bipartite graph 만들기 |
| List Coloring | 정점마다 입력으로 주어진 허용 색 목록을 따르는 proper coloring의 존재 |
| Graph Isomorphism | 해당 클래스의 두 입력 그래프가 동형인지 판정 |
| FO, MSO₁, MSO₂ model checking | 입력 formula의 만족 여부 |

Maximum Matching은 일반 그래프에서도 P이므로 모든 클래스에 공통 적용한다 [MATCH]. Vertex Cover(k)는 간선 uv에 대해 u 또는 v를 선택하는 분기로 FPT(k)이다. 이 두 공통 결과를 클래스별 새로운 정리처럼 반복해서 세지 않는다. Independent Set과 Vertex Cover의 최적해는 `tau(G) = |V(G)| - alpha(G)`로 연결되지만, 해 크기 parameter k에 관한 FPT 결과가 그대로 서로 전달되지는 않는다.

k-Path는 일반 그래프에서도 FPT(k) [COLOR-CODING]이며, unweighted Steiner Tree는 terminal 수 t에 대해 FPT(t) [STEINER]이다. Longest Path의 다항시간 최적화와 k-Path의 FPT를, Hamiltonian Cycle과 k-Cycle을 서로 다른 칸에 둔다. Co-comparability 및 그 subclass인 Interval, Permutation, Trapezoid의 Longest Path는 P이다 [COCO-LONGEST].

Bounded parameter 클래스의 P는 bound를 고정한 각 slice에서의 결과다. FPT(w)는 bound가 입력에 따라 변할 때에도 n의 지수가 일정하다는 더 강한 결과다. NP-hardness를 어떤 고정 bound에서 보였는지도 기록해야 한다. Excluded minor처럼 추가로 고정된 H에 따라 범위가 달라지는 클래스는 특정 H에서의 hardness를 모든 H에 확대하지 않는다.

표의 `확인 필요`는 미해결 문제라는 뜻이 아니다. 이번 조사에서 출처·버전·조건을 확정하지 않은 항목이다. 실제 미해결성은 논문이 명시한 경우에만 별도 설명한다.

## 기본 그래프 클래스

아래의 기본 8개 문제는 Clique, Independent Set, Vertex Cover, Dominating Set, Coloring, Hamiltonian Cycle, Feedback Vertex Set, Max-Cut이다. 클래스 포함관계나 폭 bound를 이용해 얻은 결과는 **상속**으로 표시한다. 기본 그래프 클래스의 인식 자체는 별도 문제이며, 표현이 필요한 알고리즘에는 그 조건을 붙인다.

| 코드 | 클래스 | 확인한 다항시간 결과 | 확인한 어려움과 조건 |
| --- | --- | --- | --- |
| BASIC-TW | Tree, Forest, Path, Linear forest, Star, Caterpillar, Cactus, Outerplanar, Series-parallel | 기본 8개와 Longest Path, unweighted Steiner Tree는 P. bounded treewidth에서 상속 [CMR, CW-HARD] | Treewidth가 상수인 각 클래스에 대한 결과다. |
| BASIC-CW | Cograph, Threshold, Trivially perfect, Cluster, Co-cluster, Clique, Complete bipartite, Complete multipartite, Distance-hereditary, Block, Ptolemaic | 기본 8개는 P. bounded clique-width의 알고리즘에서 상속 [CMR, CW-HARD, CW-2014, CW-2019] | 폭이 상수이므로 XP인 Coloring, Hamiltonian Cycle, Max-Cut도 이들 클래스에서는 P이다. |
| BIP | Bipartite | Clique, Independent Set, Vertex Cover, Coloring, Max-Cut은 P. Independent Set/Vertex Cover는 bipartite matching, Max-Cut은 모든 간선을 선택하는 bipartition으로 계산 | Dominating Set은 NPC이자 W[2]-hard(k) [SPLIT-DS, SHORT-CYCLES]. Hamiltonian Cycle은 NPC [GRID]. |
| CBIP | Chordal bipartite | BIP의 P 결과에 더해 Feedback Vertex Set은 P [CBIP-FVS] | Dominating Set, Steiner Tree는 NPC [CBIP-DS]. Hamiltonian Cycle도 NPC [CBIP-HAM]. |
| BPERM | Bipartite permutation, Bipartite chain | 기본 8개는 P. bipartite, chordal bipartite, cocomparability의 확인한 알고리즘에서 상속 [CBIP-FVS, COCO-DS, COCO-HAM, PERFECT] | bipartite라는 조건만으로 Dominating Set이 P가 되는 것은 아니다. |
| PERFECT | Perfect, Comparability, Meyniel, Parity, Weakly chordal | Clique, Independent Set, Vertex Cover, Coloring은 P [PERFECT] | Perfect와 Comparability의 Dominating Set은 bipartite subclass에서, Hamiltonian Cycle은 bipartite subclass에서 NPC를 상속 [SPLIT-DS, GRID]. Weakly chordal은 split subclass에서 두 hardness를 상속 [SPLIT-DS, CBIP-HAM]. Parity와 Meyniel은 bipartite subclass에서 상속한다. |
| CHORDAL | Chordal | Clique, Independent Set, Vertex Cover, Coloring은 P [PERFECT]. Feedback Vertex Set은 P: chordal 그래프는 tree-independence number 1이므로 아래 TI 알고리즘에서 상속 | Dominating Set은 NPC 및 W[2]-hard(k)를 split subclass에서 상속 [SPLIT-DS, SHORT-CYCLES]. Hamiltonian Cycle은 NPC [CBIP-HAM]. Max-Cut은 NPC [CUT-SPLIT]. |
| SPLIT | Split | Clique, Independent Set, Vertex Cover, Coloring, Feedback Vertex Set은 P: chordal 결과에서 상속 | Dominating Set은 NPC 및 W[2]-hard(k) [SPLIT-DS, SHORT-CYCLES]. Hamiltonian Cycle은 NPC이며 strongly chordal split에서도 성립 [CBIP-HAM]. Max-Cut은 NPC [CUT-SPLIT]. |
| SCHORDAL | Strongly chordal | Clique, Independent Set, Vertex Cover, Coloring, Feedback Vertex Set에 더해 Dominating Set도 P [STRONG-DS] | Hamiltonian Cycle은 NPC [CBIP-HAM]. Max-Cut은 interval subclass에서 NPC를 상속 [CUT-INTERVAL]. |
| INTERVAL | Interval | Clique, Independent Set, Vertex Cover, Coloring, Dominating Set, Hamiltonian Cycle은 P [PERFECT, ARC-DS, COCO-HAM]. Feedback Vertex Set은 TI에서 상속 | Max-Cut은 NPC [CUT-INTERVAL]. FO model checking은 AW[*]-complete(|phi|) [INTERVAL-FO, Corollary 12]. |
| PINTERVAL | Proper interval | 위 Interval의 P 결과를 상속. FO model checking은 FPT(|phi|) [INTERVAL-FO] | MSO₁ model checking은 para-NP-hard(|phi|) [INTERVAL-FO, Corollary 16]. Max-Cut의 과거 두 다항시간 주장은 오류가 지적되었으므로 P로 넣으면 안 된다 [CUT-PROPER]. |
| COCO | Co-comparability, Permutation, Trapezoid | Clique, Independent Set, Vertex Cover, Coloring은 P [PERFECT]. Dominating Set과 Hamiltonian Cycle은 P [COCO-DS, COCO-HAM]. Feedback Vertex Set은 AT-free superclass에서 P 상속 [AT-FVS] | Co-comparability와 Trapezoid의 Max-Cut은 interval subclass에서 NPC 상속 [CUT-INTERVAL]. Permutation의 Max-Cut도 NPC [CUT-PERMUTATION]. |
| ARC | Circular-arc | Clique, Independent Set, Vertex Cover는 fixed-H 알고리즘에서 P를 상속 [MIM]. Dominating Set은 P [ARC-DS]. q-Coloring은 FPT(q) [H-COLOR, Proposition 4.3] | Minimum Coloring의 NP-hardness [ARC-COLOR]와 q-Coloring의 FPT(q)를 구분한다. 고정 H의 List q-Coloring 정리는 공통 q색 palette를 사용하며 arbitrary-list List Coloring과 다르다. |
| PARC | Proper circular-arc | ARC의 Clique, Independent Set, Vertex Cover, Dominating Set P 결과 상속 | Circular-arc 전체의 Coloring hardness를 이 subclass에 그대로 적용할 수 없다. 해당 Coloring 및 나머지 칸은 별도 확인 필요. |
| CIRCLE | Circle | Clique, Independent Set, Vertex Cover는 P [CIRCLE-IS]. Feedback Vertex Set도 P [CIRCLE-FVS-2026]. q=3의 Coloring에는 준다항시간 알고리즘이 있다 [CIRCLE-3-COLOR, Theorem 3.1] | Dominating Set은 NPC이며 W[1]-hard(k) [CIRCLE-DS]. q-Coloring은 각 고정 q>=4에서 NPC이므로 para-NP-complete(q) [CIRCLE-FIXED-COLOR]. 이 결과는 q=3의 hardness를 뜻하지 않는다. |
| LINE | Line graph | Independent Set, Vertex Cover는 matching으로 P; Clique도 incident edge들과 triangle을 검사해 P. Max-Cut은 P [CUT-LINE] | Coloring은 NPC이며 3-Coloring부터 어렵다. cubic graph의 edge coloring에서 상속 [EDGE-COLOR]. |
| CLAW | Claw-free | Independent Set과 Vertex Cover는 P [CLAW-DS의 기존 결과 설명]. Dominating Set은 FPT(k) [CLAW-DS] | Coloring은 line graph subclass에서 NPC [EDGE-COLOR]. Dominating Set의 FPT(k)는 최소해의 다항시간 계산을 뜻하지 않는다. |
| PLANAR | Planar | Clique는 P; Max-Cut은 P [CUT-PLANAR] | Independent Set, Vertex Cover, Coloring은 NPC [GJS]. Dominating Set은 NPC [CUBIC-DS]. Hamiltonian Cycle은 NPC [GRID]. 반면 Independent Set(k), Clique(k), Dominating Set(k)는 FO 정리로 FPT(k) [EXPANSION]. |
| GRID | Grid | 직사각 격자와 임의의 grid subgraph를 구별해야 한다. 둘 다 bipartite라 Clique, Independent Set, Vertex Cover, Coloring, Max-Cut은 P | 일반 grid graph에서 Hamiltonian Cycle은 NPC이지만 이 결과를 직사각 `P_m x P_n` 전체 격자 클래스에 적용하면 안 된다 [GRID]. Class Map의 Grid 의미를 먼저 고정한다. |
| WALL | Wall | 표준 elementary wall 자체라면 bipartite 및 planar 알고리즘을 적용할 수 있다 | wall 자체, subdivided wall, 임의의 wall subgraph를 구별해야 한다. Planar의 NP-hardness를 subclass인 Wall로 내릴 수 없다. |
| BASIC-REVIEW | Proper chordal, Split permutation | 더 큰 클래스에서 확인한 P 결과만 상속할 수 있다 | 클래스 정의와 세부 포함관계를 원문 기준으로 맞춘 뒤 개별 문제를 확정한다. |

## 폭을 매개변수로 하는 결과

| 코드 | 클래스 또는 parameter | 확인한 결과 | 입력 조건과 주의점 |
| --- | --- | --- | --- |
| TW | Treewidth, pathwidth, treedepth | 기본 8개, Longest Path, unweighted Steiner Tree는 FPT(w). FO·MSO₁·MSO₂ model checking도 FPT(w + |phi|) [CMR, CW-HARD] | Coloring에서 q가 입력이어도 FPT(tw): tw+1개 색으로 충분하므로 작은 q만 처리하면 된다. 일반적인 MSO₂ 결정 정리와 표준 최적화 확장을 구분한다. |
| CW | Clique-width, rank-width, NLC-width | Clique, Independent Set, Vertex Cover, Dominating Set, Feedback Vertex Set, unweighted Steiner Tree와 MSO₁ model checking은 FPT(w), 또는 formula가 입력이면 FPT(w + |phi|) [CMR] | 식이 주어지면 식을 따라 처리한다. 원래 그래프만 주어진 경우에는 rank-width 기반 분해 계산을 포함해야 하며 동일한 선형시간을 주장하지 않는다 [CW-HARD]. |
| CW-HARD | Clique-width, rank-width, NLC-width | Coloring, Hamiltonian Cycle, Max-Cut은 XP(w)이면서 W[1]-hard(w) [CW-HARD, CW-2014, CW-2019] | 이 세 parameter의 functional equivalence로 FPT 가능성과 XP 여부를 옮길 수 있지만 정확한 실행시간 식은 같지 않다. |
| LCW | Linear clique-width, linear rank-width, linear NLC-width, total twin-width | CW의 FPT 결과와 XP 상한을 상속. Coloring과 Max-Cut은 supplied linear expression에 대해 XNLP-complete [XNLP] | Linear clique-width의 hardness가 확인된 문제만 같은 equivalence group으로 옮긴다. Clique-width hardness만으로 더 작은 subclass의 hardness를 주장할 수는 없다. |
| BOOL | Boolean-width | decomposition이 주어지면 Independent Set과 Dominating Set은 FPT(w), 관련 locally checkable subset/partition 문제도 처리 가능 [BOOL] | 분해가 주어지는 알고리즘과 최적 boolean-width 분해 계산을 분리한다. |
| MW | Modular-width, neighborhood diversity | Coloring, Hamiltonian Path, Hamiltonian Cycle은 FPT(w) [MODULAR]. CW에서 상속되는 subset 문제들도 FPT(w) | modular decomposition은 계산 가능. neighborhood diversity의 type partition으로 같은 상한을 얻는다. |
| SHRUB | Shrub-depth | 고정 height와 label 수를 포함한 tree-model parameter에서 MSO₁ model checking은 elementary FPT [SHRUB, SHRUB-DECOMP] | height만 정점 수와 무관하게 작다는 조건과 label 수도 bounded라는 조건을 구별한다. Coloring·Hamiltonian Cycle이 shrub-depth에서 자동으로 FPT인 것은 아니다 [MODULAR]. |
| MIM | Mim-width | supplied branch decomposition에서 Independent Set, Dominating Set, Feedback Vertex Set, 고정 q의 q-Coloring은 XP(w). Independent Set과 Dominating Set은 linear mim-width + k에 대해서도 W[1]-hard [MIM, OMIM, XNLP] | decomposition 없이 같은 XP 알고리즘을 쓸 수 있다고 단정하면 안 된다. mim-width <= 2 인식은 NP-hard [MIM-RECOGNITION]. |
| LMIM | Linear mim-width | supplied order에서 Independent Set, Dominating Set, Feedback Vertex Set, 고정 q>=5의 q-Coloring은 XNLP-complete [XNLP, Theorem 1] | 위의 subset 문제들은 XP(w)에도 속한다. XNLP를 단순히 FPT 또는 NPC로 대체하지 않는다. |
| TI | Tree-independence number | Independent Set은 분해 없이 `2^O(w^2) n^O(w)`에 해결 가능 [TREE-IND]. Feedback Vertex Set은 tree-mu 정리의 bounded induced forest 최적화에서 XP(w)를 상속 [TREE-MU] | Dominating Set은 w=1의 chordal graphs에서도 NPC이다. 정확한 tree-independence number 인식과 근사 분해 계산을 구분한다. |
| OMIM | o-mim-width | supplied decomposition에서 Independent Set과 Feedback Vertex Set은 XP(w). Independent Set은 분해 없이도 bounded o-mim-width에서 quasipolynomial time [OMIM] | 분해를 찾는 다항시간 알고리즘을 가정하지 않는다. |
| SIM | Sim-width | bounded sim-width의 Independent Set은 decomposition 없이 quasipolynomial time [OMIM] | 이 상한을 P 또는 XP(w)로 표기하지 않는다. 이 논문만으로 FPT(w)나 NP-hardness가 확정되는 것은 아니다. |
| TWW | Twin-width | supplied d-contraction sequence에서 FO model checking은 FPT(d + |phi|). k-Independent Set, k-Clique, k-Dominating Set은 고정 d에서 `2^O(k) n` [TWW-FO, TWW-ALG] | 수축 순서 제공 조건이 필요하다. Twin-width d만 parameter로 둔 최적 Independent Set·Dominating Set은 d<=4에서도 NP-hard. Coloring은 d<=3에서도 NP-hard [TWW-COLOR]. |
| MERGE | Merge-width | witnessing construction sequence가 주어지면 FO model checking은 FPT(|phi|) on a fixed effectively bounded-merge-width class [MERGE] | 모든 필요한 radius에서 bound가 있는 조건이다. 한 개의 고정 r에 대한 r-merge-width만으로 대체할 수 없다. 2026년에는 n 의존성을 cubic에서 quadratic으로 개선 [MERGE-2026]. |
| TREE-MU | Induced matching treewidth tree-mu | 최대 가중 induced bounded-treewidth subgraph 중 CMSO₂ 조건을 만족하는 집합을 `f(a,b,|phi|) n^O(a b^2)`에 계산. a=tree-mu(G), b=출력 induced subgraph의 treewidth bound [TREE-MU] | Independent Set과 induced forest/FVS 등을 포함하는 **제한된 최적화 meta-theorem**이다. G 전체에 대한 arbitrary MSO₂ model checking FPT 정리가 아니다. 현재 Class Map에는 이 이름의 독립 항목이 없다. |

TW 상한을 상속하는 간단한 예는 vertex cover v에 대한 `tw <= v`, feedback vertex set f에 대한 `tw <= f+1`, maximum matching nu에 대한 `tw <= 2 nu`이다. 마지막 부등식은 maximum matching의 endpoint들이 vertex cover를 이루기 때문이다. Modulator X를 삭제한 그래프가 treewidth b이면 모든 bag에 X를 추가해 `tw(G) <= |X|+b`를 얻는다. 이들은 **관계에서 도출한 상속 결과**이며 각 parameter의 최선 실행시간을 주장하지 않는다.

## 희소성과 논리 클래스

FO는 정점 양화, MSO₁은 정점 집합 양화까지, MSO₂는 간선 집합 양화까지 허용한다. Unary vertex labels를 허용하는 표준 model-checking 설정을 기준으로 하며, 추가적인 순서 관계나 successor는 별도 입력 구조다. 특히 unit interval graph에 successor 관계를 추가한 결과를 순수 adjacency 구조의 결과와 혼동하지 않는다 [INTERVAL-FO].

| 코드 | 클래스 | FO model checking | MSO 및 최적화 관련 해석 |
| --- | --- | --- | --- |
| EXP | Bounded expansion, bounded polynomial expansion, bounded maximum degree, bounded genus, excluded fixed minor/topological minor | 고정 클래스에서 FPT(|phi|), bounded expansion에서는 linear dependence on n [EXPANSION] | k-Independent Set, k-Clique, k-Dominating Set을 FO로 표현해 FPT(k)를 얻는다. 최소 Dominating Set 전체의 P 알고리즘이 생기는 것은 아니다. |
| ND | Nowhere dense | 고정 클래스에서 FO는 FPT(|phi|); 적절한 효과적 bound 하에서 `f(C,phi,epsilon) n^(1+epsilon)` [NOWHERE] | q-Coloring이나 Hamiltonian Cycle 전체를 FO 정리의 직접 결과로 넣지 않는다. |
| STABLE | Monadically stable | FO는 FPT(|phi|) [STABLE] | 2026년 Welzl order 논문은 polynomial exponent를 5+epsilon에서 3+epsilon으로 개선한다고 보고한다. randomized construction에 기반한 preprint라는 상태도 함께 표시 [STABLE-2026]. |
| STRUCT | Structurally nowhere dense, structurally bounded expansion 및 적절한 structurally bounded treewidth/pathwidth/treedepth 클래스 | monadic stability 및 관련 FO 정리에서 FPT(|phi|) 상속 [STABLE] | 고정 transduction과 고정 기반 클래스를 전제로 한다. 구조적 표현을 실제로 입력으로 요구하는지 정리별 확인이 필요하다. |
| TWW | Bounded twin-width | FPT(d + |phi|), d-sequence 필요 [TWW-FO] | MSO₁은 고정 d=4와 고정 3-Coloring formula에서 이미 NP-hard: FO 결과를 MSO₁로 확대할 수 없다 [TWW-COLOR]. |
| MERGE | Bounded merge-width | FPT with a witnessing sequence [MERGE, MERGE-2026] | radius에 따른 width bound와 witness를 기록한다. |
| PINTERVAL | Proper interval | FPT(|phi|), interval representation은 polytime 계산 가능 [INTERVAL-FO] | MSO₁은 para-NP-hard(|phi|) [INTERVAL-FO]. 기본 문제 여러 개가 P여도 arbitrary MSO₁이 쉬운 것은 아니다. |
| INTERVAL | Interval | AW[*]-complete(|phi|) [INTERVAL-FO, Corollary 12] | 고정 유한 length set으로 표현된 경우의 긍정 결과와 구분한다. |
| GEO-HARD | Permutation, Circle | colored FO model checking은 AW[*]-hard(|phi|) [GEO-FO] | Independent Set이 P라는 사실은 arbitrary FO의 FPT를 보장하지 않는다. |
| DEPENDENT | Monadically dependent | 일반적인 FO FPT 명제는 확인한 최신 논문에서도 conjectural frontier로 제시 [MERGE, DEPENDENT-2026] | 2026년 radius-1 merge-width 결과는 구조 정리다. 이를 모든 radius의 효과적 decomposition 또는 전체 FO FPT 증명으로 바꾸어 적으면 안 된다. |
| FLIP-REVIEW | Bounded flip-width, fixed-r flip-width, low rank-width covers 등 | 해당 클래스에 적용 가능한 정리와 witness 확보 여부를 추가 확인 | merge-width와 flip-width의 동치는 MERGE 논문에서 conjecture로 제시된다. 기존 포함관계 그림만으로 무조건적인 FO FPT를 표시하지 않는다. |

Bounded degree, planar, bounded expansion 같은 **가족 전체**에는 고정 q의 Coloring이 NP-hard인 slice가 있으므로 arbitrary MSO₁에 대한 일반 FPT 정리는 성립할 수 없다(P != NP 가정). 그러나 이것이 각 개별 subclass마다 MSO₁이 어렵다는 뜻은 아니다. Tree나 bounded treewidth처럼 훨씬 강한 조건을 갖는 subclass는 별도 긍정 정리를 가진다.

## 다른 parameter 클래스에서 넣을 수 있는 결과

| 코드 | 클래스 | 확인 가능한 결과와 근거 |
| --- | --- | --- |
| COVER | Bounded vertex cover number, bounded maximum matching | TW 알고리즘을 FPT(parameter)로 상속. 위의 직접 부등식 사용. |
| FVS | Bounded feedback vertex set number, bounded feedback edge set number | TW 알고리즘을 FPT(parameter)로 상속. Feedback edge set의 각 간선에서 endpoint를 하나씩 잡으면 feedback vertex set을 얻는다. |
| NEAR-TW | Bounded distance to Linear forest, bounded distance to Outerplanar | modulator 크기 + 고정 잔여 treewidth로 TW 결과 상속. Modulator가 주어지는 경우와 그것을 찾는 비용은 구분한다. |
| NEAR-CW | Bounded distance to Clique, Cluster, Co-Cluster, Cograph | 고정 bound의 modulator가 주어지면 잔여 표현의 label을 modulator 이웃 집합에 따라 최대 2^r개로 나누어 bounded clique-width 표현을 구성할 수 있다. CW의 긍정 결과 상속. Modulator 찾기와 Coloring 등의 더 강한 별도 결과는 추가 확인. |
| DEGEN | Bounded degeneracy, arboricity, acyclic chromatic number, h-index | Clique는 degeneracy ordering으로 FPT(d). Independent Set은 n>(d+1)(k-1)이면 YES이므로 FPT(k+d). Dominating Set은 FPT(d+k) [DEGEN-DS]. d만으로 최적 Independent Set이 P가 되는 것은 아니다 [GJS]. |
| AVG | Bounded average degree | hereditary closure 전체에 같은 average-degree bound를 두면 bounded degeneracy로 연결된다. 단일 입력 그래프의 average degree bound만으로 그 연결을 적용하지 않는다. |
| CLOSURE | Bounded c-closure | Independent Set와 Dominating Set은 FPT(c+k) [CLOSURE-KERNEL, Proposition 1.3 및 Theorem 4.17]. parameter는 c만이 아니라 k+c이다. |
| ALPHA | Bounded maximum independent set, bounded clique cover number | Hamiltonian Path/Cycle은 FPT(alpha) [ALPHA-2026]. Clique cover 수 c이면 alpha<=c이므로 이 결과 상속. Independent Set 최적해 자체는 고정 alpha에서 열거로 P이지만 그 열거는 XP(alpha) 상한이다. |
| OMEGA | Bounded maximum clique | 고정 omega에서 Clique는 열거로 P, parameter omega에 대한 직접 상한은 XP(omega). Bipartite의 omega<=2에서도 Dominating Set이 NPC이므로 다른 문제의 일반 FPT를 뜻하지 않는다 [SPLIT-DS]. |
| GAMMA | Bounded domination number | gamma<=b라는 promise에서 Dominating Set 최적해는 n^O(b) 열거로 계산. 이를 FPT(b)라고 부르면 안 된다. |
| SIM-INTERVAL | Bounded simultaneous interval number | Maximum Clique는 representation 없이도 FPT(d): `O(2^(2^d) n^3)` [SIM-INTERVAL, Theorem 31]. Independent Set과 Dominating Set은 representation을 입력으로 받아 FPT(d+k). q-Coloring은 representation 없이 FPT(d+q) [SIM-INTERVAL, Theorem 40]. Theorem 39의 d<=2 Coloring NPC 결과는 q가 입력에 따라 커지는 경우다. |
| WEAK-BOUND | Bounded diameter, chordality, chromatic number, minimum degree, distance to Disconnected 및 일반 chi-bounded 조건 | 이런 이름만으로 treewidth/CW meta-theorem을 적용할 수 없다. 문제별로 구체적인 hard slice 또는 알고리즘을 확인해야 한다. 예: bounded chordality에는 split graphs가 포함되어 DS hardness가 남는다. |

## 최근 결과와 미해결성 표시

| 연도 | 결과 | 홈페이지에 남길 정확한 조건 |
| --- | --- | --- |
| 2026, SODA | bounded tree-mu에서 sparse induced subgraph 최적화 meta-theorem [TREE-MU] | 입력 그래프의 tree-mu와 출력 induced subgraph의 treewidth를 서로 다른 parameter로 기록. |
| 2026, STOC | alpha(G)에 대한 Hamiltonian Path/Cycle FPT [ALPHA-2026] | bounded maximum independent set 클래스에 연결. 2024 preprint의 2026 통합·개정 버전 확인. |
| 2025/2026 | merge-width FO 알고리즘 및 quadratic 개선 [MERGE, MERGE-2026] | witnessing sequence 필요. 고정 r만의 merge-width 결과와 별도. |
| 2026 개정 preprint | monadically stable FO model checking의 n 지수 개선 [STABLE-2026] | randomized construction 및 preprint 상태를 표시. |
| 2025/2026 | twin-width <=3에서 Min Coloring NP-hard, <=4에서 고정 q>=3의 q-Coloring NP-hard [TWW-COLOR] | FO FPT와 모순되지 않는다. Coloring은 정점 집합 양화를 쓰는 MSO₁ 문제다. |
| 2026 preprint | twin-width <=4의 Independent Set, Min Coloring 근사 하한 [TWW-APPROX] | Independent Set에 대해 n^(gamma/(log log n)^2) 근사가 ETH에 반함. 4-sequence를 주어도 성립. Approximation 열에 넣을 결과다. |
| 2026, ICALP | mim-width <=2, sim-width/one-sided variants=1 등 인식 hardness [MIM-RECOGNITION] | 문제 풀이와 decomposition 계산의 난도를 분리하는 근거. |
| 2026 preprint | rank-width w에 대한 unweighted Dominating Set의 2^o(w^2) n^O(1) ETH 하한 [RW-2026] | 2023년 weighted 결과를 unweighted 결과로 소급해서 쓰지 않는다. |
| 2026 preprint | monadic dependence에서 almost-linear neighborhood complexity와 radius-1 merge-width n^o(1) [DEPENDENT-2026] | 구조적 진전이며 일반 FO model checking FPT 정리로 기록하지 않는다. |

Proper interval의 unrestricted Maximum Cut에 대해서는 검증된 복잡도 결과를 현재 사이트에 기록하지 않는다. 과거 문헌은 조사 이력으로만 남기며, 미확인 결과나 현재 미해결성 주장의 근거 링크로 표시하지 않는다. 일반 unweighted Max-Cut의 FPT(k)는 별도 결정형 결과로 유지한다.

## 홈페이지 데이터 구조

화면은 `Problem / Complexity / Paper`의 세 열로 유지한다. Graph problems 20개와 FO, MSO₁, MSO₂를 분리한다. 크기 threshold를 받는 Decision 행에 매개변수 결과가 있으면 고전적 NP-complete 표기는 생략한다. 검증된 고전적 결과는 원자료와 Optimization의 NP-hard 결과로 보존한다. parameter는 badge에, 필요한 입력과 고정 색 수는 짧은 조건으로 붙인다. 세부 출처, 정리 위치와 상속 근거는 tooltip과 데이터에 보관한다.

각 결과에는 direct theorem 또는 inherited consequence를 기록한다. Inherited이면 어느 superclass 또는 parameter inequality를 썼는지 남긴다. 알고리즘은 superclass에서 subclass로, hardness는 subclass에서 superclass로 이동한다. 단, 제공된 expression·order·sequence를 필요로 하는 알고리즘은 그 witness를 생성할 수 있는지도 함께 확인한다. 기존 Class Map의 모든 edge를 검증된 complexity 상속 경로로 자동 취급하지 않는다.

문헌별로 authors, title, year, DOI/arXiv version, parameter, witness 조건과 상속 근거를 저장한다. `Unchecked`는 이 사이트에서 문헌 검증이 끝나지 않은 칸이며, 학계의 미해결성을 뜻하지 않는다. `Open`은 문헌이 명시한 경우에만 사용한다.

## 확장된 문제의 결과

| 문제 | 확인한 결과와 적용 범위 |
| --- | --- |
| Connected, Total, Independent Dominating Set | Co-comparability와 그 subclass인 Interval, Permutation, Trapezoid에서는 모두 P [COCO-DS]. MSO₁ 최적화로 bounded clique-width에서 FPT(w) [CMR]. Split에서는 Independent가 P지만 Connected와 Total은 NPC이다 [DOM-VARIANTS, Lemma 3.11의 Set Cover reduction에서 상속]. |
| Edge Dominating Set | 일반 그래프에서 FPT(k), k는 선택 간선 수 [EDGE-DS]. Planar와 Bipartite에서는 NPC [EDGE-DS-HARD]. Treewidth에서 FPT(w), clique-width에서는 XP(w) 및 W[1]-hard(w) [CW-HARD, CW-2014]. Maximum Matching과 구분한다. |
| Induced Matching | Weakly chordal, Chordal, Chordal bipartite에서는 P [INDUCED-WEAK], Co-comparability에서는 AT-free 알고리즘을 상속 [INDUCED-AT]. Bipartite 전체에서는 NPC [INDUCED]. MSO₁로는 선택 정점 집합이 1-regular임을 표현하여 bounded clique-width의 FPT(w)를 얻는다 [CMR의 귀결]. |
| Odd Cycle Transversal | 일반 그래프에서 FPT(k), k는 삭제 정점 수 [OCT]. Bipartite 입력에서는 최적해가 공집합이다. Chordal에서는 triangle-free induced subgraph가 forest이므로 FVS와 최적값이 같다. Tree-independence number w에서는 XP(w): bipartite인 bag의 크기는 2w 이하이므로 bounded-treewidth induced-subgraph 정리를 적용한다 [TREE-MU의 귀결]. |
| List Coloring | Arbitrary input lists를 받는 판정 문제이며, choosability나 고정 palette의 List q-Coloring이 아니다. Treewidth에서는 XP(w), W[1]-hard(w) [LIST-TREE, LIST-HARD]. Complete bipartite에서 NPC [LIST-BIPARTITE], Proper interval에서도 Precoloring Extension의 NPC를 상속 [LIST-UNIT]. Block에서는 P [LIST-BIPARTITE]. |
| Graph Isomorphism | 일반 그래프에서 quasipolynomial [GI]. Treewidth에서는 FPT(w) [GI-TREE], rank-width와 functionally equivalent한 clique-width에서는 XP(w) [GI-RANK]. Interval, Permutation, Circle, Planar에서는 P [GI-INTERVAL, GI-PERMUTATION, GI-CIRCLE, GI-PLANAR]. |

기존 미확인 항목에서는 Permutation의 Max-Cut NPC, Line graph의 Max-Cut P, Circle의 Feedback Vertex Set P를 보완했다. Circle FVS의 2026년 8월 논문은 기존 알고리즘을 개선한 결과이며, 다항시간 가능성이 처음 밝혀졌다는 뜻은 아니다 [CIRCLE-FVS-2026]. Chordal bipartite 및 Strongly chordal split의 Hamiltonian Path도 Cycle과 함께 NPC임을 원 논문의 초록에서 확인할 수 있다 [CBIP-HAM]. Circular-arc의 Steiner Tree에는 2019년 preprint의 알고리즘을 연결한다 [ARC-STEINER].

기존 12개 문제와 3개 논리 항목을 확장 전 백업과 비교하면, 원본 188개 클래스 이름 기준으로 빈칸 172개가 보완되었다. 65개는 클래스별 또는 parameter별 추가 결과이고, 나머지 107개는 일반 그래프의 공통 FPT 상한이다. 후자는 해당 클래스의 P 대 NP 분류가 새로 확정되었다는 뜻이 아니다. 새로 추가한 8개 문제의 칸은 이 비교에서 제외했다.

FVS의 Planar NPC는 [PLANAR-FVS, Section 4]에서 확인된다. 그 hard instance의 모든 간선을 한 번 subdivide하면 bipartite가 되고 FVS 최적값은 유지되므로 Bipartite NPC도 따른다. 이는 subdivision 불변성에 기반한 귀결이며, 별도의 새로운 정리로 취급하지 않는다. FVS(k), OCT(k), Edge Dominating Set(k), Vertex Cover(k), Longest Path(k), Steiner Tree(t)의 일반-그래프 FPT 결과는 클래스별 hardness와 함께 유지한다.

Distance-to-C 그래프에는 C 전체가 distance 0으로 포함되므로 hardness만 상속한다. 반대로 C에서의 P 알고리즘을 distance-to-C 전체에 적용하지 않는다. 예를 들어 Interval의 Max-Cut hardness는 distance-to-Interval로 전달되지만, Interval의 Dominating Set P는 자동 전달되지 않는다.

## 참고 문헌

- [MATCH] Edmonds. [Paths, Trees, and Flowers](https://www.cambridge.org/core/journals/canadian-journal-of-mathematics/article/paths-trees-and-flowers/08B492B72322C4130AE800C0610E0E21), 1965.
- [CMR] Courcelle, Makowsky, Rotics. [Linear Time Solvable Optimization Problems on Graphs of Bounded Clique-Width](https://link.springer.com/article/10.1007/s002249910009), 2000.
- [CW-HARD] Fomin, Golovach, Lokshtanov, Saurabh. [Intractability of Clique-Width Parameterizations](https://sites.cs.ucsb.edu/~daniello/papers/cliquewidth.pdf), SICOMP 2010. Contains the treewidth comparison, expression construction discussion, and Coloring/Hamiltonian Cycle hardness.
- [CW-2014] Fomin, Golovach, Lokshtanov, Saurabh. [Almost Optimal Lower Bounds for Problems Parameterized by Clique-Width](https://fedorvf.github.io/articles/2014/2014b.pdf), SICOMP 2014.
- [CW-2019] Fomin, Golovach, Lokshtanov, Saurabh, Zehavi. [Clique-width III: Hamiltonian Cycle and the Odd Case of Graph Coloring](https://fedorvf.github.io/articles/2019/2019h.pdf), 2019.
- [PERFECT] Grotschel, Lovasz, Schrijver. [Polynomial Algorithms for Perfect Graphs](https://ir.cwi.nl/pub/10054/), 1984.
- [SPLIT-DS] Bertossi. [Dominating sets for split and bipartite graphs](https://doi.org/10.1016/0020-0190(84)90126-1), 1984.
- [SHORT-CYCLES] Raman, Saurabh. [Short Cycles Make W-hard Problems Hard](https://www.imsc.res.in/~vraman/pub/algmcadometc.pdf), Algorithmica 2008. Includes the standard split-graph W[2] result and the bipartite hardness reduction.
- [CBIP-DS] Muller, Brandstadt. [The NP-completeness of Steiner tree and dominating set for chordal bipartite graphs](https://doi.org/10.1016/0304-3975(87)90067-3), 1987.
- [CBIP-HAM] Muller. [Hamiltonian circuits in chordal bipartite graphs](https://www.sciencedirect.com/science/article/pii/0012365X95000574), 1996. Also gives NP-completeness on strongly chordal split graphs.
- [CBIP-FVS] Kloks, Liu, Poon. [Feedback vertex set on chordal bipartite graphs](https://arxiv.org/abs/1104.3915v2), 2012 version.
- [STRONG-DS] Farber. [Domination, independent domination, and duality in strongly chordal graphs](https://doi.org/10.1016/0166-218X(84)90061-1), 1984.
- [ARC-DS] Chang. [Efficient Algorithms for the Domination Problems on Interval and Circular-Arc Graphs](https://epubs.siam.org/doi/10.1137/S0097539792238431), 1998.
- [COCO-DS] Kratsch, Stewart. [Domination on Cocomparability Graphs](https://epubs.siam.org/doi/10.1137/0406032), 1993.
- [COCO-HAM] Deogun, Steiner. [Polynomial Algorithms for Hamiltonian Cycle in Cocomparability Graphs](https://epubs.siam.org/doi/10.1137/S0097539791200375), 1994.
- [ARC-COLOR] Garey, Johnson, Miller, Papadimitriou. [The Complexity of Coloring Circular Arcs and Chords](https://epubs.siam.org/doi/10.1137/0601025), 1980.
- [H-COLOR] Chaplick, Zeman. [Combinatorial Problems on H-graphs](https://arxiv.org/pdf/1706.00575), 2017, Proposition 4.3.
- [CIRCLE-FIXED-COLOR] Unger. [On the k-colouring of circle-graphs](https://link.springer.com/chapter/10.1007/BFb0035832), STACS 1988.
- [CIRCLE-3-COLOR] E S, Ganian, Lokshtanov, Surianarayanan. [A Quasi-Polynomial Time Algorithm for 3-Coloring Circle Graphs](https://arxiv.org/abs/2511.09707), 2025 preprint, Theorem 3.1.
- [DEGEN-DS] Alon, Gutner. [Linear Time Algorithms for Finding a Dominating Set of Fixed Size in Degenerated Graphs](https://doi.org/10.1007/s00453-008-9204-0), 2009.
- [CLOSURE-KERNEL] Koana, Komusiewicz, Sommer. [Exploiting c-Closure in Kernelization Algorithms for Graph Problems](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2020.65), 2020, Proposition 1.3 and Theorem 4.17.
- [CIRCLE-IS] Gavril. [Algorithms for a maximum clique and a maximum independent set of a circle graph](https://doi.org/10.1002/net.3230030305), 1973.
- [CIRCLE-DS] Bousquet, Goncalves, Mertzios, Paul, Sau, Thomasse. [Parameterized Domination in Circle Graphs](https://arxiv.org/abs/1205.3728), 2012 preprint; journal version 2014.
- [CLAW-DS] Cygan, Philip, Pilipczuk, Pilipczuk, Wojtaszczyk. [Dominating Set is Fixed Parameter Tractable in Claw-free Graphs](https://arxiv.org/abs/1011.6239v2), 2011.
- [EDGE-COLOR] Holyer. [The NP-Completeness of Edge-Coloring](https://epubs.siam.org/doi/10.1137/0210055), 1981.
- [GJS] Garey, Johnson, Stockmeyer. [Some simplified NP-complete graph problems](https://www.math.ucdavis.edu/~deloera/MISC/LA-BIBLIO/trunk/JohnsonDavid2.pdf), 1976.
- [CUBIC-DS] Kikuno, Yoshida, Kakuda. [The NP-Completeness of the Dominating Set Problem in Cubic Planer Graphs](https://globals.ieice.org/en_transactions/transactions/10.1587/e63-e_6_443/_p), IEICE E63-E, 1980, 443-444.
- [GRID] Itai, Papadimitriou, Szwarcfiter. [Hamilton Paths in Grid Graphs](https://epubs.siam.org/doi/10.1137/0211056), 1982.
- [CUT-PLANAR] Hadlock. [Finding a Maximum Cut of a Planar Graph in Polynomial Time](https://epubs.siam.org/doi/10.1137/0204019), 1975.
- [CUT-SPLIT] Bodlaender, Jansen. [On the complexity of the Maximum Cut problem](https://ics-archive.science.uu.nl/research/techreps/repo/CS-1991/1991-39.pdf), 1991 technical report; journal version 2000.
- [CUT-INTERVAL] Adhikary, Bose, Mukherjee, Roy. [Complexity of Maximum Cut on Interval Graphs](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SoCG.2021.7), 2021.
- [CUT-PROPER] Kratochvil, Masarik, Novotna. [U-Bubble Model for Mixed Unit Interval Graphs and Its Applications: The MaxCut Problem Revisited](https://link.springer.com/article/10.1007/s00453-021-00837-4), 2021.
- [CUT-PROPER-2024] de Figueiredo, de Melo, Oliveira, Silva. [Maximum Cut on Interval Graphs of Interval Count Four is NP-Complete](https://flore.unifi.it/handle/2158/1358217), Discrete & Computational Geometry 71, 2024.
- [BOOL] Bui-Xuan, Telle, Vatshelle. [Fast dynamic programming for locally checkable vertex subset and vertex partitioning problems](https://doi.org/10.1016/j.tcs.2013.01.009), 2013.
- [MODULAR] Gajarsky, Lampis, Ordyniak. [Parameterized Algorithms for Modular-Width](https://arxiv.org/abs/1308.2858v2), 2013.
- [SHRUB] Gajarsky, Hlineny. [Faster Deciding MSO Properties of Trees of Fixed Height, and Some Consequences](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FSTTCS.2012.112), 2012.
- [SHRUB-DECOMP] Gajarsky, Kreutzer. [Computing Shrub-Depth Decompositions](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.STACS.2020.56), 2020.
- [MIM] Fomin, Golovach, Raymond. [On the tractability of optimization problems on H-graphs](https://arxiv.org/abs/1709.09737v4), 2020 version.
- [XNLP] Bodlaender, Groenland, Jacob, Jaffke, Lima. [XNLP-Completeness for Parameterized Problems on Graphs with a Linear Structure](https://link.springer.com/article/10.1007/s00453-024-01274-9), published online 2024, Algorithmica 87 (2025), Theorem 1.
- [TREE-IND] Dallard, Fomin, Golovach, Korhonen, Milanic. [Computing Tree Decompositions with Small Independence Number](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ICALP.2024.51), 2024.
- [OMIM] Bergougnoux, Korhonen, Razgon. [New Width Parameters for Independent Set: One-sided-mim-width and Neighbor-depth](https://arxiv.org/abs/2302.10643v2), WG 2023.
- [TREE-MU] Bodlaender, Fomin, Korhonen. [Finding sparse induced subgraphs on graphs of bounded induced matching treewidth](https://arxiv.org/abs/2507.07975), SODA 2026, preprint 2025.
- [MIM-RECOGNITION] Dupre la Tour, Lafond, Ndiaye. [On the Hardness of Recognizing Graphs of Small Mim-Width and Its Variants](https://drops.dagstuhl.de/storage/00lipics/lipics-vol374-icalp2026/html/LIPIcs.ICALP.2026.83/LIPIcs.ICALP.2026.83.html), ICALP 2026.
- [TWW-FO] Bonnet, Kim, Thomasse, Watrigant. [Twin-width I: tractable FO model checking](https://arxiv.org/abs/2004.14789v3), JACM 2022, preprint version 2021.
- [TWW-ALG] Bonnet, Geniet, Kim, Thomasse, Watrigant. [Twin-width III: Max Independent Set, Min Dominating Set, and Coloring](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ICALP.2021.35), ICALP 2021; later journal version.
- [TWW-COLOR] Bonnet. [Coloring Hardness on Low Twin-Width Graphs](https://arxiv.org/abs/2512.23680v2), 2026 version of 2025 preprint; journal version 2026.
- [TWW-APPROX] Bonnet, Dumas, Duron. [Independent Set Hardness in Graphs of Bounded Twin-Width and Low-Radius Merge-Width](https://arxiv.org/abs/2607.00244), 2026 preprint.
- [MERGE] Dreier, Torunczyk. [Merge-width and First-Order Model Checking](https://arxiv.org/abs/2502.18065v2), STOC 2025, revised 2026.
- [MERGE-2026] Bonnet, Geniet, Kim, Moon. [Fast Shortest Path in Graphs with Sparse Signed Tree Models and Applications](https://drops.dagstuhl.de/storage/00lipics/lipics-vol374-icalp2026/html/LIPIcs.ICALP.2026.40/LIPIcs.ICALP.2026.40.html), ICALP 2026.
- [EXPANSION] Dvorak, Kral, Thomas. [Testing first-order properties for subclasses of sparse graphs](https://arxiv.org/abs/1109.5036v2), 2013 version.
- [NOWHERE] Grohe, Kreutzer, Siebertz. [Deciding first-order properties of nowhere dense graphs](https://arxiv.org/abs/1311.3899v2), JACM 2017, preprint version 2014.
- [STABLE] Dreier, Eleftheriadis, Mahlmann, McCarty, Pilipczuk, Torunczyk. [First-Order Model Checking on Monadically Stable Graph Classes](https://arxiv.org/abs/2311.18740), FOCS 2024.
- [STABLE-2026] Dreier, Kuske. [Near-Linear Time Computation of Welzl Orders on Graphs with Linear Neighborhood Complexity](https://arxiv.org/abs/2602.14625v2), 2026 preprint, revised 12 October 2026.
- [INTERVAL-FO] Ganian, Hlineny, Kral, Obdrzalek, Schwartz, Teska. [FO Model Checking of Interval Graphs](https://arxiv.org/html/1302.6043v4), LMCS 2015, Corollaries 12 and 16.
- [GEO-FO] Hlineny, Pokryvka. [Twin-width and Limits of Tractability of FO Model Checking on Geometric Graphs](https://arxiv.org/html/2204.13742v2), 2022.
- [DEPENDENT-2026] Dreier, Mahlmann, McCarty, Pilipczuk, Torunczyk. [Neighborhood Complexity and Radius-1 Merge-Width in Monadically Dependent Graph Classes](https://arxiv.org/abs/2607.10941), 2026 preprint.
- [ALPHA-2026] Fomin, Golovach, Jedlickova, Kratochvil, Sagunov, Simonov. [Path Cover, Hamiltonicity, and Independence Number: An FPT Perspective](https://arxiv.org/abs/2403.05943v3), STOC 2026, revised 6 March 2026.
- [SIM-INTERVAL] Beisegel, Chiarelli, Kohler, Milanic, Mursic, Scheffler. [The Simultaneous Interval Number: A New Width Parameter that Measures the Similarity to Interval Graphs](https://arxiv.org/abs/2404.10670), SWAT 2024.
- [C-CLOSED] Kanesh, Madathil, Roy, Sahu, Saurabh. [Further Exploiting c-Closure for FPT Algorithms and Kernels for Domination Problems](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.STACS.2022.39), STACS 2022; kernel statements also summarized in the 2023 journal version.
- [RW-2026] Liu, Meng. [Lower Bounds for Domination-Type Problems Parameterized by Rank-Width](https://arxiv.org/abs/2608.18854), 2026 preprint.
- [COLOR-CODING] Alon, Yuster, Zwick. [Color-Coding](https://doi.org/10.1145/210332.210337), JACM 1995.
- [STEINER] Dreyfus, Wagner. [The steiner problem in graphs](https://doi.org/10.1002/net.3230010302), Networks 1971.
- [COCO-LONGEST] Mertzios, Corneil. [A Simple Polynomial Algorithm for the Longest Path Problem on Cocomparability Graphs](https://epubs.siam.org/doi/10.1137/100793529), 2012.
- [OCT] Reed, Smith, Vetta. [Finding odd cycle transversals](https://doi.org/10.1016/j.orl.2003.10.009), 2004.
- [FVS-FPT] Iwata, Kobayashi. [Improved Analysis of Highest-Degree Branching for Feedback Vertex Set](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.IPEC.2019.22), 2019.
- [EDGE-DS] Xiao, Kloks, Poon. [New parameterized algorithms for edge dominating set](https://arxiv.org/abs/1104.4160), 2011 preprint.
- [EDGE-DS-HARD] Yannakakis, Gavril. [Edge Dominating Sets in Graphs](https://doi.org/10.1137/0138030), 1980.
- [INDUCED] Cameron. [Induced matchings](https://doi.org/10.1016/0166-218X(92)90275-F), 1989. The DOI contains 1992 but the volume year is 1989.
- [INDUCED-WEAK] Cameron, Sritharan, Tang. [Finding a maximum induced matching in weakly chordal graphs](https://doi.org/10.1016/S0012-365X(02)00803-8), 2003.
- [INDUCED-AT] Chang. [Induced matchings in asteroidal triple-free graphs](https://doi.org/10.1016/S0166-218X(03)00390-1), 2003.
- [LIST-TREE] Jansen, Scheffler. [Generalized coloring for tree-like graphs](https://doi.org/10.1016/S0166-218X(96)00085-6), 1997.
- [LIST-HARD] Fellows et al. [On the complexity of some colorful problems parameterized by treewidth](https://fedorvf.github.io/articles/2011/2011b.pdf), 2011, Section 2.1.
- [LIST-UNIT] Marx. [Precoloring extension on unit interval graphs](https://doi.org/10.1016/j.dam.2005.10.008), 2006.
- [LIST-BIPARTITE] Sahakyan. [List coloring of block graphs and complete bipartite graphs](https://rspublisher.org/index.php/ws/article/view/2112), 2021.
- [DOM-VARIANTS] Goyal et al. [Parameterized complexity of dominating set variants in almost cluster and split graphs](https://arxiv.org/html/2405.10556v1), 2024 preprint, JCSS 2025. EDS in this paper means Efficient Dominating Set, not Edge Dominating Set.
- [GI] Babai. [Graph Isomorphism in Quasipolynomial Time](https://people.cs.uchicago.edu/~laci/quasi25.pdf), STOC 2016, corrected full version; [2017 correction note](https://people.cs.uchicago.edu/~laci/update.html).
- [GI-TREE] Lokshtanov et al. [Fixed-Parameter Tractable Canonization and Isomorphism Test for Graphs of Bounded Treewidth](https://doi.org/10.1137/140999980), SICOMP 2017, FOCS 2014 version.
- [GI-RANK] Grohe, Neuen. [Canonisation and Definability for Graphs of Bounded Rank Width](https://arxiv.org/abs/1901.10330v2), TOCL 2023, revised preprint 2022.
- [GI-INTERVAL] Lueker, Booth. [A Linear Time Algorithm for Deciding Interval Graph Isomorphism](https://doi.org/10.1145/322123.322125), 1979.
- [GI-PERMUTATION] Colbourn. [On testing isomorphism of permutation graphs](https://doi.org/10.1002/net.3230110103), 1981.
- [GI-CIRCLE] Kalisz, Klavik, Zeman. [Circle Graph Isomorphism in Almost Linear Time](https://arxiv.org/abs/1908.09151), 2019 preprint.
- [GI-PLANAR] Hopcroft, Wong. [Linear time algorithm for isomorphism of planar graphs](https://doi.org/10.1145/800119.803896), 1974.
- [GI-DEGREE] Luks. [Isomorphism of graphs of bounded valence can be tested in polynomial time](https://doi.org/10.1016/0022-0000(82)90009-5), 1982.
- [CIRCLE-FVS-2026] Nash. [A New Simple Algorithm for Computing Maximum Weight Induced Forests in Circle Graphs](https://doi.org/10.7155/jgaa.v30i1.3137), JGAA 30(1), 19 August 2026.
- [AT-FVS] Kratsch, Muller, Todinca. [Feedback vertex set on AT-free graphs](https://doi.org/10.1016/j.dam.2007.10.006), 2008.
- [ARC-STEINER] Bhore et al. [Balanced Connected Subgraph Problem in Geometric Intersection Graphs](https://arxiv.org/abs/1909.03872), 2019 preprint.
- [CUT-PERMUTATION] de Figueiredo et al. [MaxCut on permutation graphs is NP-complete](https://doi.org/10.1002/jgt.22948), 2023.
- [CUT-LINE] Guruswami. [Maximum cut on line and total graphs](https://doi.org/10.1016/S0166-218X(99)00056-6), 1999.
- [PLANAR-FVS] Kunz et al. [Most Classic Problems Remain NP-Hard on Relative Neighborhood Graphs and Their Relatives](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SWAT.2022.29), SWAT 2022, Section 4; credits Speckenmeyer's 1983 planar hardness result.

## 현재 Class Map 대조표

`REL`은 알려진 parameter 관계를 통한 상속 후보이나 관계의 원문·구성 조건을 아직 대조하지 않은 항목이다. `BASE-...`는 distance=0 subclass에서의 hardness만 상속한다. `U`는 추가 문헌 확인 대상이다. 어떤 코드도 해당 클래스의 모든 문제 조합이 완전히 분류되었다는 뜻은 아니다.

### Basic graph classes

| Class Map 항목 | 연결할 결과 | 조건 또는 추가 확인 |
| --- | --- | --- |
| `All graphs` | 일반 그래프 공통 알고리즘 | 기존 공통 결과 9개를 이 항목에만 표시. 클래스별 결과로 반복하지 않음 |
| `Bipartite` | BIP | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bipartite chain` | BPERM | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bipartite permutation` | BPERM | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Block` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Cactus` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Caterpillar` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Chordal` | CHORDAL | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Chordal bipartite` | CBIP | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Circle` | CIRCLE | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Circular-arc` | ARC | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Claw-free` | CLAW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Clique` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Cluster` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Co-cluster` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Co-comparability` | COCO | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Cograph` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Comparability` | PERFECT | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Complete bipartite` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Complete multipartite` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Distance-hereditary` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Forest` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Grid` | GRID | 전체 직사각 격자인지 grid subgraph인지 먼저 확정 |
| `Interval` | INTERVAL | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Line graph` | LINE | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Linear forest` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Meyniel` | PERFECT | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Outerplanar` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Parity` | PERFECT | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Path` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Perfect` | PERFECT | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Permutation` | COCO | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Planar` | PLANAR | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Proper chordal` | BASIC-REVIEW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Proper circular-arc` | PARC | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Proper interval` | PINTERVAL | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Ptolemaic` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Series-parallel` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Split` | SPLIT | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Split permutation` | BASIC-REVIEW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Star` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Strongly chordal` | SCHORDAL | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Threshold` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Trapezoid` | COCO | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Tree` | BASIC-TW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Trivially perfect` | BASIC-CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Wall` | WALL | wall 자체와 임의의 subgraph 구분 |
| `Weakly chordal` | PERFECT | 위 결과 묶음의 문제·parameter·입력 조건 적용 |

### Width parameter classes

| Class Map 항목 | 연결할 결과 | 조건 또는 추가 확인 |
| --- | --- | --- |
| `Bounded ∞-flip-width` | REL | CW 또는 SHRUB와의 관계에 대한 개별 출처·bound 확인 후 상속 |
| `Bounded bandwidth` | TW | bandwidth와 cut-width는 표준 pathwidth 상한을 통해 상속 |
| `Bounded bisection width` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded boolean-width` | BOOL | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded bramble number` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded branch-depth` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded branch-width` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded carving-width` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded clique-width` | CW, CW-HARD | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded component twin-width` | REL | CW 또는 SHRUB와의 관계에 대한 개별 출처·bound 확인 후 상속 |
| `Bounded cut-width` | TW | bandwidth와 cut-width는 표준 pathwidth 상한을 통해 상속 |
| `Bounded edge-crossing width` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded edge-cut width` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded flip-width` | FLIP-REVIEW | 고정 radius의 bound를 모든 radius의 효과적 bound로 바꾸지 않음 |
| `Bounded fractional Hadwiger number` | REL | excluded-minor 상한을 통한 EXP 적용 조건 확인 |
| `Bounded linear clique-width` | LCW | 동치 parameter 사이에도 정확한 실행시간은 별도 |
| `Bounded linear mim-width` | LMIM | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded linear NLC-width` | LCW | 동치 parameter 사이에도 정확한 실행시간은 별도 |
| `Bounded linear rank-width` | LCW | 동치 parameter 사이에도 정확한 실행시간은 별도 |
| `Bounded linkedness` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded max leaf number` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded merge-width` | MERGE | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded mim-width` | MIM | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded minor-matching hypertree-width` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded modular-width` | MW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded NLC-width` | CW, CW-HARD | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded o-mim-width` | OMIM | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded path-independence number` | TI | path-independence bound는 tree-independence bound를 함의 |
| `Bounded path-width` | TW | bandwidth와 cut-width는 표준 pathwidth 상한을 통해 상속 |
| `Bounded queue number` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded 𝑟-flip-width` | FLIP-REVIEW | 고정 radius의 bound를 모든 radius의 효과적 bound로 바꾸지 않음 |
| `Bounded 𝑟-merge-width` | FLIP-REVIEW | 고정 radius의 bound를 모든 radius의 효과적 bound로 바꾸지 않음 |
| `Bounded rank-depth` | REL | CW 또는 SHRUB와의 관계에 대한 개별 출처·bound 확인 후 상속 |
| `Bounded rank-width` | CW, CW-HARD | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded reduced bandwidth` | REL | 수축 관련 bound 및 witness 구성 가능성을 확인 |
| `Bounded reduced component max-leaf` | REL | 수축 관련 bound 및 witness 구성 가능성을 확인 |
| `Bounded reduced cut-width` | REL | 수축 관련 bound 및 witness 구성 가능성을 확인 |
| `Bounded reduced max-leaf` | REL | 수축 관련 bound 및 witness 구성 가능성을 확인 |
| `Bounded separation number` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded shrub-depth` | SHRUB | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded sim-width` | SIM | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded slim tree-cut width` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded stack number` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded stretch-width` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded tangle number` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded thinness` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded total twin-width` | LCW | 동치 parameter 사이에도 정확한 실행시간은 별도 |
| `Bounded track number` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded tree bandwidth` | TW | bandwidth와 cut-width는 표준 pathwidth 상한을 통해 상속 |
| `Bounded tree-cut width` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded tree-depth` | TW | bandwidth와 cut-width는 표준 pathwidth 상한을 통해 상속 |
| `Bounded tree-independence number` | TI | path-independence bound는 tree-independence bound를 함의 |
| `Bounded tree-partition-width` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded tree-width` | TW | bandwidth와 cut-width는 표준 pathwidth 상한을 통해 상속 |
| `Bounded twin-width` | TWW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded well-linked number` | REL | TW 상속을 위한 정의·bound·출처를 별도 대조 |
| `Bounded α-edge-crossing width` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |

### Graph parameter classes

| Class Map 항목 | 연결할 결과 | 조건 또는 추가 확인 |
| --- | --- | --- |
| `Bounded acyclic chromatic number` | DEGEN | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded arboricity` | DEGEN | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded average degree` | AVG | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded average distance` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded boxicity` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded burning number` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded 𝑐-closure` | CLOSURE | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded chordality` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded chromatic number` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded clique cover number` | ALPHA | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded cochromatic number` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded crossing number` | REL | genus/expansion 상한의 고정 bound를 명시한 뒤 적용 |
| `Bounded degeneracy` | DEGEN | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded diameter` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded distance to Bipartite` | BASE-BIP | distance=0에서 BIP hardness 상속; BIP의 P 알고리즘을 자동 확장하지 않음 |
| `Bounded distance to Block` | NEAR-CW | modulator가 주어진 경우의 상속; 찾는 비용은 별도 |
| `Bounded distance to Chordal` | BASE-CHORDAL | distance=0에서 CHORDAL hardness 상속 |
| `Bounded distance to Clique` | NEAR-CW | modulator가 주어진 경우의 상속; 찾는 비용은 별도 |
| `Bounded distance to Cluster` | NEAR-CW | modulator가 주어진 경우의 상속; 찾는 비용은 별도 |
| `Bounded distance to Co-Cluster` | NEAR-CW | modulator가 주어진 경우의 상속; 찾는 비용은 별도 |
| `Bounded distance to Cograph` | NEAR-CW | modulator가 주어진 경우의 상속; 찾는 비용은 별도 |
| `Bounded distance to Disconnected` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded distance to Interval` | BASE-INTERVAL | distance=0에서 Max-Cut hardness 상속 |
| `Bounded distance to Linear forest` | NEAR-TW | modulator 제공 조건 및 탐색 비용 분리 |
| `Bounded distance to Outerplanar` | NEAR-TW | modulator 제공 조건 및 탐색 비용 분리 |
| `Bounded distance to Perfect` | BASE-PERFECT | distance=0에서 PERFECT hardness 상속 |
| `Bounded distance to Planar` | BASE-PLANAR | distance=0에서 PLANAR hardness 상속 |
| `Bounded domatic number` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded domination number` | GAMMA | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded edge clique cover number` | REL | CW 또는 neighborhood diversity bound와 구성 알고리즘 확인 |
| `Bounded feedback edge set number` | FVS | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded feedback vertex set number` | FVS | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded genus` | EXP | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded geometric thickness` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded girth` | WEAK-BOUND | girth의 상한과 girth가 충분히 크다는 가정을 혼동하지 않음 |
| `Bounded ℎ-index` | DEGEN | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded interval number` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded max diameter of components` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded maximum clique` | OMEGA | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded maximum degree` | EXP, DEGEN | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded maximum independent set` | ALPHA | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded maximum induced matching` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded maximum matching` | COVER | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded minimum degree` | WEAK-BOUND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded neighborhood diversity` | MW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded simultaneous interval number` | SIM-INTERVAL | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded strong ∞-coloring number` | REL | 각각 treewidth/treedepth와의 정확한 정의 및 상수 확인 |
| `Bounded thickness` | U | 개별 문제의 정리·입력 조건·출처 추가 확인 |
| `Bounded twin-cover` | REL | CW 또는 neighborhood diversity bound와 구성 알고리즘 확인 |
| `Bounded vertex cover number` | COVER | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded weak ∞-coloring number` | REL | 각각 treewidth/treedepth와의 정확한 정의 및 상수 확인 |

### Model-theoretic classes

| Class Map 항목 | 연결할 결과 | 조건 또는 추가 확인 |
| --- | --- | --- |
| `Bounded expansion` | EXP | excluded graph H는 고정; 모든 H에서 hardness라고 일반화하지 않음 |
| `Bounded polynomial expansion` | EXP | excluded graph H는 고정; 모든 H에서 hardness라고 일반화하지 않음 |
| `Bounded sparse twin-width` | TWW | sparse twin-width의 관계와 효율적 witness 확보는 별도 확인 |
| `Excluded minor` | EXP | excluded graph H는 고정; 모든 H에서 hardness라고 일반화하지 않음 |
| `Excluded topological minor` | EXP | excluded graph H는 고정; 모든 H에서 hardness라고 일반화하지 않음 |
| `Low linear rank-width covers` | FLIP-REVIEW | cover parameter와 실제 제공되는 cover를 명시 |
| `Low rank-width covers` | FLIP-REVIEW | cover parameter와 실제 제공되는 cover를 명시 |
| `Monadically dependent` | DEPENDENT | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Monadically low VC-density` | U | 해당 정의만으로 붙일 수 있는 개별 문제 정리를 추가 확인 |
| `Monadically stable` | STABLE | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Monadically stable bounded clique-width` | STABLE, CW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Monadically stable bounded linear clique-width` | STABLE, LCW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Monadically stable bounded merge-width` | STABLE, MERGE | STABLE의 FO 결과와 witness를 요구하는 MERGE 결과를 분리 |
| `Monadically stable bounded shrub-depth` | STABLE, SHRUB | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Monadically stable bounded twin-width` | STABLE, TWW | STABLE의 FO 결과와 witness를 요구하는 TWW 결과를 분리 |
| `Nowhere dense` | ND | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Structurally bounded expansion` | STRUCT | 고정 기반 클래스와 고정 transduction 조건 |
| `Structurally bounded path-width` | STRUCT | 고정 기반 클래스와 고정 transduction 조건 |
| `Structurally bounded sparse twin-width` | STRUCT | 고정 기반 클래스와 고정 transduction 조건 |
| `Structurally bounded tree-depth` | STRUCT | 고정 기반 클래스와 고정 transduction 조건 |
| `Structurally bounded tree-width` | STRUCT | 고정 기반 클래스와 고정 transduction 조건 |
| `Structurally nowhere dense` | STRUCT | 고정 기반 클래스와 고정 transduction 조건 |
| `Weakly sparse` | U | 해당 정의만으로 붙일 수 있는 개별 문제 정리를 추가 확인 |

### χ-bounded classes

| Class Map 항목 | 연결할 결과 | 조건 또는 추가 확인 |
| --- | --- | --- |
| `\chi - bounded` | WEAK-BOUND | chi-boundedness 자체를 최적 coloring 알고리즘과 혼동하지 않음 |
| `Linearly \chi - bounded` | WEAK-BOUND | chi-boundedness 자체를 최적 coloring 알고리즘과 혼동하지 않음 |
| `Polynomially \chi - bounded` | WEAK-BOUND | chi-boundedness 자체를 최적 coloring 알고리즘과 혼동하지 않음 |

### Combined classes

| Class Map 항목 | 연결할 결과 | 조건 또는 추가 확인 |
| --- | --- | --- |
| `Bounded clique-width \cap Weakly sparse` | CW; REL | TW 상속에는 제외 biclique bound와 원문 정리 필요 |
| `Bounded flip-width \cap Weakly sparse` | FLIP-REVIEW | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded linear clique-width \cap Weakly sparse` | CW; REL | TW 상속에는 제외 biclique bound와 원문 정리 필요 |
| `Bounded path-width \cap Bounded max-degree` | TW, EXP | 위 결과 묶음의 문제·parameter·입력 조건 적용 |
| `Bounded shrub-depth \cap Weakly sparse` | SHRUB; REL | 추가 sparse 조건의 강화 결과는 별도 출처 확인 |
| `Monadically dependent \cap Weakly sparse` | DEPENDENT; REL | nowhere-density와의 연결에 필요한 class 조건 확인 |
| `Monadically stable \cap Weakly sparse` | STABLE; REL | 확인한 FO 결과는 STABLE에서 상속 |
