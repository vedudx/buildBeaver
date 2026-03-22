"use client";

import { useState } from "react";
import type { StepForm } from "@/shared/types/business";

type FormsEmbedProps = {
  forms: StepForm[];
};

function LinkCard({ form }: { form: StepForm }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {form.authority}
        </p>
        <h3 className="mt-1 text-lg font-bold text-gray-900">{form.title}</h3>
      </div>

      {(form.estimatedCost || form.estimatedTimeline) && (
        <dl className="grid grid-cols-2 gap-4">
          {form.estimatedCost && (
            <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <dt className="text-xs font-medium text-gray-500">Estimated cost</dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">{form.estimatedCost}</dd>
            </div>
          )}
          {form.estimatedTimeline && (
            <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <dt className="text-xs font-medium text-gray-500">Estimated time</dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">{form.estimatedTimeline}</dd>
            </div>
          )}
        </dl>
      )}

      <p className="text-sm text-gray-500">
        This form is hosted on an external government website. Click below to open it in a new
        tab and complete it there.
      </p>

      <a
        href={form.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
      >
        Go to form
        <span aria-hidden>↗</span>
      </a>
    </div>
  );
}

function EmbedCard({ form }: { form: StepForm }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">{form.title}</p>
          <p className="text-xs text-gray-500">{form.authority}</p>
        </div>
        <a
          href={form.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Open in new tab ↗
        </a>
      </div>
      <iframe
        key={form.href}
        src={form.href}
        title={form.title}
        className="min-h-[540px] w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}

export function FormsEmbed({ forms }: FormsEmbedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = forms[activeIndex];

  return (
    <div className="flex flex-col gap-0">
      {forms.length > 1 && (
        <div className="mb-2 flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          {forms.map((form, i) => (
            <button
              key={form.href}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                i === activeIndex
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {form.title}
            </button>
          ))}
        </div>
      )}

      {active.embeddable ? <EmbedCard form={active} /> : <LinkCard form={active} />}
    </div>
  );
}
