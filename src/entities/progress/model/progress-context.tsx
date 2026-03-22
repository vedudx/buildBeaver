"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ProgressContextValue = {
  completedSteps: Set<string>;
  markComplete: (stepId: string) => void;
  markIncomplete: (stepId: string) => void;
  isComplete: (stepId: string) => boolean;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const value = useMemo<ProgressContextValue>(
    () => ({
      completedSteps,
      markComplete: (stepId) =>
        setCompletedSteps((prev) => new Set([...prev, stepId])),
      markIncomplete: (stepId) =>
        setCompletedSteps((prev) => {
          const next = new Set(prev);
          next.delete(stepId);
          return next;
        }),
      isComplete: (stepId) => completedSteps.has(stepId),
    }),
    [completedSteps],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
