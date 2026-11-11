import test from "node:test";
import assert from "node:assert/strict";
import {
  siteBaseUrl,
  createPageMetadata,
  createBreadcrumbSchema,
  createTechArticleSchema,
  createProjectSchema,
  createFaqSchema,
} from "./seo.ts";
import sitemap from "../app/sitemap.ts";
import robots from "../app/robots.ts";
import { siteConfig, education } from "./data.ts";
import { GET as getLLMsTxt } from "../app/llms.txt/route.ts";

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

  // Ensure Network Quest is present
  const questEntry = routes.find((r) => r.url === "https://www.priyanshuchamoli.dev/network-quest");
  assert.ok(questEntry, "Network Quest route must be present in sitemap");
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

test("createFaqSchema produces valid FAQPage Schema.org structure for AI Overviews", () => {
  const faqs = [
    { question: "Who is Priyanshu?", answer: "Priyanshu is an IT student." },
    { question: "What is Network Quest?", answer: "An interactive network simulator." },
  ];
  const schema = createFaqSchema(faqs);

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "FAQPage");
  assert.equal(schema.mainEntity.length, 2);
  assert.equal(schema.mainEntity[0]["@type"], "Question");
  assert.equal(schema.mainEntity[0].name, "Who is Priyanshu?");
  assert.equal(schema.mainEntity[0].acceptedAnswer["@type"], "Answer");
  assert.equal(schema.mainEntity[0].acceptedAnswer.text, "Priyanshu is an IT student.");
});

test("llms.txt route returns valid 200 text/plain markdown for AI agents", async () => {
  const response = getLLMsTxt();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/plain; charset=utf-8");

  const body = await response.text();
  assert.ok(body.includes("# Priyanshu Chamoli"));
  assert.ok(body.includes("Network Quest"));
  assert.ok(body.includes("Computer Networking"));
  assert.ok(body.includes("Linux"));
  assert.ok(body.includes("Dehradun"));
  assert.ok(body.includes("https://www.priyanshuchamoli.dev/"));
});

test("sitemap.xml includes /llms.txt for AI discovery", () => {
  const routes = sitemap();
  const llmEntry = routes.find((r) => r.url === "https://www.priyanshuchamoli.dev/llms.txt");
  assert.ok(llmEntry, "Expected /llms.txt to be listed in sitemap");
  assert.equal(llmEntry.priority, 0.8);
});

test("robots.txt explicitly permits AI crawlers (Google-Extended, PerplexityBot, GPTBot, ClaudeBot)", () => {
  const config = robots();
  assert.ok(Array.isArray(config.rules));
  const aiRule = config.rules.find((r) => Array.isArray(r.userAgent) && r.userAgent.includes("Google-Extended"));
  assert.ok(aiRule, "Expected dedicated AI bot rule in robots.txt");
  assert.ok(Array.isArray(aiRule.userAgent));
  assert.ok(aiRule.userAgent.includes("Googlebot"));
  assert.ok(aiRule.userAgent.includes("Google-Extended"));
  assert.ok(aiRule.userAgent.includes("GPTBot"));
  assert.ok(aiRule.userAgent.includes("PerplexityBot"));
  assert.ok(aiRule.userAgent.includes("ClaudeBot"));
  assert.equal(aiRule.allow, "/");
});

test("next.config includes HSTS, removes poweredByHeader, and enables AVIF/WebP", async () => {
  const nextConfigModule = await import("../../next.config.ts");
  const config = nextConfigModule.default;
  assert.equal(config.poweredByHeader, false);
  assert.equal(config.compress, true);
  assert.deepEqual(config.images?.formats, ["image/avif", "image/webp"]);

  const headers = await config.headers?.();
  assert.ok(Array.isArray(headers) && headers.length > 0);
  const globalHeaders = headers.find((h: { source: string }) => h.source === "/:path*");
  assert.ok(globalHeaders, "Expected global headers config");
  const hsts = globalHeaders.headers.find(
    (h: { key: string }) => h.key === "Strict-Transport-Security"
  );
  assert.ok(hsts, "Expected Strict-Transport-Security header");
  assert.ok(hsts.value.includes("max-age=63072000"));
});


