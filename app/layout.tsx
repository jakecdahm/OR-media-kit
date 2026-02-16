import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Residency — Partnership Deck",
  description:
    "The podcast for founders and operators. 1.8M+ cross-platform views, 15.2M impressions, 472% stream growth. Hosted by Mark Brazil.",
  openGraph: {
    title: "Open Residency — Partnership Deck",
    description:
      "The podcast for founders and operators. 1.8M+ cross-platform views, 15.2M impressions, 472% stream growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg text-neutral-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
