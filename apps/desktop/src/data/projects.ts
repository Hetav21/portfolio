let loadedProjects: Project[] = [];

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  loadedProjects = require('./projects.json') as Project[];
} catch {
  // projects.json is generated at build time; fallback gracefully if not yet created
  loadedProjects = [];
}

export interface Project {
  title: string;
  slug?: string;
  description: string;
  tags: string[];
  color: string;
  image: string;
  links: {
    repo: string;
    demo?: string;
  };
  readme?: string;
}

export const projects: Project[] = loadedProjects;
