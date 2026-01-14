import { listDirectory, currentPath } from './filesystem';
import { COMMANDS, VALID_APPS } from './commands';

export const getSuggestions = (input: string): string[] => {
  const parts = input.split(' ');
  const lastPart = parts[parts.length - 1];

  if (parts.length === 1) {
    // 1. Suggest Commands
    return COMMANDS.filter((c) => c.startsWith(lastPart));
  }

  if (parts[0] === 'open' && parts.length === 2) {
    // 2. Suggest Apps for 'open' command
    return VALID_APPS.filter((a) => a.startsWith(lastPart));
  }

  // 3. Suggest Filesystem Paths for 'cd', 'ls', 'cat'
  // Or generally for any command that might take a path argument
  let dirToSearch = currentPath;
  let prefix = lastPart;

  if (lastPart.includes('/')) {
    const lastSlash = lastPart.lastIndexOf('/');
    const pathDir = lastPart.slice(0, lastSlash) || '/';
    prefix = lastPart.slice(lastSlash + 1);
    dirToSearch = pathDir.startsWith('/') ? pathDir : `${currentPath}/${pathDir}`;

    // Normalize path to remove double slashes if any, although simple concat usually works for this virtual FS
    // A more robust path resolution would be better, but this fits existing patterns
  }

  const entries = listDirectory(dirToSearch);
  if (!entries) return [];

  return entries
    .filter((e) => e.name.startsWith(prefix))
    .map((e) => e.name + (e.type === 'directory' ? '/' : ''));
};
