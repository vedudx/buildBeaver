"use client";

import Link from "next/link";
import { useIntake } from "@/entities/intake/model/intake-context";
import { useFormData } from "@/entities/form/model/form-context";
import { useProgress } from "@/entities/progress/model/progress-context";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { STEP_CONFIGS } from "@/shared/constants/steps";
import { BUSINESS_TYPES } from "@/shared/constants/intake-options";

function getBusinessTypeLabel(value: string) {
  return BUSINESS_TYPES.find((bt) => bt.value === value)?.label ?? value;
}

type ProfileRowProps = {
  label: string;
  value: string | undefined | null;
  placeholder?: string;
};

function ProfileRow({ label, value, placeholder = "—" }: ProfileRowProps) {
  return (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center sm:gap-4">
      <dt className="w-44 shrink-0 text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm font-semibold text-gray-900">{value?.trim() || placeholder}</dd>
    </div>
  );
}

export default function FinishPage() {
  const { intakeData } = useIntake();
  const { formData } = useFormData();
  const { isComplete, completedSteps } = useProgress();

  const totalSteps = STEP_CONFIGS.length;
  const completedCount = completedSteps.size;
  const allDone = completedCount === totalSteps;

  const displayName =
    formData.business_name?.trim() || intakeData.businessName?.trim() || "Your Business";

  const ownershipLabel =
    formData.ownership_type === "corporation" ? "Corporation" : "Sole Proprietorship";

  const gstLabel = formData.gst_threshold === "yes" ? "Yes — registered for GST" : "Not yet registered";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-12 md:px-8">
      <Breadcrumb
        crumbs={[
          { label: "Intake", href: "/intake" },
          { label: "Roadmap", href: "/roadmap" },
          { label: "Finish" },
        ]}
      />
      {/* Hero */}
      {allDone ? (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-red-800 via-red-700 to-amber-600 px-8 pb-8 pt-10 text-center shadow-lg">
          <div className="mx-auto mb-4 text-5xl">🏆</div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Congratulations{intakeData.businessName ? `, ${intakeData.businessName}` : ""}!
          </h1>
          <p className="mt-3 text-base text-white/80">
            You&apos;ve completed all {totalSteps} steps to get{" "}
            <span className="font-semibold text-white">{displayName}</span>{" "}up and running in B.C.
            Here&apos;s a full summary of everything you&apos;ve set up.
          </p>
          <Link
            href="/roadmap"
            className="mt-6 inline-block rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 transition hover:bg-white/20"
          >
            ← Back to roadmap
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <svg className="h-8 w-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your Business Summary</h1>
          <p className="mt-2 text-gray-500">
            {completedCount} of {totalSteps} steps completed.{" "}
            <Link href="/roadmap" className="font-medium text-red-800 hover:underline">
              Return to roadmap →
            </Link>
          </p>
        </div>
      )}

      {/* Progress badge — only shown when not all done */}
      {!allDone && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-yellow-200 bg-yellow-50 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-yellow-800">In progress</p>
            <p className="mt-0.5 text-xs text-yellow-700">
              {completedCount} of {totalSteps} roadmap steps done
            </p>
          </div>
          <Link
            href="/roadmap"
            className="rounded-md border border-yellow-300 bg-white px-3 py-1.5 text-xs font-medium text-yellow-800 transition hover:bg-yellow-100"
          >
            Continue roadmap
          </Link>
        </div>
      )}

      {/* Business profile */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Business Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          Information collected across your intake form and step-by-step setup.
        </p>
        <dl className="mt-4 divide-y divide-gray-100">
          <ProfileRow label="Business name" value={displayName} />
          <ProfileRow
            label="Business type"
            value={getBusinessTypeLabel(intakeData.businessType)}
          />
          <ProfileRow label="Province" value={intakeData.location || "British Columbia"} />
          <ProfileRow label="City" value={intakeData.city} placeholder="Not specified" />
          <ProfileRow label="Legal structure" value={ownershipLabel} />
          <ProfileRow label="Business address" value={formData.address} placeholder="Not entered" />
          <ProfileRow label="Start date" value={formData.start_date} placeholder="Not entered" />
          <ProfileRow label="GST registration" value={gstLabel} />
        </dl>
      </section>

      {/* Step completion summary */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Steps Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your progress through the business registration roadmap.
        </p>
        <ul className="mt-4 space-y-2">
          {STEP_CONFIGS.map((step, index) => {
            const done = isComplete(step.id);
            return (
              <li key={step.id} className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {done ? (
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <span
                    className={`text-sm ${done ? "font-medium text-gray-900" : "text-gray-400"}`}
                  >
                    {step.title}
                  </span>
                  {done ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      Complete
                    </span>
                  ) : (
                    <Link
                      href={`/step/${step.id}`}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 hover:bg-gray-200"
                    >
                      Go to step
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* What's next */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">What's Next</h2>
        <ul className="mt-3 space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-red-800">•</span>
            <span>
              Keep your registration number, CRA business number, and any licence approvals filed
              together in one place.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-red-800">•</span>
            <span>
              Set a reminder to review your GST obligations once your annual revenue approaches
              $30,000.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-red-800">•</span>
            <span>
              Check licence renewal dates (many municipal licences renew annually) so you never
              lapse.
            </span>
          </li>
        </ul>
      </section>

      {/* Official support link */}
      <a
        href="https://smallbusinessbc.ca"
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:border-red-300 hover:bg-red-50"
      >
        <div>
          <p className="text-sm font-semibold text-gray-900">Small Business BC</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Free advisory sessions, workshops, and ongoing support for B.C. businesses.
          </p>
        </div>
        <span className="ml-4 shrink-0 text-sm font-medium text-red-800">Open →</span>
      </a>
    </main>
  );
}
