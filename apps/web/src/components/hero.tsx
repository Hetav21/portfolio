'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section ref={ref} className="h-[120vh] w-full" id="hero">
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-[25vh] flex flex-col items-start justify-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Hetav Shah
        </h1>
        <h2 className="text-xl md:text-2xl text-primary font-medium mb-6">Associate AI Engineer</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          CS Engineer architecting the future of Agentic AI with Opencode, leveraging intelligent
          subagents and skills to build production-grade LLM systems.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/Hetav21"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground px-4 py-2 rounded-lg transition-colors font-medium border border-border"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/hetav2106/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground px-4 py-2 rounded-lg transition-colors font-medium border border-border"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:shahhetav2106@gmail.com"
            className="flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground px-4 py-2 rounded-lg transition-colors font-medium border border-border"
          >
            <Mail size={18} />
            <span>Email</span>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_RESUME_URL || 'https://cv.hetav.dev'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <FileText size={18} />
            <span>View CV</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
