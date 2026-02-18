# 기술 블로그

Next.js 16(App Router)와 Velite를 사용하는 개인 기술 블로그입니다.

## 문서 안내

- `README.md`: 개발자/협업자용 프로젝트 사용 가이드 (로컬 실행 포함)
- `CLAUDE.md`: 에이전트 작업 가이드 SSOT
- `POST_WRITING_GUIDELINE.md`: 블로그 글 작성 표준

## 기술 스택

- **Framework**: Next.js 16
- **UI**: React 19
- **Content**: Velite (MDX)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm

## 로컬 실행

### 1) 의존성 설치

```bash
pnpm install
```

### 2) 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

## 주요 명령어

```bash
pnpm dev      # 개발 서버 실행 (webpack 모드)
pnpm lint     # ESLint 실행
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 서버 실행
```

## 프로젝트 구조

```text
blog/
├── content/posts/       # MDX 블로그 포스트
├── src/app/             # Next.js App Router 페이지
├── src/components/      # 공용 컴포넌트
├── src/lib/             # 유틸리티
├── .velite/             # Velite 빌드 출력 (자동 생성)
├── velite.config.ts     # Velite 스키마/설정
└── next.config.ts       # Next.js 설정
```

## 포스트 작성

`content/posts/`에 `.mdx` 파일을 추가합니다.

- 기본 frontmatter 필드: `title`, `description`, `date`, `published`, `tags`
- 작성 템플릿/체크리스트: [POST_WRITING_GUIDELINE.md](POST_WRITING_GUIDELINE.md)

## 배포

Vercel 사용을 권장합니다.

```bash
pnpm lint
pnpm build
npx vercel        # preview
npx vercel --prod # production
```

## 라이선스

MIT
