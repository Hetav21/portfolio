# NixOS GNOME Portfolio Monorepo

A dual-application monorepo containing a NixOS-themed Desktop Portfolio (`apps/web`), a static Blog (`apps/blog`), and a Resume Viewer (`apps/resume`). Powered by Next.js, Tailwind v4, and Bun.

![NixOS](https://img.shields.io/badge/NixOS-5277C3?style=flat&logo=nixos&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Turbo](https://img.shields.io/badge/Turbo-EF4444?style=flat&logo=turborepo&logoColor=white)

## Projects

### Desktop (`apps/web`)

A portfolio website designed as an interactive NixOS GNOME desktop environment.

- **Boot Sequence** — Authentic NixOS-style boot animation
- **GNOME Desktop** — Faithful recreation of GNOME shell
- **Interactive Apps** — Terminal, File Manager, PDF Viewer, Browser (embeds blog)

### Blog (`apps/blog`)

A content site powered by Velite and MDX.

- **MDX Content** — Type-safe content management with Velite
- **Static Generation** — Fast, static blog posts

### Resume (`apps/resume`)

A dedicated micro-application for rendering the resume PDF.

- **PDF Rendering** — High-fidelity canvas rendering via `react-pdf`
- **Dual Mode** — Simplified view for embedding, full view for direct access
- **LaTeX Source** — Source-controlled LaTeX files for PDF generation

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime (recommended)
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/Hetav21/portfolio.git
cd portfolio

# Install dependencies (from root)
bun install

# Start development server (runs all apps)
bun dev
```

- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Blog App**: [http://localhost:3001](http://localhost:3001)
- **Resume App**: [http://localhost:3002](http://localhost:3002)

### Using Nix

```bash
# Enter development shell
nix develop

# Start servers
bun dev
```

## Commands

| Command                   | Description                |
| ------------------------- | -------------------------- |
| `bun dev`                 | Start all apps in parallel |
| `bun --filter web dev`    | Start only Desktop app     |
| `bun --filter blog dev`   | Start only Blog app        |
| `bun --filter resume dev` | Start only Resume app      |
| `bun run build`           | Build all apps             |
| `bun run lint`            | Lint all apps              |

## Project Structure

```
.
├── apps/
│   ├── web/     # Desktop Environment (Next.js 16)
│   ├── blog/    # Content Site (Next.js 15, Velite)
│   └── resume/  # PDF Viewer (Next.js 15, React-PDF)
├── docs/        # Architecture plans
├── flake.nix    # Nix environment
└── turbo.json   # Build pipeline configuration
```

## Tech Stack

- **Monorepo**: Turbo + Bun workspaces
- **Framework**: Next.js 16 (Web) / 15 (Blog, Resume)
- **Styling**: Tailwind CSS 4
- **State**: Zustand (Web)
- **Content**: Velite (Blog)
- **PDF**: React-PDF (Resume)

## Acknowledgements

### Design System

| Resource                  | Source                                          | License |
| ------------------------- | ----------------------------------------------- | ------- |
| **Rose Pine** color theme | [rosepinetheme.com](https://rosepinetheme.com/) | MIT     |
| **JetBrains Mono** font   | [JetBrains](https://www.jetbrains.com/lp/mono/) | OFL-1.1 |

### Icons

| Resource                         | Source                                                     | License                 |
| -------------------------------- | ---------------------------------------------------------- | ----------------------- |
| **GNOME Adwaita Symbolic** icons | [GNOME](https://gitlab.gnome.org/GNOME/adwaita-icon-theme) | LGPL-3.0 / CC-BY-SA-3.0 |
| **Lucide** icons                 | [lucide.dev](https://lucide.dev/)                          | ISC                     |
| **NixOS** logo                   | [NixOS](https://github.com/NixOS/nixos-artwork)            | CC-BY-4.0               |

### Cursors

| Resource                                         | Source                                                          | License |
| ------------------------------------------------ | --------------------------------------------------------------- | ------- |
| **Bibata Modern Ice** cursor theme (inspiration) | [ful1e5/Bibata_Cursor](https://github.com/ful1e5/Bibata_Cursor) | GPL-3.0 |

### Inspiration

- **[GNOME](https://www.gnome.org/)** — Desktop environment design language
- **[NixOS](https://nixos.org/)** — Operating system branding & boot sequence
- **[gnome-online](https://github.com/nicoth-in/gnome-online)** — Web-based GNOME recreation concept
- **[web-toolkit](https://nicoth.in/web-toolkit/)** — GTK-style web components
- **[fastfetch](https://github.com/fastfetch-cli/fastfetch)** — System information display

### Libraries & Tools

| Package                                         | Purpose           |
| ----------------------------------------------- | ----------------- |
| [next](https://nextjs.org/)                     | React framework   |
| [react](https://react.dev/)                     | UI library        |
| [tailwindcss](https://tailwindcss.com/)         | CSS framework     |
| [framer-motion](https://www.framer.com/motion/) | Animation library |
| [zustand](https://zustand-demo.pmnd.rs/)        | State management  |
| [xterm](https://xtermjs.org/)                   | Terminal emulator |
| [lucide-react](https://lucide.dev/)             | Icon library      |
| [playwright](https://playwright.dev/)           | E2E testing       |
| [react-pdf](https://react-pdf.org/)             | PDF rendering     |

## License

This project is open source. See individual acknowledgements above for third-party asset licenses.

---

<p align="center">
  Made by <a href="https://github.com/Hetav21">Hetav</a>
</p>
