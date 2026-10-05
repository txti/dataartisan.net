import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import netlify from '@astrojs/netlify'
import keystatic from '@keystatic/astro'

export default defineConfig({
  site: 'https://dataartisan.net',
  adapter: netlify(),
  integrations: [react(), mdx(), sitemap(), keystatic()],
})
