import Link from "next/link";
import Image from "next/image";

const STEPS = [
  {
    id: "structure",
    number: "01",
    label: "Choose Business Structure",
    short: "Pick the right legal setup",
  },
  {
    id: "register_business",
    number: "02",
    label: "Register Business",
    short: "Name & provincial registration",
  },
  {
    id: "business_number",
    number: "03",
    label: "Get Business Number (CRA)",
    short: "Tax accounts with CRA",
  },
  {
    id: "bank_account",
    number: "04",
    label: "Open Business Bank Account",
    short: "Separate business finances",
  },
  {
    id: "licenses",
    number: "05",
    label: "Licenses & Permits",
    short: "City & industry compliance",
  },
  {
    id: "accounting",
    number: "06",
    label: "Basic Accounting Setup",
    short: "Bookkeeping that scales",
  },
];

const FEATURES = [
  {
    title: "Step-by-step roadmap",
    body: "Six clear milestones from structure to accounting — nothing skipped.",
    icon: "◆",
  },
  {
    title: "Form assistant",
    body: "Draft answers for registration and CRA steps, then copy formatted output.",
    icon: "◇",
  },
  {
    title: "Privacy-first",
    body: "No account required. Your answers stay in this browser session only.",
    icon: "○",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#faf6f6] text-slate-900">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,transparent_40%),radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(127,29,29,0.14),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(circle,rgba(153,27,27,0.2)_0%,transparent_70%)] blur-2xl"
      />

      {/* Header */}
      <header className="relative z-20 border-b border-red-950/10 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="BuildBeaver logo"
              width={36}
              height={36}
              className="rounded-xl"
              priority
            />
            <div className="leading-tight">
              <span className="block text-sm font-bold tracking-tight text-emerald-900">
                BuildBeaver
              </span>
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
              className="rounded-full bg-red-800 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-900/30 transition hover:bg-red-900"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-red-900 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-red-700" />
                Canada business guide
              </p>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
                Start your business
                <br />
                <span className="bg-gradient-to-r from-red-800 via-red-900 to-red-950 bg-clip-text text-transparent">
                  from idea to launch.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                A guided path for Canadian founders: structure, registration, CRA, banking,
                permits, and accounting — with a checklist you can actually follow.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/intake"
                  className="inline-flex items-center justify-center rounded-full bg-red-800 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/25 transition hover:bg-red-900 hover:shadow-red-950/35"
                >
                  Get started — free
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50/50"
                >
                  Preview roadmap
                </Link>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <span className="text-red-700">✓</span> No signup
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-700">✓</span> Local-only data
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-700">✓</span> Built for Canada
                </li>
              </ul>
            </div>

            {/* Preview card */}
            <div className="relative lg:justify-self-end">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-red-500/15 via-red-900/10 to-transparent blur-xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm font-semibold text-slate-800">Your roadmap</span>
                  <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-900">
                    6 steps
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {STEPS.slice(0, 4).map((s) => (
                    <li
                      key={s.id}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-red-800 shadow-sm">
                        {s.number}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{s.label}</p>
                        <p className="text-xs text-slate-500">{s.short}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center text-xs text-slate-400">+ 2 more steps inside the app</p>
                <Link
                  href="/intake"
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Begin intake
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Steps grid */}
        <section className="border-y border-red-950/10 bg-white/80 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Everything in one path
              </h2>
              <p className="mt-3 text-slate-600">
                Tap any step on the roadmap for explanations, links, and form help where it
                matters.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step) => (
                <article
                  key={step.id}
                  className="group flex flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-sm transition hover:border-red-200 hover:shadow-md hover:shadow-red-950/10"
                >
                  <span className="text-xs font-bold tabular-nums text-red-800">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{step.label}</h3>
                  <p className="mt-1 flex-1 text-sm text-slate-600">{step.short}</p>
                  <Link
                    href={`/step/${step.id}`}
                    className="mt-4 inline-flex text-sm font-semibold text-red-800 group-hover:underline"
                  >
                    Learn more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Why use BuildBeaver?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Less googling, fewer missed steps — more confidence as you launch.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <span
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-800"
                  aria-hidden
                >
                  {f.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="border-t border-red-950/20 bg-gradient-to-r from-red-900 via-red-950 to-neutral-950 py-14 text-white">
          <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to map your launch?</h2>
            <p className="mx-auto mt-3 max-w-lg text-red-100/90">
              Answer a few questions — we&apos;ll open your personalized roadmap.
            </p>
            <Link
              href="/intake"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-bold text-red-950 shadow-lg transition hover:bg-red-50"
            >
              Start the intake
            </Link>
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
          <p>BuildBeaver · Maple Stack · For informational guidance only</p>
        </footer>
      </main>
    </div>
  );
}
