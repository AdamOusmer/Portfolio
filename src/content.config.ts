import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        heroImage: z.string().optional(),
    }),
});

const projectsCollection = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
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
        translations: z.object({
            fr: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
            }).optional(),
        }).optional(),
    }),
});

const coursesCollection = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/courses' }),
    schema: z.object({
        code: z.string(),
        name: z.string(),
        description: z.string(),
        relevance: z.string(),
        year: z.number(),
        semester: z.enum(['fall', 'winter', 'summer']),
        translations: z.object({
            fr: z.object({
                name: z.string().optional(),
                description: z.string().optional(),
                relevance: z.string().optional(),
            }).optional(),
        }).optional(),
    }),
});

const timelineCollection = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/timeline' }),
    schema: z.object({
        order: z.number(),
        year: z.string(),
        title: z.string(),
        description: z.string(),
        type: z.enum(['education', 'project', 'career']),
        ongoing: z.boolean().default(false),
        translations: z.object({
            fr: z.object({
                year: z.string().optional(),
                title: z.string().optional(),
                description: z.string().optional(),
            }).optional(),
        }).optional(),
    }),
});

export const collections = {
    'blog': blogCollection,
    'projects': projectsCollection,
    'courses': coursesCollection,
    'timeline': timelineCollection,
};
