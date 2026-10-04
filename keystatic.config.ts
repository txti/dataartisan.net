import { config, collection, fields, singleton } from '@keystatic/core'

// Local files in dev; GitHub commits in production (Netlify rebuilds on push).
const storage = import.meta.env.DEV
  ? ({ kind: 'local' } as const)
  : ({ kind: 'github', repo: { owner: 'txti', name: 'dataartisan.net' } } as const)

export default config({
  storage,
  ui: { brand: { name: 'Data Artisan' } },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
        date: fields.date({ label: 'Published', validation: { isRequired: true } }),
        topic: fields.select({
          label: 'Topic',
          defaultValue: 'artificial-intelligence',
          options: [
            { label: 'Artificial intelligence', value: 'artificial-intelligence' },
            { label: 'Environment', value: 'environment' },
            { label: 'Progress', value: 'progress' },
            { label: 'Craft & failure', value: 'craft' },
          ],
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.mdx({
          label: 'Content',
          options: { image: { directory: 'public/images/posts', publicPath: '/images/posts/' } },
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: 'About',
      path: 'src/content/about',
      format: { contentField: 'content' },
      schema: {
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
})
