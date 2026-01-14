'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '@/lib/store';
import Image from 'next/image';

export const BootSequence = () => {
  const { isBooting, setBooting } = useSystemStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBooting) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooting(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50); // 2.5s total roughly
    return () => clearInterval(interval);
  }, [isBooting, setBooting]);

  if (!isBooting) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white"
      onClick={() => setBooting(false)} // Skip
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Image
          src="/nixos-logo.svg"
          alt="NixOS Logo"
          width={128}
          height={128}
          className=""
          priority
        />
      </motion.div>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Starting Hetav&apos;s Portfolio...
      </p>
    </motion.div>
  );
};
