import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscribe',
  description: 'Subscribe to TahsinUI premium features. Get exclusive access to advanced features and enhanced experience.',
  keywords: ['subscribe', 'premium', 'membership', 'subscription', 'upgrade'],
  openGraph: {
    title: 'Subscribe - TahsinUI',
    description: 'Subscribe to TahsinUI premium features and get exclusive access',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Subscribe - TahsinUI',
    description: 'Subscribe to TahsinUI premium features',
  },
}

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
