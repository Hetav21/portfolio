# WEB APP KNOWLEDGE BASE

**Type:** Next.js 16 Desktop Simulation
**Context:** `apps/web`

## OVERVIEW
Simulates a NixOS/GNOME desktop environment in the browser. Features a Window Manager, virtual filesystem, and interactive apps.

## STRUCTURE
```
src/
├── app/
│   ├── globals.css  # Tailwind v4 Theme + Cursor definitions
│   └── page.tsx     # Main entry (Desktop/Boot logic)
├── components/
│   ├── apps/        # Individual "Apps" (Terminal, Browser, Files)
│   ├── desktop/     # Shell UI (Dock, TopBar)
│   └── window/      # WindowManager & Window frames
└── lib/
    ├── store.ts     # Global State (Zustand) - Windows, Boot, Theme
    ├── filesystem.ts # Virtual VFS logic
    └── commands.ts   # Terminal command registry
```

## KEY PATTERNS

### Window System
*   **State**: Managed in `useSystemStore` (windows array, focusedWindowId).
*   **Registration**: To add an app:
    1.  Create component in `components/apps/`.
    2.  Register in `components/desktop/Dock.tsx` and `lib/store.ts` (AppID).
    3.  Add to `WindowManager.tsx` switch case (lazy load recommended).

### Terminal
*   **Commands**: Defined in `lib/commands.ts`.
*   **Output**: Returns HTML string or React component.
*   **Execution**: `handleCommand` parses input -> calls function -> updates history.

### Styling (Rose Pine)
*   **Colors**: Defined in `globals.css` via `@theme`.
*   **Cursors**: Custom SVG cursors are enforced globally.
*   **Animations**: `framer-motion` used for window open/close/minimize.

## ANTI-PATTERNS
*   **SSR**: `xterm.js` and window logic MUST be client-side (`"use client"`).
*   **Direct DOM**: Use `useSystemStore` to manipulate windows, not DOM selectors.

## TESTING
```bash
bun run test         # Run Playwright E2E
bun run test:headed  # Visual debugging
```
Tests located in `tests/` (to be created).
