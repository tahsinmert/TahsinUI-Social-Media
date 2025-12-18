'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
  UserCheck,
  Bell,
  Check,
  Settings,
} from 'lucide-react'
import { suggestedUsers, currentUser } from '@/lib/socialData'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'repost' | 'follow' | 'mention'
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  isRead: boolean
  postId?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    content: 'liked your post',
    timestamp: '5d',
    isRead: false,
    postId: '1',
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    content: 'commented on your post: "Great design!"',
    timestamp: '1h',
    isRead: false,
    postId: '2',
  },
  {
    id: '3',
    type: 'repost',
    user: {
      name: 'Emma Rodriguez',
      username: 'emmarod',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    content: 'reposted your post',
    timestamp: '3h',
    isRead: false,
    postId: '3',
  },
  {
    id: '4',
    type: 'follow',
    user: {
      name: 'Alex Thompson',
      username: 'alexthompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
    content: 'started following you',
    timestamp: '1d',
    isRead: true,
  },
  {
    id: '5',
    type: 'like',
    user: {
      name: 'Lucas Miller',
      username: 'lucasm',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    },
    content: 'liked your post',
    timestamp: '2d',
    isRead: true,
    postId: '4',
  },
  {
    id: '6',
    type: 'mention',
    user: {
      name: 'Olivia Brown',
      username: 'oliviab',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    },
    content: 'mentioned you in a post',
    timestamp: '3d',
    isRead: true,
    postId: '5',
  },
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return Heart
    case 'comment':
      return MessageCircle
    case 'repost':
      return Repeat2
    case 'follow':
      return UserPlus
    case 'mention':
      return Bell
    default:
      return Bell
  }
}

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return 'bg-red-100 text-red-600'
    case 'comment':
      return 'bg-blue-100 text-blue-600'
    case 'repost':
      return 'bg-green-100 text-green-600'
    case 'follow':
      return 'bg-purple-100 text-purple-600'
    case 'mention':
      return 'bg-yellow-100 text-yellow-600'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  className="text-5xl md:text-7xl font-serif font-bold text-emerald-600 mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Notifications
                </h1>
                <p className="text-xl text-slate-500">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All notifications read'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Mark All as Read
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <Settings className="w-5 h-5 text-slate-600" />
                </motion.button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => setFilter('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm'
                }`}
              >
                All
              </motion.button>
              <motion.button
                onClick={() => setFilter('unread')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  filter === 'unread'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm'
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-medium flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type)
                const iconColor = getNotificationColor(notification.type)

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => !notification.isRead && markAsRead(notification.id)}
                    className={`bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                      !notification.isRead ? 'border-l-4 border-slate-900' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                          <img
                            src={notification.user.avatar}
                            alt={notification.user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-2 border-white"
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-slate-900 leading-relaxed">
                              <span className="font-semibold">{notification.user.name}</span>{' '}
                              <span className="text-slate-600">{notification.content}</span>
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              @{notification.user.username} · {notification.timestamp}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-12 text-center shadow-sm"
              >
                <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl text-slate-600 mb-2">No notifications</p>
                <p className="text-sm text-slate-500">
                  {filter === 'unread'
                    ? 'You have no unread notifications'
                    : 'You have no notifications yet'}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
