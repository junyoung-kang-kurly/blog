import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const searchablePosts = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.id,
    tags: post.data.tags,
  }));

  return new Response(JSON.stringify(searchablePosts), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
