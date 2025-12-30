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
