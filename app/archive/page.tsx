'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Send, MoreVertical, Check, CheckCheck, Image, Smile } from 'lucide-react'
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

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  )
  const [newMessage, setNewMessage] = useState('')
  const [conversations] = useState<Conversation[]>(mockConversations)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      author: currentUser,
      content: newMessage,
      timestamp: 'now',
      isRead: false,
      isSent: true,
    }

    // In a real app, this would update the conversation
    setNewMessage('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                {/* Search */}
                <div className="p-4 border-b border-slate-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Conversations */}
                <div className="max-h-[600px] overflow-y-auto">
                  {conversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-emerald-50' : ''
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
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              {selectedConversation ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col h-[600px]"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                          <img
                            src={selectedConversation.user.avatar}
                            alt={selectedConversation.user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {selectedConversation.user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {selectedConversation.user.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          @{selectedConversation.user.username}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.isSent ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isSent && (
                          <div className="w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
                            <img
                              src={message.author.avatar}
                              alt={message.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                            message.isSent
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-900'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
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
                                  <CheckCheck className="w-3 h-3 text-blue-400" />
                                ) : (
                                  <Check className="w-3 h-3 text-white/70" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <Image className="w-5 h-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <Smile className="w-5 h-5 text-slate-600" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage()
                          }
                        }}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 placeholder:text-slate-400"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="bg-white rounded-3xl shadow-sm h-[600px] flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-slate-600 mb-2">Select a chat</p>
                    <p className="text-sm text-slate-400">
                      Select a conversation from the left to start messaging
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
