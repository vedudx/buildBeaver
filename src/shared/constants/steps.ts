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
      href: "https://www.bcregistry.gov.bc.ca/en-CA",
      label: "BC Business Registry",
    },
    forms: [
      {
        title: "BC Name Request",
        href: "https://www.names.bcregistry.gov.bc.ca/",
        authority: "BC Registries and Online Services",
        estimatedCost: "$30, $130 for priority service",
        estimatedTimeline: "2–5 business days",
        embeddable: false,
      },
      {
        title: "BC Business Name Registration",
        href: "https://www.account.bcregistry.gov.bc.ca/decide-business",
        authority: "BC Registries and Online Services",
        estimatedCost: "$40 (sole proprietorship), $350+ (incorporation)",
        estimatedTimeline: "1–3 business days",
        embeddable: false,
      },
    ],
    type: "form",
    formFields: ["business_name", "ownership_type", "address"],
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
    forms: [
      {
        title: "CRA Business Number Registration",
        href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/business-registration/business-number-program-account/how-register.html",
        authority: "Canada Revenue Agency",
        embeddable: false,
      },
    ],
    type: "form",
    formFields: [
      "business_name",
      "ownership_type",
      "address",
      "start_date",
      "gst_threshold",
    ],
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
