import Link from "next/link";
import { posts } from "@/lib/content";
import { getCategoryCounts, sortPostsByDate } from "@/lib/utils";
import { categoryHref } from "@/lib/categories";
import { PostSearch } from "@/components/post-search";

export default function Home() {
  const publishedPosts = sortPostsByDate(
    posts.filter((post) => post.published)
  );
  const categoryCounts = getCategoryCounts(publishedPosts);
  const postsForSearch = publishedPosts.map((post) => ({
    slugAsParams: post.slugAsParams,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    tags: post.tags,
    series: post.series,
    seriesOrder: post.seriesOrder,
  }));

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Bonjugi의 Tech Blog</h1>
        <p className="text-muted-foreground">
          기술과 경험을 공유합니다.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link
            href="/tags"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            전체 태그 보기 →
          </Link>
        </div>
        <ul className="flex flex-wrap gap-2">
          {categoryCounts.map(({ slug, label, count }) => (
            <li key={slug}>
              <Link
                href={categoryHref(slug)}
                className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-sm hover:bg-muted"
              >
                <span>{label}</span>
                <span className="text-muted-foreground">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <PostSearch posts={postsForSearch} />
    </div>
  );
}
