"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
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
  const [cityError, setCityError] = useState("");
  const [isPending, startTransition] = useTransition();
  const canContinue = Boolean(city.trim());

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!city.trim()) {
      setCityError("Select a city to continue.");
      return;
    }

    setCityError("");
    setIntakeData({ businessType, location, city, businessName });
    startTransition(() => {
      router.push("/roadmap");
    });
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
              onChange={(event) => {
                setCity(event.target.value);
                if (event.target.value.trim()) {
                  setCityError("");
                }
              }}
              aria-invalid={cityError ? "true" : "false"}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring ${
                cityError
                  ? "border-red-400 ring-red-200 focus:ring"
                  : "border-gray-300 ring-red-200 focus:ring"
              }`}
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
            {cityError ? <p className="mt-1 text-xs font-medium text-red-700">{cityError}</p> : null}
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
          disabled={!canContinue || isPending}
          className="mt-6 rounded-md bg-red-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-900 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          {isPending ? "Continuing..." : "Continue"}
        </button>
      </form>
    </main>
  );
}
