import type { Metadata } from "next";
import "./globals.css";

const title = "EmpireCraft — Build Together";
const description =
  "A small, whitelisted Java SMP. Mostly vanilla, building together since 2018.";
const socialImage = {
  url: "/og-build-together.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "EmpireCraft’s mountain spawn and Nether portal with the words Build Together. A small, whitelisted Java SMP. Mostly vanilla, building together since 2018.",
};

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://www.empirecraftmc.com"),
  alternates: { canonical: "https://www.empirecraftmc.com/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://www.empirecraftmc.com",
    siteName: "EmpireCraft",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
