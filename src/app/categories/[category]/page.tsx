import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/lib/content";
import { categories, getCategory } from "@/lib/categories";
import { formatDate, sortPostsByDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { Calendar, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}`;

export async function generateStaticParams() {
  return categories.map(({ slug }) => ({
    category: slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const label = getCategory(category)?.label ?? category;
  const categoryUrl = `${siteConfig.url}/categories/${category}`;
  const description = `${label} 카테고리의 글 목록입니다.`;

  return {
    title: `Category: ${label}`,
    description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: categoryUrl,
      title: `Category: ${label}`,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title: `Category: ${label}`,
      description,
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = getCategory(category);
  const filteredPosts = sortPostsByDate(
    posts.filter((post) => post.published && post.category === category)
  );

  if (!categoryInfo || filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to categories
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryInfo.label}</h1>
        <p className="text-muted-foreground">
          {filteredPosts.length}개의 글이 있습니다.
        </p>
      </header>

      <section>
        <ul className="space-y-8">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <article className="group">
                <Link href={`/posts/${post.slugAsParams}`}>
                  <h2 className="text-lg font-medium group-hover:underline mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                  {post.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
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
      </section>
    </div>
  );
}
