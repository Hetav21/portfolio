# NixOS GNOME Portfolio

A portfolio website designed as an interactive NixOS GNOME desktop environment, built with modern web technologies.

![NixOS](https://img.shields.io/badge/NixOS-5277C3?style=flat&logo=nixos&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## ✨ Features

- **Boot Sequence** — Authentic NixOS-style boot animation
- **GNOME Desktop** — Faithful recreation of GNOME shell with top bar and dock
- **Window Manager** — Draggable, resizable windows with minimize/maximize/close
- **Theme Switching** — Dark (Rose Pine) and Light (Rose Pine Dawn) themes
- **Interactive Apps** — Terminal, File Manager, Text Editor, Browser, and more
- **Mobile Fallback** — Graceful degradation for mobile devices

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime (recommended)
- Node.js 18+ (alternative)

### Installation

```bash
# Clone the repository
git clone https://github.com/Hetav21/portfolio.git
cd portfolio

# Install dependencies
bun install

# Start development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

### Using Nix

```bash
# Enter development shell with all dependencies
nix develop

# Run development server
bun run dev
```

## 📦 Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Production build |
| `bun run lint` | Run ESLint |
| `bun test` | Run Playwright tests |
| `bun run test:headed` | Run tests with browser UI |

## 🛠️ Tech Stack

### Core

- **[Next.js 16](https://nextjs.org/)** — React framework with App Router
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Bun](https://bun.sh/)** — JavaScript runtime & package manager

### UI & Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** — Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** — Animations

### State & Terminal

- **[Zustand](https://zustand-demo.pmnd.rs/)** — State management
- **[xterm.js](https://xtermjs.org/)** — Terminal emulator

### Testing

- **[Playwright](https://playwright.dev/)** — End-to-end testing

## 🎨 Acknowledgements

### Design System

| Resource | Source | License |
|----------|--------|---------|
| **Rose Pine** color theme | [rosepinetheme.com](https://rosepinetheme.com/) | MIT |
| **JetBrains Mono** font | [JetBrains](https://www.jetbrains.com/lp/mono/) | OFL-1.1 |

### Icons

| Resource | Source | License |
|----------|--------|---------|
| **GNOME Adwaita Symbolic** icons | [GNOME](https://gitlab.gnome.org/GNOME/adwaita-icon-theme) | LGPL-3.0 / CC-BY-SA-3.0 |
| **Lucide** icons | [lucide.dev](https://lucide.dev/) | ISC |
| **NixOS** logo | [NixOS](https://github.com/NixOS/nixos-artwork) | CC-BY-4.0 |

### Cursors

| Resource | Source | License |
|----------|--------|---------|
| **Bibata Modern Ice** cursor theme (inspiration) | [ful1e5/Bibata_Cursor](https://github.com/ful1e5/Bibata_Cursor) | GPL-3.0 |

### Inspiration

- **[GNOME](https://www.gnome.org/)** — Desktop environment design language
- **[NixOS](https://nixos.org/)** — Operating system branding & boot sequence
- **[gnome-online](https://github.com/nicoth-in/gnome-online)** — Web-based GNOME recreation concept
- **[web-toolkit](https://nicoth.in/web-toolkit/)** — GTK-style web components
- **[fastfetch](https://github.com/fastfetch-cli/fastfetch)** — System information display

### Libraries & Tools

| Package | Purpose |
|---------|---------|
| [next](https://nextjs.org/) | React framework |
| [react](https://react.dev/) | UI library |
| [tailwindcss](https://tailwindcss.com/) | CSS framework |
| [framer-motion](https://www.framer.com/motion/) | Animation library |
| [zustand](https://zustand-demo.pmnd.rs/) | State management |
| [xterm](https://xtermjs.org/) | Terminal emulator |
| [lucide-react](https://lucide.dev/) | Icon library |
| [@radix-ui](https://www.radix-ui.com/) | Accessible primitives |
| [class-variance-authority](https://cva.style/) | Component variants |
| [clsx](https://github.com/lukeed/clsx) | Class name utility |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Tailwind class merging |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) | Animation utilities |
| [playwright](https://playwright.dev/) | E2E testing |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles & theme variables
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── apps/               # Application windows
│   │   ├── AboutMe.tsx
│   │   ├── Browser.tsx
│   │   ├── Contact.tsx
│   │   ├── Files.tsx
│   │   ├── Projects.tsx
│   │   ├── Terminal.tsx
│   │   └── TextEditor.tsx
│   ├── boot/               # Boot sequence
│   ├── desktop/            # Desktop shell (TopBar, Dock, Desktop)
│   ├── icons/              # GNOME symbolic icons
│   ├── mobile/             # Mobile fallback
│   └── window/             # Window management
├── lib/
│   ├── commands.ts         # Terminal commands
│   ├── filesystem.ts       # Virtual filesystem
│   ├── store.ts            # Zustand store
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utilities
public/
├── cursors/                # Bibata-style cursors (SVG)
├── icons/                  # App icons (dark/light variants)
├── nixos-logo.svg          # NixOS branding
└── wallpaper.jpeg          # Desktop wallpaper
```

## 📄 License

This project is open source. See individual acknowledgements above for third-party asset licenses.

---

<p align="center">
  Made with ❄️ by <a href="https://github.com/Hetav21">Hetav</a>
</p>
