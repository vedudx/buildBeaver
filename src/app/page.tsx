import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center px-6 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
        BuildCanada
      </p>
      <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
        Start your business from idea to launch
      </h1>
      <p className="mt-4 text-base text-gray-600 md:text-lg">
        BuildBeaver helps you move through each step with clear guidance.
      </p>
      <Link
        href="/intake"
        className="mt-8 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Get Started
      </Link>
    </main>
  );
}
