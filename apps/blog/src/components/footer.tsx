import { RssCopyButton } from './rss-copy-button';

export function Footer() {
  const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://www.hetav.dev';

  return (
    <footer className="w-full border-t border-border py-8 mt-16 bg-background">
      <div className="max-w-screen-md mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Hetav Shah</p>
        <div className="flex items-center gap-6">
          <a href={mainSiteUrl} className="hover:text-foreground transition-colors font-medium">
            Portfolio
          </a>
          <a
            href="https://github.com/Hetav21"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/hetav2106/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <RssCopyButton />
        </div>
      </div>
    </footer>
  );
}
