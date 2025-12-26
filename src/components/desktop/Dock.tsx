"use client";

import React from 'react';
import { useSystemStore } from '@/lib/store';
import { AppId } from '@/lib/types';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Folder, 
  User, 
  Code, 
  Mail, 
  FileText, 
  Globe 
} from 'lucide-react';

interface DockItem {
  id: AppId;
  icon: React.ElementType;
  label: string;
}

const dockItems: DockItem[] = [
  { id: 'terminal', icon: Terminal, label: 'Terminal' },
  { id: 'files', icon: Folder, label: 'Files' },
  { id: 'browser', icon: Globe, label: 'Web Browser' },
  { id: 'projects', icon: Code, label: 'Projects' },
  { id: 'editor', icon: FileText, label: 'Text Editor' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export const Dock = () => {
  const openWindow = useSystemStore((state) => state.openWindow);
  const windows = useSystemStore((state) => state.windows);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        {dockItems.map((item) => {
          const isOpen = windows[item.id]?.isOpen;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => openWindow(item.id)}
              className="relative p-3 rounded-xl hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon 
                size={24} 
                className="text-white opacity-90 group-hover:opacity-100" 
              />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                {item.label}
              </span>

              {/* Active Indicator */}
              {isOpen && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
