import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum(['vue', 'react', 'react-native']),
    order: z.number().default(999),
    slug: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};