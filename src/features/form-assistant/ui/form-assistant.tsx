"use client";

import { useMemo, useState } from "react";
import { useIntake } from "@/entities/intake/model/intake-context";
import type { OwnershipType, StepConfig } from "@/shared/types/business";

type FormAssistantProps = {
  step: StepConfig;
};

type FormState = {
  business_name: string;
  ownership_type: OwnershipType;
  address: string;
  start_date: string;
};

const fieldLabels: Record<keyof FormState, string> = {
  business_name: "Business Name",
  ownership_type: "Ownership Type",
  address: "Address",
  start_date: "Start Date",
};

export function FormAssistant({ step }: FormAssistantProps) {
  const { intakeData } = useIntake();
  const [form, setForm] = useState<FormState>({
    business_name: intakeData.businessName || "",
    ownership_type: "sole proprietorship",
    address: intakeData.location ? `${intakeData.location}, Canada` : "",
    start_date: "",
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const fields = useMemo(() => step.formFields ?? [], [step.formFields]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setCopied(false);
  }

  function handleGenerate() {
    const lines = fields.map((field) => `${fieldLabels[field]}: ${form[field] || "-"}`);
    setOutput(lines.join("\n"));
    setCopied(false);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Form Assistant</h3>
      <p className="mt-2 text-sm text-gray-600">
        Fill the fields, generate answers, and copy all formatted output.
      </p>

      <div className="mt-5 space-y-4">
        {fields.includes("business_name") ? (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Business Name
            </span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
              type="text"
              value={form.business_name}
              onChange={(event) => updateField("business_name", event.target.value)}
              placeholder="Vedant Bakery Inc."
            />
          </label>
        ) : null}

        {fields.includes("ownership_type") ? (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Ownership Type
            </span>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
              value={form.ownership_type}
              onChange={(event) =>
                updateField("ownership_type", event.target.value as OwnershipType)
              }
            >
              <option value="sole proprietorship">Sole Proprietorship</option>
              <option value="corporation">Corporation</option>
            </select>
          </label>
        ) : null}

        {fields.includes("address") ? (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Address</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
              type="text"
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              placeholder="Vancouver, BC"
            />
          </label>
        ) : null}

        {fields.includes("start_date") ? (
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Start Date
            </span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
              type="text"
              value={form.start_date}
              onChange={(event) => updateField("start_date", event.target.value)}
              placeholder="March 2026"
            />
          </label>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Generate Answers
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Copy All
        </button>
        {copied ? <span className="self-center text-sm text-emerald-700">Copied.</span> : null}
      </div>

      <div className="mt-5 rounded-md bg-gray-50 p-4">
        <p className="mb-2 text-sm font-medium text-gray-700">Generated Output</p>
        <pre className="whitespace-pre-wrap text-sm text-gray-800">
          {output || "No output yet. Click Generate Answers."}
        </pre>
      </div>
    </div>
  );
}
