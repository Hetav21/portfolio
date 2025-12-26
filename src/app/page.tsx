"use client";
import { useState, useEffect } from 'react';
import { BootSequence } from '@/components/boot/BootSequence';
import { Desktop } from '@/components/desktop/Desktop';
import { MobileFallback } from '@/components/mobile/MobileFallback';
import { useSystemStore } from '@/lib/store';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const isBooting = useSystemStore(state => state.isBooting);
  const theme = useSystemStore(state => state.theme);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [forceDesktop, setForceDesktop] = useState(false);

  useEffect(() => {
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

  // Show mobile fallback only after mount to avoid hydration mismatch
  if (isMounted && isMobile && !forceDesktop) {
    return <MobileFallback onContinue={() => setForceDesktop(true)} />;
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-background font-sans">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </main>
  );
}
