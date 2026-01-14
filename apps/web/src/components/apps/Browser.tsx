'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Lock,
  Star,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useSystemStore } from '@/lib/store';

const DEFAULT_URL = process.env.NEXT_PUBLIC_BROWSER_DEFAULT_URL || 'https://blog.hetav.dev';
const LOAD_TIMEOUT_MS = 5000;

export default function Browser() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [inputValue, setInputValue] = useState(DEFAULT_URL);
  const [history, setHistory] = useState<string[]>([DEFAULT_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
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
      // If still loading after timeout, assume blocked
      if (isLoading) {
        setIsLoading(false);
        setLoadFailed(true);
      }
    }, LOAD_TIMEOUT_MS);
  }, [clearLoadTimeout, isLoading]);

  useEffect(() => {
    startLoadTimeout();
    return clearLoadTimeout;
  }, [url, startLoadTimeout, clearLoadTimeout]);

  const navigateTo = useCallback(
    (newUrl: string) => {
      let finalUrl = newUrl.trim();
      if (finalUrl && !finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }

      if (finalUrl && finalUrl !== url) {
        setUrl(finalUrl);
        setInputValue(finalUrl);
        setIsLoading(true);
        setLoadFailed(false);

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(finalUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    },
    [url, history, historyIndex]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigateTo(inputValue);
    }
  };

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputValue(history[newIndex]);
      setIsLoading(true);
      setLoadFailed(false);
    }
  }, [historyIndex, history]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputValue(history[newIndex]);
      setIsLoading(true);
      setLoadFailed(false);
    }
  }, [historyIndex, history]);

  const refresh = useCallback(() => {
    if (iframeRef.current) {
      setIsLoading(true);
      setLoadFailed(false);
      iframeRef.current.src = url;
    }
  }, [url]);

  const handleIframeLoad = () => {
    clearLoadTimeout();
    setIsLoading(false);
    // Note: onLoad fires even for X-Frame-Options blocked pages in some browsers,
    // but the content will be empty. We use the timeout as a fallback detection.
  };

  const openInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  return (
    <div className="flex flex-col h-full bg-card text-foreground">
      {/* Chrome / Toolbar */}
      <div className="flex items-center space-x-3 p-3 bg-background border-b border-border">
        <div className="flex items-center space-x-1 text-muted-foreground">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={`p-1.5 rounded-full transition-colors ${
              canGoBack ? 'hover:bg-muted cursor-pointer' : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={`p-1.5 rounded-full transition-colors ${
              canGoForward ? 'hover:bg-muted cursor-pointer' : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={18} />
          </button>
          <button onClick={refresh} className="p-1.5 hover:bg-muted rounded-full transition-colors">
            <RotateCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="flex-1 bg-secondary rounded-full px-4 py-1.5 flex items-center space-x-2 text-sm border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Lock size={14} className="text-pine flex-shrink-0" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none focus:outline-none w-full text-foreground"
            placeholder="Enter URL..."
          />
          <Star
            size={14}
            className="text-muted-foreground hover:text-gold cursor-pointer transition-colors flex-shrink-0"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={openInNewTab}
            className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/avatar.png"
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content - overflow-hidden to clip the iframe's scrollbar */}
      <div className="flex-1 relative overflow-hidden bg-card" style={{ colorScheme: theme }}>
        {/* Loading State */}
        {isLoading && !loadFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="flex flex-col items-center gap-3">
              <RotateCw size={32} className="animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          </div>
        )}

        {/* Blocked/Failed State */}
        {loadFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="flex flex-col items-center gap-4 max-w-md text-center px-6">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <ShieldAlert size={40} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground">This site cannot be displayed</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{new URL(url).hostname}</span> refused
                to connect. Many websites block embedding for security reasons.
              </p>
              <button
                onClick={openInNewTab}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} />
                Open in New Tab
              </button>
              <p className="text-xs text-muted-foreground mt-2">
                Try sites like Wikipedia, MDN, or CodePen which allow embedding.
              </p>
            </div>
          </div>
        )}

        {/* Iframe wrapper - hides the iframe's native scrollbar */}
        <div
          className="absolute inset-0 overflow-y-scroll overflow-x-hidden"
          style={{ colorScheme: theme }}
        >
          {/* Iframe - made slightly wider to push its scrollbar outside the visible area */}
          <iframe
            ref={iframeRef}
            src={url}
            onLoad={handleIframeLoad}
            className="border-0 h-full"
            style={{
              width: 'calc(100% + 20px)',
              marginRight: '-20px',
              colorScheme: theme,
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            title="Browser"
          />
        </div>
      </div>
    </div>
  );
}
