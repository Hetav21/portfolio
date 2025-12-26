"use client";

import React from 'react';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="h-full bg-card text-foreground overflow-auto p-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4">
                <Image
                    src="/avatar.png"
                    alt="Hetav Shah"
                    width={96}
                    height={96}
                    className="object-cover"
                />
            </div>
            <h1 className="text-2xl font-bold mb-1">Hetav Shah</h1>
            <p className="text-muted-foreground">Software Developer</p>
        </div>

        <div className="w-full max-w-md space-y-6">
            {/* Device Specifications */}
            <div className="bg-secondary rounded-xl overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-border font-medium text-sm text-muted-foreground uppercase tracking-wider">
                    System Details
                </div>
                <div className="p-2">
                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <span className="text-foreground">OS Name</span>
                        <span className="font-medium">NixOS (Portfolio Edition)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <span className="text-foreground">Host</span>
                        <span className="font-medium">Portfolio v1.0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <span className="text-foreground">Kernel</span>
                        <span className="font-medium">Next.js 16</span>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <span className="text-foreground">Window Manager</span>
                        <span className="font-medium">React + Zustand</span>
                    </div>
                </div>
            </div>

            {/* Packages */}
            <div className="bg-secondary rounded-xl overflow-hidden shadow-sm">
                 <div className="px-4 py-3 border-b border-border font-medium text-sm text-muted-foreground uppercase tracking-wider">
                    Core Packages
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                    {['TypeScript', 'Python', 'Nix', 'Docker', 'React', 'Tailwind', 'PostgreSQL', 'AWS'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Links */}
             <div className="flex justify-center space-x-4 pt-4">
                <a href="https://github.com/Hetav21" target="_blank" rel="noopener noreferrer" 
                   className="p-3 bg-secondary rounded-full hover:bg-muted transition-colors text-foreground">
                    <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/hetav2106/" target="_blank" rel="noopener noreferrer"
                   className="p-3 bg-secondary rounded-full hover:bg-muted transition-colors text-foreground">
                    <Linkedin size={20} />
                </a>
            </div>
        </div>
    </div>
  );
}
