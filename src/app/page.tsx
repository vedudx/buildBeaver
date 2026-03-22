import Link from "next/link";

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

function IsometricBlocks() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-4 top-1/2 h-[220px] w-[220px] -translate-y-1/2 text-red-900/90 opacity-[0.35] sm:right-0 sm:h-[260px] sm:w-[260px] md:opacity-50"
      viewBox="0 0 200 200"
      fill="none"
    >
      <defs>
        <linearGradient id="iso-top" x1="40" y1="20" x2="160" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fecaca" />
          <stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="iso-left" x1="40" y1="100" x2="40" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7f1d1d" />
          <stop offset="1" stopColor="#450a0a" />
        </linearGradient>
        <linearGradient id="iso-right" x1="120" y1="80" x2="180" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#991b1b" />
          <stop offset="1" stopColor="#7f1d1d" />
        </linearGradient>
        <filter id="iso-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <g filter="url(#iso-soft)">
        <path
          d="M100 28 L158 62 L158 118 L100 152 L42 118 L42 62 Z"
          fill="url(#iso-top)"
          opacity="0.95"
        />
        <path d="M42 62 L100 28 L100 90 L42 124 Z" fill="url(#iso-left)" />
        <path d="M158 62 L100 28 L100 90 L158 124 Z" fill="url(#iso-right)" />
      </g>
      <g transform="translate(18, 88) scale(0.72)">
        <path
          d="M100 28 L158 62 L158 118 L100 152 L42 118 L42 62 Z"
          fill="url(#iso-top)"
          opacity="0.85"
        />
        <path d="M42 62 L100 28 L100 90 L42 124 Z" fill="url(#iso-left)" opacity="0.9" />
        <path d="M158 62 L100 28 L100 90 L158 124 Z" fill="url(#iso-right)" opacity="0.9" />
      </g>
    </svg>
  );
}

function HeroRoadmapStack() {
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,440px)] lg:mx-0">
      <div
        className="relative [perspective:1400px] [perspective-origin:50%_40%]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="group relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:[transform:rotateX(4deg)_rotateY(-8deg)_translateY(-4px)] lg:[transform:rotateX(8deg)_rotateY(-14deg)_translateZ(0)]">
          {/* Ground / contact shadow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 left-1/2 h-[45%] w-[118%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.22)_0%,transparent_68%)] blur-md"
          />

          {/* Back planes — depth stack */}
          <div
            aria-hidden
            className="absolute -right-3 top-10 z-0 h-[78%] w-[92%] rounded-2xl border border-white/50 bg-gradient-to-br from-red-100/80 to-red-200/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_20px_40px_-12px_rgba(127,29,29,0.35)] backdrop-blur-[2px]"
            style={{ transform: "translateZ(-48px) translateX(12px) rotateY(-4deg)" }}
          />
          <div
            aria-hidden
            className="absolute -right-1 top-5 z-[1] h-[82%] w-[94%] rounded-2xl border border-slate-200/90 bg-white/70 shadow-[0_18px_36px_-14px_rgba(15,23,42,0.2)]"
            style={{ transform: "translateZ(-24px) translateX(6px) rotateY(-2deg)" }}
          />

          {/* Main glass card */}
          <div className="relative z-10 overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/95 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_28px_56px_-18px_rgba(15,23,42,0.22),0_12px_24px_-12px_rgba(127,29,29,0.12)] ring-1 ring-slate-900/[0.06] backdrop-blur-xl">
            {/* Specular highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-1/4 top-0 h-[55%] w-[70%] rotate-12 bg-gradient-to-br from-white/90 via-white/20 to-transparent opacity-80"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,transparent_42%,transparent_100%)]"
            />
            {/* Edge rim light */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
            />

            <div className="relative p-6">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-800 to-red-950 text-xs font-bold text-white shadow-[0_4px_12px_rgba(127,29,29,0.45)]">
                    B
                  </span>
                  <span className="text-sm font-semibold text-slate-800">Your roadmap</span>
                </div>
                <span className="rounded-full border border-red-200/80 bg-red-50/90 px-2.5 py-0.5 text-xs font-semibold text-red-900 shadow-sm">
                  6 steps
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {STEPS.slice(0, 4).map((s) => (
                  <li
                    key={s.id}
                    className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/90 px-3 py-2.5 shadow-[0_2px_6px_rgba(15,23,42,0.04)] transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-white to-slate-100 text-xs font-bold text-red-800 shadow-[0_2px_4px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-slate-200/80">
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
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-b from-slate-800 to-slate-950 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-4px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:from-slate-700 hover:to-slate-900"
              >
                Begin intake
              </Link>
            </div>
          </div>

          {/* Floating accent orbs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 top-8 h-24 w-24 rounded-full bg-gradient-to-br from-red-400/30 to-red-900/10 blur-2xl animate-home-float"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 bottom-12 h-28 w-28 rounded-full bg-gradient-to-br from-amber-300/25 to-red-800/10 blur-2xl animate-home-float"
            style={{ animationDelay: "1.2s" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#faf6f6] text-slate-900">
      {/* Layered depth background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,transparent_45%),radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(127,29,29,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[min(1100px,100vw)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(circle,rgba(153,27,27,0.18)_0%,transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black,transparent)]"
      />

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
          <IsometricBlocks />
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16">
            <div className="relative z-[1]">
              <p className="inline-flex items-center gap-2 rounded-full border border-red-200/90 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-900 shadow-[0_4px_16px_-4px_rgba(127,29,29,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                B.C. business guide
              </p>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
                Start your business
                <br />
                <span className="bg-gradient-to-r from-red-800 via-red-700 to-red-950 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(127,29,29,0.15)]">
                  from idea to launch.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                A guided path for B.C. founders: structure, registration, CRA, banking,
                permits, and accounting, with official support links built into the flow.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/intake"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-red-800 to-red-950 px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(127,29,29,0.55),inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:from-red-700 hover:to-red-900 hover:shadow-[0_16px_40px_-6px_rgba(127,29,29,0.45)]"
                >
                  Get started — free
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/90 bg-white/90 px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.08)] backdrop-blur-sm transition hover:border-red-200 hover:bg-red-50/60"
                >
                  Preview roadmap
                </Link>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-red-100 text-xs text-red-800 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]">
                    ✓
                  </span>{" "}
                  No signup
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-red-100 text-xs text-red-800 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]">
                    ✓
                  </span>{" "}
                  Local-only data
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-red-100 text-xs text-red-800 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]">
                    ✓
                  </span>{" "}
                  Built for B.C.
                </li>
              </ul>
            </div>

            <HeroRoadmapStack />
          </div>
        </section>

        {/* Steps grid */}
        <section className="relative border-y border-red-950/10 bg-gradient-to-b from-white/95 via-white/85 to-slate-50/40 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(127,29,29,0.06),transparent)]"
          />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Everything in one path
              </h2>
              <p className="mt-3 text-slate-600">
                Tap any step on the roadmap for explanations, links, and form help where it
                matters.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step) => (
                <article
                  key={step.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_16px_32px_-12px_rgba(127,29,29,0.08)] ring-1 ring-slate-900/[0.04] transition duration-300 hover:-translate-y-1 hover:border-red-200/80 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12),0_20px_40px_-16px_rgba(127,29,29,0.1)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-red-500/10 to-transparent blur-2xl transition-opacity group-hover:opacity-100"
                  />
                  <span className="relative text-xs font-bold tabular-nums text-red-800">
                    {step.number}
                  </span>
                  <h3 className="relative mt-2 text-base font-semibold text-slate-900">{step.label}</h3>
                  <p className="relative mt-1 flex-1 text-sm text-slate-600">{step.short}</p>
                  <Link
                    href={`/step/${step.id}`}
                    className="relative mt-4 inline-flex text-sm font-semibold text-red-800 transition group-hover:translate-x-0.5 group-hover:underline"
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
                className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-[0_4px_16px_-6px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(127,29,29,0.12)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <span
                  className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-white to-red-50 text-xl text-red-800 shadow-[0_8px_20px_-6px_rgba(127,29,29,0.25),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-red-200/60 transition group-hover:scale-[1.04] group-hover:shadow-[0_12px_28px_-8px_rgba(127,29,29,0.3)]"
                  aria-hidden
                >
                  {f.icon}
                </span>
                <h3 className="relative mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="relative overflow-hidden border-t border-red-950/25 bg-gradient-to-br from-red-900 via-red-950 to-neutral-950 py-16 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-red-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to map your launch?</h2>
            <p className="mx-auto mt-3 max-w-lg text-red-100/90">
              Answer a few questions — we&apos;ll open your personalized roadmap.
            </p>
            <Link
              href="/intake"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-bold text-red-950 shadow-[0_4px_0_rgba(0,0,0,0.12),0_16px_40px_-8px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-[0_6px_0_rgba(0,0,0,0.1),0_20px_48px_-6px_rgba(0,0,0,0.4)]"
            >
              Start the intake
            </Link>
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
          <p>BuildBeaver · Maple Stack · For informational guidance only</p>
        </footer>
      </main>
    </div>
  );
}
