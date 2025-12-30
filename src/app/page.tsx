import Link from "next/link";
import { posts } from "#site/content";
import { getTagCounts, sortPostsByDate } from "@/lib/utils";
import { PostSearch } from "@/components/post-search";

export default function Home() {
  const publishedPosts = sortPostsByDate(
    posts.filter((post) => post.published)
  );
  const tagCounts = getTagCounts(publishedPosts);
  const postsForSearch = publishedPosts.map((post) => ({
    slugAsParams: post.slugAsParams,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    series: post.series,
    seriesOrder: post.seriesOrder,
  }));
  const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}`;

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Bonjgi의 Tech Blog</h1>
        <p className="text-muted-foreground">
          기술과 경험을 공유합니다.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        {tagCounts.length === 0 ? (
          <p className="text-muted-foreground">등록된 태그가 없습니다.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {tagCounts.map(({ tag, count }) => (
              <li key={tag}>
                <Link
                  href={tagHref(tag)}
                  className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs hover:opacity-80"
                >
                  <span>{tag}</span>
                  <span className="text-muted-foreground">({count})</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <PostSearch posts={postsForSearch} />
    </div>
  );
}
