"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { GstThresholdAnswer, OwnershipType } from "@/shared/types/business";

export type FormData = {
  business_name: string;
  ownership_type: OwnershipType;
  address: string;
  start_date: string;
  gst_threshold: GstThresholdAnswer;
};

type FormDataContextValue = {
  formData: FormData;
  setFormData: (next: Partial<FormData>) => void;
};

const initialFormData: FormData = {
  business_name: "",
  ownership_type: "sole proprietorship",
  address: "",
  start_date: "",
  gst_threshold: "no",
};

const FormDataContext = createContext<FormDataContextValue | null>(null);

export function FormDataProvider({ children }: { children: ReactNode }) {
  const [formData, setFormDataState] = useState<FormData>(initialFormData);

  function setFormData(next: Partial<FormData>) {
    setFormDataState((prev) => ({ ...prev, ...next }));
  }

  const value = useMemo(() => ({ formData, setFormData }), [formData]);

  return <FormDataContext.Provider value={value}>{children}</FormDataContext.Provider>;
}

export function useFormData() {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider.");
  }
  return context;
}
