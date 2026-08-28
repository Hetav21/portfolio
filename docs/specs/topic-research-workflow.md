# Topic Research & Discovery Workflow Architecture

This document specifies the autonomous **Topic Research & Discovery Workflow** for uncovering, validating, and framing high-impact blog topics before feeding them into the publication pipeline (`blog-workflow`).

---

## 1. Overview & Goal

The goal of this workflow is to continuously monitor developer communities, tech signals, search volume, and AI answer engine gaps to identify winning topics for the blog.

The output is saved as a structured **Topic Research Brief** under `.scratch/topics/<topic-slug>.md` or `docs/topics/<topic-slug>.md`.

Like the blog creation pipeline, this workflow uses an **Orchestrator-Subagent** model to maintain isolated context windows per phase.

---

## 2. Local Skill Registry

All skills for this workflow are installed locally under `.agents/skills/`:

| Phase       | Phase Name                  | Primary Local Skills (`.agents/skills/`) | Description                                                                                                 |
| :---------- | :-------------------------- | :--------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Phase 1** | Community Discussion Mining | `reddapi`, `github-trending`             | Scrapes Reddit pain points and GitHub trending repos to extract real developer complaints and rising tools. |
| **Phase 2** | Tech Signal Ingestion       | `research`                               | Searches engineering blogs and release notes to extract "weak signals" and technical depth.                 |
| **Phase 3** | Search Demand Validation    | `find-keywords`                          | Validates search intent, search volume spikes, and primary/secondary target terms.                          |
| **Phase 4** | GEO Competitor Gap Analysis | `competitor-analysis`                    | Audits top-ranking content using EEAT/CITE frameworks to find LLM citation gaps.                            |
| **Phase 5** | Angle & Hook Framing        | `content-strategy`                       | Packages research data into actionable blog titles, angles, hooks, and content outlines.                    |

---

## 3. Subagent Execution Policy

To ensure maximum focus and prevent context bloat:

1. **Subagents for Every Phase**: The orchestrator spawns isolated subagents via `invoke_subagent` for each of the 5 phases.
2. **Context Isolation**: Raw Reddit JSONs, RSS feeds, and GitHub scrapings remain inside subagent contexts. Only structured summary findings are passed back to the orchestrator.
3. **Artifact Persistence**: The final topic brief is persisted to `.scratch/topics/<topic-slug>.md`.

---

## 4. Topic Brief Format (`.scratch/topics/<topic-slug>.md`)

Every completed Topic Research run generates a structured brief:

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

## 5. Workflow Command

The Topic Research Workflow can be invoked via the `.agents/skills/topic-research-workflow` skill:

```bash
# Example invocation prompt
"Execute the topic-research-workflow skill to find the best 3 blog topic ideas for Web3 performance and Next.js 15"
```
