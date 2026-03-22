import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IntakeProvider } from "@/entities/intake/model/intake-context";
import { FormDataProvider } from "@/entities/form/model/form-context";
import { ActiveFieldProvider } from "@/entities/form/model/active-field-context";
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
