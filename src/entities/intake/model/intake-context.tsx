"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { IntakeData } from "@/shared/types/business";

type IntakeContextValue = {
  intakeData: IntakeData;
  setIntakeData: (next: IntakeData) => void;
};

const initialIntakeData: IntakeData = {
  businessType: "bakery",
  location: "British Columbia",
  businessName: "",
};

const IntakeContext = createContext<IntakeContextValue | null>(null);

export function IntakeProvider({ children }: { children: ReactNode }) {
  const [intakeData, setIntakeData] = useState<IntakeData>(initialIntakeData);
  const value = useMemo(() => ({ intakeData, setIntakeData }), [intakeData]);
  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>;
}

export function useIntake() {
  const context = useContext(IntakeContext);
  if (!context) {
    throw new Error("useIntake must be used within an IntakeProvider.");
  }
  return context;
}
