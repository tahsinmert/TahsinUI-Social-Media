'use client'

import { motion } from 'framer-motion'

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label?: string
  description?: string
}

export default function Toggle({ enabled, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        {label && (
          <label className="text-sm font-medium text-slate-900 font-sans block mb-1">
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-slate-600 font-medium font-sans">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
          enabled ? 'bg-emerald-600' : 'bg-slate-300'
        }`}
      >
        <motion.span
          animate={{
            x: enabled ? 20 : 4,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg`}
        />
      </button>
    </div>
  )
}

