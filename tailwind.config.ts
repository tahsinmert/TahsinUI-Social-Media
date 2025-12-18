import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand Colors - Green Palette
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Primary Green
          600: '#16a34a',
          700: '#15803d', // Dark Green
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          primary: '#22C55E',
          dark: '#15803D',
          soft: '#A7F3D0',
        },
        // Neutral Colors
        background: {
          light: '#F9FAFB',
        },
        border: {
          divider: '#E5E7EB',
        },
        text: {
          primary: '#0F172A',
          secondary: '#6B7280',
        },
        // Accent Colors
        accent: {
          yellow: '#FACC15',
          error: '#EF4444',
          link: '#38BDF8',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}
export default config

