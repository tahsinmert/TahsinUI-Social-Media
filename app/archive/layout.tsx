import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse through archived content and past posts. Explore the history of your activity on TahsinUI.',
  keywords: ['archive', 'history', 'past posts', 'old content'],
  openGraph: {
    title: 'Archive - TahsinUI',
    description: 'Browse through archived content and past posts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Archive - TahsinUI',
    description: 'Browse through archived content and past posts',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
