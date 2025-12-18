'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Heart, MessageCircle, Repeat2, Share2 } from 'lucide-react'
import { mockPosts, type SocialPost } from '@/lib/socialData'
import { currentUser } from '@/lib/socialData'
import TextSelectionTooltip from './TextSelectionTooltip'
import CommentSection, { type Comment } from './CommentSection'

export default function Feed() {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts)
  const [newPostContent, setNewPostContent] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({})
  const [postComments, setPostComments] = useState<Record<string, Comment[]>>({})
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
    if (latest <= 50) {
      setIsExpanded(false)
    }
  })

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )
  }

  const handleRepost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isReposted: !post.isReposted,
              reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
            }
          : post
      )
    )
  }

  const handlePost = () => {
    if (!newPostContent.trim()) return

    const newPost: SocialPost = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content: newPostContent,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
      isReposted: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent('')
  }

  const [mounted, setMounted] = useState(false)
  const [isSlideOpen, setIsSlideOpen] = useState(false)
  const slideRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const showCompact = isScrolled && !isExpanded

  const handleToggleSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsSlideOpen((v) => !v)
    // ensure expanded composer at top is hidden
    if (!isSlideOpen) setIsExpanded(false)
  }

  const handleExpand = () => {
    if (showCompact) {
      setIsExpanded(true)
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleQuoteRepost = (selectedText: string) => {
    // Set the selected text as quote in the composer
    setNewPostContent(`"${selectedText}"\n\n`)
    setIsExpanded(true)
    // Scroll to top to show the composer
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Focus the textarea after a short delay
    setTimeout(() => {
      const textarea = document.querySelector('textarea')
      if (textarea) {
        textarea.focus()
        textarea.setSelectionRange(textarea.value.length, textarea.value.length)
      }
    }, 100)
  }

  const handleCopy = (selectedText: string) => {
    // Copy is handled by the TextSelectionTooltip component
    // This callback can be used for analytics or notifications if needed
    console.log('Text copied:', selectedText)
  }

  const handleToggleComments = (postId: string) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleCommentAdded = (postId: string, newComment: Comment) => {
    setPostComments((prev) => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])],
    }))
    
    // Update post comment count
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post
      )
    )
  }

  return (
    <div className="lg:col-span-6 relative">
      {/* Text Selection Tooltip */}
      <TextSelectionTooltip
        onQuoteRepost={handleQuoteRepost}
        onCopy={handleCopy}
      />
      
      {/* Composer - Sticky at top, animated to compact on scroll */}
      {/* Circular compact version - always visible when scrolled */}
      {showCompact && mounted && createPortal(
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0,
            }}
            transition={{ 
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed top-4 left-4 sm:left-6 lg:left-8 z-50 cursor-pointer pointer-events-auto"
            onClick={handleToggleSlide}
            whileHover={{ scale: 1.05 }}
            aria-label="Open composer"
          >
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Circular text around the circle */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <defs>
                  <path
                    id="circlePathCompact"
                    d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                    fill="none"
                  />
                </defs>
                <text
                  style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fill: '#475569' }}
                  fontWeight="500"
                >
                  <textPath
                    href="#circlePathCompact"
                    startOffset="0%"
                  >
                    What&apos;s on your mind? • 
                  </textPath>
                </text>
              </svg>
              {/* Circular container with avatar */}
              <motion.div
                className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-green-200 shadow-lg border-2 border-white z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Slide-out composer panel */}
          {isSlideOpen && (
            <>
              {/* click-away overlay */}
              <div className="fixed inset-0 z-40" onClick={() => setIsSlideOpen(false)} />

              <motion.div
                ref={slideRef}
                initial={{ opacity: 0, x: -8, width: 0 }}
                animate={{ opacity: 1, x: 0, width: '20rem' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                className="fixed top-4 left-36 z-50 bg-white rounded-2xl shadow-lg border border-slate-200 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-3 w-full">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full min-h-[90px] resize-none border-none outline-none text-slate-900 placeholder:text-slate-500 text-sm leading-relaxed font-sans focus:ring-0"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">Share your thoughts</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsSlideOpen(false)}
                        className="px-3 py-1.5 rounded-full text-sm text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handlePost()
                          setIsSlideOpen(false)
                        }}
                        disabled={!newPostContent.trim()}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed ${
                          newPostContent.trim()
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </>,
        document.body
      )}
      
      {/* Normal expanded version - only visible when not scrolled or expanded */}
      {!showCompact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="sticky top-12 z-30 mb-6 rounded-3xl shadow-sm border border-slate-200 p-6 bg-white backdrop-blur-md"
          onClick={handleExpand}
        >
          <motion.div 
            className="flex gap-4"
          >
            <div className="flex-shrink-0">
              <motion.div 
                className="rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 w-12 h-12"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <motion.div 
              className="flex-1 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full min-h-[100px] resize-none border-none outline-none text-slate-900 placeholder:text-slate-600 text-base leading-relaxed font-sans focus:ring-0"
                style={{ fontFamily: 'var(--font-inter)' }}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePost()
                  }}
                  disabled={!newPostContent.trim()}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 font-sans disabled:cursor-not-allowed ${
                    newPostContent.trim() 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  Post
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Feed Stream */}
      <div className="space-y-4 pt-0">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            index={index}
            onLike={handleLike}
            onRepost={handleRepost}
            onToggleComments={handleToggleComments}
            isCommentsOpen={openComments[post.id] || false}
            comments={postComments[post.id] || []}
            onCommentAdded={handleCommentAdded}
          />
        ))}
      </div>
    </div>
  )
}

interface PostCardProps {
  post: SocialPost
  index: number
  onLike: (postId: string) => void
  onRepost: (postId: string) => void
  onToggleComments: (postId: string) => void
  isCommentsOpen: boolean
  comments: Comment[]
  onCommentAdded: (postId: string, comment: Comment) => void
}

function PostCard({ post, index, onLike, onRepost, onToggleComments, isCommentsOpen, comments, onCommentAdded }: PostCardProps) {
  // Extract key phrases for serif font styling
  const renderContent = (content: string) => {
    // Simple approach: wrap first few words or phrases in serif
    const words = content.split(' ')
    const keyPhrases = words.slice(0, 3).join(' ')
    const rest = words.slice(3).join(' ')

    return (
      <p className="text-slate-900 leading-relaxed font-sans font-medium">
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
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
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
            <span className="text-sm text-slate-600 font-medium font-sans">·</span>
            <span className="text-sm text-slate-600 font-medium font-sans truncate">
              @{post.author.username}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium font-sans">{post.timestamp}</p>
        </div>
      </div>

      {/* Body */}
      <div className="mb-4">{renderContent(post.content)}</div>

      {/* Footer Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-slate-200">
        {/* Like */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 text-sm font-medium font-sans transition-colors duration-200 ${
            post.isLiked
              ? 'text-[#EF4444]'
              : 'text-slate-600 hover:text-[#EF4444]'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${
              post.isLiked ? 'fill-[#EF4444]' : 'stroke-1 text-slate-600'
            }`}
          />
          <span className="text-slate-600">{post.likes}</span>
        </motion.button>

        {/* Comment */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleComments(post.id)}
          className={`flex items-center gap-2 text-sm font-medium font-sans transition-colors duration-200 ${
            isCommentsOpen
              ? 'text-emerald-600'
              : 'text-slate-600 hover:text-emerald-600'
          }`}
        >
          <MessageCircle className={`w-5 h-5 stroke-1 ${isCommentsOpen ? 'text-emerald-600' : 'text-slate-600'}`} />
          <span className={isCommentsOpen ? 'text-emerald-600' : 'text-slate-600'}>{post.comments}</span>
        </motion.button>

        {/* Repost */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRepost(post.id)}
          className={`flex items-center gap-2 text-sm font-medium font-sans transition-colors duration-200 ${
            post.isReposted
              ? 'text-emerald-600'
              : 'text-slate-600 hover:text-emerald-600'
          }`}
        >
          <Repeat2
            className={`w-5 h-5 ${
              post.isReposted ? 'fill-emerald-600' : 'stroke-1 text-slate-600'
            }`}
          />
          <span className="text-slate-600">{post.reposts}</span>
        </motion.button>

        {/* Share */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 font-medium font-sans transition-colors duration-200 ml-auto"
        >
          <Share2 className="w-5 h-5 stroke-1 text-slate-600" />
        </motion.button>
      </div>

      {/* Comment Section */}
      {isCommentsOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mt-6 pt-6 border-t border-slate-200"
        >
          <CommentSection
            postId={post.id}
            initialComments={comments.length > 0 ? comments : undefined}
            onCommentAdded={(comment) => onCommentAdded(post.id, comment)}
          />
        </motion.div>
      )}
    </motion.article>
  )
}

