"use client";

import React from 'react';
import { useSystemStore } from '@/lib/store';

export default function TextEditor() {
  const content = useSystemStore((state) => state.editorContent);
  const lines = (content || '// No file open').split('\n');

  return (
    <div className="h-full bg-card text-foreground flex flex-col font-mono text-sm">
      <div className="flex-1 overflow-auto flex">
        {/* Line Numbers */}
        <div className="py-4 px-3 bg-card text-muted-foreground text-right select-none border-r border-border min-w-[3rem]">
            {lines.map((_, i) => (
                <div key={i} className="leading-6">{i + 1}</div>
            ))}
        </div>
        
        {/* Content */}
        <div className="py-4 px-4 flex-1 overflow-auto">
             {lines.map((line, i) => (
                <div key={i} className="leading-6 whitespace-pre min-w-max">
                    {line}
                </div>
            ))}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-8 bg-background flex items-center px-4 text-xs text-muted-foreground justify-between border-t border-border">
        <div className="flex items-center space-x-4">
            <span>NORMAL</span>
            <span>master*</span>
        </div>
        <div className="flex items-center space-x-4">
            <span>UTF-8</span>
            <span>TypeScript</span>
            <span>Ln {lines.length}, Col 1</span>
        </div>
      </div>
    </div>
  );
}
