import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IntakeProvider } from "@/entities/intake/model/intake-context";
import { FormDataProvider } from "@/entities/form/model/form-context";
import { SiteHeader } from "@/shared/ui/site-header";

export const metadata: Metadata = {
  title: "BuildCanada",
  description: "Start your business from idea to launch.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <IntakeProvider>
          <FormDataProvider>
            <SiteHeader />
            {children}
          </FormDataProvider>
        </IntakeProvider>
      </body>
    </html>
  );
}
