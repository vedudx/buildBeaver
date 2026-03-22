"use client";

import { useIntake } from "@/entities/intake/model/intake-context";
import { SourceSupportPanel } from "@/features/support/ui/source-support-panel";
import { BC_RESOURCE_HUB } from "@/shared/constants/resources";

const monthlyTasks = [
  "Record sales, expenses, fees and refunds.",
  "Reconcile your business bank account.",
  "Review PST/GST collected versus paid.",
  "Categorize receipts and invoices while they are still current.",
];

const recordTypes = [
  "Sales invoices and receipts",
  "Expense receipts and supplier invoices",
  "Bank and credit card statements",
  "PST/GST filings and remittance confirmations",
  "Payroll records if you hire staff",
  "Contracts, quotes and cancellation/refund records",
];

const helpSignals = [
  "You are registering for PST or GST and are not sure what to charge.",
  "You have hired staff or contractors and need payroll or source deduction guidance.",
  "Your expenses are getting hard to classify or you are mixing personal and business spend.",
  "You want help choosing bookkeeping software or an accountant.",
];

export function AccountingGuidance() {
  const { intakeData } = useIntake();
  const businessType = intakeData.businessType?.trim();

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">Set this up now</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Good bookkeeping makes tax time easier and helps you see whether the business is
          actually profitable.
        </p>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-gray-700">
          <li>Open a separate business bank account if you have not already.</li>
          <li>Pick one bookkeeping tool or spreadsheet and use it consistently.</li>
          <li>Set up a simple chart of accounts for income, expenses and tax.</li>
          <li>Save receipts and invoices as soon as you get them.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">Monthly routine</h2>
        <ul className="mt-4 space-y-3">
          {monthlyTasks.map((task) => (
            <li key={task} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {task}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">Keep these records</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          B.C. PST guidance and CRA record-keeping rules both expect organized source documents.
          Keep records for at least six years unless a specific program requires longer.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {recordTypes.map((item) => (
            <li key={item} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">When to get help</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {businessType === "retail" || businessType === "ecommerce"
            ? "Retail and e-commerce businesses should be especially careful with PST, inventory and returns."
            : "If bookkeeping starts taking too much time, or tax rules are unclear, get help early."}
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          {helpSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>

      <SourceSupportPanel
        title="Official guidance and support"
        description="Use these sources to verify tax and record-keeping requirements."
        links={[
          {
            label: "Small business guide to PST",
            href: "https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst/publications/small-business-guide",
            note: "B.C. guide for PST, books and records, and small business obligations.",
          },
          {
            label: "CRA keeping records",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/keeping-records.html",
            note: "Official CRA overview of how long to keep business records and source documents.",
          },
          BC_RESOURCE_HUB,
        ]}
      />
    </div>
  );
}
