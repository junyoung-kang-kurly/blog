# Superpowers 딥다이브 시리즈 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Superpowers 14개 스킬의 내부 프롬프트 구조와 설계 철학을 분석하는 5편짜리 블로그 시리즈 작성

**Architecture:** 시나리오 역추적(Bottom-up) 방식 — 실제 사용 시나리오를 먼저 제시하고, 에이전트의 행동을 관찰한 뒤, 그 행동을 유발한 프롬프트 구절을 역추적하여 설계 의도를 분석

**Tech Stack:** Next.js 16 + Velite MDX, series frontmatter (`superpowers-deep-dive`)

**설계서:** `docs/superpowers/specs/2026-04-11-superpowers-deep-dive-design.md`

**스킬 원문 경로:** `/Users/junyoung.kang/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/`

---

## 사전 준비

모든 포스트에서 superpowers 스킬 원문을 인용한다.
스킬 원문은 위 경로의 `{skill-name}/SKILL.md` 파일에서 읽는다.

각 포스트의 공통 서술 패턴:
```
시나리오 → 에이전트 행동 관찰 → 프롬프트 역추적 (원문 인용) → 설계 의도 → 다음 스킬 연결
```

빌드 검증: `pnpm build` 로 MDX 파싱 에러가 없는지 확인.
MDX 주의사항: `<` 뒤에 문자가 오면 JSX 태그로 해석됨. 꺾쇠는 유니코드(`→`, `←`, `↔`) 또는 인라인 코드로 대체.

---

## Task 1: Superpowers - using-superpowers

**Files:**
- Create: `content/posts/2026-04-11-superpowers-01-using-superpowers.mdx`
- Read: `superpowers/5.0.7/skills/using-superpowers/SKILL.md`

### 개요

이 편의 핵심 질문: "왜 사용자가 뭘 요청하든 에이전트는 코드부터 쓰지 않는가?"

using-superpowers는 다른 모든 스킬의 진입점이다. 에이전트가 사용자 메시지를 받았을 때 가장 먼저 실행하는 의사결정 로직을 분석한다.

### 단계

- [ ] **Step 1: 스킬 원문 읽기**

`/Users/junyoung.kang/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/using-superpowers/SKILL.md`를 읽고, 다음 핵심 구절을 식별하여 메모:
  - digraph 플로우차트 전문
  - Red Flags 테이블 전문
  - Instruction Priority 섹션
  - Skill Priority 섹션
  - Rigid vs Flexible 분류

- [ ] **Step 2: MDX 파일 생성 — frontmatter + 도입부**

```yaml
---
title: "Superpowers - using-superpowers"
description: "사용자의 요청을 받은 에이전트가 코드를 쓰기 전에 거치는 스킬 디스패칭 메커니즘을 해부한다."
date: "2026-04-11"
published: false
tags: ["claude-code", "superpowers", "prompt-engineering"]
series: "superpowers-deep-dive"
seriesOrder: 1
---
```

도입 시나리오: 사용자가 "버튼 추가해줘"라고 했을 때, 에이전트가 즉시 코드를 쓰지 않고 brainstorming 스킬을 발동시키는 상황을 서술.

- [ ] **Step 3: 섹션 작성 — 1% 규칙과 digraph 분석**

에이전트의 의사결정 흐름인 digraph를 인용하고, 각 노드의 역할을 분석.
핵심 인용: `"Even a 1% chance a skill might apply means that you should invoke the skill to check."`
이 규칙이 왜 1%인지 — false negative(스킬을 안 써서 품질 저하)의 비용이 false positive(불필요한 스킬 발동)의 비용보다 훨씬 크기 때문.

- [ ] **Step 4: 섹션 작성 — Red Flags 합리화 방지 테이블**

12개 합리화 패턴 테이블 전문을 인용하고, 각 항목이 어떤 실패 시나리오에서 비롯되었을지 분석.
예시: `"This is just a simple question"` → 단순한 질문이 실은 복잡한 구현을 내포하는 경우, `"Let me explore the codebase first"` → 스킬이 탐색 방법을 알려주는데 먼저 탐색부터 하면 방향 없는 탐색이 됨.

- [ ] **Step 5: 섹션 작성 — Instruction Priority와 Skill Types**

3계층 우선순위 (`user > superpowers > system prompt`) 설계 의도.
Rigid vs Flexible 스킬 분류가 왜 필요한가 — TDD 같은 규율 스킬은 유연하게 적용하면 무력화되지만, 패턴 스킬은 컨텍스트에 맞게 변형해야 효과적.

- [ ] **Step 6: 섹션 작성 — 다음 편으로의 연결**

using-superpowers가 brainstorming을 트리거하는 지점을 설명.
`Skill Priority` 섹션의 `"Let's build X" → brainstorming first` 규칙을 인용하며 2편으로 연결.

- [ ] **Step 7: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공, MDX 파싱 에러 없음

- [ ] **Step 8: 커밋**

```bash
git add content/posts/2026-04-11-superpowers-01-using-superpowers.mdx
git commit -m "post: Superpowers 딥다이브 (1) - using-superpowers"
```

---

## Task 2: Superpowers - brainstorming

**Files:**
- Create: `content/posts/2026-04-11-superpowers-02-brainstorming.mdx`
- Read: `superpowers/5.0.7/skills/brainstorming/SKILL.md`

### 개요

이 편의 핵심 질문: "에이전트는 어떻게 아이디어를 설계서로 변환하는가, 그리고 왜 설계 없이는 한 줄도 구현하지 않는가?"

brainstorming 스킬의 HARD-GATE, 9단계 체크리스트, 안티패턴 방어 메커니즘을 해부한다.

### 단계

- [ ] **Step 1: 스킬 원문 읽기**

`/Users/junyoung.kang/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/brainstorming/SKILL.md`를 읽고, 다음 핵심 구절을 식별하여 메모:
  - HARD-GATE 블록
  - "This Is Too Simple To Need A Design" 안티패턴
  - 9단계 체크리스트와 process flow digraph
  - "One question at a time" 원칙
  - Spec Self-Review 4단계
  - Visual Companion 섹션
  - 터미널 상태 규칙: `"The terminal state is invoking writing-plans."`

- [ ] **Step 2: MDX 파일 생성 — frontmatter + 도입부**

```yaml
---
title: "Superpowers - brainstorming"
description: "아이디어가 설계서가 되기까지의 전체 과정 — HARD-GATE, 9단계 체크리스트, 합리화 방지 메커니즘을 분석한다."
date: "2026-04-11"
published: false
tags: ["claude-code", "superpowers", "prompt-engineering"]
series: "superpowers-deep-dive"
seriesOrder: 2
---
```

도입 시나리오: "검색 기능 만들자"라고 요청했을 때, 에이전트가 바로 코드를 쓰지 않고 질문을 하나씩 던지며 설계를 구체화하는 과정을 관찰.

- [ ] **Step 3: 섹션 작성 — HARD-GATE 해부**

HARD-GATE 원문 인용: `"Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it."`
이 게이트가 왜 필요한가 — LLM이 구현으로 뛰어드는 경향(action bias)을 강제로 차단.
"This Is Too Simple" 안티패턴과의 관계 — 단순해 보이는 프로젝트에서 검증 안 된 가정이 가장 많은 낭비를 만든다는 설계 철학.

- [ ] **Step 4: 섹션 작성 — 9단계 체크리스트 분석**

체크리스트 전체를 인용하고 각 단계의 순서가 왜 그렇게 배치되었는지 분석.
핵심 포인트:
  - 프로젝트 컨텍스트 탐색이 1번인 이유 (기존 코드를 모르고 설계하면 충돌)
  - "한 번에 하나씩 질문" 제약의 이유 (질문 폭탄 → 사용자 과부하 → 대충 답변)
  - 2-3가지 접근 제안이 필수인 이유 (첫 아이디어에 고착 방지)
  - Spec self-review → User review → writing-plans 순서의 게이트 구조

- [ ] **Step 5: 섹션 작성 — process flow digraph 분석**

digraph 원문 인용. 특히 "User approves design?" → "Present design sections" 피드백 루프와, "User reviews spec?" → "Write design doc" 루프 — 이중 승인 게이트의 설계 의도.

- [ ] **Step 6: 섹션 작성 — Visual Companion과 터미널 상태**

Visual Companion 동의 메커니즘: "MUST be its own message" 제약의 이유 — 동의와 질문을 섞으면 동의가 묻힘.
터미널 상태: `"Do NOT invoke frontend-design, mcp-builder, or any other implementation skill. The ONLY skill you invoke after brainstorming is writing-plans."` — 스킬 간 명확한 전이 규칙이 왜 필요한가.

- [ ] **Step 7: 섹션 작성 — 다음 편으로의 연결**

brainstorming의 유일한 출구가 writing-plans인 점을 강조하며 3편으로 연결.

- [ ] **Step 8: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공, MDX 파싱 에러 없음

- [ ] **Step 9: 커밋**

```bash
git add content/posts/2026-04-11-superpowers-02-brainstorming.mdx
git commit -m "post: Superpowers 딥다이브 (2) - brainstorming"
```

---

## Task 3: Superpowers - planning & execution

**Files:**
- Create: `content/posts/2026-04-11-superpowers-03-planning-execution.mdx`
- Read: 다음 스킬 원문 5개
  - `writing-plans/SKILL.md`
  - `executing-plans/SKILL.md`
  - `subagent-driven-development/SKILL.md`
  - `dispatching-parallel-agents/SKILL.md`
  - `using-git-worktrees/SKILL.md`

### 개요

이 편의 핵심 질문: "설계서가 실제 코드가 되기까지 어떤 경로를 거치는가?"

5개 스킬이 협력하는 실행 파이프라인을 한 편에서 다룬다. writing-plans → (worktree 생성) → executing-plans 또는 subagent-driven-development → (필요시 parallel agents) 순서.

### 단계

- [ ] **Step 1: 5개 스킬 원문 읽기**

위 5개 SKILL.md를 모두 읽고, 각 스킬에서 다음을 식별:
  - writing-plans: "Bite-Sized Task Granularity", "No Placeholders", "Self-Review" 섹션
  - executing-plans: 3-phase 구조, plan review 시 질문/우려 제기 규칙
  - subagent-driven-development: 2-stage review (spec compliance → code quality), model 선택 가이드
  - dispatching-parallel-agents: 독립 도메인 식별 패턴, focused prompt 작성법
  - using-git-worktrees: 디렉토리 선택 우선순위, .gitignore 안전 검사

- [ ] **Step 2: MDX 파일 생성 — frontmatter + 도입부**

```yaml
---
title: "Superpowers - planning & execution"
description: "설계서에서 동작하는 코드까지 — 계획 수립, worktree 격리, 서브에이전트 실행의 내부 구조를 추적한다."
date: "2026-04-11"
published: false
tags: ["claude-code", "superpowers", "prompt-engineering"]
series: "superpowers-deep-dive"
seriesOrder: 3
---
```

도입 시나리오: brainstorming에서 승인된 설계서를 넘겨받은 에이전트가 계획서를 쓰고, worktree를 만들고, 서브에이전트에게 태스크를 분배하는 전체 과정.

- [ ] **Step 3: 섹션 작성 — writing-plans의 No Placeholders 철학**

"No Placeholders" 섹션 인용. 금지된 패턴 목록:
`"TBD"`, `"TODO"`, `"Add appropriate error handling"`, `"Similar to Task N"`

이 제약의 설계 의도: 계획서를 읽는 실행자(에이전트든 사람이든)가 추가 판단 없이 그대로 실행할 수 있어야 한다. "implement later"는 계획이 아니라 미룸.

"Bite-Sized Task Granularity" 인용: 각 step이 2-5분 단위인 이유 — 작은 단위가 실패 시 롤백 범위를 줄이고 진행 상황을 명확히 추적 가능.

- [ ] **Step 4: 섹션 작성 — 실행 갈림길: inline vs subagent-driven**

writing-plans의 Execution Handoff 섹션 인용. 두 가지 경로:
1. `executing-plans` — 같은 세션에서 순차 실행. plan을 비판적으로 리뷰하고 질문/우려를 먼저 제기하는 규칙.
2. `subagent-driven-development` — 태스크당 fresh subagent 디스패치. 2-stage review (spec compliance → code quality).

각 경로의 트레이드오프 분석.

- [ ] **Step 5: 섹션 작성 — subagent-driven-development 2-stage review**

2-stage review 프로세스 인용:
  - Stage 1: spec reviewer — "코드가 스펙과 일치하는가?"
  - Stage 2: code quality reviewer — "코드 품질이 기준에 맞는가?"
  - 왜 2단계로 분리했는가 — 스펙 일치와 코드 품질은 독립적 관심사. 동시에 보면 둘 다 느슨해짐.

- [ ] **Step 6: 섹션 작성 — 보조 스킬: worktrees와 parallel agents**

using-git-worktrees: 디렉토리 선택 우선순위 (`.worktrees` → `worktrees` → CLAUDE.md → ask user)와 .gitignore 안전 검사.
dispatching-parallel-agents: 독립 도메인 식별 → 병렬 디스패치 → 통합 패턴. "2+ independent tasks" 조건.

- [ ] **Step 7: 섹션 작성 — 다음 편으로의 연결**

실행 중 테스트가 실패하면 어떻게 되는가? → TDD와 debugging 스킬이 개입하는 지점을 소개하며 4편으로 연결.

- [ ] **Step 8: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공, MDX 파싱 에러 없음

- [ ] **Step 9: 커밋**

```bash
git add content/posts/2026-04-11-superpowers-03-planning-execution.mdx
git commit -m "post: Superpowers 딥다이브 (3) - planning & execution"
```

---

## Task 4: Superpowers - TDD & debugging

**Files:**
- Create: `content/posts/2026-04-11-superpowers-04-tdd-debugging.mdx`
- Read: 다음 스킬 원문 3개
  - `test-driven-development/SKILL.md`
  - `systematic-debugging/SKILL.md`
  - `verification-before-completion/SKILL.md`

### 개요

이 편의 핵심 질문: "에이전트는 테스트 실패에 어떻게 반응하는가, 그리고 왜 '아마 고쳐졌을 것이다'라고 절대 말하지 않는가?"

TDD의 Red-Green-Refactor, 디버깅의 4-phase 조사, 완료 검증의 증거 기반 선언을 다룬다.

### 단계

- [ ] **Step 1: 3개 스킬 원문 읽기**

위 3개 SKILL.md를 모두 읽고, 각 스킬에서 다음을 식별:
  - TDD: iron law, Red-Green-Refactor 사이클, 합리화 방지 테이블
  - systematic-debugging: 4-phase, "3번 수정 실패 시 아키텍처 재검토" 규칙
  - verification-before-completion: iron law, 5단계 게이트, "should/probably" 금지

- [ ] **Step 2: MDX 파일 생성 — frontmatter + 도입부**

```yaml
---
title: "Superpowers - TDD & debugging"
description: "빨간불에서 시작하는 품질 루프 — Red-Green-Refactor, 4-phase 디버깅, 증거 기반 완료 선언의 내부 구조."
date: "2026-04-11"
published: false
tags: ["claude-code", "superpowers", "prompt-engineering"]
series: "superpowers-deep-dive"
seriesOrder: 4
---
```

도입 시나리오: 서브에이전트가 구현한 코드에서 테스트가 실패. 에이전트가 즉시 코드를 수정하지 않고, 먼저 에러를 읽고, 재현하고, 근본 원인을 추적하는 과정.

- [ ] **Step 3: 섹션 작성 — TDD iron law와 Red-Green-Refactor**

Iron law 인용: `"NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST"`
Red-Green-Refactor 사이클의 각 단계를 원문 인용하며 분석:
  - RED: 실패하는 테스트를 먼저 쓰는 이유 — "테스트가 실패하는 걸 안 봤으면, 그 테스트가 맞는지 모른다"
  - GREEN: "simplest code to pass" — 최소 구현만 하는 이유 (과잉 구현 방지)
  - REFACTOR: "after green only" — 초록불일 때만 리팩토링하는 이유 (안전망 확보 상태)

TDD 스킬의 합리화 방지 테이블에서 핵심 항목 인용.

- [ ] **Step 4: 섹션 작성 — systematic-debugging 4-phase**

4-phase 프로세스 원문 인용:
  - Phase 1: Root cause investigation — "에러를 읽어라, 추측하지 말라"
  - Phase 2: Pattern analysis — 동작하는 유사 코드와 비교
  - Phase 3: Hypothesis and testing — "단일 가설, 최소 테스트"
  - Phase 4: Implementation — 하나의 수정, 하나의 검증

"3번 수정 실패 시 아키텍처 재검토" 규칙의 설계 의도: 같은 수준에서 반복 시도하면 같은 실패를 반복한다. 3번은 "이 접근이 틀렸다"는 신호.

- [ ] **Step 5: 섹션 작성 — verification-before-completion**

Iron law 인용: `"NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE"`
5단계 게이트: Identify → Run → Read → Verify → Claim
"should", "probably", "seems to" 금지 — 주장에는 반드시 명령어 출력이라는 증거가 필요.

TDD → debugging → verification이 하나의 품질 루프를 형성하는 구조를 설명.

- [ ] **Step 6: 섹션 작성 — 다음 편으로의 연결**

모든 테스트가 통과하고 검증이 완료된 후, 코드리뷰와 브랜치 마무리 단계로 넘어가는 흐름을 소개하며 5편으로 연결.

- [ ] **Step 7: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공, MDX 파싱 에러 없음

- [ ] **Step 8: 커밋**

```bash
git add content/posts/2026-04-11-superpowers-04-tdd-debugging.mdx
git commit -m "post: Superpowers 딥다이브 (4) - TDD & debugging"
```

---

## Task 5: Superpowers - code review & finishing

**Files:**
- Create: `content/posts/2026-04-11-superpowers-05-review-finishing.mdx`
- Read: 다음 스킬 원문 3개
  - `requesting-code-review/SKILL.md`
  - `receiving-code-review/SKILL.md`
  - `finishing-a-development-branch/SKILL.md`

### 개요

이 편의 핵심 질문: "에이전트는 코드리뷰를 어떻게 요청하고, 피드백을 어떻게 수용(또는 거부)하며, 브랜치를 어떻게 마무리하는가?"

코드리뷰 사이클과 브랜치 완료를 다루고, 시리즈 전체를 순환 구조로 마무리한다.

### 단계

- [ ] **Step 1: 3개 스킬 원문 읽기**

위 3개 SKILL.md를 모두 읽고, 각 스킬에서 다음을 식별:
  - requesting-code-review: code-reviewer 서브에이전트 디스패치 템플릿, 피드백 분류 (critical/important/minor)
  - receiving-code-review: 6단계 응답 패턴, "performative agreement 금지", YAGNI checking
  - finishing-a-development-branch: 4가지 선택지, worktree 정리 규칙

- [ ] **Step 2: MDX 파일 생성 — frontmatter + 도입부**

```yaml
---
title: "Superpowers - code review & finishing"
description: "코드리뷰 요청, 피드백 수용과 거부, 브랜치 마무리까지 — 개발 사이클의 마지막 구간을 해부한다."
date: "2026-04-11"
published: false
tags: ["claude-code", "superpowers", "prompt-engineering"]
series: "superpowers-deep-dive"
seriesOrder: 5
---
```

도입 시나리오: 구현과 테스트가 모두 완료된 후, 에이전트가 코드리뷰를 요청하고, 리뷰어의 피드백을 받고, 최종적으로 브랜치를 처리하는 과정.

- [ ] **Step 3: 섹션 작성 — requesting-code-review 템플릿**

코드리뷰 요청 시 서브에이전트에게 넘기는 컨텍스트 템플릿 인용.
피드백 분류 체계: critical (즉시 수정) / important (진행 전 수정) / minor (나중에) / pushback (잘못된 피드백은 거부)
왜 정밀한 컨텍스트가 필요한가 — 리뷰어에게 충분한 맥락이 없으면 표면적 피드백만 나옴.

- [ ] **Step 4: 섹션 작성 — receiving-code-review의 performative agreement 금지**

6단계 응답 패턴 인용:
1. 피드백을 끝까지 읽기 (반응하지 않고)
2. 자기 말로 재진술하여 이해 확인
3. 코드베이스 현실과 대조 검증
4. 이 코드베이스에 맞는지 평가
5. 기술적 근거로 동의 또는 반박
6. 하나씩 구현하고 각각 테스트

"performative agreement 금지"의 핵심: 리뷰 피드백에 무조건 "네 맞습니다 고치겠습니다"는 금지. 기술적으로 검증 안 된 피드백은 거부해야 한다. 이는 LLM의 sycophancy 경향을 직접적으로 차단하는 설계.

- [ ] **Step 5: 섹션 작성 — finishing-a-development-branch 4가지 경로**

4가지 선택지 인용: merge locally / push & create PR / keep as-is / discard
각 선택지별 worktree 정리 규칙.
"테스트 통과 없이 진행 금지" 전제조건.

- [ ] **Step 6: 섹션 작성 — 시리즈 회고: 전체 순환 구조**

using-superpowers → brainstorming → writing-plans → execution → TDD/debugging → verification → code review → finishing → (새 작업) → using-superpowers...

이 순환이 superpowers의 설계 철학 전체를 관통하는 핵심: 각 스킬이 독립적이면서도, 정해진 전이 규칙으로 연결되어 하나의 개발 사이클을 형성한다.

- [ ] **Step 7: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공, MDX 파싱 에러 없음

- [ ] **Step 8: 커밋**

```bash
git add content/posts/2026-04-11-superpowers-05-review-finishing.mdx
git commit -m "post: Superpowers 딥다이브 (5) - code review & finishing"
```
