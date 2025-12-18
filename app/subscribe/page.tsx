'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Settings,
  Edit3,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  Grid3x3,
  Bookmark,
  UserCheck,
  LayoutGrid,
} from 'lucide-react'
import MoodboardGrid from '@/components/MoodboardGrid'
import { currentUser, mockPosts, mockMoodboardPosts } from '@/lib/socialData'

const tabs = [
  { id: 'posts', label: 'Posts', icon: Grid3x3 },
  { id: 'liked', label: 'Liked', icon: Heart },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'moodboard', label: 'Moodboard', icon: LayoutGrid },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')
  const [isFollowing, setIsFollowing] = useState(false)

  const userPosts = mockPosts.filter((post) => post.author.username === currentUser.username)
  const likedPosts = mockPosts.filter((post) => post.isLiked)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-white rounded-3xl shadow-sm p-8 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
                      {currentUser.name}
                    </h1>
                    <p className="text-slate-600 mb-1">@{currentUser.username}</p>
                    <p className="text-slate-700 leading-relaxed">{currentUser.bio}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-slate-100 hover:bg-emerald-50 rounded-xl transition-colors"
                    >
                      <Settings className="w-5 h-5 text-slate-700" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </motion.button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-4">
                  <div>
                    <span className="font-bold text-slate-900">
                      {currentUser.followers.toLocaleString()}
                    </span>
                    <span className="text-slate-500 ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{currentUser.following}</span>
                    <span className="text-slate-500 ml-1">following</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{userPosts.length}</span>
                    <span className="text-slate-500 ml-1">posts</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Istanbul, Turkey</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-emerald-600" />
                    <a href="#" className="hover:text-slate-900 transition-colors">
                      tahsinmert.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Joined January 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="bg-white rounded-3xl shadow-sm p-2 mb-6">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {activeTab === 'posts' && (
              <>
                {userPosts.length > 0 ? (
                  userPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="mb-4">
                        <p className="text-slate-800 leading-relaxed">{post.content}</p>
                      </div>
                      <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Repeat2 className="w-5 h-5" />
                          <span>{post.reposts}</span>
                        </div>
                        <div className="ml-auto">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                          >
                            <Share2 className="w-5 h-5 text-slate-500" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-12 text-center shadow-sm"
                  >
                    <Grid3x3 className="w-16 h-16 text-emerald-200 mx-auto mb-4" />
                    <p className="text-xl text-slate-900 mb-2">No posts yet</p>
                    <p className="text-sm text-slate-500">Share your first post!</p>
                  </motion.div>
                )}
              </>
            )}

            {activeTab === 'liked' && (
              <>
                {likedPosts.length > 0 ? (
                  likedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
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
                          <p className="text-sm font-semibold text-slate-900">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-slate-500">@{post.author.username}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-slate-800 leading-relaxed">{post.content}</p>
                      </div>
                      <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-red-500">
                          <Heart className="w-5 h-5 fill-red-500" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Repeat2 className="w-5 h-5" />
                          <span>{post.reposts}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-12 text-center shadow-sm"
                  >
                    <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-xl text-slate-600 mb-2">No liked posts</p>
                    <p className="text-sm text-slate-500">
                      Posts you liked will appear here
                    </p>
                  </motion.div>
                )}
              </>
            )}

            {activeTab === 'saved' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-12 text-center shadow-sm"
              >
                <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl text-slate-600 mb-2">No saved posts</p>
                <p className="text-sm text-slate-500">
                  Posts you saved will appear here
                </p>
              </motion.div>
            )}

            {activeTab === 'moodboard' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {mockMoodboardPosts.length > 0 ? (
                  <MoodboardGrid posts={mockMoodboardPosts} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-12 text-center shadow-sm"
                  >
                    <LayoutGrid className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-xl text-slate-600 mb-2">No moodboard posts</p>
                    <p className="text-sm text-slate-500">
                      Your visual inspiration will appear here
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
