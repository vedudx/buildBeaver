import { GoogleGenerativeAI } from "@google/generative-ai";
import { getStepById } from "@/shared/constants/steps";
import type { StepForm } from "@/shared/types/business";

export type FilterLicensesRequest = {
  businessType: string;
  location: string;
  businessName: string;
};

export type RelevantForm = StepForm & { reason: string };

export type FilterLicensesResponse = {
  relevantForms: RelevantForm[];
};

export async function POST(req: Request) {
  const { businessType, location, businessName } =
    (await req.json()) as FilterLicensesRequest;

  if (!businessType || !location) {
    return Response.json(
      { error: "businessType and location are required." },
      { status: 400 },
    );
  }

  const licensesStep = getStepById("licenses");
  const allForms = licensesStep?.forms ?? [];

  if (allForms.length === 0) {
    return Response.json({ relevantForms: [] });
  }

  const formList = allForms
    .map(
      (f, i) =>
        `[${i}] ${f.title}\n  Authority: ${f.authority}\n  Description: ${f.description ?? "N/A"}`,
    )
    .join("\n\n");

  const prompt =
    `Business name: ${businessName || "Unknown"}\n` +
    `Business type: ${businessType}\n` +
    `Location: ${location}\n\n` +
    `Available permits:\n${formList}\n\n` +
    "Which of these are required or strongly recommended? " +
    'Respond with JSON only: { "relevant": [{ "index": <number>, "reason": "<one sentence>" }, ...] }';

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "You are a Canadian business compliance expert. " +
        "Given a business profile and a numbered list of permits/licences, " +
        "return only the ones that are required or strongly recommended for this specific business. " +
        "Be strict — exclude anything clearly irrelevant. " +
        'Respond with JSON only: { "relevant": [{ "index": <number>, "reason": "<one sentence>" }, ...] }',
      generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
    });

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const parsed = JSON.parse(raw) as {
      relevant: Array<{ index: number; reason: string }>;
    };

    const relevantForms: RelevantForm[] = (parsed.relevant ?? [])
      .filter((r) => r.index >= 0 && r.index < allForms.length)
      .map((r) => ({ ...allForms[r.index], reason: r.reason }));

    return Response.json({ relevantForms } satisfies FilterLicensesResponse);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const isQuota = message.includes("429") || message.toLowerCase().includes("quota");
    return Response.json(
      { error: isQuota ? "AI service rate limit reached. Please try again shortly." : "AI service error." },
      { status: isQuota ? 429 : 500 },
    );
  }
}
