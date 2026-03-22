import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IntakeProvider } from "@/entities/intake/model/intake-context";

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
        <IntakeProvider>{children}</IntakeProvider>
      </body>
    </html>
  );
}
