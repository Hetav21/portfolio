'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-1.5 opacity-80 hover:opacity-100 hover:bg-muted/50 rounded-full transition-all duration-150"
      title="Toggle Theme"
    >
      <Sun className="h-[15px] w-[15px] dark:hidden" strokeWidth={1.75} />
      <Moon className="hidden h-[15px] w-[15px] dark:block" strokeWidth={1.75} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
