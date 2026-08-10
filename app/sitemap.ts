import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sewa2u.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/tenancy-agreement`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/tenancy-renewal`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/stamp-duty-tenancy-renewal`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/tenancy-renewal-vs-new-agreement`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/rent-increase-tenancy-renewal`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/diplomatic-clause-tenancy-renewal`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/security-deposit-tenancy-renewal`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/foreign-tenant-renewal`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/tenancy-renewal-checklist`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/private-property-tenancy-renewal`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/renew-tenancy-without-agent`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/tenancy-renewal-notice-period`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/room-rental-renewal`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/tenancy-renewal-letter-template`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/common-tenancy-renewal-pitfalls`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/landlord-renewal-vs-find-new-tenant`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/renew`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/room-rental-agreement`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/tenancy-agreement-template`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/tenancy-agreement-in-malay`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
