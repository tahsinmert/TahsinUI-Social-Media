import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with TahsinUI. We\'d love to hear from you. Contact us for support, feedback, or inquiries.',
  keywords: ['contact', 'support', 'feedback', 'help', 'get in touch'],
  openGraph: {
    title: 'Contact - TahsinUI',
    description: 'Get in touch with TahsinUI. We\'d love to hear from you.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact - TahsinUI',
    description: 'Get in touch with TahsinUI',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
