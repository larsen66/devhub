import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { SpotlightCursor } from "./components/spotlight-cursor";
import { DesktopOnly } from "./components/desktop-only";
import Particles from "./components/particles";

export const metadata: Metadata = {
  metadataBase: new URL("https://chronark.com"),
  title: {
    default: "DevHub",
    template: "%s | DevHub",
  },
  description: "Co-founder of unkey.dev and founder of planetfall.io",
  openGraph: {
    title: "DevHub",
    description:
      "Co-founder of unkey.dev and founder of planetfall.io",
    url: "https://chronark.com",
    siteName: "DevHub",
    images: [
      {
        url: "https://chronark.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "DevHub",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body className="bg-black">
        <DesktopOnly>
          <SpotlightCursor />
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
        </DesktopOnly>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
