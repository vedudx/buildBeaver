"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIntake } from "@/entities/intake/model/intake-context";

export default function IntakePage() {
  const router = useRouter();
  const { intakeData, setIntakeData } = useIntake();
  const [businessType, setBusinessType] = useState(intakeData.businessType || "bakery");
  const [location, setLocation] = useState(intakeData.location || "British Columbia");
  const [businessName, setBusinessName] = useState(intakeData.businessName || "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIntakeData({ businessType, location, businessName });
    router.push("/roadmap");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Intake</h1>
      <p className="mt-2 text-gray-600">
        Tell us about your business so we can generate your roadmap.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Business Type
            </span>
            <select
              value={businessType}
              onChange={(event) => setBusinessType(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-red-200 focus:ring"
            >
              <option value="bakery">Bakery</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Location</span>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-red-200 focus:ring"
            >
              <option value="British Columbia">British Columbia</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Business Name
            </span>
            <input
              type="text"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="Vedant Bakery Inc."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-red-200 focus:ring"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-red-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-900"
        >
          Continue
        </button>
      </form>
    </main>
  );
}
