'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';

// Configure worker to use the local file in public directory for better performance/reliability
// Fallback to unpkg if needed, but local is preferred.
// We copied it earlier to public/pdf.worker.min.mjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const SIMPLIFIED_STYLE = {};
const FULL_STYLE = { display: 'flex', justifyContent: 'center' };

interface PdfViewerProps {
  simplified?: boolean;
}

export default function PdfViewer({ simplified = false }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  // Handle container width on resize
  useEffect(() => {
    function updateWidth() {
      if (simplified) {
        setContainerWidth(window.innerWidth);
      } else {
        const maxWidth = 1000;
        const margin = 40;
        const availableWidth = window.innerWidth - margin;
        setContainerWidth(Math.min(availableWidth, maxWidth));
      }
    }

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [simplified]);

  // Set initial scale based on mode
  useEffect(() => {
    if (simplified) {
      // Fit width in simplified mode
      setScale(1.0); // We'll rely on page width calculation in simplified
    } else {
      // Slightly larger default for root view
      setScale(1.2);
    }
  }, [simplified]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const containerStyle = simplified ? SIMPLIFIED_STYLE : FULL_STYLE;

  return (
    <div
      className={`flex flex-col items-center ${simplified ? 'w-full' : 'w-full min-h-screen bg-slate-900'}`}
    >
      {/* Toolbar - Only visible in full mode */}
      {!simplified && (
        <div className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur border-b border-slate-800 text-slate-100 shadow-md px-6 py-3 flex justify-between items-center mb-8">
          <div className="font-medium text-sm tracking-wide text-slate-200">Resume.pdf</div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-800/80 border border-slate-700/60 rounded-lg p-1">
              <button
                onClick={zoomOut}
                className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={18} />
              </button>
              <span className="px-3 text-xs font-medium min-w-[3.5rem] text-center text-slate-300">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500 shadow-sm transition-colors"
            >
              <Download size={16} />
              <span>Download</span>
            </a>
          </div>
        </div>
      )}

      {/* PDF Document */}
      <Document
        file="/resume.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        className={simplified ? 'w-full' : 'shadow-2xl'}
        loading={
          <div className="flex flex-col items-center justify-center h-96 text-slate-300 gap-3">
            <Loader2 size={32} className="animate-spin text-indigo-400" />
            <p>Loading PDF...</p>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-96 text-rose-400 font-medium">
            Failed to load PDF.
          </div>
        }
      >
        {!!numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <div
              key={`page_${index + 1}`}
              className={simplified ? 'w-full' : 'mb-8'}
              style={containerStyle}
            >
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={simplified ? containerWidth : undefined}
                scale={simplified ? 1.0 : scale}
                className="bg-white"
              />
            </div>
          ))}
      </Document>
    </div>
  );
}
