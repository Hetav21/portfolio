import { SystemState } from "./store";
import {
    currentPath,
    setCurrentPath,
    listDirectory,
    getFileContent,
    getNode,
} from "./filesystem";
import { AppId } from "./types";

export let isNixShell = false;
export const commandHistory: string[] = [];

// Microfetch-style colors (matching real microfetch output):
// Cyan: \x1b[36m - for parts of NixOS logo
// Blue: \x1b[34m - for other parts of NixOS logo
// Yellow: \x1b[33m - for username
// Red: \x1b[31m - for @ symbol
// Green: \x1b[32m - for hostname
// Magenta: \x1b[35m - for accent

const FASTFETCH_OUTPUT = `
\x1b[36m          ▗▄▄▄       \x1b[34m▗▄▄▄▄    ▄▄▄▖\x1b[0m            \x1b[33mhetav\x1b[31m@\x1b[32mportfolio\x1b[0m
\x1b[36m          ▜███▙       \x1b[34m▜███▙  ▟███▛\x1b[0m            \x1b[36m────────────────\x1b[0m
\x1b[36m           ▜███▙       \x1b[34m▜███▙▟███▛\x1b[0m             \x1b[36mOS\x1b[0m \x1b[34m→\x1b[0m NixOS (Portfolio Edition)
\x1b[36m            ▜███▙       \x1b[34m▜██████▛\x1b[0m              \x1b[36mHost\x1b[0m \x1b[34m→\x1b[0m Hetav Shah
\x1b[36m     ▟█████████████████▙ \x1b[34m▜████▛     ▟▙\x1b[0m        \x1b[36mKernel\x1b[0m \x1b[34m→\x1b[0m Next.js 15
\x1b[36m    ▟███████████████████▙ \x1b[34m▜███▙    ▟██▙\x1b[0m       \x1b[36mUptime\x1b[0m \x1b[34m→\x1b[0m since 2021
\x1b[34m           ▄▄▄▄▖           \x1b[36m▜███▙  ▟███▛\x1b[0m       \x1b[36mPackages\x1b[0m \x1b[34m→\x1b[0m TypeScript, Python, Nix
\x1b[34m          ▟███▛             \x1b[36m▜██▛ ▟███▛\x1b[0m        \x1b[36mShell\x1b[0m \x1b[34m→\x1b[0m nix-shell
\x1b[34m         ▟███▛               \x1b[36m▜▛ ▟███▛\x1b[0m         \x1b[36mTerminal\x1b[0m \x1b[34m→\x1b[0m Ghostty
\x1b[34m▟███████████▛                  \x1b[36m▟██████████▙\x1b[0m   \x1b[36mDE\x1b[0m \x1b[34m→\x1b[0m GNOME (Web Edition)
\x1b[34m▜██████████▛                  \x1b[36m▟███████████▛\x1b[0m   \x1b[36mTheme\x1b[0m \x1b[34m→\x1b[0m Rosé Pine
\x1b[34m      ▟███▛ ▟▙               \x1b[36m▟███▛\x1b[0m            \x1b[36mRole\x1b[0m \x1b[34m→\x1b[0m Software Developer
\x1b[34m     ▟███▛ ▟██▙             \x1b[36m▟███▛\x1b[0m             \x1b[36mContact\x1b[0m \x1b[34m→\x1b[0m github.com/Hetav21
\x1b[34m    ▟███▛  ▜███▙           \x1b[36m▝▀▀▀▀\x1b[0m
\x1b[34m    ▜██▛    ▜███▙ \x1b[36m▜██████████████████▛\x1b[0m        \x1b[36mColors\x1b[0m \x1b[34m→\x1b[0m \x1b[40m  \x1b[41m  \x1b[42m  \x1b[43m  \x1b[44m  \x1b[45m  \x1b[46m  \x1b[47m  \x1b[0m
\x1b[34m     ▜▛     ▟████▙ \x1b[36m▜████████████████▛\x1b[0m                  \x1b[100m  \x1b[101m  \x1b[102m  \x1b[103m  \x1b[104m  \x1b[105m  \x1b[106m  \x1b[107m  \x1b[0m
\x1b[34m           ▟██████▙       \x1b[36m▜███▙\x1b[0m
\x1b[34m          ▟███▛▜███▙       \x1b[36m▜███▙\x1b[0m
\x1b[34m         ▟███▛  ▜███▙       \x1b[36m▜███▙\x1b[0m
\x1b[34m         ▝▀▀▀    ▀▀▀▀▘       \x1b[36m▀▀▀▘\x1b[0m
`;

const foam = "\x1b[36m";
const reset = "\x1b[0m";
const bold = "\x1b[1m";

export const executeCommand = (input: string, store: SystemState): string => {
    const parts = input.trim().split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    if (command !== "") {
        commandHistory.push(input);
    }

    switch (command) {
        case "fastfetch":
        case "neofetch":
        case "microfetch":
            return FASTFETCH_OUTPUT;

        case "ls":
            const files = listDirectory(currentPath);
            if (!files) return `Error: Cannot access '${currentPath}'`;
            return files
                .map((f) => {
                    if (f.type === "directory")
                        return `${foam}${f.name}${reset}`;
                    return f.name;
                })
                .join("  ");

        case "cd":
            if (args.length === 0) {
                setCurrentPath("/home/hetav");
                return "";
            }
            const targetPath = args[0];
            const node = getNode(targetPath);
            if (!node) return `cd: no such file or directory: ${targetPath}`;
            if (node.type !== "directory")
                return `cd: not a directory: ${targetPath}`;

            let newPath = targetPath.startsWith("/")
                ? targetPath
                : `${currentPath}/${targetPath}`;
            const pathParts = newPath.split("/").filter((p) => p && p !== ".");
            const stack: string[] = [];
            for (const p of pathParts) {
                if (p === "..") {
                    if (stack.length > 0) stack.pop();
                } else {
                    stack.push(p);
                }
            }
            newPath = "/" + stack.join("/");

            setCurrentPath(newPath);
            return "";

        case "cat":
            if (args.length === 0) return "cat: missing file operand";
            const content = getFileContent(args[0]);
            if (content === null)
                return `cat: ${args[0]}: No such file or directory`;
            return content;

        case "clear":
            return "__CLEAR__";

        case "help":
            return `${bold}Available commands:${reset}
  ${foam}fastfetch, neofetch, microfetch${reset}  Display system info
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

        case "open":
            if (args.length === 0) return "open: missing application name";
            const appName = args[0].toLowerCase();
            const validApps: AppId[] = [
                "terminal",
                "files",
                "about",
                "projects",
                "contact",
                "editor",
                "browser",
            ];
            if (validApps.includes(appName as AppId)) {
                store.openWindow(appName as AppId);
                return `Opening ${appName}...`;
            }
            return `open: application '${appName}' not found`;

        case "nix-shell":
            isNixShell = !isNixShell;
            return isNixShell
                ? "Entering nix-shell..."
                : "Exiting nix-shell...";

        case "whoami":
            return "hetav";

        case "pwd":
            return currentPath;

        case "echo":
            return args.join(" ");

        case "history":
            return commandHistory.join("\n");

        case "exit":
            store.closeWindow("terminal");
            return "";

        case "":
            return "";

        default:
            return `command not found: ${command}`;
    }
};
