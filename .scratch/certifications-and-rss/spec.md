# Certifications Section & RSS Footer Link

Status: ready-for-agent

## Problem Statement

The portfolio at `hetav.dev` currently has no dedicated certifications section — the two existing certs are mixed into the Experience timeline alongside work and education entries. Visitors cannot quickly see professional credentials at a glance. Additionally, the blog's RSS feed (`blog.hetav.dev/rss`) has no discoverability path from the portfolio site — only the blog itself is linked, not the subscription endpoint.

## Solution

1. **Certifications section**: A new, standalone homepage section between Experience and Projects that displays 7 professional certifications in a compact card grid. Certifications get their own Velite collection, separate from the experience collection, with a frontmatter-only schema (no MDX body).

2. **RSS footer link**: A single plain-text "RSS" link in the footer alongside the existing GitHub, LinkedIn, and Email links, pointing to `https://blog.hetav.dev/rss`.

## User Stories

1. As a portfolio visitor, I want to see certifications in their own section, so that I can quickly assess professional credentials without scrolling through work history.
2. As a portfolio visitor, I want to click a certification's verification link, so that I can validate the credential is authentic.
3. As a portfolio visitor, I want to see which skills each certification covers, so that I can understand the breadth of expertise.
4. As a portfolio visitor, I want to see when each certification was earned, so that I can gauge recency of knowledge.
5. As a portfolio visitor, I want to see the issuing organization for each certification, so that I can assess credential authority.
6. As a portfolio visitor, I want certifications displayed newest-first, so that the most recent credentials are immediately visible.
7. As a portfolio visitor, I want the certifications section to appear in the header navigation, so that I can jump directly to it.
8. As a portfolio visitor, I want the certifications cards to be visually distinct from Experience and Projects, so that each section has its own identity.
9. As a portfolio visitor, I want to find an RSS subscription link in the footer, so that I can subscribe to blog updates without navigating to the blog first.
10. As a portfolio visitor on mobile, I want the certifications grid to collapse to a single column, so that cards remain readable on small screens.
11. As a portfolio visitor, I want the certifications section to participate in scrollspy, so that the header highlights "Certifications" when I'm viewing that section.
12. As a portfolio visitor in light mode, I want the certifications section to look correct in both themes, so that the visual treatment works regardless of preference.

## Implementation Decisions

### Certifications Velite Collection

- **New collection** named `certifications` in the Velite config, pattern `certifications/**/*.mdx`.
- **Schema** (frontmatter-only, no `s.mdx()` field):

  | Field          | Type                              | Required | Notes                                  |
  | -------------- | --------------------------------- | -------- | -------------------------------------- |
  | `title`        | `s.string().max(99)`              | ✅       | Cert name                              |
  | `issuer`       | `s.string().max(99)`              | ✅       | Issuing organization                   |
  | `date`         | `s.string()`                      | ✅       | Human-readable date, e.g. "Dec 2025"   |
  | `tags`         | `s.array(s.string()).default([])` | optional | Skill tags                             |
  | `link`         | `s.string().url().optional()`     | optional | Verification/credential URL            |
  | `order`        | `s.number().default(0)`           | optional | Sort tiebreaker (higher = more recent) |
  | `credentialId` | `s.string().optional()`           | optional | Credential identifier                  |

- No MDX body content — the `content` field is deliberately omitted. Files are frontmatter-only `.mdx`.
- Sort: descending by `order` (newest first), matching the experience section's sort pattern.

### Content Files

Seven frontmatter-only `.mdx` files in `content/certifications/`:

| File                         | Title                                              | Issuer              | Date     | Order |
| ---------------------------- | -------------------------------------------------- | ------------------- | -------- | ----- |
| `mcp-intro.mdx`              | Introduction to Model Context Protocol             | Anthropic           | Dec 2025 | 70    |
| `mcp-advanced.mdx`           | Model Context Protocol: Advanced Topics            | Anthropic           | Dec 2025 | 69    |
| `ai-launchpad-l2.mdx`        | AI Engineering Launchpad \| Level 2 - Practitioner | ProductSquads       | Dec 2025 | 68    |
| `ai-launchpad-l1.mdx`        | AI Engineering Launchpad \| Level 1 - Foundation   | ProductSquads       | Nov 2025 | 67    |
| `aws-cloud-architecting.mdx` | AWS Academy Cloud Architecting                     | Amazon Web Services | May 2025 | 66    |
| `aws-cloud-developing.mdx`   | AWS Academy Cloud Developing                       | Amazon Web Services | Nov 2024 | 65    |
| `aws-ml-foundations.mdx`     | AWS Academy Machine Learning Foundations           | Amazon Web Services | Nov 2024 | 64    |

Credential IDs and verification links for each cert are provided in the grilling session conversation and should be populated in the frontmatter.

### Cleanup of Experience Collection

- **Delete** `content/experience/cert-anthropic-mcp.mdx` and `content/experience/cert-aws-cloud.mdx`.
- **Remove** `'certification'` from the experience schema's `s.enum(['work', 'education', 'certification'])` — becomes `s.enum(['work', 'education'])`.
- **Remove** the `certification: 'award'` entry from `iconMap` in the Velite config.
- **Update** the experience section subtitle from "My professional journey, education, and certifications." to "My professional journey and education."
- **Remove** the `certification` case from the `getIcon` switch in the experience component.

### Certifications Component

- New file: `src/components/certifications.tsx` (server component).
- Imports from the Velite-generated `.velite` output.
- Renders a `<section id="certifications">` with:
  - Sticky blur section header (same pattern as About/Experience/Projects): `sticky top-14 z-40 bg-background/95 backdrop-blur`.
  - Responsive card grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`.
- **Card anatomy** (visually distinct from Project cards):
  - Left accent border: `border-l-2 border-primary` (neither Experience nor Projects use this).
  - Tinted background: `bg-secondary/30` (Projects use `bg-background`).
  - Layout: issuer name (muted) + optional verification link icon → title (bold) → date badge → tag pills.

### Page Composition

- `src/app/page.tsx` updated to: `Hero → About → Experience → Certifications → Projects`.
- Import and render `<Certifications />` between `<Experience />` and `<Projects />`.

### Header Scrollspy

- Add `{ name: 'Certifications', href: '#certifications' }` to the `navItems` array in the header component, between Experience and Projects.

### RSS Footer Link

- Add a single `RSS` text link to the footer's link row, pointing to `https://blog.hetav.dev/rss`.
- Same styling as existing links: `text-sm text-muted-foreground hover:text-primary transition-colors`.
- Uses `target="_blank"` and `rel="noopener noreferrer"` since it's an external domain.

## Testing Decisions

- **Seam**: Playwright E2E (same as existing tests in `tests/portfolio.spec.ts`). This is the highest available seam and matches the existing test pattern.
- **Tests are for local verification only — do not commit them.** Run during development to verify, then discard before merging.
- **What to verify**:
  - `#certifications` section is visible on the homepage.
  - At least one cert title is rendered (e.g., "Introduction to Model Context Protocol").
  - The Certifications nav link in the header exists and scrolls to the section.
  - The RSS link in the footer is visible and has `href` pointing to `https://blog.hetav.dev/rss`.
- **Good test**: Tests external behavior (visible text, link targets, section presence). Does not assert CSS classes, component internals, or Velite data shapes.

## Out of Scope

- Certification detail pages / individual routes — certs are displayed inline only.
- Issuer logos or images on cert cards.
- Filtering or searching certifications.
- Exposing Atom (`/atom`) or JSON Feed (`/feed.json`) endpoints from the portfolio.
- Changes to the blog app itself.
- Mobile hamburger menu for the header (if nav items overflow on small screens, that's a separate concern).

## Further Notes

- The Velite `certifications` pattern uses `.mdx` files for consistency with the rest of the content directory, even though no MDX body is compiled. Velite handles frontmatter-only `.mdx` files without issue when no `s.mdx()` schema field is present.
- The `credentialId` field is stored in frontmatter but not rendered in the UI — it exists purely as metadata for the content author's reference.
- The `order` values use a separate range (60–70) from experience entries (which use 1–10) to avoid any future confusion if the collections are ever merged back.
