import {
  createPageMetadata,
  createBreadcrumbSchema,
  createFaqSchema,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact & Collaboration",
  description:
    "Get in touch with Priyanshu Chamoli regarding technology discussions, undergraduate opportunities, networking/cloud questions, or collaborations.",
  path: "/contact",
  keywords: ["contact", "connect", "email", "LinkedIn", "GitHub", "hire"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const faqSchema = createFaqSchema([
    {
      question: "What kind of opportunities are you looking for?",
      answer:
        "As an IT undergraduate student, I am actively seeking internships, student developer positions, and collaborative projects in networking, cloud infrastructure, Linux systems, and software engineering.",
    },
    {
      question: "Are you open to discussing tech or virtual labs?",
      answer:
        "Absolutely! I enjoy discussing network topologies, TCP/IP nuances, Linux homelabs, and software design with fellow students and engineers.",
    },
    {
      question: "What is the typical response time?",
      answer:
        "I usually respond to email and LinkedIn messages within 24 to 48 hours.",
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema, faqSchema],
          }),
        }}
      />
      {children}
    </>
  );
}
