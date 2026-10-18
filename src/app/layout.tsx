import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./kinetic.css";
import { SpaceField } from "@/components/portfolio/space-field";

const geist = localFont({
  src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  display: "optional",
  preload: true,
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eugenrmain.github.io/portfolio-page/"),
  title: "Eugen Ranow | AI, software & games",
  description:
    "Selected work by Eugen Ranow, a third-year Computer Science and Engineering student at KTH in Stockholm. AI pipelines, software, and Unity games.",
  icons: { icon: (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/icon.svg" },
  authors: [{ name: "Eugen Ranow" }],
  openGraph: {
    title: "Eugen Ranow",
    description: "AI, software & games. Selected projects and background.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <SpaceField />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
