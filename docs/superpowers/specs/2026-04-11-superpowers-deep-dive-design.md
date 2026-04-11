# Superpowers 딥다이브 시리즈 설계서

## 개요

Claude Code Superpowers 플러그인의 14개 스킬 내부 구조를 딥다이브하는 블로그 시리즈.
실전 개발 사이클 순서로 5편 구성, 시나리오 역추적 방식으로 서술.

## 시리즈 메타

| 항목 | 값 |
|------|-----|
| series slug | `superpowers-deep-dive` |
| tags | `["claude-code", "superpowers", "prompt-engineering"]` |
| 총 편수 | 5편 |
| 대상 독자 | 본인 (superpowers 완전 이해 목적) |

## 서술 방식: 시나리오 역추적 (Bottom-up)

각 편의 공통 구조:

1. **시나리오 제시** — "사용자가 X를 요청했다"
2. **에이전트 행동 관찰** — "에이전트가 이렇게 반응했다"
3. **프롬프트 역추적** — "이 행동은 프롬프트의 이 구절에서 온다" (원문 인용 + 분석)
4. **설계 의도 분석** — "왜 이렇게 설계했는가"
5. **연결 고리** — 다음 스킬로의 전환이 어떻게 트리거되는가

## 편별 구성

### 1편: Superpowers - using-superpowers

- **파일**: `content/posts/2026-04-11-superpowers-01-using-superpowers.mdx`
- **시나리오**: 사용자가 "버튼 추가해줘"라고 했을 때, 코드를 바로 안 쓰고 brainstorming이 먼저 발동하는 이유
- **다루는 스킬**: `using-superpowers`
- **핵심 분석 대상**:
  - 스킬 디스패칭 의사결정 플로우 (digraph)
  - "1% 규칙" — 1%라도 관련 가능성이 있으면 스킬 발동
  - Red Flags 합리화 방지 테이블의 설계 의도
  - Instruction Priority 계층 (user > superpowers > system prompt)
  - Rigid vs Flexible 스킬 분류

### 2편: Superpowers - brainstorming

- **파일**: `content/posts/2026-04-11-superpowers-02-brainstorming.mdx`
- **시나리오**: "검색 기능 만들자"부터 설계 문서가 커밋되기까지의 전체 과정
- **다루는 스킬**: `brainstorming`
- **핵심 분석 대상**:
  - HARD-GATE: 설계 승인 전 구현 금지 장치
  - "This Is Too Simple" 안티패턴 — 단순해 보여도 설계를 거치는 이유
  - 9단계 체크리스트의 순서가 갖는 의미
  - 한 번에 하나씩 질문하는 제약의 이유
  - 스펙 셀프리뷰 4가지 체크포인트
  - Visual Companion 동의 메커니즘
  - 터미널 상태: writing-plans만 호출 가능한 이유

### 3편: Superpowers - planning & execution

- **파일**: `content/posts/2026-04-11-superpowers-03-planning-execution.mdx`
- **시나리오**: 설계서를 넘겨받은 에이전트가 계획서를 쓰고, worktree를 만들고, 서브에이전트를 디스패치하는 흐름
- **다루는 스킬 (주)**: `writing-plans`, `executing-plans`
- **다루는 스킬 (보조)**: `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`
- **핵심 분석 대상**:
  - writing-plans: scope check → file mapping → TDD 내장 구조
  - executing-plans: 3-phase 프로세스 (load → execute → complete)
  - subagent-driven-development: 2-stage review (spec compliance → code quality)
  - dispatching-parallel-agents: 독립 도메인 식별 → 병렬 디스패치 → 통합 패턴
  - using-git-worktrees: 안전한 격리 환경 생성과 자동 셋업
  - 실행 방식 선택지: inline vs subagent-driven

### 4편: Superpowers - TDD & debugging

- **파일**: `content/posts/2026-04-11-superpowers-04-tdd-debugging.mdx`
- **시나리오**: 테스트가 실패했을 때 에이전트가 디버깅 → TDD → 검증까지 어떻게 순환하는가
- **다루는 스킬 (주)**: `test-driven-development`, `systematic-debugging`
- **다루는 스킬 (보조)**: `verification-before-completion`
- **핵심 분석 대상**:
  - TDD: Red-Green-Refactor 사이클의 엄격한 순서 강제
  - "테스트가 실패하는 걸 안 봤으면, 그 테스트가 맞는지 모른다" 원칙
  - systematic-debugging: 4-phase 조사 (root cause → pattern → hypothesis → implementation)
  - "3번 수정 실패 시 아키텍처 재검토" 규칙
  - verification-before-completion: 증거 기반 완료 선언 5단계
  - "should", "probably" 금지 — 주장에는 반드시 증거

### 5편: Superpowers - code review & finishing

- **파일**: `content/posts/2026-04-11-superpowers-05-review-finishing.mdx`
- **시나리오**: 구현이 끝난 후 코드리뷰를 요청하고, 피드백을 받고, 브랜치를 마무리하는 과정
- **다루는 스킬**: `requesting-code-review`, `receiving-code-review`, `finishing-a-development-branch`
- **핵심 분석 대상**:
  - requesting: code-reviewer 서브에이전트에게 넘기는 템플릿 구조
  - receiving: "performative agreement 금지" — 피드백에 무조건 동의하지 않는 설계
  - receiving: 6단계 응답 패턴 (읽기 → 이해 → 검증 → 평가 → 응답 → 구현)
  - finishing: 4가지 선택지 (merge / PR / keep / discard)와 worktree 정리
  - 전체 사이클 회고: using-superpowers → brainstorming → ... → finishing 순환 구조

## Frontmatter 템플릿

```yaml
---
title: "Superpowers - {skill name}"
description: "{해당 편의 한 줄 설명}"
date: "2026-04-11"
published: false
tags: ["claude-code", "superpowers", "prompt-engineering"]
series: "superpowers-deep-dive"
seriesOrder: {N}
---
```

## 작성 순서

1편부터 순서대로 작성. 각 편의 마지막에서 다음 편으로의 연결 고리를 명시.
