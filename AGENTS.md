# AGENTS.md

## Commands
- `npm run dev` - Start dev server at localhost:3000
- `npm run build` - Production build (run before committing)
- `npm run lint` - ESLint check
- `npm test` - Run all Playwright tests
- `npm test -- tests/example.spec.ts` - Run single test file
- `npm run test:debug` - Debug mode for tests

## Code Style
- **TypeScript**: Strict mode enabled. No `any`, `@ts-ignore`, or type suppressions.
- **Imports**: Use `@/*` alias for `src/*`. Group: React/Next → external libs → local (`@/lib`, `@/components`).
- **Components**: Functional components with arrow functions. Add `"use client"` directive for client components.
- **Naming**: PascalCase for components/types, camelCase for functions/variables, kebab-case for files.
- **Styling**: Tailwind CSS only. Use CSS variables from `globals.css` (e.g., `bg-background`, `text-foreground`).
- **State**: Zustand store in `src/lib/store.ts`. Access via `useSystemStore()` hook.
- **Icons**: Use `lucide-react` exclusively.
- **Errors**: Never use empty catch blocks. Handle errors explicitly.

## Architecture
- Next.js 14 App Router (`src/app/`), components in `src/components/`, utilities in `src/lib/`.
- Window apps in `src/components/apps/`, desktop shell in `src/components/desktop/`.
