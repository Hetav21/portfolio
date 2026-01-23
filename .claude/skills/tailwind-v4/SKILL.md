## Skill: tailwind-v4

**Base directory**: /home/hetav/.claude/skills/tailwind-v4

# Tailwind CSS v4

Guide for using Tailwind CSS v4, focusing on the new CSS-first architecture, configuration patterns, and key differences from v3.

## When to use this skill

Use this skill when:

- Writing or editing CSS files in `apps/web` or `apps/blog`.
- Adding new design tokens (colors, fonts, spacing).
- Debugging build issues related to Tailwind.
- Migrating v3 patterns to v4.

## 1. Installation (PostCSS)

Tailwind v4 uses a dedicated PostCSS plugin package.

**Setup Steps:**

1.  **Install dependencies**:
    ```bash
    bun add tailwindcss @tailwindcss/postcss postcss -D
    ```
2.  **Configure PostCSS** (`postcss.config.mjs`):
    ```javascript
    export default {
      plugins: {
        '@tailwindcss/postcss': {},
      },
    };
    ```
3.  **Import in CSS** (Replaces `@tailwind` directives):
    ```css
    @import 'tailwindcss';
    ```

## 2. Configuration & Theme

The `tailwind.config.js` file is **no longer used** by default. Configuration happens directly in CSS using the `@theme` block.

**Defining the Theme:**
Use CSS variables inside `@theme` to define design tokens.

```css
@import 'tailwindcss';

@theme {
  /* Colors: Becomes bg-mint-500, text-mint-500, etc. */
  --color-mint-500: oklch(0.72 0.11 178);

  /* Fonts: Becomes font-display */
  --font-display: 'Satoshi', 'sans-serif';

  /* Breakpoints: Overrides 'sm' breakpoint */
  --breakpoint-sm: 30rem;

  /* Spacing: Becomes p-128, m-128, etc. */
  --spacing-128: 32rem;
}
```

## 3. Content Detection

Tailwind v4 **automatically detects** content files. You no longer need to configure the `content` array manually.

- **Auto-Scanning**: Scans all files in the project root (ignoring `.gitignore` and `node_modules`).
- **Explicit Sources**: Use `@source` to include files normally ignored (like external packages).
  ```css
  @source "../node_modules/@my-lib/ui";
  ```

## 4. Breaking Changes (v3 -> v4)

- **Directives Removed**: `@tailwind base`, `@tailwind components`, and `@tailwind utilities` are replaced by the single `@import "tailwindcss"`.
- **Renamed Utilities**:
  - `shadow-sm` → `shadow-xs`
  - `shadow` → `shadow-sm`
  - `ring` → `ring-3` (default ring is now 1px)
  - `outline-none` → `outline-hidden`
- **Defaults Changed**:
  - **Border Color**: Defaults to `currentColor` (previously `gray-200`).
  - **Ring Color**: Defaults to `currentColor` (previously `blue-500`).
- **Syntax Changes**:
  - **Modifiers**: `!flex` (start) becomes `flex!` (end).
  - **Arbitrary Vars**: `bg-[--brand]` becomes `bg-(--brand)`.

## 5. New Features

- **OKLCH Colors**: Native support for wide-gamut colors in theme definitions.
- **3D Transforms**: Independent `translate`, `rotate`, and `scale` properties (e.g., `rotate-x-*`, `perspective-*`).
- **Container Queries**: Native support. define `--container-*` in theme and use `@sm:grid-cols-2`.
- **@utility Directive**: Create custom utilities directly in CSS.
  ```css
  @utility tab-4 {
    tab-size: 4;
  }
  ```

## 6. Dark Mode

Dark mode is **CSS-native** and enabled by default using `prefers-color-scheme`.

**Default (System Preference):**

```html
<div class="bg-white dark:bg-black"></div>
```

**Manual Toggle (Class-based):**
To use a class selector (like `.dark`) instead of system preference, define a custom variant:

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));
```
