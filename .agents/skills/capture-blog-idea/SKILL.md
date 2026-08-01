---
name: capture-blog-idea
description: Instantly captures a raw blog idea or shower thought and logs it to the central idea backlog for future topic research. Adheres to ProBlogger Tip 8 ("When an idea strikes - capture it!").
---

When the user has a raw idea, a passing thought, or a shower thought for a blog post, use this skill to capture it immediately.

## Purpose

Great blogging requires capturing inspiration the moment it strikes (ProBlogger Tip 8). This skill ensures ideas aren't lost and creates a centralized backlog that feeds directly into the `topic-research-workflow`.

## Execution Steps

1. **Take the user's idea**: Read the raw idea from the user's prompt.
2. **Clarify (Optional & Brief)**: If the idea is incredibly vague (e.g., just one word like "React"), ask exactly one quick question to capture the core premise without disrupting the user's workflow. If it's a full sentence, skip to Step 3.
3. **Log the Idea**: Append the idea as a new entry to the backlog file: `.scratch/topics/IDEA_BACKLOG.md`. (Create the file if it doesn't exist).
4. **Format the Entry**: Use the following Markdown format for the appended entry:
   ```markdown
   ### [Date] [Brief Title]

   - **Raw Idea**: [The exact thought/premise]
   - **Core Problem Solved (Tip 11)**: [Brief guess at the reader's problem this solves]
   - **Target Persona (Tip 9)**: [Brief guess at who this is for]
   ```
5. **Confirm**: Confirm to the user that the idea has been safely stored. Remind them that when they have time to evaluate ideas (ProBlogger Tip 12), they can run the `topic-research-workflow` on this backlog item to build a full Content Brief.

## Positioning in the Pipeline

This is **Phase 0**.

- `capture-blog-idea` logs raw thoughts to the `.scratch/topics/IDEA_BACKLOG.md`.
- `topic-research-workflow` takes a raw thought from the backlog and does data-driven validation to produce a `.scratch/topics/<slug>.md` brief.
- `blog-workflow` takes the brief and produces the final MDX post.
