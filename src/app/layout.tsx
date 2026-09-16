import type {
  Metadata,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import {
  Analytics,
} from "@vercel/analytics/next";

import "@/styles/animations.css";
import "./globals.css";

import {
  siteConfig,
} from "@/config/site";

import {
  JsonLd,
} from "@/componentes/seo/JsonLd";

import {
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/structuredData";

import {
  IntroScreen,
} from "@/componentes/intro";


const geistSans =
  Geist({
    variable:
      "--font-geist-sans",

    subsets: [
      "latin",
    ],
  });


const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: [
      "latin",
    ],
  });


export const metadata: Metadata = {
  metadataBase:
    new URL(
      siteConfig.url,
    ),

  title: {
    default:
      siteConfig.name,

    template:
      `%s | ${siteConfig.name}`,
  },

  description:
    siteConfig.description.es,

  applicationName:
    siteConfig.name,

  authors: [
    {
      name:
        siteConfig.name,
    },
  ],

  creator:
    siteConfig.name,

  publisher:
    siteConfig.name,

  openGraph: {
    type:
      "website",

    siteName:
      siteConfig.name,

    title:
      siteConfig.name,

    description:
      siteConfig.description.es,

    url:
      siteConfig.url,
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      siteConfig.name,

    description:
      siteConfig.description.es,
  },
};


export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>

        <IntroScreen />

        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
          ]}
        />

        {children}

        <Analytics />

      </body>

      {/* Google Analytics requiere una integración de consentimiento previa.
          No activarlo automáticamente al configurar una variable de entorno. */}

    </html>
  );
}
