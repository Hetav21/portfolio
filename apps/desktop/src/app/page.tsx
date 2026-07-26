'use client';
import { useState, useEffect } from 'react';
import { BootSequence } from '@/components/boot/BootSequence';
import dynamic from 'next/dynamic';
import { useSystemStore } from '@/lib/store';
import { AnimatePresence } from 'framer-motion';

const Desktop = dynamic(() => import('@/components/desktop/Desktop').then((mod) => mod.Desktop), {
  ssr: false,
});

export default function Home() {
  const isBooting = useSystemStore((state) => state.isBooting);
  const theme = useSystemStore((state) => state.theme);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync theme to document
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    if (isMounted && isMobile) {
      window.location.assign(process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://hetav.dev');
    }
  }, [isMounted, isMobile]);

  // Redirect to mobile-friendly portfolio if on mobile
  if (isMounted && isMobile) {
    return null;
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-background font-sans">
      <h1 className="sr-only">Hetav Shah | Associate AI Engineer Portfolio</h1>
      <AnimatePresence mode="wait">
        {isBooting ? <BootSequence key="boot" /> : <Desktop key="desktop" />}
      </AnimatePresence>
    </main>
  );
}
