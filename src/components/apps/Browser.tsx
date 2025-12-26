"use client";

import React from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Lock, Star, Search } from 'lucide-react';

export default function Browser() {
  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] text-gray-200">
      {/* Chrome / Toolbar */}
      <div className="flex items-center space-x-3 p-3 bg-[#181825] border-b border-white/5">
        <div className="flex items-center space-x-1 text-gray-400">
             <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <ChevronLeft size={18} />
             </button>
             <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <ChevronRight size={18} />
             </button>
             <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <RotateCw size={16} />
             </button>
        </div>
        
        <div className="flex-1 bg-[#313244] rounded-full px-4 py-1.5 flex items-center space-x-2 text-sm border border-transparent focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <Lock size={14} className="text-green-500" />
            <input 
                type="text" 
                value="https://hetav.dev" 
                readOnly
                className="bg-transparent border-none focus:outline-none w-full text-gray-300"
            />
            <Star size={14} className="text-gray-500 hover:text-yellow-400 cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                HS
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-[#1e1e2e]">
             <div className="w-24 h-24 mb-6 rounded-full bg-[#313244] flex items-center justify-center">
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
