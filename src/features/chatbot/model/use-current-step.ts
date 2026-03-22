"use client";

import { usePathname } from "next/navigation";
import { getStepById } from "@/shared/constants/steps";

export type PageContext = {
  label: string;
  greeting: string;
  systemContext: string;
};

const PAGE_MAP: Record<string, PageContext> = {
  "/": {
    label: "Home",
    greeting: "Hi! You're on the BuildBeaver home page. What can I help you confirm about starting a business in B.C.?",
    systemContext: "The user is on the home page of BuildBeaver, a B.C. business start-up guide.",
  },
  "/intake": {
    label: "Intake form",
    greeting: "Hi! You're filling out the intake form. Ask if you want help choosing the closest business type or preparing for B.C. requirements.",
    systemContext: "The user is on the intake form page where they enter their B.C. business type, city and business name.",
  },
  "/roadmap": {
    label: "Roadmap",
    greeting: "Hi! You're viewing your B.C. roadmap. I can help you understand the next step or point you to the right official source.",
    systemContext: "The user is on the roadmap page, which lists all 6 steps to start a business in B.C.: structure, registration, CRA business number, bank account, licences, and accounting.",
  },
};

export function useCurrentStep(): PageContext {
  const pathname = usePathname();

  if (pathname in PAGE_MAP) {
    return PAGE_MAP[pathname];
  }

  const stepMatch = pathname.match(/^\/step\/([^/]+)$/);
  if (stepMatch) {
    const stepId = stepMatch[1];
    const step = getStepById(stepId);
    if (step) {
      return {
        label: step.title,
        greeting: `Hi! You're on the ${step.title} step. ${step.shortExplanation} How can I help?`,
        systemContext: `The user is on the "${step.title}" step. Description: ${step.shortExplanation}. Key points: ${step.bulletPoints.join(" | ")}.`,
      };
    }
  }

  return {
    label: "BuildBeaver",
    greeting: "Hi! How can I help you with your business in B.C.?",
    systemContext: "The user is navigating the BuildBeaver app, a B.C. business start-up guide.",
  };
}
