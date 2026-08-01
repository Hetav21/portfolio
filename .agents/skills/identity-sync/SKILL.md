---
name: identity-sync
description: 'Audit identity data consistency across the portfolio monorepo. Checks that personal information (name, title, email, social links, certifications, projects) in JSON-LD, OpenGraph, UI components, llms.txt files, and manifests are in sync with the canonical registry at docs/specs/identity.md. Use when the user updates any personal info, adds a new certification or project, changes job title/employer, or wants to verify nothing drifted.'
---

# Identity Sync — Cross-App Data Consistency Checker

Verify that all personal identity data across the portfolio monorepo matches the canonical source of truth in [`docs/specs/identity.md`](../../docs/specs/identity.md).

## When to Use

- After updating any personal fact (job title, employer, email, new certification, new project)
- Before deploying to production
- When the user asks to "check if everything is in sync" or "verify my info"
- After bulk edits to JSON-LD, metadata, or llms.txt files

## Process

### 1. Read the Canon

Read `docs/specs/identity.md` — this is the single source of truth. Extract every canonical value from:

- **Section 1**: Core identity fields (name, title, employer, emails, handles, avatar)
- **Section 2**: URLs & entity IDs (`@id` values)
- **Section 3**: Social links (`sameAs` array)
- **Section 4**: Skills (`knowsAbout` arrays, hero roles, llms.txt skills)
- **Section 5**: Certifications (`hasCredential`)
- **Section 6**: Projects (`subjectOf`)
- **Section 7**: Work experience
- **Section 8**: File manifest — which files contain what
- **Section 10**: Known drifts — what is intentionally different

### 2. Check Each File Category

For every file listed in **Section 8 (File Manifest)**, verify each identity field matches the canonical value from the registry. Work through them in this order:

#### A. JSON-LD Structured Data (highest priority)

Check these files for their Person/WebSite/ProfilePage schemas:

| File                                | What to verify                                                                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/src/app/layout.tsx`       | Full Person schema: `@id`, name, description, jobTitle, worksFor, alumniOf, email, image, sameAs, knowsAbout, hasCredential, subjectOf |
| `apps/blog/src/app/layout.tsx`      | Person schema: `@id`, name, url, image, email, description, jobTitle, worksFor, knowsAbout, sameAs                                     |
| `apps/blog/src/app/[slug]/page.tsx` | BlogPosting author: `@id`, name, url, sameAs                                                                                           |
| `apps/resume/src/app/layout.tsx`    | Person schema: name, givenName, familyName, email, jobTitle, worksFor, almaMater, sameAs, knowsAbout                                   |

#### B. Next.js Metadata

Check `title`, `description`, `og:title`, `og:description`, `twitter:creator`, `twitter:site`, `authors` in:

- `apps/web/src/app/layout.tsx`
- `apps/blog/src/app/layout.tsx`
- `apps/blog/src/app/[slug]/page.tsx`
- `apps/resume/src/app/layout.tsx`

#### C. UI Components

| File                                           | What to verify                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| `apps/web/src/components/hero.tsx`             | Name text, roles array, social links (GitHub, LinkedIn, email), CV URL |
| `apps/web/src/components/footer.tsx`           | Copyright name, GitHub URL, LinkedIn URL, email                        |
| `apps/blog/src/components/footer.tsx`          | Copyright name, GitHub URL, LinkedIn URL                               |
| `apps/blog/src/components/header.tsx`          | Blog name, avatar alt text                                             |
| `apps/web/src/components/header.tsx`           | Avatar alt text                                                        |
| `apps/desktop/src/components/apps/Contact.tsx` | `TARGET_EMAIL` value                                                   |

#### D. AI-Facing Files

| File                             | What to verify                                                                |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `apps/web/public/llms.txt`       | Name, title, employer, education, skills list, links, projects, contact email |
| `apps/web/public/llms-full.txt`  | All of above + certifications, work experience, all project descriptions      |
| `apps/blog/public/llms.txt`      | Name, title, employer, links, topics, contact email                           |
| `apps/blog/public/llms-full.txt` | Author profile, specializations, contact email                                |

#### E. PWA Manifests

| File                            | What to verify        |
| ------------------------------- | --------------------- |
| `apps/web/src/app/manifest.ts`  | App name, description |
| `apps/blog/src/app/manifest.ts` | App name              |

### 3. Cross-Reference Known Drifts

Before flagging an issue, check **Section 10 (Known Drifts & Intentional Divergences)** in the registry. If a difference is documented as `✅ Intentional`, do NOT report it as a drift. Only flag it if the status is `⚠️ Drift`.

### 4. Report

Produce a structured report with three sections:

#### ✅ In Sync

List files that match the canon completely.

#### ⚠️ Drifts Found

For each drift:

- **File**: path and line number
- **Field**: which identity field
- **Expected** (from registry): the canonical value
- **Actual** (in file): what the file currently has
- **Severity**: `critical` (wrong @id, wrong email), `high` (wrong name, title, employer), `medium` (missing field, stale link), `low` (formatting difference)

#### ℹ️ Intentional Divergences

List any differences that are documented in Section 10 as intentional — confirm they still hold.

### 5. Offer Fixes

After reporting, ask the user if they want to fix the drifts. If yes, apply fixes directly — the registry is always right.

## Common Triggers

- "check if my info is in sync"
- "verify identity data"
- "I changed my job title"
- "I got a new certification"
- "sync my identity"
- "identity audit"
- "check schema consistency"

## Important Rules

1. **The registry (`docs/specs/identity.md`) is always the source of truth.** If code disagrees with the registry, the code is wrong.
2. **Never modify the registry.** If the user wants to change a canonical value, they update the registry first, then you sync the files.
3. **Respect intentional divergences.** Not every difference is a bug — check Section 10 before flagging.
4. **Check ALL files in the manifest.** Don't skip any. A partial audit is worse than no audit.
5. **Report line numbers.** Every drift should reference the exact line in the file for easy fixing.
