'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCw, ExternalLink, Download, FileText } from 'lucide-react';
import { useSystemStore } from '@/lib/store';

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || 'http://localhost:3002';
const LOAD_TIMEOUT_MS = 7000;

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useSystemStore((state) => state.theme);

  const clearLoadTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startLoadTimeout = useCallback(() => {
    clearLoadTimeout();
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setLoadFailed(true);
      }
    }, LOAD_TIMEOUT_MS);
  }, [clearLoadTimeout, isLoading]);

  useEffect(() => {
    startLoadTimeout();
    return clearLoadTimeout;
  }, [startLoadTimeout, clearLoadTimeout]);

  const refresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setLoadFailed(false);
      startLoadTimeout();
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleIframeLoad = () => {
    clearLoadTimeout();
    setIsLoading(false);
    setLoadFailed(false);
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
        {/* Loading State */}
        {isLoading && !loadFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="flex flex-col items-center gap-3">
              <RotateCw size={32} className="animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading Resume...</span>
            </div>
          </div>
        )}

        {/* Blocked/Failed State */}
        {loadFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="flex flex-col items-center gap-4 max-w-md text-center px-6">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <FileText size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">Resume Preview Unavailable</h3>
              <p className="text-sm text-muted-foreground">
                The embedded resume viewer could not be loaded directly. You can view the full CV in
                a new tab or download the PDF.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={openInNewTab}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Open in New Tab
                </button>
                <a
                  href={`${RESUME_URL}/resume.pdf`}
                  download="resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium"
                >
                  <Download size={16} />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden" style={{ colorScheme: theme }}>
          <iframe
            ref={iframeRef}
            src={`${RESUME_URL}/simplified`}
            onLoad={handleIframeLoad}
            className="w-full h-full border-0"
            style={{ colorScheme: theme }}
            sandbox="allow-scripts allow-same-origin allow-forms"
            title="Resume"
          />
        </div>
      </div>
    </div>
  );
}
