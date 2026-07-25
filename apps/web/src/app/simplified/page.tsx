'use client';

import dynamic from 'next/dynamic';

// Explicitly type the props for the dynamic component
const PdfViewer = dynamic<{ simplified?: boolean }>(() => import('../../components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#525252] flex justify-center p-8">Loading...</div>
  ),
});

export default function SimplifiedResume() {
  // Simplified view: Native feel, no padding, just the PDF
  return (
    <div className="min-h-screen bg-[#525252] w-full overflow-y-auto">
      <PdfViewer simplified={true} />
    </div>
  );
}
