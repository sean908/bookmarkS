import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const resources = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/resources',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    url: z.string().url().refine(value => ['http:', 'https:'].includes(new URL(value).protocol)),
    type: z.enum(['website', 'repo']).default('website'),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
    added: z.coerce.date().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { resources };
