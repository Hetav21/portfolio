'use client';

import React from 'react';
import { useSystemStore } from '@/lib/store';
import { AppId } from '@/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
  { id: 'resume', filename: 'resume.svg', label: 'PDF Viewer' },
];

const hoverAnim = { scale: 1.2, y: -5 };
const tapAnim = { scale: 0.95 };

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
      className={cn(
        'fixed z-50 transition-transform duration-300',
        // Mobile: Full width, bottom aligned
        'bottom-0 left-0 right-0 w-full',
        // Desktop: Floating pill centered
        'md:bottom-4 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2',
        // Hiding state
        isAnyWindowMaximized ? 'translate-y-32' : ''
      )}
    >
      <div
        className={cn(
          'flex items-center no-scrollbar',
          // Mobile styling: Full width, no rounded corners at bottom, border top only, reduced padding, horizontal scroll
          'w-full overflow-x-auto justify-start px-4 gap-4 py-3 pb-4 border-t border-border bg-card/90 backdrop-blur-xl rounded-t-2xl',
          // Desktop styling: Pill shape, full border, centered content, shadow
          'md:w-auto md:justify-center md:gap-2 md:px-4 md:py-2 md:rounded-2xl md:border md:pb-2 md:overflow-visible md:shadow-2xl'
        )}
      >
        {dockItems.map((item) => {
          const isOpen = windows[item.id]?.isOpen;

          return (
            <motion.button
              key={item.id}
              onClick={() => openWindow(item.id)}
              className="relative p-2 md:p-3 rounded-xl transition-colors group flex-shrink-0"
              whileHover={hoverAnim}
              whileTap={tapAnim}
              aria-label={item.label}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 relative">
                <Image
                  src={`/icons/${iconTheme}/${item.filename}`}
                  alt={item.label}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>

              {/* Tooltip - Hidden on mobile */}
              <span className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-xs text-popover-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
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
