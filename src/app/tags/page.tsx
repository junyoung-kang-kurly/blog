import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "#site/content";
import { getTagCounts } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tags",
};

export default function TagsPage() {
  const publishedPosts = posts.filter((post) => post.published);
  const tagCounts = getTagCounts(publishedPosts);
  const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}`;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tags</h1>
        <p className="text-muted-foreground">
          전체 태그 목록입니다.
        </p>
      </header>

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
    </div>
  );
}
