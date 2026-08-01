---
name: blog-workflow
description: End-to-end blog creation workflow for apps/blog. Spawns specialized subagents across 13 phases (strategy, competitor gap, briefing, drafting, visual, hyperlink, fact-checking, editing, deslop, SEO, chief editor review, technical build, and distribution) to produce a published MDX post in apps/blog/content/posts/.
---

Orchestrate a complete end-to-end blogging lifecycle using **subagents** for each isolated phase. The final deliverable is a published Velite MDX post under `apps/blog/content/posts/<slug>.mdx` and a set of repurposed promotional social posts.

Reference documentation: [docs/specs/blog-workflow.md](file:///home/hetav/Desktop/Code/portfolio/docs/specs/blog-workflow.md)

---

## Process Overview

```
Phase 1: Audience Persona & Strategy Subagent (.agents/skills/product-marketing, content-strategy)
   │
   ▼
Phase 2: Pre-Draft Competitor Gap Analysis Subagent (.agents/skills/competitor-analysis)
   │
   ▼
Phase 3: Ideation, Story & SEO Briefing Subagent (.agents/skills/keyword-research, keyword-clustering, find-keywords)
   │
   ▼
Phase 4: Human-Centric Drafting Subagent (.agents/skills/blog, blog-writing-guide, velite) ──> Drafts article text
   │
   ▼
Phase 5: Visual Media & Diagram Subagent (.agents/skills/design-doc-mermaid, mermaid-diagrams, diagram-creator)
   │
   ▼
Phase 6: Contextual Hyperlink Research & Verification Subagent (.agents/skills/research, search_web)
   │
   ▼
Phase 7: Fact-Checking & Claim Verification Subagent (.agents/skills/fact-checker)
   │
   ▼
Phase 8: Rigorous Editing & Quality Control Subagent (.agents/skills/blog-writing-guide, copywriting)
   │
   ▼
Phase 9: AI Slop Removal & Brand Voice Subagent (.agents/skills/content-deslop)
   │
   ▼
Phase 10: GEO & SEO Optimization Subagent (.agents/skills/ai-seo, seo)
   │
   ▼
Phase 11: Chief Editor Review Loop (FSM Router) (.agents/skills/chief-editor) ──> Loops back to Phase 4/5 if changes needed
   │ (If Approved)
   ▼
Phase 12: Technical Audit & Velite Build Verification Subagent (.agents/skills/seo, velite)
   │
   ▼
Phase 13: Social Distribution Subagent (.agents/skills/copywriting, social, twitter-algorithm-optimizer)
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

### Step 3: Phase 2 — Pre-Draft Competitor Gap Analysis (Subagent 2)

- **Tool**: `invoke_subagent` (Role: `Competitor Analyst`)
- **Skills to Consult**: `.agents/skills/competitor-analysis/SKILL.md`
- **Goal**: Search the web for the top 3-5 ranking articles for the topic. Analyze them to identify missing angles and generate a Gap Report.
- **Output**: Competitor Gap Report.

### Step 4: Phase 3 — Ideation, Story & SEO Briefing (Subagent 3)

- **Tool**: `invoke_subagent` (Role: `Ideation & SEO Specialist`)
- **Skills to Consult**: `.agents/skills/keyword-research/SKILL.md`, `.agents/skills/keyword-clustering/SKILL.md`, `.agents/skills/find-keywords/SKILL.md`
- **Goal**: Combine search intent, keyword clusters, and the Gap Report with narrative journey mapping. Create an editor-ready brief focused on solving specific problems that competitors missed.
- **Output**: Editorial Content Brief.

### Step 5: Phase 4 — Human-Centric Drafting for `apps/blog` (Subagent 4)

- **Tool**: `invoke_subagent` (Role: `Human-Centric Drafter`)
- **Skills to Consult**: `.agents/skills/blog/SKILL.md`, `.agents/skills/blog-writing-guide/SKILL.md`, `.agents/skills/velite/SKILL.md`
- **Goal**: Draft the full long-form MDX article. Focus on storytelling, empathy, varied length, and asking the readers questions. Follow the Velite schema defined in `apps/blog/velite.config.ts`.
- **Target File**: `apps/blog/content/posts/<slug>.mdx`

### Step 6: Phase 5 — Visual Media & Diagram Architecture (Subagent 5)

- **Tool**: `invoke_subagent` (Role: `Visual Media & Diagram Specialist`)
- **Skills to Consult**: `.agents/skills/design-doc-mermaid/SKILL.md`, `.agents/skills/mermaid-diagrams/SKILL.md`, `.agents/skills/diagram-creator/SKILL.md`
- **Goal**: Analyze the Phase 4 drafted MDX article text to discover key concepts that require visual representation. Architect at least 1 mandatory visual asset (Mermaid) with an AI Generation Warning callout.

### Step 7: Phase 6 — Contextual Hyperlink Research & Verification (Subagent 6)

- **Tool**: `invoke_subagent` (Role: `Hyperlink Researcher`)
- **Skills to Consult**: `.agents/skills/research/SKILL.md`
- **Goal**: Identify opportunities for high-value external and internal hyperlinks. Research and verify each link to ensure it is accurate and points to authoritative sources. Do not over-link.

### Step 8: Phase 7 — Fact-Checking & Claim Verification (Subagent 7)

- **Tool**: `invoke_subagent` (Role: `Fact Checker`)
- **Skills to Consult**: `.agents/skills/fact-checker/SKILL.md`
- **Goal**: Extract hard claims, statistics, and technical facts from the draft. Search the web to verify their authenticity against primary sources to prevent hallucination.

### Step 9: Phase 8 — Rigorous Editing & Quality Control (Subagent 8)

- **Tool**: `invoke_subagent` (Role: `Copy Editor & QC`)
- **Skills to Consult**: `.agents/skills/blog-writing-guide/SKILL.md`, `.agents/skills/copywriting/SKILL.md`
- **Goal**: Refine flow, punctuation, and grammar. QA all inserted hyperlinks for context and validity. Ensure the narrative is cohesive and the call to action is powerful.

### Step 10: Phase 9 — AI Slop Removal & Brand Voice (Subagent 9)

- **Tool**: `invoke_subagent` (Role: `Brand Voice Enforcer`)
- **Skills to Consult**: `.agents/skills/content-deslop/SKILL.md`
- **Goal**: Scan the edited draft for known AI-isms (e.g., "delve", "tapestry", "in conclusion"). Force rewrites to ensure a punchy, conversational, and authentic human brand voice.

### Step 11: Phase 10 — GEO & AI Answer Surface Optimization (Subagent 10)

- **Tool**: `invoke_subagent` (Role: `GEO & Search Optimizer`)
- **Skills to Consult**: `.agents/skills/ai-seo/SKILL.md`, `.agents/skills/seo/SKILL.md`
- **Goal**: Optimize the draft for Perplexity, ChatGPT Search, and Google AI Overviews using EEAT principles without compromising the human storytelling.

### Step 12: Phase 11 — Chief Editor Review Loop (FSM Router) (Subagent 11)

- **Tool**: `invoke_subagent` (Role: `Chief Editor & FSM Router`)
- **Skills to Consult**: `.agents/skills/chief-editor/SKILL.md`
- **Goal**: Review the fully optimized draft for missing structural elements (tables, diagrams) or flow issues.
- **Action**: Suggest specific revisions. If changes are suggested, route back to the relevant phase (e.g., Phase 4, Phase 5). Execute a max of 3 times. If "APPROVED", exit loop and proceed to Phase 12.

### Step 13: Phase 12 — Technical Audit & Velite Build Verification (Subagent 12)

- **Tool**: `invoke_subagent` (Role: `Build & QA Verifier`)
- **Skills to Consult**: `.agents/skills/seo/SKILL.md`, `.agents/skills/velite/SKILL.md`
- **Goal**: Run `bun --filter blog dev` to verify that Velite compiles without errors. Verify that no broken links exist.
- **Verification Command**:
  ```bash
  bun --filter blog dev
  ```

### Step 14: Phase 13 — Social Distribution & Repurposing (Subagent 13)

- **Tool**: `invoke_subagent` (Role: `Social Content Repurposer`)
- **Skills to Consult**: `.agents/skills/copywriting/SKILL.md`, `.agents/skills/social/SKILL.md`, `.agents/skills/twitter-algorithm-optimizer/SKILL.md`
- **Goal**: Generate multi-channel promotional assets (X/Twitter thread, LinkedIn post). Focus on serving current readers best.

---

## Completion Criteria

1. Target MDX post published at `apps/blog/content/posts/<slug>.mdx`.
2. Velite build verified clean without errors (`.velite` data generated).
3. Social repurposing copy delivered to the user.
