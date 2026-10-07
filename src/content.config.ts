import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const link = z.object({ label: z.string(), url: z.string() })

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    topic: z.enum(['artificial-intelligence', 'environment', 'progress', 'craft']),
    draft: z.boolean().default(false),
    cover: z.string().nullish(),
    coverAlt: z.string().nullish(),
    sources: z.array(link).default([]),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: 'about.mdx', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    portrait: z.string().nullish(),
    links: z.array(link).default([]),
  }),
})

export const collections = { posts, about }
