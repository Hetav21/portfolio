'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ExternalLink, Download } from 'lucide-react';
import { useSystemStore } from '@/lib/store';

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || 'http://localhost:3002';

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const theme = useSystemStore((state) => state.theme);

  const refresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const openInNewTab = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full bg-card text-foreground">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-background border-b border-border">
        <div className="flex items-center space-x-2">
          <span className="font-medium px-2">Resume</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={refresh}
            className="p-1.5 hover:bg-muted rounded-full transition-colors"
            title="Refresh"
          >
            <RotateCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={openInNewTab}
            className="p-1.5 hover:bg-muted rounded-full transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
          <a
            href={`${RESUME_URL}/resume.pdf`}
            download="resume.pdf"
            className="p-1.5 hover:bg-muted rounded-full transition-colors"
            title="Download PDF"
          >
            <Download size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden bg-card" style={{ colorScheme: theme }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="flex flex-col items-center gap-3">
              <RotateCw size={32} className="animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading Resume...</span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden" style={{ colorScheme: theme }}>
          <iframe
            ref={iframeRef}
            src={`${RESUME_URL}/simplified`}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0"
            style={{ colorScheme: theme }}
            title="Resume"
          />
        </div>
      </div>
    </div>
  );
}
