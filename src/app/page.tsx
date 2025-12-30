import Link from "next/link";
import { posts } from "#site/content";
import { formatDate, sortPostsByDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

export default function Home() {
  const publishedPosts = sortPostsByDate(
    posts.filter((post) => post.published)
  );

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Frontend Tech Blog</h1>
        <p className="text-muted-foreground">
          프론트엔드 개발에 관한 기술과 경험을 공유합니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Recent Posts</h2>
        {publishedPosts.length === 0 ? (
          <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
        ) : (
          <ul className="space-y-8">
            {publishedPosts.map((post) => (
              <li key={post.slug}>
                <article className="group">
                  <Link href={`/posts/${post.slugAsParams}`}>
                    <h3 className="text-lg font-medium group-hover:underline mb-2">
                      {post.title}
                    </h3>
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
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-muted px-2 py-0.5 rounded text-xs"
                          >
                            {tag}
                          </span>
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
    </div>
  );
}
