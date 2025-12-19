import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages',
  description: 'Connect with your friends through private messages. Send and receive messages on TahsinUI.',
  keywords: ['messages', 'chat', 'direct messages', 'conversations'],
  openGraph: {
    title: 'Messages - TahsinUI',
    description: 'Connect with your friends through private messages',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Messages - TahsinUI',
    description: 'Connect with your friends through private messages',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
