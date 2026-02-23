export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
        <span className="text-2xl">📄</span>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">
            SG Tenancy Agreement Generator
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Singapore residential rental contracts — HDB &amp; private property
          </p>
        </div>
      </div>
    </header>
  )
}
