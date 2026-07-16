const REVIEWS = [
  {
    name: 'Wei Liang T.',
    role: 'Residential Landlord, Kuala Lumpur',
    rating: 5,
    text: 'Renting out my 4-room residential for the first time. Agent quoted me RM250 just to draft the TA. Used this instead — took about 15 minutes, added aircon servicing and a utility cap, downloaded the PDF. Tenant signed without any issues.',
    date: 'Jan 2026',
  },
  {
    name: 'Priya S.',
    role: 'Expat Tenant, Bangsar',
    rating: 5,
    text: "My landlord\'s original TA had no diplomatic clause. I generated one here, we compared side by side, and ended up using this version instead. The diplomatic clause section alone was worth the RM30.",
    date: 'Feb 2026',
  },
  {
    name: 'Marcus L.',
    role: 'Condo Owner, Mont Kiara',
    rating: 5,
    text: 'Used the renewal feature when my tenant extended for another year. One-page addendum, references the original TA date, clean format. Tenant signed same evening.',
    date: 'Mar 2026',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= count ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <section className="max-w-3xl mx-auto px-4 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy-800">What users say</h2>
        <div className="flex items-center gap-2">
          <Stars count={5} />
          <span className="text-sm font-semibold text-navy-700">{avgRating}</span>
          <span className="text-xs text-navy-400">({REVIEWS.length} reviews)</span>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REVIEWS.map((r, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-navy-800">{r.name}</p>
                <p className="text-xs text-navy-500">{r.role}</p>
              </div>
              <span className="text-xs text-navy-400 flex-shrink-0">{r.date}</span>
            </div>
            <Stars count={r.rating} />
            <p className="text-sm text-navy-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-navy-400 text-center mt-6">
        Reviews reflect real user experiences with Sewa2u.
      </p>
    </section>
  )
}
