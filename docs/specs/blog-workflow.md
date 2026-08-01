# End-to-End Blog Workflow & Skills Architecture

This document specifies the agentic blogging workflow for `apps/blog` in this monorepo. It details the 6-phase pipeline, local skill dependencies, subagent delegation model, and Velite MDX publication requirements.

---

## 1. Overview & Goal

The target of this workflow is to produce high-quality, SEO/GEO-optimized blog posts target-hosted at `apps/blog/content/posts/<slug>.mdx`.

To prevent context bloat and ensure high expertise at each step, the workflow uses an **Orchestrator-Subagent** model: a primary orchestrator spawns isolated subagents for each phase of content creation.

---

## 2. Local Skill Registry

All skills for this workflow are installed locally in the project repository under `.agents/skills/` (no global installation required):

| Phase       | Phase Name                  | Primary Local Skills (`.agents/skills/`)                  | Description                                                                                       |
| :---------- | :-------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| **Phase 1** | Brand Strategy & Context    | `product-marketing`, `content-strategy`                   | Grounds content in product positioning, target audience personas, and value propositions.         |
| **Phase 2** | Keyword Research & Briefing | `keyword-research`, `keyword-clustering`, `find-keywords` | Pulls search volume/intent data, clusters topics, and creates an editor-ready brief.              |
| **Phase 3** | Content Drafting            | `blog`, `blog-writing-guide`, `velite`                    | Multi-agent drafting using built-in article templates and Velite MDX schema standards.            |
| **Phase 4** | SEO & GEO Optimization      | `ai-seo`, `seo`                                           | Optimizes post for Google SEO and Generative Answer Surfaces (Perplexity, ChatGPT, AI Overviews). |
| **Phase 5** | Technical Audit & Build     | `seo`, `velite`                                           | Validates Core Web Vitals, HTML semantic markup, and verifies `.velite` MDX compilation.          |
| **Phase 6** | Distribution                | `copywriting`, `social`, `twitter-algorithm-optimizer`    | Repurposes the blog post into X/LinkedIn posts, newsletters, and promotional copy.                |

---

## 3. Subagent Execution Policy

To ensure high output quality and prevent context rot, **subagents MUST be created for each task/phase**:

1. **Context Isolation**: Each phase subagent runs in its own context window.
2. **Structured Handoff**: Each subagent returns a concise JSON or Markdown artifact (Brief, Outline, Draft, Audit Report) to the main orchestrator.
3. **No Direct State Mutation**: Subagents only edit files or write outputs under `apps/blog/content/posts/` when explicitly assigned in Phase 3 or Phase 4.

---

## 4. Blog Post Publication & Schema (`apps/blog`)

All blog posts are rendered via **Velite** in `apps/blog`. Generated posts must be saved as MDX files at `apps/blog/content/posts/<slug>.mdx` and strictly adhere to the schema in `apps/blog/velite.config.ts`:

```mdx
---
title: 'Article Title (Max 99 characters)'
description: 'Compelling summary for SEO (Max 999 characters)'
date: 'YYYY-MM-DD'
published: true
tags: ['Technology', 'AI', 'Engineering']
cover: './cover-image.jpg' # Optional
---

## Introduction

Post content written in clean GitHub Flavored MDX...
```

### Verification

After creating or editing a post:

- Run `bun --filter blog dev` or `bun run lint` to verify that `.velite` generates content without type errors.

---

## 5. Workflow Command

The entire 6-phase pipeline can be invoked via the `.agents/skills/blog-workflow` skill:

```bash
# Example invocation prompt for the AI agent
"Execute the blog-workflow skill for topic: 'Building Modern AI Agent Pipelines with Bun and Turborepo'"
```
