'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Send, MoreVertical, Check, CheckCheck, Image, Smile, MessageCircle } from 'lucide-react'
import { suggestedUsers, currentUser } from '@/lib/socialData'

interface Message {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  isRead: boolean
  isSent: boolean
}

interface Conversation {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    isOnline: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      isOnline: true,
    },
    lastMessage: 'Great project! Can you share the details?',
    timestamp: '2d',
    unreadCount: 2,
    messages: [
      {
        id: '1',
        author: {
          name: 'Sarah Chen',
          username: 'sarahchen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        },
        content: 'Hello! The design you shared last looks very nice.',
        timestamp: '2d',
        isRead: true,
        isSent: false,
      },
      {
        id: '2',
        author: currentUser,
        content: 'Thank you! I will share more details soon.',
        timestamp: '2d',
        isRead: true,
        isSent: true,
      },
      {
        id: '3',
        author: {
          name: 'Sarah Chen',
          username: 'sarahchen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        },
        content: 'Great project! Can you share the details?',
        timestamp: '2d',
        isRead: false,
        isSent: false,
      },
    ],
  },
  {
    id: '2',
    user: {
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      isOnline: false,
    },
    lastMessage: 'Thanks for the meeting!',
    timestamp: '3d',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        author: {
          name: 'Marcus Johnson',
          username: 'marcusj',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        },
        content: 'Thanks for the meeting!',
        timestamp: '3d',
        isRead: true,
        isSent: false,
      },
    ],
  },
  {
    id: '3',
    user: {
      name: 'Emma Rodriguez',
      username: 'emmarod',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      isOnline: true,
    },
    lastMessage: 'See you tomorrow!',
    timestamp: '1h',
    unreadCount: 1,
    messages: [
      {
        id: '1',
        author: {
          name: 'Emma Rodriguez',
          username: 'emmarod',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        },
        content: 'See you tomorrow!',
        timestamp: '1h',
        isRead: false,
        isSent: false,
      },
    ],
  },
]

const formatTimestamp = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'now'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  )
  const [newMessage, setNewMessage] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation?.messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const messageDate = new Date()
    const message: Message = {
      id: Date.now().toString(),
      author: currentUser,
      content: newMessage.trim(),
      timestamp: formatTimestamp(messageDate),
      isRead: false,
      isSent: true,
    }

    // Update conversations list
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message.content,
              timestamp: 'now',
              unreadCount: 0, // Reset unread count when sending a message
            }
          : conv
      )
    )

    // Update selected conversation with new message
    setSelectedConversation((prev) => {
      if (!prev) return null
      return {
        ...prev,
        messages: [...prev.messages, message],
        lastMessage: message.content,
        timestamp: 'now',
      }
    })

    setNewMessage('')
    setTimeout(scrollToBottom, 100)
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
              Messages
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Chat with your friends and strengthen your connections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto" style={{ height: 'calc(100vh - 300px)' }}>
            {/* Conversations List */}
            <div className="lg:col-span-1 flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full border border-slate-200"
              >
                {/* Search */}
                <div className="p-4 border-b border-slate-200 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
                    />
                  </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-sm text-slate-500">No conversations found</p>
                    </div>
                  ) : (
                    filteredConversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => {
                        setSelectedConversation(conversation)
                        // Mark as read when selecting conversation
                        setConversations((prev) =>
                          prev.map((conv) =>
                            conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
                          )
                        )
                      }}
                      className={`p-3.5 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors duration-200 ${
                        selectedConversation?.id === conversation.id ? 'bg-emerald-50 border-l-2 border-l-emerald-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                            <img
                              src={conversation.user.avatar}
                              alt={conversation.user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {conversation.user.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-slate-900 truncate">
                              {conversation.user.name}
                            </h3>
                            <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                              {conversation.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600 truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-medium flex items-center justify-center flex-shrink-0 ml-2">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 flex flex-col">
              {selectedConversation ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full border border-slate-200"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                          <img
                            src={selectedConversation.user.avatar}
                            alt={selectedConversation.user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {selectedConversation.user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {selectedConversation.user.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {selectedConversation.user.isOnline ? 'Active now' : '@' + selectedConversation.user.username}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                    {selectedConversation.messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index === selectedConversation.messages.length - 1 ? 0.1 : 0 }}
                        className={`flex gap-2 ${message.isSent ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isSent && (
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
                            <img
                              src={message.author.avatar}
                              alt={message.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`max-w-[65%] rounded-xl px-4 py-2 text-sm leading-relaxed ${
                            message.isSent
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <div className="flex items-center gap-1 mt-1 justify-end">
                            <span
                              className={`text-xs ${
                                message.isSent ? 'text-white/70' : 'text-slate-500'
                              }`}
                            >
                              {message.timestamp}
                            </span>
                            {message.isSent && (
                              <span>
                                {message.isRead ? (
                                  <CheckCheck className="w-3 h-3 text-emerald-300" />
                                ) : (
                                  <Check className="w-3 h-3 text-white/70" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                        <Image className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                        <Smile className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-sm h-full flex items-center justify-center border border-slate-200"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-900 font-medium mb-1">No chat selected</p>
                    <p className="text-sm text-slate-500">
                      Select a conversation to start messaging
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
