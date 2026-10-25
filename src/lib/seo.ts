import type { Metadata } from "next";

export const siteBaseUrl = "https://www.priyanshuchamoli.dev";

export interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Set to "article" for technical notes; defaults to "website" */
  ogType?: "website" | "article";
  /** ISO date string for article:published_time (used when ogType is "article") */
  publishedTime?: string;
  /** ISO date string for article:modified_time (used when ogType is "article") */
  modifiedTime?: string;
}

const defaultBrandKeywords = [
  "Priyanshu Chamoli",
  "Priyanshu Chamoli developer",
  "Priyanshu Chamoli portfolio",
  "Priyanshu Chamoli LinkedIn",
];

/**
 * Generates canonical, framework-native metadata for any page
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataProps): Metadata {
  const url = path === "/" ? `${siteBaseUrl}/` : `${siteBaseUrl}${path}`;
  const resolvedKeywords = keywords && keywords.length > 0 ? keywords : defaultBrandKeywords;

  return {
    title,
    description,
    // Page-specific keywords take priority without stuffing unrelated tags
    keywords: resolvedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url,
      title: `${title} | Priyanshu Chamoli`,
      description,
      siteName: "Priyanshu Chamoli",
      ...(ogType === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
      images: [
        {
          url: `${siteBaseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${title} — Priyanshu Chamoli`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Priyanshu Chamoli`,
      description,
      creator: "@chamolip81",
      images: [`${siteBaseUrl}/opengraph-image`],
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
  dateModified,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  /** ISO date for dateModified; defaults to datePublished if omitted */
  dateModified?: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${siteBaseUrl}${path}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
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
