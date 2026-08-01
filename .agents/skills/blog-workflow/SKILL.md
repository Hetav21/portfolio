---
name: blog-workflow
description: End-to-end blog creation workflow for apps/blog. Spawns specialized subagents across 6 phases (brand strategy, keyword research, drafting, GEO/SEO optimization, technical build verification, and social distribution) to produce a published MDX post in apps/blog/content/posts/.
---

Orchestrate a complete end-to-end blogging lifecycle using **subagents** for each isolated phase. The final deliverable is a published Velite MDX post under `apps/blog/content/posts/<slug>.mdx` and a set of repurposed promotional social posts.

Reference documentation: [docs/specs/blog-workflow.md](file:///home/hetav/Desktop/Code/portfolio/docs/specs/blog-workflow.md)

---

## Process Overview

```
Phase 1: Brand Strategy Subagent (.agents/skills/product-marketing, content-strategy)
   │
   ▼
Phase 2: Keyword Research Subagent (.agents/skills/keyword-research, keyword-clustering, find-keywords)
   │
   ▼
Phase 3: Content Drafting Subagent (.agents/skills/blog, blog-writing-guide, velite) ──> Drafts article text
   │
   ▼
Phase 4: Visual Media & Diagram Subagent (.agents/skills/mermaid-diagrams, diagram-creator) ──> Inserts Mermaid diagrams, schematics & warning callouts
   │
   ▼
Phase 5: GEO & SEO Optimization Subagent (.agents/skills/ai-seo, seo)
   │
   ▼
Phase 6: Technical Audit & Velite Build Verification Subagent (.agents/skills/seo, velite)
   │
   ▼
Phase 7: Social Distribution Subagent (.agents/skills/copywriting, social, twitter-algorithm-optimizer)
```

---

## Step-by-Step Execution Plan

### Step 1: Input Definition & Setup

- Ask the user for the blog topic, target keyword, or goal if not provided in the prompt.
- Ensure the destination directory exists: `apps/blog/content/posts/`.

### Step 2: Phase 1 — Brand Strategy & Positioning (Subagent 1)

- **Tool**: `invoke_subagent` (Role: `Brand Strategy Specialist`)
- **Skills to Consult**: `.agents/skills/product-marketing/SKILL.md`, `.agents/skills/content-strategy/SKILL.md`
- **Goal**: Define target audience, pain points, key takeaways, tone of voice, and value proposition.
- **Output**: Strategy alignment summary.

### Step 3: Phase 2 — Keyword Research & Brief (Subagent 2)

- **Tool**: `invoke_subagent` (Role: `SEO Keyword Specialist`)
- **Skills to Consult**: `.agents/skills/keyword-research/SKILL.md`, `.agents/skills/keyword-clustering/SKILL.md`, `.agents/skills/find-keywords/SKILL.md`
- **Goal**: Analyze search intent, primary & secondary keywords, topical clusters, and generate a structured content brief with headings (H1, H2, H3).
- **Output**: Editorial Content Brief.

### Step 4: Phase 3 — Article Drafting for `apps/blog` (Subagent 3)

- **Tool**: `invoke_subagent` (Role: `Blog Post Drafter`)
- **Skills to Consult**: `.agents/skills/blog/SKILL.md`, `.agents/skills/blog-writing-guide/SKILL.md`, `.agents/skills/velite/SKILL.md`
- **Goal**: Draft the full long-form MDX article text following the Velite schema defined in `apps/blog/velite.config.ts`.
- **Target File**: `apps/blog/content/posts/<slug>.mdx`

### Step 5: Phase 4 — Visual Media & Diagram Architecture (Subagent 4) ⭐ **NEW**

- **Tool**: `invoke_subagent` (Role: `Visual Media & Diagram Specialist`)
- **Skills to Consult**: `.agents/skills/design-doc-mermaid/SKILL.md`, `.agents/skills/mermaid-diagrams/SKILL.md`, `.agents/skills/diagram-creator/SKILL.md`
- **Goal**: Analyze the Phase 3 drafted MDX article text to **discover key concepts, data flows, and architecture steps that require visual representation**. Architect at least 1 mandatory, pedagogically relevant visual asset (architecture flowchart, sequence diagram, data pipeline schematic). Wrap every diagram/image with the AI Generation Warning callout:

  ````mdx
  > [!WARNING]
  > **AI Asset Generation Required**: The diagram/image below is a conceptual placeholder designed to illustrate the system architecture. Use an AI image generation agent (e.g., DALL-E, Midjourney, Imagen) or Mermaid renderer to generate and place the final visual asset.

  ```mermaid
  graph TD
      A[System Entry] --> B[Data Pipeline]
  ```
  ````

  ```

  ```

### Step 6: Phase 5 — GEO & AI Answer Surface Optimization (Subagent 5)

- **Tool**: `invoke_subagent` (Role: `GEO & Search Optimizer`)
- **Skills to Consult**: `.agents/skills/ai-seo/SKILL.md`, `.agents/skills/seo/SKILL.md`
- **Goal**: Optimize the draft for Perplexity, ChatGPT Search, and Google AI Overviews using EEAT principles, direct answer blocks, bullet summaries, and structured citations.

### Step 7: Phase 6 — Technical Audit & Velite Build Verification (Subagent 6)

- **Tool**: `invoke_subagent` (Role: `Build & QA Verifier`)
- **Skills to Consult**: `.agents/skills/seo/SKILL.md`, `.agents/skills/velite/SKILL.md`
- **Goal**: Run `bun --filter blog dev` or `bun run lint` to verify that Velite compiles `.velite` without type errors or missing frontmatter fields, and confirm at least 1 visual diagram callout is present.
- **Verification Command**:
  ```bash
  bun --filter blog dev
  ```

### Step 8: Phase 7 — Social Distribution & Repurposing (Subagent 7)

- **Tool**: `invoke_subagent` (Role: `Social Content Repurposer`)
- **Skills to Consult**: `.agents/skills/copywriting/SKILL.md`, `.agents/skills/social/SKILL.md`, `.agents/skills/twitter-algorithm-optimizer/SKILL.md`
- **Goal**: Generate multi-channel promotional assets (X/Twitter thread optimized for engagement algorithms, LinkedIn post, newsletter blurb).

---

## Completion Criteria

1. Target MDX post published at `apps/blog/content/posts/<slug>.mdx`.
2. Velite build verified clean without errors (`.velite` data generated).
3. Social repurposing copy delivered to the user.
