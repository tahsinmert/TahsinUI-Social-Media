'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {   TrendingUp, Hash, Users, Sparkles, ArrowUpRight, Search, Heart, MessageCircle, Share2 } from 'lucide-react'
import { trendingTopics, suggestedUsers, mockPosts } from '@/lib/socialData'
import { currentUser } from '@/lib/socialData'

const hashtags = [
  { tag: 'MinimalistDesign', posts: 12400, trending: true },
  { tag: 'EditorialStyle', posts: 8900, trending: true },
  { tag: 'SustainableLiving', posts: 15600, trending: false },
  { tag: 'TechTrends', posts: 23400, trending: true },
  { tag: 'TravelPhotography', posts: 18900, trending: false },
  { tag: 'FashionWeek', posts: 11200, trending: true },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'trending' | 'hashtags' | 'people'>('trending')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h1
              className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Explore
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
              Discover trending topics, hashtags, and new people
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="text"
                  placeholder="Search for topic, hashtag or person..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white backdrop-blur-xl border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 text-slate-900 placeholder:text-slate-600 font-medium"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/80 backdrop-blur-xl border border-white/40 rounded-full p-1 shadow-lg">
              {[
                { id: 'trending', label: 'Trending', icon: TrendingUp },
                { id: 'hashtags', label: 'Hashtags', icon: Hash },
                { id: 'people', label: 'People', icon: Users },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Trending Topics */}
          {activeTab === 'trending' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-slate-900" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Trending Topics
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingTopics.map((trend, index) => (
                  <motion.div
                    key={trend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                          {trend.rank}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                            {trend.title}
                          </h3>
                          {trend.category && (
                            <p className="text-sm text-slate-500 mt-1">{trend.category}</p>
                          )}
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium">{trend.posts.toLocaleString()} posts</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Hashtags */}
          {activeTab === 'hashtags' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Hash className="w-5 h-5 text-slate-900" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Popular Hashtags
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hashtags.map((hashtag, index) => (
                  <motion.div
                    key={hashtag.tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border-2 border-transparent hover:border-slate-900"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Hash className="w-5 h-5 text-slate-900" />
                        <span className="text-lg font-semibold text-slate-900">
                          {hashtag.tag}
                        </span>
                      </div>
                      {hashtag.trending && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                          Trend
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      {hashtag.posts.toLocaleString()} posts
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* People */}
          {activeTab === 'people' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-slate-900" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  People to Follow
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 truncate">
                          {user.name}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">@{user.username}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{user.bio}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-4">
                        <div>
                          <span className="font-semibold text-slate-900">
                            {user.followers.toLocaleString()}
                          </span>
                          <span className="text-slate-500 ml-1">followers</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">{user.following}</span>
                          <span className="text-slate-500 ml-1">following</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          user.isFollowing
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {user.isFollowing ? 'Following' : 'Follow'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Popular Posts Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-slate-900" />
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Popular Posts
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPosts.slice(0, 6).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-slate-500">@{post.author.username}</p>
                    </div>
                  </div>
                  <p className="text-slate-800 leading-relaxed mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-6 pt-4 border-t border-slate-200">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-600 transition-colors duration-200"
                    >
                      <Heart className="w-5 h-5 stroke-1" />
                      <span className="text-slate-500">{post.likes}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-600 transition-colors duration-200"
                    >
                      <MessageCircle className="w-5 h-5 stroke-1" />
                      <span className="text-slate-500">{post.comments}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-600 transition-colors duration-200 ml-auto"
                    >
                      <Share2 className="w-5 h-5 stroke-1" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
