# RESUME AGENT

**Type:** Micro-app PDF Viewer (Next.js 15 + React-PDF)

## ENTRY POINTS

- `/`: Native iframe viewer for `/resume.pdf`.
- `/simplified`: React-PDF canvas rendering for optimized embedding.

## DATA

- `public/resume.pdf`: Compiled resume artifact.
- `latex/`: Source files (LaTeX) for generating the resume.

## INTEGRATION

- **CORS**: Required for embedding `apps/resume` into `apps/web`.
- **Headers**: Configured in `next.config.ts` to allow `apps/web` origin.
- **Port**: Runs on `3002` by default.
