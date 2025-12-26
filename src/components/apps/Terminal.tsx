'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useSystemStore } from '@/lib/store';
import { executeCommand, isNixShell, commandHistory } from '@/lib/commands';
import { currentPath } from '@/lib/filesystem';
import 'xterm/css/xterm.css';

export default function TerminalApp() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const commandRef = useRef('');
  const historyIndexRef = useRef(-1);
  
  // Access store directly using the hook
  const store = useSystemStore();
  
  // We need to access the store in the event listener, but the listener is created once.
  // We can use a ref to hold the latest store or just use useSystemStore.getState() if we weren't using the hook.
  // But since we are inside a component, we can use the store from the hook if we reconstruct the listener, 
  // or better, pass the store to executeCommand.
  // But executeCommand needs the store state (for openWindow).
  // I will just pass the current store object from the hook to the execute function.
  // However, the event listener closes over the scope.
  const storeRef = useRef(store);
  useEffect(() => {
    storeRef.current = store;
  }, [store]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"Fira Code", monospace',
      fontSize: 14,
      theme: {
        background: '#1a1b1e',
        foreground: '#ffffff',
        cursor: '#7ebae4',
        green: '#65b86e',
        blue: '#5277c3',
        magenta: '#ce4a89'
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    term.open(terminalRef.current);
    fitAddon.fit();
    
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const getPrompt = () => {
      // Shorten home path for display
      let displayPath = currentPath;
      if (displayPath.startsWith('/home/hetav')) {
        displayPath = displayPath.replace('/home/hetav', '~');
      }
      
      if (isNixShell) {
        return `\x1b[1;32m[nix-shell:${displayPath}]$\x1b[0m `;
      }
      return `\x1b[1;34mhetav@portfolio\x1b[0m:\x1b[1;32m${displayPath}\x1b[0m$ `;
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
          
          commandHistory.push(command); // executeCommand handles pushing to history too? 
          // executeCommand pushes to export commandHistory. 
          // But we also need to reset index.
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
          
          // Clear current line
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
          
          // Clear current line
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

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    
    // Observe resize of the container
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
  }, []); // Empty dependency array means this runs once on mount

  // Watch for window size changes from store to refit
  const windowState = store.windows['terminal'];
  useEffect(() => {
    if (windowState.isOpen && fitAddonRef.current) {
        // slight delay to allow transition
        setTimeout(() => {
            fitAddonRef.current?.fit();
        }, 50);
    }
  }, [windowState.size, windowState.isOpen, windowState.isMaximized]);

  return (
    <div 
      ref={terminalRef} 
      className="h-full w-full bg-card p-1"
      onClick={() => xtermRef.current?.focus()} 
    />
  );
}
