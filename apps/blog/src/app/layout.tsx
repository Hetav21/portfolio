import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.hetav.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hetav's Blog | Software, AI & Web Development",
    template: "%s | Hetav's Blog",
  },
  description: 'Writing about code, Linux, and web development.',
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': '/rss',
      'application/atom+xml': '/atom',
      'application/feed+json': '/feed.json',
    },
  },
  openGraph: {
    title: "Hetav's Blog | Software, AI & Web Development",
    description: 'Writing about code, Linux, and web development.',
    url: siteUrl,
    siteName: "Hetav's Blog",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hetav's Blog | Software, AI & Web Development",
    description: 'Writing about code, Linux, and web development.',
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#191724',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <Header />
          <main className="flex-1 w-full max-w-screen-md mx-auto py-10 px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
