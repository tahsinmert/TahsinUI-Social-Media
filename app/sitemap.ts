import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tahsinui.com'
  
  const routes = [
    '',
    '/explore',
    '/stories',
    '/notifications',
    '/messages',
    '/bookmarks',
    '/lists',
    '/drafts',
    '/archive',
    '/editions',
    '/subscribe',
    '/contact',
    '/settings',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
