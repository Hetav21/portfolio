import { ImageResponse } from 'next/og';

export const alt = "Hetav's Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: '#a1a1aa',
            marginBottom: 20,
          }}
        >
          blog.hetav.dev
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#fafafa',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Hetav&apos;s Blog
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#71717a',
          }}
        >
          Writing about code, Linux, and web development.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
