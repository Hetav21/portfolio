import { posts } from '@/velite';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.hetav.dev';
  const postUrl = `${siteUrl}/${slug}`;

  return {
    title: post.title,
    description: post.description || `Read ${post.title} on Hetav's Blog.`,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description || `Read ${post.title} on Hetav's Blog.`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Hetav Shah'],
      url: postUrl,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || `Read ${post.title} on Hetav's Blog.`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((post) => post.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.hetav.dev';
  const postUrl = `${siteUrl}/${slug}`;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || `Read ${post.title} on Hetav's Blog.`,
    datePublished: post.date,
    dateModified: post.date,
    url: postUrl,
    author: {
      '@type': 'Person',
      name: 'Hetav Shah',
      url: siteUrl,
      sameAs: ['https://github.com/hetav'],
    },
    publisher: {
      '@type': 'Organization',
      name: "Hetav's Blog",
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/avatar.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags ? post.tags.join(', ') : '',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="prose prose-zinc dark:prose-invert max-w-none pb-20">
        <div className="mb-8 not-prose border-b border-border pb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to list
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <time dateTime={post.date}>{format(parseISO(post.date), 'MMMM d, yyyy')}</time>
            <span>•</span>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <MDXContent code={post.body} />
      </article>
    </>
  );
}
