import { certifications } from '../../.velite';
import { ExternalLink, Award } from 'lucide-react';

export function Certifications() {
  const sortedCertifications = [...certifications].sort((a, b) => b.order - a.order);

  return (
    <section id="certifications" className="scroll-mt-24 relative">
      <h2 className="sticky top-14 z-40 bg-background/95 backdrop-blur py-3 text-2xl font-bold tracking-tight w-full z-20">
        Certifications
      </h2>
      <div className="space-y-8 mt-1">
        <p className="text-muted-foreground">Professional credentials and courses.</p>

        <div className="relative py-4 overflow-hidden md:overflow-visible">
          <div className="flex flex-col">
            {sortedCertifications.map((cert, index) => {
              const isEven = index % 2 === 0;
              const isFirst = index === 0;
              const isLast = index === sortedCertifications.length - 1;

              let pathD = '';
              if (isEven) {
                // Left card -> SVG line bows left to touch the left card
                if (isFirst) {
                  pathD = 'M 0 50 C 0 80, 50 80, 50 100';
                } else if (isLast) {
                  pathD = 'M 50 0 C 50 20, 0 20, 0 50';
                } else {
                  pathD = 'M 50 0 C 50 20, 0 20, 0 50 C 0 80, 50 80, 50 100';
                }
              } else {
                // Right card -> SVG line bows right to touch the right card
                if (isFirst) {
                  pathD = 'M 100 50 C 100 80, 50 80, 50 100';
                } else if (isLast) {
                  pathD = 'M 50 0 C 50 20, 100 20, 100 50';
                } else {
                  pathD = 'M 50 0 C 50 20, 100 20, 100 50 C 100 80, 50 80, 50 100';
                }
              }

              return (
                <div
                  key={index}
                  className={`flex w-full relative min-h-[160px] ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Card Side */}
                  <div
                    className={`w-[calc(50%-24px)] md:w-[calc(50%-40px)] flex flex-col justify-center py-6 ${isEven ? 'items-end text-right pr-4 md:pr-6' : 'items-start text-left pl-4 md:pl-6'}`}
                  >
                    <div className="relative bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/50 transition-colors w-full md:max-w-[400px]">
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`absolute top-5 text-muted-foreground hover:text-primary transition-colors ${isEven ? 'left-5' : 'right-5'}`}
                          aria-label="Verify credential"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <div
                        className={`flex flex-col gap-1 mb-3 ${isEven ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {cert.issuer}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {cert.date}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-tight mb-1">
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  {/* Center Wavy Timeline */}
                  <div className="w-[48px] md:w-[80px] relative flex-shrink-0">
                    <svg
                      className="absolute inset-0 w-full h-full text-border"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <path
                        d={pathD}
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={2}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    {/* The Dot */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-sm z-10 transition-colors ${isEven ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`}
                    >
                      <Award size={14} className="text-primary" />
                    </div>
                  </div>

                  {/* Empty Side */}
                  <div className="w-[calc(50%-24px)] md:w-[calc(50%-40px)]"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
