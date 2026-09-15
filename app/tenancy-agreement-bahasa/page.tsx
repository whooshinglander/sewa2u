import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Tenancy Agreement Bahasa Malaysia — Contoh & Maksud Klausa',
  description: 'Contoh agreement penyewaan rumah dalam Bahasa Melayu: terjemahan maksud setiap klausa utama, duties setem LHDN, dan penjanaan PDF dwibahasa EN/BM siap tanda tangan.',
  keywords: 'tenancy agreement bahasa malaysia, contoh agreement penyewaan rumah, agreement sewa rumah melayu, tenancy agreement bm, surat perjanjian sewaan rumah',
  alternates: { canonical: 'https://sewa2u.com/tenancy-agreement-bahasa' },
  openGraph: {
    title: 'Tenancy Agreement Bahasa Malaysia — Contoh & Maksud Klausa',
    description: 'Bilingual sample with plain-Malay explanations of every key clause, plus LHDN stamp duty steps.',
    url: 'https://sewa2u.com/tenancy-agreement-bahasa',
    siteName: 'Sewa2u', locale: 'ms_MY', type: 'article',
  },
}

const FAQS = [
  { q: 'Adakah agreement penyewaan perlu dalam Bahasa Melayu?', a: 'Tidak. Di Malaysia, contract of tenancy sah di sisi Akta Kontrak 1950 dalam bahasa apa pun yang difahami kedua-dua pihak.majoriti agreement sewa rumah di Malaysia menggunakan Bahasa Inggeris. Namun bagi pihak yang lebih selesa dengan Bahasa Melayu, agreement dwibahasa (EN + BM) menghapuskan salah faham — dan jika berlaku pertikaian, tiadanya alasan "saya tidak faham klausa ini".' },
  { q: 'Apakah maksud "duties setem" dan berapa kosnya?', a: 'Setem (stamp duty) ialah cukai dokumen yang dibayar kepada LHDN melalui e-Setem. Kiraan: 40% pertama jumlah sewa tahunan dibebaskan cukai sehingga RM2,400 setahun; selebihnya dicukai pada kadar per RM250 sewa tahunan mengikut tempoh pajakan (RM1–RM7 semasa kadar berperingkat di bawah Akta Kewangan 2024). Agreement perlu distem dalam masa 30 hari daripada tarikh ditandatangani. Kadar semasa boleh disemak dalam kalkulator e-Setem LHDN sebelum pembayarannya.' },
  { q: 'Klausa apa yang paling kerap salah faham dalam agreement sewa?', a: 'Tiga: (1) Klausa pembaikan — siapa tanggung rosak kecil vs besar; piawai Malaysia ialah penyewa tanggung pembaikan kecil (biasa had RM100–RM500 setahun) dan tuan rumah tanggung struktur serta sistem (paip, bumbung, aircond kerana usia). (2) Klausa penamatan awal / duti setem — keluar sebelum tamat bukan sekadar "pulang kunci". (3) Deposit — dua bulan standard (satu deposit + satu bulan awal), dan ia bukan untuk "cuci rumah"; ia untuk tunggakan sewaan sebenar.' },
  { q: 'Perlukah agreement sewa didaftarkan?', a: 'Pajakan bawah tiga tahun tidak perlu didaftarkan di Pejabat Tanah untuk sah antara penyewa dan tuan rumah; ia hanya sah terhadap pihak ketiga sekiranya pajakan melebihi tiga tahun (didaftarkan mengikut Kanun Tanah Negara). Untuk kebanyakan sewa rumah 1–2 tahun, agreement bertandatangan dan distem sudah memadai.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Tenancy Agreement Bahasa Malaysia — Contoh & Maksud Klausa', url: 'https://sewa2u.com/tenancy-agreement-bahasa', publisher: { '@type': 'Organization', name: 'Sewa2u', url: 'https://sewa2u.com' }, datePublished: '2026-09-14', dateModified: '2026-09-14' }
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sewa2u.com/' }, { '@type': 'ListItem', position: 2, name: 'Panduan', item: 'https://sewa2u.com/blog' }, { '@type': 'ListItem', position: 3, name: 'Tenancy Agreement Bahasa Malaysia' } ] }

const CLAUSES = [
  { bm: 'Tempoh Sewaan', en: 'Term', m: 'Tarikh mula dan tamat. Sebut dengan jelas sama ada boleh disambung (renewal) dan berapa notis diperlukan untuk sambung atau berhenti — biasanya 2 bulan bertulis.' },
  { bm: 'Kadar Sewa & Cara Pembayaran', en: 'Rent & payment', m: 'Jumlah bulanan, tarikh jatuh (biasanya hari ke-5), kaedah (perpindahan bank/FPX), dan lewat berapa hari kena faedah lewat. Jangan biarkan ruang kosongan — ini punca pertikaian nombor satu.' },
  { bm: 'Wang Jaminan', en: 'Security deposit', m: 'Dua bulan lazim (1 jaminan + 1 bulan awalan). Nyatakan syarat pemulangan: dalam berapa hari selepas pemeriksaan, dan apa yang boleh dipotong. Deposit bukan untuk "kondisi rumah kembali seperti baharu" — susut nilai normal tidak boleh dipotong.' },
  { bm: 'Penggunaan Properti', en: 'Use of premises', m: 'Kediaman sahaja, berapa penghuni, dan sama ada aktiviti komersial (Airbnb/office) dibenar. Tanpa klausa ini, penyewaan pendek atas nama penyewa sukar dihentikan selepas ditandatangan.' },
  { bm: 'Penyelenggaraan & Pembaikan', en: 'Maintenance', m: 'Pemisahan standard: penyewa tanggung pembaikan kecil (nyatakan had, cth. ≤RM150 satu item) dan akibat kecuaian; tuan rumah tanggung struktur, bumbung, paip utama, dan kerosakan aircond kerana usia. Sertakan senarai inventori dengan condition — gambar tarikh.' },
  { bm: 'Cukai & Cukai Kecil', en: 'Taxes & rates', m: 'Cukai pintu/tanah (assessment tax) adalah tanggungjawab tuan rumah; air/eletrik/strata dan internet adalah penyewa. Sesetengah agreement memindahkan maintenance fee strata kepada penyewa — perlu ditulis jika itu perjanjian.' },
  { bm: 'Penamatan Awal', en: 'Early termination', m: 'Sama ada ada pilihan keluar selepas bulan ke-X dengan notis dan penalti (lazim 1 bulan sewa). Tiada klausa ini = penyewa terikat penuh keseluruhan tempoh; tuan rumah pula tak boleh minta keluar awal tanpa alasan kontrak.' },
]

export default function Page() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <div className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">Agreement &amp; terjemahan</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">Tenancy Agreement dalam Bahasa Melayu: Contoh + Maksud Setiap Klausa</h1>
          <p className="text-navy-500 text-base sm:text-lg max-w-2xl mx-auto mb-3">
            Agreement penyewaan rumah dwibahasa (EN/BM) mengelakkan alasan &ldquo;saya tak faham&rdquo; apabila timbul pertikaian. Ini maksud sebenar setiap klausa penting — dan cara hasilkan versi siap tanda tangan dalam 5 minit.
          </p>
          <Link href="/tenancy-agreement" className="inline-block bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700">Hasilkan agreement dwibahasa — RM30</Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-4">Ringkasan</h2>
            <ul className="space-y-2 text-navy-600 text-sm">
              <li>✓ Agreement dalam Bahasa Inggeris <strong>sah</strong> di Malaysia — tetapi versi BM mengelangkan salah faham, bukan sekadar terjemahan.</li>
              <li>✓ Akta Kontrak 1950: kedua-dua pihak faham = kontrak kukuh. Agreement bercampur-campur tanpa kefahaman = ruang bantahan.</li>
              <li>✓ <strong>Setem dalam 30 hari</strong> di LHDN e-Setem: RM2,400 pertama sewa tahunan bebas, selebihnya RM1–RM7 setiap RM250 ikut tempoh.</li>
              <li>✓ Deposit standard 2 bulan; pemulangan dalam 14–30 hari selepas pemeriksaan bersama.</li>
              <li>✓ Sewa2u boleh hasilkan PDF <strong>dwibahasa EN/BM</strong> dengan terjemahan penuh setiap klausa.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-10 space-y-10">
          <div>
            <h2 className="text-xl font-bold text-navy-800 mb-3">Klausa utama dan maksud sebenar</h2>
            <div className="space-y-3">
              {CLAUSES.map(c => (
                <div key={c.bm} className="bg-white rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-navy-800 text-sm mb-1">{c.bm} <span className="text-navy-400 font-normal">({c.en})</span></p>
                  <p className="text-navy-600 text-sm">{c.m}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-800 mb-3">Format dwibahasa: dua lajur, satu dokumen</h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              Agreement dwibahasa yang baik meletakkan BM dan EN bersebelahan klausa demi klausa, dengan satu klausa pendahulu: &ldquo;Versi Bahasa Melayu dan Bahasa Inggeris adalah setara; jika terdapat percanggahan, versi ___ yang mengikut.&rdquo; Pilih mana yang menjadi rujukan. Tanpa aturan ini, dua versi yang sedikit berbeza boleh dibaca sebagai dua kontrak berbeza. Generator kami menghasilkan susunan dua lajur ini secara automatik bersama penjajaran setiap klausa.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-800 mb-3">Soalan lazim</h2>
            <div className="space-y-4">
              {FAQS.map(f => (
                <div key={f.q} className="bg-white rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-navy-800 text-sm mb-1">{f.q}</p>
                  <p className="text-navy-600 text-sm">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-50 rounded-2xl p-6 text-center">
            <p className="text-navy-800 font-semibold mb-1">Siap dalam 5 minit — EN/BM, berjadual duties setem.</p>
            <p className="text-navy-600 text-sm mb-4">Isi butiran, lihat pratonton percuma, muat turun PDF RM30. Terjemahan BM penuh setiap klausa.</p>
            <Link href="/tenancy-agreement" className="inline-block bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700">Hasilkan agreement saya</Link>
          </div>

          <div className="text-sm text-navy-500">
            Berkaitan: <Link className="text-brand-600 underline" href="/tenancy-agreement-in-malay">Versi BM penuh (contoh)</Link> · <Link className="text-brand-600 underline" href="/stamp-duty-tenancy-renewal">Duties setem LHDN</Link> · <Link className="text-brand-600 underline" href="/security-deposit-tenancy-renewal">Wang jaminan</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
