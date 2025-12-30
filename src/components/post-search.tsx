"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Search } from "lucide-react";
import { formatDate, formatSeriesName } from "@/lib/utils";

interface PostSummary {
  slugAsParams: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
}

interface PostSearchProps {
  posts: PostSummary[];
}

const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}`;

export function PostSearch({ posts }: PostSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const haystack = `${post.title} ${post.description} ${post.tags.join(" ")}`
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, posts]);

  const emptyMessage = normalizedQuery
    ? "검색 결과가 없습니다."
    : "아직 작성된 글이 없습니다.";

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Posts</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="제목, 설명, 태그로 검색"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded border border-border bg-background px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Search posts"
          />
        </div>
        {normalizedQuery && (
          <p className="mt-2 text-sm text-muted-foreground">
            &quot;{query}&quot; 검색 결과 {filteredPosts.length}개
          </p>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <ul className="space-y-8">
          {filteredPosts.map((post) => (
            <li key={post.slugAsParams}>
              <article className="group">
                <Link href={`/posts/${post.slugAsParams}`}>
                  <h3 className="text-lg font-medium group-hover:underline mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                  {post.series && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                      {formatSeriesName(post.series)}
                      {post.seriesOrder && ` #${post.seriesOrder}`}
                    </span>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={tagHref(tag)}
                          className="bg-muted px-2 py-0.5 rounded text-xs hover:opacity-80"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
