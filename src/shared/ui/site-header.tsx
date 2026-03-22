import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="relative z-50 border-b border-red-950/[0.08] bg-white/75 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="BuildBeaver logo"
            width={36}
            height={36}
            className="rounded-xl shadow-[0_4px_14px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5"
            priority
          />
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-brand-900">BuildBeaver</span>
            <span className="text-[11px] font-medium text-slate-500">by Maple Stack</span>
          </div>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            href="/roadmap"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-red-900 sm:inline"
          >
            Roadmap
          </Link>
          <Link
            href="/intake"
            className="rounded-full bg-gradient-to-b from-red-800 to-red-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(127,29,29,0.55),inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:from-red-700 hover:to-red-900"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
