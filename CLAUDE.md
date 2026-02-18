# Claude 작업 가이드 (SSOT)

이 문서는 이 저장소에서 작업하는 에이전트용 단일 가이드(SSOT)입니다.

## 문서 역할 분리

- 로컬 실행/일반 사용 가이드: `README.md`
- 에이전트 작업 규칙: `CLAUDE.md` (이 문서)
- 포스트 작성 표준: `POST_WRITING_GUIDELINE.md`

중복을 줄이기 위해 로컬 실행 절차는 `README.md`에서만 관리합니다.

## 프로젝트 요약

- Next.js 16(App Router) + React 19
- Velite 기반 MDX 블로그
- Tailwind CSS v4
- 패키지 매니저: pnpm

## 핵심 제약

1. Turbopack 비호환
- Velite 웹팩 플러그인 때문에 개발/빌드 시 webpack 기반 실행을 유지해야 합니다.
- `package.json` 스크립트(`pnpm dev`, `pnpm build`)를 변경하지 않는 한 안전합니다.

2. 콘텐츠 소스와 생성물
- 원본 포스트: `content/posts/*.mdx`
- 생성 산출물: `.velite/` (자동 생성, 수정 금지)

3. 경로 별칭
- `@/*` → `./src/*`
- `#site/content` → `./.velite`

## 콘텐츠/스키마 규칙

`velite.config.ts` 스키마 기준:

- 필수 기입: `title`, `description`, `date`, `published`, `tags`
- 선택 필드: `series`, `seriesOrder`
- slug는 파일 경로 기반 자동 생성(`s.path()`)

작성 템플릿/체크리스트는 `POST_WRITING_GUIDELINE.md`를 우선 적용합니다.

## 운영 워크플로우

### 포스트 작성 요청

1. `content/posts/`에 `YYYY-MM-DD-slug.mdx` 형식으로 생성
2. frontmatter 필수 필드 명시
3. 필요 시 `series`/`seriesOrder` 추가
4. 시리즈 문맥과 링크/용어 일관성 검토

### 배포 요청 (Vercel)

1. `pnpm lint`
2. `pnpm build`
3. 프리뷰: `npx vercel`
4. 프로덕션 명시 시: `npx vercel --prod`

실패 시 원인 로그를 요약하고 수정 후 재시도합니다.

## 구현 시 체크리스트

- 새 페이지: `src/app/`
- 공통 컴포넌트: `src/components/`
- 유틸 함수: `src/lib/`
- 콘텐츠 타입 변경: `velite.config.ts` + 소비 코드 동시 점검
- MDX 렌더링 로직 변경 시 `src/components/mdx-content.tsx` 동작 확인

## 스타일링 원칙

- Tailwind CSS 사용
- 라이트 테마 기준(다크 모드 미지원)
- MDX 본문은 `prose` 스타일 사용

## 시리즈 작성 규칙

- 같은 시리즈는 동일한 `series` 값 사용
- `seriesOrder`는 1부터 시작하는 정수
- 단독 글은 `series`, `seriesOrder` 생략
