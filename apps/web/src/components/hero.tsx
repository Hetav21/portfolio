'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ArrowDown } from 'lucide-react';
import { FlipWords } from '@/components/ui/flip-words';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { MovingBorderButton } from '@/components/ui/moving-border';
import { AsciiArt } from '@/components/ui/ascii-art';

const roles = [
  'Associate AI Engineer',
  'Software Developer',
  'Open Source Contributor',
  'Cloud Architecture Enthusiast',
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const arrowOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section ref={ref} className="h-[120vh] w-full" id="hero">
      <div className="sticky top-[20vh] w-full">
        <motion.div
          style={{ opacity, scale }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-8 gap-12 lg:gap-8 w-full"
        >
          <div className="flex flex-col items-start justify-center flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground"
            >
              Hetav Shah
              <span className="sr-only"> — Associate AI Engineer & Agentic AI Specialist</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-primary font-medium mb-6 h-8"
            >
              <FlipWords words={roles} duration={3000} />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mb-8"
            >
              <TextGenerateEffect
                words="CS Engineer architecting the future of Agentic AI with Opencode, leveraging intelligent subagents and skills to build production-grade LLM systems."
                className="text-lg text-muted-foreground leading-relaxed font-normal"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="https://github.com/Hetav21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-secondary/60 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-lg transition-all duration-300 font-medium border border-border/60 hover:border-border text-sm hover:shadow-lg hover:shadow-primary/5"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hetav2106/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-secondary/60 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-lg transition-all duration-300 font-medium border border-border/60 hover:border-border text-sm hover:shadow-lg hover:shadow-primary/5"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:shahhetav2106@gmail.com"
                className="flex items-center gap-2 bg-secondary/60 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-lg transition-all duration-300 font-medium border border-border/60 hover:border-border text-sm hover:shadow-lg hover:shadow-primary/5"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
              <MovingBorderButton
                as="a"
                href={process.env.NEXT_PUBLIC_RESUME_URL || 'https://cv.hetav.dev'}
                target="_blank"
                rel="noopener noreferrer"
                borderRadius="0.5rem"
                className="text-foreground"
              >
                <FileText size={16} />
                <span>View CV</span>
              </MovingBorderButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden lg:block flex-1 w-full max-w-[300px] sm:max-w-md aspect-square relative lg:ml-auto"
          >
            <AsciiArt
              src="/avatar.png"
              resolution={50}
              className="w-full h-full rounded-2xl overflow-hidden"
              charset="standard"
              inverted={true}
              animated={false}
              color="#c4a7e7"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: arrowOpacity }}
        className="hidden md:block fixed bottom-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <ArrowDown className="animate-bounce text-muted-foreground opacity-70" size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
