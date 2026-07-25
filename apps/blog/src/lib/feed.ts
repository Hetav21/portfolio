import { posts } from '@/velite';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.hetav.dev';
export const author = {
  name: 'Hetav Shah',
  link: siteUrl,
};

export function getFeedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateRssFeed() {
  const publishedPosts = getFeedPosts();

  const feedItems = publishedPosts
    .map((post) => {
      const url = `${siteUrl}/${post.slugAsParams}`;
      const categories = post.tags.map((tag) => `\n          <category>${tag}</category>`).join('');
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
          <dc:creator><![CDATA[${author.name}]]></dc:creator>${categories}
        </item>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Hetav's Blog</title>
        <description>Writing about code, Linux, and web development.</description>
        <link>${siteUrl}</link>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${feedItems}
      </channel>
    </rss>`;
}

export function generateAtomFeed() {
  const publishedPosts = getFeedPosts();

  const feedItems = publishedPosts
    .map((post) => {
      const url = `${siteUrl}/${post.slugAsParams}`;
      const categories = post.tags.map((tag) => `\n          <category term="${tag}" />`).join('');
      return `
        <entry>
          <title><![CDATA[${post.title}]]></title>
          <link href="${url}" />
          <id>${url}</id>
          <updated>${new Date(post.date).toISOString()}</updated>
          ${post.description ? `<summary><![CDATA[${post.description}]]></summary>` : ''}${categories}
        </entry>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>Hetav's Blog</title>
      <subtitle>Writing about code, Linux, and web development.</subtitle>
      <link href="${siteUrl}/atom" rel="self" />
      <link href="${siteUrl}" />
      <id>${siteUrl}/</id>
      <updated>${new Date().toISOString()}</updated>
      <author>
        <name>${author.name}</name>
      </author>
      ${feedItems}
    </feed>`;
}

export function generateJsonFeed() {
  const publishedPosts = getFeedPosts();

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: "Hetav's Blog",
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: 'Writing about code, Linux, and web development.',
    authors: [
      {
        name: author.name,
        url: author.link,
      },
    ],
    items: publishedPosts.map((post) => {
      const url = `${siteUrl}/${post.slugAsParams}`;
      return {
        id: url,
        url: url,
        title: post.title,
        summary: post.description,
        date_published: new Date(post.date).toISOString(),
        tags: post.tags,
      };
    }),
  };

  return JSON.stringify(feed, null, 2);
}
