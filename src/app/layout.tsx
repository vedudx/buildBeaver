import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IntakeProvider } from "@/entities/intake/model/intake-context";
import { FormDataProvider } from "@/entities/form/model/form-context";
import { SiteHeader } from "@/shared/ui/site-header";
import { ChatbotButton } from "@/features/chatbot/ui/chatbot-button";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildBeaver",
  description: "Start your business from idea to launch.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <IntakeProvider>
          <FormDataProvider>
            <SiteHeader />
            {children}
          </FormDataProvider>
          <FormDataProvider>{children}</FormDataProvider>
          <ChatbotButton />
        </IntakeProvider>
      </body>
    </html>
  );
}
