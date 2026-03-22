import type { StepConfig } from "@/shared/types/business";

export const STEP_CONFIGS: StepConfig[] = [
  {
    id: "structure",
    title: "Choose Business Structure",
    shortExplanation:
      "Pick the legal structure that fits your risk, tax, and growth needs.",
    bulletPoints: [
      "Compare sole proprietorship vs corporation.",
      "Review tax implications and liability protection.",
      "Choose a structure before registration steps.",
    ],
    type: "info",
  },
  {
    id: "register_business",
    title: "Register Business",
    shortExplanation:
      "Register your business name and core details with your province.",
    bulletPoints: [
      "Confirm your preferred business name is available.",
      "Prepare ownership and address details.",
      "Keep your registration confirmation for future steps.",
    ],
    optionalLink: {
      href: "https://www.bcbusinessregistry.ca/",
      label: "BC Business Registry",
    },
    type: "form",
    formFields: ["business_name", "ownership_type", "address"],
    permits: [
      {
        id: "bcr-name-request",
        title: "BC Name Request",
        description:
          "Submit a Name Request to reserve your business name before registration.",
        authority: "BC Registries and Online Services",
        category: "provincial",
        links: ["https://www.bcregistry.gov.bc.ca/businesses/create/name-request"],
        estimatedCost: "$30",
        estimatedTimeline: "2-5 business days",
      },
      {
        id: "bcr-name-registration",
        title: "BC Business Name Registration",
        description:
          "Register your business name through BC Registries. Required for all businesses operating under a name other than the owner's legal name.",
        authority: "BC Registries and Online Services",
        category: "provincial",
        links: [
          "https://www.bcregistry.gov.bc.ca/",
          "https://www.bcregistry.gov.bc.ca/businesses/create",
        ],
        estimatedCost: "$40 (sole proprietorship), $350+ (incorporation)",
        estimatedTimeline: "1-3 business days",
      },
    ],
  },
  {
    id: "business_number",
    title: "Get Business Number (CRA)",
    shortExplanation:
      "Apply for a CRA business number to manage tax and payroll accounts.",
    bulletPoints: [
      "Use your registered business details.",
      "Determine your business start date accurately.",
      "Store your CRA confirmations for accounting setup.",
    ],
    optionalLink: {
      href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/registering-your-business/register.html",
      label: "CRA Registration",
    },
    type: "form",
    formFields: ["business_name", "ownership_type", "address", "start_date"],
  },
  {
    id: "bank_account",
    title: "Open Business Bank Account",
    shortExplanation:
      "Open a dedicated account to separate business and personal finances.",
    bulletPoints: [
      "Bring your registration and identification documents.",
      "Choose an account with suitable monthly fees and limits.",
      "Set up online banking and expense categories.",
    ],
    type: "info",
  },
  {
    id: "licenses",
    title: "Licenses & Permits",
    shortExplanation:
      "Check municipal, provincial, and industry-specific requirements.",
    bulletPoints: [
      "Verify city permits based on your location and business type.",
      "Check health, food, or safety licenses if applicable.",
      "Track renewal dates to stay compliant.",
    ],
    optionalLink: {
      href: "https://bizpal.ca/",
      label: "Find Permits with BizPaL",
    },
    type: "semi",
    permits: [
      {
        id: "bc-food-premises-permit",
        title: "Food Premises Permit",
        description:
          "Required for any bakery operating from a fixed location. Issued by your local Health Authority. Inspector will check kitchen layout, equipment, and food handling practices.",
        authority: "BC Health Authority (e.g. Vancouver Coastal Health)",
        category: "provincial",
        links: [
          "https://www2.gov.bc.ca/gov/content/health/keeping-bc-healthy-safe/food-safety/food-premises",
        ],
        estimatedCost: "$100–$400/year depending on municipality",
        estimatedTimeline: "2–4 weeks",
      },
      {
        id: "bc-business-licence",
        title: "Municipal Business Licence",
        description:
          "Required by most BC municipalities to legally operate a business at a physical address. Apply through your city or district office.",
        authority: "City / District (e.g. City of Vancouver)",
        category: "municipal",
        links: ["https://vancouver.ca/doing-business/business-licence.aspx"],
        estimatedCost: "$100–$500/year depending on city and size",
        estimatedTimeline: "1–2 weeks",
      },
      {
        id: "bc-foodsafe-level1",
        title: "FOODSAFE Level 1 Certification",
        description:
          "At least one person at your bakery must hold FOODSAFE Level 1. This provincial certification covers food handling, sanitation, and safety.",
        authority: "BC Provincial Health Authority",
        category: "mandatory",
        links: ["https://foodsafe.ca/"],
        estimatedCost: "$125 per person",
        estimatedTimeline: "1 day (in-person or online course)",
      },
      {
        id: "bc-home-occupation-permit",
        title: "Home Occupation Permit (if operating from home)",
        description:
          "If baking from a home kitchen, you need a Home Occupation Permit from your municipality in addition to a Food Premises Permit.",
        authority: "City / District",
        category: "conditional",
        links: [
          "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences",
        ],
        estimatedCost: "$50–$200",
        estimatedTimeline: "1–3 weeks",
      },
    ],
  },
  {
    id: "accounting",
    title: "Basic Accounting Setup",
    shortExplanation:
      "Set up simple bookkeeping so taxes and reporting stay manageable.",
    bulletPoints: [
      "Create a chart of accounts for income and expenses.",
      "Save receipts and reconcile transactions monthly.",
      "Plan for GST/HST and year-end filings.",
    ],
    type: "info",
  },
];

export function getStepById(stepId: string) {
  return STEP_CONFIGS.find((step) => step.id === stepId);
}
