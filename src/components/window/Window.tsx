"use client";

import React from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
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
  const { windows, focusWindow, updateWindowPosition, closeWindow, minimizeWindow, maximizeWindow, theme } = useSystemStore();
  const windowState = windows[id];
  const dragControls = useDragControls();
  const lastPointerDownTime = React.useRef<number>(0);
  const dragStartTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  
  if (!windowState) return null;

  const { isMaximized, zIndex, position, size } = windowState;

  const handleFocus = () => {
    focusWindow(id);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMaximized) {
        updateWindowPosition(id, {
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
        });
    }
  };

  // When maximized, use fixed pixel values based on viewport to avoid animation interpolation issues
  const windowStyle = isMaximized ? {
    x: 0,
    y: TOPBAR_HEIGHT,
    width: '100vw',
    height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
  } : {
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height,
  };

  const handleTitleBarPointerDown = (e: React.PointerEvent) => {
    handleFocus();
    if (isMaximized) return;

    const now = Date.now();
    const timeSinceLastClick = now - lastPointerDownTime.current;
    lastPointerDownTime.current = now;

    // If this might be the second click of a double-click (within 300ms), don't start drag
    // The double-click handler will fire instead
    if (timeSinceLastClick < 300) {
      return;
    }

    // Delay drag start slightly to allow double-click detection
    // This prevents drag from interfering with maximize animation
    dragStartTimeout.current = setTimeout(() => {
      dragControls.start(e);
    }, 150);
  };

  const handleTitleBarDoubleClick = () => {
    // Cancel any pending drag start
    if (dragStartTimeout.current) {
      clearTimeout(dragStartTimeout.current);
      dragStartTimeout.current = null;
    }
    maximizeWindow(id);
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
      initial={false}
      animate={{
        ...windowStyle,
        zIndex: zIndex,
      }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
      }}
      className={cn(
        "flex flex-col overflow-hidden bg-card text-card-foreground shadow-2xl transition-shadow pointer-events-auto",
        isMaximized ? "rounded-none" : "rounded-xl border border-border"
      )}
    >
      <div 
        className="flex h-10 items-center justify-between bg-secondary px-3 select-none"
        onPointerDown={handleTitleBarPointerDown}
        onDoubleClick={handleTitleBarDoubleClick}
      >
        <div className="flex gap-2 items-center w-20">
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#eb6f92] text-[#4c0002] hover:bg-[#eb6f92]/80"
          >
             <X size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#f6c177] text-[#4c2f00] hover:bg-[#f6c177]/80"
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#9ccfd8] text-[#004d16] hover:bg-[#9ccfd8]/80"
          >
             {isMaximized ? (
                 <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
             ) : (
                 <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
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
        style={{ colorScheme: theme }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
};
