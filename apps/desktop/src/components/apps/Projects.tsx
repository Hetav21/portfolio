'use client';

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';
import Image from 'next/image';

export default function Projects() {
  return (
    <div className="h-full bg-card text-foreground p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="bg-secondary rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-border flex flex-col h-full group"
          >
            <div className="h-48 w-full relative overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized // External images from GitHub
              />
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
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <Github size={16} />
                  Code
                </a>
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
