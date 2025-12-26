"use client";

import React from 'react';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { WindowManager } from '../window/WindowManager';

export const Desktop = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#1a1b26] via-[#2d2e3b] to-[#3b2d4a]">
      {/* Background Image / Gradient - NixOS Theme */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('/nixos-logo.svg')] bg-no-repeat bg-center bg-contain opacity-5 mix-blend-overlay" />
      
      {/* Desktop Shell */}
      <TopBar />
      
      {/* Window Manager Area (Z-0 to allow windows to be below topbar/dock if needed, but usually windows are between) */}
      <div className="absolute inset-0 pt-8 pb-20 z-0">
        <WindowManager />
      </div>

      <Dock />
    </div>
  );
};
