"use client";

import React, { useRef } from 'react';
import { useSystemStore } from '@/lib/store';
import { Window } from './Window';
import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('@/components/apps/Terminal'), { ssr: false });
const Files = dynamic(() => import('@/components/apps/Files'), { ssr: false });
const AboutMe = dynamic(() => import('@/components/apps/AboutMe'), { ssr: false });
const Projects = dynamic(() => import('@/components/apps/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/apps/Contact'), { ssr: false });
const TextEditor = dynamic(() => import('@/components/apps/TextEditor'), { ssr: false });
const Browser = dynamic(() => import('@/components/apps/Browser'), { ssr: false });

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
            <div className="h-full w-full bg-[#1e1e2e] text-gray-200 overflow-hidden">
                {window.id === 'terminal' && <Terminal />}
                {window.id === 'files' && <Files />}
                {window.id === 'about' && <AboutMe />}
                {window.id === 'projects' && <Projects />}
                {window.id === 'contact' && <Contact />}
                {window.id === 'editor' && <TextEditor />}
                {window.id === 'browser' && <Browser />}
            </div>
        </Window>
      ))}
    </div>
  );
};
