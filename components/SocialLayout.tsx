'use client'

import { ReactNode } from 'react'

interface SocialLayoutProps {
  children: ReactNode
}

export default function SocialLayout({ children }: SocialLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8">
          {children}
        </div>
      </div>
    </div>
  )
}

