import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Discover trending topics, hashtags, and new people on TahsinUI. Explore the latest trends and connect with the community.',
  keywords: ['explore', 'trending', 'hashtags', 'discover', 'people', 'topics'],
  openGraph: {
    title: 'Explore - TahsinUI',
    description: 'Discover trending topics, hashtags, and new people on TahsinUI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore - TahsinUI',
    description: 'Discover trending topics, hashtags, and new people on TahsinUI',
  },
}

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
