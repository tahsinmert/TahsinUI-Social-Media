import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Discover visual stories from friends and people you follow. Share your moments and explore beautiful content on TahsinUI.',
  keywords: ['stories', 'visual content', 'moments', 'photos', 'sharing'],
  openGraph: {
    title: 'Stories - TahsinUI',
    description: 'Discover visual stories from friends and people you follow on TahsinUI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stories - TahsinUI',
    description: 'Discover visual stories from friends and people you follow',
  },
}

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
