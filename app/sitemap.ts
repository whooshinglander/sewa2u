import { MetadataRoute } from 'next'
// git-derived lastmod (2026-10-13): uniform build-time timestamps read as fabricated
// freshness -> indexed 0/N across tenancy sites. Key = path, value = last commit date.
const GIT_DATES: Record<string, string> = {
"/": "2026-08-25",
"/about": "2026-09-03",
"/blog": "2026-09-15",
"/common-tenancy-renewal-pitfalls": "2026-07-16",
"/diplomatic-clause-tenancy-renewal": "2026-09-03",
"/faq": "2026-07-16",
"/foreign-tenant-renewal": "2026-09-03",
"/landlord-renewal-vs-find-new-tenant": "2026-09-03",
"/privacy": "2026-07-16",
"/private-property-tenancy-renewal": "2026-07-16",
"/renew": "2026-07-16",
"/renew-tenancy-without-agent": "2026-07-16",
"/rent-increase-tenancy-renewal": "2026-07-16",
"/room-rental-agreement": "2026-08-25",
"/room-rental-renewal": "2026-07-16",
"/security-deposit-tenancy-renewal": "2026-07-16",
"/stamp-duty-tenancy-renewal": "2026-07-16",
"/tenancy-agreement": "2026-08-25",
"/tenancy-agreement-bahasa": "2026-09-15",
"/tenancy-agreement-in-malay": "2026-09-03",
"/tenancy-agreement-pdf": "2026-07-16",
"/tenancy-agreement-template": "2026-08-25",
"/tenancy-renewal": "2026-08-10",
"/tenancy-renewal-checklist": "2026-09-03",
"/tenancy-renewal-letter-template": "2026-07-16",
"/tenancy-renewal-notice-period": "2026-07-16",
"/tenancy-renewal-vs-new-agreement": "2026-07-16",
"/terms": "2026-07-16"
}
function lastmod(path: string): Date {
  return new Date(GIT_DATES[path] ?? "2026-05-01")
}



export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sewa2u.com'
  return [
    { url: base, lastModified: lastmod("/"), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/tenancy-agreement`, lastModified: lastmod("/tenancy-agreement"), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/tenancy-renewal`, lastModified: lastmod("/tenancy-renewal"), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/stamp-duty-tenancy-renewal`, lastModified: lastmod("/stamp-duty-tenancy-renewal"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/tenancy-renewal-vs-new-agreement`, lastModified: lastmod("/tenancy-renewal-vs-new-agreement"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/rent-increase-tenancy-renewal`, lastModified: lastmod("/rent-increase-tenancy-renewal"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/diplomatic-clause-tenancy-renewal`, lastModified: lastmod("/diplomatic-clause-tenancy-renewal"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/security-deposit-tenancy-renewal`, lastModified: lastmod("/security-deposit-tenancy-renewal"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/foreign-tenant-renewal`, lastModified: lastmod("/foreign-tenant-renewal"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/tenancy-renewal-checklist`, lastModified: lastmod("/tenancy-renewal-checklist"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/private-property-tenancy-renewal`, lastModified: lastmod("/private-property-tenancy-renewal"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/renew-tenancy-without-agent`, lastModified: lastmod("/renew-tenancy-without-agent"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/tenancy-renewal-notice-period`, lastModified: lastmod("/tenancy-renewal-notice-period"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/room-rental-renewal`, lastModified: lastmod("/room-rental-renewal"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/tenancy-renewal-letter-template`, lastModified: lastmod("/tenancy-renewal-letter-template"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/common-tenancy-renewal-pitfalls`, lastModified: lastmod("/common-tenancy-renewal-pitfalls"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/landlord-renewal-vs-find-new-tenant`, lastModified: lastmod("/landlord-renewal-vs-find-new-tenant"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/renew`, lastModified: lastmod("/renew"), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/room-rental-agreement`, lastModified: lastmod("/room-rental-agreement"), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/tenancy-agreement-template`, lastModified: lastmod("/tenancy-agreement-template"), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/tenancy-agreement-in-malay`, lastModified: lastmod("/tenancy-agreement-in-malay"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/tenancy-agreement-bahasa`, lastModified: lastmod("/tenancy-agreement-bahasa"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: lastmod("/blog"), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/faq`, lastModified: lastmod("/faq"), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: lastmod("/about"), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: lastmod("/privacy"), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: lastmod("/terms"), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
