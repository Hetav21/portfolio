"use client";

import React, { useState, useEffect } from 'react';
import { Folder, FileText, ChevronRight, LayoutGrid, List as ListIcon, ArrowLeft, Search, Home } from 'lucide-react';
import { listDirectory } from '@/lib/filesystem';
import { useSystemStore } from '@/lib/store';
import { FileSystemNode } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function Files() {
  const [currentPath, setCurrentPath] = useState('/home/hetav');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [files, setFiles] = useState<FileSystemNode[]>([]);
  const openWindow = useSystemStore((state) => state.openWindow);
  const setEditorContent = useSystemStore((state) => state.setEditorContent);

  useEffect(() => {
    const contents = listDirectory(currentPath);
    if (contents) {
      setFiles(contents);
    } else {
        setFiles([]);
    }
  }, [currentPath]);

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
    <div className="flex flex-col h-full bg-[#1e1e2e] text-gray-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#181825]">
        <div className="flex items-center space-x-2">
            <button 
                onClick={handleUp} 
                disabled={currentPath === '/'}
                className="p-1.5 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors"
            >
                <ArrowLeft size={18} />
            </button>
            
            <div className="flex items-center space-x-1 px-2 py-1 bg-[#313244] rounded-md text-sm">
                <button 
                    onClick={() => setCurrentPath('/')}
                    className="p-1 hover:bg-white/10 rounded-md"
                >
                    <Home size={14} />
                </button>
                {breadcrumbs.map((part, index) => {
                    const path = '/' + breadcrumbs.slice(0, index + 1).join('/');
                    return (
                        <div key={path} className="flex items-center">
                            <ChevronRight size={14} className="text-gray-500 mx-1" />
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
            <div className="flex bg-[#313244] rounded-lg p-1">
                <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === 'grid' ? "bg-[#45475a] text-white shadow-sm" : "text-gray-400 hover:text-white"
                    )}
                >
                    <LayoutGrid size={16} />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === 'list' ? "bg-[#45475a] text-white shadow-sm" : "text-gray-400 hover:text-white"
                    )}
                >
                    <ListIcon size={16} />
                </button>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Search size={18} />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Folder size={48} className="mb-4 opacity-20" />
                <p>Empty directory</p>
            </div>
        ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {files.map((file, i) => (
                    <button
                        key={i}
                        onClick={() => handleFileClick(file)}
                        className="group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors focus:bg-white/10 focus:outline-none"
                    >
                        <div className="mb-3 text-blue-400 group-hover:scale-110 transition-transform duration-200">
                            {file.type === 'directory' ? (
                                <Folder size={48} fill="currentColor" fillOpacity={0.2} />
                            ) : (
                                <FileText size={48} className="text-gray-400" />
                            )}
                        </div>
                        <span className="text-sm text-center truncate w-full px-2 text-gray-300 group-hover:text-white">
                            {file.name}
                        </span>
                    </button>
                ))}
            </div>
        ) : (
            <div className="flex flex-col">
                <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-gray-500 border-b border-white/5">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-4">Type</div>
                    <div className="col-span-2 text-right">Size</div>
                </div>
                {files.map((file, i) => (
                    <button
                        key={i}
                        onClick={() => handleFileClick(file)}
                        className="grid grid-cols-12 items-center px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 text-left group"
                    >
                        <div className="col-span-6 flex items-center space-x-3">
                            {file.type === 'directory' ? (
                                <Folder size={18} className="text-blue-400" fill="currentColor" fillOpacity={0.2} />
                            ) : (
                                <FileText size={18} className="text-gray-400" />
                            )}
                            <span className="text-sm text-gray-300 group-hover:text-white">{file.name}</span>
                        </div>
                        <div className="col-span-4 text-xs text-gray-500">
                            {file.type === 'directory' ? 'Folder' : 'Text File'}
                        </div>
                        <div className="col-span-2 text-xs text-gray-500 text-right">
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
