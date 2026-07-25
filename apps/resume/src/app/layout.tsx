import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#525252',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cv.hetav.dev'),
  title: 'Hetav Shah | Software & AI Engineer CV',
  description:
    'Official Curriculum Vitae and professional portfolio of Hetav Shah, Associate AI Engineer specializing in Agentic AI, RAG Pipelines, Model Context Protocol (MCP), and Full-Stack Systems.',
  keywords: [
    'Hetav Shah',
    'Hetav',
    'Software Engineer',
    'AI Engineer',
    'Associate AI Engineer',
    'Resume',
    'Curriculum Vitae',
    'CV',
    'Agentic AI',
    'Model Context Protocol',
    'MCP',
    'RAG',
    'Full Stack Developer',
    'Next.js',
    'FastAPI',
    'Python',
    'TypeScript',
  ],
  authors: [{ name: 'Hetav Shah', url: 'https://hetav.dev' }],
  creator: 'Hetav Shah',
  publisher: 'Hetav Shah',
  alternates: {
    canonical: 'https://cv.hetav.dev/',
  },
  openGraph: {
    title: 'Hetav Shah | Software & AI Engineer CV',
    description:
      'Curriculum Vitae of Hetav Shah. Associate AI Engineer specializing in Agentic AI, RAG Pipelines, MCP, and Full-Stack Engineering.',
    url: 'https://cv.hetav.dev/',
    siteName: 'Hetav Shah CV',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: '/apple-icon',
        width: 180,
        height: 180,
        alt: 'Hetav Shah CV Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hetav Shah | Software & AI Engineer CV',
    description:
      'Curriculum Vitae of Hetav Shah. Associate AI Engineer specializing in Agentic AI, RAG Pipelines, MCP, and Full-Stack Engineering.',
    creator: '@Hetav_21',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://cv.hetav.dev/#person',
      name: 'Hetav Shah',
      givenName: 'Hetav',
      familyName: 'Shah',
      url: 'https://hetav.dev',
      email: 'mailto:shahhetav2106@gmail.com',
      jobTitle: 'Associate AI Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'ProductSquads',
      },
      almaMater: {
        '@type': 'CollegeOrUniversity',
        name: 'Adani University',
      },
      sameAs: [
        'https://github.com/Hetav21',
        'https://www.linkedin.com/in/hetav2106/',
        'https://hetav.dev',
      ],
      knowsAbout: [
        'Agentic AI',
        'Model Context Protocol (MCP)',
        'RAG Pipelines',
        'Python',
        'TypeScript',
        'React',
        'Next.js',
        'FastAPI',
        'PostgreSQL',
        'Vector Search',
        'AWS',
        'Docker',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://cv.hetav.dev/#webpage',
      url: 'https://cv.hetav.dev/',
      name: 'Hetav Shah | Software & AI Engineer CV',
      description:
        'Official Curriculum Vitae of Hetav Shah, Associate AI Engineer specializing in Agentic AI and Full-Stack Engineering.',
      mainEntity: {
        '@id': 'https://cv.hetav.dev/#person',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#1e1e2e] text-[#cdd6f4]">
        {children}
      </body>
    </html>
  );
}
