# 에이전트 eval 함수 해부 글 짚어보기 — 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Anthropic "Demystifying Evals for AI Agents" 원문을 5편 시리즈 블로그 포스트로 작성

**Architecture:** 각 편은 독립적인 MDX 파일로, 동일한 series/tags 메타데이터를 공유. 원문의 섹션 순서를 따라가며 한국어 해설 + 개발자 관점 해석을 덧붙이는 구조.

**Tech Stack:** MDX, Velite, Next.js

---

## 공통 규칙

- frontmatter: `date: "2026-04-14"`, `published: true`, `series: "demystifying-evals"`, `tags: ["AI", "agents", "evaluation", "Anthropic"]`
- 파일 위치: `content/posts/`
- MDX 주의사항: `<` 뒤에 문자가 오면 JSX 해석됨. `<T>` → `\<T\>` 또는 `` `<T>` `` 사용
- 원문 인용 시 코드 블록으로 감싸서 구분
- 원문 링크: 각 편 도입부에 원문 URL 명시
- 톤: 기존 superpowers-deep-dive 시리즈와 동일한 해설체 (도입 시나리오 → 원문 인용 → 해석)

---

### Task 1: 1편 — eval의 구조와 용어 사전

**Files:**
- Create: `content/posts/2026-04-14-demystifying-evals-01-structure.mdx`

- [ ] **Step 1: MDX 파일 작성**

frontmatter:
```yaml
---
title: "에이전트 eval 함수 해부 글 짚어보기 (1) — eval의 구조와 용어 사전"
description: "AI 에이전트 평가의 기본 구조와 핵심 용어(task, trial, grader, transcript, outcome 등)를 원문을 따라 정리한다."
date: "2026-04-14"
published: true
tags: ["AI", "agents", "evaluation", "Anthropic"]
series: "demystifying-evals"
seriesOrder: 1
---
```

본문 구성:
1. **도입**: 원문 소개 및 시리즈 안내. 왜 에이전트 eval이 어려운가 — 자율성, 도구 사용, 상태 변경
2. **single-turn → multi-turn → agent eval**: 진화 과정 설명. 원문의 다이어그램 해설 (simple eval vs complex multi-turn eval)
3. **용어 사전**: task, trial, grader, transcript, outcome, evaluation harness, agent harness, evaluation suite — 각 용어를 원문 정의 인용 후 한국어 해석. Opus 4.5의 τ2-bench 일화(항공편 예약 허점 발견) 포함
4. **eval 구성요소 다이어그램 해설**: 원문의 두 번째 다이어그램 설명
5. **마무리**: 이 용어들이 이후 편에서 어떻게 쓰이는지 예고

- [ ] **Step 2: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공, MDX 파싱 오류 없음

- [ ] **Step 3: 커밋**

```bash
git add content/posts/2026-04-14-demystifying-evals-01-structure.mdx
git commit -m "post: 에이전트 eval 함수 해부 글 짚어보기 (1) — eval의 구조와 용어 사전"
```

---

### Task 2: 2편 — 왜 eval을 만들어야 하는가

**Files:**
- Create: `content/posts/2026-04-14-demystifying-evals-02-why.mdx`

- [ ] **Step 1: MDX 파일 작성**

frontmatter:
```yaml
---
title: "에이전트 eval 함수 해부 글 짚어보기 (2) — 왜 eval을 만들어야 하는가"
description: "수동 테스트의 한계부터 eval-driven development까지, eval이 에이전트 개발에 가져다주는 가치를 원문을 따라 해설한다."
date: "2026-04-14"
published: true
tags: ["AI", "agents", "evaluation", "Anthropic"]
series: "demystifying-evals"
seriesOrder: 2
---
```

본문 구성:
1. **도입**: "수동 테스트로 충분하지 않나?" — 프로토타이핑 단계에서는 manual testing + dogfooding으로 충분하지만, 프로덕션 스케일링 시 breaking point
2. **flying blind 문제**: 사용자 불만 → 재현 → 수정 → 다른 곳 회귀의 reactive loop
3. **Claude Code 사례**: 처음엔 빠른 이터레이션, 이후 concision/file edits/over-engineering에 대한 eval 추가
4. **Descript 사례**: 3가지 차원(don't break things / do what I asked / do it well), manual → LLM grader 진화
5. **Bolt 사례**: 이미 널리 쓰이는 에이전트에 3개월 만에 eval 시스템 구축 (static analysis + browser agents + LLM judges)
6. **eval의 시간축별 가치**: 초기(요구사항 명확화, 해석 차이 해소), 중기(회귀 방지, baseline 추적), 후기(모델 업그레이드 속도, 프로덕트-리서치 소통 채널)
7. **eval-driven development**: eval을 먼저 만들고 에이전트를 개선하는 접근법
8. **마무리**: eval의 복리 효과 — 비용은 선불, 가치는 후불

- [ ] **Step 2: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add content/posts/2026-04-14-demystifying-evals-02-why.mdx
git commit -m "post: 에이전트 eval 함수 해부 글 짚어보기 (2) — 왜 eval을 만들어야 하는가"
```

---

### Task 3: 3편 — grader 설계와 에이전트 유형별 전략

**Files:**
- Create: `content/posts/2026-04-14-demystifying-evals-03-graders-and-types.mdx`

- [ ] **Step 1: MDX 파일 작성**

frontmatter:
```yaml
---
title: "에이전트 eval 함수 해부 글 짚어보기 (3) — grader 설계와 에이전트 유형별 전략"
description: "code-based, model-based, human 세 가지 grader 유형과 코딩/대화형/리서치/컴퓨터 사용 에이전트별 eval 전략을 원문을 따라 해설한다."
date: "2026-04-14"
published: true
tags: ["AI", "agents", "evaluation", "Anthropic"]
series: "demystifying-evals"
seriesOrder: 3
---
```

본문 구성:
1. **도입**: eval을 만들기로 했다면 다음 질문은 "어떻게 채점하는가"
2. **3종 grader 비교**: code-based / model-based / human — 원문 테이블 각 행 해설 (Methods, Strengths, Weaknesses)
3. **scoring 방식**: weighted, binary, hybrid
4. **capability eval vs regression eval**: 각각의 목적, pass rate 기대치, "졸업" 개념 (capability → regression으로 승격)
5. **코딩 에이전트 eval**: SWE-bench Verified(GitHub issue → test suite), Terminal-Bench(end-to-end 기술 태스크), 원문 YAML 예시(fix-auth-bypass) 필드별 해설 — deterministic_tests, llm_rubric, static_analysis, state_check, tool_calls, tracked_metrics
6. **대화형 에이전트 eval**: 다차원 성공 기준(ticket resolved + turns constraint + tone), τ-Bench/τ2-Bench, 원문 YAML 예시(support refund) 필드별 해설
7. **리서치 에이전트 eval**: groundedness/coverage/source quality 체크, BrowseComp, LLM rubric calibration
8. **컴퓨터 사용 에이전트 eval**: WebArena(browser tasks), OSWorld(full OS), DOM vs screenshot 트레이드오프, Claude for Chrome eval 사례
9. **마무리**: 유형별로 다르지만 공통 패턴 — 결과를 채점하되, 경로는 열어두라

- [ ] **Step 2: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add content/posts/2026-04-14-demystifying-evals-03-graders-and-types.mdx
git commit -m "post: 에이전트 eval 함수 해부 글 짚어보기 (3) — grader 설계와 에이전트 유형별 전략"
```

---

### Task 4: 4편 — 비결정성 처리

**Files:**
- Create: `content/posts/2026-04-14-demystifying-evals-04-nondeterminism.mdx`

- [ ] **Step 1: MDX 파일 작성**

frontmatter:
```yaml
---
title: "에이전트 eval 함수 해부 글 짚어보기 (4) — 비결정성 처리"
description: "에이전트 eval 결과가 매번 다른 이유와 이를 다루는 두 가지 핵심 메트릭 pass@k, pass^k를 원문을 따라 해설한다."
date: "2026-04-14"
published: true
tags: ["AI", "agents", "evaluation", "Anthropic"]
series: "demystifying-evals"
seriesOrder: 4
---
```

본문 구성:
1. **도입**: 같은 태스크, 같은 에이전트인데 결과가 다르다 — 에이전트 eval의 고유한 어려움
2. **왜 결과가 매번 다른가**: 모델 output의 확률적 특성, 도구 호출 순서 분기, 환경 상태 차이
3. **pass@k 해설**: k번 시도 중 최소 1번 성공 확률. 수식적 의미와 직관. k가 커질수록 100%에 수렴. "한 번만 맞으면 되는" 시나리오 — 코딩(첫 시도 pass@1에 관심), 여러 후보 중 하나만 되면 되는 경우
4. **pass^k 해설**: k번 모두 성공 확률. (성공률)^k. 75% per-trial → 3 trials → (0.75)³ ≈ 42%. k가 커질수록 0%에 수렴. "매번 맞아야 하는" 시나리오 — 고객 대면 에이전트
5. **두 메트릭의 발산 그래프 해설**: k=1에서 동일 → k=10에서 반대 이야기 (pass@k → 100%, pass^k → 0%)
6. **선택 기준**: 제품 요구사항에 따라 결정. pass@k는 한 번의 성공이 중요한 도구, pass^k는 일관성이 필수인 에이전트
7. **마무리**: 비결정성은 제거 대상이 아니라 측정 대상

- [ ] **Step 2: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add content/posts/2026-04-14-demystifying-evals-04-nondeterminism.mdx
git commit -m "post: 에이전트 eval 함수 해부 글 짚어보기 (4) — 비결정성 처리"
```

---

### Task 5: 5편 — 0→1 로드맵과 운영

**Files:**
- Create: `content/posts/2026-04-14-demystifying-evals-05-roadmap.mdx`

- [ ] **Step 1: MDX 파일 작성**

frontmatter:
```yaml
---
title: "에이전트 eval 함수 해부 글 짚어보기 (5) — 0→1 로드맵과 운영"
description: "eval이 없는 상태에서 신뢰할 수 있는 eval 시스템을 구축하기까지의 8단계 로드맵과 Swiss Cheese Model을 원문을 따라 해설한다."
date: "2026-04-14"
published: true
tags: ["AI", "agents", "evaluation", "Anthropic"]
series: "demystifying-evals"
seriesOrder: 5
---
```

본문 구성:
1. **도입**: 1~4편에서 eval의 구조, 이유, 도구, 측정법을 다뤘다. 이 편은 "그래서 어떻게 시작하나"
2. **Step 0 — 일찍 시작하라**: 20~50개 태스크로 충분. 초기에는 effect size가 크므로 작은 sample size로도 유의미. 늦을수록 역설계 비용 증가
3. **Step 1 — 수동 테스트를 전환하라**: 릴리스 전 체크리스트, 사용자 버그 리포트를 테스트 케이스로. 실제 사용 패턴 반영
4. **Step 2 — 모호하지 않은 태스크 작성**: 두 도메인 전문가가 독립적으로 같은 판정을 내릴 수 있어야. Terminal-Bench 감사 사례(filepath 미지정 → 불공정 실패). 0% pass@100은 보통 태스크 문제. reference solution 권장
5. **Step 3 — 균형 잡힌 문제 세트**: should occur / shouldn't occur 양방향 테스트. Claude.ai 웹 검색 eval 사례(undertriggering vs overtriggering)
6. **Step 4 — 안정적인 eval harness**: 프로덕션과 동일한 환경. trial 간 격리(leftover files, cached data). git history 이용한 치팅 사례
7. **Step 5 — grader 설계**: 결과를 채점하되 경로는 열어둠. 부분 점수. LLM judge calibration. CORE-Bench 사례(42% → 95%), METR 사례(threshold 해석 오류). 치팅 방지
8. **Step 6 — transcript 읽기**: grader가 잘 작동하는지 확인하는 유일한 방법. 실패가 "공정한지" 확인
9. **Step 7 — saturation 모니터링**: 100%는 개선 여지 없음. SWE-bench 포화(30% → 80%+). Qodo 사례(one-shot → agentic eval 전환)
10. **Step 8 — 장기 유지보수**: 전담 eval 팀 + 도메인 전문가 기여. PM/CSM/영업도 eval task 기여 가능. eval-driven development
11. **Swiss Cheese Model**: eval만으로 모든 이슈를 잡을 수 없다. 원문 비교 테이블 해설 (automated evals, production monitoring, A/B testing, user feedback, manual transcript review, systematic human studies). 각 방법의 적용 시점
12. **마무리**: 시리즈 전체 요약. "Start early, read transcripts, iterate continuously"

- [ ] **Step 2: 빌드 검증**

Run: `pnpm build`
Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add content/posts/2026-04-14-demystifying-evals-05-roadmap.mdx
git commit -m "post: 에이전트 eval 함수 해부 글 짚어보기 (5) — 0→1 로드맵과 운영"
```

---

### Task 6: 전체 빌드 검증 및 최종 커밋

- [ ] **Step 1: 전체 빌드**

Run: `pnpm build`
Expected: 5편 모두 포함, 빌드 성공

- [ ] **Step 2: 시리즈 순서 확인**

seriesOrder 1~5가 올바르게 설정되어 있는지 확인

- [ ] **Step 3: 누락 검증**

frontmatter 필수 필드(title, description, date, published, tags, series, seriesOrder) 모두 존재하는지 확인
