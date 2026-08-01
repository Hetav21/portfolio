---
name: blog-workflow
description: End-to-end blog creation workflow for apps/blog. Spawns specialized subagents across 6 phases (brand strategy, keyword research, drafting, GEO/SEO optimization, technical build verification, and social distribution) to produce a published MDX post in apps/blog/content/posts/.
---

Orchestrate a complete end-to-end blogging lifecycle using **subagents** for each isolated phase. The final deliverable is a published Velite MDX post under `apps/blog/content/posts/<slug>.mdx` and a set of repurposed promotional social posts.

Reference documentation: [docs/specs/blog-workflow.md](file:///home/hetav/Desktop/Code/portfolio/docs/specs/blog-workflow.md)

---

## Process Overview

## Process Overview

```
Phase 1: Audience Persona & Strategy Subagent (.agents/skills/product-marketing, content-strategy)
   │
   ▼
Phase 2: Ideation, Story & SEO Briefing Subagent (.agents/skills/keyword-research, keyword-clustering, find-keywords)
   │
   ▼
Phase 3: Human-Centric Drafting Subagent (.agents/skills/blog, blog-writing-guide, velite) ──> Drafts article text
   │
   ▼
Phase 4: Visual Media & Diagram Subagent (.agents/skills/design-doc-mermaid, mermaid-diagrams, diagram-creator)
   │
   ▼
Phase 5: Contextual Hyperlink Research & Verification Subagent (.agents/skills/research, search_web)
   │
   ▼
Phase 6: Rigorous Editing & Quality Control Subagent (.agents/skills/blog-writing-guide, copywriting)
   │
   ▼
Phase 7: GEO & SEO Optimization Subagent (.agents/skills/ai-seo, seo)
   │
   ▼
Phase 8: Chief Editor Review Loop (FSM Router) (.agents/skills/code-review) ──> Loops back to Phase 3/4 if changes needed
   │ (If Approved)
   ▼
Phase 9: Technical Audit & Velite Build Verification Subagent (.agents/skills/seo, velite)
   │
   ▼
Phase 10: Social Distribution Subagent (.agents/skills/copywriting, social, twitter-algorithm-optimizer)
```

---

## Step-by-Step Execution Plan

### Step 1: Input Definition & Setup

- Ask the user for the blog topic, target keyword, or goal if not provided in the prompt.
- Ensure the destination directory exists: `apps/blog/content/posts/`.

### Step 2: Phase 1 — Audience Persona & Strategy (Subagent 1)

- **Tool**: `invoke_subagent` (Role: `Audience Persona Specialist`)
- **Skills to Consult**: `.agents/skills/product-marketing/SKILL.md`, `.agents/skills/content-strategy/SKILL.md`
- **Goal**: Do everything to understand who is reading the blog. Become hyper-aware of their problems, pain points, and desires. Outline how this post will solve a specific problem.
- **Output**: Reader persona and problem-solution alignment summary.

### Step 3: Phase 2 — Ideation, Story & SEO Briefing (Subagent 2)

- **Tool**: `invoke_subagent` (Role: `Ideation & SEO Specialist`)
- **Skills to Consult**: `.agents/skills/keyword-research/SKILL.md`, `.agents/skills/keyword-clustering/SKILL.md`, `.agents/skills/find-keywords/SKILL.md`
- **Goal**: Brainstorm and mind-map the topic. Combine search intent and keyword clusters with narrative journey mapping. Create an editor-ready brief that takes readers on a journey, builds momentum, and incorporates clear calls to action.
- **Output**: Editorial Content Brief.

### Step 4: Phase 3 — Human-Centric Drafting for `apps/blog` (Subagent 3)

- **Tool**: `invoke_subagent` (Role: `Human-Centric Drafter`)
- **Skills to Consult**: `.agents/skills/blog/SKILL.md`, `.agents/skills/blog-writing-guide/SKILL.md`, `.agents/skills/velite/SKILL.md`
- **Goal**: Draft the full long-form MDX article. Focus on:
  - Telling a story to stand out.
  - Sharing feelings and passion to make it relatable.
  - Informing, inspiring, and interacting.
  - Mixing up post length.
  - Asking the readers questions to foster belonging.
  - Following the Velite schema defined in `apps/blog/velite.config.ts`.
- **Target File**: `apps/blog/content/posts/<slug>.mdx`

### Step 5: Phase 4 — Visual Media & Diagram Architecture (Subagent 4)

- **Tool**: `invoke_subagent` (Role: `Visual Media & Diagram Specialist`)
- **Skills to Consult**: `.agents/skills/design-doc-mermaid/SKILL.md`, `.agents/skills/mermaid-diagrams/SKILL.md`, `.agents/skills/diagram-creator/SKILL.md`
- **Goal**: Analyze the Phase 3 drafted MDX article text to discover key concepts, data flows, and architecture steps that require visual representation. Architect at least 1 mandatory, pedagogically relevant visual asset. Wrap every diagram/image with the AI Generation Warning callout:

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

### Step 6: Phase 5 — Contextual Hyperlink Research & Verification (Subagent 5) ⭐ **NEW**

- **Tool**: `invoke_subagent` (Role: `Hyperlink Researcher`)
- **Skills to Consult**: `.agents/skills/research/SKILL.md` (or Web Search tools)
- **Goal**: Identify opportunities for high-value external and internal hyperlinks within the drafted text. Do not over-link; limit links to truly helpful resources, citations, or references. Research and verify each link to ensure it is accurate, relevant, and points to authoritative sources.

### Step 7: Phase 6 — Rigorous Editing & Quality Control (Subagent 6)

- **Tool**: `invoke_subagent` (Role: `Copy Editor & QC`)
- **Skills to Consult**: `.agents/skills/blog-writing-guide/SKILL.md`, `.agents/skills/copywriting/SKILL.md`
- **Goal**: Put aside time to edit the post. Take it to the next level by refining flow, punctuation, and grammar. QA all inserted hyperlinks to ensure they fit naturally in context and are not broken. Ensure the narrative is cohesive, the tone is empathetic, and the call to action is powerful. Review against the philosophy: "Publish selectively."

### Step 8: Phase 7 — GEO & AI Answer Surface Optimization (Subagent 7)

- **Tool**: `invoke_subagent` (Role: `GEO & Search Optimizer`)
- **Skills to Consult**: `.agents/skills/ai-seo/SKILL.md`, `.agents/skills/seo/SKILL.md`
- **Goal**: Optimize the draft for Perplexity, ChatGPT Search, and Google AI Overviews using EEAT principles, direct answer blocks, bullet summaries, and structured citations. Ensure SEO doesn't compromise the human storytelling.

### Step 9: Phase 8 — Chief Editor Review Loop (FSM Router) (Subagent 8) ⭐ **NEW**

- **Tool**: `invoke_subagent` (Role: `Chief Editor & FSM Router`)
- **Skills to Consult**: `.agents/skills/code-review/SKILL.md` (or general critical reasoning)
- **Goal**: Review the fully optimized draft for missing structural elements (tables, diagrams) or flow issues.
- **Action**: Suggest specific revisions. The orchestrator will evaluate the feedback. If changes are suggested, the orchestrator routes back to the relevant phase (e.g., Phase 3 for rewriting, Phase 4 for a missing diagram). This loop can execute a maximum of 3 times. If the subagent determines the draft is complete and high-quality, they respond with "APPROVED", and the orchestrator exits the loop and proceeds to Phase 9.

### Step 10: Phase 9 — Technical Audit & Velite Build Verification (Subagent 9)

- **Tool**: `invoke_subagent` (Role: `Build & QA Verifier`)
- **Skills to Consult**: `.agents/skills/seo/SKILL.md`, `.agents/skills/velite/SKILL.md`
- **Goal**: Run `bun --filter blog dev` or `bun run lint` to verify that Velite compiles `.velite` without type errors or missing frontmatter fields, and confirm at least 1 visual diagram callout is present. Verify that no broken links exist.
- **Verification Command**:
  ```bash
  bun --filter blog dev
  ```

### Step 11: Phase 10 — Social Distribution & Repurposing (Subagent 10)

- **Tool**: `invoke_subagent` (Role: `Social Content Repurposer`)
- **Skills to Consult**: `.agents/skills/copywriting/SKILL.md`, `.agents/skills/social/SKILL.md`, `.agents/skills/twitter-algorithm-optimizer/SKILL.md`
- **Goal**: Generate multi-channel promotional assets (X/Twitter thread, LinkedIn post). Focus on serving current readers best rather than just chasing virality.

---

## Completion Criteria

1. Target MDX post published at `apps/blog/content/posts/<slug>.mdx`.
2. Velite build verified clean without errors (`.velite` data generated).
3. Social repurposing copy delivered to the user.
