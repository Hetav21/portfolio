"use client";

import { useEffect } from 'react';
import { useSystemStore } from '@/lib/store';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSystemStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  return <>{children}</>;
};
