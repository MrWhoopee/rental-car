import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import "modern-normalize";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RentalCar - Reliable Car Rental Service",
    template: "%s | RentalCar",
  },
  description:
    "Find your perfect rental car with MyRental - reliable and budget-friendly rentals for any journey in Ukraine.",
  keywords: ["car rental", "rent a car", "Ukraine", "budget rentals", "auto"],
};

import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
