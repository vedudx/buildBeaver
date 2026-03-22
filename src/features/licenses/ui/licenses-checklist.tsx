"use client";

import { useIntake } from "@/entities/intake/model/intake-context";
import { getLikelyRequirements } from "@/shared/lib/business-profile";

export function LicensesChecklist() {
  const { intakeData } = useIntake();
  const city = intakeData.city?.trim();
  const requirements = getLikelyRequirements(intakeData);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Quick check</h3>
      <p className="mt-2 text-sm text-gray-600">
        {city && city !== "Other"
          ? `Your selected city is ${city}. These are the first checks to make.`
          : "These are the first checks to make before you rely on a full permit search."}
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
        {requirements.map((item) => (
          <li key={item.title}>{item.detail}</li>
        ))}
        <li>Prepare supporting documents early.</li>
        <li>Track expiration and renewal dates once approvals are confirmed.</li>
      </ul>
    </div>
  );
}
