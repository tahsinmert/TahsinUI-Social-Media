'use client'

import { motion } from 'framer-motion'
import { Pin } from 'lucide-react'
import type { List } from '@/lib/socialData'

interface ListCardProps {
  list: List
  index: number
  onPin?: (id: string) => void
}

export default function ListCard({ list, index, onPin }: ListCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
          {list.thumbnail ? (
            <img
              src={list.thumbnail}
              alt={list.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-2xl font-serif text-slate-600" style={{ fontFamily: 'var(--font-playfair)' }}>
                {list.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 font-sans mb-1">
            {list.title}
          </h3>
          {list.description && (
            <p className="text-sm text-slate-600 font-medium font-sans mb-2 line-clamp-1">
              {list.description}
            </p>
          )}
          <p className="text-xs text-slate-600 font-medium font-sans">
            {list.members} {list.members === 1 ? 'member' : 'members'}
          </p>
        </div>

        {/* Pin Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPin?.(list.id)}
          className={`p-2 rounded-xl transition-colors duration-200 ${
            list.isPinned
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Pin className={`w-5 h-5 ${list.isPinned ? 'fill-emerald-600' : ''}`} />
        </motion.button>
      </div>
    </motion.div>
  )
}

