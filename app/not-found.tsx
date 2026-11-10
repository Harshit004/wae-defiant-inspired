import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <main className="relative bg-[#0F0F0F] text-white min-h-screen flex flex-col justify-between">
      <Header transparentBg />
      <div className="h-[120px] md:h-[220px]" />
      <section className="px-[24px] md:px-[7.5vw] w-full flex-grow flex items-center justify-center">
        <div className="text-center py-20 max-w-xl mx-auto">
          <span className="text-[#0081C9] font-mono text-sm tracking-wider uppercase mb-3 block">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl md:text-5xl font-inter-tight font-normal mb-4">
            The page you're looking for doesn't exist
          </h1>
          <p className="text-gray-400 font-manrope font-normal text-sm md:text-base mb-8">
            The link you followed may be broken or the page may have been removed or relocated.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white text-black font-inter-tight text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/perspectives"
              className="inline-block px-6 py-3 border border-white/20 text-white font-inter-tight text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Browse Perspectives
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
