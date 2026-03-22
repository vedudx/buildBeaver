"use client";

import Image from "next/image";
import { useState } from "react";
import { useIntake } from "@/entities/intake/model/intake-context";
import type { FilterLicensesResponse, RelevantForm } from "@/app/api/filter-licenses/route";

export function LicensesPanel() {
  const { intakeData } = useIntake();
  const [results, setResults] = useState<RelevantForm[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stubMode, setStubMode] = useState(false);
  const [stubPromptPath, setStubPromptPath] = useState<string | null>(null);

  async function handleFind() {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/filter-licenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: intakeData.businessType,
          location: intakeData.location,
          businessName: intakeData.businessName,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = (await res.json()) as FilterLicensesResponse;
      setResults(data.relevantForms);
      setStubMode(data.stubMode ?? false);
      setStubPromptPath(data.stubPromptPath ?? null);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const businessLabel = [intakeData.businessName, intakeData.businessType, intakeData.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      {/* Header — matches Ask Beaver style */}
      <div className="flex items-center gap-2.5 border-b border-red-900/20 bg-[#CC0000] px-4 py-3">
        <Image
          src="/chatbot-icon.png"
          alt="BuildBeaver"
          width={28}
          height={28}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">Permit Finder</span>
          <span className="text-[11px] text-red-200">Powered by Beaver AI</span>
        </div>
      </div>

      {/* Message area */}
      <div className="flex flex-col gap-3 px-4 py-4">

        {/* Assistant greeting bubble */}
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl bg-slate-100 px-3.5 py-2.5 text-sm leading-relaxed text-slate-800">
            I can find the licences and permits that apply to your{" "}
            <span className="font-semibold">{businessLabel || "business"}</span>.
            Hit the button below to get your personalised list.
          </div>
        </div>

        {/* Loading bubble */}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-100 px-4 py-3">
              <span className="inline-flex gap-1">
                <span className="animate-bounce text-slate-500">·</span>
                <span className="animate-bounce text-slate-500 [animation-delay:0.15s]">·</span>
                <span className="animate-bounce text-slate-500 [animation-delay:0.3s]">·</span>
              </span>
            </div>
          </div>
        )}

        {/* Error bubble */}
        {error && (
          <div className="flex justify-start">
            <div className="max-w-[90%] rounded-2xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {error}
            </div>
          </div>
        )}

        {/* Results bubble */}
        {results !== null && (
          <div className="flex justify-start">
            <div className="w-full max-w-[95%] rounded-2xl bg-slate-100 px-3.5 py-3 text-sm text-slate-800">
              {results.length === 0 && stubMode ? (
                <div className="space-y-2">
                  <p className="font-semibold text-amber-800">Stub mode — no API key detected</p>
                  <p className="text-slate-700">The prompt has been written to:</p>
                  <code className="block rounded-lg bg-slate-200 px-3 py-2 text-xs text-slate-800">
                    {stubPromptPath ?? "gemini-stub/prompt.txt"}
                  </code>
                  <ol className="list-decimal space-y-1 pl-4 text-xs text-slate-700">
                    <li>Open that file and copy the full text</li>
                    <li>Paste it into <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="font-medium text-[#CC0000] underline">gemini.google.com</a></li>
                    <li>Copy Gemini&apos;s JSON response</li>
                    <li>Paste it into <code className="rounded bg-slate-200 px-1">gemini-stub/response.json</code></li>
                    <li>Click the button again to load the result</li>
                  </ol>
                </div>
              ) : results.length === 0 ? (
                <p>
                  No specific permits identified for your business type. Check{" "}
                  <a
                    href="https://bizpal.ca"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#CC0000] underline"
                  >
                    BizPaL
                  </a>{" "}
                  for a full provincial list.
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="font-medium">
                    Here are the {results.length} permit{results.length !== 1 ? "s" : ""} I&apos;d
                    recommend for your business:
                  </p>
                  {results.map((form) => (
                    <div
                      key={form.id}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-900">{form.title}</p>
                          <p className="text-xs text-slate-500">{form.authority}</p>
                        </div>
                        {form.links[0] && (
                          <a
                            href={form.links[0]}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 rounded-lg bg-[#CC0000] px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-red-700"
                          >
                            Open ↗
                          </a>
                        )}
                      </div>
                      <p className="mt-2 text-xs italic text-slate-600">{form.reason}</p>
                      {(form.estimatedCost || form.estimatedTimeline) && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {form.estimatedCost && (
                            <span className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
                              {form.estimatedCost}
                            </span>
                          )}
                          {form.estimatedTimeline && (
                            <span className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
                              {form.estimatedTimeline}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-3">
        <span className="text-xs text-slate-400">
          {results !== null ? "Results based on your intake profile" : "Uses your intake data"}
        </span>
        <button
          type="button"
          onClick={handleFind}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[#CC0000] px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <span
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden
            />
          ) : (
            <Image
              src="/chatbot-icon.png"
              alt=""
              width={18}
              height={18}
              className="rounded-full"
              aria-hidden
            />
          )}
          {results !== null ? "Refresh with Beaver AI" : "Find permits with Beaver AI"}
        </button>
      </div>
    </div>
  );
}
