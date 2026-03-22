/** Structured representation of a single business permit/license requirement */
export interface PermitRequirement {
  id: string;
  title: string;
  description: string;
  authority: string;
  category: "mandatory" | "conditional" | "environmental" | "municipal" | "provincial" | "federal";
  applicableTo: string[];
  conditions: string[];
  links: string[];
  estimatedCost?: string;
  estimatedTimeline?: string;
  renewalPeriod?: string;
}

/** Result envelope wrapping extracted requirements with metadata */
export interface ExtractionResult {
  source: "orgbook-api" | "bc-data-catalogue" | "bc-registries-api" | "playwright-scrape";
  sourceUrl: string;
  extractedAt: string;
  language: "en" | "fr";
  businessType: string;
  province: string;
  requirements: PermitRequirement[];
  raw?: unknown;
}

/** Configuration for the scraper / API client */
export interface ScraperConfig {
  targetUrl?: string;
  businessType: string;
  province: string;
  language: "en" | "fr";
  mode: "api" | "scrape" | "auto";
  outputPath: string;
  headless: boolean;
  timeout: number;
}

/** BC Data Catalogue search result */
export interface BCDataCatalogueRecord {
  id: string;
  name: string;
  title: string;
  notes: string;
  url: string;
  resources: {
    id: string;
    name: string;
    url: string;
    format: string;
  }[];
}

/** OrgBook BC credential schema */
export interface OrgBookCredential {
  id: number;
  credential_type: {
    description: string;
    schema: string;
    issuer: {
      name: string;
      url: string;
    };
  };
  names: { text: string; language: string }[];
  topic: {
    source_id: string;
  };
}

export const DEFAULT_CONFIG: ScraperConfig = {
  businessType: "bakery",
  province: "BC",
  language: "en",
  mode: "auto",
  outputPath: "./output/requirements.json",
  headless: true,
  timeout: 30_000,
};
