import Link from "next/link";
import { STEP_CONFIGS } from "@/shared/constants/steps";

export default function RoadmapPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Your Roadmap</h1>
      <p className="mt-2 text-gray-600">Follow each step in order to launch properly.</p>

      <ol className="mt-8 space-y-3">
        {STEP_CONFIGS.map((step, index) => (
          <li key={step.id}>
            <Link
              href={`/step/${step.id}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <span className="font-medium text-gray-900">
                [{index + 1}] {step.title}
              </span>
              <span className="text-sm text-emerald-700">Open</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
