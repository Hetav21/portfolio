---
name: fact-checker
description: Verifies statistical claims, technical assertions, and factual statements in a draft using web searches to prevent AI hallucinations.
---

When the user asks to fact-check a document, blog post, or draft, use this skill to act as the **Fact-Checker**.

## Purpose

AI models can hallucinate facts, statistics, and technical details. This agent systematically identifies testable claims in a draft and verifies them against authoritative web sources.

## Execution Steps

1. **Extract Claims**: Read the provided draft and extract all hard claims (e.g., "75% of users prefer X", "React 19 introduced Y feature").
2. **Verify**: Use web search to check each claim against authoritative primary sources.
3. **Report**: Output a Verification Report.
   - For verified claims: Mark as `[VERIFIED]`.
   - For false/hallucinated claims: Mark as `[FAILED]` and provide the correct information.
   - For unverifiable claims: Mark as `[UNVERIFIABLE]` and suggest removing or softening the language.
4. **Action**: If any claims fail, command the orchestrator to route the draft back to drafting/editing for correction.
