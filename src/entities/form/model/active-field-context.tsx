"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { FormFieldKey } from "@/shared/types/business";

const FIELD_LABELS: Record<FormFieldKey, string> = {
  business_name: "Business Name",
  ownership_type: "Ownership Type",
  address: "Business Address",
  start_date: "Business Start Date",
  gst_threshold: "GST/HST Revenue Threshold",
};

const FIELD_OPTIONS: Partial<Record<FormFieldKey, string[]>> = {
  ownership_type: ["Sole Proprietorship", "Corporation"],
  gst_threshold: [
    "Yes — expecting over $30,000/year in taxable supplies",
    "No — under $30,000/year in taxable supplies",
  ],
};

type ActiveFieldContextValue = {
  activeField: FormFieldKey | null;
  activeFieldLabel: string | null;
  activeFieldOptions: string[] | null;
  setActiveField: (field: FormFieldKey | null) => void;
};

const ActiveFieldContext = createContext<ActiveFieldContextValue | null>(null);

export function ActiveFieldProvider({ children }: { children: ReactNode }) {
  const [activeField, setActiveField] = useState<FormFieldKey | null>(null);

  const value = useMemo(
    () => ({
      activeField,
      activeFieldLabel: activeField ? FIELD_LABELS[activeField] : null,
      activeFieldOptions: activeField ? (FIELD_OPTIONS[activeField] ?? null) : null,
      setActiveField,
    }),
    [activeField],
  );

  return <ActiveFieldContext.Provider value={value}>{children}</ActiveFieldContext.Provider>;
}

export function useActiveField() {
  const context = useContext(ActiveFieldContext);
  if (!context) {
    throw new Error("useActiveField must be used within an ActiveFieldProvider.");
  }
  return context;
}
