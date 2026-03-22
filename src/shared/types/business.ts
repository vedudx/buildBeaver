export type IntakeData = {
  businessType: string;
  location: string;
  businessName: string;
};

export type OwnershipType = "sole proprietorship" | "corporation";

export type StepType = "info" | "semi" | "form";

export type PermitRequirement = {
  id: string;
  title: string;
  description: string;
  authority: string;
  category: "mandatory" | "conditional" | "environmental" | "municipal" | "provincial" | "federal";
  links: string[];
  estimatedCost?: string;
  estimatedTimeline?: string;
};

export type StepConfig = {
  id: string;
  title: string;
  shortExplanation: string;
  bulletPoints: string[];
  optionalLink?: {
    href: string;
    label: string;
  };
  type: StepType;
  formFields?: Array<"business_name" | "ownership_type" | "address" | "start_date">;
  permits?: PermitRequirement[];
};
