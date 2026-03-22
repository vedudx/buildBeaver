"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useIntake } from "@/entities/intake/model/intake-context";
import { useProgress } from "@/entities/progress/model/progress-context";
import { CelebrationModal } from "@/features/roadmap/ui/celebration-modal";
import { STEP_CONFIGS } from "@/shared/constants/steps";
import { getStepPriority, getStepSummary } from "@/shared/lib/business-profile";
import { BUSINESS_TYPES } from "@/shared/constants/intake-options";

function getBusinessTypeLabel(value: string) {
  return BUSINESS_TYPES.find((bt) => bt.value === value)?.label ?? value;
}

export function PersonalizedRoadmap() {
  const { intakeData } = useIntake();
  const { isComplete, markComplete, markIncomplete, completedSteps } = useProgress();
  const city = intakeData.city?.trim();

  const totalSteps = STEP_CONFIGS.length;
  const completedCount = completedSteps.size;
  const allDone = completedCount === totalSteps;
  const currentStepIndex = STEP_CONFIGS.findIndex((s) => !isComplete(s.id));

  const [showCelebration, setShowCelebration] = useState(false);
  const hasMounted = useRef(false);
  const prevAllDone = useRef(false);

  useEffect(() => {
    if (hasMounted.current && allDone && !prevAllDone.current) {
      setShowCelebration(true);
    }
    prevAllDone.current = allDone;
    hasMounted.current = true;
  }, [allDone]);

  const businessLabel = intakeData.businessType
    ? getBusinessTypeLabel(intakeData.businessType)
    : null;

  const contextParts = [city ? `${city}, B.C.` : "B.C.", businessLabel].filter(Boolean);

  return (
    <>
      {/* Context row */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          {intakeData.businessName ? (
            <p className="truncate text-sm font-semibold text-gray-900">
              {intakeData.businessName}
            </p>
          ) : null}
          <p className="truncate text-xs text-gray-400">{contextParts.join(" · ")}</p>
        </div>
        <Link
          href="/intake"
          className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 shadow-sm transition hover:border-gray-300 hover:text-gray-700"
        >
          Edit details
        </Link>
      </div>

      {/* Segmented progress pills */}
      <div className="mt-5">
        <div className="flex gap-1.5">
          {STEP_CONFIGS.map((step, i) => {
            const done = isComplete(step.id);
            const isCurrent = !done && i === currentStepIndex;
            return (
              <div
                key={step.id}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  done
                    ? "bg-green-500"
                    : isCurrent
                      ? "bg-red-800"
                      : "bg-gray-200"
                }`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {completedCount} of {totalSteps} steps completed
          </p>
          {allDone && (
            <span className="text-xs font-semibold text-green-600">All done!</span>
          )}
        </div>
      </div>

      {/* Step list */}
      <ol className="mt-5 space-y-2">
        {STEP_CONFIGS.map((step, index) => {
          const done = isComplete(step.id);
          const isCurrent = !done && index === currentStepIndex;
          const isFuture = !done && !isCurrent;

          return (
            <li key={step.id}>
              <div
                className={`flex overflow-hidden rounded-xl border transition-all duration-200 ${
                  done
                    ? "border-green-200 bg-green-50/50"
                    : isCurrent
                      ? "border-red-200 bg-white shadow-[0_2px_12px_-2px_rgba(127,29,29,0.12)]"
                      : "border-gray-200 bg-white"
                }`}
              >
                {/* Left accent bar */}
                <div
                  className={`w-1 shrink-0 transition-colors duration-300 ${
                    done ? "bg-green-400" : isCurrent ? "bg-red-800" : "bg-transparent"
                  }`}
                />

                {/* Navigable link area */}
                <Link
                  href={`/step/${step.id}`}
                  className={`flex flex-1 items-start gap-3 px-4 py-4 transition ${
                    done
                      ? "hover:bg-green-50"
                      : isCurrent
                        ? "hover:bg-red-50/40"
                        : "hover:bg-gray-50"
                  }`}
                >
                  {/* Step number circle */}
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      done
                        ? "bg-green-500 text-white"
                        : isCurrent
                          ? "bg-red-800 text-white"
                          : "bg-gray-100 text-gray-400"
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

                  {/* Title + summary */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-sm font-semibold leading-snug ${
                          done
                            ? "text-green-800"
                            : isCurrent
                              ? "text-gray-900"
                              : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </span>
                      {isCurrent && (
                        <span className="rounded-full bg-red-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                          Current
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-0.5 text-xs leading-relaxed ${
                        done ? "text-green-700/60" : isCurrent ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {getStepSummary(step, intakeData)}
                    </p>
                  </div>
                </Link>

                {/* Priority badge + toggle */}
                <div className="flex shrink-0 flex-col items-end justify-between gap-2 py-4 pr-4">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                      done
                        ? "border-gray-100 bg-gray-50 text-gray-400 line-through"
                        : isCurrent
                          ? "border-red-200 bg-red-50 text-red-800"
                          : "border-gray-200 bg-gray-50 text-gray-500"
                    }`}
                  >
                    {getStepPriority(step, intakeData)}
                  </span>
                  <button
                    onClick={() =>
                      done ? markIncomplete(step.id) : markComplete(step.id)
                    }
                    title={done ? "Mark as incomplete" : "Mark as complete"}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                      done
                        ? "border-green-300 bg-green-500 text-white hover:border-red-200 hover:bg-red-50 hover:text-red-400"
                        : "border-gray-200 bg-white text-gray-300 hover:border-green-300 hover:text-green-500"
                    }`}
                  >
                    {done ? (
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Finish button — only when all steps done */}
      {allDone && (
        <Link
          href="/finish"
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          View Your Business Summary
        </Link>
      )}

      {showCelebration && (
        <CelebrationModal
          businessName={
            intakeData.businessName?.trim() || ""
          }
          onClose={() => setShowCelebration(false)}
        />
      )}
    </>
  );
}
