'use client'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1
        className="text-4xl font-serif font-bold text-slate-900 mb-2"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-slate-600 font-medium font-sans">{subtitle}</p>
      )}
    </div>
  )
}

