"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIntake } from "@/entities/intake/model/intake-context";
import {
  BUSINESS_TYPES,
  BC_CITIES,
  LOCATIONS,
} from "@/shared/constants/intake-options";

export default function IntakePage() {
  const router = useRouter();
  const { intakeData, setIntakeData } = useIntake();
  const [businessType, setBusinessType] = useState(
    intakeData.businessType || BUSINESS_TYPES[0].value,
  );
  const [location, setLocation] = useState(
    intakeData.location || LOCATIONS[0].value,
  );
  const [city, setCity] = useState(intakeData.city || "");
  const [businessName, setBusinessName] = useState(intakeData.businessName || "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIntakeData({ businessType, location, city, businessName });
    router.push("/roadmap");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-12 md:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Tell us about your business</h1>
      <p className="mt-2 text-gray-600">
        A few quick questions so we can tailor your roadmap.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              What kind of business are you starting?
            </span>
            <select
              value={businessType}
              onChange={(event) => setBusinessType(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-red-200 focus:ring"
            >
              {BUSINESS_TYPES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Province
            </span>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-red-200 focus:ring"
            >
              {LOCATIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              City
            </span>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-red-200 focus:ring"
            >
              <option value="">Select your city</option>
              {BC_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Required for municipal licenses and permits.
            </p>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Business name <span className="text-gray-500">(optional)</span>
            </span>
            <input
              type="text"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="e.g. Acme Consulting Ltd."
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
