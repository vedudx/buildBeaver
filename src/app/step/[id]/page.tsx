import Link from "next/link";
import { notFound } from "next/navigation";
import { AccountingGuidance } from "@/features/accounting/ui/accounting-guidance";
import { FormAssistant } from "@/features/form-assistant/ui/form-assistant";
import { LicensesGuidance } from "@/features/licenses/ui/licenses-guidance";
import { LicensesPanel } from "@/features/licenses/ui/licenses-panel";
import { SourceSupportPanel } from "@/features/support/ui/source-support-panel";
import { StepCompleteButton } from "@/features/step/ui/step-complete-button";
import { StepProgressBar } from "@/features/step/ui/step-progress-bar";
import { FormsEmbed } from "@/shared/ui/forms-embed";
import { LicensesPanel } from "@/features/licenses/ui/licenses-panel";
import { getStepById } from "@/shared/constants/steps";

type StepPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StepPage({ params }: StepPageProps) {
  const { id } = await params;
  const step = getStepById(id);

  if (!step) {
    notFound();
  }

  const hasForms = Boolean(step.forms?.length);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-12 md:px-8">
      <div className="mb-6 flex flex-col gap-4">
        <Link href="/roadmap" className="text-sm font-medium text-red-800 hover:underline">
          ← Back to roadmap
        </Link>
        <StepProgressBar currentStepId={id} />
      </div>

      <div className="flex flex-col gap-10">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{step.title}</h1>
          <p className="mt-3 leading-relaxed text-gray-700">{step.shortExplanation}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
            {step.bulletPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {step.optionalLink ? (
            <a
              href={step.optionalLink.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block text-sm font-semibold text-red-800 hover:underline"
            >
              {step.optionalLink.label}
            </a>
          ) : null}
        </section>

        {step.type === "form" ? <FormAssistant step={step} /> : null}
        {step.type === "semi" ? <LicensesGuidance /> : null}
        {step.id === "accounting" ? <AccountingGuidance /> : null}

        {step.type === "info" && !hasForms && step.id !== "accounting" ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">Information</h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              This step is guidance-only. Review the details above and proceed when you are ready
              for the next roadmap item.
            </p>
          </div>
        ) : null}

        {step.recommendations?.length ? (
          <SourceSupportPanel
            title="Recommended options"
            description="Popular business bank accounts in Canada. Compare fees and features before choosing."
            links={step.recommendations}
          />
        ) : null}

        {step.sourceLinks?.length && step.type !== "semi" && step.id !== "accounting" ? (
          <SourceSupportPanel
            title="Official guidance and support"
            description="Use these sources to verify requirements and reach the right BC support channel."
            links={step.sourceLinks}
            contacts={step.supportContacts}
          />
        ) : null}

        <StepCompleteButton stepId={id} />

        {/* RIGHT: AI permit finder for licenses, embedded forms for others, or info panel */}
        <div>
          {step.id === "licenses" ? (
            <LicensesPanel />
          ) : hasForms ? (
            <FormsEmbed forms={step.forms!} />
          ) : step.type !== "semi" ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Information</h3>
              <p className="mt-3 leading-relaxed text-gray-700">
                This step is guidance-only. Review the details on the left and proceed when
                ready.
              </p>
            </div>
          ) : null}
        </div>
    </main>
  );
}
