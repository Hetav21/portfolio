import { FileSystemNode } from './types';

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
              name: 'projects',
              type: 'directory',
              children: [
                {
                  name: 'project-1',
                  type: 'directory',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: '# Project 1\n\nLorem ipsum dolor sit amet...'
                    }
                  ]
                },
                {
                  name: 'project-2',
                  type: 'directory',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: '# Project 2\n\nAnother cool project...'
                    }
                  ]
                },
                {
                  name: 'project-3',
                  type: 'directory',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: '# Project 3\n\nYet another masterpiece.'
                    }
                  ]
                }
              ]
            },
            {
              name: 'documents',
              type: 'directory',
              children: [
                {
                  name: 'resume.txt',
                  type: 'file',
                  content: 'Hetav Shah\nAI Engineer\n\nSkills: TypeScript, Python, Nix, Docker'
                }
              ]
            },
            {
              name: '.config',
              type: 'directory',
              children: [
                {
                  name: 'about.txt',
                  type: 'file',
                  content: 'Name: Hetav Shah\nRole: AI Engineer\nGitHub: github.com/Hetav21'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
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
    parts = path.split('/').filter(p => p);
  } else {
    const currentParts = currentPath.split('/').filter(p => p);
    const pathParts = path.split('/').filter(p => p);
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
  
  const parts = resolvedPath.split('/').filter(p => p);
  let current: FileSystemNode = fileSystem;
  
  for (const part of parts) {
    if (current.type !== 'directory' || !current.children) return null;
    
    const found = current.children.find(child => child.name === part);
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
