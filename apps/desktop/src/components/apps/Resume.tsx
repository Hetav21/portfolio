'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Download, ExternalLink, RotateCw, Loader2, FileText } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure pdfjs worker to use local public asset
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const RESUME_DOWNLOAD_URL = '/resume.pdf';
const EXTERNAL_RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || 'https://cv.hetav.dev';

export default function Resume() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-fit initial scale on mobile/small viewports
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width < 650) {
          setScale(Math.max(0.55, Math.min(1.0, (width - 40) / 600)));
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.15, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.5));
  const resetZoom = () => setScale(1.0);

  const openInNewTab = () => {
    window.open(EXTERNAL_RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full bg-card text-foreground">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-background border-b border-border select-none">
        <div className="flex items-center space-x-2">
          <span className="font-medium px-2 text-sm">Resume.pdf</span>
          {numPages && (
            <span className="text-xs text-muted-foreground">
              ({numPages} {numPages === 1 ? 'page' : 'pages'})
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={zoomOut}
            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs text-muted-foreground min-w-[3rem] text-center font-mono">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={resetZoom}
            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RotateCw size={16} />
          </button>
          <div className="h-4 w-px bg-border mx-1" />
          <button
            onClick={openInNewTab}
            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
            title="Open in new tab"
            aria-label="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
          <a
            href={RESUME_DOWNLOAD_URL}
            download="Hetav_Shah_Resume.pdf"
            className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
            title="Download PDF"
            aria-label="Download PDF"
          >
            <Download size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-muted/30 p-6 flex flex-col items-center gap-6"
      >
        <Document
          file="/resume.pdf"
          onLoadSuccess={({ numPages: total }) => setNumPages(total)}
          loading={
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 size={32} className="animate-spin text-primary" />
              <p className="text-sm">Loading Resume...</p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-destructive max-w-sm text-center">
              <FileText size={36} />
              <p className="text-sm font-medium">Failed to load Resume PDF.</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={openInNewTab}
                  className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:opacity-90"
                >
                  Open in New Tab
                </button>
                <a
                  href={RESUME_DOWNLOAD_URL}
                  download="Hetav_Shah_Resume.pdf"
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md hover:bg-muted"
                >
                  Download PDF
                </a>
              </div>
            </div>
          }
        >
          {numPages &&
            Array.from(new Array(numPages), (_, i) => (
              <div
                key={`page_${i + 1}`}
                className="shadow-xl rounded overflow-hidden border border-border/40 bg-white"
              >
                <Page
                  pageNumber={i + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="bg-white"
                />
              </div>
            ))}
        </Document>
      </div>
    </div>
  );
}
