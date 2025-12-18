'use client'

import SocialLayout from '@/components/SocialLayout'
import LeftSidebar from '@/components/LeftSidebar'
import Feed from '@/components/Feed'
import RightSidebar from '@/components/RightSidebar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SocialLayout>
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </SocialLayout>
    </main>
  )
}

