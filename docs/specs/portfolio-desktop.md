# Portfolio Desktop Specification

The website is a full desktop OS simulation styled after GNOME + NixOS.

- **Experience**: Includes a stylized boot sequence, a functional GNOME desktop shell, and a terminal-centric interaction model with fastfetch on startup.
- **Tech Stack**: Next.js 14, Tailwind CSS + Adwaita CSS variables, shadcn/ui, Framer Motion, and xterm.js. Global state is managed via Zustand.
- **Desktop Shell**: Features a top bar, activities overview, app dock, and window management with draggable/resizable windows.
- **Apps**: Terminal (with virtual filesystem and command parser), Files, About Me, Projects, Contact, Text Editor, and Web Browser. Includes mobile fallback handling.
