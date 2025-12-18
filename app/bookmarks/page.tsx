'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark as BookmarkIcon } from 'lucide-react'
import SocialLayout from '@/components/SocialLayout'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import PageHeader from '@/components/PageHeader'
import { mockBookmarks } from '@/lib/socialData'
import { Heart, MessageCircle, Repeat2, Share2 } from 'lucide-react'
import type { SocialPost } from '@/lib/socialData'

function BookmarkPostCard({ post, index }: { post: SocialPost & { savedAt: string }, index: number }) {
  const renderContent = (content: string) => {
    const words = content.split(' ')
    const keyPhrases = words.slice(0, 3).join(' ')
    const rest = words.slice(3).join(' ')

    return (
      <p className="text-slate-900 leading-relaxed font-sans">
        <span
          className="font-serif font-semibold"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {keyPhrases}
        </span>
        {rest && ` ${rest}`}
      </p>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex-shrink-0">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900 font-sans truncate">
              {post.author.name}
            </h4>
            <span className="text-sm text-slate-500 font-sans">·</span>
            <span className="text-sm text-slate-500 font-sans truncate">
              @{post.author.username}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-sans">Saved {post.savedAt}</p>
        </div>
      </div>

      {/* Body */}
      <div className="mb-4">{renderContent(post.content)}</div>

      {/* Footer Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-slate-200">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 text-sm font-sans transition-colors duration-200 ${
            post.isLiked
              ? 'text-red-500'
              : 'text-slate-500 hover:text-red-500'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${
              post.isLiked ? 'fill-red-500' : 'stroke-1'
            }`}
          />
          <span className="text-slate-500">{post.likes}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 font-sans transition-colors duration-200"
        >
          <MessageCircle className="w-5 h-5 stroke-1" />
          <span className="text-slate-500">{post.comments}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 text-sm font-sans transition-colors duration-200 ${
            post.isReposted
              ? 'text-emerald-600'
              : 'text-slate-500 hover:text-emerald-600'
          }`}
        >
          <Repeat2
            className={`w-5 h-5 ${
              post.isReposted ? 'fill-emerald-600' : 'stroke-1'
            }`}
          />
          <span className="text-slate-500">{post.reposts}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 font-sans transition-colors duration-200 ml-auto"
        >
          <Share2 className="w-5 h-5 stroke-1" />
        </motion.button>
      </div>
    </motion.article>
  )
}

export default function BookmarksPage() {
  const [bookmarks] = useState(mockBookmarks)

  return (
    <main className="min-h-screen">
      <SocialLayout>
        <LeftSidebar />
        <div className="lg:col-span-6">
          <PageHeader
            title="Saved Stories"
            subtitle="Keep what inspires you"
          />

            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                  <BookmarkIcon className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2">
                  Nothing saved yet
                </h3>
                <p className="text-slate-500 text-center max-w-md">
                  Keep what inspires you
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmarks.map((bookmark, index) => (
                  <BookmarkPostCard key={bookmark.id} post={bookmark} index={index} />
                ))}
              </div>
            )}
        </div>
        <RightSidebar />
      </SocialLayout>
    </main>
  )
}

