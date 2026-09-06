import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// The `docs` collection also carries the synced player docs (src/content/docs/svga,
// written by `yarn sync:svga-docs[:local]` with frontmatter and explicit /docs slugs).
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema()
  }),
};
