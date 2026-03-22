import Link from "next/link";
import { notFound } from "next/navigation";
import { FormAssistant } from "@/features/form-assistant/ui/form-assistant";
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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12">
      <div className="mb-6">
        <Link href="/roadmap" className="text-sm font-medium text-red-800 hover:underline">
          ← Back to roadmap
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

        <section>
          {step.type === "form" ? (
            <FormAssistant step={step} />
          ) : null}

          {step.type === "info" ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Information</h3>
              <p className="mt-3 text-gray-700">
                This step is guidance-only. Review the details on the left and proceed when
                ready.
              </p>
            </div>
          ) : null}

          {step.type === "semi" ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Checklist</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                <li>Identify permit categories for your location.</li>
                <li>Prepare supporting documents early.</li>
                <li>Track expiration and renewal dates.</li>
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
