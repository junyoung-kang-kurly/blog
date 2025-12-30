export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function sortPostsByDate<T extends { date: string }>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export interface TagCount {
  tag: string;
  count: number;
}

export function getTagCounts(
  posts: Array<{ tags: string[] }>
): TagCount[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of new Set(post.tags)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

// 시리즈 관련 타입
export interface SeriesPost {
  slugAsParams: string;
  title: string;
  series?: string;
  seriesOrder?: number;
}

export interface SeriesInfo {
  name: string;
  posts: SeriesPost[];
  currentIndex: number;
  totalCount: number;
  prevPost: SeriesPost | null;
  nextPost: SeriesPost | null;
}

/**
 * 특정 포스트가 속한 시리즈의 정보를 반환
 */
export function getSeriesInfo(
  currentSlug: string,
  allPosts: SeriesPost[]
): SeriesInfo | null {
  const currentPost = allPosts.find((p) => p.slugAsParams === currentSlug);

  if (!currentPost?.series) {
    return null;
  }

  const seriesPosts = allPosts
    .filter((p) => p.series === currentPost.series)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));

  const currentIndex = seriesPosts.findIndex(
    (p) => p.slugAsParams === currentSlug
  );

  return {
    name: currentPost.series,
    posts: seriesPosts,
    currentIndex,
    totalCount: seriesPosts.length,
    prevPost: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    nextPost:
      currentIndex < seriesPosts.length - 1
        ? seriesPosts[currentIndex + 1]
        : null,
  };
}

/**
 * 시리즈 이름을 사람이 읽기 좋은 형태로 변환
 * 예: "claude-code-sub-agents" -> "Claude Code Sub Agents"
 */
export function formatSeriesName(seriesSlug: string): string {
  return seriesSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
