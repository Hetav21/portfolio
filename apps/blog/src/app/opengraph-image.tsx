import { ImageResponse } from 'next/og';

export const alt = "Hetav's Blog - Software, AI & Web Development";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
          fontSize: '56px',
          fontWeight: 800,
          color: '#f8fafc',
          lineHeight: 1.15,
          marginBottom: '20px',
          maxWidth: '1000px',
        }}
      >
        Software, AI & Web Development
      </h1>

      <p
        style={{
          fontSize: '26px',
          color: '#94a3b8',
          maxWidth: '900px',
          lineHeight: 1.4,
          marginBottom: '40px',
        }}
      >
        Writing about code, Linux, Agentic AI, and web development.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '16px',
        }}
      >
        {['Software', 'Agentic AI', 'Web Dev', 'Linux'].map((tag, i) => (
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
            {tag}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
    }
  );
}
