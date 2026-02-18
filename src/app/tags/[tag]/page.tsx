import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/lib/content";
import { formatDate, getTagCounts, sortPostsByDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { Calendar, ArrowLeft } from "lucide-react";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}`;

export async function generateStaticParams() {
  const publishedPosts = posts.filter((post) => post.published);
  const tagCounts = getTagCounts(publishedPosts);

  return tagCounts.map(({ tag }) => ({
    tag,
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagUrl = `${siteConfig.url}/tags/${encodeURIComponent(tag)}`;
  const description = `${tag} 태그가 포함된 글 목록입니다.`;

  return {
    title: `Tag: ${tag}`,
    description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: tagUrl,
      title: `Tag: ${tag}`,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title: `Tag: ${tag}`,
      description,
    },
    alternates: {
      canonical: tagUrl,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const filteredPosts = sortPostsByDate(
    posts.filter((post) => post.published && post.tags.includes(tag))
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/tags"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to tags
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tag: {tag}</h1>
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                  {post.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      {post.tags.map((postTag) => (
                        <Link
                          key={postTag}
                          href={tagHref(postTag)}
                          className="bg-muted px-2 py-0.5 rounded text-xs hover:opacity-80"
                        >
                          {postTag}
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
