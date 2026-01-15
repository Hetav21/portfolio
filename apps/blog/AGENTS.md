# BLOG AGENT GUIDE

**Context**: Static Content Site (Next.js 15 + Velite)
**Location**: `apps/blog`

## CONTENT

- **Engine**: Velite handles MDX processing.
- **Source**: `content/posts/**/*.mdx`.
- **Schema** (`velite.config.ts`):
  - `title`, `description`, `date` (ISO), `published` (bool).
  - `slug`: Path-based.
  - `body`: Compiled MDX.
- **Build**: `bun dev` triggers auto-generation to `.velite/`.

## STYLING

- **Theme**: Independent Rose Pine implementation (Dark/Dawn).
- **Provider**: `next-themes` via `ThemeProvider`.
- **CSS**: Tailwind v4 with `--color-*` variables in `globals.css`.
- **Accents**: Custom Rose Pine tokens (`love`, `gold`, `rose`, etc).

## ANTI-PATTERNS

- **Missing Frontmatter**: All MDX files MUST have `title`, `date`, and `published`.
- **Manual HTML**: Avoid `<div>` or `<span>` in MDX; use standard Markdown.
- **Direct Next Links**: Use `Link` from `next/link` for internal routing.
- **Absolute Imports**: Always use `@/` alias for `src/`.

## COMMANDS

- `bun dev`: Start dev server + Velite watcher.
- `bun run build`: Static export generation.
