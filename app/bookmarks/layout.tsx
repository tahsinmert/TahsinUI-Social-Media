import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Access your saved bookmarks. Keep track of your favorite posts and content on TahsinUI.',
  keywords: ['bookmarks', 'saved', 'favorites', 'collections'],
  openGraph: {
    title: 'Bookmarks - TahsinUI',
    description: 'Access your saved bookmarks and favorite content',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Bookmarks - TahsinUI',
    description: 'Access your saved bookmarks and favorite content',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
