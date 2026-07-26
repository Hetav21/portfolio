'use client';

import { useState } from 'react';
import { Rss, Check } from 'lucide-react';

export function RssCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('https://blog.hetav.dev/rss');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      aria-label="Copy RSS Feed URL"
    >
      <div className="relative flex items-center justify-center w-3.5 h-3.5">
        <Rss
          size={14}
          className={`absolute transition-all duration-300 ease-in-out ${
            copied ? 'scale-50 opacity-0 -rotate-45' : 'scale-100 opacity-100 rotate-0'
          }`}
        />
        <Check
          size={14}
          className={`absolute text-green-500 transition-all duration-300 ease-in-out ${
            copied ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-45'
          }`}
        />
      </div>

      <span className={`transition-colors duration-300 ${copied ? 'text-green-500' : ''}`}>
        {copied ? 'Copied!' : 'RSS'}
      </span>

      {/* Animated tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-foreground text-background text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg">
        Copy Feed URL
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"></div>
      </div>
    </button>
  );
}
