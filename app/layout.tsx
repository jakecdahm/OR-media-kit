import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Residency — Media Kit",
  description:
    "Cross-platform podcast analytics for Open Residency. 1.8M+ views, 255K+ watch hours, 27K+ subscribers.",
  openGraph: {
    title: "Open Residency — Media Kit",
    description:
      "Cross-platform podcast analytics for Open Residency. 1.8M+ views across YouTube and all major podcast platforms.",
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
