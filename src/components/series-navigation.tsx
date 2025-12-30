import Link from "next/link";
import { SeriesInfo, formatSeriesName } from "@/lib/utils";

interface SeriesNavigationProps {
  seriesInfo: SeriesInfo;
}

export function SeriesNavigation({ seriesInfo }: SeriesNavigationProps) {
  const { name, posts, currentIndex, totalCount, prevPost, nextPost } =
    seriesInfo;

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-8 bg-gray-50">
      {/* 시리즈 헤더 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium">{formatSeriesName(name)}</span>
        <span className="text-xs text-gray-500">
          ({currentIndex + 1} / {totalCount})
        </span>
      </div>

      {/* 시리즈 목차 */}
      <ol className="list-decimal list-inside space-y-1 mb-4 text-sm">
        {posts.map((post, index) => (
          <li
            key={post.slugAsParams}
            className={
              index === currentIndex
                ? "font-medium text-gray-900"
                : "text-gray-500"
            }
          >
            {index === currentIndex ? (
              <span>{post.title}</span>
            ) : (
              <Link
                href={`/posts/${post.slugAsParams}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* 이전/다음 네비게이션 */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        {prevPost ? (
          <Link
            href={`/posts/${prevPost.slugAsParams}`}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
          >
            <span>←</span>
            <span className="truncate max-w-[150px]">{prevPost.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/posts/${nextPost.slugAsParams}`}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
          >
            <span className="truncate max-w-[150px]">{nextPost.title}</span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
