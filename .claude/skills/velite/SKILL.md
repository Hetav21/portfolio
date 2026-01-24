## Skill: velite

**Base directory**: /home/hetav/.claude/skills/velite

# Velite (Content Layer)

Velite is a type-safe content layer that turns Markdown, MDX, YAML, or JSON into typed data with Zod schemas. It is the modern successor to Contentlayer.

## When to use this skill

Use this skill when:

- Creating or modifying blog posts, documentation, or static content pages.
- Configuring the content schema in `velite.config.ts`.
- Debugging content generation or type issues.
- integrating MDX content into Next.js pages.

## 1. Basics & Installation

Velite is a dev dependency that compiles content files into a `.velite` directory.

### Installation

```bash
# Using Bun (Recommended)
bun add velite -D

# Using npm/pnpm
npm install --save-dev velite
```

### Essential Setup

Add `.velite` to your `.gitignore` and configure path aliases for easy imports.

**`tsconfig.json`**:

```json
{
  "compilerOptions": {
    "paths": {
      "@/velite": ["./.velite"],
      "@/*": ["./src/*"]
    }
  }
}
```

## 2. Configuration (`velite.config.ts`)

Create `velite.config.ts` in your project root. This is where you define your content collections and output settings.

```typescript
import { defineConfig, defineCollection, s } from 'velite';

// Computed fields example (e.g., generating URLs)
const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  permalink: `/blog/${data.slug}`,
});

const posts = defineCollection({
  name: 'Post', // The type name generated in .d.ts
  pattern: 'posts/**/*.mdx', // Glob pattern relative to root
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.path(), // Auto-generates slug from file path
      date: s.isodate(), // Validates & formats ISO dates
      published: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
      cover: s.image().optional(), // Image optimization
      metadata: s.metadata(), // { readingTime, wordCount }
      body: s.mdx(), // Compiles MDX to executable code
    })
    .transform(computedFields),
});

export default defineConfig({
  root: 'content', // Source directory
  output: {
    data: '.velite', // Output directory
    assets: 'public/static', // Where to copy images
    base: '/static/', // Public URL base for assets
    clean: true,
  },
  collections: { posts },
});
```

## 3. Schema Fields (`s.*`)

Velite extends Zod (`z`) with content-specific schemas.

| Field Type               | Description                   | Output Type                           |
| :----------------------- | :---------------------------- | :------------------------------------ |
| **`s.string()`**         | Standard string validation    | `string`                              |
| **`s.slug(collection)`** | Unique slug validation        | `string`                              |
| **`s.path()`**           | File path (without extension) | `string`                              |
| **`s.isodate()`**        | ISO 8601 Date                 | `string` (ISO)                        |
| **`s.boolean()`**        | Boolean flag                  | `boolean`                             |
| **`s.toc()`**            | Table of Contents             | `TocEntry[]`                          |
| **`s.metadata()`**       | Content stats                 | `{ readingTime, wordCount }`          |
| **`s.excerpt()`**        | Auto-generated excerpt        | `string`                              |
| **`s.image()`**          | Image optimization            | `{ src, width, height, blurDataURL }` |
| **`s.file()`**           | Static file copy              | `string` (public path)                |
| **`s.markdown()`**       | Compiles to HTML              | `string` (HTML)                       |
| **`s.mdx()`**            | Compiles to Component         | `string` (Function body)              |

## 4. Next.js Integration

### Option A: The "Sidecar" Approach (Recommended for Monorepos)

Run Velite as a parallel process. This decouples the build and avoids Webpack/Turbo caching issues.

**`package.json`**:

```json
{
  "scripts": {
    "dev": "velite --watch & next dev",
    "build": "velite && next build"
  }
}
```

### Option B: The Next.js Plugin

Integrate directly into `next.config.mjs`.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... config
};

// Lazy load Velite to prevent build-time import errors
const isDev = process.argv.includes('dev');
const isBuild = process.argv.includes('build');

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  const { build } = await import('velite');
  await build({ watch: isDev, clean: !isDev });
}

export default nextConfig;
```

## 5. Using Data in Next.js

Import collections directly from the alias. Arrays are fully typed.

### Listing Posts

```tsx
import { posts } from '@/velite';
import Link from 'next/link';

export default function BlogIndex() {
  const publishedPosts = posts.filter((p) => p.published);

  return (
    <div>
      {publishedPosts.map((post) => (
        <article key={post.slug}>
          <Link href={post.permalink}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.metadata.readingTime} min read</p>
        </article>
      ))}
    </div>
  );
}
```

### Rendering MDX (Server Component)

Use `new Function` to hydrate the MDX body.

```tsx
// components/mdx-content.tsx
import * as runtime from 'react/jsx-runtime';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export const MDXContent = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);
  return <Component />;
};
```

### Dynamic Routes (`[slug]/page.tsx`)

```tsx
import { posts } from '@/velite';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <MDXContent code={post.body} />
    </article>
  );
}
```

## 6. Best Practices

1.  **Computed Fields**: Use `.transform()` to generate permalinks or process data at build time, keeping your runtime components simple.
2.  **Type Safety**: Never manually type the content imports. Rely on Velite's auto-generated types.
3.  **Image Handling**: Use `s.image()` for cover images. It automatically provides `blurDataURL` for `next/image` placeholders.
4.  **Syntax Highlighting**: Use `rehype-pretty-code` in the `mdx` configuration option in `velite.config.ts` for server-side code highlighting.
