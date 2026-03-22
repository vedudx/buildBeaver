"use client";

import React, { useMemo } from "react";
import { useIntake } from "@/entities/intake/model/intake-context";
import { useFormData } from "@/entities/form/model/form-context";
import { useActiveField } from "@/entities/form/model/active-field-context";
import type {
  FormFieldKey,
  GstThresholdAnswer,
  OwnershipType,
  StepConfig,
} from "@/shared/types/business";

type FormAssistantProps = {
  step: StepConfig;
};

type FormState = {
  business_name: string;
  ownership_type: OwnershipType;
  address: string;
  start_date: string;
  gst_threshold: GstThresholdAnswer;
};

/** Labels used in generated output (title case, per product copy) */
const fieldLabels: Record<FormFieldKey, string> = {
  business_name: "Business Name",
  ownership_type: "Ownership Type",
  address: "Address",
  start_date: "Start Date",
  gst_threshold: "Over $30k/year (taxable supplies)",
};

/** Wording from docs/form_questions (visible labels; output uses `fieldLabels`) */
const formQuestionLabels: Partial<Record<FormFieldKey, string>> = {
  business_name: "What is your business name?",
  ownership_type: "What type of business structure?",
  address: "What is your business address?",
  start_date: "When did your business start operating?",
};

/** Helper text under each question */
const fieldHelp: Partial<Record<FormFieldKey, string>> = {
  business_name: "Prefilled from intake when available.",
  ownership_type: "Choose Sole Proprietorship or Corporation.",
  address: "City and province are fine for a first draft.",
  start_date: "Use a specific date or month and year.",
  gst_threshold:
    "CRA uses $30,000 in four consecutive calendar quarters as a common GST/HST threshold.",
};

const stepPanelCopy: Record<string, { title: string; blurb: string }> = {
  structure: {
    title: "Your structure and registration details",
    blurb:
      "Choose your business structure and enter your name and address. Generate copy-ready output to use when you register with BC.",
  },
  register_business: {
    title: "Registration details",
    blurb:
      "Answer a few questions to produce copy-ready lines you can paste into BC registration flows.",
  },
  business_number: {
    title: "CRA Business Number details",
    blurb:
      "We’ll reuse what you already entered where possible and only ask for what’s new for your BN application.",
  },
};

function formatOwnershipLabel(value: OwnershipType): string {
  return value === "sole proprietorship" ? "Sole Proprietorship" : "Corporation";
}

function gstRegistrationLine(answer: GstThresholdAnswer): string {
  if (answer === "yes") {
    return "GST/HST registration: Required (over typical small-supplier threshold)";
  }
  return "GST/HST registration: Optional (under typical small-supplier threshold)";
}

const inputClassName =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-red-600/80 focus:ring-2 focus:ring-red-600/20";

const labelClassName = "mb-1.5 block text-sm font-medium text-neutral-800";

export function FormAssistant({ step }: FormAssistantProps) {
  const { intakeData } = useIntake();
  const { formData, setFormData } = useFormData();
  const { setActiveField } = useActiveField();

  // Seed empty fields from intake on first render (does not overwrite saved answers)
  const form: FormState = {
    business_name:
      formData.business_name || intakeData.businessName || "",
    ownership_type: formData.ownership_type,
    address:
      formData.address ||
      (intakeData.city
        ? `${intakeData.city}, BC`
        : intakeData.location
          ? intakeData.location
          : ""),
    start_date: formData.start_date,
    gst_threshold: formData.gst_threshold,
  };

  const [output, setOutput] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const fields = useMemo(() => step.formFields ?? [], [step.formFields]);

  const panel = stepPanelCopy[step.id] ?? {
    title: "Form Assistant",
    blurb: "Fill the fields and generate copy-ready answers.",
  };

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormData({ [key]: value });
    setCopied(false);
  }

  function buildOutputLines(): string[] {
    const lines: string[] = [];
    for (const field of fields) {
      if (field === "business_name") {
        lines.push(`${fieldLabels.business_name}: ${form.business_name.trim() || "—"}`);
      } else if (field === "ownership_type") {
        lines.push(
          `${fieldLabels.ownership_type}: ${formatOwnershipLabel(form.ownership_type)}`,
        );
      } else if (field === "address") {
        lines.push(`${fieldLabels.address}: ${form.address.trim() || "—"}`);
      } else if (field === "start_date") {
        lines.push(`${fieldLabels.start_date}: ${form.start_date.trim() || "—"}`);
      } else if (field === "gst_threshold") {
        const rev =
          form.gst_threshold === "yes"
            ? "Yes — expect over $30,000/year in taxable supplies"
            : "No — under $30,000/year in taxable supplies";
        lines.push(`${fieldLabels.gst_threshold}: ${rev}`);
        lines.push(gstRegistrationLine(form.gst_threshold));
      }
    }
    return lines;
  }

  function handleGenerate() {
    setIsGenerating(true);
    setCopied(false);
    window.setTimeout(() => {
      setOutput(buildOutputLines().join("\n"));
      setIsGenerating(false);
    }, 400);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm ring-1 ring-black/[0.04]">
      <div className="border-b border-neutral-100 bg-neutral-50/80 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-800">
          Form Assistant
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-neutral-900">
          {panel.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{panel.blurb}</p>
      </div>

      <div className="space-y-6 px-6 py-6">
        {fields.map((field) => {
          const help = fieldHelp[field];
          if (field === "business_name") {
            return (
              <div key={field}>
                <label className={labelClassName}>
                  {formQuestionLabels.business_name ?? fieldLabels.business_name}
                </label>
                {help ? <p className="mb-2 text-xs text-neutral-500">{help}</p> : null}
                <input
                  className={inputClassName}
                  type="text"
                  value={form.business_name}
                  onChange={(e) => updateField("business_name", e.target.value)}
                  onFocus={() => setActiveField("business_name")}
                  placeholder="e.g. Vedant Bakery Inc."
                  autoComplete="organization"
                />
              </div>
            );
          }
          if (field === "ownership_type") {
            return (
              <div key={field}>
                <label className={labelClassName}>
                  {formQuestionLabels.ownership_type ?? fieldLabels.ownership_type}
                </label>
                {help ? <p className="mb-2 text-xs text-neutral-500">{help}</p> : null}
                <select
                  className={inputClassName}
                  value={form.ownership_type}
                  onChange={(e) =>
                    updateField("ownership_type", e.target.value as OwnershipType)
                  }
                  onFocus={() => setActiveField("ownership_type")}
                >
                  <option value="sole proprietorship">Sole Proprietorship</option>
                  <option value="corporation">Corporation</option>
                </select>
              </div>
            );
          }
          if (field === "address") {
            return (
              <div key={field}>
                <label className={labelClassName}>
                  {formQuestionLabels.address ?? fieldLabels.address}
                </label>
                {help ? <p className="mb-2 text-xs text-neutral-500">{help}</p> : null}
                <input
                  className={inputClassName}
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  onFocus={() => setActiveField("address")}
                  placeholder="e.g. Vancouver, BC"
                  autoComplete="street-address"
                />
              </div>
            );
          }
          if (field === "start_date") {
            return (
              <div key={field}>
                <label className={labelClassName}>
                  {formQuestionLabels.start_date ?? fieldLabels.start_date}
                </label>
                {help ? <p className="mb-2 text-xs text-neutral-500">{help}</p> : null}
                <input
                  className={inputClassName}
                  type="text"
                  value={form.start_date}
                  onChange={(e) => updateField("start_date", e.target.value)}
                  onFocus={() => setActiveField("start_date")}
                  placeholder="e.g. March 2026"
                />
              </div>
            );
          }
          if (field === "gst_threshold") {
            return (
              <div key={field}>
                <label className={labelClassName}>
                  Do you expect to earn more than $30,000 per year?
                </label>
                {help ? <p className="mb-3 text-xs text-neutral-500">{help}</p> : null}
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "yes" as const, label: "Yes" },
                      { value: "no" as const, label: "No" },
                    ] as const
                  ).map(({ value, label }) => {
                    const selected = form.gst_threshold === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => { setActiveField("gst_threshold"); updateField("gst_threshold", value); }}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                          selected
                            ? "border-red-800 bg-red-50 text-red-950"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <p
                  className={`mt-3 rounded-lg border px-3 py-2 text-xs leading-relaxed ${
                    form.gst_threshold === "yes"
                      ? "border-amber-200 bg-amber-50 text-amber-950"
                      : "border-neutral-200 bg-neutral-50 text-neutral-700"
                  }`}
                >
                  {form.gst_threshold === "yes"
                    ? "Over the threshold, GST/HST registration is typically required (verify with CRA or an accountant)."
                    : "Below the threshold, GST/HST registration is often optional—you can still register voluntarily."}
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-neutral-100 bg-neutral-50/50 px-6 py-4">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-800 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(127,29,29,0.45)] transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <span
                className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                aria-hidden
              />
              Generating…
            </>
          ) : (
            "Generate Answers"
          )}
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Copy All
        </button>
        {copied ? (
          <span className="text-sm font-medium text-red-800">Copied to clipboard</span>
        ) : null}
      </div>

      <div className="border-t border-neutral-100 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Generated output
        </p>
        <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 font-mono text-sm leading-relaxed text-neutral-800">
          {output || "No output yet — fill the fields and click Generate Answers."}
        </pre>
      </div>
    </div>
  );
}
