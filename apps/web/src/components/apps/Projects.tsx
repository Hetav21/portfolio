'use client';

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Project 1',
      description:
        'A wonderful project that does amazing things with AI and simple logic. It revolutionizes how we interact with data.',
      tags: ['React', 'AI', 'Python'],
      color: 'from-primary to-rose',
    },
    {
      title: 'Project 2',
      description:
        'Another cool project that solves real world problems efficiently. Built with performance and scalability in mind.',
      tags: ['TypeScript', 'Next.js', 'Tailwind'],
      color: 'from-gold to-love',
    },
    {
      title: 'Project 3',
      description:
        'A masterpiece of engineering and design. Leveraging low-level technologies for maximum speed.',
      tags: ['Rust', 'WASM', 'WebGL'],
      color: 'from-foam to-pine',
    },
  ];

  return (
    <div className="h-full bg-card text-foreground p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="bg-secondary rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-border flex flex-col h-full group"
          >
            <div
              className={`h-48 w-full bg-gradient-to-br ${project.color} flex items-center justify-center`}
            >
              <span className="text-white text-opacity-50 font-bold text-4xl transform group-hover:scale-110 transition-transform duration-300">
                {project.title[0]}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-card rounded text-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground py-2 rounded-lg transition-colors text-sm font-medium">
                  <Github size={16} />
                  Code
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg transition-colors text-sm font-medium">
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
