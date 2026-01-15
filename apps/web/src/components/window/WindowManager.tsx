'use client';

import React, { useRef, useMemo } from 'react';
import { useSystemStore } from '@/lib/store';
import { Window } from './Window';
import dynamic from 'next/dynamic';
import { AppId } from '@/lib/types';

const Terminal = dynamic(() => import('@/components/apps/Terminal'), { ssr: false });
const Files = dynamic(() => import('@/components/apps/Files'), { ssr: false });
const AboutMe = dynamic(() => import('@/components/apps/AboutMe'), { ssr: false });
const Projects = dynamic(() => import('@/components/apps/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/apps/Contact'), { ssr: false });
const TextEditor = dynamic(() => import('@/components/apps/TextEditor'), { ssr: false });
const Browser = dynamic(() => import('@/components/apps/Browser'), { ssr: false });
const Resume = dynamic(() => import('@/components/apps/Resume'), { ssr: false });

// Helper to render the correct app component
const WindowContent = React.memo(({ id }: { id: AppId }) => {
  switch (id) {
    case 'terminal':
      return <Terminal />;
    case 'files':
      return <Files />;
    case 'about':
      return <AboutMe />;
    case 'projects':
      return <Projects />;
    case 'contact':
      return <Contact />;
    case 'editor':
      return <TextEditor />;
    case 'browser':
      return <Browser />;
    case 'resume':
      return <Resume />;
    default:
      return null;
  }
});
WindowContent.displayName = 'WindowContent';

export const WindowManager = () => {
  const windows = useSystemStore((state) => state.windows);
  const containerRef = useRef<HTMLDivElement>(null);

  const openWindows = useMemo(
    () => Object.values(windows).filter((w) => w.isOpen && !w.isMinimized),
    [windows]
  );

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {openWindows.map((window) => (
        <Window key={window.id} id={window.id} title={window.title} constraintsRef={containerRef}>
          <div className="h-full w-full bg-card text-foreground overflow-hidden">
            <WindowContent id={window.id} />
          </div>
        </Window>
      ))}
    </div>
  );
};
