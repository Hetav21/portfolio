export type AppId =
  | 'terminal'
  | 'files'
  | 'about'
  | 'projects'
  | 'contact'
  | 'editor'
  | 'browser'
  | 'resume';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string; // For files
  children?: FileSystemNode[]; // For directories
}
