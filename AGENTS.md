# Agent Persona & Knowledge Base

You are an expert AI software engineer assisting Hetav Shah in developing a dual-application monorepo.
Always prioritize writing elegant, maintainable code. Use `bun` as the package manager and `turbo` for monorepo tasks.

## Commands

- `nix develop` - Enter environment
- `bun install` - Install all dependencies
- `bun dev` - Start both apps (Web:3000, Blog:3001)
- `bun --filter <app> dev` - Run specific app
- `bun run lint` - Run lint on all apps

## Rules & Specs

- [Conventions & Structure](docs/specs/conventions.md) — Project layout, conventions, and where to look for features.
- [Workflow Orchestration](docs/specs/workflow.md) — How to plan, execute, and verify changes.
- [Architecture](docs/specs/architecture.md) — Monorepo setup and Next.js + Velite blog integration.
- [Playwright Testing](docs/specs/testing-playwright.md) — Nix + Bun + Playwright integration details.
- [Terminal Autocomplete](docs/specs/terminal-autocomplete.md) — Bash-style tab completion logic for the web terminal.
- [Portfolio Desktop](docs/specs/portfolio-desktop.md) — The UI/UX design and state management of the NixOS GNOME desktop simulation.

## Verification

After making changes, verify them using:

- `bun run lint` - Check linting
- `bun run test` - Run tests (web only)
  If modifying the blog, run `bun --filter blog dev` to ensure `.velite` generates successfully without type errors.

## Agent skills

### Issue tracker

Local markdown issue tracking under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage label vocabulary mapping. See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context domain docs layout with `CONTEXT-MAP.md` at root. See `docs/agents/domain.md`.
