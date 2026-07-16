import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-4xl font-bold text-navy-900 mb-2">404</h1>
        <p className="text-xl text-navy-600 mb-6">
          This page wasn&apos;t found — no clause for that.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary inline-block text-center"
          >
            Generate Agreement
          </Link>
          <Link
            href="/faq"
            className="btn-secondary inline-block text-center"
          >
            View FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
