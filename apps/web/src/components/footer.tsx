import { RssCopyButton } from './rss-copy-button';

export function Footer() {
  return (
    <footer className="relative z-10 w-full mt-20 py-8">
      {/* Gradient separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

      <div className="max-w-screen-md mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <div className="flex-1 w-full flex justify-center md:justify-start">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Hetav Shah</p>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/Hetav21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/hetav2106/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@hetav.dev"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Email
          </a>
        </div>

        <div className="flex-1 w-full flex justify-center md:justify-end">
          <RssCopyButton />
        </div>
      </div>
    </footer>
  );
}
