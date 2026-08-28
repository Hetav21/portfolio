---
name: capture-blog-idea
description: Instantly captures a raw blog idea or shower thought and logs it to the central idea backlog for future topic research. Adheres to ProBlogger Tip 8 ("When an idea strikes - capture it!").
---

When the user has a raw idea, a passing thought, or a shower thought for a blog post, use this skill to capture it immediately. Speed matters — do not over-engineer this interaction.

## Purpose

Great blogging requires capturing inspiration the moment it strikes (ProBlogger Tip 8). This skill ensures ideas aren't lost and creates a centralized backlog that feeds directly into the `topic-research-workflow`. Every entry is structured so that the `topic-research-workflow` can pick it up cold, without needing the user to re-explain anything.

## Execution Steps

1. **Take the user's idea**: Read the raw idea from the user's prompt exactly as stated.

2. **Interactive Clarification Loop**:
   - Ask the user up to 3 targeted follow-up questions to flesh out the idea. Good defaults:
     - "What specific problem does this solve for the reader?"
     - "Who is the exact audience — junior devs, senior engineers, CTOs?"
     - "Any rough keywords or search terms someone would type to find this?"
     - "How urgent is this — would you want to write it this week, this month, or it's a backlog idea?"
   - Explicitly tell the user they can **skip** any question or say "just save it" to log the raw idea immediately and brainstorm later in the `topic-research-workflow`.
   - Do NOT ask more than 3 questions in one turn. If the user wants to go deeper, let them continue.

3. **Duplicate Check**: Before saving, scan `.scratch/topics/IDEA_BACKLOG.md` for any existing entry with a very similar title or premise. If a likely duplicate is found, show the existing entry and ask: "This looks similar to an existing idea — save as a separate entry anyway, or update the existing one?"

4. **Log the Idea**:
   - Ensure the directory exists: `mkdir -p .scratch/topics/`

   Append the idea as a new entry to `.scratch/topics/IDEA_BACKLOG.md`. Create the file with a header if it doesn't exist:

   ```markdown
   # Blog Idea Backlog

   > Managed by the `capture-blog-idea` skill. Feed any entry into `topic-research-workflow` to validate and build a full Content Brief.

   ---
   ```

5. **Format the Entry**: Use this exact Markdown format for the appended entry:

   ```markdown
   ### <ISO Date> — <Brief Title>

   - **Raw Idea**: <The exact thought/premise, including all interactive context from the user>
   - **Core Problem Solved**: <The identified reader pain point this solves>
   - **Target Persona**: <Who this is for — be specific (e.g., "Next.js devs migrating from Pages Router")>
   - **Potential Keywords**: <1–3 rough search terms the user mentioned, or "TBD" if none given>
   - **Priority**: `HIGH` / `MEDIUM` / `LOW` (ask the user, default to `MEDIUM` if not specified)
   - **Status**: `CAPTURED` — awaiting topic research
   ```

   > [!NOTE]
   > Use ISO 8601 date format: `YYYY-MM-DD`. Example: `2026-08-01 — Why Bun Is Faster Than Node for Cold Starts`.

6. **Confirm**: Tell the user the idea is saved at `.scratch/topics/IDEA_BACKLOG.md`. Remind them: when they're ready to validate this idea with data (ProBlogger Tip 12), run the `topic-research-workflow` on this backlog entry to build a full Content Brief and a proposed article outline.

## Batch Capture Mode

If the user provides multiple ideas in a single prompt:

1. Parse each distinct idea as a separate entry.
2. Run the **Duplicate Check** (Step 3) for each entry individually.
3. Append all entries to `.scratch/topics/IDEA_BACKLOG.md` as separate `###` blocks, each with its own date, title, and fields.
4. Confirm the total number of ideas saved and list their titles.

## Positioning in the Pipeline

This is **Phase 0** of the full content pipeline:

```
capture-blog-idea  →  logs raw idea to .scratch/topics/IDEA_BACKLOG.md
        │
        ▼
topic-research-workflow  →  validates idea with live data, produces .scratch/topics/<slug>.md brief
        │
        ▼
blog-workflow  →  takes the validated brief, produces the final published MDX post
```

When invoking `topic-research-workflow` for a backlogged idea, tell it: "Use the entry titled `<title>` from `.scratch/topics/IDEA_BACKLOG.md` as the starting input."
