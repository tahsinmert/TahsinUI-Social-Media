'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SocialLayout from '@/components/SocialLayout'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import PageHeader from '@/components/PageHeader'
import Toggle from '@/components/Toggle'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowMessages, setAllowMessages] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const [displayName, setDisplayName] = useState('Tahsin Mert')
  const [username, setUsername] = useState('tahsinmert')
  const [email, setEmail] = useState('tahsin@example.com')
  const [bio, setBio] = useState('Designer, developer, and storyteller.')

  return (
    <main className="min-h-screen">
      <SocialLayout>
        <LeftSidebar />
        <div className="lg:col-span-6">
          <div className="space-y-8">
            <PageHeader
              title="Settings"
              subtitle="Manage your account and preferences"
            />

            {/* Account Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <h2
                className="text-2xl font-serif font-bold text-slate-900 mb-6"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Account
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-sans">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-emerald-600 outline-none text-slate-900 font-sans transition-colors bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-sans">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-emerald-600 outline-none text-slate-900 font-sans transition-colors bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-sans">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-emerald-600 outline-none text-slate-900 font-sans transition-colors bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-sans">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-emerald-600 outline-none text-slate-900 font-sans resize-none transition-colors bg-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Privacy Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <h2
                className="text-2xl font-serif font-bold text-slate-900 mb-6"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Privacy
              </h2>

              <div className="space-y-1">
                <Toggle
                  enabled={privateAccount}
                  onChange={setPrivateAccount}
                  label="Private Account"
                  description="Only approved followers can see your posts"
                />
                <div className="border-t border-slate-200" />
                <Toggle
                  enabled={allowMessages}
                  onChange={setAllowMessages}
                  label="Allow Direct Messages"
                  description="Let others send you direct messages"
                />
              </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <h2
                className="text-2xl font-serif font-bold text-slate-900 mb-6"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Notifications
              </h2>

              <div className="space-y-1">
                <Toggle
                  enabled={emailNotifications}
                  onChange={setEmailNotifications}
                  label="Email Notifications"
                  description="Receive notifications via email"
                />
                <div className="border-t border-slate-200" />
                <Toggle
                  enabled={pushNotifications}
                  onChange={setPushNotifications}
                  label="Push Notifications"
                  description="Receive push notifications on your device"
                />
              </div>
            </section>

            {/* Appearance Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <h2
                className="text-2xl font-serif font-bold text-slate-900 mb-6"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Appearance
              </h2>

              <div className="space-y-1">
                <Toggle
                  enabled={darkMode}
                  onChange={setDarkMode}
                  label="Dark Mode"
                  description="Switch to dark theme"
                />
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors font-sans"
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </div>
        <RightSidebar />
      </SocialLayout>
    </main>
  )
}

