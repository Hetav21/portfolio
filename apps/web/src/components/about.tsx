'use client';

import { SpotlightCard } from '@/components/ui/spotlight-card';
import { SectionReveal, RevealItem } from '@/components/ui/section-reveal';

export function About() {
  const skills = {
    Languages: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
    'Agentic AI': [
      'LLM Integration',
      'A2A',
      'RAG Pipelines',
      'Embeddings',
      'MCP',
      'Multi-Agent Orchestration',
    ],
    Frameworks: [
      'React',
      'Next.js',
      'FastAPI',
      'Express.js',
      'Hono',
      'Electron.js',
      'Tailwind CSS',
      'Zod',
    ],
    Data: ['PostgreSQL', 'pgvector', 'Redis', 'BM25', 'Vector Search'],
    'Cloud & DevOps': ['AWS', 'Docker', 'CI/CD', 'Cloudflare', 'NixOS', 'Git'],
  };

  return (
    <section id="about" className="scroll-mt-24 relative">
      <SectionReveal>
        <h2 className="sticky top-14 z-40 bg-background/95 backdrop-blur py-3 text-2xl font-bold tracking-tight flex items-center w-full">
          About Me
        </h2>
      </SectionReveal>
      <div className="space-y-8 mt-4">
        <SectionReveal delay={0.1}>
          <p className="text-muted-foreground leading-relaxed text-base">
            I&apos;m a final-year B.Tech CS student at Adani University working as an Associate AI
            Engineer at ProductSquads. I specialize in building production-grade Agentic AI
            solutions, from multi-modal document extraction pipelines to serverless event-driven AI
            assistants on AWS.
          </p>
        </SectionReveal>

        <div className="space-y-6">
          <SectionReveal delay={0.15}>
            <h3 className="text-lg font-semibold tracking-tight">Technical Skills</h3>
          </SectionReveal>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(skills).map(([category, items], index) => (
              <RevealItem key={category} index={index} staggerDelay={0.1} className="h-full">
                <SpotlightCard className="p-5 h-full">
                  <h4 className="text-sm font-medium text-foreground mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full font-medium border border-border/50 transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
