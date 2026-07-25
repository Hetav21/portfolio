import { posts } from '@/velite';

export async function GET() {
  // Use the NEXT_PUBLIC_SITE_URL environment variable or a fallback for local development
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.hetav.dev';

  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const feedItems = publishedPosts
    .map((post) => {
      const url = `${siteUrl}/${post.slugAsParams}`;
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
        </item>
      `;
    })
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Hetav's Blog</title>
        <description>Writing about code, Linux, and web development.</description>
        <link>${siteUrl}</link>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${feedItems}
      </channel>
    </rss>`;

  return new Response(feed.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
