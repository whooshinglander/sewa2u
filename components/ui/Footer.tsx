export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-slate-400">
          Not legal advice. For reference only. Consult a lawyer for complex tenancy matters.
        </p>
        <p className="text-xs text-slate-300 mt-1">
          © {new Date().getFullYear()} SG Tenancy · Built for Singapore landlords and tenants
        </p>
      </div>
    </footer>
  )
}
