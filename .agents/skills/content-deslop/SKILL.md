---
name: content-deslop
description: Scans drafted text for generic AI-isms, slop phrases, and robotic tone. Forces rewrites to ensure an authentic, punchy, human brand voice.
---

When the user asks to "deslop" content or review for AI voice authenticity, use this skill.

## Purpose

AI-generated text often devolves into generic "slop" (e.g., using words like "delve", "tapestry", "bustling", "in conclusion", "it's important to note"). This agent ruthlessly hunts down these patterns and rewrites them to sound like a real human.

## Execution Steps

1. **Scan**: Read the provided draft and flag any known AI-isms, repetitive sentence structures, or overly diplomatic/robotic phrasing.
2. **Rewrite**: For every flagged sentence or paragraph, rewrite it to be punchy, opinionated, and authentic.
   - Remove fluff.
   - Kill cliches.
   - Make the tone conversational but professional.
3. **Return**: Output the desloped version of the draft, or present a diff of the changes made to restore the human voice.
