import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    topic: z.enum(['artificial-intelligence', 'environment', 'progress', 'craft']),
    draft: z.boolean().default(false),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: 'about.mdx', base: './src/content' }),
})

export const collections = { posts, about }
