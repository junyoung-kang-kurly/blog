# 에이전트 eval 함수 해부 글 짚어보기 — 시리즈 설계서

## 개요

Anthropic 엔지니어링 블로그 "[Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)" 원문을 5편 시리즈로 해설하는 블로그 포스트.

## 방향성

- **원문 해설 + 실무 해석**: 원문의 구조를 따라가되, 용어를 한국어로 풀어 설명하고 개발자 관점의 해석을 덧붙임
- **타겟 독자**: AI 에이전트를 직접 만들고 있는 개발자
- **예시 전략**: 원문의 YAML 예시를 가져와서 각 필드를 한국어로 해설
- **부록(eval 프레임워크 목록)은 시리즈에서 제외**

## 메타 정보

- **series**: `demystifying-evals`
- **tags**: `["AI", "agents", "evaluation", "Anthropic"]`
- **date**: `2026-04-14`
- **published**: `true`

## 시리즈 구성

### 1편 — eval의 구조와 용어 사전

**파일**: `2026-04-14-demystifying-evals-01-structure.mdx`
**원문 섹션**: Introduction + The structure of an evaluation

- 들어가며: 왜 AI 에이전트를 평가하기 어려운가 (자율성, 도구 사용, 상태 변경)
- single-turn eval → multi-turn eval → agent eval 진화 과정
- 핵심 용어 정의: task, trial, grader, transcript, outcome, evaluation harness, agent harness, evaluation suite
- 원문의 다이어그램(eval 구성요소) 해설
- 마무리: 이 용어들이 이후 편에서 어떻게 쓰이는지 예고

### 2편 — 왜 eval을 만들어야 하는가

**파일**: `2026-04-14-demystifying-evals-02-why.mdx`
**원문 섹션**: Why build evaluations?

- "수동 테스트로 충분하지 않나?" — 프로토타이핑에서 프로덕션으로 전환할 때 겪는 breaking point
- Claude Code의 eval 도입 사례 (concision, file edits, over-engineering)
- Descript, Bolt 사례 해설
- eval의 시간축별 가치: 초기(요구사항 명확화), 중기(회귀 방지), 후기(모델 업그레이드 속도)
- eval-driven development 소개

### 3편 — grader 설계와 에이전트 유형별 전략

**파일**: `2026-04-14-demystifying-evals-03-graders-and-types.mdx`
**원문 섹션**: Types of graders + Capability vs. regression evals + Evaluating coding/conversational/research/computer use agents

- 3종 grader 비교: code-based / model-based / human (원문 테이블 해설)
- capability eval vs regression eval, "졸업" 개념
- 에이전트 유형별 eval 전략:
  - 코딩 에이전트: SWE-bench, Terminal-Bench, 원문 YAML 예시(auth bypass) 해설
  - 대화형 에이전트: 다차원 평가, τ-Bench, 원문 YAML 예시(refund) 해설
  - 리서치 에이전트: groundedness/coverage/source quality, BrowseComp
  - 컴퓨터 사용 에이전트: WebArena, OSWorld, DOM vs screenshot 트레이드오프

### 4편 — 비결정성 처리

**파일**: `2026-04-14-demystifying-evals-04-nondeterminism.mdx`
**원문 섹션**: How to think about non-determinism in evaluations for agents

- 에이전트 결과가 매번 다른 이유
- pass@k: k번 중 1번이라도 성공할 확률. "한 번만 맞으면 되는" 시나리오
- pass^k: k번 모두 성공할 확률. "매번 맞아야 하는" 시나리오
- 두 메트릭이 k가 커질수록 반대로 발산하는 그래프 해설
- 어떤 제품에 어떤 메트릭이 맞는가 — 선택 기준

### 5편 — 0→1 로드맵과 운영

**파일**: `2026-04-14-demystifying-evals-05-roadmap.mdx`
**원문 섹션**: Going from zero to one + How evals fit with other methods

- Step 0~2: 태스크 수집 (일찍 시작, 수동 테스트 전환, 모호하지 않은 태스크 작성)
- Step 3: 균형 잡힌 문제 세트 (검색해야 할 때 / 하지 말아야 할 때 양방향 테스트)
- Step 4~5: eval harness와 grader 설계 (환경 격리, 부분 점수, LLM judge 보정)
- Step 6~8: 장기 운영 (transcript 읽기, saturation 모니터링, 유지보수)
- Swiss Cheese Model: eval 단독으로는 부족하다. production monitoring, A/B test, user feedback 등과의 조합
- 원문의 방법론 비교 테이블 해설
