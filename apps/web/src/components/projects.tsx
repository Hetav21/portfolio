'use client';

import { projects } from '../../.velite';
import { Github, ExternalLink } from 'lucide-react';
import { MDXContent } from './mdx-content';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { SectionReveal, RevealItem } from '@/components/ui/section-reveal';

export function Projects() {
  const sortedProjects = [...projects].sort((a, b) => b.order - a.order);

  return (
    <section id="projects" className="scroll-mt-24 relative">
      <SectionReveal>
        <h2 className="sticky top-14 z-40 bg-background/95 backdrop-blur py-3 text-2xl font-bold tracking-tight w-full">
          Selected Projects
        </h2>
      </SectionReveal>
      <div className="space-y-8 mt-1">
        <SectionReveal delay={0.1}>
          <p className="text-muted-foreground">Some of the things I&apos;ve built recently.</p>
        </SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {sortedProjects.map((project, index) => (
            <RevealItem key={index} index={index} staggerDelay={0.1} className="h-full">
              <CardContainer className="h-full w-full" containerClassName="h-full w-full py-0">
                <CardBody className="h-full w-full">
                  <SpotlightCard className="flex flex-col justify-between h-full p-6 group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <CardItem
                          translateZ="50"
                          as="h3"
                          className="text-xl font-bold text-foreground group-hover:text-primary transition-colors"
                        >
                          {project.title}
                        </CardItem>
                        <CardItem translateZ="40" className="flex items-center gap-3">
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="View Source Code"
                              aria-label={`View ${project.title} source code on GitHub`}
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              title="View Live Demo"
                              aria-label={`View ${project.title} live demo`}
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </CardItem>
                      </div>

                      <CardItem
                        translateZ="30"
                        className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
                      >
                        <MDXContent code={project.content} />
                      </CardItem>
                    </div>

                    <CardItem translateZ="40" className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-secondary/40 text-secondary-foreground text-xs rounded-md font-medium border border-border/40 transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </CardItem>
                  </SpotlightCard>
                </CardBody>
              </CardContainer>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
