"use client";

import Link from "next/link";
import { useIntake } from "@/entities/intake/model/intake-context";
import { STEP_CONFIGS } from "@/shared/constants/steps";
import { getStepPriority, getStepSummary } from "@/shared/lib/business-profile";

export function PersonalizedRoadmap() {
  const { intakeData } = useIntake();
  const city = intakeData.city?.trim();

  return (
    <>
      <div className="rounded-xl border border-red-100 bg-red-50 p-5">
        <p className="text-sm font-semibold text-red-900">Personalized for B.C.</p>
        <p className="mt-2 text-sm text-red-950/80">
          {city
            ? `Your roadmap is tuned for ${city} and your selected business type. Focus first on structure, registration and the permits that apply locally.`
            : "Your roadmap is tuned for B.C. Once you add a city, licence guidance becomes more specific."}
        </p>
      </div>

      <ol className="mt-8 space-y-3">
        {STEP_CONFIGS.map((step, index) => (
          <li key={step.id}>
            <Link
              href={`/step/${step.id}`}
              className="block rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:border-red-300 hover:bg-red-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    [{index + 1}] {step.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{getStepSummary(step, intakeData)}</p>
                </div>
                <span className="shrink-0 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
                  {getStepPriority(step, intakeData)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
