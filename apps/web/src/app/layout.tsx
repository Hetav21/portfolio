import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DotPattern } from '@/components/ui/dot-pattern';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hetav.dev'),
  title: 'Hetav Shah | Associate AI Engineer & Agentic AI Specialist',
  description:
    'Hetav Shah is an Associate AI Engineer at ProductSquads specializing in Agentic AI, AWS cloud architecture, multi-modal RAG, and serverless AI.',
  alternates: {
    canonical: 'https://www.hetav.dev/',
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'LLM Summary' },
        { url: '/llms-full.txt', title: 'Full LLM Documentation' },
      ],
      'application/rss+xml': [
        { url: 'https://blog.hetav.dev/rss', title: "Hetav's Blog RSS Feed" },
      ],
    },
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
  openGraph: {
    title: 'Hetav Shah | Associate AI Engineer & Agentic AI Specialist',
    description:
      'Hetav Shah is an Associate AI Engineer at ProductSquads specializing in Agentic AI, AWS cloud architecture, multi-modal RAG, and serverless AI.',
    url: 'https://www.hetav.dev/',
    siteName: 'Hetav Shah Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hetav Shah | Associate AI Engineer & Agentic AI Specialist',
    description:
      'Hetav Shah is an Associate AI Engineer at ProductSquads specializing in Agentic AI, AWS cloud architecture, multi-modal RAG, and serverless AI.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#c4a7e7',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const nonce = headerList.get('x-nonce') || undefined;

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} font-mono bg-background text-foreground antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          nonce={nonce}
        >
          <script
            type="application/ld+json"
            nonce={nonce}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'ProfilePage',
                    '@id': 'https://www.hetav.dev/#webpage',
                    url: 'https://www.hetav.dev/',
                    name: 'Hetav Shah | Associate AI Engineer & Agentic AI Specialist',
                    description: 'Associate AI Engineer portfolio and experience of Hetav Shah.',
                    author: { '@id': 'https://www.hetav.dev/#person' },
                    mainEntity: { '@id': 'https://www.hetav.dev/#person' },
                  },
                  {
                    '@type': 'Person',
                    '@id': 'https://www.hetav.dev/#person',
                    name: 'Hetav Shah',
                    description:
                      'Associate AI Engineer specializing in Agentic AI, RAG pipelines, Model Context Protocol (MCP), and serverless AI on AWS.',
                    jobTitle: 'Associate AI Engineer',
                    worksFor: {
                      '@type': 'Organization',
                      name: 'ProductSquads',
                    },
                    alumniOf: {
                      '@type': 'CollegeOrUniversity',
                      name: 'Adani University',
                    },
                    url: 'https://www.hetav.dev/',
                    image: 'https://www.hetav.dev/avatar.png',
                    email: 'mailto:shahhetav2106@gmail.com',
                    knowsLanguage: ['English', 'Gujarati', 'Hindi'],
                    sameAs: [
                      'https://github.com/Hetav21',
                      'https://www.linkedin.com/in/hetav2106/',
                      'https://x.com/Hetav_21',
                      'https://blog.hetav.dev',
                      'https://cv.hetav.dev',
                    ],
                    knowsAbout: [
                      'Agentic AI Solutions',
                      'AWS Cloud Architecture',
                      'Multi-modal RAG',
                      'Model Context Protocol (MCP)',
                      'Next.js',
                      'Python',
                    ],
                    hasCredential: [
                      {
                        '@type': 'EducationalOccupationalCredential',
                        name: 'AWS Academy Cloud Architecting',
                        recognizedBy: {
                          '@type': 'Organization',
                          name: 'Amazon Web Services',
                        },
                        url: 'https://www.credly.com/badges/f6802249-ee52-43c3-bac2-104dadcd8718/public_url',
                      },
                      {
                        '@type': 'EducationalOccupationalCredential',
                        name: 'Model Context Protocol: Advanced Topics',
                        recognizedBy: {
                          '@type': 'Organization',
                          name: 'Anthropic',
                        },
                        url: 'https://verify.skilljar.com/c/zdrivh9gxyyc',
                      },
                    ],
                    subjectOf: [
                      {
                        '@type': 'SoftwareSourceCode',
                        name: 'Deep Research Agent',
                        author: { '@id': 'https://www.hetav.dev/#person' },
                        codeRepository: 'https://github.com/Hetav21/deep-research-agent',
                        programmingLanguage: 'Python',
                      },
                      {
                        '@type': 'SoftwareSourceCode',
                        name: 'GDPR RAG',
                        author: { '@id': 'https://www.hetav.dev/#person' },
                        codeRepository: 'https://github.com/Hetav21/gdpr-rag',
                        programmingLanguage: 'Python',
                      },
                      {
                        '@type': 'SoftwareSourceCode',
                        name: 'QnA App',
                        author: { '@id': 'https://www.hetav.dev/#person' },
                        codeRepository: 'https://github.com/Hetav21/qna-app',
                        programmingLanguage: 'TypeScript',
                      },
                      {
                        '@type': 'SoftwareSourceCode',
                        name: 'Clickify',
                        author: { '@id': 'https://www.hetav.dev/#person' },
                        codeRepository: 'https://github.com/Hetav21/clickify',
                        programmingLanguage: 'TypeScript',
                      },
                    ],
                  },
                  {
                    '@type': 'WebSite',
                    '@id': 'https://www.hetav.dev/#website',
                    url: 'https://www.hetav.dev/',
                    name: 'Hetav Shah Portfolio',
                    publisher: { '@id': 'https://www.hetav.dev/#person' },
                  },
                ],
              }).replace(/</g, '\\u003c'),
            }}
          />
          {/* Subtle dot pattern background */}
          <div className="fixed inset-0 z-0">
            <DotPattern className="mask-radial-faded opacity-60" />
          </div>

          <Header />
          <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 py-12 space-y-32">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
