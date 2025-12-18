'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import SocialLayout from '@/components/SocialLayout'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { mockEditions } from '@/lib/socialData'
import { blogPosts, type BlogPost } from '@/lib/data'

export default function EditionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const [edition, setEdition] = useState(mockEditions.find((e) => e.id === params.id))
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    if (edition) {
      const editionPosts = blogPosts.filter((post) => edition.posts.includes(post.id))
      setPosts(editionPosts)
    }
  }, [edition])

  if (!edition) {
    return (
      <main className="min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-slate-500 font-sans">Edition not found</p>
        </div>
      </main>
    )
  }

  const handleNext = () => {
    if (currentPage < posts.length) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage < posts.length) {
        handleNext()
      }
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, posts.length])

  return (
    <main className="min-h-screen bg-slate-50">
      <SocialLayout>
        <LeftSidebar />
        <div className="lg:col-span-6">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/editions"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors mb-4 font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Editions</span>
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 rounded-full">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white font-sans">
                  Curator
                </span>
              </div>
              <span className="text-sm text-slate-500 font-sans">
                {edition.curator.name}
              </span>
            </div>
            
            <h1
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {edition.title}
            </h1>
            <p className="text-slate-600 font-sans mb-2">
              Issue #{edition.issueNumber} • {edition.publishedAt}
            </p>
            {edition.description && (
              <p className="text-slate-500 font-sans">{edition.description}</p>
            )}
          </div>

          {/* Flip-book Style Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {currentPage > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </motion.button>
            )}
            
            {currentPage < posts.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </motion.button>
            )}

            {/* Page Counter */}
            <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-medium text-slate-700 font-sans">
                {currentPage + 1} / {posts.length + 1}
              </span>
            </div>

            {/* Cover Page */}
            {currentPage === 0 && (
              <motion.div
                key="cover"
                initial={{ opacity: 0, rotateY: -15 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 15 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[3/4] max-w-md mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={edition.coverImage}
                  alt={edition.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/90 backdrop-blur-sm rounded-full w-fit">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white font-sans">
                      Curator
                    </span>
                  </div>
                  <div className="space-y-3">
                    <span className="text-sm text-white/90 font-sans tracking-wider uppercase">
                      Issue #{edition.issueNumber}
                    </span>
                    <h2
                      className="text-4xl font-bold text-white leading-tight"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {edition.title}
                    </h2>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/50">
                        <Image
                          src={edition.curator.avatar}
                          alt={edition.curator.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-white/90 font-sans">
                        {edition.curator.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Content Pages */}
            <AnimatePresence mode="wait">
              {currentPage > 0 && posts[currentPage - 1] && (
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 100, rotateY: 15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: -15 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={posts[currentPage - 1].image}
                      alt={posts[currentPage - 1].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-emerald-900 rounded-full font-sans">
                        {posts[currentPage - 1].category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 font-sans">
                      <span>{posts[currentPage - 1].date}</span>
                      <span>•</span>
                      <span>{posts[currentPage - 1].author}</span>
                    </div>
                    
                    <h2
                      className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {posts[currentPage - 1].title}
                    </h2>
                    
                    <p className="text-lg text-slate-700 leading-relaxed font-sans">
                      {posts[currentPage - 1].excerpt}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: posts.length + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    currentPage === index
                      ? 'w-8 bg-emerald-600'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <RightSidebar />
      </SocialLayout>
    </main>
  )
}

