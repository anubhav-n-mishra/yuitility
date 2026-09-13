import type { Metadata } from "next";
import { CATEGORIES } from "@/src/types";
import { LIVE_TOOLS, liveToolsInCategory } from "@/src/lib/toolRegistry";
import { absoluteUrl, CATEGORY_META, SITE_NAME, SITE_URL } from "@/src/lib/site";
import ToolsDirectoryClient from "../../components/ToolsDirectoryClient";

export const metadata: Metadata = {
  title: "Directory of All Tools & Calculators | Yuitility",
  description:
    "Explore every working Yuitility tool: finance calculators, PDF, image utilities, developer tools, and unit converters. 100% private, browser-based execution.",
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tools"),
    siteName: SITE_NAME,
    title: "Directory of All Tools & Calculators | Yuitility",
    description:
      "Explore every working Yuitility tool: finance calculators, PDF, image utilities, developer tools, and unit converters. 100% private, browser-based execution.",
    images: [{ url: absoluteUrl("/brand/yuitility-logo-512.png"), alt: "All Tools - Yuitility" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yuitility",
    creator: "@yuitility",
    title: "Directory of All Tools & Calculators | Yuitility",
    description:
      "Explore every working Yuitility tool: finance calculators, PDF, image utilities, developer tools, and unit converters. 100% private, browser-based execution.",
    images: [absoluteUrl("/brand/yuitility-logo-512.png")],
  },
};

export default function ToolsIndexPage() {
  const orderedCategories = CATEGORIES.filter((c) => c.id !== "all").filter(
    (c) => liveToolsInCategory(c.id).length > 0
  );

  return (
    <ToolsDirectoryClient orderedCategories={orderedCategories} />
  );
}
