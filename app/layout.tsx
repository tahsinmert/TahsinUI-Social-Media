import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tahsinui.com'),
  title: {
    default: 'TahsinUI - Sophisticated Social Media & Editorial Platform',
    template: '%s | TahsinUI'
  },
  description: 'A sophisticated, minimalist social media and editorial platform built with Next.js 14, TypeScript, and Tailwind CSS. Discover stories, trends, and connect with people.',
  keywords: ['social media', 'editorial platform', 'minimalist design', 'Next.js', 'TypeScript', 'Tailwind CSS', 'blog platform', 'stories', 'trending topics'],
  authors: [{ name: 'TahsinUI' }],
  creator: 'TahsinUI',
  publisher: 'TahsinUI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tahsinui.com',
    title: 'TahsinUI - Sophisticated Social Media & Editorial Platform',
    description: 'A sophisticated, minimalist social media and editorial platform built with Next.js 14, TypeScript, and Tailwind CSS. Discover stories, trends, and connect with people.',
    siteName: 'TahsinUI',
    images: [
      {
        url: '/TahsinUI_full_logo.png',
        width: 1200,
        height: 630,
        alt: 'TahsinUI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TahsinUI - Sophisticated Social Media & Editorial Platform',
    description: 'A sophisticated, minimalist social media and editorial platform built with Next.js 14, TypeScript, and Tailwind CSS.',
    images: ['/TahsinUI_full_logo.png'],
    creator: '@tahsinui',
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
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TahsinUI',
    description: 'A sophisticated, minimalist social media and editorial platform',
    url: 'https://tahsinui.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tahsinui.com/explore?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TahsinUI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tahsinui.com/TahsinUI_full_logo.png'
      }
    }
  }

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://tahsinui.com" />
        <link rel="author" href="/humans.txt" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TahsinUI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${inter.className} bg-slate-100`}>
        <Navbar />
        <main className="pt-12">
          <PageTransition>{children}</PageTransition>
        </main>
        <ScrollToTop />
      </body>
    </html>
  )
}

