---
name: topic-research-workflow
description: End-to-end topic research and discovery workflow. Spawns 5 specialized subagents (Community Mining, Tech Signal Extraction, Search Validation, GEO Gap Analysis, and Angle Framing) to produce a validated Topic Research Brief in .scratch/topics/.
---

Orchestrate an autonomous topic discovery and research pipeline across 5 subagent phases. The final deliverable is a validated Topic Research Brief stored under `.scratch/topics/<topic-slug>.md`.

Reference specification: [docs/specs/topic-research-workflow.md](file:///home/hetav/Desktop/Code/portfolio/docs/specs/topic-research-workflow.md)

---

## Workflow Flowchart

```
Phase 1: Community Discussion Mining Subagent (.agents/skills/reddapi, github-trending, hackernews)
   │
   ▼
Phase 2: Tech Signal Ingestion Subagent (.agents/skills/news-aggregator-skill)
   │
   ▼
Phase 3: Search Demand Validation Subagent (.agents/skills/find-keywords)
   │
   ▼
Phase 4: GEO & EEAT Competitor Gap Subagent (.agents/skills/competitor-analysis)
   │
   ▼
Phase 5: Angle & Hook Framing Subagent (.agents/skills/marketing-ideas) ──> Saves .scratch/topics/<slug>.md
```

---

## Step-by-Step Execution Plan

### Step 1: Niche / Query Definition

- Ask the user for the focus domain or target technology (e.g., Next.js 15, AI agents, performance tuning, Rust).
- Ensure `.scratch/topics/` directory exists.

### Step 2: Phase 1 — Community Discussion Mining (Subagent 1)

- **Tool**: `invoke_subagent` (Role: `Community Discussion Miner`)
- **Skills to Consult**: `.agents/skills/reddapi/SKILL.md`, `.agents/skills/github-trending/SKILL.md`, `.agents/skills/hackernews/SKILL.md`
- **Goal**: Mine Reddit pain points, GitHub trending repos/tech stacks, and top Hacker News discussions to extract real developer complaints and rising tools.
- **Output**: Community Discussion Summary.

### Step 3: Phase 2 — Tech Signal Ingestion (Subagent 2)

- **Tool**: `invoke_subagent` (Role: `Tech Signal Ingestor`)
- **Skills to Consult**: `.agents/skills/news-aggregator-skill/SKILL.md`
- **Goal**: Ingest tech RSS feeds and engineering blog headlines to pull "weak signals" and deeper technical context around the community pain points.
- **Output**: Technical Signal Briefing.

### Step 4: Phase 3 — Search Demand Validation (Subagent 3)

- **Tool**: `invoke_subagent` (Role: `Search Demand Validator`)
- **Skills to Consult**: `.agents/skills/find-keywords/SKILL.md`
- **Goal**: Validate whether the identified topics have active search demand, mapping out primary and secondary keyword opportunities.
- **Output**: Search Volume & Intent Map.

### Step 5: Phase 4 — GEO & EEAT Competitor Gap Analysis (Subagent 4)

- **Tool**: `invoke_subagent` (Role: `GEO Competitor Auditor`)
- **Skills to Consult**: `.agents/skills/competitor-analysis/SKILL.md`
- **Goal**: Audit existing ranking articles against CORE-EEAT and CITE frameworks to identify structural missing information so our content gets cited in AI Answer Surfaces (ChatGPT, Perplexity, AI Overviews).
- **Output**: GEO Content Gap Report.

### Step 6: Phase 5 — Angle & Hook Framing (Subagent 5)

- **Tool**: `invoke_subagent` (Role: `Topic Angle Strategist`)
- **Skills to Consult**: `.agents/skills/marketing-ideas/SKILL.md`
- **Goal**: Package all research into a compelling Topic Research Brief with recommended H1 titles, core hooks, target audience, and outline.
- **Target Location**: Save to `.scratch/topics/<topic-slug>.md`.

---

## Completion Criteria

1. Topic Research Brief created at `.scratch/topics/<topic-slug>.md`.
2. Handoff summary presented to the user with an option to immediately feed the brief into `/blog-workflow`.
