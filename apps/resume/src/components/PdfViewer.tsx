'use client';

import { useState, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';

// Configure worker to use the local file in public directory for better performance/reliability
// Fallback to unpkg if needed, but local is preferred.
// We copied it earlier to public/pdf.worker.min.mjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  simplified?: boolean;
}

export default function PdfViewer({ simplified = false }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(() => (simplified ? 1.0 : 1.2));
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

  // Reset scale when mode changes
  useEffect(() => {
    if (simplified) {
      setScale(1.0);
    } else {
      setScale(1.2);
    }
  }, [simplified]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const containerStyle = useMemo(
    () => (simplified ? {} : { display: 'flex' as const, justifyContent: 'center' as const }),
    [simplified]
  );

  return (
    <div
      className={`flex flex-col items-center ${simplified ? 'w-full' : 'w-full min-h-screen bg-[#525252]'}`}
    >
      {/* Toolbar - Only visible in full mode */}
      {!simplified && (
        <div className="sticky top-0 z-50 w-full bg-[#333] text-white shadow-md p-4 flex justify-between items-center mb-8">
          <div className="font-semibold text-lg">Resume.pdf</div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#444] rounded-lg p-1">
              <button
                onClick={zoomOut}
                className="p-2 hover:bg-[#555] rounded-md transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <span className="px-3 text-sm min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="p-2 hover:bg-[#555] rounded-md transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
            </div>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-[#eb6f92] text-white rounded-lg hover:bg-[#d46483] transition-colors"
            >
              <Download size={18} />
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
          <div className="flex flex-col items-center justify-center h-96 text-white gap-3">
            <Loader2 size={32} className="animate-spin" />
            <p>Loading PDF...</p>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-96 text-[#eb6f92]">
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
