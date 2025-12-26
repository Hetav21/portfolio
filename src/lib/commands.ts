import { SystemState } from './store';
import { currentPath, setCurrentPath, listDirectory, getFileContent, getNode } from './filesystem';
import { AppId } from './types';

export let isNixShell = false;
export const commandHistory: string[] = [];

// Rose Pine colors for fastfetch:
// Iris (purple): #c4a7e7 -> RGB(196,167,231)
// Foam (cyan): #9ccfd8 -> RGB(156,207,216)
// Text: #e0def4 -> RGB(224,222,244)

const FASTFETCH_OUTPUT = `
          \x1b[38;2;196;167;231m▗▄▄▄       ▗▄▄▄▄    ▄▄▄▖\x1b[0m            \x1b[38;2;156;207;216mhetav@portfolio\x1b[0m
          \x1b[38;2;196;167;231m▜███▙       ▜███▙  ▟███▛\x1b[0m            \x1b[38;2;156;207;216m────────────────\x1b[0m
           \x1b[38;2;196;167;231m▜███▙       ▜███▙▟███▛\x1b[0m             \x1b[38;2;224;222;244mOS:\x1b[0m NixOS (Portfolio Edition)
            \x1b[38;2;196;167;231m▜███▙       ▜██████▛\x1b[0m              \x1b[38;2;224;222;244mHost:\x1b[0m Hetav Shah
     \x1b[38;2;196;167;231m▟█████████████████▙ ▜████▛     ▟▙\x1b[0m        \x1b[38;2;224;222;244mKernel:\x1b[0m Next.js 14
    \x1b[38;2;196;167;231m▟███████████████████▙ ▜███▙    ▟██▙\x1b[0m       \x1b[38;2;224;222;244mUptime:\x1b[0m since 2021
           \x1b[38;2;196;167;231m▄▄▄▄▖           ▜███▙  ▟███▛\x1b[0m       \x1b[38;2;224;222;244mPackages:\x1b[0m TypeScript, Python, Nix, Docker
          \x1b[38;2;196;167;231m▟███▛             ▜██▛ ▟███▛\x1b[0m        \x1b[38;2;224;222;244mShell:\x1b[0m nix-shell
         \x1b[38;2;196;167;231m▟███▛               ▜▛ ▟███▛\x1b[0m         \x1b[38;2;224;222;244mTerminal:\x1b[0m xterm.js
\x1b[38;2;196;167;231m▟███████████▛                  ▟██████████▙\x1b[0m   \x1b[38;2;224;222;244mDE:\x1b[0m GNOME (Web Edition)
\x1b[38;2;196;167;231m▜██████████▛                  ▟███████████▛\x1b[0m   \x1b[38;2;224;222;244mTheme:\x1b[0m Rosé Pine
      \x1b[38;2;196;167;231m▟███▛ ▟▙               ▟███▛\x1b[0m            \x1b[38;2;224;222;244mRole:\x1b[0m AI Engineer
     \x1b[38;2;196;167;231m▟███▛ ▟██▙             ▟███▛\x1b[0m             \x1b[38;2;224;222;244mContact:\x1b[0m github.com/Hetav21
    \x1b[38;2;196;167;231m▟███▛  ▜███▙           ▝▀▀▀▀\x1b[0m
    \x1b[38;2;196;167;231m▜██▛    ▜███▙ ▜██████████████████▛\x1b[0m
     \x1b[38;2;196;167;231m▜▛     ▟████▙ ▜████████████████▛\x1b[0m
           \x1b[38;2;196;167;231m▟██████▙       ▜███▙\x1b[0m
          \x1b[38;2;196;167;231m▟███▛▜███▙       ▜███▙\x1b[0m
         \x1b[38;2;196;167;231m▟███▛  ▜███▙       ▜███▙\x1b[0m
         \x1b[38;2;196;167;231m▝▀▀▀    ▀▀▀▀▘       ▀▀▀▘\x1b[0m
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
        // Rose Pine foam for directories
        if (f.type === 'directory') return `\x1b[38;2;156;207;216m${f.name}\x1b[0m`;
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
