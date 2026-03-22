"use client";

import { useIntake } from "@/entities/intake/model/intake-context";

export function LicensesChecklist() {
  const { intakeData } = useIntake();
  const city = intakeData.city?.trim();

  const showCityGuidance = city && city !== "Other";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Checklist</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
        {showCityGuidance ? (
          <li>
            Contact the City of {city} for municipal business license requirements.
          </li>
        ) : (
          <li>Identify permit categories for your location.</li>
        )}
        <li>Check provincial and industry-specific licenses (e.g. FoodSafe for food businesses).</li>
        <li>Prepare supporting documents early.</li>
        <li>Track expiration and renewal dates.</li>
      </ul>
    </div>
  );
}
