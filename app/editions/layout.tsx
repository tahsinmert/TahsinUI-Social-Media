import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editions',
  description: 'Discover curated editorial collections and special features. Explore high-quality content editions on TahsinUI.',
  keywords: ['editions', 'editorial', 'curated', 'collections', 'features'],
  openGraph: {
    title: 'Editions - TahsinUI',
    description: 'Discover curated editorial collections and special features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editions - TahsinUI',
    description: 'Discover curated editorial collections and special features',
  },
}

export default function EditionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
