import React from 'react';
import { NixosLogo } from '@/assets/nixos-logo';
import { Github, Linkedin } from 'lucide-react';

interface MobileFallbackProps {
  onContinue: () => void;
}

export const MobileFallback: React.FC<MobileFallbackProps> = ({ onContinue }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
      {/* Rose Pine gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#191724] via-[#1f1d2e] to-[#26233a] -z-10" />
      
      <div className="mb-8 animate-pulse">
        <NixosLogo className="h-24 w-24 text-primary" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">Hetav Shah</h1>
      <h2 className="mb-6 text-xl text-primary">Software Developer</h2>
      
      <p className="mb-8 max-w-md text-muted-foreground">
        This experience is designed for desktop browsers to fully showcase the NixOS GNOME environment.
      </p>
      
      <div className="flex w-full max-w-xs flex-col space-y-4">
        <a 
          href="https://github.com/Hetav21" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-muted"
        >
          <Github size={20} />
          <span>View on GitHub</span>
        </a>
        
        <a 
          href="https://www.linkedin.com/in/hetav2106/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          <Linkedin size={20} />
          <span>Connect on LinkedIn</span>
        </a>
      </div>
      
      <button 
        onClick={onContinue}
        className="mt-8 text-sm text-muted-foreground underline decoration-dotted transition-colors hover:text-foreground"
      >
        Continue anyway (experience may be degraded)
      </button>
    </div>
  );
};
