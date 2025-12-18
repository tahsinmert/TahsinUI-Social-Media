'use client'

import { motion } from 'framer-motion'
import { Eye, Heart, MessageCircle, Tag } from 'lucide-react'

interface Story {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  image: string
  views: number
  timestamp: string
  isViewed: boolean
  likes?: number
  comments?: number
  category?: string
  tags?: string[]
  isLiked?: boolean
  isBookmarked?: boolean
}

interface StoryCardProps {
  story: Story
  index: number
  onClick: () => void
}

export default function StoryCard({ story, index, onClick }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={story.image}
            alt={story.author.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Enhanced Gradient Overlay - bottom-to-top, black/70 to transparent */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Story Border */}
          <div
            className={`absolute inset-0 border-4 rounded-2xl ${
              story.isViewed
                ? 'border-slate-300'
                : 'border-slate-900'
            }`}
          />

          {/* Author Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={story.author.avatar}
                  alt={story.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {story.author.name}
                </p>
                <p className="text-white/90 text-xs truncate">
                  {story.timestamp}
                </p>
              </div>
            </div>
          </div>

          {/* Views Badge */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10">
            <Eye className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-medium">
              {story.views.toLocaleString()}
            </span>
          </div>

          {/* Category Badge */}
          {story.category && (
            <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm rounded-full px-3 py-1.5 z-10">
              <span className="text-white text-xs font-medium">
                {story.category}
              </span>
            </div>
          )}

          {/* Engagement Stats */}
          <div className="absolute top-16 right-4 flex flex-col gap-2 z-10">
            {story.likes !== undefined && (
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
                <Heart className={`w-3 h-3 ${story.isLiked ? 'text-red-400 fill-current' : 'text-white'}`} />
                <span className="text-white text-xs font-medium">
                  {story.likes}
                </span>
              </div>
            )}
            {story.comments !== undefined && (
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
                <MessageCircle className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-medium">
                  {story.comments}
                </span>
              </div>
            )}
          </div>

          {/* Tags (hover'da göster) */}
          {story.tags && story.tags.length > 0 && (
            <div className="absolute bottom-16 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="flex items-center gap-2 flex-wrap">
                {story.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

