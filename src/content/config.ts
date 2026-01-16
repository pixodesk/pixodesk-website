// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum(['react', 'react-native']),
    order: z.number().default(999),
    isCategory: z.boolean().default(false),
    slug: z.string().optional(), // Custom slug override
  }),
});

export const collections = {
  docs: docsCollection,
};