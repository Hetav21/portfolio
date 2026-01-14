# AGENTS.md

## Commands
- `bun run dev` - Start dev server (localhost:3000)
- `bun run build` - Production build
- `bun run lint` - ESLint check
- `bun test` - Run all Playwright tests
- `bun test tests/file.spec.ts` - Run single test
- `bun run test:debug` - Debug tests
- `bun run test:headed` - Run tests with browser UI

## Code Style
- **TypeScript**: Strict mode. No `any` or `@ts-ignore`.
- **Imports**: Use `@/*`. Group: React/Next → external → local (`@/lib`, `@/components`).
- **Components**: Functional + arrow functions. `"use client"` for interactive parts.
- **Naming**: PascalCase (components), camelCase (functions), kebab-case (files).
- **Styling**: Tailwind CSS only. Variables from `globals.css`.
- **State**: Zustand (`src/lib/store.ts`). Use `useSystemStore()`.
- **Icons**: `lucide-react` only.
- **Patterns**: Explicit error handling. Cleanup in `useEffect`.

## Architecture
- Next.js 14 App Router.
- Apps: `src/components/apps/`. Shell: `src/components/desktop/`.
- Utils: `src/lib/`.
