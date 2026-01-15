'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useDragControls, PanInfo, useMotionValue, animate } from 'framer-motion';
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

export const Window = ({ id, title, children, constraintsRef }: WindowProps) => {
  const windowState = useSystemStore((state) => state.windows[id]);
  const { focusWindow, updateWindowPosition, closeWindow, minimizeWindow, maximizeWindow, theme } =
    useSystemStore((state) => ({
      focusWindow: state.focusWindow,
      updateWindowPosition: state.updateWindowPosition,
      closeWindow: state.closeWindow,
      minimizeWindow: state.minimizeWindow,
      maximizeWindow: state.maximizeWindow,
      theme: state.theme,
    }));

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

  useEffect(() => {
    if (!windowState) return;

    const duration = isFirstRender.current ? 0 : 0.2;
    isFirstRender.current = false;

    if (isMaximized) {
      animate(motionX, 0, { duration });
      animate(motionY, TOPBAR_HEIGHT, { duration });
      animate(motionWidth, window.innerWidth, { duration });
      animate(motionHeight, window.innerHeight - TOPBAR_HEIGHT, { duration });
    } else {
      const restoreDuration = prevMaximized.current ? duration : 0;
      animate(motionX, position.x, { duration: restoreDuration });
      animate(motionY, position.y, { duration: restoreDuration });
      animate(motionWidth, size.width, { duration: restoreDuration });
      animate(motionHeight, size.height, { duration: restoreDuration });
    }

    prevMaximized.current = isMaximized;
  }, [
    windowState,
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

  const style = useMemo(() => ({ colorScheme: theme }), [theme]);

  if (!windowState) return null;

  const handleFocus = () => {
    focusWindow(id);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMaximized) {
      const newX = position.x + info.offset.x;
      const newY = position.y + info.offset.y;
      updateWindowPosition(id, { x: newX, y: newY });
      motionX.set(newX);
      motionY.set(newY);
    }
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={handleDragEnd}
      onPointerDown={handleFocus}
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
        className="flex h-10 items-center justify-between bg-secondary px-3 select-none"
        onPointerDown={(e) => {
          handleFocus();
          if (!isMaximized) dragControls.start(e);
        }}
        onDoubleClick={() => maximizeWindow(id)}
      >
        <div className="flex gap-2 items-center w-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#eb6f92] text-[#4c0002] hover:bg-[#eb6f92]/80"
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
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#f6c177] text-[#4c2f00] hover:bg-[#f6c177]/80"
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
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#9ccfd8] text-[#004d16] hover:bg-[#9ccfd8]/80"
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

        <div className="flex-1 text-center text-sm font-medium text-muted-foreground pointer-events-none">
          {title}
        </div>

        <div className="w-20" />
      </div>

      <div
        className="flex-1 overflow-auto bg-card p-1 cursor-default"
        style={style}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
};
