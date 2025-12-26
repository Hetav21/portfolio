"use client";

import React, { useState, useEffect } from 'react';
import { useSystemStore } from '@/lib/store';
import { 
  Wifi, 
  Volume2, 
  Battery, 
  Power, 
  Github, 
  Linkedin, 
  Sun, 
  Moon 
} from 'lucide-react';

export const TopBar = () => {
  const { toggleTheme, theme, setBooting } = useSystemStore();
  const [time, setTime] = useState<string>('');
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false
      }).replace(':', ' ')); // GNOME style often uses space or just HH:MM
      // Let's stick to standard format for clarity: MMM d HH:mm
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      setTime(`${dateStr} ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-[#1a1b26]/95 text-white flex items-center justify-between px-4 z-50 select-none backdrop-blur-sm border-b border-white/5 shadow-md text-sm font-medium">
      {/* Left: Activities */}
      <button className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors duration-200">
        Activities
      </button>

      {/* Center: Clock */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="cursor-default">{time}</span>
      </div>

      {/* Right: System Tray */}
      <div className="flex items-center gap-3">
        {/* Social Links */}
        <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-4">
          <a 
            href="https://github.com/Hetav21" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a 
            href="https://www.linkedin.com/in/hetav2106/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Status Icons */}
        <div className="flex items-center gap-2 px-2">
          <Wifi size={16} />
          <Volume2 size={16} />
          <Battery size={16} />
        </div>

        {/* Power Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsPowerMenuOpen(!isPowerMenuOpen)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <Power size={16} />
          </button>

          {isPowerMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsPowerMenuOpen(false)} 
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#2d2e3b] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 py-1">
                <button
                  onClick={() => setBooting(true)}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-2 text-red-400"
                >
                  <Power size={14} />
                  Restart System
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
