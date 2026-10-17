import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

interface RawRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl?: string | null;
  openGraphImageUrl?: string;
  defaultBranch?: string;
  topics?: string[];
  languages?: string[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DESKTOP_ROOT = path.resolve(__dirname, '..');
const PUBLIC_PROJECTS_DIR = path.join(DESKTOP_ROOT, 'public', 'projects');
const DATA_DIR = path.join(DESKTOP_ROOT, 'src', 'data');
const OUTPUT_JSON_PATH = path.join(DATA_DIR, 'projects.json');

const GITHUB_USERNAME = 'Hetav21';

const COLOR_PALETTES = [
  'from-foam to-pine',
  'from-iris to-gold',
  'from-rose to-pine',
  'from-love to-foam',
  'from-primary to-rose',
  'from-gold to-love',
];

function ensureDirs(): void {
  if (!fs.existsSync(PUBLIC_PROJECTS_DIR)) {
    fs.mkdirSync(PUBLIC_PROJECTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadExistingProjects(): unknown[] {
  try {
    if (fs.existsSync(OUTPUT_JSON_PATH)) {
      const data = fs.readFileSync(OUTPUT_JSON_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('[fetch-projects] Failed to parse existing projects.json:', message);
  }
  return [];
}

async function fetchPinnedViaGhCli(): Promise<RawRepo[] | null> {
  try {
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          pinnedItems(first: 10, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                openGraphImageUrl
                defaultBranchRef {
                  name
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `.replace(/\s+/g, ' ');

    const output = execSync(`gh api graphql -f query='${query}'`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
      timeout: 10000,
    });
    const parsed = JSON.parse(output);
    const nodes = parsed?.data?.user?.pinnedItems?.nodes;
    if (Array.isArray(nodes) && nodes.length > 0) {
      console.log(`[fetch-projects] Fetched ${nodes.length} pinned repos via gh CLI.`);
      return nodes.map((node) => ({
        name: node.name,
        description: node.description,
        url: node.url,
        homepageUrl: node.homepageUrl,
        openGraphImageUrl: node.openGraphImageUrl,
        defaultBranch: node.defaultBranchRef?.name || 'main',
        topics:
          node.repositoryTopics?.nodes?.map((t: { topic: { name: string } }) => t.topic.name) || [],
        languages: node.languages?.nodes?.map((l: { name: string }) => l.name) || [],
      }));
    }
  } catch {
    // gh CLI not available or failed
  }
  return null;
}

async function fetchPinnedViaProfileScrape(): Promise<RawRepo[] | null> {
  try {
    console.log('[fetch-projects] Attempting fallback: scrape github.com profile for pinned repos');
    const profileUrl = `https://github.com/${GITHUB_USERNAME}`;
    const res = await fetch(profileUrl, {
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      return null;
    }

    const html = await res.text();
    const pinnedNames: string[] = [];
    const pinRegex =
      /class="pinned-item-list-item-content"[\s\S]*?<a\s+href="\/Hetav21\/([^"\/\s]+)"/g;
    let match: RegExpExecArray | null;

    while ((match = pinRegex.exec(html)) !== null) {
      if (match[1] && !pinnedNames.includes(match[1])) {
        pinnedNames.push(match[1]);
      }
    }

    if (pinnedNames.length === 0) {
      const fallbackRegex = /<span class="repo"[^>]*>([^<]+)<\/span>/g;
      while ((match = fallbackRegex.exec(html)) !== null) {
        if (match[1] && !pinnedNames.includes(match[1])) {
          pinnedNames.push(match[1].trim());
        }
      }
    }

    if (pinnedNames.length === 0) {
      return null;
    }

    console.log(`[fetch-projects] Found pinned repo names via scrape: ${pinnedNames.join(', ')}`);

    const repos: RawRepo[] = [];
    for (const name of pinnedNames) {
      try {
        const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`, {
          signal: AbortSignal.timeout(10000),
          headers: {
            'User-Agent': 'Mozilla/5.0 (Node.js Build Script)',
            ...(process.env.GITHUB_TOKEN
              ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
              : {}),
          },
        });
        if (repoRes.ok) {
          const repoData = (await repoRes.json()) as {
            name: string;
            description: string | null;
            html_url: string;
            homepage?: string | null;
            default_branch?: string;
            topics?: string[];
            language?: string;
          };
          repos.push({
            name: repoData.name,
            description: repoData.description,
            url: repoData.html_url,
            homepageUrl: repoData.homepage,
            openGraphImageUrl: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${name}`,
            defaultBranch: repoData.default_branch || 'main',
            topics: repoData.topics || [],
            languages: repoData.language ? [repoData.language] : [],
          });
        } else {
          repos.push({
            name,
            description: null,
            url: `https://github.com/${GITHUB_USERNAME}/${name}`,
            homepageUrl: null,
            openGraphImageUrl: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${name}`,
            defaultBranch: 'main',
            topics: [],
            languages: [],
          });
        }
      } catch {
        repos.push({
          name,
          description: null,
          url: `https://github.com/${GITHUB_USERNAME}/${name}`,
          homepageUrl: null,
          openGraphImageUrl: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${name}`,
          defaultBranch: 'main',
          topics: [],
          languages: [],
        });
      }
    }
    return repos;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('[fetch-projects] Scrape fallback error:', message);
  }
  return null;
}

async function fetchReadme(repoName: string, defaultBranch = 'main'): Promise<string | null> {
  const branches = [defaultBranch, 'main', 'master'].filter((b, i, arr) => arr.indexOf(b) === i);
  for (const branch of branches) {
    try {
      const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${branch}/README.md`;
      const res = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        headers: { 'User-Agent': 'Bun' },
      });
      if (res.ok) {
        return await res.text();
      }
    } catch {
      // ignore
    }
  }
  return null;
}

function generateSvgCard(title: string, description: string, tags: string[]): string {
  const safeTitle = (title || 'Project').replace(/[<>&"]/g, '');
  const safeDesc = (description || '').replace(/[<>&"]/g, '').slice(0, 100);
  const tagBubbles = tags
    .slice(0, 3)
    .map(
      (tag, i) =>
        `<rect x="${40 + i * 110}" y="240" width="100" height="32" rx="16" fill="#26233a" stroke="#524f67" />
         <text x="${90 + i * 110}" y="261" fill="#eb6f92" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="600">${tag.replace(/[<>&"]/g, '')}</text>`
    )
    .join('');

  return `<svg width="600" height="315" viewBox="0 0 600 315" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#191724" />
      <stop offset="100%" stop-color="#26233a" />
    </linearGradient>
  </defs>
  <rect width="600" height="315" fill="url(#grad)" rx="16"/>
  <rect x="2" y="2" width="596" height="311" fill="none" stroke="#31748f" stroke-width="2" rx="14" opacity="0.4"/>
  <circle cx="50" cy="50" r="10" fill="#eb6f92" opacity="0.8"/>
  <circle cx="80" cy="50" r="10" fill="#f6c177" opacity="0.8"/>
  <circle cx="110" cy="50" r="10" fill="#9ccfd8" opacity="0.8"/>
  <text x="40" y="120" fill="#e0def4" font-size="34" font-family="sans-serif" font-weight="bold">${safeTitle}</text>
  <text x="40" y="165" fill="#908caa" font-size="16" font-family="sans-serif">${safeDesc}</text>
  ${tagBubbles}
</svg>`;
}

async function downloadImage(
  imageUrl: string,
  targetPath: string,
  fallbackSvg: string
): Promise<boolean> {
  try {
    const res = await fetch(imageUrl, {
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('image')) {
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > 500) {
          fs.writeFileSync(targetPath, buffer);
          return true;
        }
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[fetch-projects] Image download error for ${imageUrl}:`, message);
  }

  // If file already exists from a previous run, keep it!
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 500) {
    return true;
  }

  // Fallback: write SVG
  const svgPath = targetPath.replace(/\.png$/, '.svg');
  fs.writeFileSync(svgPath, fallbackSvg, 'utf-8');
  return false;
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main(): Promise<void> {
  console.log('[fetch-projects] Checking GitHub pinned projects for', GITHUB_USERNAME);
  ensureDirs();

  let rawRepos = await fetchPinnedViaGhCli();
  if (!rawRepos) {
    rawRepos = await fetchPinnedViaProfileScrape();
  }

  if (!rawRepos || rawRepos.length === 0) {
    const existingProjects = loadExistingProjects();
    if (existingProjects.length > 0) {
      console.warn('[fetch-projects] Could not fetch from GitHub. Retaining existing projects.');
      return;
    }
    console.warn('[fetch-projects] Could not fetch from GitHub and no existing projects found.');
    if (!fs.existsSync(OUTPUT_JSON_PATH)) {
      ensureDirs();
      fs.writeFileSync(OUTPUT_JSON_PATH, '[]\n', 'utf-8');
    }
    return;
  }

  const projects = [];

  for (let i = 0; i < rawRepos.length; i++) {
    const repo = rawRepos[i];
    const slug = repo.name.toLowerCase();
    const title = repo.name;
    const description = repo.description || `Repository ${repo.name} by ${GITHUB_USERNAME}`;

    const rawTags = [...(repo.languages || []), ...(repo.topics || [])];
    let tags = Array.from(
      new Set(rawTags.map((t) => t.charAt(0).toUpperCase() + t.slice(1)))
    ).slice(0, 4);
    if (tags.length === 0) {
      tags = ['Open Source'];
    }

    const color = COLOR_PALETTES[i % COLOR_PALETTES.length];
    const demo =
      repo.homepageUrl && repo.homepageUrl.trim().length > 0 ? repo.homepageUrl : undefined;

    console.log(`[fetch-projects] Processing project [${i + 1}/${rawRepos.length}]: ${title}`);

    // README fetching
    const readme =
      (await fetchReadme(repo.name, repo.defaultBranch)) ||
      `# ${title}\n\n${description}\n\nStack: ${tags.join(', ')}\n\nLinks:\n- Repo: ${repo.url}\n${demo ? `- Demo: ${demo}\n` : ''}`;

    // Image downloading
    const targetPngPath = path.join(PUBLIC_PROJECTS_DIR, `${slug}.png`);
    const fallbackSvg = generateSvgCard(title, description, tags);

    const imageUrl =
      repo.openGraphImageUrl ||
      `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

    const downloadedPng = await downloadImage(imageUrl, targetPngPath, fallbackSvg);
    const imagePath = downloadedPng ? `/projects/${slug}.png` : `/projects/${slug}.svg`;

    // Wait slightly to respect rate limits
    await delay(300);

    projects.push({
      title,
      slug,
      description,
      tags,
      color,
      image: imagePath,
      links: {
        repo: repo.url || `https://github.com/${GITHUB_USERNAME}/${repo.name}`,
        ...(demo ? { demo } : {}),
      },
      readme,
    });
  }

  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  console.log(
    `[fetch-projects] Successfully saved ${projects.length} projects to ${OUTPUT_JSON_PATH}`
  );
}

main().catch((err: unknown) => {
  console.error('[fetch-projects] Uncaught error:', err);
  try {
    ensureDirs();
    if (!fs.existsSync(OUTPUT_JSON_PATH)) {
      fs.writeFileSync(OUTPUT_JSON_PATH, '[]\n', 'utf-8');
    }
  } catch {
    // ignore
  }
  process.exit(0); // Do not fail build if script errors
});
