# AGENTS.md

## Commands
- `npm run dev` - Start dev server (localhost:3000)
- `npm run build` - Production build
- `npm run lint` - ESLint check
- `npm test` - Run all Playwright tests
- `npm test -- tests/file.spec.ts` - Run single test
- `npm run test:debug` - Debug tests
- `npm run test:headed` - Run tests with browser UI

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
