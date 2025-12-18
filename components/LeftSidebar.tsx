'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bookmark, List, Settings, FileText, User } from 'lucide-react'
import { currentUser } from '@/lib/socialData'

export default function LeftSidebar() {
  const menuItems = [
    { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks' },
    { icon: List, label: 'Lists', href: '/lists' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: FileText, label: 'Drafts', href: '/drafts' },
  ]

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-32 space-y-6">
        {/* Mini Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Name & Username */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 font-sans">
                {currentUser.name}
              </h3>
              <p className="text-sm text-slate-600 font-medium font-sans">
                @{currentUser.username}
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-600 leading-relaxed font-medium font-sans">
              {currentUser.bio}
            </p>

            {/* Stats */}
            <div className="flex gap-6 pt-2">
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 font-sans">
                  {currentUser.followers.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 font-medium font-sans">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900 font-sans">
                  {currentUser.following}
                </div>
                <div className="text-xs text-slate-600 font-medium font-sans">Following</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200"
        >
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link key={item.label} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-green-50 transition-colors duration-200 group cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                    <span className="text-sm font-medium font-sans group-hover:text-emerald-600 transition-colors">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>
        </motion.div>
      </div>
    </aside>
  )
}

