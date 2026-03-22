import Link from "next/link";
import { notFound } from "next/navigation";
import { FormAssistant } from "@/features/form-assistant/ui/form-assistant";
import { LicensesChecklist } from "@/features/licenses/ui/licenses-checklist";
import { LicensesGuidance } from "@/features/licenses/ui/licenses-guidance";
import { SourceSupportPanel } from "@/features/support/ui/source-support-panel";
import { StepCompleteButton } from "@/features/step/ui/step-complete-button";
import { FormsEmbed } from "@/shared/ui/forms-embed";
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

  const hasForms = step.forms && step.forms.length > 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12">
      <div className="mb-6">
        <Link href="/roadmap" className="text-sm font-medium text-red-800 hover:underline">
          ← Back to roadmap
        </Link>
      </div>

      <div className={`grid gap-6 ${hasForms ? "lg:grid-cols-2" : "md:grid-cols-2"}`}>
        {/* LEFT: info card + form assistant / checklist */}
        <div className="flex flex-col gap-6">
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

          {step.type === "form" ? <FormAssistant step={step} /> : null}

          {step.type === "semi" ? <LicensesGuidance /> : null}

          {step.type === "info" && !hasForms ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Information</h3>
              <p className="mt-3 text-gray-700">
                This step is guidance-only. Review the details above and proceed when ready.
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

          {step.sourceLinks?.length && step.type !== "semi" ? (
            <SourceSupportPanel
              title="Official guidance and support"
              description="Use these sources to verify requirements and reach the right BC support channel."
              links={step.sourceLinks}
              contacts={step.supportContacts}
            />
          ) : null}

          <StepCompleteButton stepId={id} />
        </div>

        {/* RIGHT: embedded forms or fallback info panel */}
        <div>
          {hasForms ? (
            <FormsEmbed forms={step.forms!} />
          ) : step.type !== "semi" ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Information</h3>
              <p className="mt-3 text-gray-700">
                This step is guidance-only. Review the details on the left and proceed when
                ready.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
