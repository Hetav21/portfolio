import { SystemState } from './store';
import { currentPath, setCurrentPath, listDirectory, getFileContent, getNode } from './filesystem';
import { AppId } from './types';

export let isNixShell = false;
export const commandHistory: string[] = [];

const FASTFETCH_OUTPUT = `
          \x1b[38;2;126;186;228m▗▄▄▄       ▗▄▄▄▄    ▄▄▄▖\x1b[0m            \x1b[38;2;82;119;195mhetav@portfolio\x1b[0m
          \x1b[38;2;126;186;228m▜███▙       ▜███▙  ▟███▛\x1b[0m            \x1b[38;2;82;119;195m────────────────\x1b[0m
           \x1b[38;2;126;186;228m▜███▙       ▜███▙▟███▛\x1b[0m             \x1b[38;2;82;119;195mOS: NixOS (Portfolio Edition)\x1b[0m
            \x1b[38;2;126;186;228m▜███▙       ▜██████▛\x1b[0m              \x1b[38;2;82;119;195mHost: Hetav Shah\x1b[0m
     \x1b[38;2;126;186;228m▟█████████████████▙ ▜████▛     ▟▙\x1b[0m        \x1b[38;2;82;119;195mKernel: Next.js 14\x1b[0m
    \x1b[38;2;126;186;228m▟███████████████████▙ ▜███▙    ▟██▙\x1b[0m       \x1b[38;2;82;119;195mUptime: since 2021\x1b[0m
           \x1b[38;2;126;186;228m▄▄▄▄▖           ▜███▙  ▟███▛\x1b[0m       \x1b[38;2;82;119;195mPackages: TypeScript, Python, Nix, Docker\x1b[0m
          \x1b[38;2;126;186;228m▟███▛             ▜██▛ ▟███▛\x1b[0m        \x1b[38;2;82;119;195mShell: nix-shell\x1b[0m
         \x1b[38;2;126;186;228m▟███▛               ▜▛ ▟███▛\x1b[0m         \x1b[38;2;82;119;195mTerminal: xterm.js\x1b[0m
\x1b[38;2;126;186;228m▟███████████▛                  ▟██████████▙\x1b[0m   \x1b[38;2;82;119;195mDE: GNOME (Web Edition)\x1b[0m
\x1b[38;2;126;186;228m▜██████████▛                  ▟███████████▛\x1b[0m   \x1b[38;2;82;119;195mTheme: Adwaita Dark\x1b[0m
      \x1b[38;2;126;186;228m▟███▛ ▟▙               ▟███▛\x1b[0m            \x1b[38;2;82;119;195mRole: AI Engineer\x1b[0m
     \x1b[38;2;126;186;228m▟███▛ ▟██▙             ▟███▛\x1b[0m             \x1b[38;2;82;119;195mContact: github.com/Hetav21\x1b[0m
    \x1b[38;2;126;186;228m▟███▛  ▜███▙           ▝▀▀▀▀\x1b[0m
    \x1b[38;2;126;186;228m▜██▛    ▜███▙ ▜██████████████████▛\x1b[0m
     \x1b[38;2;126;186;228m▜▛     ▟████▙ ▜████████████████▛\x1b[0m
           \x1b[38;2;126;186;228m▟██████▙       ▜███▙\x1b[0m
          \x1b[38;2;126;186;228m▟███▛▜███▙       ▜███▙\x1b[0m
         \x1b[38;2;126;186;228m▟███▛  ▜███▙       ▜███▙\x1b[0m
         \x1b[38;2;126;186;228m▝▀▀▀    ▀▀▀▀▘       ▀▀▀▘\x1b[0m
`;

export const executeCommand = (input: string, store: SystemState): string => {
  const parts = input.trim().split(' ');
  const command = parts[0];
  const args = parts.slice(1);

  if (command !== '') {
    commandHistory.push(input);
  }

  switch (command) {
    case 'fastfetch':
    case 'neofetch':
      return FASTFETCH_OUTPUT;

    case 'ls':
      const files = listDirectory(currentPath);
      if (!files) return `Error: Cannot access '${currentPath}'`;
      return files.map(f => {
        if (f.type === 'directory') return `\x1b[1;34m${f.name}\x1b[0m`;
        return f.name;
      }).join('  ');

    case 'cd':
      if (args.length === 0) {
        setCurrentPath('/home/hetav');
        return '';
      }
      const targetPath = args[0];
      const node = getNode(targetPath);
      if (!node) return `cd: no such file or directory: ${targetPath}`;
      if (node.type !== 'directory') return `cd: not a directory: ${targetPath}`;
      
      // We need to resolve the absolute path to set it correctly
      // getNode handles resolution internally but doesn't return the path string.
      // We can rely on a hack: reconstruct it or update filesystem to return path.
      // For now, let's just rely on the fact that getNode uses resolvePath internally
      // but we need the string.
      // Actually, we can just use the internal logic of resolvePath if we exported it,
      // or we can implement a simple 'resolve' here or in filesystem.
      // Better: Update filesystem to export resolvePath.
      // Or just assume it works for now? No, we need to set the string.
      
      // Let's modify filesystem to export resolvePath or implement a simple one here.
      // I'll implement a simple resolver here reusing the logic from filesystem (conceptually)
      // Wait, I can't import resolvePath as I didn't export it.
      // I'll fix this by checking if the path starts with /, if so use it.
      // If relative, join with currentPath.
      // Then normalize.
      
      let newPath = targetPath.startsWith('/') ? targetPath : `${currentPath}/${targetPath}`;
      // Normalize path
      const parts = newPath.split('/').filter(p => p && p !== '.');
      const stack: string[] = [];
      for (const p of parts) {
        if (p === '..') {
          if (stack.length > 0) stack.pop();
        } else {
          stack.push(p);
        }
      }
      newPath = '/' + stack.join('/');
      
      setCurrentPath(newPath);
      return '';

    case 'cat':
      if (args.length === 0) return 'cat: missing file operand';
      const content = getFileContent(args[0]);
      if (content === null) return `cat: ${args[0]}: No such file or directory`;
      return content;

    case 'clear':
      return '__CLEAR__';

    case 'help':
      return `Available commands:
  fastfetch, neofetch  Display system info
  ls                   List directory contents
  cd <dir>             Change directory
  cat <file>           Display file contents
  clear                Clear terminal
  open <app>           Open an application
  nix-shell            Toggle shell prompt style
  whoami               Display current user
  pwd                  Print working directory
  echo <text>          Display text
  history              Show command history
  exit                 Close terminal`;

    case 'open':
      if (args.length === 0) return 'open: missing application name';
      const appName = args[0].toLowerCase();
      const validApps: AppId[] = ['terminal', 'files', 'about', 'projects', 'contact', 'editor', 'browser'];
      if (validApps.includes(appName as AppId)) {
        store.openWindow(appName as AppId);
        return `Opening ${appName}...`;
      }
      return `open: application '${appName}' not found`;

    case 'nix-shell':
      isNixShell = !isNixShell;
      return isNixShell ? 'Entering nix-shell...' : 'Exiting nix-shell...';

    case 'whoami':
      return 'hetav';

    case 'pwd':
      return currentPath;

    case 'echo':
      return args.join(' ');

    case 'history':
      return commandHistory.join('\r\n');

    case 'exit':
      store.closeWindow('terminal');
      return '';
      
    case '':
      return '';

    default:
      return `command not found: ${command}`;
  }
};
