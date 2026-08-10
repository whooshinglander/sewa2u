import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Perjanjian Sewa Rumah Malaysia — Panduan Lengkap',
  description: 'Apa itu perjanjian sewa (tenancy agreement) di Malaysia? Panduan lengkap dalam Bahasa Melayu: sewa bulanan, deposit, tempoh, notis, penyelenggaraan, duti setem dan cara dapatkannya.',
  keywords: 'perjanjian sewa, perjanjian sewa rumah, tenancy agreement in malay, perjanjian sewa rumah malaysia, surat perjanjian sewa, duti setem perjanjian sewa, deposit sewa malaysia, tenancy agreement bahasa melayu',
  alternates: { canonical: 'https://sewa2u.com/tenancy-agreement-in-malay' },
  openGraph: {
    title: 'Perjanjian Sewa Rumah Malaysia — Panduan Lengkap',
    description: 'Panduan lengkap perjanjian sewa rumah di Malaysia dalam Bahasa Melayu: sewa bulanan, deposit, tempoh, notis, penyelenggaraan dan duti setem.',
    url: 'https://sewa2u.com/tenancy-agreement-in-malay',
    siteName: 'Sewa2u',
    locale: 'en_MY',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'Apa itu perjanjian sewa?',
    a: "Perjanjian sewa (tenancy agreement) ialah kontrak bertulis antara tuan rumah (landlord) dan penyewa (tenant) yang menetapkan syarat-syarat penyewaan sesebuah rumah atau hartanah. Ia mengikat kedua-dua pihak di bawah Akta Kontrak 1950 (Contracts Act 1950) di Malaysia. Perjanjian ini menyatakan jumlah sewa bulanan, tempoh penyewaan, deposit, notis penamatan dan tanggungjawab setiap pihak. In English: a tenancy agreement is a written contract between landlord and tenant that sets out the terms of renting a property.",
  },
  {
    q: 'Berapa deposit sewa di Malaysia?',
    a: "Deposit sewa standard di Malaysia ialah 2 bulan sewa sebagai deposit keselamatan (security deposit) dan 1 bulan sewa sebagai deposit utiliti (utility deposit) — iaitu 3 bulan sewa secara keseluruhan. Sebagai contoh, jika sewa bulanan RM1,500, deposit keseluruhan ialah RM4,500. Deposit keselamatan dikembalikan pada akhir tempoh penyewaan selepas ditolak sebarang kerosakan melebihi haus dan lusuh biasa (fair wear and tear). In English: the standard is 2 months' security deposit plus 1 month's utility deposit, totalling 3 months' rent.",
  },
  {
    q: 'Apa itu duti setem?',
    a: "Duti setem (stamp duty) ialah cukai yang dikenakan oleh LHDN (Lembaga Hasil Dalam Negeri) ke atas perjanjian sewa. Kadar untuk tempoh 1 tahun atau kurang ialah RM1 bagi setiap RM250 sewa tahunan; untuk tempoh 1–3 tahun ialah 0.4% daripada purata sewa tahunan. Contoh: sewa RM1,000 sebulan untuk 1 tahun = RM12,000 setahun, jadi duti setem ialah RM48. Perjanjian perlu disetem dalam tempoh 30 hari selepas ditandatangani untuk mengelakkan penalti. In English: stamp duty is a tax payable to LHDN on the tenancy agreement.",
  },
  {
    q: 'Apakah klausa penting dalam perjanjian sewa?',
    a: "Klausa penting dalam perjanjian sewa termasuk: sewa bulanan (monthly rent) dan tarikh pembayaran, tempoh penyewaan (tenancy term), deposit keselamatan dan utiliti, notis penamatan (notice period — biasanya 1 hingga 2 bulan), tanggungjawab penyelenggaraan (maintenance) dan pembaikan, serta klausa diplomatik untuk penyewa asing. Setiap klausa melindungi kedua-dua pihak sekiranya berlaku pertikaian. In English: key clauses include monthly rent, term, deposits, notice period, maintenance responsibilities, and the diplomatic clause.",
  },
  {
    q: 'Berapa lama notis untuk menamatkan perjanjian sewa?',
    a: "Notis penamatan biasanya 1 hingga 2 bulan secara bertulis, bergantung pada apa yang ditetapkan dalam perjanjian sewa. Untuk penyewaan bulan ke bulan (month-to-month), notis biasanya satu tempoh sewa. Jika penyewa menamatkan awal tanpa klausa diplomatik, deposit mungkin dilucuthakkan atau penyewa bertanggungjawab ke atas baki sewa. In English: notice is typically 1–2 months in writing, as set out in the agreement.",
  },
  {
    q: 'Siapa yang menanggung duti setem perjanjian sewa?',
    a: "Mengikut amalan standard di Malaysia, duti setem perjanjian sewa biasanya ditanggung oleh penyewa (tenant). Walau bagaimanapun, ini boleh dipersetujui sebaliknya dalam perjanjian. Duti setem perlu dibayar kepada LHDN dalam tempoh 30 hari selepas perjanjian ditandatangani. Perjanjian yang tidak disetem tidak boleh diterima sebagai keterangan di mahkamah Malaysia. In English: stamp duty is usually borne by the tenant, but this can be negotiated in the agreement.",
  },
  {
    q: 'Bagaimana cara mendapatkan perjanjian sewa?',
    a: "Anda boleh mendapatkan perjanjian sewa dengan tiga cara: (1) menggunakan templat rujukan daripada agensi hartanah, (2) menggunakan khidmat peguam, atau (3) menggunakan penjana dalam talian seperti Sewa2u yang menjana perjanjian lengkap dan sah dari segi undang-undang dalam masa 5 minit, boleh pratonton sebelum beli, dan PDF sedia disetem dari RM30. Tiada keperluan undang-undang untuk menggunakan peguam bagi penyewaan kediaman di Malaysia. In English: you can get a tenancy agreement via an agency template, a lawyer, or an online generator like Sewa2u.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Perjanjian Sewa Rumah Malaysia — Panduan Lengkap',
  description: 'Panduan lengkap perjanjian sewa rumah di Malaysia dalam Bahasa Melayu: sewa bulanan, deposit, tempoh, notis, penyelenggaraan dan duti setem.',
  url: 'https://sewa2u.com/tenancy-agreement-in-malay',
  publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' },
  datePublished: '2026-08-10',
  dateModified: '2026-08-10',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sewa2u.com/' },
    { '@type': 'ListItem', position: 2, name: 'Tenancy Agreement Malaysia', item: 'https://sewa2u.com/tenancy-agreement' },
    { '@type': 'ListItem', position: 3, name: 'Perjanjian Sewa dalam Bahasa Melayu' },
  ],
}

export default function TenancyAgreementInMalayPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">

        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Perjanjian Sewa · Bahasa Melayu
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-5 leading-tight">
            Perjanjian Sewa Rumah Malaysia — Panduan Lengkap
          </h1>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-3">
            Panduan lengkap dalam Bahasa Melayu tentang perjanjian sewa (tenancy agreement) di Malaysia. Ketahui apa itu perjanjian sewa, klausa-klausa penting seperti sewa bulanan, deposit, tempoh, notis dan penyelenggaraan, duti setem, serta cara mendapatkannya. English support is provided throughout for bilingual readers.
          </p>
          <p className="text-navy-500 text-sm">
            Untuk panduan penuh dalam Bahasa Inggeris, lihat <Link href="/tenancy-agreement" className="text-brand-700 hover:underline">panduan perjanjian sewa</Link> dan <Link href="/stamp-duty-tenancy-renewal" className="text-brand-700 hover:underline">kalkulator duti setem</Link>.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Apa itu perjanjian sewa?</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Perjanjian sewa (tenancy agreement) ialah kontrak bertulis antara tuan rumah (landlord) dan penyewa (tenant) yang menetapkan syarat-syarat penyewaan sesebuah hartanah. Ia mengikat kedua-dua pihak di bawah <strong className="text-navy-800">Akta Kontrak 1950</strong> (Contracts Act 1950) di Malaysia. Tanpa perjanjian bertulis, kedua-dua pihak berisiko menghadapi pertikaian yang sukar diselesaikan.
            </p>
            <p className="text-navy-600 text-sm leading-relaxed">
              <em>In English:</em> A tenancy agreement is a written contract between landlord and tenant setting out the terms of renting a property, binding both parties under Malaysia's Contracts Act 1950.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Klausa-klausa penting dalam perjanjian sewa</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Sewa bulanan (Monthly rent)</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Jumlah sewa yang perlu dibayar setiap bulan, tarikh pembayaran, dan cara pembayaran (bank transfer, cek, tunai). Sewa biasanya dibayar pada awal bulan. Klausa ini juga menetapkan penalti bagi pembayaran lewat. <em>In English:</em> the monthly rent amount, due date, and payment method.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Deposit (Deposits)</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Deposit standard di Malaysia ialah <strong className="text-navy-800">2 bulan sewa sebagai deposit keselamatan</strong> (security deposit) dan <strong className="text-navy-800">1 bulan sebagai deposit utiliti</strong> (utility deposit). Deposit keselamatan dikembalikan selepas tempoh penyewaan, ditolak kerosakan melebihi haus dan lusuh biasa. <em>In English:</em> the standard is 2 months' security deposit plus 1 month's utility deposit.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Tempoh penyewaan (Tenancy term)</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Tempoh perjanjian, biasanya 1 hingga 2 tahun. Tarikh mula dan tarikh tamat ditetapkan dengan jelas. Selepas tempoh tamat, perjanjian boleh diperbaharui atau bertukar kepada penyewaan bulan ke bulan (month-to-month). <em>In English:</em> the tenancy term, typically 1–2 years, with clear start and end dates.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Notis penamatan (Notice period)</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Tempoh notis yang perlu diberikan oleh mana-mana pihak untuk menamatkan perjanjian, biasanya 1 hingga 2 bulan secara bertulis. Penamatan awal tanpa klausa diplomatik boleh menyebabkan deposit dilucuthakkan. <em>In English:</em> the notice period, typically 1–2 months in writing, required to end the tenancy.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="font-semibold text-navy-800 mb-2">Penyelenggaraan (Maintenance)</p>
              <p className="text-navy-600 text-sm leading-relaxed">
                Tanggungjawab penyelenggaraan dan pembaikan dibahagikan antara tuan rumah dan penyewa. Biasanya tuan rumah menanggung pembaikan besar (struktur, paip, elektrik utama) manakala penyewa menanggung penyelenggaraan kecil dan kerosakan yang disebabkan olehnya. <em>In English:</em> maintenance responsibilities are split between landlord and tenant.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Duti setem (Stamp duty)</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Duti setem ialah cukai yang dikenakan oleh <strong className="text-navy-800">LHDN (Lembaga Hasil Dalam Negeri)</strong> ke atas perjanjian sewa. Kadar duti setem:
            </p>
            <ul className="list-disc list-inside text-navy-600 text-sm leading-relaxed mb-4 space-y-1">
              <li>Tempoh 1 tahun atau kurang: <strong className="text-navy-800">RM1 bagi setiap RM250</strong> sewa tahunan.</li>
              <li>Tempoh 1–3 tahun: <strong className="text-navy-800">0.4%</strong> daripada purata sewa tahunan.</li>
            </ul>
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Contoh: sewa RM1,000 sebulan untuk 1 tahun = RM12,000 setahun. Duti setem = RM12,000 ÷ 250 = <strong className="text-navy-800">RM48</strong>. Perjanjian perlu disetem dalam tempoh 30 hari selepas ditandatangani untuk mengelakkan penalti. Duti setem biasanya ditanggung oleh penyewa.
            </p>
            <p className="text-navy-600 text-sm leading-relaxed">
              Perjanjian yang tidak disetem tidak boleh diterima sebagai keterangan di mahkamah Malaysia. Lihat <Link href="/stamp-duty-tenancy-renewal" className="text-brand-700 hover:underline">kalkulator duti setem</Link> untuk contoh pengiraan penuh. <em>In English:</em> stamp duty is payable to LHDN, usually borne by the tenant, and must be paid within 30 days of signing.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Cara mendapatkan perjanjian sewa</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="text-navy-600 text-sm leading-relaxed mb-4">
              Tiada keperluan undang-undang untuk menggunakan peguam bagi penyewaan kediaman di Malaysia. Anda boleh mendapatkan perjanjian sewa melalui:
            </p>
            <ul className="list-disc list-inside text-navy-600 text-sm leading-relaxed mb-4 space-y-1">
              <li>Templat rujukan daripada agensi hartanah.</li>
              <li>Khidmat peguam (lebih mahal, biasanya RM300–RM800).</li>
              <li>Penjana dalam talian seperti Sewa2u — menjana perjanjian lengkap dan sah dalam masa 5 minit, boleh pratonton sebelum beli, PDF sedia disetem dari RM30.</li>
            </ul>
            <p className="text-navy-600 text-sm leading-relaxed">
              Untuk panduan penuh dalam Bahasa Inggeris, lihat <Link href="/tenancy-agreement" className="text-brand-700 hover:underline">panduan perjanjian sewa Malaysia</Link>. <em>In English:</em> you can get a tenancy agreement via an agency template, a lawyer, or an online generator like Sewa2u.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Jana perjanjian sewa anda sekarang</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto text-sm">
              Perjanjian sewa lengkap dan sah dari segi undang-undang, diisi automatik, sedia disetem dengan LHDN. Pratonton sebelum beli, muat turun PDF dari RM30. Generate a complete, legally structured tenancy agreement — preview before purchase, PDF from RM30.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="inline-block bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Jana Perjanjian — RM30
              </Link>
              <Link href="/stamp-duty-tenancy-renewal" className="inline-block bg-white text-navy-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Kalkulator duti setem
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-14">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Soalan lazim (FAQ)</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 group" open={i === 0}>
                <summary className="font-semibold text-navy-800 cursor-pointer text-sm group-open:mb-2">
                  {f.q}
                </summary>
                <p className="text-navy-500 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
