'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'
import SocialLayout from '@/components/SocialLayout'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import PageHeader from '@/components/PageHeader'
import { mockDrafts, type Draft } from '@/lib/socialData'

function DraftCard({ draft, index, onEdit, onDelete }: { draft: Draft, index: number, onEdit: (id: string) => void, onDelete: (id: string) => void }) {
  const renderContent = (content: string) => {
    // Show first 150 characters
    const truncated = content.length > 150 ? content.substring(0, 150) + '...' : content
    const words = truncated.split(' ')
    const keyPhrases = words.slice(0, 3).join(' ')
    const rest = words.slice(3).join(' ')

    return (
      <p className="text-slate-700 leading-relaxed font-sans">
        <span
          className="font-serif font-semibold text-slate-900"
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
      className="bg-white/60 backdrop-blur-sm border-2 border-dashed border-slate-300 rounded-3xl p-6 hover:border-slate-400 hover:bg-white/80 transition-all duration-200"
    >
      {/* Content */}
      <div className="mb-4">
        {renderContent(draft.content)}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-600 font-medium font-sans">
          <span>Updated {draft.updatedAt}</span>
          <span className="mx-2">·</span>
          <span>Created {draft.createdAt}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(draft.id)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors font-sans flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(draft.id)}
            className="px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full text-sm font-medium transition-colors font-sans flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>(mockDrafts)

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit draft:', id)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this draft?')) {
      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== id))
    }
  }

  return (
    <main className="min-h-screen">
      <SocialLayout>
        <LeftSidebar />
        <div className="lg:col-span-6">
          <PageHeader
            title="Unpublished Thoughts"
            subtitle="Continue writing your drafts"
          />

          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                  <Edit2 className="w-12 h-12 text-slate-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2">
                  No drafts yet
                </h3>
              <p className="text-slate-600 text-center max-w-md font-medium">
                Start writing and save your thoughts as drafts
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {drafts.map((draft, index) => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
        <RightSidebar />
      </SocialLayout>
    </main>
  )
}

