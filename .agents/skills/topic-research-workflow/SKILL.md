---
name: topic-research-workflow
description: End-to-end topic research and discovery workflow. Spawns 5 specialized subagents (Community Mining, Tech Signal Extraction, Search Validation, GEO Gap Analysis, and Angle Framing) to produce a validated Topic Research Brief in .scratch/topics/.
---

Orchestrate an autonomous topic discovery and research pipeline across 5 subagent phases. The final deliverable is a validated Topic Research Brief stored under `.scratch/topics/<topic-slug>.md`.

Reference specification: [docs/specs/topic-research-workflow.md](file:///home/hetav/Desktop/Code/portfolio/docs/specs/topic-research-workflow.md)

> [!IMPORTANT]
> **Zero Internal Knowledge Policy**: Every subagent MUST use web searches, the `reddapi` skill, or the `github-trending` skill to gather real-world signals. No subagent may rely on training data to generate pain points, keyword volumes, or competitor content analysis. All findings must be grounded in live data.

---

## Workflow Flowchart

```
Phase 1: Community Discussion Mining   (.agents/skills/reddapi, github-trending)
   │
   ▼
Phase 2: Tech Signal Ingestion         (.agents/skills/research)
   │
   ▼
Phase 3: Search Demand Validation      (.agents/skills/find-keywords)
   │
   ▼
Phase 4: GEO & EEAT Competitor Gap     (.agents/skills/competitor-analysis)
   │
   ▼
Phase 5: Angle & Hook Framing          (.agents/skills/content-strategy) ──> Saves .scratch/topics/<slug>.md
```

---

## Subagent Handoff Format

Each subagent MUST return its findings to the orchestrator using this structured format:

```markdown
## Handoff: <Phase Name>

**Status**: COMPLETE | LOW_DEMAND | NEEDS_INPUT
**Topic Query**: <the original topic query or IDEA_BACKLOG.md entry title>

### Output

<Phase-specific findings, signals, or analysis>

### Inputs for Next Phase

<What the next subagent needs — key signals, keywords, URLs, etc.>
```

---

## Topic Research Brief Format

Every run MUST produce a brief in this exact format at `.scratch/topics/<topic-slug>.md`:

```markdown
# Topic Research Brief: <Topic Title>

**Generated**: <ISO date>
**Status**: VALIDATED | LOW_DEMAND (use LOW_DEMAND if Phase 3 finds insufficient search volume)

## 1. Core Angle & Hook

- **Recommended H1 Title**: "..."
- **Target Audience**: ...
- **Core Value Proposition / Hook**: ...
- **Unique Differentiator**: What our post covers that top competitors missed.

## 2. Community Pain Points (Phase 1)

- **Reddit Signals**: Top complaints and questions found, with subreddit sources.
- **GitHub Trending**: Relevant repos/tools gaining traction.

## 3. Tech Signal Context (Phase 2)

- **Engineering Blog Signals**: Key articles, release notes, or announcements surfaced.
- **Weak Signals**: Emerging patterns not yet widely covered.

## 4. SEO & GEO Keyword Target (Phase 3)

- **Primary Keyword**: `...`
- **Secondary Keywords**: `...`, `...`
- **Search Intent**: Informational / Technical / How-To / Navigational
- **Estimated Demand**: High / Medium / Low (with source)
- **AI Citation Gap (GEO)**: What current top AI answers miss that our post will address.

## 5. Competitor Gap Summary (Phase 4)

- Top 3 ranking articles for the primary keyword.
- Structural gaps: missing sections, weak explanations, outdated info.

## 6. Proposed Article Outline

- H2: ...
- H2: ...
- H2: ...
- Estimated word count: ...

## 7. Handoff Recommendation

- Ready for `blog-workflow`: YES / NO
- If NO, reason: ...
```

---

## Step-by-Step Execution Plan

### Step 1: Niche / Query Definition

- If the user is invoking this from `IDEA_BACKLOG.md`, read the relevant entry from `.scratch/topics/IDEA_BACKLOG.md` to extract the raw idea, problem, and persona before proceeding.
- Otherwise, ask the user for the focus domain or target technology (e.g., "Next.js 15 performance", "AI agents with Bun", "Rust async runtimes").
- Derive a URL-safe `<topic-slug>` (lowercase, hyphen-separated).
- Ensure `.scratch/topics/` directory exists: `mkdir -p .scratch/topics/`.

### Step 2: Phase 1 + Phase 2 — Community Mining & Tech Signals (Subagents 1 & 2, parallel)

Launch both subagents simultaneously via `invoke_subagent` in a single call.

- **Subagent 1 (Community Discussion Miner)**:
  - **Skills to Consult**: `.agents/skills/reddapi/SKILL.md`, `.agents/skills/github-trending/SKILL.md`
  - **Goal**: Use the `reddapi` skill to search relevant subreddits (e.g., r/webdev, r/nextjs, r/rust, r/devops) for pain points, open questions, and recurring complaints about the topic. Use the `github-trending` skill to identify repos gaining traction in this space. Extract specific complaints phrased in the user's own words — these are content hooks.
  - **Output**: Community Discussion Summary with quoted pain points and repo links.

- **Subagent 2 (Tech Signal Ingestor)**:
  - **Skills to Consult**: `.agents/skills/research/SKILL.md`
  - **Goal**: Search engineering blogs (Vercel, Cloudflare, the GitHub blog, Kent C. Dodds, Josh W. Comeau, etc.), official changelogs, and release notes for recent articles related to the topic. Surface "weak signals" — topics being discussed in niche circles but not yet covered by major publications. Cross-reference with Phase 1 findings to confirm signal strength.
  - **Output**: Technical Signal Briefing with source URLs and a "signal strength" rating (Strong / Emerging / Niche) for the topic.

### Step 3: Phase 3 — Search Demand Validation (Subagent 3)

- **Tool**: `invoke_subagent` (Role: `Search Demand Validator`)
- **Skills to Consult**: `.agents/skills/find-keywords/SKILL.md`
- **Goal**: Validate whether the identified topic has active search demand. Map out 1 primary keyword and 3–5 secondary keyword opportunities. Assess search intent (informational, how-to, navigational). Flag the topic as `LOW_DEMAND` if evidence of search volume is insufficient — do not proceed to Phase 4 without noting this.
- **Output**: Search Volume & Intent Map with primary keyword, secondary keywords, intent classification, and demand rating.
- **Abort Gate**: If Phase 3 flags the topic as `LOW_DEMAND`, present the user with an explicit choice before continuing:
  - "Search demand is low for this topic. Continue to Phase 4 anyway (the post may still work as thought leadership), or abort and try a different angle?"
  - If the user chooses to abort, write the brief with `Status: LOW_DEMAND` and `Handoff Recommendation: NO` and stop.

### Step 4: Phase 4 — GEO & EEAT Competitor Gap Analysis (Subagent 4)

- **Tool**: `invoke_subagent` (Role: `GEO Competitor Auditor`)
- **Skills to Consult**: `.agents/skills/competitor-analysis/SKILL.md`
- **Goal**: Search the web for the top 3 ranking articles for the primary keyword from Phase 3. Audit each article against E-E-A-T and CITE frameworks: Are they shallow? Missing diagrams? Outdated? Do they answer what AI surfaces (ChatGPT, Perplexity) cite for this topic? Identify specific structural gaps our post will fill to win AI citations.
- **Output**: GEO Content Gap Report listing the 3 competitor URLs, their weaknesses, and the exact gaps to exploit.

### Step 5: Phase 5 — Angle & Hook Framing (Subagent 5)

- **Tool**: `invoke_subagent` (Role: `Topic Angle Strategist`)
- **Skills to Consult**: `.agents/skills/content-strategy/SKILL.md`
- **Goal**: Synthesize all findings from Phases 1–4 into the final Topic Research Brief. Choose the strongest angle based on community pain + search demand + competitor gaps. Write the recommended H1, the core hook sentence, the unique differentiator, and a proposed H2 outline.
- **Target Location**: Write the completed brief to `.scratch/topics/<topic-slug>.md` using the format defined above.
- **Output**: Completed brief saved to disk. Return the file path.
- **Backlog Writeback**: If the topic originated from `.scratch/topics/IDEA_BACKLOG.md`, update the entry's status from `CAPTURED` to `VALIDATED` (or `LOW_DEMAND`) and append `- **Brief**: .scratch/topics/<topic-slug>.md` to the entry.

---

## Completion Criteria

1. Topic Research Brief created at `.scratch/topics/<topic-slug>.md` using the exact format specified above.
2. Brief contains a `Status` of `VALIDATED` or `LOW_DEMAND` based on Phase 3 findings.
3. Handoff summary presented to the user: show the recommended H1 title and top 3 content angles.
4. Offer the user an explicit next step: "Run the `blog-workflow` skill using this brief as input?" (yes/no).
