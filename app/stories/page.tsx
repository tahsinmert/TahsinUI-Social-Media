'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Eye, Heart, MessageCircle, Share2, X, Search, Filter, 
  Grid3x3, List, SortAsc, Bookmark, BookmarkCheck, MoreVertical,
  Calendar, TrendingUp, Clock, Star, Tag, Users, BarChart3,
  ChevronLeft, ChevronRight, Download, Copy, Link2, Twitter,
  Facebook, Instagram, Send, ThumbsUp, Flag
} from 'lucide-react'
import StoryCard from '@/components/StoryCard'
import { currentUser, suggestedUsers } from '@/lib/socialData'

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
  likes: number
  comments: number
  category: string
  tags: string[]
  description?: string
  isLiked?: boolean
  isBookmarked?: boolean
}

const mockStories: Story[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    views: 1240,
    timestamp: '2h',
    isViewed: false,
    likes: 89,
    comments: 12,
    category: 'Lifestyle',
    tags: ['photography', 'nature', 'travel'],
    description: 'Beautiful sunset from my recent trip to the mountains',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    author: {
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    views: 890,
    timestamp: '4h',
    isViewed: true,
    likes: 156,
    comments: 23,
    category: 'Art',
    tags: ['art', 'design', 'creative'],
    description: 'New artwork I\'ve been working on',
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '3',
    author: {
      name: 'Emma Rodriguez',
      username: 'emmarod',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    views: 1560,
    timestamp: '6h',
    isViewed: false,
    likes: 234,
    comments: 45,
    category: 'Food',
    tags: ['food', 'cooking', 'recipe'],
    description: 'Homemade pasta recipe that turned out amazing!',
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: '4',
    author: {
      name: 'Alex Thompson',
      username: 'alexthompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    views: 2030,
    timestamp: '8h',
    isViewed: true,
    likes: 312,
    comments: 67,
    category: 'Technology',
    tags: ['tech', 'coding', 'innovation'],
    description: 'Working on an exciting new project',
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '5',
    author: {
      name: 'Lucas Miller',
      username: 'lucasm',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    views: 1780,
    timestamp: '12h',
    isViewed: false,
    likes: 145,
    comments: 28,
    category: 'Travel',
    tags: ['travel', 'adventure', 'explore'],
    description: 'Exploring new places and cultures',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '6',
    author: {
      name: 'Olivia Brown',
      username: 'oliviab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    views: 2450,
    timestamp: '1d',
    isViewed: false,
    likes: 421,
    comments: 89,
    category: 'Fashion',
    tags: ['fashion', 'style', 'outfit'],
    description: 'New collection preview',
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: '7',
    author: {
      name: 'David Wilson',
      username: 'davidw',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    views: 1890,
    timestamp: '1d',
    isViewed: true,
    likes: 198,
    comments: 34,
    category: 'Sports',
    tags: ['sports', 'fitness', 'training'],
    description: 'Morning workout session',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '8',
    author: {
      name: 'Sophia Lee',
      username: 'sophial',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80',
    views: 3120,
    timestamp: '2d',
    isViewed: false,
    likes: 567,
    comments: 123,
    category: 'Music',
    tags: ['music', 'concert', 'live'],
    description: 'Amazing concert experience last night',
    isLiked: true,
    isBookmarked: true,
  },
]

type SortOption = 'popular' | 'recent' | 'views' | 'likes'
type ViewMode = 'grid' | 'list'

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [stories, setStories] = useState<Story[]>(mockStories)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showViewedOnly, setShowViewedOnly] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  // Kategorileri çıkar
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(stories.map(s => s.category))]
    return cats
  }, [stories])

  // Filtrelenmiş ve sıralanmış stories
  const filteredStories = useMemo(() => {
    let filtered = [...stories]

    // Arama filtresi
    if (searchQuery) {
      filtered = filtered.filter(story =>
        story.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => story.category === selectedCategory)
    }

    // Görüntülenme filtresi
    if (showViewedOnly) {
      filtered = filtered.filter(story => story.isViewed)
    }

    // Sıralama
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
        break
      case 'recent':
        filtered.sort((a, b) => {
          const timeA = parseInt(a.timestamp.replace(/[^0-9]/g, '')) || 0
          const timeB = parseInt(b.timestamp.replace(/[^0-9]/g, '')) || 0
          return timeA - timeB
        })
        break
      case 'views':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes)
        break
    }

    return filtered
  }, [stories, searchQuery, selectedCategory, sortBy, showViewedOnly])

  // İstatistikler
  const stats = useMemo(() => {
    return {
      total: stories.length,
      totalViews: stories.reduce((sum, s) => sum + s.views, 0),
      totalLikes: stories.reduce((sum, s) => sum + s.likes, 0),
      totalComments: stories.reduce((sum, s) => sum + s.comments, 0),
    }
  }, [stories])

  // Story beğenme
  const toggleLike = (storyId: string) => {
    setStories(prev => prev.map(s =>
      s.id === storyId
        ? { ...s, isLiked: !s.isLiked, likes: s.isLiked ? s.likes - 1 : s.likes + 1 }
        : s
    ))
    if (selectedStory?.id === storyId) {
      setSelectedStory(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
      } : null)
    }
  }

  // Story favorilere ekleme
  const toggleBookmark = (storyId: string) => {
    setStories(prev => prev.map(s =>
      s.id === storyId ? { ...s, isBookmarked: !s.isBookmarked } : s
    ))
    if (selectedStory?.id === storyId) {
      setSelectedStory(prev => prev ? {
        ...prev,
        isBookmarked: !prev.isBookmarked
      } : null)
    }
  }

  // Story görüntüleme
  const handleStoryClick = (story: Story) => {
    const index = filteredStories.findIndex(s => s.id === story.id)
    setCurrentStoryIndex(index)
    setSelectedStory(story)
    // Görüntülenme durumunu güncelle
    if (!story.isViewed) {
      setStories(prev => prev.map(s =>
        s.id === story.id ? { ...s, isViewed: true, views: s.views + 1 } : s
      ))
    }
  }

  // Önceki/sonraki story
  const navigateStory = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentStoryIndex + 1) % filteredStories.length
      : (currentStoryIndex - 1 + filteredStories.length) % filteredStories.length
    setCurrentStoryIndex(newIndex)
    setSelectedStory(filteredStories[newIndex])
    if (!filteredStories[newIndex].isViewed) {
      setStories(prev => prev.map(s =>
        s.id === filteredStories[newIndex].id
          ? { ...s, isViewed: true, views: s.views + 1 }
          : s
      ))
    }
  }

  // Paylaşım
  const handleShare = (platform: string, story: Story) => {
    const url = `${window.location.origin}/stories/${story.id}`
    const text = `${story.author.name}'s story: ${story.description || ''}`
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
    }
    setShowShareMenu(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h1
              className="text-5xl md:text-7xl font-serif font-bold text-emerald-600 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Stories
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover stories from your friends and people you follow
            </p>

            {/* İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 mb-2 mx-auto">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                <p className="text-xs text-slate-500">Total Stories</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-2 mx-auto">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{(stats.totalViews / 1000).toFixed(1)}K</p>
                <p className="text-xs text-slate-500">Views</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 mb-2 mx-auto">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalLikes}</p>
                <p className="text-xs text-slate-500">Likes</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mb-2 mx-auto">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalComments}</p>
                <p className="text-xs text-slate-500">Comments</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Arama ve Filtreler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 space-y-4"
          >
            {/* Arama Çubuğu */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search stories, authors or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Filtre ve Kontrol Çubukları */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Kategori Filtreleri */}
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>

              {/* Sıralama */}
              <div className="flex items-center gap-2 ml-auto">
                <SortAsc className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Most Recent</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>

              {/* Görünüm Modu */}
              <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Görüntülenen Filtresi */}
              <button
                onClick={() => setShowViewedOnly(!showViewedOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showViewedOnly
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Viewed
              </button>
            </div>

            {/* Sonuç Sayısı */}
            <p className="text-sm text-slate-500">
              {filteredStories.length} stories found
            </p>
          </motion.div>

          {/* Stories Grid/List */}
          {filteredStories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6 mx-auto">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2">
                No stories found
              </h3>
              <p className="text-slate-500">
                Try changing your search criteria
              </p>
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 lg:gap-10'
              : 'space-y-4'
            }>
              {/* Create Story Card */}
              {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-slate-200">
                    <Plus className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-center">
                        <p className="text-sm font-semibold text-slate-900">Create Story</p>
                        <p className="text-xs text-slate-500 mt-1">Share your new story</p>
                  </div>
                </div>
              </div>
            </motion.div>
              )}

            {/* Story Cards */}
              {filteredStories.map((story, index) => (
              <StoryCard
                key={story.id}
                story={story}
                index={index}
                  onClick={() => handleStoryClick(story)}
              />
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Gelişmiş Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => {
              setSelectedStory(null)
              setShowShareMenu(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedStory.image}
                alt={selectedStory.author.name}
                className="w-full h-full object-cover"
              />
              
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full bg-white"
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateStory('prev')
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateStory('next')
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedStory(null)
                  setShowShareMenu(null)
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Story Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={selectedStory.author.avatar}
                      alt={selectedStory.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">
                      {selectedStory.author.name}
                    </p>
                    <p className="text-white/80 text-xs">
                      @{selectedStory.author.username} · {selectedStory.timestamp}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                      {selectedStory.category}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                {selectedStory.description && (
                  <p className="text-white/90 text-sm mb-2 line-clamp-2">
                    {selectedStory.description}
                  </p>
                )}

                {/* Tags */}
                {selectedStory.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedStory.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Story Footer Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(selectedStory.id)
                      }}
                      className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                        selectedStory.isLiked
                          ? 'bg-red-500/80 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${selectedStory.isLiked ? 'fill-current' : ''}`} />
                    </motion.button>
                    <div className="text-white text-sm font-medium">
                      {selectedStory.likes}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </motion.button>
                    <div className="text-white text-sm font-medium">
                      {selectedStory.comments}
                    </div>

                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowShareMenu(showShareMenu === selectedStory.id ? null : selectedStory.id)
                        }}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-white" />
                      </motion.button>

                      {/* Paylaşım Menüsü */}
                      {showShareMenu === selectedStory.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-16 left-0 bg-white rounded-xl shadow-xl p-2 min-w-[200px] z-20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleShare('copy', selectedStory)}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-left"
                          >
                            <Copy className="w-4 h-4 text-slate-600" />
                            <span className="text-sm text-slate-700">Copy Link</span>
                          </button>
                          <button
                            onClick={() => handleShare('twitter', selectedStory)}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-left"
                          >
                            <Twitter className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-slate-700">Share on Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare('facebook', selectedStory)}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-left"
                          >
                            <Facebook className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-slate-700">Share on Facebook</span>
                          </button>
                          <button
                            onClick={() => {
                              const link = document.createElement('a')
                              link.href = selectedStory.image
                              link.download = `story-${selectedStory.id}.jpg`
                              link.click()
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-left"
                          >
                            <Download className="w-4 h-4 text-slate-600" />
                            <span className="text-sm text-slate-700">Download</span>
                          </button>
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(selectedStory.id)
                      }}
                      className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                        selectedStory.isBookmarked
                          ? 'bg-yellow-500/80 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {selectedStory.isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/90 text-xs">
                    <Eye className="w-4 h-4" />
                    <span>{selectedStory.views.toLocaleString()}</span>
                  </div>
                </div>

                {/* Story Counter */}
                <div className="text-center text-white/70 text-xs">
                  {currentStoryIndex + 1} / {filteredStories.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
