"use client";
import { BootSequence } from '@/components/boot/BootSequence';
import { Desktop } from '@/components/desktop/Desktop';
import { useSystemStore } from '@/lib/store';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const isBooting = useSystemStore(state => state.isBooting);

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
