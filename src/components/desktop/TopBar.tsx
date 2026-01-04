"use client";

import React, { useState, useEffect } from 'react';
import { useSystemStore } from '@/lib/store';
import { Github, Linkedin, Sun, Moon } from 'lucide-react';
import {
  NetworkWirelessSymbolic,
  AudioVolumeHighSymbolic,
  BatteryFullSymbolic,
  SystemShutdownSymbolic,
} from '@/components/icons/GnomeIcons';

export const TopBar = () => {
  const { toggleTheme, theme, setBooting } = useSystemStore();
  const [time, setTime] = useState<string>('');
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      setTime(`${dateStr} ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-card/95 text-foreground flex items-center justify-between px-4 z-50 select-none backdrop-blur-sm border-b border-border shadow-md text-sm font-medium">
      {/* Left: Activities */}
      <button className="px-3 py-1 rounded-full hover:bg-muted transition-colors duration-200">
        Activities
      </button>

      {/* Center: Clock */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="cursor-default">{time}</span>
      </div>

      {/* Right: System Tray */}
      <div className="flex items-center gap-2">
        {/* Social Links */}
        <div className="flex items-center gap-1 mr-1 border-r border-border pr-3">
          <a 
            href="https://github.com/Hetav21" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 opacity-80 hover:opacity-100 hover:bg-muted/50 rounded-full transition-all duration-150"
            title="GitHub"
          >
            <Github width={15} height={15} strokeWidth={1.75} />
          </a>
          <a 
            href="https://www.linkedin.com/in/hetav2106/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 opacity-80 hover:opacity-100 hover:bg-muted/50 rounded-full transition-all duration-150"
            title="LinkedIn"
          >
            <Linkedin width={15} height={15} strokeWidth={1.75} />
          </a>
        </div>

        {/* Theme Toggle - lucide-react icons */}
        <button 
          onClick={toggleTheme}
          className="p-1.5 opacity-80 hover:opacity-100 hover:bg-muted/50 rounded-full transition-all duration-150"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Moon width={15} height={15} strokeWidth={1.75} />
          ) : (
            <Sun width={15} height={15} strokeWidth={1.75} />
          )}
        </button>

        {/* Status Icons Group - GNOME symbolic icons with grouped hover */}
        <button 
          className="flex items-center gap-3 px-3 py-1 opacity-80 hover:opacity-100 hover:bg-muted/50 rounded-full transition-all duration-150"
          title="System Status"
        >
          <NetworkWirelessSymbolic width={14} height={14} />
          <AudioVolumeHighSymbolic width={14} height={14} />
          <BatteryFullSymbolic width={14} height={14} />
        </button>

        {/* Power Menu - GNOME symbolic icon */}
        <div className="relative">
          <button 
            onClick={() => setIsPowerMenuOpen(!isPowerMenuOpen)}
            className="p-1.5 opacity-80 hover:opacity-100 hover:bg-muted/50 rounded-full transition-all duration-150"
          >
            <SystemShutdownSymbolic width={15} height={15} />
          </button>

          {isPowerMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsPowerMenuOpen(false)} 
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-50 py-1">
                <button
                  onClick={() => setBooting(true)}
                  className="w-full text-left px-4 py-2 hover:bg-muted flex items-center gap-2 text-destructive"
                >
                  <SystemShutdownSymbolic width={14} height={14} />
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
