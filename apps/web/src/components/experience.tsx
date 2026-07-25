import { experience } from '../../.velite';
import { Briefcase, GraduationCap, Award, ExternalLink } from 'lucide-react';
import { MDXContent } from './mdx-content';

export function Experience() {
  const sortedExperience = [...experience].sort((a, b) => b.order - a.order);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase size={16} className="text-primary" />;
      case 'education':
        return <GraduationCap size={16} className="text-primary" />;
      case 'certification':
        return <Award size={16} className="text-primary" />;
      default:
        return <Briefcase size={16} className="text-primary" />;
    }
  };

  return (
    <section id="experience" className="scroll-mt-24 relative">
      <h2 className="sticky top-14 z-40 bg-background/95 backdrop-blur py-3 text-2xl font-bold tracking-tight w-full">
        Experience
      </h2>
      <div className="space-y-8 mt-1">
        <p className="text-muted-foreground">
          My professional journey, education, and certifications.
        </p>
        <div className="relative border-l border-border ml-3 space-y-12 pb-4">
          {sortedExperience.map((item, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute -left-3 top-1 bg-background border border-border rounded-full p-1.5 shadow-sm">
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
                <div className="text-sm font-medium text-muted-foreground whitespace-nowrap bg-secondary px-2.5 py-1 rounded-md border border-border">
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
                      className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded font-medium border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
