# Playwright + Bun Integration Design

## Overview

Integrate Playwright testing framework into the existing Bun development environment flake.

## Requirements

- **Package Manager**: Bun only (no npm/pnpm)
- **Runtime**: Keep Node.js alongside Bun for Playwright compatibility
- **Browsers**: Nix-managed via `playwright-driver.browsers`
- **Project Name**: gnome-nixos

## Changes

### flake.nix

Merge Playwright template configuration:

- Add `nodejs` package
- Add `playwright-driver.browsers` package
- Add environment variables for Playwright browser paths
- Update shellHook for bun workflow

### New Files

**package.json**

- Name: gnome-nixos
- Bun-based test scripts
- Dependencies: @playwright/test, @types/bun, typescript

**playwright.config.ts**

- Standard Playwright configuration
- Test directory: ./tests
- Browsers: chromium, firefox, webkit

### Workflow

```bash
# Enter dev shell
nix develop

# Install dependencies
bun install

# Run tests
bun run test
bun run test:headed
bun run test:debug
```

## Source

Based on template at `/etc/nixos/templates/playwright`
