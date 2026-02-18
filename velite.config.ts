import { defineConfig, defineCollection, s } from "velite";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
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
    remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]],
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
