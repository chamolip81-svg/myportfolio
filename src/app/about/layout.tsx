import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Priyanshu Chamoli's academic IT background at Dehradun, learning philosophy, and hands-on explorations in networking, Linux, and cloud infrastructure.",
  path: "/about",
  keywords: ["education", "Dehradun", "background", "philosophy"],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
