"use client";

import React from 'react';
import { Monitor, Cpu, Box, Github, Linkedin, Globe } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="h-full bg-[#1e1e2e] text-gray-200 overflow-auto p-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-4">
                HS
            </div>
            <h1 className="text-2xl font-bold mb-1">Hetav Shah</h1>
            <p className="text-gray-400">AI Engineer</p>
        </div>

        <div className="w-full max-w-md space-y-6">
            {/* Device Specifications */}
            <div className="bg-[#313244] rounded-xl overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-white/5 font-medium text-sm text-gray-400 uppercase tracking-wider">
                    System Details
                </div>
                <div className="p-2">
                    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <span className="text-gray-300">OS Name</span>
                        <span className="font-medium">NixOS (Portfolio Edition)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <span className="text-gray-300">Host</span>
                        <span className="font-medium">Portfolio v1.0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <span className="text-gray-300">Kernel</span>
                        <span className="font-medium">Next.js 14</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <span className="text-gray-300">Window Manager</span>
                        <span className="font-medium">React + Zustand</span>
                    </div>
                </div>
            </div>

            {/* Packages */}
            <div className="bg-[#313244] rounded-xl overflow-hidden shadow-sm">
                 <div className="px-4 py-3 border-b border-white/5 font-medium text-sm text-gray-400 uppercase tracking-wider">
                    Core Packages
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                    {['TypeScript', 'Python', 'Nix', 'Docker', 'React', 'Tailwind', 'PostgreSQL', 'AWS'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-[#45475a] rounded-full text-sm hover:bg-[#585b70] transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Links */}
             <div className="flex justify-center space-x-4 pt-4">
                <a href="https://github.com/Hetav21" target="_blank" rel="noopener noreferrer" 
                   className="p-3 bg-[#313244] rounded-full hover:bg-[#45475a] transition-colors text-white">
                    <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/hetav2106/" target="_blank" rel="noopener noreferrer"
                   className="p-3 bg-[#313244] rounded-full hover:bg-[#45475a] transition-colors text-white">
                    <Linkedin size={20} />
                </a>
            </div>
        </div>
    </div>
  );
}
