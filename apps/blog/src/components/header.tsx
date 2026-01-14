import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
            <Image src="/avatar.png" alt="Avatar" fill className="object-cover" />
          </div>
          <span>Hetav's Blog</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
