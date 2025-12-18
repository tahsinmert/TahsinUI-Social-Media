'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface PageTransitionProps {
  children: React.ReactNode
}

// Sophisticated page transition animations in editorial style
const transitionVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // Softer easing curve
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(8px)',
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0],
    },
  },
}

// Green-themed loading screen animations
const loadingVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
}

// Green gradient transition effect
const overlayVariants = {
  initial: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1,
    },
  },
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setLoadingProgress(0)

    // Progress bar animation - more realistic progress
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 20 + 5
      if (currentProgress >= 90) {
        currentProgress = 90
        clearInterval(progressInterval)
      }
      setLoadingProgress(currentProgress)
    }, 80)

    // Page loading simulation
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setLoadingProgress(100)
      clearInterval(progressInterval)
      
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    }, 600)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [pathname, children])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50/30"
          >
            <div className="relative w-full max-w-md px-8">
              {/* Green-themed Progress Bar */}
              <div className="mb-8 h-1 bg-green-100/80 rounded-full overflow-hidden backdrop-blur-sm border border-green-200/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/30"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>

              {/* Loading Content */}
              <div className="text-center space-y-6">
                {/* Animated Logo/Text - Green theme */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* Logo görseli */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center"
                  >
                    <motion.img
                      src="/favicon.png"
                      alt="TahsinUI logo"
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl font-serif font-bold text-green-900 tracking-tight"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    TahsinUI
                  </motion.h2>
                </motion.div>

                {/* Loading Text - Green tones */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  <motion.p
                    key={pathname}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-700 font-medium"
                  >
                    Loading page...
                  </motion.p>
                  <motion.div
                    className="flex justify-center gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Green-themed decorative elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-100/60 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-200/40 rounded-full blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-50/30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page transition overlay effect - Green gradient */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`overlay-${pathname}`}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          className="fixed inset-0 z-[9998] pointer-events-none bg-gradient-to-br from-green-500/5 via-green-400/5 to-transparent"
        />
      </AnimatePresence>

      {/* Main page content animation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={transitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

