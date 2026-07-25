# WEB KNOWLEDGE BASE

**Context**: Desktop Simulator (Next.js 16 + Zustand).

## STRUCTURE

- `components/apps`: UI for individual applications.
- `lib/store.ts`: Central Zustand state (windows, focus, boot).
- `lib/filesystem.ts`: Virtual File System (VFS) logic.

## PATTERNS

- **Window Manager**: Zustand-driven. Apps open via `useSystemStore`.
- **VFS**: Tree-based in-memory filesystem.
- **Terminal**: Command registry in `lib/commands.ts`. Returns React/HTML.

## ANTI-PATTERNS

- **SSR**: No SSR for `xterm.js`. Always use `"use client"` and client-only logic.
- **DOM**: No direct DOM manipulation for windowing. Use the store.
- **State**: Avoid local state for window properties; keep in central store.

## NOTES

- **Stack**: Next.js 16 Canary + React 19.
- **Metadata**: `.serena/` contains hidden VFS/system metadata.
- **Theme**: Tailwind v4 `@theme`. Global cursor system in `globals.css`.
