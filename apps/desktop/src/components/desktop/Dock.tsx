'use client';

import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  const isAnyWindowMaximized = Object.values(windows).some(
    (w) => w.isOpen && w.isMaximized && !w.isMinimized
  );

  const isHidden = isAnyWindowMaximized && !isHovered;
  const iconTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <>
      {/* Bottom screen hover sensor to reveal dock when a window is maximized */}
      {isAnyWindowMaximized && (
        <div
          className="fixed bottom-0 left-0 right-0 h-4 z-40 pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          aria-hidden="true"
        />
      )}

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'fixed z-50 transition-transform duration-300 ease-out',
          // Mobile: Full width, bottom aligned
          'bottom-0 left-0 right-0 w-full',
          // Desktop: Floating pill centered
          'md:bottom-4 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2',
          // Sliding state
          isHidden ? 'translate-y-32 pointer-events-none' : 'translate-y-0 pointer-events-auto'
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
            const win = windows[item.id];
            const isOpen = win?.isOpen && !win?.isMinimized;

            return (
              <div key={item.id} className="relative group flex-shrink-0">
                <motion.button
                  onClick={() => openWindow(item.id)}
                  className="relative p-2 md:p-3 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                  whileHover={hoverAnim}
                  whileTap={tapAnim}
                  transition={{ type: 'spring', damping: 20, stiffness: 350 }}
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

                  {/* Active Indicator */}
                  {isOpen && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-xs" />
                  )}
                </motion.button>

                {/* Tooltip positioned outside motion.button so hover scaling doesn't distort text */}
                <span className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 px-2.5 py-1 bg-popover text-xs font-medium text-popover-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border shadow-lg z-50">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
