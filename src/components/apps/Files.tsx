"use client";

import React, { useState, useMemo } from 'react';
import { Folder, FileText, ChevronRight, LayoutGrid, List as ListIcon, ArrowLeft, Search, Home } from 'lucide-react';
import { listDirectory } from '@/lib/filesystem';
import { useSystemStore } from '@/lib/store';
import { FileSystemNode } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function Files() {
  const [currentPath, setCurrentPath] = useState('/home/hetav');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const files = useMemo(() => {
      const contents = listDirectory(currentPath);
      return contents || [];
  }, [currentPath]);

  const openWindow = useSystemStore((state) => state.openWindow);
  const setEditorContent = useSystemStore((state) => state.setEditorContent);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleUp = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
    setCurrentPath(parentPath);
  };

  const handleFileClick = (file: FileSystemNode) => {
    if (file.type === 'directory') {
      const newPath = currentPath === '/' ? `/${file.name}` : `${currentPath}/${file.name}`;
      setCurrentPath(newPath);
    } else {
      if (file.content) {
          setEditorContent(file.content);
      }
      openWindow('editor');
    }
  };

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div className="flex flex-col h-full bg-card text-foreground">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center space-x-2">
            <button 
                onClick={handleUp} 
                disabled={currentPath === '/'}
                className="p-1.5 hover:bg-muted rounded-full disabled:opacity-30 transition-colors"
            >
                <ArrowLeft size={18} />
            </button>
            
            <div className="flex items-center space-x-1 px-2 py-1 bg-secondary rounded-md text-sm">
                <button 
                    onClick={() => setCurrentPath('/')}
                    className="p-1 hover:bg-muted rounded-md"
                >
                    <Home size={14} />
                </button>
                {breadcrumbs.map((part, index) => {
                    const path = '/' + breadcrumbs.slice(0, index + 1).join('/');
                    return (
                        <div key={path} className="flex items-center">
                            <ChevronRight size={14} className="text-muted-foreground mx-1" />
                            <button 
                                onClick={() => handleNavigate(path)}
                                className="hover:text-white transition-colors"
                            >
                                {part}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="flex items-center space-x-2">
            <div className="flex bg-secondary rounded-lg p-1">
                <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === 'grid' ? "bg-muted text-white shadow-sm" : "text-muted-foreground hover:text-white"
                    )}
                >
                    <LayoutGrid size={16} />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === 'list' ? "bg-muted text-white shadow-sm" : "text-muted-foreground hover:text-white"
                    )}
                >
                    <ListIcon size={16} />
                </button>
            </div>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Search size={18} />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Folder size={48} className="mb-4 opacity-20" />
                <p>Empty directory</p>
            </div>
        ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {files.map((file, i) => (
                    <button
                        key={i}
                        onClick={() => handleFileClick(file)}
                        className="group flex flex-col items-center p-4 rounded-xl hover:bg-muted transition-colors focus:bg-white/10 focus:outline-none"
                    >
                        <div className="mb-3 text-primary group-hover:scale-110 transition-transform duration-200">
                            {file.type === 'directory' ? (
                                <Folder size={48} fill="currentColor" fillOpacity={0.2} />
                            ) : (
                                <FileText size={48} className="text-muted-foreground" />
                            )}
                        </div>
                        <span className="text-sm text-center truncate w-full px-2 text-foreground group-hover:text-white">
                            {file.name}
                        </span>
                    </button>
                ))}
            </div>
        ) : (
            <div className="flex flex-col">
                <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-4">Type</div>
                    <div className="col-span-2 text-right">Size</div>
                </div>
                {files.map((file, i) => (
                    <button
                        key={i}
                        onClick={() => handleFileClick(file)}
                        className="grid grid-cols-12 items-center px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0 text-left group"
                    >
                        <div className="col-span-6 flex items-center space-x-3">
                            {file.type === 'directory' ? (
                                <Folder size={18} className="text-primary" fill="currentColor" fillOpacity={0.2} />
                            ) : (
                                <FileText size={18} className="text-muted-foreground" />
                            )}
                            <span className="text-sm text-foreground group-hover:text-white">{file.name}</span>
                        </div>
                        <div className="col-span-4 text-xs text-muted-foreground">
                            {file.type === 'directory' ? 'Folder' : 'Text File'}
                        </div>
                        <div className="col-span-2 text-xs text-muted-foreground text-right">
                            {file.type === 'directory' ? '--' : '4 KB'}
                        </div>
                    </button>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
