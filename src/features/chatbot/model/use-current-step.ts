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
    greeting: "Hi! 👋 You're on the BuildBeaver home page. What can I help you with on your journey to starting a business in BC?",
    systemContext: "The user is on the home page of BuildBeaver, a Canadian business start-up guide.",
  },
  "/intake": {
    label: "Intake form",
    greeting: "Hi! 👋 You're filling out the intake form. Let me know if you have questions about your business type or location.",
    systemContext: "The user is on the intake form page where they enter their business type, location, and business name.",
  },
  "/roadmap": {
    label: "Roadmap",
    greeting: "Hi! 👋 You're viewing your business roadmap. Each step takes you closer to launching. What would you like to know?",
    systemContext: "The user is on the roadmap page, which lists all 6 steps to start a business in BC: structure, registration, CRA business number, bank account, licenses, and accounting.",
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
        greeting: `Hi! 👋 You're on the **${step.title}** step. ${step.shortExplanation} How can I help?`,
        systemContext: `The user is on the "${step.title}" step. Description: ${step.shortExplanation}. Key points: ${step.bulletPoints.join(" | ")}.`,
      };
    }
  }

  return {
    label: "BuildBeaver",
    greeting: "Hi! 👋 How can I help you with your business in BC?",
    systemContext: "The user is navigating the BuildBeaver app, a Canadian business start-up guide.",
  };
}
