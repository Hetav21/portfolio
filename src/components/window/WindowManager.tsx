"use client";

import React, { useRef } from 'react';
import { useSystemStore } from '@/lib/store';
import { Window } from './Window';
import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('@/components/apps/Terminal'), { ssr: false });

export const WindowManager = () => {
  const windows = useSystemStore((state) => state.windows);
  const containerRef = useRef<HTMLDivElement>(null);

  const openWindows = Object.values(windows).filter(w => w.isOpen && !w.isMinimized);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {openWindows.map((window) => (
        <Window 
            key={window.id} 
            id={window.id} 
            title={window.title} 
            constraintsRef={containerRef}
        >
            {/* We handle Terminal separately to ensure it takes full height without flex centering issues if any */}
            {window.id === 'terminal' ? (
                <div className="h-full w-full bg-[#1a1b1e]">
                    <Terminal />
                </div>
            ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500 bg-[#1e1e2e]">
                    {window.id === 'files' && (
                        <div className="text-center">
                             <h3 className="font-bold text-lg">Files</h3>
                             <p>Coming soon...</p>
                        </div>
                    )}
                    {window.id === 'about' && (
                        <div className="p-4 text-center">
                            <h3 className="font-bold text-lg">About NixOS Gnome</h3>
                            <p>A web-based desktop environment.</p>
                        </div>
                    )}
                    {window.id === 'projects' && <div>Projects App Placeholder</div>}
                    {window.id === 'contact' && <div>Contact App Placeholder</div>}
                    {window.id === 'editor' && <div>Text Editor App Placeholder</div>}
                    {window.id === 'browser' && <div>Web Browser App Placeholder</div>}
                </div>
            )}
        </Window>
      ))}
    </div>
  );
};
