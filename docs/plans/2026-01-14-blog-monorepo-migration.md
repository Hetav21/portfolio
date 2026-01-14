# Blog & Monorepo Migration Design Plan

**Date:** 2026-01-14
**Status:** Implemented

## 1. Objective

Create a dedicated blogging platform for Hetav Shah that integrates seamlessly with the existing "Desktop Portfolio" theme while functioning as a standalone, readable website. This requires restructuring the project into a Monorepo to manage both applications efficiently.

## 2. Architecture: Monorepo Transformation

We migrated from a single-app structure to a **Bun Workspaces + Turborepo** monorepo.

### 2.1 Directory Structure
```text
/
├── package.json          # Root workspace config (Bun + Turbo)
├── turbo.json            # Turbo pipeline config
├── bun.lock              # Shared lockfile
├── apps/
│   ├── web/              # (Moved from root) The Desktop Portfolio
│   │   ├── package.json  # name: "web"
│   │   └── ...
│   └── blog/             # (New) The Blog Site
│       ├── package.json  # name: "blog"
│       ├── velite.config.ts
│       └── ...
└── README.md
```

### 2.2 Shared Configuration
To ensure visual consistency without over-engineering:
*   **Tailwind**: We duplicated the `tailwind.config.ts` and `globals.css` initially.
*   **Fonts**: Both apps load `JetBrains Mono`.

## 3. The Blog Application (`apps/blog`)

### 3.1 Tech Stack
*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS (Rose Pine Theme)
*   **Content**: MDX managed by **Velite**
*   **Deployment**: Vercel (Project: `blog-hetav-dev`)

### 3.2 Content Strategy (Velite)
Content lives in `apps/blog/content/posts/*.mdx`.
Velite schema defines:
*   `title` (string, required)
*   `date` (date, required)
*   `description` (string, optional)
*   `tags` (array of strings, optional)
*   `cover` (image, optional)

### 3.3 UI/UX Design
*   **Visual Identity**: Strict adherence to the Rose Pine Dark theme.
*   **Layout**:
    *   **Header**: Minimal. Left: "Hetav's Blog". Right: Theme Toggle.
    *   **Index Page**: List of posts. Card style with hover effects (Rose Pine accent border).
    *   **Post Page**: Centered reading column (prose-invert), Syntax highlighting for code blocks (`rehype-pretty-code`).
*   **Components**: Custom MDX components for `Callout`, `Image`, and `TerminalBlock`.

## 4. Integration Strategy

### 4.1 "Browser" App Integration
The existing `Browser` component in `apps/web` has been updated (via config):
*   **Default URL**: `https://blog.hetav.dev` (Production) / `http://localhost:3001` (Dev).
*   **Behavior**: The blog loads inside the iframe. Since the blog is responsive, it fits perfectly.

### 4.2 Development Workflow
*   `bun install`: Installs dependencies for all apps.
*   `bun dev`: Uses Turbo to run both `web` (port 3000) and `blog` (port 3001) in parallel.

## 5. Migration Steps (Completed)

1.  **Repo Restructure**: Created `apps/` folder, moved current root files to `apps/web`.
2.  **Monorepo Config**: Created root `package.json`, `turbo.json`.
3.  **Blog Init**: Initialized `apps/blog` with Next.js + Tailwind.
4.  **Velite Setup**: Configured content layer in `apps/blog`.
5.  **Theme Port**: Copied theme tokens to `apps/blog`.
6.  **Browser Update**: Configured `apps/web` Browser to point to the blog URL.
