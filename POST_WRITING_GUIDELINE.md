# 블로그 포스트 작성 가이드

이 문서는 블로그 포스트 작성 시 참고하는 가이드입니다.

## 파일 생성

### 위치

모든 포스트는 `content/posts/` 디렉토리에 `.mdx` 확장자로 생성합니다.

```
content/
└── posts/
    ├── 2024-12-30-my-first-post.mdx
    ├── 2024-12-31-react-hooks-guide.mdx
    └── 2025-01-01-typescript-tips.mdx
```

### 파일명 규칙

- **`YYYY-MM-DD-slug.mdx` 형식** 사용 (예: `2025-01-15-nextjs-routing.mdx`)
- **소문자** 사용
- **케밥 케이스** (단어 사이 하이픈) 사용
- 영문으로 작성 권장 (URL에 사용됨)
- 예: `2025-02-10-nextjs-15-features.mdx`, `2025-02-11-react-server-components.mdx`

파일명이 곧 URL slug가 됩니다:
- `2025-02-10-hello-world.mdx` → `/posts/2025-02-10-hello-world`
- `2025-02-11-typescript-tips.mdx` → `/posts/2025-02-11-typescript-tips`

## 프론트매터

각 포스트 상단에 YAML 형식의 프론트매터를 작성합니다.

### 필수 필드

```yaml
---
title: "포스트 제목"
description: "포스트에 대한 간단한 설명"
date: "2024-12-30"
published: true
category: "java-spring"
tags: ["spring", "jpa"]
---
```

### 선택 필드

```yaml
---
title: "포스트 제목"
description: "포스트에 대한 간단한 설명"
date: "2024-12-30"
published: true
category: "dev-tools"
tags: ["nextjs", "react"]
series: "series-slug"    # 시리즈 식별자 (선택)
seriesOrder: 1           # 시리즈 내 순서 (선택)
---
```

`published`, `tags`는 Velite 스키마에 기본값이 있지만, 이 프로젝트에서는 작성 일관성을 위해 항상 명시합니다.

### 필드 상세 설명

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | 문자열 | O | 포스트 제목 (최대 99자) |
| `description` | 문자열 | O | 포스트 설명 (최대 999자) |
| `date` | 날짜 | O | 작성일 (ISO 형식: YYYY-MM-DD) |
| `published` | 불리언 | O | 공개 여부 (권장 기본값: `true`) |
| `category` | 문자열 | O | 카테고리 slug 1개 (아래 목록 중 하나, 그 외 값은 빌드 실패) |
| `tags` | 배열 | O | 태그 목록 (비어 있어도 `[]`로 명시) |
| `series` | 문자열 | X | 시리즈 식별자 (kebab-case) |
| `seriesOrder` | 숫자 | X | 시리즈 내 순서 (1부터 시작) |

### 카테고리

카테고리는 글마다 정확히 하나를 고르는 1차 분류입니다. 홈 화면과 내비게이션에 노출되므로 **10개 이하**로 유지합니다.
정의는 `src/lib/categories.ts` 한 곳에만 있고, `velite.config.ts`가 이 목록을 enum으로 검증합니다.

| slug | 표시 이름 | 다루는 글 |
|------|-----------|-----------|
| `ai` | AI·에이전트 | Claude Code, 에이전트, eval, MCP |
| `java-spring` | Java·Spring | 언어·프레임워크 동작, JVM, 동시성 |
| `architecture` | 아키텍처·설계 | DDD, MSA 패턴, CQS, 서비스 설계 |
| `messaging` | 메시징·이벤트 | Kafka, EDA, 아웃박스, 이벤트 알림 |
| `database` | 데이터베이스 | RDB, Redis, MongoDB, OpenSearch |
| `testing` | 테스트 | 테스트 전략, 테스트 도구 |
| `infra` | 인프라·클라우드 | AWS, Docker, 네트워크 |
| `dev-tools` | 개발 도구·환경 | IDE, Homebrew, Mac 셋업, 블로그 |
| `math-cs` | 수학·CS | 수학, 통계, 지리, 암호화 기초 |

- 새 카테고리는 기존 카테고리로 묶이지 않는 글이 여러 편 쌓였을 때만 추가합니다.
- 세부 키워드는 카테고리 대신 `tags`로 표현합니다.

### 태그

태그는 카테고리를 가로지르는 기술·개념 키워드입니다(예: `redis`는 Java·Spring 글과 데이터베이스 글 양쪽에 붙는다).

- **영문 소문자 kebab-case**로 씁니다: `claude-code`, `event-driven`, `api-design`. 한글 태그와 대소문자 변형(`DDD`/`ddd`)을 만들지 않습니다.
- **기존 태그를 먼저 고릅니다.** 지금 쓰이는 태그는 홈의 "전체 태그 보기"(`/tags`)에서 확인합니다. 새 태그는 앞으로도 여러 글에 붙을 키워드일 때만 만듭니다.
- 글당 **1~4개**. 제목을 그대로 쪼갠 단어(`problem`, `solution`)나 카테고리와 같은 뜻의 포괄어(`database`, `testing`)는 붙이지 않습니다.
- 시리즈 이름은 태그로 반복하지 않습니다. 시리즈는 `series`로 묶입니다.

### 예시

```yaml
---
title: "Next.js 15의 새로운 기능들"
description: "Next.js 15에서 도입된 주요 변경사항과 새로운 기능들을 살펴봅니다."
date: "2024-12-29"
published: true
category: "dev-tools"
tags: ["nextjs", "react"]
---
```

## MDX 본문 작성

프론트매터 아래에 MDX 형식으로 본문을 작성합니다.

### 마크다운 문법

```markdown
## 제목 2
### 제목 3
#### 제목 4

일반 텍스트 단락입니다.

**굵은 글씨**, *기울임*, `인라인 코드`

- 목록 항목 1
- 목록 항목 2
  - 중첩 항목

1. 순서 있는 목록
2. 두 번째 항목

> 인용문입니다.

[링크 텍스트](https://example.com)

![이미지 설명](/images/example.png)
```

### 줄바꿈과 강조

- 문단 안의 줄바꿈은 그대로 줄바꿈(`<br>`)으로 렌더링됩니다(`remark-breaks`). 한 줄에 한 문장씩 써도 됩니다. 문단을 나누려면 빈 줄을 넣습니다.
- `**거리(distance)**가`처럼 닫는 `**` 앞이 문장부호이고 뒤에 한글이 붙어도 굵게 처리됩니다(`remark-cjk-friendly`).
- 표 안 인라인 코드에 `|`가 들어가면 셀 구분자로 해석됩니다. `` `?\|` ``처럼 백슬래시로 이스케이프합니다.

### 코드 블록

언어를 명시하면 자동으로 문법 하이라이팅이 적용됩니다.

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

```typescript
interface User {
  name: string;
  email: string;
}
```

```bash
pnpm install
pnpm dev
```
````

지원 언어: `javascript`, `typescript`, `jsx`, `tsx`, `bash`, `json`, `yaml`, `css`, `html`, `python`, `go`, `rust` 등

### 파일명 표시

코드 블록에 파일명을 표시할 수 있습니다:

````markdown
```typescript title="src/app/page.tsx"
export default function Home() {
  return <h1>Hello</h1>;
}
```
````

### 줄 하이라이팅

특정 줄을 강조할 수 있습니다:

````markdown
```typescript {3-4}
const config = {
  name: "blog",
  version: "1.0.0",  // 강조됨
  private: true,     // 강조됨
};
```
````

## MDX 주의사항

MDX는 마크다운 + JSX 문법을 지원하므로, 특정 문자 조합이 JSX로 해석될 수 있습니다.

### 꺾쇠 괄호 (`<`, `>`) 주의

다음과 같은 표현은 **빌드 에러**를 발생시킵니다:

```markdown
<!-- ❌ 잘못된 예 -->
## 메인 <-> 서브 통신
A <> B 비교
배열<T> 타입
```

`<` 뒤에 문자가 오면 JSX 태그로 해석되기 때문입니다.

**해결 방법:**

```markdown
<!-- ✅ 올바른 예 -->
## 메인 ↔ 서브 통신     <!-- 유니코드 화살표 사용 -->
A ↔ B 비교
배열\<T\> 타입          <!-- 백슬래시로 이스케이프 -->
`<T>` 타입              <!-- 인라인 코드로 감싸기 -->
```

### 유용한 유니코드 기호

| 대체 전 | 대체 후 | 설명 |
|---------|---------|------|
| `<->` | `↔` | 양방향 화살표 |
| `->` | `→` | 오른쪽 화살표 |
| `<-` | `←` | 왼쪽 화살표 |
| `<>` | `<>` 또는 `≠` | 비교 연산자 |

### 코드 블록 안은 안전

코드 블록(``` ```) 안에서는 JSX로 해석되지 않으므로 자유롭게 사용 가능합니다.

```typescript
// 코드 블록 안에서는 문제없음
const arrow = "<->";
type Generic<T> = T[];
```

## 이미지 추가

### 로컬 이미지

`public/` 디렉토리에 이미지를 추가하고 절대 경로로 참조합니다:

```markdown
![설명](/images/screenshot.png)
```

### 외부 이미지

외부 URL도 사용 가능합니다:

```markdown
![설명](https://example.com/image.png)
```

## 비공개 포스트

작성 중인 포스트는 `published: false`로 설정하면 목록에 표시되지 않습니다.

```yaml
---
title: "작성 중인 포스트"
description: "아직 공개하지 않을 포스트입니다."
date: "2024-12-30"
published: false
category: "java-spring"
tags: []
---
```

## 새 포스트 작성 체크리스트

1. [ ] `content/posts/` 에 `.mdx` 파일 생성
2. [ ] 파일명은 `YYYY-MM-DD-slug.mdx` 형식
3. [ ] 프론트매터 작성 (`title`, `description`, `date`, `published`, `category`, `tags` 필수)
4. [ ] 본문 작성
5. [ ] `pnpm dev`로 미리보기 확인
6. [ ] `published: true` 확인 (공개할 경우)

## 자주 사용하는 템플릿

### 기술 글 템플릿

```markdown
---
title: "기술 주제"
description: "이 글에서 다루는 내용에 대한 설명"
date: "2024-12-30"
published: true
category: "java-spring"
tags: ["spring", "jpa"]
---

## 소개

이 글에서는 ...에 대해 알아봅니다.

## 본론

### 섹션 1

내용...

### 섹션 2

내용...

## 결론

정리 및 마무리...
```

### TIL (Today I Learned) 템플릿

```markdown
---
title: "TIL: 오늘 배운 것"
description: "간단한 설명"
date: "2024-12-30"
published: true
category: "java-spring"
tags: ["java"]
---

## 배운 것

오늘 배운 내용 정리...

## 참고 자료

- [링크1](https://example.com)
- [링크2](https://example.com)
```
