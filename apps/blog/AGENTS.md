# BLOG APP KNOWLEDGE BASE

**Type:** Next.js 15 Content Site
**Context:** `apps/blog`

## OVERVIEW
A static blog platform optimized for reading. Uses **Velite** for content management and shares the **Rose Pine** theme with the desktop app.

## STRUCTURE
```
.
├── content/
│   └── posts/       # MDX Source Files
├── src/
│   ├── app/         # Routes: / (index), /[slug] (post)
│   ├── components/  # UI: Header, MDXContent, ThemeToggle
│   └── app/globals.css # Shared theme tokens
└── velite.config.ts # Content Schema Definition
```

## CONTENT ENGINE (Velite)
*   **Config**: `velite.config.ts` defines the `posts` collection.
*   **Generation**: Runs automatically during `bun dev`. Outputs to `.velite/`.
*   **Usage**: `import { posts } from '@/velite'`.
*   **Schema**:
    *   `slug`: Computed from filename (e.g., `hello-world.mdx` -> `hello-world`).
    *   `tags`: Array of strings.
    *   `cover`: Optional image path.

## ROUTING
*   **Index**: `src/app/page.tsx` - Lists all published posts.
*   **Post**: `src/app/[slug]/page.tsx` - Renders individual post using `MDXContent`.

## COMMANDS
```bash
bun dev   # Runs `velite --watch & next dev`
```

## NOTES
*   **Theme Sync**: Uses `next-themes` independently from the desktop app, but defaults to system/dark to match.
*   **Integration**: This app is embedded in `apps/web` via iframe. Ensure `X-Frame-Options` allows this if deploying headers manually.
