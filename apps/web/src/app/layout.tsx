import type { Metadata, Viewport } from 'next';
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
    'Hetav Shah is an Associate AI Engineer at ProductSquads specializing in Agentic AI solutions, AWS cloud architecture, multi-modal RAG pipelines, and serverless AI.',
  alternates: {
    canonical: 'https://www.hetav.dev/',
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
      'Hetav Shah is an Associate AI Engineer at ProductSquads specializing in Agentic AI solutions, AWS cloud architecture, multi-modal RAG pipelines, and serverless AI.',
    url: 'https://www.hetav.dev/',
    siteName: 'Hetav Shah Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/avatar.png',
        width: 800,
        height: 800,
        alt: 'Hetav Shah - Associate AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hetav Shah | Associate AI Engineer & Agentic AI Specialist',
    description:
      'Hetav Shah is an Associate AI Engineer at ProductSquads specializing in Agentic AI solutions, AWS cloud architecture, multi-modal RAG pipelines, and serverless AI.',
    images: ['/avatar.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'ProfilePage',
                    '@id': 'https://www.hetav.dev/#webpage',
                    url: 'https://www.hetav.dev/',
                    name: 'Hetav Shah | Associate AI Engineer & Agentic AI Specialist',
                    description:
                      'Associate AI Engineer portfolio and experience of Hetav Shah.',
                    mainEntity: { '@id': 'https://www.hetav.dev/#person' },
                  },
                  {
                    '@type': 'Person',
                    '@id': 'https://www.hetav.dev/#person',
                    name: 'Hetav Shah',
                    jobTitle: 'Associate AI Engineer',
                    worksFor: {
                      '@type': 'Organization',
                      name: 'ProductSquads',
                    },
                    'alumniOf': {
                      '@type': 'EducationalOrganization',
                      name: 'Adani University',
                    },
                    url: 'https://www.hetav.dev/',
                    image: 'https://www.hetav.dev/avatar.png',
                    sameAs: [
                      'https://github.com/Hetav21',
                      'https://www.linkedin.com/in/hetav2106/',
                      'https://blog.hetav.dev',
                      'https://cv.hetav.dev',
                    ],
                    knowAbout: [
                      'Agentic AI Solutions',
                      'AWS Cloud Architecture',
                      'Multi-modal RAG',
                      'Model Context Protocol (MCP)',
                      'Next.js',
                      'Python',
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
              }),
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
