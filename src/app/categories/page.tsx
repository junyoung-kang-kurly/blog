import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/content";
import { categoryHref } from "@/lib/categories";
import { getCategoryCounts } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  const publishedPosts = posts.filter((post) => post.published);
  const categoryCounts = getCategoryCounts(publishedPosts);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground">전체 카테고리 목록입니다.</p>
      </header>

      <ul className="divide-y divide-border border-y border-border">
        {categoryCounts.map(({ slug, label, count }) => (
          <li key={slug}>
            <Link
              href={categoryHref(slug)}
              className="flex items-center justify-between py-3 hover:opacity-80"
            >
              <span>{label}</span>
              <span className="text-sm text-muted-foreground">{count}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted-foreground">
        세부 키워드로 찾으려면{" "}
        <Link href="/tags" className="underline hover:text-foreground">
          전체 태그
        </Link>
        를 확인하세요.
      </p>
    </div>
  );
}
