import test from "node:test";
import assert from "node:assert/strict";
import {
  siteBaseUrl,
  createPageMetadata,
  createBreadcrumbSchema,
  createTechArticleSchema,
  createProjectSchema,
} from "./seo.ts";
import sitemap from "../app/sitemap.ts";
import robots from "../app/robots.ts";
import { siteConfig, education } from "./data.ts";

test("siteBaseUrl is valid HTTPS canonical URL", () => {
  assert.equal(siteBaseUrl, "https://www.priyanshuchamoli.dev");
  assert.ok(siteBaseUrl.startsWith("https://"));
  assert.ok(!siteBaseUrl.endsWith("/"));
});

test("siteConfig matches live identity & verified details", () => {
  assert.equal(siteConfig.name, "Priyanshu Chamoli");
  assert.equal(siteConfig.url, "https://www.priyanshuchamoli.dev");
  assert.equal(siteConfig.email, "chamolip81@gmail.com");
  assert.equal(siteConfig.github, "https://github.com/chamolip81-svg");
  assert.equal(siteConfig.linkedin, "https://www.linkedin.com/in/priyanshu-chamoli-67522532b");
  assert.ok(education.institution.includes("Combined (PG) Institute of Medical Sciences & Research"));
  assert.ok(education.institution.includes("CIMS"));
  assert.ok(education.location.includes("Dehradun"));
});

test("createPageMetadata generates proper canonical & OpenGraph tags", () => {
  // Home page test
  const homeMeta = createPageMetadata({
    title: "Priyanshu Chamoli | IT Student & Developer",
    description: "Official portfolio of Priyanshu Chamoli.",
    path: "/",
  });

  assert.equal(homeMeta.title, "Priyanshu Chamoli | IT Student & Developer");
  assert.equal(homeMeta.alternates?.canonical, "https://www.priyanshuchamoli.dev/");
  assert.equal(homeMeta.openGraph?.url, "https://www.priyanshuchamoli.dev/");
  assert.ok(Array.isArray(homeMeta.keywords));
  assert.ok(homeMeta.keywords.includes("Priyanshu Chamoli"));
  assert.ok(homeMeta.keywords.includes("Priyanshu Chamoli developer"));
  assert.ok(homeMeta.keywords.includes("Priyanshu Chamoli LinkedIn"));

  // Subpage test
  const aboutMeta = createPageMetadata({
    title: "About",
    description: "About Priyanshu Chamoli",
    path: "/about",
  });

  assert.equal(aboutMeta.alternates?.canonical, "https://www.priyanshuchamoli.dev/about");
  assert.equal(aboutMeta.openGraph?.url, "https://www.priyanshuchamoli.dev/about");
});

test("createBreadcrumbSchema produces valid Schema.org structure", () => {
  const schema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Travel Dost", path: "/projects/travel-dost" },
  ]);

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "BreadcrumbList");
  assert.equal(schema.itemListElement.length, 3);
  assert.equal(schema.itemListElement[0].item, "https://www.priyanshuchamoli.dev/");
  assert.equal(schema.itemListElement[1].item, "https://www.priyanshuchamoli.dev/projects");
  assert.equal(schema.itemListElement[2].item, "https://www.priyanshuchamoli.dev/projects/travel-dost");
});

test("createTechArticleSchema references author #person entity", () => {
  const schema = createTechArticleSchema({
    title: "TCP Handshake Lifecycle",
    description: "Deep dive into TCP packets",
    path: "/notes/tcp-handshake-lifecycle",
    datePublished: "2026-10-10",
    tags: ["TCP", "Networking"],
  });

  assert.equal(schema["@type"], "TechArticle");
  assert.equal(schema.author["@id"], "https://www.priyanshuchamoli.dev/#person");
  assert.equal(schema.author.name, "Priyanshu Chamoli");
  assert.equal(schema.url, "https://www.priyanshuchamoli.dev/notes/tcp-handshake-lifecycle");
});

test("createProjectSchema produces valid CreativeWork metadata", () => {
  const schema = createProjectSchema({
    name: "Travel Dost",
    description: "Responsive hotel catalog web application",
    path: "/projects/travel-dost",
    technologies: ["HTML5", "CSS3", "JavaScript"],
  });

  assert.equal(schema["@type"], "CreativeWork");
  assert.equal(schema.name, "Travel Dost");
  assert.equal(schema.author["@id"], "https://www.priyanshuchamoli.dev/#person");
});

test("sitemap generates canonical non-redirecting URLs with valid dates", () => {
  const routes = sitemap();
  assert.ok(routes.length >= 10, "Expected at least 10 sitemap entries");

  for (const entry of routes) {
    assert.ok(
      entry.url.startsWith("https://www.priyanshuchamoli.dev"),
      `URL ${entry.url} does not start with preferred canonical hostname`
    );
    assert.ok(!entry.url.includes("//about") && !entry.url.includes("//projects"), `Malformed double slash in ${entry.url}`);
    assert.ok(entry.lastModified instanceof Date, `lastModified must be a valid Date object for ${entry.url}`);
    assert.ok(!isNaN(entry.lastModified.getTime()), `lastModified date is invalid for ${entry.url}`);
  }

  // Ensure root URL is present
  const rootEntry = routes.find((r) => r.url === "https://www.priyanshuchamoli.dev");
  assert.ok(rootEntry, "Root URL must be present in sitemap");
  assert.equal(rootEntry.priority, 1.0);

  // Ensure Travel Dost is present
  const travelDostEntry = routes.find((r) => r.url === "https://www.priyanshuchamoli.dev/projects/travel-dost");
  assert.ok(travelDostEntry, "Travel Dost project route must be present in sitemap");
});

test("robots.txt config allows crawling and references canonical sitemap", () => {
  const config = robots();
  assert.equal(config.sitemap, "https://www.priyanshuchamoli.dev/sitemap.xml");
  assert.equal(config.host, "https://www.priyanshuchamoli.dev");
  const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
  assert.equal(rules.userAgent, "*");
  assert.equal(rules.allow, "/");
});

test("createPageMetadata includes valid absolute OpenGraph & Twitter images", () => {
  const meta = createPageMetadata({
    title: "About",
    description: "About description",
    path: "/about",
  });

  const ogImages = meta.openGraph?.images as Array<{ url: string; width: number; height: number }>;
  assert.ok(Array.isArray(ogImages) && ogImages.length > 0);
  assert.equal(ogImages[0].url, "https://www.priyanshuchamoli.dev/opengraph-image");
  assert.equal(ogImages[0].width, 1200);
  assert.equal(ogImages[0].height, 630);

  const twitterImages = meta.twitter?.images as string[];
  assert.ok(Array.isArray(twitterImages) && twitterImages.length > 0);
  assert.equal(twitterImages[0], "https://www.priyanshuchamoli.dev/opengraph-image");
});
