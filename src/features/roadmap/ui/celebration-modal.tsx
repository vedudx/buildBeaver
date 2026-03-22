"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

type Props = {
  businessName: string;
  onClose: () => void;
};

function fireConfetti() {
  const colors = ["#991b1b", "#16a34a", "#fbbf24", "#3b82f6", "#a855f7", "#f97316"];

  // Central burst
  confetti({
    particleCount: 140,
    spread: 80,
    origin: { y: 0.55 },
    colors,
    ticks: 200,
  });

  // Side cannons
  setTimeout(() => {
    confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, colors });
    confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors });
  }, 250);

  // Final shower
  setTimeout(() => {
    confetti({ particleCount: 50, spread: 100, origin: { y: 0.4 }, colors, scalar: 0.8 });
  }, 600);
}

export function CelebrationModal({ businessName, onClose }: Props) {
  useEffect(() => {
    fireConfetti();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Decorative gradient header */}
        <div className="bg-gradient-to-br from-red-800 via-red-700 to-amber-600 px-8 pb-8 pt-10 text-center">
          {/* Trophy */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-5xl shadow-inner">
            🏆
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Congratulations!</h2>
          <p className="mt-2 text-base font-medium text-white/80">
            {businessName
              ? `${businessName} is officially set up.`
              : "Your business is officially set up."}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            You've worked through every step of the B.C. business registration roadmap. Your
            summary is ready to review, save, or share.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/finish"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              View Your Business Summary
            </Link>
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50"
            >
              Back to Roadmap
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
