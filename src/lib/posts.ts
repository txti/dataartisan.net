import { getCollection } from 'astro:content'

// Drafts show in `npm run dev` so you can preview them; they are excluded from production builds.
export async function getPosts() {
  const posts = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft)
  return posts.sort((a, b) => +b.data.date - +a.data.date)
}

export const topicLabel = (t: string) => t.replace(/-/g, ' ')
