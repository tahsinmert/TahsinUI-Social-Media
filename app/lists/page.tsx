'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import SocialLayout from '@/components/SocialLayout'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import PageHeader from '@/components/PageHeader'
import ListCard from '@/components/ListCard'
import { mockLists, type List } from '@/lib/socialData'

export default function ListsPage() {
  const [lists, setLists] = useState<List[]>(mockLists)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handlePin = (id: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, isPinned: !list.isPinned } : list
      )
    )
    // Sort: pinned first
    setLists((prevLists) => {
      const sorted = [...prevLists].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return 0
      })
      return sorted
    })
  }

  const pinnedLists = lists.filter((list) => list.isPinned)
  const unpinnedLists = lists.filter((list) => !list.isPinned)

  return (
    <main className="min-h-screen">
      <SocialLayout>
        <LeftSidebar />
        <div className="lg:col-span-6">
          <PageHeader
            title="Your Collections"
            subtitle="Organize your saved content into lists"
          />

          {/* Create New Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full mb-8 p-6 border-2 border-dashed border-slate-300 rounded-3xl bg-white hover:border-emerald-600 hover:bg-emerald-50/50 transition-colors duration-200 flex items-center justify-center gap-3 group"
          >
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              <span className="text-lg font-medium text-slate-600 group-hover:text-emerald-600 font-sans transition-colors">
                Create New List
              </span>
            </motion.button>

            {/* Lists Grid */}
            <div className="space-y-4">
              {pinnedLists.map((list, index) => (
                <ListCard
                  key={list.id}
                  list={list}
                  index={index}
                  onPin={handlePin}
                />
              ))}
              {unpinnedLists.map((list, index) => (
                <ListCard
                  key={list.id}
                  list={list}
                  index={index + pinnedLists.length}
                  onPin={handlePin}
                />
              ))}
          </div>
        </div>
        <RightSidebar />
      </SocialLayout>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-serif font-bold text-slate-900"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Create New List
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-sans">
                    List Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter list name"
                    className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-emerald-600 outline-none text-slate-900 font-sans transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-sans">
                    Description (optional)
                  </label>
                  <textarea
                    placeholder="Add a description"
                    rows={3}
                    className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-emerald-600 outline-none text-slate-900 font-sans resize-none transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors font-sans"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-6 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors font-sans"
                  >
                    Create
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

