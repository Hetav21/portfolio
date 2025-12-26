'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useSystemStore } from '@/lib/store';
import { executeCommand, isNixShell, commandHistory } from '@/lib/commands';
import { currentPath } from '@/lib/filesystem';
import 'xterm/css/xterm.css';

// Rose Pine terminal theme
const rosePineTheme = {
  background: '#191724',     // Rose Pine base
  foreground: '#e0def4',     // Rose Pine text
  cursor: '#524f67',         // Rose Pine highlight med
  cursorAccent: '#e0def4',
  selectionBackground: '#403d52',
  black: '#26233a',          // Rose Pine overlay
  red: '#eb6f92',            // Rose Pine love
  green: '#9ccfd8',          // Rose Pine foam
  yellow: '#f6c177',         // Rose Pine gold
  blue: '#31748f',           // Rose Pine pine
  magenta: '#c4a7e7',        // Rose Pine iris
  cyan: '#9ccfd8',           // Rose Pine foam
  white: '#e0def4',          // Rose Pine text
  brightBlack: '#6e6a86',    // Rose Pine muted
  brightRed: '#eb6f92',
  brightGreen: '#9ccfd8',
  brightYellow: '#f6c177',
  brightBlue: '#31748f',
  brightMagenta: '#c4a7e7',
  brightCyan: '#9ccfd8',
  brightWhite: '#e0def4',
};

export default function TerminalApp() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const commandRef = useRef('');
  const historyIndexRef = useRef(-1);
  
  const store = useSystemStore();
  
  const storeRef = useRef(store);
  useEffect(() => {
    storeRef.current = store;
  }, [store]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"Fira Code", "JetBrains Mono", monospace',
      fontSize: 14,
      theme: rosePineTheme,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    term.open(terminalRef.current);
    fitAddon.fit();
    
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const getPrompt = () => {
      let displayPath = currentPath;
      if (displayPath.startsWith('/home/hetav')) {
        displayPath = displayPath.replace('/home/hetav', '~');
      }
      
      if (isNixShell) {
        // Rose Pine foam (green-ish) for nix-shell
        return `\x1b[1;38;2;156;207;216m[nix-shell:${displayPath}]$\x1b[0m `;
      }
      // Rose Pine iris for user, foam for path
      return `\x1b[1;38;2;196;167;231mhetav@portfolio\x1b[0m:\x1b[1;38;2;156;207;216m${displayPath}\x1b[0m$ `;
    };

    const prompt = () => {
      term.write(getPrompt());
    };

    // Initial greeting
    term.write(executeCommand('fastfetch', storeRef.current));
    term.write('\r\n');
    prompt();

    term.onKey(({ key, domEvent }) => {
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
          const historyCmd = commandHistory[commandHistory.length - 1 - historyIndexRef.current];
          
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
             const historyCmd = commandHistory[commandHistory.length - 1 - historyIndexRef.current];
             commandRef.current = historyCmd;
             term.write(historyCmd);
          }
        }
      } else if (char.length === 1 && !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey) {
        commandRef.current += key;
        term.write(key);
      }
    });

    const handleResize = () => {
      fitAddon.fit();
    };
    
    const resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
    });
    resizeObserver.observe(terminalRef.current);
    
    window.addEventListener('resize', handleResize);

    return () => {
      term.dispose();
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const windowState = store.windows['terminal'];
  useEffect(() => {
    if (windowState.isOpen && fitAddonRef.current) {
        setTimeout(() => {
            fitAddonRef.current?.fit();
        }, 50);
    }
  }, [windowState.size, windowState.isOpen, windowState.isMaximized]);

  return (
    <div 
      ref={terminalRef} 
      className="h-full w-full bg-[#191724] p-1"
      onClick={() => xtermRef.current?.focus()} 
    />
  );
}
