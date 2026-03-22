import type {
  ScraperConfig,
  ExtractionResult,
  PermitRequirement,
  BCDataCatalogueRecord,
  OrgBookCredential,
} from "./types.js";

const ORGBOOK_BASE = "https://www.orgbook.gov.bc.ca/api/v4";
const BC_DATA_CATALOGUE_BASE = "https://catalogue.data.gov.bc.ca/api/3";
const BC_REGISTRIES_BASE = "https://bcregistry.ca/api/v1";

function log(source: string, msg: string) {
  console.log(`[${source}] ${msg}`);
}

async function fetchJson<T>(url: string, label: string): Promise<T | null> {
  try {
    log(label, `GET ${url}`);
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "BuildBeaver/1.0" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      log(label, `HTTP ${res.status} – ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    log(label, `Request failed: ${(err as Error).message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 1. OrgBook BC – verified business credentials
// ---------------------------------------------------------------------------
export async function queryOrgBook(
  config: ScraperConfig
): Promise<ExtractionResult | null> {
  const label = "OrgBook";
  log(label, `Searching for credential types related to "${config.businessType}"...`);

  const searchUrl = `${ORGBOOK_BASE}/search/credential_type?q=${encodeURIComponent(
    config.businessType
  )}`;
  const data = await fetchJson<{ results: OrgBookCredential[] }>(searchUrl, label);
  if (!data?.results?.length) {
    log(label, "No credential types found.");
    return null;
  }

  const requirements: PermitRequirement[] = data.results.map((cred, i) => ({
    id: `orgbook-${cred.id ?? i}`,
    title: cred.credential_type?.description ?? "BC Verified Credential",
    description: `Issued by ${cred.credential_type?.issuer?.name ?? "BC Registries"}`,
    authority: cred.credential_type?.issuer?.name ?? "BC Registries",
    category: "provincial" as const,
    applicableTo: [config.businessType],
    conditions: [],
    links: [cred.credential_type?.issuer?.url ?? "https://www.orgbook.gov.bc.ca"].filter(Boolean),
  }));

  log(label, `Found ${requirements.length} credential type(s).`);
  return {
    source: "orgbook-api",
    sourceUrl: searchUrl,
    extractedAt: new Date().toISOString(),
    language: config.language,
    businessType: config.businessType,
    province: config.province,
    requirements,
  };
}

// ---------------------------------------------------------------------------
// 2. BC Data Catalogue – open data search for permits / energy / licensing
// ---------------------------------------------------------------------------
export async function queryBCDataCatalogue(
  config: ScraperConfig
): Promise<ExtractionResult | null> {
  const label = "BCDataCatalogue";
  const searchTerms = [
    `${config.businessType} permit`,
    `${config.businessType} license`,
    "business permits",
    "food service permit",
  ];

  const allRequirements: PermitRequirement[] = [];
  const sourceUrls: string[] = [];

  for (const term of searchTerms) {
    const url = `${BC_DATA_CATALOGUE_BASE}/action/package_search?q=${encodeURIComponent(
      term
    )}&rows=5`;
    sourceUrls.push(url);

    const data = await fetchJson<{
      success: boolean;
      result: { results: BCDataCatalogueRecord[] };
    }>(url, label);

    if (!data?.success || !data.result?.results?.length) continue;

    for (const pkg of data.result.results) {
      const jsonResources = pkg.resources?.filter(
        (r) => r.format?.toLowerCase() === "json" || r.format?.toLowerCase() === "csv"
      );

      allRequirements.push({
        id: `bcdc-${pkg.id}`,
        title: pkg.title ?? pkg.name,
        description: (pkg.notes ?? "").slice(0, 500),
        authority: "BC Data Catalogue",
        category: "provincial",
        applicableTo: [config.businessType],
        conditions: [],
        links: [
          `https://catalogue.data.gov.bc.ca/dataset/${pkg.name}`,
          ...jsonResources.map((r) => r.url),
        ],
        estimatedCost: undefined,
        estimatedTimeline: undefined,
      });
    }
  }

  if (!allRequirements.length) {
    log(label, "No relevant datasets found.");
    return null;
  }

  const deduped = deduplicateById(allRequirements);
  log(label, `Found ${deduped.length} relevant dataset(s).`);

  return {
    source: "bc-data-catalogue",
    sourceUrl: sourceUrls[0],
    extractedAt: new Date().toISOString(),
    language: config.language,
    businessType: config.businessType,
    province: config.province,
    requirements: deduped,
  };
}

// ---------------------------------------------------------------------------
// 3. BC Registries API Gateway – business search
// ---------------------------------------------------------------------------
export async function queryBCRegistries(
  config: ScraperConfig
): Promise<ExtractionResult | null> {
  const label = "BCRegistries";
  log(label, `Searching BC Registries for "${config.businessType}" requirements...`);

  const searchUrl = `${BC_REGISTRIES_BASE}/businesses/search?query=${encodeURIComponent(
    config.businessType
  )}`;
  const data = await fetchJson<{ searchResults?: { results: unknown[] } }>(
    searchUrl,
    label
  );

  if (!data?.searchResults?.results?.length) {
    log(label, "No results from BC Registries gateway (may require API key).");

    return {
      source: "bc-registries-api",
      sourceUrl: "https://bcregistry.ca",
      extractedAt: new Date().toISOString(),
      language: config.language,
      businessType: config.businessType,
      province: config.province,
      requirements: [
        {
          id: "bcr-name-registration",
          title: "BC Business Name Registration",
          description:
            "Register your business name through BC Registries. Required for all businesses operating under a name other than the owner's legal name.",
          authority: "BC Registries and Online Services",
          category: "provincial",
          applicableTo: [config.businessType],
          conditions: ["Operating under a trade name"],
          links: [
            "https://www.bcregistry.gov.bc.ca/",
            "https://www.bcregistry.gov.bc.ca/businesses/create",
          ],
          estimatedCost: "$40 (sole proprietorship), $350+ (incorporation)",
          estimatedTimeline: "1-3 business days",
        },
        {
          id: "bcr-name-request",
          title: "BC Name Request",
          description:
            "Submit a Name Request to reserve your business name before registration.",
          authority: "BC Registries and Online Services",
          category: "provincial",
          applicableTo: [config.businessType],
          conditions: [],
          links: ["https://www.bcregistry.gov.bc.ca/businesses/create/name-request"],
          estimatedCost: "$30",
          estimatedTimeline: "2-5 business days",
        },
      ],
    };
  }

  return null;
}

function deduplicateById(items: PermitRequirement[]): PermitRequirement[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}
