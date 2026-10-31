# Manageable Homepage Structure

이 버전은 한 파일에 모든 내용을 넣지 않고 아래처럼 나눴습니다.

- `index.html`: 페이지 뼈대
- `styles.css`: 디자인과 레이아웃
- `app.js`: 그래프 동작 로직
- `graph-data.js`: 앞으로 가장 자주 수정할 데이터 파일
- `graph-notation.js`: 두 페이지가 공유하는 수식·그래프 기호 표시
- `graph-class-example/`: class 정의, 포함관계의 근거, χ-binding 함수와 복잡도 표

## 앞으로 업데이트하는 방법

대부분의 수정은 `graph-data.js`에서 하면 됩니다.

## 이번에 추가된 기능

- 상단 `Jump to a parameter`: 바로 특정 파라미터로 이동
- 오른쪽 상세 패널: incoming / outgoing / equivalent 관계 확인
- `Equivalents`: 선택한 파라미터의 functional-equivalence 그룹 확인
- `Path finder`: 두 파라미터 사이의 최단 경로 탐색

### 1. 사이트 문구 바꾸기

`site` 영역을 수정하세요.

- `title`: 상단 제목
- `homepageUrl`: 홈페이지 버튼 링크
- `homepageLabel`: 버튼 문구
- `panelTitle`: 왼쪽 패널 제목

### 2. 파라미터 관계 추가/수정하기

`graph.edges`를 수정하세요.

- 일반 방향 관계: `{ source: "A", target: "B" }`
- 동치 관계: `{ source: "A", target: "B", type: "equivalent" }`
- 관계가 없는 파라미터는 `graph.nodes`에 이름을 기록하면 목록에 유지됩니다.

비연결 그래프의 서로 다른 component 사이 거리는 무한대로 취급합니다.
`diameter`와 `max diameter of components`는 별도 항목이며, 유한한 diameter에서
average distance와 maximum component diameter로 가는 관계만 사용합니다.
반지름 비교는 `(2r-1)-merge-width -> r-flip-width`로 유지합니다.
원논문의 `fw_r ≤ 4^(mw_(2r-1))`에 맞춘 표기입니다. 모든 반지름을 다루는
`merge-width -> flip-width` 관계도 유지합니다.
Class Map에서 제외한 관계가 메인 hierarchy에 다시 들어오지 않는지
`node --test tests/*.test.cjs`로 확인할 수 있습니다.

### 3. 동치 기준(anchor) 조정하기

`settings.equivalentAliases` 또는 `settings.preferredAnchors`를 수정하면 됩니다.

## 추천 운영 방식

앞으로는 HTML 자체를 직접 만지기보다 `graph-data.js`만 수정하는 방식으로 관리하는 게 가장 쉽습니다.
구조 변경이 필요할 때만 `index.html`, `styles.css`, `app.js`를 건드리면 됩니다.

## 2026-11-01 parameter 추가

삭제형 `dissociation deletion number (2-CoC)`와 고정된 `r-CoC`를 추가했습니다.
`vertex cover → 2-CoC → fixed-r CoC → vertex integrity → tree-depth` 관계를
Class Map의 정의와 포함 증거에 맞춰 연결합니다. `settings.parameterAliases`는
검색 이름을, `settings.displayLabels`는 표시 문구를 관리하며 동치 노드를 만들지
않습니다. `settings.classMapLabels`에 등록한 매개변수는 선택한 class로 연결됩니다.
`?parameter=...`로 선택 상태를 열 수 있습니다. merge 노드는 기존
`(2r-1)-merge-width` 이름과 올바른 반지름 비교를 유지합니다.

## 게시 범위와 digraph 항목 제외

2026-11-01 게시본의 Class Map은 기존 190개와 이번 비-free 추가 13개를 합친
203개 class입니다. 게시 목록과 보류 목록은
[`research/published-class-additions-2026-11-01.json`](research/published-class-additions-2026-11-01.json)에
구분되어 있습니다. 새로 제안한 induced-exclusion class와 그 intersection
항목 24개는 이번 게시에서 제외했습니다. 기존 `Claw-free` 등은 유지합니다.
보류 작업은 로컬 `output/deferred-2026-11-01/free-classes.json`에 남아 있으며
배포 파일에는 포함하지 않습니다.

메인 hierarchy에서는 digraph 전용 매개변수 8개와 관련 관계 7개를 제외했습니다.
대상은 cycle rank, DAG-depth, DAG-width, directed path-width,
directed tree-width, Kelly-width, weak/strong (∞, →)-coloring number입니다.
Path finder의 방향 표시는 매개변수 사이의 포함관계 방향을 뜻합니다.

Class Map의 현재 근거 감사는
[`research/class-relation-audit-2026-11-01.json`](research/class-relation-audit-2026-11-01.json)입니다.
95개 참고문헌과 493개 원시 관계 기록 중 484개는 근거가 연결되어 있고 9개는
제외된 기록입니다. 이 검사는 근거의 연결 상태를 확인하며 모든 논문의 증명을
새로 검증했다는 뜻은 아닙니다. 정의와 χ-binding 표시 규칙은
[`graph-class-example/README.md`](graph-class-example/README.md)에 설명합니다.
