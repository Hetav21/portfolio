# WRITING GUIDE

**Context:** `apps/blog/content`

## CREATING A POST

1.  **File Location**: Create a new `.mdx` file in `apps/blog/content/posts/`.
2.  **Filename**: Use kebab-case (e.g., `my-new-feature.mdx`). This becomes the URL slug (`/my-new-feature`).

## FRONTMATTER TEMPLATE
Every post **MUST** start with this block:

```yaml
---
title: "Your Post Title"
date: 2026-01-14
description: "A short summary for the card view (1-2 sentences)."
tags: ["tech", "tutorial"]
published: true
---
```

## WRITING CONTENT

### Standard Markdown
*   **Headers**: `## Section`, `### Subsection`.
*   **Emphasis**: `**bold**`, `*italic*`.
*   **Lists**: `- Item 1`.
*   **Links**: `[Text](url)`.

### Code Blocks
Use triple backticks with language tag for syntax highlighting (Rose Pine theme):

\`\`\`typescript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

### Custom Components
You can use React components directly in your MDX:

1.  **Callouts** (if implemented):
    ```tsx
    <Callout type="warning">This is important!</Callout>
    ```

2.  **Images**:
    Place images in `apps/blog/public/images/`.
    ```tsx
    <Image src="/images/demo.png" width={800} height={400} alt="Demo" />
    ```

## PREVIEWING
1.  Run `bun dev` in the root.
2.  Visit `http://localhost:3001` (Blog) or open the "Browser" app in the Portfolio (`http://localhost:3000`).
3.  Edits reload automatically.

## CHECKLIST BEFORE PUBLISHING
- [ ] Frontmatter is complete.
- [ ] `published: true` is set.
- [ ] Date is correct.
- [ ] Tags are relevant.
- [ ] Spellcheck run.
