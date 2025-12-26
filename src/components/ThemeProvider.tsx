"use client";

import { useEffect } from 'react';
import { useSystemStore } from '@/lib/store';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSystemStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the appropriate class
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('dark');
    }
    
    // Also set the color-scheme for native elements
    root.style.colorScheme = theme;
  }, [theme]);

  return <>{children}</>;
};
