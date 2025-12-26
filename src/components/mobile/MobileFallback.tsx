import React from 'react';
import { NixosLogo } from '@/assets/nixos-logo';
import { Github, Linkedin } from 'lucide-react';

interface MobileFallbackProps {
  onContinue: () => void;
}

export const MobileFallback: React.FC<MobileFallbackProps> = ({ onContinue }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-black p-6 text-center text-white">
      <div className="mb-8 animate-pulse">
        <NixosLogo className="h-24 w-24 text-blue-400" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold tracking-tight">Hetav Shah</h1>
      <h2 className="mb-6 text-xl text-blue-300">AI Engineer</h2>
      
      <p className="mb-8 max-w-md text-gray-300">
        This experience is designed for desktop browsers to fully showcase the NixOS GNOME environment.
      </p>
      
      <div className="flex w-full max-w-xs flex-col space-y-4">
        <a 
          href="https://github.com/Hetav21" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 rounded-lg bg-gray-800 px-6 py-3 font-medium transition-colors hover:bg-gray-700"
        >
          <Github size={20} />
          <span>View on GitHub</span>
        </a>
        
        <a 
          href="https://www.linkedin.com/in/hetav2106/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 rounded-lg bg-[#0077b5] px-6 py-3 font-medium transition-colors hover:bg-[#006097]"
        >
          <Linkedin size={20} />
          <span>Connect on LinkedIn</span>
        </a>
      </div>
      
      <button 
        onClick={onContinue}
        className="mt-8 text-sm text-gray-500 underline decoration-dotted transition-colors hover:text-gray-300"
      >
        Continue anyway (experience may be degraded)
      </button>
    </div>
  );
};
