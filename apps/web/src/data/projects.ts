export interface Project {
  title: string;
  description: string;
  tags: string[];
  color: string;
  image: string;
  links: {
    repo: string;
    demo?: string;
  };
}

export const projects: Project[] = [
  {
    title: 'QnA App',
    description:
      'A messaging platform that allows users to ask questions anonymously. Built with Next-Auth, Shadcn UI, and Vercel AI SDK.',
    tags: ['Next.js', 'AI', 'TypeScript'],
    color: 'from-foam to-pine',
    image: 'https://raw.githubusercontent.com/Hetav21/QnA-app/master/assets/dashboard.png',
    links: {
      repo: 'https://github.com/Hetav21/QnA-app',
      demo: 'https://qna.hetav.dev',
    },
  },
  {
    title: 'Clickify',
    description:
      'A modern URL shortener with analytics dashboard. Built with Vite + React, Node.js, Express, and Prisma.',
    tags: ['React', 'Node.js', 'Prisma'],
    color: 'from-iris to-gold',
    image: 'https://opengraph.githubassets.com/1/Hetav21/Clickify',
    links: {
      repo: 'https://github.com/Hetav21/Clickify',
      demo: 'https://clickify.hetav.dev',
    },
  },
  {
    title: 'Classroom Desktop',
    description:
      'A dedicated desktop client for managing classroom activities. Built with Electron for cross-platform support.',
    tags: ['Electron', 'TypeScript', 'Education'],
    color: 'from-love to-foam',
    image: 'https://opengraph.githubassets.com/1/Hetav21/classroom-desktop',
    links: {
      repo: 'https://github.com/Hetav21/classroom-desktop',
    },
  },
  {
    title: 'NixOS Config',
    description:
      'My personal NixOS configurations, dotfiles, and system setup. Includes Hyprland rice and declarative system management.',
    tags: ['Nix', 'Shell', 'System'],
    color: 'from-primary to-rose',
    image: 'https://opengraph.githubassets.com/1/Hetav21/nixos',
    links: {
      repo: 'https://github.com/Hetav21/nixos',
    },
  },
  {
    title: 'Gentoo Dotfiles',
    description:
      'My Gentoo Linux system configuration files. Optimized for performance and minimalism.',
    tags: ['Gentoo', 'Linux', 'Shell'],
    color: 'from-rose to-pine',
    image: 'https://opengraph.githubassets.com/1/Hetav21/dotfiles',
    links: {
      repo: 'https://github.com/Hetav21/dotfiles',
    },
  },
];
