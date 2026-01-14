# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-14
**Type:** Monorepo (Bun + Turbo)

## OVERVIEW

A dual-application monorepo containing a NixOS-themed Desktop Portfolio (`apps/web`) and a static Blog (`apps/blog`). Powered by Next.js, Tailwind v4, and Bun.

## STRUCTURE

```
.
├── apps/
│   ├── web/     # Desktop Environment (Next.js 16, Zustand, Framer Motion)
│   └── blog/    # Content Site (Next.js 15, Velite, MDX)
├── docs/        # Architecture plans and design docs
├── flake.nix    # Nix environment (Bun, Playwright)
└── turbo.json   # Build pipeline configuration
```

## WHERE TO LOOK

| Task              | Location                     | Notes                                                 |
| ----------------- | ---------------------------- | ----------------------------------------------------- |
| **Add Feature**   | `apps/{app}/src`             | Apps are isolated; shared logic is minimal currently. |
| **New Blog Post** | `apps/blog/content/posts`    | See `apps/blog/content/AGENTS.md` for writing guide.  |
| **Theme Config**  | `apps/*/src/app/globals.css` | Tailwind v4 `@theme inline`. No `tailwind.config.ts`. |
| **CI/Build**      | `package.json`               | Managed via Turbo.                                    |

## CONVENTIONS

- **Package Manager**: `bun` ONLY. No `npm`/`yarn`.
- **Monorepo**: Run commands from root via `turbo` or `bun --filter`.
- **Styling**: Tailwind v4 CSS-first configuration.
- **Environment**: `nix develop` provides the runtime.

## COMMANDS

```bash
# Development
nix develop          # Enter environment
bun install          # Install all dependencies
bun dev              # Start both apps (Web:3000, Blog:3001)

# App Specific
bun --filter web dev
bun --filter blog dev

# Quality
bun run lint         # Run lint on all apps
bun run test         # Run tests (currently web only)
```

## NOTES

- **Browser Integration**: `apps/web` embeds `apps/blog` via iframe. Changes to blog URL must update `apps/web/src/components/apps/Browser.tsx`.
- **Velite**: Blog content is compiled. If types fail, run `bun --filter blog dev` to regenerate `.velite`.
