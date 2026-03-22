"use client";

import Link from "next/link";
import { STEP_CONFIGS } from "@/shared/constants/steps";
import { useProgress } from "@/entities/progress/model/progress-context";

type Props = {
  currentStepId: string;
};

export function StepProgressBar({ currentStepId }: Props) {
  const { isComplete } = useProgress();
  const currentIndex = STEP_CONFIGS.findIndex((s) => s.id === currentStepId);
  const total = STEP_CONFIGS.length;

  if (currentIndex === -1) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium text-gray-700">
          Step {currentIndex + 1} of {total}
        </span>
        <span>{STEP_CONFIGS.filter((s) => isComplete(s.id)).length} completed</span>
      </div>

      <div className="flex gap-1">
        {STEP_CONFIGS.map((step, i) => {
          const isCurrent = step.id === currentStepId;
          const isDone = isComplete(step.id);

          return (
            <Link
              key={step.id}
              href={`/step/${step.id}`}
              title={step.title}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                isCurrent
                  ? "bg-red-800"
                  : isDone
                    ? "bg-red-300"
                    : i < currentIndex
                      ? "bg-gray-300"
                      : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
