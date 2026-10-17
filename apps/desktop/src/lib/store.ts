import { create } from 'zustand';
import { AppId, WindowState } from './types';

export interface SystemState {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  maxZIndex: number;
  theme: 'dark' | 'light';
  isBooting: boolean;

  // Editor State
  editorContent: string;
  setEditorContent: (content: string) => void;

  // Actions
  setBooting: (isBooting: boolean) => void;
  toggleTheme: () => void;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleActivities: () => void;
  updateWindowPosition: (id: AppId, pos: { x: number; y: number }) => void;
  updateWindowSize: (id: AppId, size: { width: number; height: number }) => void;
}

const defaultWindows: Record<AppId, WindowState> = {
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 100 },
    size: { width: 800, height: 500 },
  },
  files: {
    id: 'files',
    title: 'Files',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 150, y: 150 },
    size: { width: 900, height: 600 },
  },
  about: {
    id: 'about',
    title: 'About',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 200, y: 200 },
    size: { width: 500, height: 600 },
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 100 },
    size: { width: 1000, height: 700 },
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 300, y: 200 },
    size: { width: 400, height: 500 },
  },
  editor: {
    id: 'editor',
    title: 'Text Editor',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 100 },
    size: { width: 800, height: 600 },
  },
  browser: {
    id: 'browser',
    title: 'Web Browser',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 50, y: 50 },
    size: { width: 1024, height: 768 },
  },
  resume: {
    id: 'resume',
    title: 'PDF Viewer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 150, y: 100 },
    size: { width: 900, height: 800 },
  },
};

const getNextFocusId = (windows: Record<AppId, WindowState>, ignoreId: AppId): AppId | null => {
  let nextActiveId: AppId | null = null;
  let maxZ = -1;

  (Object.keys(windows) as AppId[]).forEach((key) => {
    const win = windows[key];
    if (key !== ignoreId && win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
      maxZ = win.zIndex;
      nextActiveId = key;
    }
  });

  return nextActiveId;
};

export const useSystemStore = create<SystemState>((set) => ({
  windows: defaultWindows,
  activeWindowId: null,
  maxZIndex: 10,
  theme: 'dark',
  isBooting: true,
  editorContent: '',

  setEditorContent: (content) => set({ editorContent: content }),
  setBooting: (isBooting) =>
    set((state) => ({
      isBooting,
      windows: isBooting ? defaultWindows : state.windows,
      activeWindowId: isBooting ? null : state.activeWindowId,
    })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  openWindow: (id) =>
    set((state) => {
      const win = state.windows[id];
      const newZ = state.maxZIndex + 1;
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      // If already open and active on desktop, clicking dock icon toggles minimize
      if (win.isOpen && !win.isMinimized && state.activeWindowId === id) {
        const nextWindows = {
          ...state.windows,
          [id]: { ...win, isMinimized: true },
        };
        return {
          windows: nextWindows,
          activeWindowId: getNextFocusId(nextWindows, id),
        };
      }

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...win,
            isOpen: true,
            zIndex: newZ,
            isMinimized: false,
            isMaximized: isMobile ? true : win.isMaximized,
          },
        },
        activeWindowId: id,
        maxZIndex: newZ,
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const newWindows = { ...state.windows, [id]: { ...state.windows[id], isOpen: false } };

      // Only switch focus if the closed window was active
      if (state.activeWindowId === id) {
        return {
          windows: newWindows,
          activeWindowId: getNextFocusId(newWindows, id),
        };
      }

      return { windows: newWindows };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      const newWindows = { ...state.windows, [id]: { ...state.windows[id], isMinimized: true } };
      return {
        windows: newWindows,
        activeWindowId: getNextFocusId(newWindows, id),
      };
    }),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      if (state.activeWindowId === id) return {};
      const newZ = state.maxZIndex + 1;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: newZ, isMinimized: false },
        },
        activeWindowId: id,
        maxZIndex: newZ,
      };
    }),

  toggleActivities: () =>
    set((state) => {
      const openWins = Object.values(state.windows).filter((w) => w.isOpen);
      if (openWins.length === 0) return {};

      // If any window is currently maximized, restore them
      const hasMaximized = openWins.some((w) => w.isMaximized && !w.isMinimized);
      if (hasMaximized) {
        const updated = { ...state.windows };
        openWins.forEach((w) => {
          if (w.isMaximized) updated[w.id] = { ...w, isMaximized: false };
        });
        return { windows: updated };
      }

      // Otherwise, toggle minimize all / restore all
      const hasVisible = openWins.some((w) => !w.isMinimized);
      const updated = { ...state.windows };
      openWins.forEach((w) => {
        updated[w.id] = { ...w, isMinimized: hasVisible };
      });
      return {
        windows: updated,
        activeWindowId: hasVisible ? null : state.activeWindowId,
      };
    }),

  updateWindowPosition: (id, pos) =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], position: pos } },
    })),

  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], size: size } },
    })),
}));
