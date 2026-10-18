import { defineConfig, defineCollection, s } from "velite";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkCjkFriendly from "remark-cjk-friendly";
import remarkMath from "remark-math";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
      series: s.string().optional(),
      seriesOrder: s.number().optional(),
      slug: s.path(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.replace(/^posts\//, ""),
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [
      [remarkMath, { singleDollarTextMath: false }],
      // 문단 안 줄바꿈을 <br>로 렌더링한다 (velog 시절부터 한 줄 = 한 문장으로 써 왔다)
      remarkBreaks,
      // `**거리(distance)**가`처럼 닫는 ** 앞이 문장부호이고 뒤가 한글이면 CommonMark가 강조를 인식하지 못한다
      remarkCjkFriendly,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: "github-light",
          keepBackground: false,
        },
      ],
    ],
  },
});
