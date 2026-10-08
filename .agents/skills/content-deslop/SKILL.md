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
4. **Perspective Audit**: Scan for misleading pronoun usage:
   - **Flag "false ownership we"**: If "we" is used to describe decisions made by a third party (e.g., "Why did we ditch DCR?" when the author is not on the DCR team), rewrite to attribute the action to the actual actor (e.g., "Why did the MCP team ditch DCR?").
   - **Allow "community we"**: Keep "we" only when the author genuinely shares the experience with the reader (e.g., "a mistake most of us made" for common developer practices).
   - **Prefer "you" for tutorials**: Instructional sections should make the reader the protagonist.
