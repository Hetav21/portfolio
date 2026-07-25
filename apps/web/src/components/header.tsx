'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
        scrolled ? 'top-3' : 'top-5'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1 rounded-full border border-border/60 px-2 py-1.5 transition-all duration-500',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl shadow-lg shadow-background/20 border-border/80'
            : 'bg-background/50 backdrop-blur-md'
        )}
      >
        {/* Avatar */}
        <Link
          href="/"
          className="flex items-center gap-2 pl-1 pr-2 hover:opacity-80 transition-opacity"
        >
          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-border/60">
            <Image
              src="/avatar.png"
              alt="Hetav Shah"
              fill
              className="object-cover"
              suppressHydrationWarning
            />
          </div>
        </Link>

        {/* Divider */}
        <div className="h-5 w-px bg-border/50" />

        {/* Scrollspy Nav */}
        <nav className="hidden md:flex items-center gap-0.5 px-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative text-xs px-3 py-1.5 rounded-full transition-all duration-300',
                activeSection === item.href.slice(1)
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-5 w-px bg-border/50 hidden md:block" />

        {/* Right side links */}
        <div className="flex items-center gap-0.5 px-1">
          <a
            href={process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.hetav.dev'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-full hover:bg-secondary/50 flex items-center gap-1"
          >
            Blog <ExternalLink size={10} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_DESKTOP_URL || 'https://desktop.hetav.dev'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-full hover:bg-secondary/50 flex items-center gap-1"
          >
            Desktop <ExternalLink size={10} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
