import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/renew', '/faq'],
        disallow: ['/preview', '/renew/preview', '/checkout', '/success', '/download', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Bingbot'],
        allow: ['/'],
        disallow: ['/preview', '/renew/preview', '/checkout', '/success', '/download', '/api/'],
      },
    ],
    sitemap: 'https://sewa2u.com/sitemap.xml',
  }
}
