import { defineConfig, s } from 'velite';

const iconMap = {
  work: 'briefcase',
  education: 'graduation-cap',
  certification: 'award',
} as const;

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    experience: {
      name: 'Experience',
      pattern: 'experience/**/*.mdx',
      schema: s
        .object({
          type: s.enum(['work', 'education', 'certification']),
          role: s.string().max(99),
          company: s.string().max(99),
          startDate: s.string(),
          endDate: s.string().optional(),
          location: s.string().optional(),
          tags: s.array(s.string()).default([]),
          link: s.string().url().optional(),
          order: s.number().default(0),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          icon: iconMap[data.type],
        })),
    },
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        description: s.string(),
        tags: s.array(s.string()).default([]),
        image: s.string().optional(),
        repoUrl: s.string().url(),
        demoUrl: s.string().url().optional(),
        featured: s.boolean().default(false),
        order: s.number().default(0),
        content: s.mdx(),
      }),
    },
  },
});
