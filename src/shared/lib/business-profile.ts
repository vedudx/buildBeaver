import type { IntakeData, StepConfig } from "@/shared/types/business";

type RequirementHint = {
  title: string;
  detail: string;
};

const FOOD_TYPES = new Set(["bakery", "restaurant"]);
const REGULATED_TYPES = new Set([
  "childcare",
  "construction",
  "trades",
  "fitness",
  "salon",
  "automotive",
  "home_services",
]);

function formatBusinessType(value: string) {
  const labels: Record<string, string> = {
    bakery: "Bakery",
    restaurant: "Restaurant / Cafe",
    retail: "Retail store",
    consulting: "Consulting / Professional services",
    home_services: "Home services",
    trades: "Trades",
    ecommerce: "E-commerce / Online store",
    photography: "Photography / Creative services",
    fitness: "Fitness / Wellness",
    childcare: "Childcare",
    automotive: "Automotive",
    construction: "Construction / Contracting",
    salon: "Salon / Personal care",
    other: "Business",
  };

  return labels[value] ?? "Business";
}

export function getStepSummary(step: StepConfig, intake: IntakeData) {
  const businessLabel = formatBusinessType(intake.businessType);
  const city = intake.city?.trim();

  switch (step.id) {
    case "structure":
      return city
        ? `${businessLabel} setup in ${city}: confirm your structure before you register or apply for local permits.`
        : `${businessLabel} setup: choose the structure that fits your liability, tax and growth plans.`;
    case "register_business":
      return intake.businessName
        ? `Register "${intake.businessName}" once you confirm the name is available in B.C.`
        : "Prepare your business name, owner details and address for BC registration.";
    case "business_number":
      return "Use the same legal name and address from registration so your CRA accounts stay aligned.";
    case "bank_account":
      return "Bring your registration confirmation, government ID and BN details if you already have them.";
    case "licenses":
      return city
        ? `Your permit search should be tailored to ${city} and your ${businessLabel.toLowerCase()} activity.`
        : `Your permit search should be tailored to your city and your ${businessLabel.toLowerCase()} activity.`;
    case "accounting":
      return FOOD_TYPES.has(intake.businessType)
        ? "Track inventory, supplier invoices and sales tax from day one."
        : "Set up bookkeeping early so taxes, write-offs and filings stay manageable.";
    default:
      return step.shortExplanation;
  }
}

export function getStepPriority(step: StepConfig, intake: IntakeData) {
  if (
    step.id === "licenses" &&
    (FOOD_TYPES.has(intake.businessType) || REGULATED_TYPES.has(intake.businessType))
  ) {
    return "High attention";
  }

  if (step.id === "register_business" && intake.businessName) {
    return "Ready next";
  }

  if (step.id === "bank_account" && !intake.businessName) {
    return "After registration";
  }

  return "Core step";
}

export function getLikelyRequirements(intake: IntakeData): RequirementHint[] {
  const hints: RequirementHint[] = [];
  const city = intake.city?.trim();

  if (city) {
    hints.push({
      title: "Municipal licence",
      detail: `Check whether ${city} requires a business licence for this activity and location.`,
    });
  }

  if (FOOD_TYPES.has(intake.businessType)) {
    hints.push({
      title: "Food and health approvals",
      detail: "Food businesses often need health authority approvals, food safety compliance and location-specific inspections.",
    });
  }

  if (intake.businessType === "childcare") {
    hints.push({
      title: "Child care licensing",
      detail: "Child care businesses typically need licensing and facility review before opening.",
    });
  }

  if (intake.businessType === "construction" || intake.businessType === "trades") {
    hints.push({
      title: "Trade or contractor requirements",
      detail: "You may need trade certifications, contractor registrations or safety program compliance depending on the work.",
    });
  }

  if (intake.businessType === "salon" || intake.businessType === "fitness") {
    hints.push({
      title: "Premises and safety rules",
      detail: "Personal care and wellness businesses often need occupancy, sanitation or safety compliance checks.",
    });
  }

  if (intake.businessType === "retail" || intake.businessType === "ecommerce") {
    hints.push({
      title: "Sales tax setup",
      detail: "Retail and e-commerce businesses should confirm PST and GST obligations early.",
    });
  }

  if (hints.length === 0) {
    hints.push({
      title: "Permit review",
      detail: "Use BizPaL and your municipality to confirm whether your business activity needs permits before launch.",
    });
  }

  return hints;
}

export function getLowLikelihoodRequirements(intake: IntakeData) {
  if (intake.businessType === "consulting" || intake.businessType === "photography") {
    return [
      "You may have fewer provincial permits if you operate from home or online, but still confirm municipal rules.",
    ];
  }

  if (intake.businessType === "ecommerce") {
    return [
      "A storefront-style occupancy permit may not apply if you operate online only, but warehousing and shipping locations still matter.",
    ];
  }

  return [
    "Not every business needs a provincial operating permit, but municipal and industry-specific checks still matter.",
  ];
}
