import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { MDXContent } from "@/components/mdx-content";
import { SeriesNavigation } from "@/components/series-navigation";
import { TableOfContents } from "@/components/post-toc";
import { formatDate, getSeriesInfo } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}`;

function getPostBySlug(slug: string) {
  return posts.find((post) => post.slugAsParams === slug);
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${siteConfig.url}/posts/${post.slugAsParams}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: postUrl,
      title: post.title,
      description: post.description,
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // 시리즈 정보 조회
  const seriesInfo = getSeriesInfo(
    slug,
    posts.map((p) => ({
      slugAsParams: p.slugAsParams,
      title: p.title,
      series: p.series,
      seriesOrder: p.seriesOrder,
    }))
  );

  // JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    url: `${siteConfig.url}/posts/${post.slugAsParams}`,
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/posts/${post.slugAsParams}`,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to posts
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground mb-4">{post.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </span>
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
      </header>

      {/* 시리즈 네비게이션 */}
      {seriesInfo && <SeriesNavigation seriesInfo={seriesInfo} />}

      <hr className="mb-8" />

      <div className="relative">
        <aside className="hidden xl:block absolute inset-y-0 left-full ml-8 w-56">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <TableOfContents title={siteConfig.tocLabel} />
          </div>
        </aside>

        <div id="post-content" className="prose">
          <MDXContent code={post.body} />
        </div>
      </div>
    </article>
  );
}
