'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Sort by intersection ratio and get the top one
          visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -40% 0px', threshold: 0.2 }
    );

    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
            <Image
              src="/avatar.png"
              alt="Hetav Shah"
              fill
              className="object-cover"
              suppressHydrationWarning
            />
          </div>
          <span className="hidden md:inline-block">Hetav Shah</span>
        </Link>

        {/* Scrollspy Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm transition-colors hover:text-primary',
                activeSection === item.href.slice(1)
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side links */}
        <div className="flex items-center gap-3">
          <a
            href={process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.hetav.dev'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Blog <ExternalLink size={14} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_DESKTOP_URL || 'https://desktop.hetav.dev'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Desktop <ExternalLink size={14} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
