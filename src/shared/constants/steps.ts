import { BC_ADVISOR_CONTACT, BC_RESOURCE_HUB, CORE_SUPPORT_LINKS } from "@/shared/constants/resources";
import type { StepConfig } from "@/shared/types/business";

export const STEP_CONFIGS: StepConfig[] = [
  {
    id: "structure",
    title: "Choose Business Structure",
    shortExplanation:
      "Your legal structure affects taxes, liability, and registration. Decide first, then enter your details below to generate copy-ready information for BC registration.",
    bulletPoints: [
      "Sole proprietorship: simple, low cost, but you're personally liable for business debts.",
      "Corporation: separate legal entity, liability protection, higher setup cost (~$350+ in BC).",
      "You’ll need your business name and address for registration—gather them here.",
    ],
    optionalLink: {
      href: "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/small-business-resources/small-business-bc",
      label: "Small Business BC — Structure Guide",
    },
    forms: [
      {
        title: "BC Business Structure Guide",
        href: "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/business-licence",
        authority: "BC Government",
        embeddable: false,
      },
    ],
    type: "form",
    formFields: ["ownership_type", "business_name", "address"],
    sourceLinks: [
      BC_RESOURCE_HUB,
      {
        label: "Business structure wizard",
        href: "https://entity-selection-prod.apps.silver.devops.gov.bc.ca/",
        note: "Official B.C. comparison tool for choosing a business structure.",
      },
    ],
    supportContacts: [BC_ADVISOR_CONTACT],
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
        estimatedCost: "$30",
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
    sourceLinks: [
      CORE_SUPPORT_LINKS[2],
      {
        label: "Choose a business name",
        href: "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/starting-a-business/choose-a-business-name",
        note: "Province guidance on naming, name requests and registration flow.",
      },
    ],
    supportContacts: [BC_ADVISOR_CONTACT],
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
    sourceLinks: [
      {
        label: "CRA business registration",
        href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/business-registration.html",
        note: "Official CRA entry point for BN and program accounts.",
      },
      {
        label: "Get a business number",
        href: "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/starting-a-business/get-a-business-number",
        note: "B.C. guidance on when and how to obtain a business number.",
      },
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
    sourceLinks: [BC_RESOURCE_HUB],
    recommendations: [
      {
        label: "RBC Digital Choice Business Account",
        href: "https://www.rbcroyalbank.com/business/accounts/index.html",
        note: "Low monthly fee ($6), no minimum balance. Good for cost-conscious small businesses.",
      },
      {
        label: "BMO eBusiness Plan",
        href: "https://www.bmo.com/main/business/accounts/ebusiness-plan/",
        note: "No monthly fee, unlimited electronic transactions. Ideal for online-first businesses.",
      },
      {
        label: "TD Basic Business Plan",
        href: "https://www.td.com/ca/en/business-banking/small-business/bank-accounts/basic-business-plan",
        note: "$5/month for low-volume startups. Pay per transaction after included limit.",
      },
      {
        label: "CIBC Business Accounts",
        href: "https://www.cibc.com/en/business/accounts.html",
        note: "Range of plans from basic to unlimited. CDIC-insured options available.",
      },
      {
        label: "Scotiabank Business Bank Accounts",
        href: "https://www.scotiabank.com/ca/en/small-business/business-banking/business-bank-accounts.html",
        note: "Right Size, Select, and Basic plans. Compare by transaction volume.",
      },
      {
        label: "Wise Business",
        href: "https://wise.com/ca/business/",
        note: "Multi-currency (40+), low FX fees, no monthly fee. Strong for international payments.",
      },
    ],
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
    sourceLinks: [
      CORE_SUPPORT_LINKS[1],
      {
        label: "B.C. permits and licences",
        href: "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences",
        note: "Provincial permit and licence overview.",
      },
      {
        label: "Mobile business licences",
        href: "https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/mobile-business-licences",
        note: "Useful if you operate across participating B.C. municipalities.",
      },
    ],
    supportContacts: [BC_ADVISOR_CONTACT],
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
    sourceLinks: [
      BC_RESOURCE_HUB,
      {
        label: "Small business guide to PST",
        href: "https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst/publications/small-business-guide",
        note: "Important for businesses selling taxable goods or software in B.C.",
      },
    ],
  },
];

export function getStepById(stepId: string) {
  return STEP_CONFIGS.find((step) => step.id === stepId);
}
