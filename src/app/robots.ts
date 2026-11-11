import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Google-Extended",
          "Googlebot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.priyanshuchamoli.dev/sitemap.xml",
    host: "https://www.priyanshuchamoli.dev",
  };
}

