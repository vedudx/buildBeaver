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

  // Normalise permits → StepForm shape so the AI and response code are uniform
  const allForms: StepForm[] = [
    ...(licensesStep?.forms ?? []),
    ...(licensesStep?.permits ?? []).map((p) => ({
      title: p.title,
      href: p.links[0] ?? "",
      authority: p.authority,
      description: p.description,
      estimatedCost: p.estimatedCost,
      estimatedTimeline: p.estimatedTimeline,
    })),
  ];

  if (allForms.length === 0) {
    return Response.json({ relevantForms: [] });
  }

  const type = businessType.toLowerCase();

  const KEYWORD_RULES: { keywords: string[]; ids: string[]; reason: string }[] = [
    {
      keywords: ["food", "bakery", "cafe", "coffee", "restaurant", "catering", "kitchen", "deli", "sandwich", "bubble tea", "dessert", "pizza", "sushi", "takeout"],
      ids: ["cov-restaurant-limited", "vch-food-permit", "bc-foodsafe-level1"],
      reason: "Required for any food-handling or food-service business in BC.",
    },
    {
      keywords: ["restaurant", "dine", "dining", "full service", "sit-down"],
      ids: ["cov-restaurant-full"],
      reason: "Full-service dine-in establishments require this licence in addition to the food permit.",
    },
    {
      keywords: ["bar", "pub", "liquor", "alcohol", "brewery", "winery", "cocktail"],
      ids: ["cov-liquor-service"],
      reason: "Any business serving alcohol requires a Liquor-Serving Business Licence.",
    },
    {
      keywords: ["home", "freelance", "consultant", "remote", "online", "virtual", "artisan", "craft", "etsy"],
      ids: ["cov-home-business"],
      reason: "Operating from a residential address requires a Home-Based Business Licence.",
    },
    {
      keywords: ["plumbing", "electrical", "trades", "contractor", "hvac", "construction", "renovation"],
      ids: ["cov-imbl-trades"],
      reason: "Trades businesses working across Metro Vancouver municipalities benefit from the IMBL.",
    },
  ];

  const matchedIds = new Set<string>();
  const reasonMap = new Map<string, string>();

  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((kw) => type.includes(kw))) {
      for (const id of rule.ids) {
        if (!matchedIds.has(id)) {
          matchedIds.add(id);
          reasonMap.set(id, rule.reason);
        }
      }
    }
  }

  // Fall back to the most common licences if nothing matched
  if (matchedIds.size === 0) {
    allForms.slice(0, 2).forEach((f) => {
      matchedIds.add(f.href);
      reasonMap.set(f.href, "Commonly required for most business types in BC.");
    });
    const relevantForms: RelevantForm[] = allForms
      .slice(0, 2)
      .map((f) => ({ ...f, reason: "Commonly required for most business types in BC." }));
    return Response.json({ relevantForms } satisfies FilterLicensesResponse);
  }

  const permitMap = new Map(
    (licensesStep?.permits ?? []).map((p) => [p.id, p]),
  );

  const relevantForms: RelevantForm[] = [...matchedIds]
    .map((id) => {
      const permit = permitMap.get(id);
      if (!permit) return null;
      return {
        title: permit.title,
        href: permit.links[0] ?? "",
        authority: permit.authority,
        description: permit.description,
        estimatedCost: permit.estimatedCost,
        estimatedTimeline: permit.estimatedTimeline,
        reason: reasonMap.get(id) ?? "",
      } satisfies RelevantForm;
    })
    .filter((f): f is RelevantForm => f !== null);

  return Response.json({ relevantForms } satisfies FilterLicensesResponse);
}
