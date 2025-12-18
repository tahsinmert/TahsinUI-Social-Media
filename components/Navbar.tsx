'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { Menu as MenuIcon, X, Home, Compass, MessageCircle, Bell, User, Image } from 'lucide-react'
import { motion, useScroll } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })

    return () => unsubscribe()
  }, [scrollY])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/stories', label: 'Stories', icon: Image },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 pointer-events-none"
      >
        <div className="relative w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ maxWidth: 896 }}
            animate={{
              paddingTop: isScrolled ? '0.75rem' : '1rem',
              paddingBottom: isScrolled ? '0.75rem' : '1rem',
              paddingLeft: isScrolled ? '1.5rem' : '2rem',
              paddingRight: isScrolled ? '1.5rem' : '2rem',
              maxWidth: isScrolled ? 672 : 896,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="rounded-full bg-white backdrop-blur-xl border border-slate-200 shadow-sm w-full pointer-events-auto mx-auto relative"
          >
            {/* Logo görseli - TahsinUI yazısının solunda, hizasında */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full -ml-3 z-50 pointer-events-auto"
            >
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
                  <img src="/favicon.png" alt="TahsinUI logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
                </motion.div>
              </Link>
            </motion.div>

            <div className="flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
              {/* Logo - TahsinUI yazısı navbar içinde */}
              <Link href="/" className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 cursor-pointer">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#15803D] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                    TahsinUI
                  </span>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="relative px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium font-sans text-slate-600 hover:text-emerald-600 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
                    whileHover={{ y: -1 }}
                  >
                    <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'text-emerald-600' : 'text-slate-600'}`} />
                    <span className={`relative z-10 whitespace-nowrap ${isActive ? 'text-emerald-600 font-medium' : ''}`}>
                      {link.label}
                    </span>
                    <motion.span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full"
                      initial={{ opacity: isActive ? 1 : 0 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Profile Button - Desktop */}
          <Link href="/subscribe">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-1.5 px-3 lg:px-4 py-2 bg-emerald-600 text-white rounded-full text-xs lg:text-sm font-medium hover:bg-emerald-700 transition-colors duration-200 font-sans flex-shrink-0"
            >
              <User className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="whitespace-nowrap">Profile</span>
            </motion.button>
          </Link>

          {/* Mobile menu button */}
          <Menu as="div" className="md:hidden relative">
            {({ open }) => (
              <>
                <Menu.Button
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-600 hover:text-emerald-600 p-2"
                >
                  {open ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <MenuIcon className="h-5 w-5" />
                  )}
                </Menu.Button>

                <Transition
                  show={open}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-95 translate-y-2"
                  enterTo="opacity-100 scale-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 scale-100 translate-y-0"
                  leaveTo="opacity-0 scale-95 translate-y-2"
                >
                  <Menu.Items
                    static
                    className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl bg-white backdrop-blur-xl border border-slate-200 shadow-sm focus:outline-none overflow-hidden"
                  >
                    <div className="py-2">
                      {navLinks.map((link) => {
                        const Icon = link.icon
                        return (
                          <Menu.Item key={link.href}>
                            {({ active }) => (
                              <Link
                                href={link.href}
                                className={`${
                                  active ? 'bg-green-50' : ''
                                } flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-emerald-600 transition-colors font-medium font-sans ${
                                  pathname === link.href ? 'text-emerald-600' : ''
                                }`}
                              >
                                <Icon className={`w-4 h-4 ${pathname === link.href ? 'text-emerald-600' : 'text-slate-600'}`} />
                                {link.label}
                              </Link>
                            )}
                          </Menu.Item>
                        )
                      })}
                      <div className="border-t border-slate-200 my-1" />
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/subscribe"
                            className={`${
                              active ? 'bg-green-50' : ''
                            } flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium text-slate-900 transition-colors font-sans`}
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </motion.div>
        </div>
    </motion.nav>
    </>
  )
}
