import { FileSystemNode } from './types';
import { projects } from '../data/projects';

// Helper to convert project to directory-friendly name
const toDirName = (title: string, slug?: string) =>
  slug || title.toLowerCase().replace(/\s+/g, '-');

// Canonical about.txt content with full socials and profile links
export const ABOUT_TXT_CONTENT = `Name: Hetav Shah
Role: Associate AI Engineer
Email: hello@hetav.dev
GitHub: https://github.com/Hetav21
LinkedIn: https://www.linkedin.com/in/hetav2106/
X: https://x.com/Hetav_21
Website: https://www.hetav.dev
Blog: https://blog.hetav.dev
Resume: https://cv.hetav.dev`;

// Generate project nodes from data source
const projectNodes: FileSystemNode[] = projects.map((p) => ({
  name: toDirName(p.title, p.slug),
  type: 'directory',
  children: [
    {
      name: 'README.md',
      type: 'file',
      content:
        p.readme ||
        `# ${p.title}\n\n${p.description}\n\nStack: ${p.tags.join(', ')}\n\nLinks:\n- Repo: ${p.links.repo}\n${p.links.demo ? `- Demo: ${p.links.demo}` : ''}\n`,
    },
    {
      name: 'info.json',
      type: 'file',
      content: JSON.stringify(
        {
          title: p.title,
          description: p.description,
          tags: p.tags,
          image: p.image,
          links: p.links,
        },
        null,
        2
      ),
    },
  ],
}));

// Virtual File System Structure
const fileSystem: FileSystemNode = {
  name: '',
  type: 'directory',
  children: [
    {
      name: 'home',
      type: 'directory',
      children: [
        {
          name: 'hetav',
          type: 'directory',
          children: [
            {
              name: 'about.txt',
              type: 'file',
              content: ABOUT_TXT_CONTENT,
            },
            {
              name: 'projects',
              type: 'directory',
              children: projectNodes,
            },
            {
              name: 'documents',
              type: 'directory',
              children: [
                {
                  name: 'resume.pdf',
                  type: 'file',
                  content: '__PDF_RESUME__',
                },
              ],
            },
            {
              name: '.config',
              type: 'directory',
              children: [
                {
                  name: 'about.txt',
                  type: 'file',
                  content: ABOUT_TXT_CONTENT,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export let currentPath = '/home/hetav';

export const setCurrentPath = (path: string) => {
  currentPath = path;
};

// Helper to resolve path
const resolvePath = (path: string): string => {
  if (path === '/') return '/';

  let parts: string[];

  if (path.startsWith('/')) {
    parts = path.split('/').filter((p) => p);
  } else {
    const currentParts = currentPath.split('/').filter((p) => p);
    const pathParts = path.split('/').filter((p) => p);
    parts = [...currentParts, ...pathParts];
  }

  const stack: string[] = [];

  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
};

export const getNode = (path: string): FileSystemNode | null => {
  const resolvedPath = resolvePath(path);

  if (resolvedPath === '/') return fileSystem;

  const parts = resolvedPath.split('/').filter((p) => p);
  let current: FileSystemNode = fileSystem;

  for (const part of parts) {
    if (current.type !== 'directory' || !current.children) return null;

    const found = current.children.find((child) => child.name === part);
    if (!found) return null;
    current = found;
  }

  return current;
};

export const listDirectory = (path: string): FileSystemNode[] | null => {
  const node = getNode(path);
  if (node && node.type === 'directory') {
    return node.children || [];
  }
  return null;
};

export const getFileContent = (path: string): string | null => {
  const node = getNode(path);
  if (node && node.type === 'file') {
    return node.content || '';
  }
  return null;
};
