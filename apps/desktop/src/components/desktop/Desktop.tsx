'use client';

import React from 'react';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { WindowManager } from '../window/WindowManager';

export const Desktop = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/wallpaper.jpeg')" }}
      />

      {/* Desktop Shell */}
      <TopBar />

      {/* Window Manager Area */}
      <div className="absolute inset-0 pt-8 pb-20 z-0">
        <WindowManager />
      </div>

      <Dock />
    </div>
  );
};
