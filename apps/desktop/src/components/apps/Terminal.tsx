'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useSystemStore } from '@/lib/store';
import { executeCommand, isNixShell, commandHistory } from '@/lib/commands';
import { getSuggestions } from '@/lib/autocomplete';
import { currentPath } from '@/lib/filesystem';
import '@xterm/xterm/css/xterm.css';

// Rose Pine Dark terminal theme
const rosePineDarkTheme = {
  background: '#191724',
  foreground: '#e0def4',
  cursor: '#524f67',
  cursorAccent: '#e0def4',
  selectionBackground: '#403d52',
  black: '#26233a',
  red: '#eb6f92',
  green: '#9ccfd8',
  yellow: '#f6c177',
  blue: '#31748f',
  magenta: '#c4a7e7',
  cyan: '#9ccfd8',
  white: '#e0def4',
  brightBlack: '#6e6a86',
  brightRed: '#eb6f92',
  brightGreen: '#9ccfd8',
  brightYellow: '#f6c177',
  brightBlue: '#31748f',
  brightMagenta: '#c4a7e7',
  brightCyan: '#9ccfd8',
  brightWhite: '#e0def4',
};

// Rose Pine Dawn (light) terminal theme
const rosePineLightTheme = {
  background: '#faf4ed',
  foreground: '#575279',
  cursor: '#9893a5',
  cursorAccent: '#575279',
  selectionBackground: '#dfdad9',
  black: '#f2e9e1',
  red: '#b4637a',
  green: '#56949f',
  yellow: '#ea9d34',
  blue: '#286983',
  magenta: '#907aa9',
  cyan: '#56949f',
  white: '#575279',
  brightBlack: '#9893a5',
  brightRed: '#b4637a',
  brightGreen: '#56949f',
  brightYellow: '#ea9d34',
  brightBlue: '#286983',
  brightMagenta: '#907aa9',
  brightCyan: '#56949f',
  brightWhite: '#575279',
};

export default function TerminalApp() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const commandRef = useRef('');
  const historyIndexRef = useRef(-1);
  const isInitializedRef = useRef(false);

  const store = useSystemStore();
  const theme = useSystemStore((state) => state.theme);
  const storeRef = useRef(store);

  useEffect(() => {
    storeRef.current = store;
  }, [store]);

  const focusTerminal = useCallback(() => {
    if (xtermRef.current && isInitializedRef.current) {
      xtermRef.current.focus();
    }
  }, []);

  const safeFit = useCallback(() => {
    if (!isInitializedRef.current) return;
    if (!fitAddonRef.current || !terminalRef.current || !xtermRef.current) return;
    if (!xtermRef.current.element) return;

    const { clientWidth, clientHeight } = terminalRef.current;
    if (clientWidth === 0 || clientHeight === 0) return;

    try {
      fitAddonRef.current.fit();
    } catch {
      // Ignore fit errors during transitions
    }
  }, []);

  // Handle theme changes without remounting
  useEffect(() => {
    if (xtermRef.current && isInitializedRef.current) {
      const termTheme = theme === 'dark' ? rosePineDarkTheme : rosePineLightTheme;
      xtermRef.current.options.theme = termTheme;
    }
  }, [theme]);

  // Main terminal initialization - runs once
  useEffect(() => {
    if (!terminalRef.current) return;

    const container = terminalRef.current;

    // Wait for container to have dimensions before initializing
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          observer.disconnect();
          // Trigger re-render by updating a ref won't work, so we'll just retry
          initTerminal();
        }
      });
      observer.observe(container);
      return () => observer.disconnect();
    }

    function initTerminal() {
      if (isInitializedRef.current || !terminalRef.current) return;

      const initialTheme = useSystemStore.getState().theme;
      const termTheme = initialTheme === 'dark' ? rosePineDarkTheme : rosePineLightTheme;

      const term = new Terminal({
        cursorBlink: true,
        fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
        fontSize: 14,
        theme: termTheme,
        allowTransparency: true,
        convertEol: true,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      term.open(terminalRef.current);

      xtermRef.current = term;
      fitAddonRef.current = fitAddon;
      isInitializedRef.current = true;

      // Initial fit and focus
      requestAnimationFrame(() => {
        if (!isInitializedRef.current) return;

        try {
          fitAddon.fit();
        } catch {
          // Ignore
        }

        term.focus();

        // Starship-style prompt colors
        const foam = '\x1b[38;2;156;207;216m';
        const green = '\x1b[38;2;156;207;216m';
        const reset = '\x1b[0m';
        const bold = '\x1b[1m';

        const getPrompt = () => {
          let displayPath = currentPath;
          if (displayPath.startsWith('/home/hetav')) {
            displayPath = displayPath.replace('/home/hetav', '~');
          }

          if (isNixShell) {
            return `${foam}${bold}${displayPath}${reset} ${bold}[nix]${reset}\r\n${green}❯${reset} `;
          }
          return `${foam}${bold}${displayPath}${reset}\r\n${green}❯${reset} `;
        };

        const prompt = () => {
          if (!isInitializedRef.current) return;
          term.write(getPrompt());
        };

        term.write(executeCommand('fastfetch', storeRef.current));
        term.write('\r\n');
        prompt();

        term.onKey(({ key, domEvent }) => {
          if (!isInitializedRef.current) return;

          const char = domEvent.key;

          if (char === 'Enter') {
            term.write('\r\n');
            const command = commandRef.current.trim();

            if (command) {
              const output = executeCommand(command, storeRef.current);

              if (output === '__CLEAR__') {
                term.clear();
              } else if (output) {
                term.write(output.replace(/\n/g, '\r\n'));
                term.write('\r\n');
              }

              historyIndexRef.current = -1;
            }

            commandRef.current = '';
            prompt();
          } else if (char === 'Backspace') {
            if (commandRef.current.length > 0) {
              commandRef.current = commandRef.current.slice(0, -1);
              term.write('\b \b');
            }
          } else if (char === 'ArrowUp') {
            if (historyIndexRef.current < commandHistory.length - 1) {
              historyIndexRef.current++;
              const historyCmd =
                commandHistory[commandHistory.length - 1 - historyIndexRef.current];

              const currentLen = commandRef.current.length;
              for (let i = 0; i < currentLen; i++) {
                term.write('\b \b');
              }

              commandRef.current = historyCmd;
              term.write(historyCmd);
            }
          } else if (char === 'ArrowDown') {
            if (historyIndexRef.current > -1) {
              historyIndexRef.current--;

              const currentLen = commandRef.current.length;
              for (let i = 0; i < currentLen; i++) {
                term.write('\b \b');
              }

              if (historyIndexRef.current === -1) {
                commandRef.current = '';
              } else {
                const historyCmd =
                  commandHistory[commandHistory.length - 1 - historyIndexRef.current];
                commandRef.current = historyCmd;
                term.write(historyCmd);
              }
            }
          } else if (char === 'Tab') {
            domEvent.preventDefault();
            const suggestions = getSuggestions(commandRef.current);

            if (suggestions.length === 1) {
              const parts = commandRef.current.split(' ');
              const lastPart = parts[parts.length - 1];

              let completion = '';
              const suggestion = suggestions[0];

              if (lastPart.includes('/')) {
                const lastSlash = lastPart.lastIndexOf('/');
                const prefix = lastPart.slice(lastSlash + 1);
                completion = suggestion.slice(prefix.length);
              } else {
                completion = suggestion.slice(lastPart.length);
              }

              commandRef.current += completion;
              term.write(completion);
            } else if (suggestions.length > 1) {
              term.write('\r\n' + suggestions.join('  ') + '\r\n');
              prompt();
              term.write(commandRef.current);
            }
          } else if (
            char.length === 1 &&
            !domEvent.altKey &&
            !domEvent.ctrlKey &&
            !domEvent.metaKey
          ) {
            commandRef.current += key;
            term.write(key);
          }
        });
      });
    }

    initTerminal();

    let resizeTimeout: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      if (!isInitializedRef.current) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(safeFit, 50);
    });

    resizeObserver.observe(container);

    const handleResize = () => {
      if (!isInitializedRef.current) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(safeFit, 50);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isInitializedRef.current = false;

      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      if (xtermRef.current) {
        try {
          xtermRef.current.dispose();
        } catch {
          // Ignore disposal errors
        }
      }

      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, [safeFit]);

  const windowState = store.windows['terminal'];
  useEffect(() => {
    if (windowState.isOpen && isInitializedRef.current) {
      const timeout = setTimeout(() => {
        safeFit();
        focusTerminal();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [windowState.size, windowState.isOpen, windowState.isMaximized, safeFit, focusTerminal]);

  const bgColor = theme === 'dark' ? '#191724' : '#faf4ed';

  return (
    <div
      ref={terminalRef}
      className="h-full w-full p-1 cursor-text"
      style={{ backgroundColor: bgColor }}
      onMouseDown={focusTerminal}
      onClick={focusTerminal}
    />
  );
}
