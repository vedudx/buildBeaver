import Link from "next/link";
import { notFound } from "next/navigation";
import { FormAssistant } from "@/features/form-assistant/ui/form-assistant";
import { LicensesGuidance } from "@/features/licenses/ui/licenses-guidance";
import { SourceSupportPanel } from "@/features/support/ui/source-support-panel";
import { StepCompleteButton } from "@/features/step/ui/step-complete-button";
import { FormsEmbed } from "@/shared/ui/forms-embed";
import { getStepById } from "@/shared/constants/steps";
import { StepProgressBar } from "@/features/step/ui/step-progress-bar";

type StepPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StepPage({ params }: StepPageProps) {
  const { id } = await params;
  const step = getStepById(id);

  if (!step) {
    notFound();
  }

  const hasForms = step.forms && step.forms.length > 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-12 md:px-8">
      <div className="mb-6 flex flex-col gap-4">
        <Link href="/roadmap" className="text-sm font-medium text-red-800 hover:underline">
          ← Back to roadmap
        </Link>
        <StepProgressBar currentStepId={id} />
      </div>

      <div className="flex flex-col gap-6">
        {/* Overview card */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">{step.title}</h1>
          <p className="mt-3 text-gray-700">{step.shortExplanation}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
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

        {/* Form assistant — prepare answers before opening the government form */}
        {step.type === "form" ? <FormAssistant step={step} /> : null}

        {/* Government forms / external links */}
        {hasForms ? <FormsEmbed forms={step.forms!} /> : null}

        {/* Licenses & permits guidance */}
        {step.type === "semi" ? <LicensesGuidance /> : null}

        {/* Official sources and support contacts */}
        {step.sourceLinks?.length ? (
          <SourceSupportPanel
            title="Official guidance and support"
            description="Use these sources to verify requirements and reach the right BC support channel."
            links={step.sourceLinks}
            contacts={step.supportContacts}
          />
        ) : null}

        <StepCompleteButton stepId={id} />
      </div>
    </main>
  );
}
