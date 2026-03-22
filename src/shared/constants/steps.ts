import type { StepConfig } from "@/shared/types/business";

export const STEP_CONFIGS: StepConfig[] = [
  {
    id: "structure",
    title: "Choose Business Structure",
    shortExplanation:
      "Pick the legal structure that fits your risk, tax, and growth needs in BC.",
    bulletPoints: [
      "Compare sole proprietorship vs incorporation (BC Business Corporations Act).",
      "Review personal liability protection needs.",
      "Identify if you need a 'Benefit Company' status (unique to BC).",
    ],
    type: "info",
  },
  {
    id: "register_business",
    title: "Register Business (BC Registries)",
    shortExplanation:
      "Reserve your name and register your core business details provincially.",
    bulletPoints: [
      "Submit a Name Request (NR) first—approval is now often automated.",
      "Complete incorporation or registration through the new BC Registry Application.",
      "Ensure your registered office address is a physical location in BC.",
    ],
    optionalLink: {
      href: "https://www.etax.gov.bc.ca/btp/eservices/_/",
      label: "Access BC Registry Application",
    },
    type: "form",
    formFields: ["business_name", "ownership_type", "address"],
    permits: [
      {
        id: "bcr-name-request",
        title: "BC Name Request",
        description:
          "Reserve your business name. Digital 'self-service' requests are now prioritized.",
        authority: "BC Registries and Online Services",
        category: "provincial",
        links: ["https://www.names.bcregistry.gov.bc.ca/"],
        estimatedCost: "$31.50",
        estimatedTimeline: "1-24 hours (Automated) / 5 days (Manual)",
      },
      {
        id: "bcr-services-account-creation",
        title: "BC Business Registration",
        description:
		"Create a BC Registries and Online Services Account. You can create your BC Registries account by using your BC Services Card",
        authority: "BC Registries and Online Services",
        category: "provincial",
        links: ["https://www.account.bcregistry.gov.bc.ca/choose-authentication-method"],
        estimatedCost: "free",
        estimatedTimeline: "Instant (Digital)",
      },
      {
        id: "bcr-name-registration",
        title: "BC Business Registration",
        description:
          "Legally establish your entity. Sole proprietorships and corporations use the same unified portal.",
        authority: "BC Registries and Online Services",
        category: "provincial",
        links: ["https://www.bcregistry.gov.bc.ca/en-CA/login"],
        estimatedCost: "$40 (Sole Prop) / $351.50 (Incorporation)",
        estimatedTimeline: "Instant (Digital)",
      },
    ],
  },
  {
    id: "business_number",
    title: "Get Business Number (CRA)",
    shortExplanation:
      "Register for your federal 9-digit Business Number via the BRO system.",
    bulletPoints: [
      "Mandatory for GST/HST, payroll, and import/export accounts.",
      "Registration is now exclusively digital through Business Registration Online (BRO).",
      "Requires your BC Registration Number from the previous step.",
    ],
    optionalLink: {
      href: "https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/register.html",
      label: "CRA BRO Portal",
    },
    type: "form",
    formFields: ["business_name", "ownership_type", "address", "start_date"],
  },
  {
    id: "bc_pst_tax",
    title: "BC PST Registration (eTaxBC)",
    shortExplanation:
      "Register to collect and remit 7% Provincial Sales Tax.",
    bulletPoints: [
      "Mandatory for selling goods and 'professional services' in BC.",
      "Note: 2026 Budget expanded PST to cover most professional consulting services.",
      "Register via eTaxBC to avoid non-compliance penalties.",
    ],
    optionalLink: {
      href: "https://www.etax.gov.bc.ca/btp/eservices/_/",
      label: "Register via eTaxBC",
    },
    type: "semi",
    permits: [
      {
        id: "bc-pst-account",
        title: "PST Number",
        description: "Your unique BC tax identifier for remitting 7% sales tax.",
        authority: "BC Ministry of Finance",
        category: "mandatory",
        links: ["https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst/register"],
        estimatedCost: "$0",
        estimatedTimeline: "7-10 business days",
      }
    ]
  },
  {
    id: "worksafebc",
    title: "WorkSafeBC Registration",
    shortExplanation:
      "Set up mandatory workplace disability and liability insurance.",
    bulletPoints: [
      "Required if you hire employees or certain types of contractors.",
      "Must register wihin 15 days of your first hire.",
      "Protects you from legal action by workers injured on the job.",
    ],
    optionalLink: {
      href: "https://www.worksafebc.com/en/insurance/apply-for-coverage",
      label: "WorkSafeBC Employer Application",
    },
    type: "info",
    permits: [
      {
        id: "worksafebc-account",
        title: "WorkSafeBC Employer Account",
        description: "Insurance coverage for your workforce.",
        authority: "WorkSafeBC",
        category: "conditional",
        links: ["https://www.worksafebc.com/en/insurance/apply-for-coverage/register-as-an-employer"],
        estimatedCost: "Industry-dependent premium",
        estimatedTimeline: "5-10 business days",
      }
    ]
  },
  {
    id: "bank_account",
    title: "Open Business Bank Account",
    shortExplanation:
      "Separate your personal and business finances at a Canadian institution.",
    bulletPoints: [
      "Most BC credit unions (like Vancity or Coast Capital) offer local business perks.",
      "Requires your BC Registration documents and CRA Business Number.",
      "Essential for keeping 'The Maple Layer' audit-ready.",
    ],
    type: "info",
  },
  {
    id: "licenses",
    title: "Local Licenses & Permits",
    shortExplanation:
      "Check municipal and industry-specific requirements for your location. Vancouver has specialized licenses based on your business activity.",
    bulletPoints: [
      "Verify if you need a Commercial, Home-based, or Out-of-town license.",
      "Food-related businesses trigger a mandatory VCH Health Approval.",
      "Trades and construction may qualify for the Metro West IMBL (6 cities, 1 license).",
      "Ensure all inspections (Fire, Health, Building) are booked before the license is issued.",
    ],
    optionalLink: {
      href: "https://vancouver.ca/doing-business/business-licences.aspx",
      label: "Vancouver Business License Portal",
    },
    type: "semi",
    permits: [
      {
        id: "cov-restaurant-full",
        title: "Restaurant (Full Service) License",
        description: "For dine-in establishments with a full kitchen. Requires Health and Fire inspections.",
        authority: "City of Vancouver",
        category: "municipal",
        links: ["https://vancouver.ca/doing-business/get-a-business-licence.aspx"],
        estimatedCost: "$700–$1,100 (Annual)",
        estimatedTimeline: "3–10 weeks",
      },
      {
        id: "cov-restaurant-limited",
        title: "Limited Service Food Establishment",
        description: "For takeout-heavy businesses, bubble tea shops, and cafes with minimal processing.",
        authority: "City of Vancouver",
        category: "municipal",
        links: ["https://vancouver.ca/doing-business/get-a-business-licence.aspx"],
        estimatedCost: "$250–$500 (Annual)",
        estimatedTimeline: "2–6 weeks",
      },
      {
        id: "cov-liquor-service",
        title: "Liquor-Serving Business License",
        description: "Specialized license for pubs, clubs, and restaurants serving alcohol. Subject to higher fees and police checks.",
        authority: "City of Vancouver",
        category: "municipal",
        links: ["https://vancouver.ca/doing-business/liquor-serving-establishments.aspx"],
        estimatedCost: "$1,200+ (Varies by seating)",
        estimatedTimeline: "4–8 months",
      },
      {
        id: "vch-food-permit",
        title: "VCH Food Service Permit",
        description: "Mandatory health approval from Vancouver Coastal Health. Requires a Food Safety & Sanitation Plan.",
        authority: "Vancouver Coastal Health (VCH)",
        category: "provincial",
        links: ["https://www.vch.ca/en/service/food-service-permits-and-health-approvals"],
        estimatedCost: "Included in COV Fee (Inspection based)",
        estimatedTimeline: "Concurrent with License",
      },
      {
        id: "cov-home-business",
        title: "Home-Based Business License",
        description: "For consultants or artisans operating from a residential dwelling. No on-site customers or staff allowed in most zones.",
        authority: "City of Vancouver",
        category: "municipal",
        links: ["https://vancouver.ca/doing-business/home-based-business.aspx"],
        estimatedCost: "$77 (App) + ~$100 (Annual)",
        estimatedTimeline: "5–15 business days",
      },
      {
        id: "bc-foodsafe-level1",
        title: "FOODSAFE Level 1 Certification",
        description: "Mandatory for the operator and at least one staff member per shift (BC Food Safety Act).",
        authority: "BC Provincial Health Authority",
        category: "mandatory",
        links: ["https://foodsafe.ca/"],
        estimatedCost: "$125 per person",
        estimatedTimeline: "1 day",
      },
      {
        id: "cov-imbl-trades",
        title: "Metro West Inter-Municipal License (IMBL)",
        description: "One license for trades (Plumbing, Electrical, etc.) to work in Vancouver, Burnaby, Delta, Richmond, Surrey, and New West.",
        authority: "City of Vancouver",
        category: "regional",
        links: ["https://vancouver.ca/doing-business/metro-west-imbl.aspx"],
        estimatedCost: "$300 (plus base license)",
        estimatedTimeline: "1 week",
      },
    ],
  },
  {
    id: "accounting",
    title: "BC-Specific Accounting Setup",
    shortExplanation:
      "Configure your bookkeeping to handle GST and BC PST separately.",
    bulletPoints: [
      "Map your chart of accounts to handle the 7% PST and 5% GST split.",
      "Set up monthly or quarterly filing reminders for eTaxBC.",
      "Track WorkSafeBC assessable earnings for annual reporting.",
    ],
    type: "info",
  },
];

export function getStepById(stepId: string) {
  return STEP_CONFIGS.find((step) => step.id === stepId);
}
