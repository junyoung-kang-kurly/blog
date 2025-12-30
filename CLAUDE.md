# Claude 개발 가이드

이 문서는 Claude가 이 프로젝트를 이해하고 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

Next.js 16 (App Router)와 Velite를 사용한 기술 블로그 프로젝트입니다.

## 핵심 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.x | 프레임워크 (App Router) |
| React | 19.x | UI 라이브러리 |
| Velite | 0.3.x | MDX 콘텐츠 관리 |
| Tailwind CSS | 4.x | 스타일링 |
| Rehype Pretty Code | 0.14.x | 코드 하이라이팅 |
| pnpm | - | 패키지 매니저 |

## 주요 명령어

```bash
pnpm dev      # 개발 서버 실행 (webpack 모드)
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 서버 실행
pnpm lint     # ESLint 실행
```

## 프로젝트 구조

```
blog/
├── content/posts/       # MDX 블로그 포스트 (Velite가 처리)
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx   # 루트 레이아웃
│   │   ├── page.tsx     # 홈 페이지 (포스트 목록)
│   │   ├── posts/[slug]/page.tsx  # 포스트 상세
│   │   └── about/page.tsx         # 소개 페이지
│   ├── components/
│   │   └── mdx-content.tsx  # MDX 렌더링 컴포넌트 (클라이언트)
│   └── lib/
│       └── utils.ts     # 유틸리티 함수 (날짜 포맷, 정렬)
├── .velite/             # Velite 빌드 출력 (자동 생성, gitignore)
├── velite.config.ts     # Velite 설정 및 스키마
└── next.config.ts       # Next.js + Velite 웹팩 플러그인
```

## 중요 설정 파일

### velite.config.ts

Velite 콘텐츠 스키마 정의:

- `title`: 포스트 제목 (최대 99자)
- `description`: 포스트 설명 (최대 999자)
- `date`: ISO 날짜 형식
- `published`: 공개 여부 (기본값: true)
- `tags`: 태그 배열 (기본값: [])
- `slug`: 파일 경로에서 자동 생성 (`s.path()`)
- `body`: MDX 본문 (`s.mdx()`)

### next.config.ts

- Velite 웹팩 플러그인 설정
- 개발 모드에서 watch 모드 활성화
- Turbopack 대신 webpack 사용 필수 (`--webpack` 플래그)

### tsconfig.json

경로 별칭:
- `@/*` → `./src/*`
- `#site/content` → `./.velite`

## 콘텐츠 타입 접근

```typescript
import { posts } from "#site/content";

// posts 배열에서 포스트 조회
const post = posts.find((p) => p.slugAsParams === slug);
```

## 주의사항

1. **Turbopack 비호환**: Velite 웹팩 플러그인은 Turbopack과 호환되지 않음. `pnpm dev`는 `--webpack` 플래그 사용.

2. **slug 생성**: `s.path()`를 사용하여 파일 경로에서 자동 생성. `slugAsParams`는 `posts/` 접두사 제거된 버전.

3. **.velite 폴더**: 자동 생성되며 gitignore에 포함. 빌드 시 타입 정의 파일도 생성됨.

4. **MDX 렌더링**: `mdx-content.tsx`는 클라이언트 컴포넌트로 `useMDXComponent` 훅 사용.

## 새 기능 추가 시 고려사항

- 새 페이지는 `src/app/` 디렉토리에 추가
- 공통 컴포넌트는 `src/components/`에 추가
- 유틸리티 함수는 `src/lib/`에 추가
- 새 콘텐츠 타입은 `velite.config.ts`에 컬렉션 추가

## 스타일링 규칙

- Tailwind CSS 클래스 사용
- 다크 모드 미지원 (라이트 테마만)
- MDX 콘텐츠는 `prose` 클래스로 스타일링
- 코드 블록은 Rehype Pretty Code가 처리 (`github-light` 테마)
