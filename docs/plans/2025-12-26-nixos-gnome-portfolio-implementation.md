# NixOS GNOME Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fully functional, desktop-simulated portfolio website themed after NixOS and GNOME.

**Architecture:** Next.js 14 App Router application using a "single page" desktop interface. State is managed globally via Zustand to track open windows, z-indices, and theme. Components are built with React, styled with Tailwind + Adwaita variables, and animated with Framer Motion.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Zustand, xterm.js, lucide-react.

---

### Task 1: Project Scaffold & Dependencies

**Files:**
- Create: `package.json` (via init)
- Create: `tsconfig.json` (via init)
- Create: `tailwind.config.ts` (via init)
- Create: `components.json` (shadcn config)
- Modify: `app/globals.css`

**Step 1: Initialize Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir src --import-alias "@/*" --use-npm --no-git
```
(Note: Using `.` to install in current directory. If that fails due to existing files, use a temp dir and move).

**Step 2: Install additional dependencies**

Run:
```bash
npm install framer-motion zustand xterm xterm-addon-fit xterm-addon-web-links lucide-react clsx tailwind-merge
npm install -D @types/node @types/react @types/react-dom postcss autoprefixer
```

**Step 3: Initialize shadcn-ui**

Run:
```bash
npx shadcn-ui@latest init
# Settings: Default, Slate, CSS variables: yes
```

**Step 4: Configure Adwaita Colors in globals.css**

Modify `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Adwaita Dark (Default) */
    --background: 240 4% 14%; /* #242424 */
    --foreground: 0 0% 100%;
    --card: 240 4% 19%; /* #303030 */
    --card-foreground: 0 0% 100%;
    --popover: 240 4% 19%;
    --popover-foreground: 0 0% 100%;
    --primary: 211 65% 69%; /* #7ebae4 - Argentinian Blue */
    --primary-foreground: 222 47% 11%;
    --secondary: 240 4% 19%;
    --secondary-foreground: 0 0% 100%;
    --muted: 240 4% 19%;
    --muted-foreground: 240 5% 65%;
    --accent: 211 65% 69%;
    --accent-foreground: 222 47% 11%;
    --destructive: 337 57% 55%; /* #ce4a89 - Chinese Magenta */
    --destructive-foreground: 0 0% 100%;
    --border: 240 4% 24%;
    --input: 240 4% 24%;
    --ring: 211 65% 69%;
    --radius: 0.75rem;
    
    /* NixOS Colors */
    --nix-blue: 211 65% 69%;
    --nix-blue-dark: 222 47% 54%;
    --nix-green: 127 36% 56%;
  }

  .light {
    /* Adwaita Light */
    --background: 0 0% 98%; /* #fafafa */
    --foreground: 240 4% 12%; /* #1e1e1e */
    --card: 0 0% 100%;
    --card-foreground: 240 4% 12%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 4% 12%;
    --primary: 222 47% 54%; /* #5277c3 - Afghani Blue */
    --primary-foreground: 210 40% 98%;
    /* ... adjust others for light mode ... */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 5: Commit**
```bash
git add .
git commit -m "chore: scaffold Next.js project with Tailwind, shadcn, and Adwaita theme"
```

---

### Task 2: State Management (Zustand)

**Files:**
- Create: `src/lib/store.ts`
- Create: `src/lib/types.ts`

**Step 1: Define Types**

Create `src/lib/types.ts`:
```typescript
export type AppId = 'terminal' | 'files' | 'about' | 'projects' | 'contact' | 'editor' | 'browser';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string; // For files
  children?: FileSystemNode[]; // For directories
}
```

**Step 2: Create Store**

Create `src/lib/store.ts`:
```typescript
import { create } from 'zustand';
import { AppId, WindowState } from './types';

interface SystemState {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  maxZIndex: number;
  theme: 'dark' | 'light';
  isBooting: boolean;
  
  // Actions
  setBooting: (isBooting: boolean) => void;
  toggleTheme: () => void;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updateWindowPosition: (id: AppId, pos: { x: number, y: number }) => void;
  updateWindowSize: (id: AppId, size: { width: number, height: number }) => void;
}

const defaultWindows: Record<AppId, WindowState> = {
  terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: { x: 100, y: 100 }, size: { width: 800, height: 500 } },
  files: { id: 'files', title: 'Files', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: { x: 150, y: 150 }, size: { width: 900, height: 600 } },
  about: { id: 'about', title: 'About', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: { x: 200, y: 200 }, size: { width: 500, height: 600 } },
  projects: { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: { x: 100, y: 100 }, size: { width: 1000, height: 700 } },
  contact: { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: { x: 300, y: 200 }, size: { width: 400, height: 500 } },
  editor: { id: 'editor', title: 'Text Editor', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: { x: 100, y: 100 }, size: { width: 800, height: 600 } },
  browser: { id: 'browser', title: 'Web Browser', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: { x: 50, y: 50 }, size: { width: 1024, height: 768 } },
};

export const useSystemStore = create<SystemState>((set) => ({
  windows: defaultWindows,
  activeWindowId: null,
  maxZIndex: 10,
  theme: 'dark',
  isBooting: true,

  setBooting: (isBooting) => set({ isBooting }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  openWindow: (id) => set((state) => {
    const newZ = state.maxZIndex + 1;
    return {
      windows: { ...state.windows, [id]: { ...state.windows[id], isOpen: true, zIndex: newZ, isMinimized: false } },
      activeWindowId: id,
      maxZIndex: newZ,
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: { ...state.windows, [id]: { ...state.windows[id], isOpen: false } }
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: true } },
    activeWindowId: null // simplistic logic, ideally focus next top window
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: { ...state.windows, [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized } }
  })),

  focusWindow: (id) => set((state) => {
    if (state.activeWindowId === id) return {};
    const newZ = state.maxZIndex + 1;
    return {
      windows: { ...state.windows, [id]: { ...state.windows[id], zIndex: newZ, isMinimized: false } },
      activeWindowId: id,
      maxZIndex: newZ,
    };
  }),
  
  updateWindowPosition: (id, pos) => set((state) => ({
     windows: { ...state.windows, [id]: { ...state.windows[id], position: pos } }
  })),

  updateWindowSize: (id, size) => set((state) => ({
     windows: { ...state.windows, [id]: { ...state.windows[id], size: size } }
  })),
}));
```

**Step 3: Commit**
```bash
git add src/lib/store.ts src/lib/types.ts
git commit -m "feat: implement zustand store for window management"
```

---

### Task 3: Boot Sequence Component

**Files:**
- Create: `src/components/boot/BootSequence.tsx`
- Create: `src/assets/nixos-logo.tsx` (SVG Component)
- Modify: `src/app/page.tsx`

**Step 1: Create NixOS Logo Component**

Create `src/assets/nixos-logo.tsx`:
```tsx
export const NixosLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    {/* Simplified snowflake path placeholder - replace with actual path later */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
```

**Step 2: Create Boot Sequence**

Create `src/components/boot/BootSequence.tsx`:
```tsx
"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '@/lib/store';
import { NixosLogo } from '@/assets/nixos-logo';

export const BootSequence = () => {
  const { isBooting, setBooting } = useSystemStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBooting) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooting(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50); // 2.5s total roughly
    return () => clearInterval(interval);
  }, [isBooting, setBooting]);

  if (!isBooting) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white"
      onClick={() => setBooting(false)} // Skip
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NixosLogo className="w-32 h-32 text-nix-blue mb-8 animate-pulse" />
      </motion.div>
      
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-nix-blue"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-sm text-gray-400">Starting Hetav's Portfolio...</p>
    </motion.div>
  );
};
```

**Step 3: Implement Page Entry**

Modify `src/app/page.tsx`:
```tsx
"use client";
import { BootSequence } from '@/components/boot/BootSequence';
import { useSystemStore } from '@/lib/store';

export default function Home() {
  const isBooting = useSystemStore(state => state.isBooting);

  return (
    <main className="h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence>
        {isBooting && <BootSequence key="boot" />}
      </AnimatePresence>
      {!isBooting && (
        <div className="h-full w-full">
           {/* Desktop Component will go here */}
           <div className="flex items-center justify-center h-full">Desktop Placeholder</div>
        </div>
      )}
    </main>
  );
}
```

**Step 4: Commit**
```bash
git add src/components/boot src/assets src/app/page.tsx
git commit -m "feat: implement boot sequence animation"
```

---

### Task 4: Desktop Shell Components (TopBar, Dock)

**Files:**
- Create: `src/components/desktop/TopBar.tsx`
- Create: `src/components/desktop/Dock.tsx`
- Create: `src/components/desktop/Desktop.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Top Bar**
Create `src/components/desktop/TopBar.tsx` with date/time, Activities button, and system tray.

**Step 2: Dock**
Create `src/components/desktop/Dock.tsx` with icons that trigger `openWindow(id)`.

**Step 3: Desktop Layout**
Combine them in `Desktop.tsx`.

**Step 4: Update Page**
Replace placeholder in `src/app/page.tsx` with `<Desktop />`.

**Step 5: Commit**
```bash
git add src/components/desktop src/app/page.tsx
git commit -m "feat: implement desktop shell with topbar and dock"
```

---

### Task 5: Window Manager System

**Files:**
- Create: `src/components/window/Window.tsx`
- Create: `src/components/window/WindowManager.tsx`

**Step 1: Window Container**
Create `src/components/window/Window.tsx`.
- Props: `id`, `title`, `children`
- Use `framer-motion` for drag constraints (ref to desktop constraint).
- Use `useSystemStore` to read position/size/zIndex.
- Render Title bar with Close/Min/Max buttons.
- Render content area.

**Step 2: Window Manager**
Create `src/components/window/WindowManager.tsx`.
- Map over `useSystemStore().windows`.
- If `isOpen`, render `<Window id={id} ...><AppContent id={id} /></Window>`.

**Step 3: Commit**
```bash
git add src/components/window
git commit -m "feat: implement draggable window system"
```

---

### Task 6: Terminal App (xterm.js)

**Files:**
- Create: `src/components/apps/Terminal.tsx`
- Create: `src/lib/commands.ts`
- Create: `src/lib/filesystem.ts`

**Step 1: Filesystem**
Create `src/lib/filesystem.ts` with the directory structure defined in design.

**Step 2: Commands**
Create `src/lib/commands.ts` to parse input string and execute actions (cd, ls, cat, etc.).

**Step 3: Terminal UI**
Create `src/components/apps/Terminal.tsx`.
- Use `xterm` and `xterm-addon-fit`.
- Initialize xterm ref.
- Handle `onData` to capture keystrokes.
- Implement shell prompt `[nix-shell:~]$`.
- Call `commands.execute()` on Enter.
- Render `fastfetch` on mount.

**Step 4: Commit**
```bash
git add src/components/apps/Terminal.tsx src/lib/commands.ts src/lib/filesystem.ts
git commit -m "feat: implement fully functional terminal app"
```

---

### Task 7: Content Apps (Files, About, Projects, Contact)

**Files:**
- Create: `src/components/apps/Files.tsx`
- Create: `src/components/apps/AboutMe.tsx`
- Create: `src/components/apps/Projects.tsx`
- Create: `src/components/apps/Contact.tsx`

**Step 1: Files App**
- Breadcrumb nav.
- List view of `filesystem` nodes.

**Step 2: About Me**
- Static layout with Tailwind.
- Avatar, stats.

**Step 3: Projects**
- Grid of cards.

**Step 4: Contact**
- Simple form layout.

**Step 5: Commit**
```bash
git add src/components/apps
git commit -m "feat: implement content apps"
```

---

### Task 8: Mobile Fallback & Polish

**Files:**
- Create: `src/components/mobile/MobileFallback.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Mobile Fallback**
Create component that shows "Desktop Only" message.

**Step 2: Responsive Check**
In `page.tsx`, check screen width. If mobile, show Fallback. Else show Boot/Desktop.

**Step 3: Commit**
```bash
git add src/components/mobile src/app/page.tsx
git commit -m "feat: add mobile fallback and final polish"
```
