import type { Metadata } from "next";

export const siteBaseUrl = "https://www.priyanshuchamoli.dev";

export interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

/**
 * Generates canonical, framework-native metadata for any page
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataProps): Metadata {
  const url = path === "/" ? `${siteBaseUrl}/` : `${siteBaseUrl}${path}`;

  return {
    title,
    description,
    keywords: [
      "Priyanshu Chamoli",
      "Priyanshu Chamoli developer",
      "Priyanshu Chamoli portfolio",
      "Priyanshu Chamoli LinkedIn",
      "Priyanshu Chamoli IT student",
      "IT student",
      "developer",
      "Dehradun",
      "networking",
      "Linux",
      "cloud computing",
      "virtual labs",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title: `${title} | Priyanshu Chamoli`,
      description,
      siteName: "Priyanshu Chamoli",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Priyanshu Chamoli`,
      description,
      creator: "@chamolip81",
    },
  };
}

/**
 * Creates BreadcrumbList JSON-LD structured data
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${siteBaseUrl}/` : `${siteBaseUrl}${item.path}`,
    })),
  };
}

/**
 * Creates TechArticle JSON-LD structured data for technical writeups
 */
export function createTechArticleSchema({
  title,
  description,
  path,
  datePublished,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${siteBaseUrl}${path}`,
    datePublished,
    author: {
      "@type": "Person",
      "@id": "https://www.priyanshuchamoli.dev/#person",
      name: "Priyanshu Chamoli",
      url: `${siteBaseUrl}/`,
    },
    publisher: {
      "@type": "Person",
      "@id": "https://www.priyanshuchamoli.dev/#person",
      name: "Priyanshu Chamoli",
    },
    keywords: tags.join(", "),
    inLanguage: "en-IN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteBaseUrl}${path}`,
    },
  };
}

/**
 * Creates CreativeWork / SoftwareApplication JSON-LD structured data for projects
 */
export function createProjectSchema({
  name,
  description,
  path,
  technologies,
}: {
  name: string;
  description: string;
  path: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    headline: name,
    description,
    url: `${siteBaseUrl}${path}`,
    author: {
      "@type": "Person",
      "@id": "https://www.priyanshuchamoli.dev/#person",
      name: "Priyanshu Chamoli",
      url: `${siteBaseUrl}/`,
    },
    keywords: technologies.join(", "),
  };
}
