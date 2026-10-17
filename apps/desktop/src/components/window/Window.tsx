'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion, useDragControls, useMotionValue, animate } from 'framer-motion';
import { Minus, X, Maximize2, Minimize2 } from 'lucide-react';
import { useSystemStore } from '@/lib/store';
import { AppId } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WindowProps {
  id: AppId;
  title: string;
  children: React.ReactNode;
  constraintsRef?: React.RefObject<Element | null>;
}

const TOPBAR_HEIGHT = 32;
const ANIM_EASE = [0.16, 1, 0.3, 1] as const;

export const Window = ({ id, title, children, constraintsRef }: WindowProps) => {
  const windowState = useSystemStore((state) => state.windows[id]);
  const focusWindow = useSystemStore((state) => state.focusWindow);
  const updateWindowPosition = useSystemStore((state) => state.updateWindowPosition);
  const closeWindow = useSystemStore((state) => state.closeWindow);
  const minimizeWindow = useSystemStore((state) => state.minimizeWindow);
  const maximizeWindow = useSystemStore((state) => state.maximizeWindow);
  const theme = useSystemStore((state) => state.theme);

  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  const motionX = useMotionValue(windowState?.position.x ?? 0);
  const motionY = useMotionValue(windowState?.position.y ?? 0);
  const motionWidth = useMotionValue(windowState?.size.width ?? 800);
  const motionHeight = useMotionValue(windowState?.size.height ?? 600);

  const isFirstRender = useRef(true);
  const prevMaximized = useRef(windowState?.isMaximized ?? false);

  const isMaximized = windowState?.isMaximized ?? false;
  const zIndex = windowState?.zIndex ?? 0;
  const position = windowState?.position ?? { x: 0, y: 0 };
  const size = windowState?.size ?? { width: 800, height: 600 };
  const hasState = Boolean(windowState);

  useEffect(() => {
    if (!hasState) return;

    const duration = isFirstRender.current ? 0 : 0.28;
    isFirstRender.current = false;

    if (isMaximized) {
      animate(motionX, 0, { duration, ease: ANIM_EASE });
      animate(motionY, TOPBAR_HEIGHT, { duration, ease: ANIM_EASE });
      animate(motionWidth, window.innerWidth, { duration, ease: ANIM_EASE });
      animate(motionHeight, window.innerHeight - TOPBAR_HEIGHT, { duration, ease: ANIM_EASE });
    } else if (prevMaximized.current) {
      // Only animate on restoration from maximized
      animate(motionX, position.x, { duration, ease: ANIM_EASE });
      animate(motionY, position.y, { duration, ease: ANIM_EASE });
      animate(motionWidth, size.width, { duration, ease: ANIM_EASE });
      animate(motionHeight, size.height, { duration, ease: ANIM_EASE });
    }

    prevMaximized.current = isMaximized;
  }, [
    hasState,
    isMaximized,
    position.x,
    position.y,
    size.width,
    size.height,
    motionX,
    motionY,
    motionWidth,
    motionHeight,
  ]);

  // Keep maximized window synced with browser viewport resize
  useEffect(() => {
    if (!isMaximized) return;

    const handleResize = () => {
      motionWidth.set(window.innerWidth);
      motionHeight.set(window.innerHeight - TOPBAR_HEIGHT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMaximized, motionWidth, motionHeight]);

  const style = useMemo(() => ({ colorScheme: theme }), [theme]);

  if (!windowState) return null;

  const handleFocus = () => {
    focusWindow(id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!isMaximized) {
      // Clamp to screen boundaries so the window never gets pushed offscreen
      const currentX = motionX.get();
      const currentY = motionY.get();
      const clampedX = Math.max(0, Math.min(currentX, Math.max(0, window.innerWidth - 120)));
      const clampedY = Math.max(
        TOPBAR_HEIGHT,
        Math.min(currentY, Math.max(TOPBAR_HEIGHT, window.innerHeight - 80))
      );

      updateWindowPosition(id, { x: clampedX, y: clampedY });
      motionX.set(clampedX);
      motionY.set(clampedY);
    }
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onPointerDown={handleFocus}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18, ease: 'easeIn' } }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        x: motionX,
        y: motionY,
        width: motionWidth,
        height: motionHeight,
        zIndex,
      }}
      className={cn(
        'flex flex-col overflow-hidden bg-card text-card-foreground shadow-2xl transition-shadow pointer-events-auto',
        isMaximized ? 'rounded-none' : 'rounded-xl border border-border'
      )}
    >
      <div
        className="relative flex h-10 items-center bg-secondary px-3 select-none cursor-move"
        onPointerDown={(e) => {
          handleFocus();
          if (!isMaximized) {
            setIsDragging(true);
            dragControls.start(e);
          }
        }}
        onDoubleClick={() => {
          // Disable double-click maximize on mobile
          if (window.innerWidth >= 768) {
            maximizeWindow(id);
          }
        }}
      >
        {/* Buttons Container */}
        <div className="flex gap-2 items-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#eb6f92] text-[#4c0002] hover:bg-[#eb6f92]/80 cursor-pointer"
            aria-label="Close window"
          >
            <X
              size={8}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              strokeWidth={3}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            className="group hidden md:flex h-3 w-3 items-center justify-center rounded-full bg-[#f6c177] text-[#4c2f00] hover:bg-[#f6c177]/80 cursor-pointer"
            aria-label="Minimize window"
          >
            <Minus
              size={8}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              strokeWidth={3}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(id);
            }}
            className="group hidden md:flex h-3 w-3 items-center justify-center rounded-full bg-[#9ccfd8] text-[#004d16] hover:bg-[#9ccfd8]/80 cursor-pointer"
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
          >
            {isMaximized ? (
              <Minimize2
                size={8}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            ) : (
              <Maximize2
                size={8}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            )}
          </button>
        </div>

        {/* Centered Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>
      </div>

      <div
        className="flex-1 relative overflow-auto bg-card p-1 cursor-default"
        style={style}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Invisible shield to prevent embedded iframes from stealing pointer events during drag */}
        {isDragging && <div className="absolute inset-0 z-30 pointer-events-auto cursor-move" />}
        {children}
      </div>
    </motion.div>
  );
};
