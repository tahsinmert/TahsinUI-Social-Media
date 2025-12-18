'use client'

import { motion } from 'framer-motion'
import { Pin, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Edition } from '@/lib/socialData'

interface EditionCardProps {
  edition: Edition
  index: number
  onPin?: (id: string) => void
}

export default function EditionCard({ edition, index, onPin }: EditionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/editions/${edition.id}`}>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 relative">
          {/* Magazine Cover Container - Vertical Layout */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
            {/* Cover Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={edition.coverImage}
                alt={edition.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Top Section - Curator Badge & Pin */}
                <div className="flex items-start justify-between">
                  {/* Curator Badge - Emerald Green */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/90 backdrop-blur-sm rounded-full">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white font-sans">
                      Curator
                    </span>
                  </div>
                  
                  {/* Pin Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onPin?.(edition.id)
                    }}
                    className={`p-2 rounded-xl backdrop-blur-sm transition-colors duration-200 ${
                      edition.isPinned
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-white/20 text-white/80 hover:bg-white/30'
                    }`}
                  >
                    <Pin className={`w-5 h-5 ${edition.isPinned ? 'fill-white' : ''}`} />
                  </motion.button>
                </div>
                
                {/* Bottom Section - Title & Issue Number */}
                <div className="space-y-3">
                  {/* Issue Number */}
                  <div className="text-white/90">
                    <span className="text-sm font-medium font-sans tracking-wider uppercase">
                      Issue #{edition.issueNumber}
                    </span>
                  </div>
                  
                  {/* Bold Serif Title */}
                  <h3
                    className="text-3xl md:text-4xl font-bold text-white leading-tight"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {edition.title}
                  </h3>
                  
                  {/* Curator Info */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/50">
                      <Image
                        src={edition.curator.avatar}
                        alt={edition.curator.name}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-white/90 font-sans">
                      {edition.curator.name}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Footer Info */}
          <div className="p-4 bg-white">
            <p className="text-xs text-slate-600 font-medium font-sans">
              {edition.posts.length} {edition.posts.length === 1 ? 'post' : 'posts'} • {edition.publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

