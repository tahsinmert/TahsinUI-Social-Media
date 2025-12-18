'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, User } from 'lucide-react'
import type { BlogPost } from '@/lib/data'

interface BlogCardProps {
  post: BlogPost
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-emerald-300 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3] bg-green-100">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-green-900 rounded-full">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-xs text-emerald-600 font-medium mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
          </div>

          <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">
            <span className="relative inline-block">
              {post.title}
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-900 group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
              />
            </span>
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3 font-medium">
            {post.excerpt}
          </p>

          <motion.a
            href={`/post/${post.id}`}
            className="mt-4 text-sm font-medium text-slate-900 hover:text-emerald-900 inline-flex items-center gap-2 self-start"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            Read More
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

