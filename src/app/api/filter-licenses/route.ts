export const runtime = "nodejs";

import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getStepById } from "@/shared/constants/steps";
import type { PermitRequirement } from "@/shared/types/business";

export type FilterLicensesRequest = {
  businessType: string;
  location: string;
  businessName: string;
};

export type RelevantForm = PermitRequirement & { reason: string };

export type FilterLicensesResponse = {
  relevantForms: RelevantForm[];
  stubMode?: boolean;
  stubPromptPath?: string;
};

const STUB_DIR = join(process.cwd(), "gemini-stub");
const PROMPT_FILE = join(STUB_DIR, "prompt.txt");
const RESPONSE_FILE = join(STUB_DIR, "response.json");

const SYSTEM_INSTRUCTION =
  "You are a Canadian business compliance expert. " +
  "Given a business profile and a numbered list of permits/licences, " +
  "return only the ones that are required or strongly recommended for this specific business. " +
  "Be strict — exclude anything clearly irrelevant (e.g. a liquor licence for a bakery with no alcohol). " +
  'Respond with JSON only: { "relevant": [{ "index": <number>, "reason": "<one sentence>" }, ...] }';

export async function POST(req: Request) {
  const { businessType, location, businessName } =
    (await req.json()) as FilterLicensesRequest;

  const resolvedBusinessType = businessType || "bakery";
  const resolvedLocation = location || "British Columbia";

  const licensesStep = getStepById("licenses");
  const allPermits = licensesStep?.permits ?? [];

  if (allPermits.length === 0) {
    return Response.json({ relevantForms: [] });
  }

  const permitList = allPermits
    .map(
      (p, i) =>
        `[${i}] ${p.title}\n  Authority: ${p.authority}\n  Description: ${p.description}` +
        (p.links.length ? `\n  Links: ${p.links.join(", ")}` : ""),
    )
    .join("\n\n");

  const userPrompt =
    `Business name: ${businessName || "Unknown"}\n` +
    `Business type: ${resolvedBusinessType}\n` +
    `Location: ${resolvedLocation}\n\n` +
    `Available permits:\n${permitList}\n\n` +
    "Which of these are required or strongly recommended? " +
    'Respond with JSON only: { "relevant": [{ "index": <number>, "reason": "<one sentence>" }, ...] }';

  // ── Stub mode: no API key ────────────────────────────────────────────────
  if (!process.env.GEMINI_API_KEY) {
    console.log("[filter-licenses] No GEMINI_API_KEY — stub mode. Writing prompt to", PROMPT_FILE);
    const fullPrompt = `SYSTEM:\n${SYSTEM_INSTRUCTION}\n\nUSER:\n${userPrompt}`;
    await writeFile(PROMPT_FILE, fullPrompt, "utf-8");
    console.log("[filter-licenses] Prompt written successfully.");

    // Check if the user has already pasted a response
    let raw: string;
    try {
      raw = await readFile(RESPONSE_FILE, "utf-8");
    } catch {
      return Response.json({
        relevantForms: [],
        stubMode: true,
        stubPromptPath: "gemini-stub/prompt.txt",
      } satisfies FilterLicensesResponse);
    }

    const parsed = JSON.parse(raw) as {
      relevant: Array<{ index: number; reason: string }>;
    };

    // Empty placeholder response — treat as "not yet filled"
    if (!parsed.relevant?.length) {
      return Response.json({
        relevantForms: [],
        stubMode: true,
        stubPromptPath: "gemini-stub/prompt.txt",
      } satisfies FilterLicensesResponse);
    }

    const relevantForms: RelevantForm[] = parsed.relevant
      .filter((r) => r.index >= 0 && r.index < allPermits.length)
      .map((r) => ({ ...allPermits[r.index], reason: r.reason }));

    return Response.json({ relevantForms, stubMode: true } satisfies FilterLicensesResponse);
  }

  // ── Live Gemini call ─────────────────────────────────────────────────────
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
  });

  const result = await model.generateContent(userPrompt);
  const raw = result.response.text();

  const parsed = JSON.parse(raw) as {
    relevant: Array<{ index: number; reason: string }>;
  };

  const relevantForms: RelevantForm[] = (parsed.relevant ?? [])
    .filter((r) => r.index >= 0 && r.index < allPermits.length)
    .map((r) => ({ ...allPermits[r.index], reason: r.reason }));

  return Response.json({ relevantForms } satisfies FilterLicensesResponse);
}
