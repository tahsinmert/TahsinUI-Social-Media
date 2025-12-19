import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drafts',
  description: 'Access your saved drafts. Continue editing and publishing your unfinished posts on TahsinUI.',
  keywords: ['drafts', 'unpublished', 'work in progress', 'writing'],
  openGraph: {
    title: 'Drafts - TahsinUI',
    description: 'Access your saved drafts and unfinished posts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Drafts - TahsinUI',
    description: 'Access your saved drafts and unfinished posts',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function DraftsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
