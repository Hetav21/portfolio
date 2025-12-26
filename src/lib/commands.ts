import { SystemState } from './store';
import { currentPath, setCurrentPath, listDirectory, getFileContent, getNode } from './filesystem';
import { AppId } from './types';

export let isNixShell = false;
export const commandHistory: string[] = [];

// Rose Pine colors for fastfetch:
// Iris (purple): #c4a7e7 -> RGB(196,167,231)
// Foam (cyan): #9ccfd8 -> RGB(156,207,216)
// Using darker text color for labels: #575279 (works on both themes)

const FASTFETCH_OUTPUT = `
          \x1b[38;2;196;167;231m▗▄▄▄       ▗▄▄▄▄    ▄▄▄▖\x1b[0m            \x1b[38;2;156;207;216mhetav@portfolio\x1b[0m
          \x1b[38;2;196;167;231m▜███▙       ▜███▙  ▟███▛\x1b[0m            \x1b[38;2;156;207;216m────────────────\x1b[0m
           \x1b[38;2;196;167;231m▜███▙       ▜███▙▟███▛\x1b[0m             \x1b[1;38;2;87;82;121mOS:\x1b[0m NixOS (Portfolio Edition)
            \x1b[38;2;196;167;231m▜███▙       ▜██████▛\x1b[0m              \x1b[1;38;2;87;82;121mHost:\x1b[0m Hetav Shah
     \x1b[38;2;196;167;231m▟█████████████████▙ ▜████▛     ▟▙\x1b[0m        \x1b[1;38;2;87;82;121mKernel:\x1b[0m Next.js 16
    \x1b[38;2;196;167;231m▟███████████████████▙ ▜███▙    ▟██▙\x1b[0m       \x1b[1;38;2;87;82;121mUptime:\x1b[0m since 2021
           \x1b[38;2;196;167;231m▄▄▄▄▖           ▜███▙  ▟███▛\x1b[0m       \x1b[1;38;2;87;82;121mPackages:\x1b[0m TypeScript, Python, Nix, Docker
          \x1b[38;2;196;167;231m▟███▛             ▜██▛ ▟███▛\x1b[0m        \x1b[1;38;2;87;82;121mShell:\x1b[0m nix-shell
         \x1b[38;2;196;167;231m▟███▛               ▜▛ ▟███▛\x1b[0m         \x1b[1;38;2;87;82;121mTerminal:\x1b[0m Ghostty
\x1b[38;2;196;167;231m▟███████████▛                  ▟██████████▙\x1b[0m   \x1b[1;38;2;87;82;121mDE:\x1b[0m GNOME (Web Edition)
\x1b[38;2;196;167;231m▜██████████▛                  ▟███████████▛\x1b[0m   \x1b[1;38;2;87;82;121mTheme:\x1b[0m Rosé Pine
      \x1b[38;2;196;167;231m▟███▛ ▟▙               ▟███▛\x1b[0m            \x1b[1;38;2;87;82;121mRole:\x1b[0m AI Engineer
     \x1b[38;2;196;167;231m▟███▛ ▟██▙             ▟███▛\x1b[0m             \x1b[1;38;2;87;82;121mContact:\x1b[0m github.com/Hetav21
    \x1b[38;2;196;167;231m▟███▛  ▜███▙           ▝▀▀▀▀\x1b[0m
    \x1b[38;2;196;167;231m▜██▛    ▜███▙ ▜██████████████████▛\x1b[0m
     \x1b[38;2;196;167;231m▜▛     ▟████▙ ▜████████████████▛\x1b[0m
           \x1b[38;2;196;167;231m▟██████▙       ▜███▙\x1b[0m
          \x1b[38;2;196;167;231m▟███▛▜███▙       ▜███▙\x1b[0m
         \x1b[38;2;196;167;231m▟███▛  ▜███▙       ▜███▙\x1b[0m
         \x1b[38;2;196;167;231m▝▀▀▀    ▀▀▀▀▘       ▀▀▀▘\x1b[0m
`;

const foam = '\x1b[38;2;156;207;216m';
const reset = '\x1b[0m';
const bold = '\x1b[1m';

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
        if (f.type === 'directory') return `${foam}${f.name}${reset}`;
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
      
      let newPath = targetPath.startsWith('/') ? targetPath : `${currentPath}/${targetPath}`;
      const pathParts = newPath.split('/').filter(p => p && p !== '.');
      const stack: string[] = [];
      for (const p of pathParts) {
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
      return `${bold}Available commands:${reset}
  ${foam}fastfetch, neofetch${reset}  Display system info
  ${foam}ls${reset}                   List directory contents
  ${foam}cd${reset} <dir>             Change directory
  ${foam}cat${reset} <file>           Display file contents
  ${foam}clear${reset}                Clear terminal
  ${foam}open${reset} <app>           Open an application
  ${foam}nix-shell${reset}            Toggle nix-shell mode
  ${foam}whoami${reset}               Display current user
  ${foam}pwd${reset}                  Print working directory
  ${foam}echo${reset} <text>          Display text
  ${foam}history${reset}              Show command history
  ${foam}exit${reset}                 Close terminal`;

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
      return commandHistory.join('\n');

    case 'exit':
      store.closeWindow('terminal');
      return '';
      
    case '':
      return '';

    default:
      return `command not found: ${command}`;
  }
};
