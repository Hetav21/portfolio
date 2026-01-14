'use client';

import React from 'react';
import { useSystemStore } from '@/lib/store';
import { AppId } from '@/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DockItem {
  id: AppId;
  filename: string;
  label: string;
}

const dockItems: DockItem[] = [
  { id: 'terminal', filename: 'terminal.svg', label: 'Terminal' },
  { id: 'files', filename: 'files.svg', label: 'Files' },
  { id: 'browser', filename: 'browser.svg', label: 'Browser' },
  { id: 'projects', filename: 'code.svg', label: 'Projects' },
  { id: 'editor', filename: 'editor.svg', label: 'Text Editor' },
  { id: 'about', filename: 'user.svg', label: 'About' },
  { id: 'contact', filename: 'contact.svg', label: 'Contact' },
];

export const Dock = () => {
  const openWindow = useSystemStore((state) => state.openWindow);
  const windows = useSystemStore((state) => state.windows);
  const theme = useSystemStore((state) => state.theme);

  const isAnyWindowMaximized = Object.values(windows).some(
    (w) => w.isOpen && w.isMaximized && !w.isMinimized
  );

  const iconTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${
        isAnyWindowMaximized ? 'translate-y-32' : ''
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl">
        {dockItems.map((item) => {
          const isOpen = windows[item.id]?.isOpen;

          return (
            <motion.button
              key={item.id}
              onClick={() => openWindow(item.id)}
              className="relative p-3 rounded-xl transition-colors group"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={item.label}
            >
              <div className="w-10 h-10 relative">
                <Image
                  src={`/icons/${iconTheme}/${item.filename}`}
                  alt={item.label}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-xs text-popover-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
                {item.label}
              </span>

              {/* Active Indicator */}
              {isOpen && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
