import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmpireCraft — Private semi-vanilla Minecraft server",
  description:
    "A private, whitelisted Java Minecraft server. The community started in 2018, and Season 6 began in October 2025.",
  metadataBase: new URL("https://www.empirecraftmc.com"),
  openGraph: {
    title: "EmpireCraft — Private semi-vanilla Minecraft server",
    description:
      "A private, whitelisted Java Minecraft server. The community started in 2018, and Season 6 began in October 2025.",
    type: "website",
    url: "https://www.empirecraftmc.com",
    siteName: "EmpireCraft",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "EmpireCraft spawn with the words: Community since 2018. Season 6 since October 2025.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EmpireCraft — Private semi-vanilla Minecraft server",
    description:
      "A private, whitelisted Java Minecraft server. The community started in 2018, and Season 6 began in October 2025.",
    images: ["/og.png"],
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
