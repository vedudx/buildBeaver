import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IntakeProvider } from "@/entities/intake/model/intake-context";
import { FormDataProvider } from "@/entities/form/model/form-context";
import { ActiveFieldProvider } from "@/entities/form/model/active-field-context";
import { ProgressProvider } from "@/entities/progress/model/progress-context";
import { SiteHeader } from "@/shared/ui/site-header";
import { ChatbotButton } from "@/features/chatbot/ui/chatbot-button";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-sans antialiased">
        <IntakeProvider>
          <FormDataProvider>
            <ActiveFieldProvider>
              {children}
              <ChatbotButton />
            </ActiveFieldProvider>
          </FormDataProvider>
        </IntakeProvider>
      </body>
    </html>
  );
}
