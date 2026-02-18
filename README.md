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

자세한 작성 가이드는 [POST_WRITING_GUIDELINE.md](POST_WRITING_GUIDELINE.md)를 참고하세요.

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 - 전체 포스트 목록 |
| `/posts/[slug]` | 포스트 상세 페이지 |
| `/about` | 소개 페이지 |

## 배포

Vercel에 배포하는 것을 권장합니다.

### 방법 1: Vercel CLI 사용

```bash
# Vercel CLI 설치 (전역)
npm i -g vercel

# 로그인
vercel login

# 배포 (프로덕션)
vercel --prod
```

### 방법 2: GitHub 연동 (권장)

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 import
4. 프레임워크 프리셋: Next.js (자동 감지)
5. "Deploy" 클릭

GitHub 연동 시 `main` 브랜치에 푸시할 때마다 자동 배포됩니다.

### 환경 설정

별도의 환경 변수 설정은 필요하지 않습니다. 빌드 명령어는 `pnpm build`가 자동으로 사용됩니다.

### 빌드 확인

로컬에서 프로덕션 빌드를 테스트하려면:

```bash
pnpm build
pnpm start
```

## 라이선스

MIT License
