---
name: blog-workflow
description: End-to-end blog creation workflow for apps/blog. Spawns specialized subagents across 13 phases (strategy, competitor gap, briefing, drafting, visual, hyperlink, fact-checking, editing, deslop, SEO, chief editor review, technical build, and distribution) to produce a published MDX post in apps/blog/content/posts/.
---

Orchestrate a complete end-to-end blogging lifecycle using **subagents** for each isolated phase. The final deliverable is a published Velite MDX post under `apps/blog/content/posts/<slug>.mdx` and a set of repurposed promotional social posts.

Reference documentation: [docs/specs/blog-workflow.md](file:///home/hetav/Desktop/Code/portfolio/docs/specs/blog-workflow.md)

> [!IMPORTANT]
> **Strict Zero Internal Knowledge & Intent Preservation Policy**:
>
> 1. **Original User Query Payload**: The Orchestrator MUST pass the original user prompt/idea (`original_user_query`) to EVERY subagent invocation. Never let subagents infer the topic from context alone.
> 2. **Zero Internal Knowledge**: Subagents for research, drafting, fact-checking, and editing MUST NEVER rely on model parametric memory for facts, statistics, version numbers, or API details. Every subagent MUST perform web searches and cite official documentation URLs (`[Official Docs](https://...)`) for every claim.
> 3. **Topic Drift & Intent Rejection**: The QC Agent (Chief Editor) MUST compare the draft against `original_user_query` and REJECT any draft that has drifted away from the user's premise.
> 4. **Perspective & Attribution Policy**: The blog is written by Hetav Shah, an individual developer — not by the teams behind the technologies being discussed. Subagents MUST:
>    - **Never use "we" to describe decisions made by third parties** (e.g., "Why did we ditch DCR?" is wrong; "Why did the MCP team ditch DCR?" is correct). This is the "false ownership we" and it misleads readers into thinking the author made those decisions.
>    - **Use "community we" sparingly** and only when the author genuinely shares the experience with the reader (e.g., "a mistake most of us made" when referring to a common developer practice).
>    - **Prefer "you" for instructional/tutorial sections** to make the reader the protagonist.
>    - **Attribute third-party actions to the actual actor** by name (e.g., "the MCP team", "Vercel", "the Rust team") rather than using anonymous "they" or false "we".

---

## Velite MDX Frontmatter Schema

All posts MUST conform exactly to the schema in `apps/blog/velite.config.ts`. The only valid fields are:

```mdx
---
title: 'Article Title (required, max 99 chars)'
description: 'Compelling meta summary for SEO (optional, max 999 chars)'
date: 'YYYY-MM-DD'
published: true
tags: ['Tag1', 'Tag2']
cover: './cover-image.jpg' # optional — only include if an actual image file exists
---
```

> [!WARNING]
> Do NOT add fields like `author`, `excerpt`, `readingTime`, or `wordCount` to the frontmatter. They are not in the Velite schema and will cause a build error.
>
> The blog uses `remarkMermaid` and `rehype-pretty-code` (theme: `rose-pine`). Write all code blocks with language identifiers and all diagrams as fenced ` ```mermaid ``` ` blocks — they are rendered natively.

---

## Subagent Handoff Format

Each subagent MUST return its findings to the orchestrator as a **structured Markdown artifact** using this format:

```markdown
## Handoff: <Phase Name>

**Status**: COMPLETE | NEEDS_INPUT
**original_user_query**: <exact copy of the user's original prompt>

### Output

<Phase-specific findings, brief, draft text, or report>

### Inputs for Next Phase

<What the next subagent needs — key decisions, file paths, slug, keywords, etc.>
```

---

## Process Overview

```
Phase 1:  Audience Persona & Strategy         (.agents/skills/product-marketing, content-strategy)
   │
   ▼
Phase 2:  Pre-Draft Competitor Gap Analysis   (.agents/skills/competitor-analysis)
   │
   ▼
Phase 3:  Ideation, Story & SEO Briefing      (.agents/skills/keyword-research, keyword-clustering, find-keywords)
   │
   ▼
Phase 4:  Human-Centric Drafting              (.agents/skills/blog, blog-writing-guide, velite) ──> Writes MDX file
   │
   ▼
Phase 5:  Visual Media & Diagram Architecture (.agents/skills/design-doc-mermaid, mermaid-diagrams, diagram-creator) ──> Edits MDX file
   │
   ▼
Phase 6:  Contextual Hyperlink Research       (.agents/skills/research) ──> Edits MDX file
   │
   ▼
Phase 7:  Fact-Checking & Claim Verification  (.agents/skills/fact-checker)
   │
   ▼
Phase 8:  Rigorous Editing & QC               (.agents/skills/blog-writing-guide, copywriting) ──> Edits MDX file
   │
   ▼
Phase 9:  AI Slop Removal & Brand Voice       (.agents/skills/content-deslop) ──> Edits MDX file
   │
   ▼
Phase 10: GEO & SEO Optimization              (.agents/skills/ai-seo, seo) ──> Edits MDX file
   │
   ▼
Phase 11: Chief Editor Review Loop (FSM)      (.agents/skills/chief-editor) ──> Loops back to Phase 4/5 if NEEDS REVISION
   │ (APPROVED)
   ▼
Phase 12: Technical Audit & Velite Build      (.agents/skills/velite)
   │
   ▼
Phase 13: Social Distribution & Repurposing   (.agents/skills/copywriting, twitter-algorithm-optimizer)
```

---

## Step-by-Step Execution Plan

### Step 1: Input Definition & Setup

- If the user did not provide a topic, ask: the blog topic or idea, target primary keyword, and intended audience.
- Capture the exact user input as `original_user_query` — this string is immutable and passed to every subagent.
- Check if a Topic Research Brief exists at `.scratch/topics/<slug>.md`. If so, set `topic_brief_path` to this file path.
- If `topic_brief_path` is set, read the brief and extract: Recommended H1, Target Audience, Primary/Secondary Keywords, Competitor Gap Summary, Community Pain Points, and Proposed Outline. These will be passed directly to Phases 1–3 to avoid redundant research.
- Derive a URL-safe `<slug>` from the topic (lowercase, hyphen-separated).
- Confirm the destination path: `apps/blog/content/posts/<slug>.mdx`.

### Step 2: Phase 1 — Audience Persona & Strategy (Subagent 1)

- **Brief Import Shortcut**: If `topic_brief_path` is set, import the Target Audience and Community Pain Points (Sections 1-2 of the brief) directly as the persona card. Skip the web research — the topic-research-workflow already validated this. Only run the full subagent if no brief exists.
- **Tool**: `invoke_subagent` (Role: `Audience Persona Specialist`)
- **Skills to Consult**: `.agents/skills/product-marketing/SKILL.md`, `.agents/skills/content-strategy/SKILL.md`
- **Pass**: `original_user_query`
- **Goal**: Become hyper-aware of who is reading this post — their specific frustrations, daily workflow, and skill level. Identify the single core problem this post will solve. Ground findings in Hetav's portfolio brand (software engineer, systems thinker, technical depth).
- **Output**: Reader persona card + problem-solution alignment summary (Handoff format).

### Step 3: Phase 2 — Pre-Draft Competitor Gap Analysis (Subagent 2)

- **Brief Import Shortcut**: If `topic_brief_path` is set, import the Competitor Gap Summary (Section 5 of the brief) directly. Skip redundant competitor web searches. Only run the full subagent if no brief exists.
- **Tool**: `invoke_subagent` (Role: `Competitor Analyst`)
- **Skills to Consult**: `.agents/skills/competitor-analysis/SKILL.md`
- **Pass**: `original_user_query`, Phase 1 persona summary
- **Goal**: Search the web for the top 3–5 ranking articles for the primary keyword. Analyze their structure, headings, claims, and missing angles. Do NOT rely on memory — run real searches.
- **Output**: Competitor Gap Report listing specific missing angles, weak sections, and opportunities (Handoff format).

### Step 4: Phase 3 — Ideation, Story & SEO Briefing (Subagent 3)

- **Brief Import Shortcut**: If `topic_brief_path` is set, import the SEO & GEO Keyword Target and Proposed Outline (Sections 4 and 6 of the brief) directly into the Content Brief. Augment with any additional keyword clustering if needed, but do not re-research from scratch. Only run the full subagent if no brief exists.
- **Tool**: `invoke_subagent` (Role: `Ideation & SEO Specialist`)
- **Skills to Consult**: `.agents/skills/keyword-research/SKILL.md`, `.agents/skills/keyword-clustering/SKILL.md`, `.agents/skills/find-keywords/SKILL.md`
- **Pass**: `original_user_query`, Phase 1 persona, Phase 2 Gap Report
- **Goal**: Combine search intent mapping, keyword clusters, and the Gap Report into an editor-ready Content Brief. Include a proposed H1, H2 outline, primary keyword, 3–5 secondary keywords, target word count, and the unique angle that exploits competitor gaps.
- **Output**: Editorial Content Brief (Handoff format).

### Step 5: Phase 4 — Human-Centric Drafting (Subagent 4)

- **Tool**: `invoke_subagent` (Role: `Human-Centric Drafter`)
- **Skills to Consult**: `.agents/skills/blog/SKILL.md`, `.agents/skills/blog-writing-guide/SKILL.md`, `.agents/skills/velite/SKILL.md`
- **Pass**: `original_user_query`, Phase 3 Content Brief, Velite frontmatter schema (copied from this skill's header)
- **Goal**: Draft the full long-form MDX article directly to `apps/blog/content/posts/<slug>.mdx`. Focus on storytelling, empathy, varied sentence length, and asking the reader questions. Every technical claim MUST be accompanied by a search-verified hyperlink — no parametric memory.
- **Velite Rules**: Use the exact frontmatter schema above. All code blocks must have language identifiers. Diagrams go in ` ```mermaid ``` ` blocks.
- **Output**: MDX file written to disk. Return the file path + slug (Handoff format).
- **Early Validation**: After writing the MDX file, immediately run `bun run lint` to verify the frontmatter is valid. Fix any schema errors before proceeding to Phase 5. Do not wait until Phase 12 to discover frontmatter issues.

### Step 6: Phase 5 — Visual Media & Diagram Architecture (Subagent 5)

- **Tool**: `invoke_subagent` (Role: `Visual Media & Diagram Specialist`)
- **Skills to Consult**: `.agents/skills/design-doc-mermaid/SKILL.md`, `.agents/skills/mermaid-diagrams/SKILL.md`, `.agents/skills/diagram-creator/SKILL.md`
- **Pass**: `original_user_query`, full MDX file content from Phase 4
- **Goal**: Analyze the draft to identify concepts that need visual representation. Insert at least 1 mandatory Mermaid diagram (architecture, flow, or sequence) directly into the MDX. The diagram must be pedagogically relevant — no decorative filler.
- **Callout requirement**: Wrap each diagram in an `> [!NOTE]` callout explaining what it illustrates.
- **Cover Image**: If the post does not already have a `cover` field in frontmatter, use the `generate_image` tool to create a hero image relevant to the article topic. Save it as `apps/blog/content/posts/<slug>-cover.jpg` and add `cover: './<slug>-cover.jpg'` to the frontmatter.
- **Output**: Updated MDX file on disk with diagrams inserted. Return the updated file path (Handoff format).

### Step 7: Phase 6 — Contextual Hyperlink Research & Verification (Subagent 6)

- **Tool**: `invoke_subagent` (Role: `Hyperlink Researcher`)
- **Skills to Consult**: `.agents/skills/research/SKILL.md`
- **Pass**: `original_user_query`, full MDX file content from Phase 5
- **Goal**: Scan the draft for technical terms, libraries, tools, and concepts that lack a hyperlink. Research the correct official URL for each using web search (never from memory). Insert verified hyperlinks. Also check for internal links to other posts in `apps/blog/content/posts/`. Do not over-link — max 1 link per paragraph.
- **Output**: Updated MDX file on disk. Return a list of links added with their verified source URLs (Handoff format).

### Step 8: Phase 7 — Fact-Checking & Claim Verification (Subagent 7)

- **Tool**: `invoke_subagent` (Role: `Fact Checker`)
- **Skills to Consult**: `.agents/skills/fact-checker/SKILL.md`
- **Pass**: `original_user_query`, full MDX file content from Phase 6
- **Goal**: Extract every hard claim, statistic, version number, API behavior, and technical assertion. Search the web to verify each one against primary sources. Tag every claim as `[VERIFIED]`, `[FAILED - HALLUCINATION]`, or `[REJECT - UNGROUNDED]`.
- **Output**: Fact-Check Report. If any `[FAILED]` or `[REJECT]` claims exist, mark status as `NEEDS_REVISION` and list required fixes (Handoff format).

### Step 9: Phase 8 — Rigorous Editing & Quality Control (Subagent 8)

- **Tool**: `invoke_subagent` (Role: `Copy Editor & QC`)
- **Skills to Consult**: `.agents/skills/blog-writing-guide/SKILL.md`, `.agents/skills/copywriting/SKILL.md`
- **Pass**: `original_user_query`, Phase 7 Fact-Check Report, full MDX file
- **Goal**: Apply all `[FAILED]` / `[REJECT]` fixes from the Fact-Check Report. Then refine flow, sentence rhythm, punctuation, and grammar. Ensure the opening hook is strong, the CTA is clear, and the narrative arc is cohesive.
- **Output**: Updated MDX file on disk (Handoff format).

### Step 10: Phase 9 — AI Slop Removal & Brand Voice (Subagent 9)

- **Tool**: `invoke_subagent` (Role: `Brand Voice Enforcer`)
- **Skills to Consult**: `.agents/skills/content-deslop/SKILL.md`
- **Pass**: `original_user_query`, full MDX file from Phase 8
- **Goal**: Scan the edited draft for known AI-isms (e.g., "delve", "tapestry", "in conclusion", "it's important to note", "navigating the landscape"). Force rewrites to be punchy, opinionated, and authentically human. Do not add new facts — only rewrite phrasing.
- **Output**: Updated MDX file on disk (Handoff format).

### Step 11: Phase 10 — GEO & AI Answer Surface Optimization (Subagent 10)

- **Tool**: `invoke_subagent` (Role: `GEO & Search Optimizer`)
- **Skills to Consult**: `.agents/skills/ai-seo/SKILL.md`, `.agents/skills/seo/SKILL.md`
- **Pass**: `original_user_query`, primary keyword, full MDX file from Phase 9
- **Goal**: Optimize the draft for Perplexity, ChatGPT Search, and Google AI Overviews using E-E-A-T principles. Add structured FAQ sections, definition blocks, or concise answer paragraphs where appropriate. Ensure the `description` frontmatter field is compelling and keyword-rich. Do not destroy the human voice.
- **Output**: Updated MDX file on disk (Handoff format).

### Step 12: Phase 11 — Chief Editor Review Loop (FSM Router) (Subagent 11)

- **Tool**: `invoke_subagent` (Role: `Chief Editor & FSM Router`)
- **Skills to Consult**: `.agents/skills/chief-editor/SKILL.md`
- **Pass**: `original_user_query`, full MDX file from Phase 10, Phase 7 Fact-Check Report
- **Goal**: Act as the final editorial gatekeeper. Review for missing structural elements (tables, diagrams, weak flow), topic drift from `original_user_query`, and any ungrounded claims not caught in Phase 7.
- **FSM Loop Rules**:
  - If the verdict is **`APPROVED`**: exit the loop and proceed to Phase 12.
  - If the verdict is **`NEEDS REVISION`**: route the specific directives back to the appropriate subagent (Phase 4 for content issues, Phase 5 for visuals, Phase 8 for editing). Re-run that phase and return here.
  - **Maximum 3 revision loops**. After 3 rejections, proceed with a `[CONDITIONALLY APPROVED - MAX LOOPS REACHED]` note.
  - **Re-entrancy cascade**: When routing back to a phase, the following downstream phases MUST also re-run on the modified content:
    - Route to Phase 4 (Drafting) → must re-run Phases 5, 6, 7, 8, 9, 10 on new sections.
    - Route to Phase 5 (Visuals) → must re-run Phase 6 (may need new hyperlinks for diagram context).
    - Route to Phase 8 (Editing) → must re-run Phase 9 (deslop the edited text).
- **Output**: `APPROVED` or `NEEDS REVISION` verdict with bulleted directives (Handoff format).

### Step 13: Phase 12 — Technical Audit & Velite Build Verification (Subagent 12)

- **Tool**: `invoke_subagent` (Role: `Build & QA Verifier`)
- **Skills to Consult**: `.agents/skills/velite/SKILL.md`
- **Pass**: File path of the final MDX post
- **Goal**: Verify the MDX file compiles cleanly through Velite without schema errors or broken imports.
- **Verification command** (run this and check for zero errors):
  ```bash
  bun run lint
  ```
- Also check: frontmatter fields match the schema exactly, no undefined fields are present, all image paths referenced in `cover` exist on disk, and no broken markdown links are present.
- **Output**: Build pass/fail report. If errors exist, return them to the orchestrator with specific line numbers for fixing (Handoff format).

### Step 14: Phase 13 — Social Distribution & Repurposing (Subagent 13)

- **Tool**: `invoke_subagent` (Role: `Social Content Repurposer`)
- **Skills to Consult**: `.agents/skills/copywriting/SKILL.md`, `.agents/skills/twitter-algorithm-optimizer/SKILL.md`
- **Pass**: `original_user_query`, post title, description, URL slug, and 3 key takeaways from the article
- **Goal**: Generate multi-channel promotional copy:
  - **X/Twitter thread**: 5–7 tweets optimized for the Twitter algorithm (hook tweet + insight tweets + CTA). No generic openers.
  - **LinkedIn post**: 150–200 words, personal insight angle, ends with a question to drive comments.
- **Output**: Formatted social copy delivered to the user (Handoff format).

---

## Completion Criteria

1. MDX post written and verified at `apps/blog/content/posts/<slug>.mdx`.
2. `bun run lint` passes with zero errors.
3. Chief Editor verdict is `APPROVED` (or `CONDITIONALLY APPROVED`).
4. Social repurposing copy delivered to the user.
