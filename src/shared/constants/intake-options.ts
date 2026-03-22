/** Business type options for intake. Values are stored as-is; labels are for display. */
export const BUSINESS_TYPES = [
  { value: "bakery", label: "Bakery" },
  { value: "restaurant", label: "Restaurant / Café" },
  { value: "retail", label: "Retail store" },
  { value: "consulting", label: "Consulting / Professional services" },
  { value: "home_services", label: "Home services (cleaning, landscaping)" },
  { value: "trades", label: "Trades (plumbing, electrical, HVAC)" },
  { value: "ecommerce", label: "E-commerce / Online store" },
  { value: "photography", label: "Photography / Creative services" },
  { value: "fitness", label: "Fitness / Wellness" },
  { value: "childcare", label: "Childcare" },
  { value: "automotive", label: "Automotive (repair, detailing)" },
  { value: "construction", label: "Construction / Contracting" },
  { value: "salon", label: "Salon / Personal care" },
  { value: "other", label: "Other" },
] as const;

/** Location limited to BC for now. */
export const LOCATIONS = [
  { value: "British Columbia", label: "British Columbia" },
] as const;

/** Major BC cities for municipal license lookups. */
export const BC_CITIES = [
  "Vancouver",
  "Victoria",
  "Surrey",
  "Burnaby",
  "Richmond",
  "Abbotsford",
  "Coquitlam",
  "Kelowna",
  "Saanich",
  "Delta",
  "Langley",
  "Kamloops",
  "Nanaimo",
  "Prince George",
  "Chilliwack",
  "New Westminster",
  "Vernon",
  "Courtenay",
  "Fort St. John",
  "Penticton",
  "Campbell River",
  "Cranbrook",
  "Prince Rupert",
  "Dawson Creek",
  "Port Alberni",
  "Williams Lake",
  "Terrace",
  "Quesnel",
  "Other",
] as const;
