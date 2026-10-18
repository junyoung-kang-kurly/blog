// 카테고리는 글마다 정확히 하나. 홈과 내비게이션의 1차 분류라 10개 이하로 유지한다.
// velite.config.ts가 slug 목록을 enum으로 써서, 여기 없는 값을 쓰면 빌드가 실패한다.
export const categories = [
  { slug: "ai", label: "AI·에이전트" },
  { slug: "java-spring", label: "Java·Spring" },
  { slug: "architecture", label: "아키텍처·설계" },
  { slug: "messaging", label: "메시징·이벤트" },
  { slug: "database", label: "데이터베이스" },
  { slug: "testing", label: "테스트" },
  { slug: "infra", label: "인프라·클라우드" },
  { slug: "dev-tools", label: "개발 도구·환경" },
  { slug: "math-cs", label: "수학·CS" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const categorySlugs = categories.map((c) => c.slug) as [
  CategorySlug,
  ...CategorySlug[],
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export const categoryHref = (slug: string) => `/categories/${slug}`;
