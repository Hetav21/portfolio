import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 | Page Not Found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="space-y-1">
        <p className="text-muted-foreground text-xs tracking-widest uppercase">Error 404</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-primary text-2xl font-bold select-none">&gt;_</span>
          <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
        </div>
      </div>

      <div className="border border-border rounded-lg px-5 py-3 bg-card text-left w-full max-w-sm space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="text-primary">~</span>{' '}
          <span className="text-foreground">find . -name &quot;this-post&quot;</span>
        </p>
        <p className="pl-2">find: No such file or directory</p>
        <p>
          <span className="text-primary">~</span>{' '}
          <span className="text-foreground animate-pulse">▌</span>
        </p>
      </div>

      <p className="text-muted-foreground text-sm max-w-xs">
        This post doesn&apos;t exist or has been removed.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
      >
        <span className="text-primary">&gt;_</span>
        Back to blog
      </Link>
    </div>
  );
}
