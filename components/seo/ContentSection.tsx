export default function ContentSection() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 space-y-12">

      {/* What is a tenancy agreement */}
      <div>
        <h2 className="text-xl font-bold text-navy-800 mb-4">
          What is a Malaysia Tenancy Agreement?
        </h2>
        <div className="prose prose-slate prose-sm max-w-none text-navy-600 space-y-3">
          <p>
            A tenancy agreement (TA) is a legally binding contract between a landlord and tenant that sets out the terms of a residential rental in Malaysia. It covers rent, deposit, tenancy period, maintenance responsibilities, and what happens when either party wants to leave early.
          </p>
          <p>
            Under Malaysia law, any tenancy agreement for a period exceeding 9 months must be stamped with the Inland Revenue Authority of Malaysia (LHDN). Stamp duty is calculated on the annual rent and must be paid within 14 days of signing.
          </p>
          <p>
            While verbal agreements are technically valid, a written and stamped tenancy agreement is essential for protecting both landlord and tenant — especially when disputes arise over deposits, repairs, or early termination.
          </p>
        </div>
      </div>

      {/* Residential vs Private */}
      <div>
        <h2 className="text-xl font-bold text-navy-800 mb-4">
          Residential vs Private Property — What's Different?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-brand-50 border border-blue-200 rounded-xl p-5">
            <p className="font-semibold text-brand-800 mb-3">Residential Flat</p>
            <ul className="space-y-2 text-sm text-brand-700">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>Landlord must obtain property approval before subletting</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>Maximum occupancy rules apply (typically 6 persons)</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>Minimum subletting period: 6 months</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>Approval must be renewed — authorities monitor compliance</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>Non-citizen tenants subject to additional restrictions</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="font-semibold text-navy-800 mb-3">Private Property</p>
            <ul className="space-y-2 text-sm text-navy-600">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>No property approval needed — landlord has full discretion</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>No occupancy cap (subject to building rules)</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>Minimum tenancy period varies by property</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>Short-term rentals (Airbnb) still prohibited</li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span>More flexibility on lease terms and custom clauses</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stamp duty */}
      <div>
        <h2 className="text-xl font-bold text-navy-800 mb-4">
          Stamp Duty on Malaysia Tenancy Agreements
        </h2>
        <div className="text-navy-600 text-sm space-y-3">
          <p>
            All tenancy agreements in Malaysia are subject to stamp duty payable to LHDN. The duty must be paid within 14 days of signing if the agreement is signed in Malaysia, or within 30 days if signed overseas.
          </p>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-navy-600 font-semibold">Lease Period</th>
                  <th className="text-left px-4 py-3 text-navy-600 font-semibold">Stamp Duty Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="px-4 py-3 text-navy-700">Up to 1 year</td><td className="px-4 py-3 text-navy-700">RM1 per RM250 of annual rent</td></tr>
                <tr><td className="px-4 py-3 text-navy-700">1 to 3 years</td><td className="px-4 py-3 text-navy-700">0.4% of average annual rent</td></tr>
                <tr><td className="px-4 py-3 text-navy-700">More than 3 years</td><td className="px-4 py-3 text-navy-700">0.4% of average annual rent × 4</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Stamp duty is typically borne by the tenant. An unstamped agreement is not admissible as evidence in court — making it legally unenforceable until stamped.{' '}
            <a href="https://www.hasil.gov.my/en/individual/duties/stamp-duty/lease-or-tenancy-agreement"
              target="_blank" rel="noopener noreferrer"
              className="text-brand-600 underline font-medium">
              Calculate on LHDN →
            </a>
          </p>
        </div>
      </div>

      {/* Cross-link */}
      <div className="bg-slate-800 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white text-sm">Planning to buy a property?</p>
          <p className="text-navy-400 text-xs mt-0.5">Calculate ABSD, BSD, TDSR and mortgage affordability with our property calculator.</p>
        </div>
        <a
          href="https://sgpropertycalc.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-5 py-2.5 bg-white text-navy-800 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors"
        >
          SG Property Calc →
        </a>
      </div>

    </section>
  )
}
