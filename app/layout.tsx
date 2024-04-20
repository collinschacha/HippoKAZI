import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KAZI",
  description: "Freelance website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          termsPageUrl: "https://clerk.com/terms",
          logoImageUrl: "/favicon.ico",
          logoPlacement: "inside",
        },
      }}
    >
      <html lang="en" className="h-full">
        <body
          className={cn(
            "relative h-full font-sans antialiased",
            inter.className
          )}
        >
          <main className=" relative flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
