import Link from "next/link";
import { PersonalizedRoadmap } from "@/features/roadmap/ui/personalized-roadmap";

export default function RoadmapPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Your Roadmap</h1>
      <p className="mt-2 text-gray-600">Follow each step in order and use the official BC support links when you need confirmation.</p>

      <PersonalizedRoadmap />

      <Link
        href="/support"
        className="mt-8 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition hover:border-red-300 hover:bg-red-50"
      >
        <span className="font-medium text-gray-900">Official BC Support</span>
        <span className="text-red-800">Open</span>
      </Link>
    </main>
  );
}
