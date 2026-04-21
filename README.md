# Manageable Homepage Structure

이 버전은 한 파일에 모든 내용을 넣지 않고 아래처럼 나눴습니다.

- `index.html`: 페이지 뼈대
- `styles.css`: 디자인과 레이아웃
- `app.js`: 그래프 동작 로직
- `graph-data.js`: 앞으로 가장 자주 수정할 데이터 파일

## 앞으로 업데이트하는 방법

대부분의 수정은 `graph-data.js`에서 하면 됩니다.

## 이번에 추가된 기능

- 상단 `Jump to a parameter`: 바로 특정 파라미터로 이동
- 오른쪽 상세 패널: incoming / outgoing / equivalent 관계 확인
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

### 3. 동치 기준(anchor) 조정하기

`settings.equivalentAliases` 또는 `settings.preferredAnchors`를 수정하면 됩니다.

## 추천 운영 방식

앞으로는 HTML 자체를 직접 만지기보다 `graph-data.js`만 수정하는 방식으로 관리하는 게 가장 쉽습니다.
구조 변경이 필요할 때만 `index.html`, `styles.css`, `app.js`를 건드리면 됩니다.
