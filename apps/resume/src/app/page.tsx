'use client';

import { ExternalLink, Download } from 'lucide-react';

export default function ResumeViewer() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#525252]">
      {/* Mobile Fallback Banner for direct viewing */}
      <div className="flex sm:hidden items-center justify-between px-4 py-2.5 bg-[#333333] text-white text-xs z-10 border-b border-[#444444] shadow-sm">
        <span className="font-medium text-[#cdd6f4]">Resume.pdf</span>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#89b4fa] font-medium hover:underline"
          >
            <span>Open PDF</span>
            <ExternalLink size={13} />
          </a>
          <a
            href="/resume.pdf"
            download="resume.pdf"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#eb6f92] text-white rounded font-semibold hover:bg-[#d46483] transition-colors"
          >
            <Download size={13} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Full native iframe viewer */}
      <div className="flex-1 w-full h-full">
        <iframe src="/resume.pdf" className="w-full h-full border-0" title="Resume PDF" />
      </div>
    </div>
  );
}
