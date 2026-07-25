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
      <h2 className="sticky top-14 z-40 bg-background/95 backdrop-blur py-3 text-2xl font-bold tracking-tight flex items-center w-full">
        About Me
      </h2>
      <div className="space-y-8 mt-4">
        <p className="text-muted-foreground leading-relaxed text-base">
          I&apos;m a final-year B.Tech CS student at Adani University working as an Associate AI
          Engineer at ProductSquads. I specialize in building production-grade Agentic AI solutions,
          from multi-modal document extraction pipelines to serverless event-driven AI assistants on
          AWS.
        </p>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold tracking-tight">Technical Skills</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
