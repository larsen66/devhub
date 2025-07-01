import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { SpotlightCursor } from "./components/spotlight-cursor";
import { DesktopOnly } from "./components/desktop-only";

export const metadata: Metadata = {
  metadataBase: new URL("https://chronark.com"),
  title: {
    default: "DevHub",
    template: "%s | DevHub",
  },
  description: "DevHub - Transforming ideas into high-performance web and mobile applications.",
  openGraph: {
    title: "DevHub",
    description: "DevHub - Transforming ideas into high-performance web and mobile applications.",
    url: "devhub.ge",
    siteName: "DevHub",
    images: [
      {
        url: "devhub.ge/og.png",
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
        </DesktopOnly>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
