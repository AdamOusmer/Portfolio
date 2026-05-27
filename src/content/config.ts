import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        heroImage: z.string().optional(),
    }),
});

const projectsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        year: z.number(),
        tags: z.array(z.string()),
        githubUrl: z.string().url().optional(),
        websiteUrl: z.string().url().optional(),
        blogSlug: z.string().optional(),
        docsSlug: z.string().optional(),
        featured: z.boolean().default(false),
    }),
});

const coursesCollection = defineCollection({
    type: 'data',
    schema: z.object({
        code: z.string(),
        name: z.string(),
        description: z.string(),
        relevance: z.string(),
        year: z.number(),
        semester: z.enum(['fall', 'winter', 'summer']),
    }),
});

export const collections = {
    'blog': blogCollection,
    'projects': projectsCollection,
    'courses': coursesCollection,
};
