'use client';

import { experience } from '../../.velite';
import { Briefcase, GraduationCap, ExternalLink } from 'lucide-react';
import { MDXContent } from './mdx-content';
import { SectionReveal, RevealItem } from '@/components/ui/section-reveal';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Experience() {
  const sortedExperience = [...experience].sort((a, b) => b.order - a.order);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end 80%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase size={16} className="text-primary" />;
      case 'education':
        return <GraduationCap size={16} className="text-primary" />;
      default:
        return <Briefcase size={16} className="text-primary" />;
    }
  };

  return (
    <section id="experience" className="scroll-mt-24 relative">
      <SectionReveal>
        <h2 className="sticky top-14 z-40 bg-background/95 backdrop-blur py-3 text-2xl font-bold tracking-tight w-full">
          Experience
        </h2>
      </SectionReveal>
      <div className="space-y-8 mt-1">
        <SectionReveal delay={0.1}>
          <p className="text-muted-foreground">My professional journey and education.</p>
        </SectionReveal>
        <div ref={containerRef} className="relative ml-3 space-y-12 pb-4">
          {/* Static background line */}
          <div className="absolute left-[0.5px] top-4 bottom-4 w-[1px] bg-border/50" />
          {/* Animated glowing line */}
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute left-0 top-4 w-[2px] bg-gradient-to-b from-transparent via-primary to-primary rounded-full"
          />
          {sortedExperience.map((item, index) => (
            <RevealItem key={index} index={index} staggerDelay={0.12}>
              <div className="relative pl-8 group">
                <div className="absolute -left-3 top-1 bg-background border border-border rounded-full p-1.5 shadow-sm transition-colors group-hover:border-primary/50">
                  {getIcon(item.type)}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      {item.role}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </h3>
                    <h4 className="text-md text-primary font-medium">{item.company}</h4>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground whitespace-nowrap bg-secondary/60 px-2.5 py-1 rounded-md border border-border/60">
                    {item.startDate} {item.endDate ? `— ${item.endDate}` : ''}
                  </div>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mb-4">
                  <MDXContent code={item.content} />
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground text-xs rounded font-medium border border-border/50 transition-colors hover:border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
