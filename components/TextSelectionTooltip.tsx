'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Repeat2 } from 'lucide-react'

interface TextSelectionTooltipProps {
  onQuoteRepost?: (selectedText: string) => void
  onCopy?: (selectedText: string) => void
}

export default function TextSelectionTooltip({ 
  onQuoteRepost, 
  onCopy 
}: TextSelectionTooltipProps) {
  const [selection, setSelection] = useState<{
    text: string
    position: { top: number; left: number }
  } | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      
      if (!selection || selection.rangeCount === 0) {
        setSelection(null)
        return
      }

      const selectedText = selection.toString().trim()
      
      if (!selectedText || selectedText.length === 0) {
        setSelection(null)
        return
      }

      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      
      // Calculate tooltip position (above the selection)
      let tooltipTop = rect.top + window.scrollY - 50
      let tooltipLeft = rect.left + rect.width / 2 + window.scrollX
      
      // Ensure tooltip stays within viewport bounds
      const tooltipWidth = 120 // Approximate tooltip width
      const tooltipHeight = 50
      const padding = 10
      
      // Adjust horizontal position if too close to edges
      if (tooltipLeft - tooltipWidth / 2 < padding) {
        tooltipLeft = tooltipWidth / 2 + padding
      } else if (tooltipLeft + tooltipWidth / 2 > window.innerWidth - padding) {
        tooltipLeft = window.innerWidth - tooltipWidth / 2 - padding
      }
      
      // Adjust vertical position if too close to top
      if (tooltipTop < padding) {
        tooltipTop = rect.bottom + window.scrollY + 10
      }

      setSelection({
        text: selectedText,
        position: {
          top: tooltipTop,
          left: tooltipLeft,
        },
      })
    }

    const handleMouseUp = () => {
      // Small delay to ensure selection is complete
      setTimeout(handleSelection, 10)
    }

    const handleClick = (e: MouseEvent) => {
      // Hide tooltip if clicking outside
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
        }
        setSelection(null)
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const handleCopy = () => {
    if (!selection) return

    navigator.clipboard.writeText(selection.text).then(() => {
      if (onCopy) {
        onCopy(selection.text)
      }
      
      // Clear selection and hide tooltip
      window.getSelection()?.removeAllRanges()
      setSelection(null)
    }).catch((err) => {
      console.error('Failed to copy text:', err)
    })
  }

  const handleQuoteRepost = () => {
    if (!selection) return

    if (onQuoteRepost) {
      onQuoteRepost(selection.text)
    }

    // Clear selection and hide tooltip
    window.getSelection()?.removeAllRanges()
    setSelection(null)
  }

  return (
    <AnimatePresence>
      {selection && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed z-50 pointer-events-auto"
          style={{
            top: `${selection.position.top}px`,
            left: `${selection.position.left}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-2 flex items-center gap-2">
            {/* Quote Repost Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuoteRepost}
              className="p-2 hover:bg-emerald-50 rounded-lg transition-colors duration-200 group"
              title="Quote Repost"
            >
              <Repeat2 className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
            </motion.button>

            {/* Copy Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-2 hover:bg-emerald-50 rounded-lg transition-colors duration-200 group"
              title="Copy"
            >
              <Copy className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

