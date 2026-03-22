import type { SourceLink, SupportContact } from "@/shared/types/business";

export const BC_RESOURCE_HUB: SourceLink = {
  label: "B.C. guides and templates",
  href: "https://www2.gov.bc.ca/gov/content/employment-business/business/small-business/resources",
  note: "Provincial directory for startup, permits, planning, tax and industry-specific guidance.",
};

export const BC_ADVISOR_CONTACT: SupportContact = {
  title: "Provincial business advisors",
  phone: "1-855-698-2157",
  email: "Business.Advisors@gov.bc.ca",
  hours: "Monday to Friday, 8 am to 5 pm",
  note: "Free one-on-one guidance on government programs, funding opportunities and business startup questions.",
};

export const CORE_SUPPORT_LINKS: SourceLink[] = [
  BC_RESOURCE_HUB,
  {
    label: "BizPaL permit finder",
    href: "https://bizpal.ca/",
    note: "Official permit and licence finder across municipal, provincial and federal levels.",
  },
  {
    label: "BC Registry",
    href: "https://www.account.bcregistry.gov.bc.ca/decide-business",
    note: "Official portal for name requests and business registration.",
  },
  {
    label: "Small Business BC",
    href: "https://smallbusinessbc.ca/",
    note: "Practical small business support, education and advisory services in B.C.",
  },
];
