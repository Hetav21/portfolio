"use client";

import React from 'react';
import Image from 'next/image';
import { RotateCw, ChevronLeft, ChevronRight, Lock, Star, Search } from 'lucide-react';

export default function Browser() {
  return (
    <div className="flex flex-col h-full bg-card text-foreground">
      {/* Chrome / Toolbar */}
      <div className="flex items-center space-x-3 p-3 bg-background border-b border-border">
        <div className="flex items-center space-x-1 text-muted-foreground">
             <button className="p-1.5 hover:bg-muted rounded-full transition-colors">
                <ChevronLeft size={18} />
             </button>
             <button className="p-1.5 hover:bg-muted rounded-full transition-colors">
                <ChevronRight size={18} />
             </button>
             <button className="p-1.5 hover:bg-muted rounded-full transition-colors">
                <RotateCw size={16} />
             </button>
        </div>
        
        <div className="flex-1 bg-secondary rounded-full px-4 py-1.5 flex items-center space-x-2 text-sm border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Lock size={14} className="text-pine" />
            <input 
                type="text" 
                value="https://hetav.dev" 
                readOnly
                className="bg-transparent border-none focus:outline-none w-full text-foreground"
            />
            <Star size={14} className="text-muted-foreground hover:text-gold cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center space-x-2">
             <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                    src="/avatar.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                />
             </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-card">
             <div className="w-24 h-24 mb-6 rounded-full bg-secondary flex items-center justify-center">
                <Search size={40} className="opacity-50" />
             </div>
             <h3 className="text-xl font-medium mb-2">Browser content would load here</h3>
             <p className="max-w-md text-center text-sm opacity-70">
                In a real environment, this would be an iframe or a complex web view component. 
                For security reasons, actual browsing is disabled in this demo.
             </p>
        </div>
      </div>
    </div>
  );
}
