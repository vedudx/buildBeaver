"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProgress } from "@/entities/progress/model/progress-context";
import { STEP_CONFIGS } from "@/shared/constants/steps";

type Props = {
  stepId: string;
};

export function StepCompleteButton({ stepId }: Props) {
  const router = useRouter();
  const { isComplete, markComplete, markIncomplete } = useProgress();

  const completed = isComplete(stepId);
  const currentIndex = STEP_CONFIGS.findIndex((s) => s.id === stepId);
  const prevStep = STEP_CONFIGS[currentIndex - 1];
  const nextStep = STEP_CONFIGS[currentIndex + 1];
  const isLastStep = !nextStep;

  function handleMarkComplete() {
    markComplete(stepId);
    if (nextStep) {
      router.push(`/step/${nextStep.id}`);
    } else {
      router.push("/finish");
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Completion action */}
      {completed ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-700">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
              <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold">Step marked as complete</span>
          </div>
          <button
            onClick={() => markIncomplete(stepId)}
            className="text-xs text-gray-400 underline hover:text-gray-600"
          >
            Undo
          </button>
        </div>
      ) : (
        <button
          onClick={handleMarkComplete}
          className="w-full rounded-lg bg-red-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-900"
        >
          {isLastStep ? "Mark as Complete & Finish" : "Mark as Complete & Continue →"}
        </button>
      )}

      {/* Prev / Next navigation */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        {prevStep ? (
          <Link
            href={`/step/${prevStep.id}`}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-800"
          >
            ← {prevStep.title}
          </Link>
        ) : (
          <span />
        )}
        {nextStep ? (
          <Link
            href={`/step/${nextStep.id}`}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-800"
          >
            {nextStep.title} →
          </Link>
        ) : (
          <Link
            href="/finish"
            className="text-sm font-medium text-red-800 transition hover:underline"
          >
            View summary →
          </Link>
        )}
      </div>
    </div>
  );
}
