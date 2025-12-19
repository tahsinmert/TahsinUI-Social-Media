import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/settings/', '/drafts/'],
      },
    ],
    sitemap: 'https://tahsinui.com/sitemap.xml',
  }
}
