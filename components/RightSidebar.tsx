'use client'

import { motion } from 'framer-motion'
import { Search, UserPlus } from 'lucide-react'
import { trendingTopics, suggestedUsers, type User } from '@/lib/socialData'
import { useState } from 'react'

export default function RightSidebar() {
  const [users, setUsers] = useState<User[]>(suggestedUsers)

  const handleFollow = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    )
  }

  return (
    <aside className="hidden xl:block xl:col-span-3">
      <div className="sticky top-32 space-y-6">
        {/* Search Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 outline-none text-slate-900 placeholder:text-slate-600 text-sm font-medium font-sans focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all"
            />
          </div>
        </motion.div>

        {/* Trending Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4 font-sans">
            Trending Stories
          </h3>
          <div className="space-y-4">
            {trendingTopics.map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <span
                  className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-serif flex-shrink-0"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {trend.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 font-sans group-hover:text-emerald-600 transition-colors">
                    {trend.title}
                  </p>
                  {trend.category && (
                    <p className="text-xs text-emerald-600 font-medium font-sans mt-0.5">
                      {trend.category}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 font-medium font-sans mt-1">
                    {trend.posts.toLocaleString()} posts
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creators to Follow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4 font-sans">
            Creators to Follow
          </h3>
          <div className="space-y-4">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 font-sans truncate">
                    {user.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium font-sans truncate">
                    @{user.username}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFollow(user.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium font-sans transition-colors duration-200 flex items-center gap-1.5 ${
                    user.isFollowing
                      ? 'bg-green-50 text-slate-600 hover:bg-green-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {user.isFollowing ? (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      Follow
                    </>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </aside>
  )
}

