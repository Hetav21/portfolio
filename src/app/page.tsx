"use client";
import { BootSequence } from '@/components/boot/BootSequence';
import { useSystemStore } from '@/lib/store';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const isBooting = useSystemStore(state => state.isBooting);

  return (
    <main className="h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence>
        {isBooting && <BootSequence key="boot" />}
      </AnimatePresence>
      {!isBooting && (
        <div className="h-full w-full">
           {/* Desktop Component will go here */}
           <div className="flex items-center justify-center h-full">Desktop Placeholder</div>
        </div>
      )}
    </main>
  );
}
