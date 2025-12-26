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
