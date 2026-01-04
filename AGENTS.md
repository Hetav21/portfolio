# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-04
**Commit:** 16f8ff1
**Branch:** main

## OVERVIEW

NixOS GNOME desktop environment as a portfolio website. Next.js 16 + React 19 + Tailwind v4 + Zustand + Playwright.

## STRUCTURE

```
src/
├── app/                    # Next.js App Router (single route)
│   ├── globals.css         # Theme variables (Rose Pine)
│   ├── layout.tsx          # Root layout + ThemeProvider
│   └── page.tsx            # Boot → Desktop orchestrator
├── components/
│   ├── apps/               # Window content (Terminal, Files, Browser...)
│   ├── boot/               # NixOS boot sequence animation
│   ├── desktop/            # Shell UI (TopBar, Dock, Desktop)
│   ├── window/             # WindowManager + Window wrapper
│   ├── icons/              # GNOME symbolic icons
│   └── mobile/             # Mobile fallback
├── lib/
│   ├── store.ts            # Zustand: useSystemStore() — window state, theme
│   ├── types.ts            # AppId, WindowState, FileSystemNode
│   ├── filesystem.ts       # Virtual Linux filesystem
│   ├── commands.ts         # Terminal command handlers
│   └── utils.ts            # cn() helper
public/
├── cursors/                # Bibata-style SVG cursors
└── icons/{dark,light}/     # Theme-aware app icons
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new app | `src/components/apps/` + `WindowManager.tsx` + `store.ts` | Register in defaultWindows, add dynamic import |
| Window behavior | `src/components/window/Window.tsx` | Framer Motion drag/resize |
| System state | `src/lib/store.ts` | All window/theme state via `useSystemStore()` |
| Terminal commands | `src/lib/commands.ts` | Add to switch statement |
| Virtual filesystem | `src/lib/filesystem.ts` | Hardcoded tree structure |
| Theme colors | `src/app/globals.css` | Rose Pine variables |
| Dock/TopBar | `src/components/desktop/` | Shell chrome |
| Boot animation | `src/components/boot/BootSequence.tsx` | NixOS-style boot |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `useSystemStore` | Hook | `lib/store.ts` | Central state (windows, theme, boot) |
| `SystemState` | Interface | `lib/store.ts` | Store type definition |
| `AppId` | Type | `lib/types.ts` | `'terminal' \| 'files' \| 'about' \| ...` |
| `WindowState` | Interface | `lib/types.ts` | Position, size, zIndex, isOpen... |
| `WindowManager` | Component | `window/WindowManager.tsx` | Renders open windows, dynamic imports |
| `Window` | Component | `window/Window.tsx` | Draggable/resizable wrapper |
| `FileSystemNode` | Interface | `lib/types.ts` | VFS node structure |

## CONVENTIONS

### Enforced (from configs)
- **TypeScript**: Strict mode. No `any` or `@ts-ignore`.
- **Imports**: Use `@/*` path alias. Group: React/Next → external → `@/lib` → `@/components`.
- **Icons**: `lucide-react` only (shadcn config).
- **Package manager**: Bun only (`bun@1.2.0`).

### Project Patterns
- **Components**: Arrow functions. `"use client"` for interactive.
- **Naming**: PascalCase (components), camelCase (functions), kebab-case (files).
- **Styling**: Tailwind v4 only. Theme vars from `globals.css`.
- **State**: Zustand via `useSystemStore()`. No prop drilling.
- **Apps**: Must use `next/dynamic` with `{ ssr: false }` in WindowManager.
- **Cleanup**: Always cleanup in `useEffect` return.

## ANTI-PATTERNS

| Forbidden | Why |
|-----------|-----|
| `as any`, `@ts-ignore`, `@ts-expect-error` | Strict mode enforced |
| Direct DOM manipulation | Use React/Framer Motion |
| CSS files (except globals.css) | Tailwind only |
| npm/yarn/pnpm | Bun only |
| SSR for app components | xterm.js and other browser APIs break |
| New icon libraries | lucide-react only |

## UNIQUE PATTERNS

- **SPA-within-Next.js**: No file-based routing. Single page with client-side window manager.
- **Virtual OS**: `lib/filesystem.ts` simulates Linux paths (`/home/hetav/...`).
- **Nix-first dev**: `nix develop` provides reproducible env with Playwright browsers.
- **Rose Pine theme**: Dark (default) / Light variants. Toggle via store.
- **Custom cursors**: SVG cursors in `public/cursors/` applied globally.

## COMMANDS

```bash
# Development
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run lint             # ESLint check

# Testing (requires nix develop for browsers)
bun test                 # Run all Playwright tests
bun test tests/file.spec.ts  # Single test
bun run test:headed      # Tests with browser UI
bun run test:debug       # Debug mode
```

## NOTES

- **Playwright + Nix**: Must run inside `nix develop` shell. Browsers come from Nixpkgs.
- **Tailwind v4**: Uses `@tailwindcss/postcss`, not legacy `tailwindcss` plugin.
- **ESLint 9**: Flat config format in `eslint.config.mjs`.
- **Next.js 16 + React 19**: Bleeding edge — check compatibility for new deps.
- **No CI yet**: All verification is local. Run lint + build before commits.
- **Adding apps**: 1) Create component in `apps/`, 2) Add to `AppId` type, 3) Add to `defaultWindows` in store, 4) Add dynamic import + render case in WindowManager.
