'use client';

export default function ResumeViewer() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#525252]">
      <iframe src="/resume.pdf" className="w-full h-full border-0" title="Resume PDF" />
    </div>
  );
}
