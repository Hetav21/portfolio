# RESUME AGENT

**Type:** Micro-app PDF Viewer (Next.js 15 + React-PDF)

## ENTRY POINTS

- `/`: Native iframe viewer for `/resume.pdf`.
- `/simplified`: React-PDF canvas rendering for optimized embedding.

## DATA

- `public/resume.pdf`: Compiled resume artifact.
- `latex/`: Source files (LaTeX) for generating the resume.

## DEVELOPMENT

### Updating the Resume

1. **Edit Source**: Modify `apps/resume/latex/resume.tex`.
2. **Compile**: Run the build script to generate the PDF.
   ```bash
   bun --filter resume compile-resume
   ```
   _Note: Requires `nix develop` environment (provides `tectonic`)._
3. **Commit**: Commit both the `.tex` source and updated `public/resume.pdf`.

### Infrastructure

- **Engine**: Tectonic (XeTeX-based). Zero-config, auto-downloads packages.
- **Nix**: `flake.nix` includes `tectonic` in the devShell.

## INTEGRATION

- **CORS**: Required for embedding `apps/resume` into `apps/web`.
- **Headers**: Configured in `next.config.ts` to allow `apps/web` origin.
- **Port**: Runs on `3002` by default.
