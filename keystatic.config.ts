import { config, collection, fields, singleton } from '@keystatic/core'
import { wrapper } from '@keystatic/core/content-components'

// Local files in dev; GitHub commits in production (Netlify rebuilds on push).
const storage = import.meta.env.DEV
  ? ({ kind: 'local' } as const)
  : ({ kind: 'github', repo: { owner: 'txti', name: 'dataartisan.net' } } as const)

// Components an author can insert in a post body. Each maps to a component in
// src/pages/blog/[...slug].astro (the `components` prop on <Content />).
const components = {
  Viz: wrapper({
    label: 'Figure',
    description: 'Frame for a chart or image, with a caption and source line.',
    schema: {
      caption: fields.text({ label: 'Caption' }),
      source: fields.text({ label: 'Source' }),
    },
  }),
}

const link = fields.object({
  label: fields.text({ label: 'Label' }),
  url: fields.url({ label: 'URL' }),
})

export default config({
  storage,
  ui: { brand: { name: 'Data Artisan' } },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title', // the slug becomes the filename and the URL: /blog/<slug>
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          description: 'One or two sentences. Shown in lists and link previews.',
          multiline: true,
          validation: { isRequired: true },
        }),
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
        draft: fields.checkbox({ label: 'Draft', description: 'Drafts appear only in local dev.', defaultValue: false }),
        cover: fields.image({
          label: 'Cover image (optional)',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        coverAlt: fields.text({ label: 'Cover alt text' }),
        sources: fields.array(link, {
          label: 'Sources & data',
          description: 'Documents, datasets and methodology. Listed at the end of the post.',
          itemLabel: (props) => props.fields.label.value || 'Source',
        }),
        content: fields.mdx({
          label: 'Content',
          options: { image: { directory: 'public/images/posts', publicPath: '/images/posts/' } },
          components,
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
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        tagline: fields.text({ label: 'One-line description', validation: { isRequired: true } }),
        portrait: fields.image({
          label: 'Portrait (optional)',
          directory: 'public/images/about',
          publicPath: '/images/about/',
        }),
        links: fields.array(link, { label: 'Links', itemLabel: (props) => props.fields.label.value || 'Link' }),
        content: fields.mdx({ label: 'Bio' }),
      },
    }),
  },
})
