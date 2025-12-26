"use client";

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
        title: "Project 1",
        description: "A wonderful project that does amazing things with AI and simple logic. It revolutionizes how we interact with data.",
        tags: ["React", "AI", "Python"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Project 2",
        description: "Another cool project that solves real world problems efficiently. Built with performance and scalability in mind.",
        tags: ["TypeScript", "Next.js", "Tailwind"],
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Project 3",
        description: "A masterpiece of engineering and design. Leveraging low-level technologies for maximum speed.",
        tags: ["Rust", "WASM", "WebGL"],
        color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="h-full bg-[#1e1e2e] text-gray-200 p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
            <div key={i} className="bg-[#313244] rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-white/5 flex flex-col h-full group">
                <div className={`h-48 w-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <span className="text-white text-opacity-50 font-bold text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {project.title[0]}
                    </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                        {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-[#1e1e2e] rounded text-gray-300 border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-[#45475a] hover:bg-[#585b70] text-white py-2 rounded-lg transition-colors text-sm font-medium">
                            <Github size={16} />
                            Code
                        </button>
                         <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                            <ExternalLink size={16} />
                            Demo
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
