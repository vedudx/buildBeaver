export type IntakeData = {
  businessType: string;
  location: string;
  businessName: string;
};

export type OwnershipType = "sole proprietorship" | "corporation";

export type StepType = "info" | "semi" | "form";

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
};
