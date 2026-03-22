import OpenAI from "openai";
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

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are a Canadian business compliance expert. " +
          "Given a business profile and a numbered list of permits/licences, " +
          "return only the ones that are required or strongly recommended for this specific business. " +
          "Be strict — exclude anything clearly irrelevant (e.g. a liquor licence for a bakery with no alcohol). " +
          'Respond with JSON: { "relevant": [{ "index": <number>, "reason": "<one sentence>" }, ...] }',
      },
      {
        role: "user",
        content:
          `Business name: ${businessName || "Unknown"}\n` +
          `Business type: ${businessType}\n` +
          `Location: ${location}\n\n` +
          `Available permits:\n${formList}\n\n` +
          "Which of these are required or strongly recommended?",
      },
    ],
  });

  const raw = completion.choices[0].message.content ?? "{}";
  const parsed = JSON.parse(raw) as {
    relevant: Array<{ index: number; reason: string }>;
  };

  const relevantForms: RelevantForm[] = (parsed.relevant ?? [])
    .filter((r) => r.index >= 0 && r.index < allForms.length)
    .map((r) => ({ ...allForms[r.index], reason: r.reason }));

  return Response.json({ relevantForms } satisfies FilterLicensesResponse);
}
