import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Stay updated with your latest notifications. See who liked, commented, or followed you on TahsinUI.',
  keywords: ['notifications', 'updates', 'activity', 'alerts'],
  openGraph: {
    title: 'Notifications - TahsinUI',
    description: 'Stay updated with your latest notifications on TahsinUI',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Notifications - TahsinUI',
    description: 'Stay updated with your latest notifications',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
