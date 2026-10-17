import type { Metadata } from "next";
import AboutPageClient from "@/src/components/AboutPageClient";

import { SITE_NAME, SITE_URL } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "About Yuitility: Local Tools and Their Limits",
  description: "Learn more about Yuitility. How local file processing works, which optional features use servers, and how to verify tool assumptions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    title: "About Yuitility: Local Tools and Their Limits",
    description: "Learn more about Yuitility. How local file processing works, which optional features use servers, and how to verify tool assumptions.",
    images: [{ url: `${SITE_URL}/brand/yuitility-logo-512.png`, alt: "About Yuitility" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yuitility",
    creator: "@yuitility",
    title: "About Yuitility: Local Tools and Their Limits",
    description: "Learn more about Yuitility. How local file processing works, which optional features use servers, and how to verify tool assumptions.",
    images: [`${SITE_URL}/brand/yuitility-logo-512.png`],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
