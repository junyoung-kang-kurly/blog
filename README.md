# 기술 블로그

Next.js 15와 Velite를 사용한 개인 기술 블로그입니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **콘텐츠 관리**: Velite (MDX 기반)
- **스타일링**: Tailwind CSS v4
- **코드 하이라이팅**: Rehype Pretty Code + Shiki
- **아이콘**: Lucide React
- **패키지 매니저**: pnpm

## 프로젝트 구조

```
blog/
├── content/
│   └── posts/           # MDX 블로그 포스트
├── src/
│   ├── app/             # Next.js App Router 페이지
│   │   ├── posts/[slug]/  # 포스트 상세 페이지
│   │   └── about/         # 소개 페이지
│   ├── components/      # React 컴포넌트
│   └── lib/             # 유틸리티 함수
├── .velite/             # Velite 빌드 출력 (자동 생성)
├── velite.config.ts     # Velite 설정
└── next.config.ts       # Next.js 설정
```

## 시작하기

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

### 프로덕션 빌드

```bash
pnpm build
pnpm start
```

## 블로그 포스트 작성

`content/posts/` 디렉토리에 `.mdx` 파일을 생성합니다.

### 프론트매터 스키마

```yaml
---
title: "포스트 제목"
description: "포스트 설명"
date: "2024-12-30"
published: true
tags: ["태그1", "태그2"]
---
```

자세한 작성 가이드는 [post_writing_guideline.md](./post_writing_guideline.md)를 참고하세요.

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 - 전체 포스트 목록 |
| `/posts/[slug]` | 포스트 상세 페이지 |
| `/about` | 소개 페이지 |

## 배포

Vercel에 배포하는 것을 권장합니다:

```bash
pnpm build
```

빌드 성공 후 Vercel에 연결하여 자동 배포를 설정할 수 있습니다.

## 라이선스

MIT License
