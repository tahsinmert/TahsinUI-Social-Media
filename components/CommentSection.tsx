'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Heart, MessageCircle } from 'lucide-react'
import { currentUser } from '@/lib/socialData'

export interface Comment {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface CommentSectionProps {
  postId?: string
  initialComments?: Comment[]
  onCommentAdded?: (comment: Comment) => void
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 'c1',
    author: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    content: 'This is such a thoughtful perspective. The way you\'ve articulated the relationship between minimalism and intentionality really resonates with me.',
    timestamp: '2h',
    likes: 12,
    isLiked: false,
  },
  {
    id: 'c2',
    author: {
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    content: 'Absolutely agree! The editorial approach to design is what makes this platform stand out. Great work on this piece.',
    timestamp: '4h',
    likes: 8,
    isLiked: true,
  },
  {
    id: 'c3',
    author: {
      name: 'Emma Rodriguez',
      username: 'emmarod',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    content: 'The spacing and typography choices here are impeccable. This is exactly the kind of content I come here for.',
    timestamp: '6h',
    likes: 15,
    isLiked: false,
  },
]

export default function CommentSection({ postId, initialComments, onCommentAdded }: CommentSectionProps) {
  // Use initialComments if provided, otherwise use mockComments
  // If initialComments is explicitly an empty array, use it; if undefined, use mockComments
  const defaultComments = initialComments !== undefined ? initialComments : mockComments
  const [comments, setComments] = useState<Comment[]>(defaultComments)
  const [commentText, setCommentText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sync comments when initialComments changes
  useEffect(() => {
    if (initialComments !== undefined) {
      setComments(initialComments)
    }
  }, [initialComments])

  // Auto-growing textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [commentText])

  const handlePostComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content: commentText.trim(),
      timestamp: 'now',
      likes: 0,
      isLiked: false,
    }

    setComments([newComment, ...comments])
    setCommentText('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    // Notify parent component
    if (onCommentAdded) {
      onCommentAdded(newComment)
    }
  }

  const handleLike = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handlePostComment()
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Comment Input Area */}
      <div className="space-y-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Input Container */}
          <div className="flex-1 space-y-3">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a thoughtful comment..."
                className="w-full min-h-[80px] max-h-[200px] px-4 py-3 resize-none border border-slate-200 rounded-xl outline-none text-slate-900 placeholder:text-slate-500 text-sm leading-relaxed font-sans focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all duration-200"
                style={{ fontFamily: 'var(--font-inter)' }}
              />
            </div>

            {/* Post Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePostComment}
                disabled={!commentText.trim()}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 font-sans disabled:cursor-not-allowed ${
                  commentText.trim()
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                Post
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                delay: index === 0 && comment.timestamp === 'now' ? 0 : index * 0.05,
              }}
              className="flex gap-4"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 font-sans">
                    {comment.author.name}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium font-sans">
                    {comment.timestamp}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {comment.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-1">
                  {/* Like Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium font-sans transition-colors duration-200 ${
                      comment.isLiked
                        ? 'text-emerald-600'
                        : 'text-slate-600 hover:text-emerald-600'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        comment.isLiked ? 'fill-emerald-600 text-emerald-600' : 'stroke-1'
                      }`}
                    />
                    <span>{comment.likes}</span>
                  </motion.button>

                  {/* Reply Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-600 font-medium font-sans transition-colors duration-200"
                  >
                    <MessageCircle className="w-4 h-4 stroke-1" />
                    <span>Reply</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

