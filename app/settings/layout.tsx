import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your TahsinUI account settings and preferences. Customize your profile, privacy, and notifications.',
  keywords: ['settings', 'preferences', 'account', 'privacy', 'profile'],
  openGraph: {
    title: 'Settings - TahsinUI',
    description: 'Manage your account settings and preferences',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Settings - TahsinUI',
    description: 'Manage your account settings and preferences',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
