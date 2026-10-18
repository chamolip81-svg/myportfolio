import type { MetadataRoute } from "next";
import { technicalNotes } from "../lib/data.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.priyanshuchamoli.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/travel-dost`,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/labs`,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/setup`,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-10-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const noteDates: Record<string, string> = {
    "tcp-handshake-lifecycle": "2026-10-10T00:00:00.000Z",
    "cidr-subnetting-guide": "2026-09-20T00:00:00.000Z",
    "containers-vs-vms": "2026-08-15T00:00:00.000Z",
    "dns-resolution-path": "2026-07-28T00:00:00.000Z",
  };

  const noteRoutes: MetadataRoute.Sitemap = technicalNotes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(noteDates[note.slug] || "2026-10-01T00:00:00.000Z"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...noteRoutes];
}
