import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IntakeProvider } from "@/entities/intake/model/intake-context";
import { FormDataProvider } from "@/entities/form/model/form-context";
import { ActiveFieldProvider } from "@/entities/form/model/active-field-context";
import { ProgressProvider } from "@/entities/progress/model/progress-context";
import { SiteHeader } from "@/shared/ui/site-header";
import { ChatbotButton } from "@/features/chatbot/ui/chatbot-button";

export const metadata: Metadata = {
  title: "BuildBeaver",
  description: "Guided B.C. business setup with official resource links and practical startup support.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <IntakeProvider>
          <FormDataProvider>
            <ProgressProvider>
              <ActiveFieldProvider>
                <SiteHeader />
                {children}
                <ChatbotButton />
              </ActiveFieldProvider>
            </ProgressProvider>
          </FormDataProvider>
        </IntakeProvider>
      </body>
    </html>
  );
}
