import { ImageResponse } from 'next/og';
import { posts } from '@/velite';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export const alt = "Hetav's Blog";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slugAsParams === slug);

  const title = post ? post.title : "Hetav's Blog";
  const description =
    post?.description || 'Writing about code, Linux, Agentic AI, and web development.';
  const tags =
    post?.tags && post.tags.length > 0
      ? post.tags.slice(0, 4)
      : ['Software', 'Agentic AI', 'Web Dev'];

  const titleFontSize = title.length > 60 ? '42px' : title.length > 40 ? '48px' : '54px';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, rgba(196, 167, 231, 0.15) 2px, transparent 0)',
        backgroundSize: '50px 50px',
        padding: '80px',
        fontFamily: 'monospace',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#c4a7e7',
          }}
        />
        <span
          style={{
            color: '#c4a7e7',
            fontSize: '24px',
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          HETAV SHAH // BLOG
        </span>
      </div>

      <h1
        style={{
          fontSize: titleFontSize,
          fontWeight: 800,
          color: '#f8fafc',
          lineHeight: 1.15,
          marginBottom: '20px',
          maxWidth: '1040px',
        }}
      >
        {title}
      </h1>

      <p
        style={{
          fontSize: '24px',
          color: '#94a3b8',
          maxWidth: '960px',
          lineHeight: 1.4,
          marginBottom: '36px',
        }}
      >
        {description.length > 140 ? `${description.slice(0, 137)}...` : description}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {tags.map((tag, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              backgroundColor: 'rgba(196, 167, 231, 0.12)',
              border: '1px solid rgba(196, 167, 231, 0.3)',
              color: '#e2e8f0',
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
    }
  );
}
