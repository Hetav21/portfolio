# Conventions & Structure

## Structure

- `apps/web/`: Portfolio Website (Next.js 15, Velite, MDX)
- `apps/desktop/`: Desktop Environment (Next.js 16, Zustand, Framer Motion)
- `apps/blog/`: Content Site (Next.js 15, Velite, MDX)
- `docs/`: Architecture plans and design docs
- `flake.nix`: Nix environment (Bun, Playwright)
- `turbo.json`: Build pipeline configuration

## Where to Look

- **Add Feature**: `apps/{app}/src` (Apps are isolated; shared logic is minimal)
- **New Blog Post**: `apps/blog/content/posts`
- **Theme Config**: `apps/*/src/app/globals.css` (Tailwind v4 `@theme inline`. No `tailwind.config.ts`)
- **CI/Build**: `package.json`

## Conventions

- **Package Manager**: `bun` ONLY. No `npm`/`yarn`.
- **Monorepo**: Run commands from root via `turbo` or `bun --filter`.
- **Styling**: Tailwind v4 CSS-first configuration.
- **Environment**: `nix develop` provides the runtime.

## Notes

- **Browser Integration**: `apps/desktop` embeds `apps/blog` via iframe. Changes to blog URL must update Browser component.
- **Velite**: Blog content is compiled via Velite.
