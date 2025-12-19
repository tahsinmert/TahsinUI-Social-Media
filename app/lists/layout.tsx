import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lists',
  description: 'Organize and manage your custom lists. Create curated collections of content and people on TahsinUI.',
  keywords: ['lists', 'collections', 'organize', 'curated'],
  openGraph: {
    title: 'Lists - TahsinUI',
    description: 'Organize and manage your custom lists on TahsinUI',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Lists - TahsinUI',
    description: 'Organize and manage your custom lists',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function ListsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
