# NixOS-Themed GNOME Portfolio — Design Document

## Overview

A full desktop OS simulation portfolio website styled after GNOME + NixOS. The experience includes a stylized boot sequence, a functional GNOME desktop shell, and a terminal-centric interaction model with `fastfetch` on startup.

**Owner:** Hetav Shah  
**Role:** AI Engineer  
**Date:** 2025-12-26

---

## Tech Stack

| Layer      | Technology                               |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 14 (App Router)                  |
| Styling    | Tailwind CSS + Adwaita CSS variables     |
| Components | shadcn/ui (Dialog, DropdownMenu, Button) |
| Animation  | Framer Motion                            |
| Terminal   | xterm.js                                 |
| State      | Zustand                                  |
| Icons      | Lucide React + custom Adwaita-style SVGs |

---

## Architecture

### Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Theme provider, fonts
│   ├── page.tsx                   # Boot → Desktop entry
│   └── globals.css                # Tailwind + Adwaita variables
├── components/
│   ├── boot/
│   │   └── BootSequence.tsx       # NixOS logo animation + progress
│   ├── desktop/
│   │   ├── Desktop.tsx            # Main shell container
│   │   ├── TopBar.tsx             # Activities, clock, controls
│   │   ├── Dock.tsx               # Bottom app launcher
│   │   └── ActivitiesOverview.tsx # Window grid + app search
│   ├── window/
│   │   ├── WindowManager.tsx      # Handles all open windows
│   │   └── Window.tsx             # Draggable/resizable container
│   ├── apps/
│   │   ├── Terminal.tsx           # xterm.js + command handler
│   │   ├── Files.tsx              # Nautilus-style browser
│   │   ├── AboutMe.tsx            # Settings > About panel
│   │   ├── Projects.tsx           # Project grid/cards
│   │   ├── Contact.tsx            # Form + social links
│   │   ├── TextEditor.tsx         # Read-only code viewer
│   │   └── Browser.tsx            # Iframe wrapper
│   └── mobile/
│       └── MobileFallback.tsx     # Desktop-only message
├── lib/
│   ├── filesystem.ts              # Virtual FS structure
│   ├── commands.ts                # Terminal command implementations
│   ├── window-store.ts            # Zustand store for windows
│   └── theme-store.ts             # Light/dark state
├── assets/
│   └── nixos-logo.svg             # Official snowflake
└── styles/
    └── adwaita.css                # Light/dark CSS variables
```

---

## Boot Sequence

**Duration:** 3-5 seconds (skippable via click or keypress)

1. Black screen fades in
2. NixOS snowflake logo animates in (SVG path drawing or particle assembly effect)
3. Progress bar fills beneath the logo
4. Text below: "Starting Hetav's Portfolio..."
5. Fade to white/dark → GNOME desktop appears

---

## Desktop Shell

### Top Bar

- **Left:** "Activities" button
- **Center:** Clock
- **Right:** Theme toggle, GitHub/LinkedIn icons, power menu (with "Restart" to replay boot)

### Activities Overview

- Triggered by clicking "Activities" or pressing `Super`
- Shows all open windows in a grid + app launcher at bottom
- Animated with Framer Motion scale/opacity

### Wallpaper

- NixOS-branded gradient (dark blue → purple)
- Changes with light/dark theme

### Dock (Dash)

- Fixed bottom dock
- Apps: Files, Terminal, Projects, About, Contact, Text Editor, Browser
- Icons styled like Adwaita

### Window Behavior

- Draggable by title bar
- Resizable from edges/corners
- Close/minimize/maximize buttons (Adwaita style: left side)
- Windows stack with z-index; clicking brings to front
- Smooth open/close animations

---

## Apps

### Terminal (Core Experience)

- Uses `xterm.js` with NixOS theme
- On open: Displays `fastfetch` output automatically
- Prompt style: `[nix-shell:~]$ ` (green, bold)

**Supported Commands:**

| Command                  | Behavior                                      |
| ------------------------ | --------------------------------------------- |
| `fastfetch` / `neofetch` | Shows NixOS ASCII logo + system specs         |
| `ls`                     | Lists contents of current virtual directory   |
| `cd <dir>`               | Navigate virtual filesystem                   |
| `cat <file>`             | Display file contents                         |
| `clear`                  | Clears terminal                               |
| `help`                   | Lists available commands                      |
| `open <app>`             | Opens a desktop app                           |
| `nix-shell`              | Simulated shell change (changes prompt style) |
| `whoami`                 | Returns "hetav"                               |
| `pwd`                    | Print working directory                       |
| `echo`                   | Basic echo support                            |
| `history`                | Show command history                          |
| `exit`                   | Closes the terminal window                    |

**Virtual Filesystem:**

```
/home/hetav/
├── projects/
│   ├── project-1/
│   │   └── README.md
│   ├── project-2/
│   └── project-3/
├── documents/
│   └── resume.txt
└── .config/
    └── about.txt
```

### Files App (Nautilus-style)

- Grid/list view toggle
- Breadcrumb navigation
- Click folders to navigate, click files to open in Text Editor
- Icons match file types

### About Me App

- Photo/avatar at top
- Name: Hetav Shah
- Role: AI Engineer
- "System specs": TypeScript, Nix, Docker, Python
- Machine: "Portfolio v1.0"

### Projects App

- Grid of project cards (thumbnail, title, description)
- Click to open detailed view
- Links to GitHub repos

### Contact App

- Form with Name, Email, Message fields
- Direct links: GitHub, LinkedIn

### Text Editor

- Read-only code/text viewer with syntax highlighting
- Opens when you `cat` a file or click in Files

### Web Browser

- Simple iframe wrapper with URL bar
- Loads external links

---

## Fastfetch Output

```
          ▗▄▄▄       ▗▄▄▄▄    ▄▄▄▖            hetav@portfolio
          ▜███▙       ▜███▙  ▟███▛            ────────────────
           ▜███▙       ▜███▙▟███▛             OS: NixOS (Portfolio Edition)
            ▜███▙       ▜██████▛              Host: Hetav Shah
     ▟█████████████████▙ ▜████▛     ▟▙        Kernel: Next.js 14
    ▟███████████████████▙ ▜███▙    ▟██▙       Uptime: since 2021
           ▄▄▄▄▖           ▜███▙  ▟███▛       Packages: TypeScript, Python, Nix, Docker
          ▟███▛             ▜██▛ ▟███▛        Shell: nix-shell
         ▟███▛               ▜▛ ▟███▛         Terminal: xterm.js
▟███████████▛                  ▟██████████▙   DE: GNOME (Web Edition)
▜██████████▛                  ▟███████████▛   Theme: Adwaita Dark
      ▟███▛ ▟▙               ▟███▛            Role: AI Engineer
     ▟███▛ ▟██▙             ▟███▛             Contact: github.com/Hetav21
    ▟███▛  ▜███▙           ▝▀▀▀▀
    ▜██▛    ▜███▙ ▜██████████████████▛
     ▜▛     ▟████▙ ▜████████████████▛
           ▟██████▙       ▜███▙
          ▟███▛▜███▙       ▜███▙
         ▟███▛  ▜███▙       ▜███▙
         ▝▀▀▀    ▀▀▀▀▘       ▀▀▀▘
```

**Colors:** Left side in NixOS blue (`#7ebae4`), right side in NixOS cyan (`#5277c3`).

---

## Theme System

### Color Palette (NixOS + Adwaita)

| Color Name       | Hex Code  | Usage                            |
| ---------------- | --------- | -------------------------------- |
| Argentinian Blue | `#7ebae4` | Primary brand blue (lighter)     |
| Afghani Blue     | `#5277c3` | Secondary brand blue (darker)    |
| Italian Violet   | `#9e73c8` | Accent (buttons, indicators)     |
| Zambian Green    | `#65b86e` | Success states / Terminal prompt |
| Chinese Magenta  | `#ce4a89` | Error states / Accent            |
| Indian Gold      | `#cbaa4b` | Warning states                   |

### Theme Toggle

- Available in Top Bar and Settings app
- Default: Dark theme
- Persisted in localStorage

### Adwaita Dark

- Background: `#242424`
- Surface: `#303030`
- Text: `#ffffff`

### Adwaita Light

- Background: `#fafafa`
- Surface: `#ffffff`
- Text: `#1e1e1e`

---

## Mobile Handling

**Breakpoint:** `< 1024px` width

**Fallback Page:**

- Centered NixOS logo (static)
- Heading: "Hetav Shah — AI Engineer"
- Subtext: "This experience is designed for desktop browsers."
- Buttons:
  - "View on GitHub" → github.com/Hetav21
  - "Connect on LinkedIn" → linkedin.com/in/hetav2106/
- Optional: "Continue anyway" link

---

## Reference Resources

### Libraries & Inspiration

- [GNOME-online](https://github.com/Bluebaritone21/GNOME-online) — Full GNOME shell simulation
- [web-toolkit](https://github.com/romgrk/web-toolkit) — Adwaita React components
- [xterm.js](https://xtermjs.org/) — Terminal emulator
- [nixos-artwork](https://github.com/NixOS/nixos-artwork) — Official SVG assets
- [fastfetch](https://github.com/fastfetch-cli/fastfetch) — ASCII logo source

### Contact Links

- GitHub: https://github.com/Hetav21
- LinkedIn: https://www.linkedin.com/in/hetav2106/
