# Identity Registry — Single Source of Truth

> **Purpose**: Canonical registry of all personal identity data used across the portfolio monorepo. When any personal fact changes (job title, email, new certification, new project), update this document FIRST, then use the `identity-sync` skill to verify all consuming files are in sync.

---

## 1. Core Identity Fields

These are the atomic identity values that everything else derives from.

| Field               | Canonical Value                                                      | Notes                                                     |
| ------------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| **Full Name**       | `Hetav Shah`                                                         |                                                           |
| **Given Name**      | `Hetav`                                                              | Used in resume JSON-LD                                    |
| **Family Name**     | `Shah`                                                               | Used in resume JSON-LD                                    |
| **Job Title**       | `Associate AI Engineer`                                              |                                                           |
| **Employer**        | `ProductSquads`                                                      | Schema type: `Organization`                               |
| **Education**       | `B.Tech Computer Science, Adani University`                          | Schema: `CollegeOrUniversity`                             |
| **Public Email**    | `hello@hetav.dev`                                                    | UI-facing (hero, footer, contact, llms.txt)               |
| **Schema Email**    | `contact@hetav.dev`                                                  | Structured data only (JSON-LD `mailto:contact@hetav.dev`) |
| **X Handle**        | `@Hetav_21`                                                          | Twitter metadata `creator` / `site`                       |
| **GitHub Username** | `Hetav21`                                                            |                                                           |
| **LinkedIn Slug**   | `hetav2106`                                                          | Full URL: `https://www.linkedin.com/in/hetav2106/`        |
| **Avatar**          | `/avatar.png` (local), `https://www.hetav.dev/avatar.png` (absolute) |                                                           |

### Personal Description (Short)

> Associate AI Engineer specializing in Agentic AI, RAG pipelines, Model Context Protocol (MCP), and serverless AI on AWS.

### Personal Description (Long — Metadata)

> Hetav Shah is an Associate AI Engineer at ProductSquads specializing in Agentic AI, AWS cloud architecture, multi-modal RAG, and serverless AI.

### Languages Spoken

`English`, `Gujarati`, `Hindi`

---

## 2. URLs & Domains

| URL                                      | Purpose                        |
| ---------------------------------------- | ------------------------------ |
| `https://www.hetav.dev/`                 | Portfolio — canonical base     |
| `https://blog.hetav.dev/`                | Blog                           |
| `https://cv.hetav.dev/`                  | Resume/CV                      |
| `https://desktop.hetav.dev/`             | Desktop environment simulation |
| `https://github.com/Hetav21`             | GitHub profile                 |
| `https://www.linkedin.com/in/hetav2106/` | LinkedIn                       |
| `https://x.com/Hetav_21`                 | X (Twitter)                    |

### Entity IDs (`@id`)

| Entity               | Canonical `@id`                   |
| -------------------- | --------------------------------- |
| Person               | `https://www.hetav.dev/#person`   |
| WebSite (web)        | `https://www.hetav.dev/#website`  |
| WebSite (blog)       | `https://blog.hetav.dev/#website` |
| ProfilePage (web)    | `https://www.hetav.dev/#webpage`  |
| ProfilePage (resume) | `https://cv.hetav.dev/#webpage`   |

---

## 3. Social Links (`sameAs`)

The canonical `sameAs` array for the `Person` entity. All JSON-LD `Person` schemas across apps should use this exact set (or a subset appropriate for context):

```json
[
  "https://github.com/Hetav21",
  "https://www.linkedin.com/in/hetav2106/",
  "https://x.com/Hetav_21",
  "https://blog.hetav.dev",
  "https://cv.hetav.dev"
]
```

> [!NOTE]
> The resume uses a reduced `sameAs` (no X, no blog, no cv). This is acceptable since the resume is no-indexed.

---

## 4. Skills (`knowsAbout`)

### JSON-LD `knowsAbout` (web + blog)

```json
[
  "Agentic AI Solutions",
  "AWS Cloud Architecture",
  "Multi-modal RAG",
  "Model Context Protocol (MCP)",
  "Next.js",
  "Python"
]
```

### JSON-LD `knowsAbout` (resume — expanded)

```json
[
  "Agentic AI",
  "Model Context Protocol (MCP)",
  "RAG Pipelines",
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "Vector Search",
  "AWS",
  "Docker"
]
```

### Hero Roles (web — `FlipWords`)

```json
[
  "Associate AI Engineer",
  "Software Developer",
  "Open Source Contributor",
  "Cloud Architecture Enthusiast"
]
```

### Hero Tagline (web)

> CS Engineer architecting the future of Agentic AI with Opencode, leveraging intelligent subagents and skills to build production-grade LLM systems.

### llms.txt — Core Technical Skills

```
- Agentic AI & RAG: LangChain, LlamaIndex, Model Context Protocol (MCP), Vector Databases (pgvector, Qdrant), vLLM, Bedrock
- Languages & Frameworks: Python, TypeScript, Next.js, React, Node.js, NixOS
- Cloud & DevOps: AWS (Cloud Architecting & Developing certified), Docker, Serverless, EventBridge
```

---

## 5. Certifications (`hasCredential`)

| Certification                            | Issuer              | Verification URL                                                                |
| ---------------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| AWS Academy Cloud Architecting           | Amazon Web Services | `https://www.credly.com/badges/f6802249-ee52-43c3-bac2-104dadcd8718/public_url` |
| Model Context Protocol: Advanced Topics  | Anthropic           | `https://verify.skilljar.com/c/zdrivh9gxyyc`                                    |
| AWS Academy Cloud Developing             | Amazon Web Services | `https://www.credly.com/badges/9fe72cc6-cbc3-45cf-bc70-428bf01e2f1d/public_url` |
| AWS Academy Machine Learning Foundations | Amazon Web Services | `https://www.credly.com/badges/dfd8e398-a30a-4872-98b5-0b777fff7742/public_url` |

> [!NOTE]
> Only the first two are in the web JSON-LD `hasCredential`. All four are listed in `llms-full.txt`. This is intentional — JSON-LD shows the strongest credentials; `llms-full.txt` is comprehensive.

---

## 6. Open Source Projects (`subjectOf`)

| Project             | Repository                                       | Language   | Description                                         |
| ------------------- | ------------------------------------------------ | ---------- | --------------------------------------------------- |
| Deep Research Agent | `https://github.com/Hetav21/deep-research-agent` | Python     | Autonomous multi-step AI research workflow system   |
| GDPR RAG            | `https://github.com/Hetav21/gdpr-rag`            | Python     | Compliant RAG pipeline for data privacy regulations |
| QnA App             | `https://github.com/Hetav21/qna-app`             | TypeScript | Interactive question-answering system               |
| Clickify            | `https://github.com/Hetav21/clickify`            | TypeScript | Web automation & developer productivity utilities   |
| NixOS Config        | `https://github.com/Hetav21/nixos-config`        | Nix        | Declarative system configurations                   |

---

## 7. Work Experience

| Role                  | Company         | Period   | Notes                                       |
| --------------------- | --------------- | -------- | ------------------------------------------- |
| Associate AI Engineer | ProductSquads   | Present  | Current role                                |
| AI Intern             | ProductSquads   | Previous | RAG pipelines, Bedrock, vLLM                |
| Full Stack Intern     | Meru Technosoft | Previous | Tally integration, Electron.js, OAuth2+PKCE |

---

## 8. File Manifest — Where Identity Data Lives

This maps every file that consumes identity data. The `identity-sync` skill checks these files against the canonical values above.

### JSON-LD Structured Data

| File                                | Schema Types                                             | Key Fields                                                                                                  |
| ----------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `apps/web/src/app/layout.tsx`       | `ProfilePage`, `Person`, `WebSite`, `SoftwareSourceCode` | name, description, jobTitle, worksFor, alumniOf, email, image, sameAs, knowsAbout, hasCredential, subjectOf |
| `apps/blog/src/app/layout.tsx`      | `WebSite`, `Person`                                      | name, url, image, email, description, jobTitle, worksFor, knowsAbout, sameAs                                |
| `apps/blog/src/app/[slug]/page.tsx` | `BlogPosting` → `Person` (author)                        | name, url, sameAs, @id                                                                                      |
| `apps/resume/src/app/layout.tsx`    | `Person`, `ProfilePage`                                  | name, givenName, familyName, email, jobTitle, worksFor, almaMater, sameAs, knowsAbout                       |

### Next.js Metadata (OpenGraph + Twitter)

| File                                | Fields                                                                      |
| ----------------------------------- | --------------------------------------------------------------------------- |
| `apps/web/src/app/layout.tsx`       | title, description, og:title, og:description, twitter:creator, twitter:site |
| `apps/blog/src/app/layout.tsx`      | title, description, og:title, og:description, twitter:creator, twitter:site |
| `apps/blog/src/app/[slug]/page.tsx` | og:authors, twitter:creator, twitter:site                                   |
| `apps/resume/src/app/layout.tsx`    | title, description, og:title, og:description, authors, creator, publisher   |

### UI Components

| File                                           | Identity Fields                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `apps/web/src/components/hero.tsx`             | name (`Hetav Shah`), roles array, GitHub link, LinkedIn link, email (`hello@hetav.dev`), CV link |
| `apps/web/src/components/footer.tsx`           | copyright name, GitHub link, LinkedIn link, email (`hello@hetav.dev`)                            |
| `apps/blog/src/components/footer.tsx`          | copyright name, GitHub link, LinkedIn link                                                       |
| `apps/blog/src/components/header.tsx`          | name (`Hetav's Blog`), avatar alt text                                                           |
| `apps/web/src/components/header.tsx`           | avatar alt text (`Hetav Shah`)                                                                   |
| `apps/desktop/src/components/apps/Contact.tsx` | `TARGET_EMAIL` = `hello@hetav.dev`                                                               |

### AI-Facing Files

| File                             | Fields                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------- |
| `apps/web/public/llms.txt`       | name, title, employer, education, skills, links, projects, email                  |
| `apps/web/public/llms-full.txt`  | All of the above + certifications, work experience, detailed project descriptions |
| `apps/blog/public/llms.txt`      | name, title, employer, links, topics, email                                       |
| `apps/blog/public/llms-full.txt` | Author profile, specializations, blog index, email                                |

### PWA Manifests

| File                            | Fields                                      |
| ------------------------------- | ------------------------------------------- |
| `apps/web/src/app/manifest.ts`  | `name: 'Hetav Shah Portfolio'`, description |
| `apps/blog/src/app/manifest.ts` | `name: 'Hetav Shah \| Blog'`                |

---

## 9. Standards & Recommendations

> Research-backed guidelines from compliance audits conducted August 2025.

### JSON-LD (`Person` Entity)

- **Use a consistent global `@id`** across all apps: `https://www.hetav.dev/#person`
- **Redundancy is recommended**: Search engines don't merge `@id` across domains. Each app's `Person` should include at least `name`, `url`, `email`, `jobTitle`, `sameAs` — not just an `@id` reference.
- **`sameAs` is the primary cross-site linker**: Include the same URLs in every `Person` schema for entity disambiguation.
- **One site is the "entity home"**: `www.hetav.dev` is the canonical `Person` definition — it has the most detailed schema (`hasCredential`, `subjectOf`, `alumniOf`, etc.).
- **Blog/resume can be leaner**: A subset is fine, but must have `name`, `url`, and `sameAs`.

### Twitter/X Cards

- **Keep `twitter:` prefix** — X has not introduced `x:` prefixed tags. The crawler still reads `twitter:card`, `twitter:creator`, etc.
- **Always set `creator` and `site`** on all pages to ensure proper attribution.
- **OG fallback**: X falls back to Open Graph tags, but explicit `twitter:` tags give full control over card layout.

### `llms.txt` / `llms-full.txt`

- **Each subdomain gets its own root-level files** — AI agents look at `domain.com/llms.txt`, not cross-domain.
- **Use branded domain email** (`hello@hetav.dev`) — never raw Gmail. AI crawlers value authoritative, domain-consistent contact signals.
- **Keep `llms.txt` under 10KB** — it's the index. `llms-full.txt` is for detailed content.
- **Format**: Markdown with `# H1` for site name, `> blockquote` for summary, `## H2` for sections.
- **Include a `## Contact` section** — AI agents need a canonical contact point.
- **Not an access-control mechanism** — for blocking AI crawlers, use `robots.txt`.
- **Not a ranking factor** — value is B2A (Business-to-Agent) communication, not SEO boost.

### `robots.txt`

- **Explicitly allow AI bots**: GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, Applebot-Extended.
- **If you want to block** AI training crawlers (e.g., CCBot, GPTBot for training), add targeted disallow rules.

### Sitemap

- **Single-page sites**: A sitemap with only `/` is correct. Don't add anchor link URLs.
- **Blog**: Auto-generate from Velite post data.

### Accessibility

- **Skip-to-content link**: `sr-only focus:not-sr-only` pattern as first child of `<body>`.
- **Focus styles**: Tailwind's `outline-ring/50` via `@apply` in `globals.css` covers all interactive elements.
- **Image alt text**: Every `<Image>` must have a descriptive `alt` attribute.

---

## 10. Known Drifts & Intentional Divergences

| Item                                             | Status         | Reason                                                         |
| ------------------------------------------------ | -------------- | -------------------------------------------------------------- |
| ~~Resume `@id` used `cv.hetav.dev/#person`~~     | ✅ Fixed       | Now uses canonical `www.hetav.dev/#person`                     |
| Resume `sameAs` is a subset (no X, blog, cv)     | ✅ Intentional | Resume is no-indexed, minimal schema is fine                   |
| Resume missing `twitter:creator`/`site`          | ✅ Intentional | Resume is no-indexed                                           |
| `hasCredential` only in web, not blog            | ✅ Intentional | Only 2 of 4 certs in JSON-LD; blog is not the entity home      |
| Blog `Person` omits `alumniOf`                   | ✅ Intentional | Education not relevant to blog context                         |
| `subjectOf` (projects) only in web               | ✅ Intentional | Projects belong on the portfolio, not the blog                 |
| `llms-full.txt` lists all 4 certs vs JSON-LD's 2 | ✅ Intentional | LLM docs are comprehensive; JSON-LD highlights top credentials |
