import { ImageResponse } from 'next/og';
import { posts } from '@/velite';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateImageMetadata() {
  return posts.map((post) => ({
    id: post.slugAsParams,
    alt: post.title,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slugAsParams === slug);

  const title = post ? post.title : "Hetav's Blog";
  const description = post ? post.description : 'Writing about code, Linux, and web development.';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: 24, color: '#a1a1aa' }}>Hetav&apos;s Blog</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: '#fafafa',
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 26,
                color: '#a1a1aa',
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#71717a',
          }}
        >
          https://blog.hetav.dev/{slug}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
