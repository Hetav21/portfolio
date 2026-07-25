export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-20 py-8">
      <div className="max-w-screen-md mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Hetav Shah</p>

        <div className="flex items-center gap-6">
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
            href="mailto:shahhetav2106@gmail.com"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Email
          </a>
          <a
            href="https://blog.hetav.dev/rss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
