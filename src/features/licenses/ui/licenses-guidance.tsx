"use client";

import { useIntake } from "@/entities/intake/model/intake-context";
import { BC_ADVISOR_CONTACT } from "@/shared/constants/resources";
import {
  getLicenseResourceLinks,
  getLikelyRequirements,
} from "@/shared/lib/business-profile";

export function LicensesGuidance() {
  const { intakeData } = useIntake();
  const city = intakeData.city?.trim();
  const requirements = getLikelyRequirements(intakeData);
  const resourceLinks = getLicenseResourceLinks(intakeData);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Requirements to verify</h3>
        <p className="mt-2 text-sm text-gray-600">
          {city
            ? `These are the first items to verify for your business in ${city}.`
            : "These are the first items to verify based on your business type."}
        </p>
        <ul className="mt-4 space-y-3">
          {requirements.map((item) => (
            <li key={item.title} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Next actions</h3>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>Start with your municipal licence page and confirm the exact licence type for your activity.</li>
          <li>Confirm local municipal rules before signing a lease, renovating or opening.</li>
          <li>Use BizPaL for provincial or federal permits that may apply beyond the city licence.</li>
          <li>Use a provincial advisor if the permit path is unclear or the business is regulated.</li>
        </ol>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Where to apply</h3>
        <div className="mt-4 space-y-3">
          {resourceLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg border border-gray-200 px-4 py-3 transition hover:border-red-300 hover:bg-red-50"
            >
              <p className="text-sm font-semibold text-gray-900">{link.label}</p>
              <p className="mt-1 text-sm text-gray-600">{link.note}</p>
            </a>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-sm font-semibold text-gray-900">{BC_ADVISOR_CONTACT.title}</p>
          <p className="mt-1 text-sm text-gray-600">{BC_ADVISOR_CONTACT.note}</p>
          <p className="mt-2 text-sm text-gray-700">Phone: {BC_ADVISOR_CONTACT.phone}</p>
          <p className="text-sm text-gray-700">Email: {BC_ADVISOR_CONTACT.email}</p>
        </div>
      </section>
    </div>
  );
}
