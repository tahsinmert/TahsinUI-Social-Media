'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Heart, MessageCircle } from 'lucide-react'
import { MoodboardPost } from '@/lib/socialData'

interface MoodboardGridProps {
  posts: MoodboardPost[]
}

export default function MoodboardGrid({ posts }: MoodboardGridProps) {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width >= 1280) {
        setColumns(4)
      } else if (width >= 1024) {
        setColumns(3)
      } else if (width >= 768) {
        setColumns(2)
      } else {
        setColumns(1)
      }
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Organize posts into columns for masonry layout
  const columnData = useMemo(() => {
    const cols: MoodboardPost[][] = Array.from({ length: columns }, () => [])
    
    posts.forEach((post) => {
      // Calculate which column to place this post in (shortest column)
      // Use a base width of 280px for height calculations
      const baseWidth = 280
      const heights = cols.map((col) =>
        col.reduce((sum, p) => {
          // Height = width / aspectRatio
          const itemHeight = baseWidth / p.aspectRatio
          return sum + itemHeight + 16 // 16px for gap
        }, 0)
      )
      const shortestColumnIndex = heights.indexOf(Math.min(...heights))
      cols[shortestColumnIndex].push(post)
    })

    return cols
  }, [posts, columns])

  return (
    <div className="masonry-grid-container">
      <motion.div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
        layout
        transition={{
          layout: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
      >
        {columnData.map((column, columnIndex) => (
          <motion.div
            key={columnIndex}
            className="flex flex-col gap-4"
            layout
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
          >
            <AnimatePresence mode="popLayout">
              {column.map((post) => (
                <MoodboardItem key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

interface MoodboardItemProps {
  post: MoodboardPost
}

function MoodboardItem({ post }: MoodboardItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const scale = useMotionValue(1)
  const springScale = useSpring(scale, {
    stiffness: 300,
    damping: 30,
  })

  useEffect(() => {
    scale.set(isHovered ? 1.05 : 1)
  }, [isHovered, scale])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        layout: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-slate-100"
      style={{
        aspectRatio: post.aspectRatio,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={post.image}
        alt={post.title || 'Moodboard post'}
        className="w-full h-full object-cover"
        style={{
          scale: springScale,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />

      {/* Overlay - only visible on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {post.title && (
                <h3 className="font-serif font-bold text-lg mb-1">{post.title}</h3>
              )}
              {post.description && (
                <p className="text-sm text-white/90 mb-3 line-clamp-2">{post.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
                <span className="ml-auto text-white/70 text-xs">{post.timestamp}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

