import type { SourceLink } from "@/shared/types/business";

export const MUNICIPAL_LICENSE_LINKS: Record<string, SourceLink> = {
  Vancouver: {
    label: "City of Vancouver business licences",
    href: "https://vancouver.ca/doing-business/business-licences.aspx",
    note: "Official municipal licence page for businesses operating in or from Vancouver.",
  },
  Victoria: {
    label: "City of Victoria business licensing",
    href: "https://www.victoria.ca/building-business/business-licensing",
    note: "Official business licensing page, including application steps and contact details.",
  },
  Burnaby: {
    label: "City of Burnaby business licences",
    href: "https://www.burnaby.ca/business/business-licences",
    note: "Official page for new applications, renewals and business licence requirements.",
  },
  Richmond: {
    label: "City of Richmond business licences",
    href: "https://www.richmond.ca/business-development/resources/business-licences.htm",
    note: "Official Richmond business licensing page with application and portal information.",
  },
  Abbotsford: {
    label: "City of Abbotsford business licences",
    href: "https://www.abbotsford.ca/business-development/business-licences",
    note: "Official page covering licence applications, renewals and inspections.",
  },
  Coquitlam: {
    label: "City of Coquitlam business licences",
    href: "https://www.coquitlam.ca/602/Business-Licences",
    note: "Official business licence page with application and zoning guidance.",
  },
  Kelowna: {
    label: "City of Kelowna business licences",
    href: "https://www.kelowna.ca/business-services/permits-licences/business-licences",
    note: "Official licensing page with online application, renewals and contact details.",
  },
  Nanaimo: {
    label: "City of Nanaimo business licences",
    href: "https://www.nanaimo.ca/doing-business/business-licences",
    note: "Official licensing page with licence types, applications and municipal contacts.",
  },
  Langley: {
    label: "City of Langley business licences",
    href: "https://www.langleycity.ca/business-development/permits-licensing/business-licences",
    note: "Official page for business licence applications and intermunicipal licence details.",
  },
};
