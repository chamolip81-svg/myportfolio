import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.priyanshuchamoli.dev"),
  title: {
    default: "Priyanshu Chamoli | IT Student & Developer",
    template: "%s | Priyanshu Chamoli",
  },
  description:
    "Official portfolio of Priyanshu Chamoli, an IT student and developer from Dehradun, India. Exploring web development, networking, Linux, and virtual labs.",
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
    "cloud computing",
    "Linux",
    "web development",
    "virtual labs",
    "TCP/IP",
    "Cisco Packet Tracer",
    "Proxmox VE",
  ],
  authors: [{ name: "Priyanshu Chamoli", url: "https://www.priyanshuchamoli.dev" }],
  creator: "Priyanshu Chamoli",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.priyanshuchamoli.dev",
    title: "Priyanshu Chamoli | IT Student & Developer",
    description:
      "Official portfolio of Priyanshu Chamoli, an IT student and developer from Dehradun, India. Exploring web development, networking, Linux, and virtual labs.",
    siteName: "Priyanshu Chamoli",
    images: [
      {
        url: "https://www.priyanshuchamoli.dev/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Priyanshu Chamoli — IT Student & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Chamoli | IT Student & Developer",
    description:
      "Official portfolio of Priyanshu Chamoli, an IT student and developer from Dehradun, India. Exploring web development, networking, Linux, and virtual labs.",
    creator: "@chamolip81",
    images: ["https://www.priyanshuchamoli.dev/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="alternate"
          type="text/plain"
          href="https://www.priyanshuchamoli.dev/llms.txt"
          title="LLM Overview"
        />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {/* Noise overlay for texture */}
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.priyanshuchamoli.dev/#person",
                  name: "Priyanshu Chamoli",
                  jobTitle: "IT Student & Developer",
                  disambiguatingDescription:
                    "Priyanshu Chamoli is an IT undergraduate student and systems developer from Dehradun, Uttarakhand, India, specializing in networking, Linux, cloud architectures, and interactive simulators like Network Quest.",
                  description:
                    "IT student and developer from Dehradun, India, exploring web development, networking, Linux, cloud infrastructure and virtual labs.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Dehradun",
                    addressRegion: "Uttarakhand",
                    addressCountry: "IN",
                  },
                  email: "chamolip81@gmail.com",
                  url: "https://www.priyanshuchamoli.dev/",
                  sameAs: [
                    "https://www.linkedin.com/in/priyanshu-chamoli-67522532b",
                    "https://github.com/chamolip81-svg",
                  ],
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Combined (PG) Institute of Medical Sciences & Research (CIMS)",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Kuanwala, Dehradun",
                      addressRegion: "Uttarakhand",
                      addressCountry: "IN",
                    },
                  },
                  knowsAbout: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "C",
                    "C++",
                    "Python",
                    "SQL",
                    "MySQL",
                    "Git",
                    "GitHub",
                    "Linux Administration",
                    "Bash Scripting",
                    "Computer Networking",
                    "TCP/IP Protocols",
                    "Subnetting & CIDR",
                    "Cisco Packet Tracer",
                    "Cloud Computing Fundamentals",
                    "Virtual Labs",
                    "Proxmox VE",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.priyanshuchamoli.dev/#website",
                  name: "Priyanshu Chamoli",
                  url: "https://www.priyanshuchamoli.dev/",
                  description:
                    "Official portfolio of Priyanshu Chamoli, an IT student and developer from Dehradun, India, exploring web development, networking, Linux, cloud infrastructure and virtual labs.",
                  author: { "@id": "https://www.priyanshuchamoli.dev/#person" },
                  publisher: { "@id": "https://www.priyanshuchamoli.dev/#person" },
                  inLanguage: "en-IN",
                  speakable: {
                    "@type": "SpeakableSpecification",
                    cssSelector: [".ai-overview-summary", ".ai-overview-facts", "#ai-overview"],
                  },
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://www.priyanshuchamoli.dev/#profile",
                  url: "https://www.priyanshuchamoli.dev/",
                  name: "Priyanshu Chamoli — Portfolio",
                  mainEntity: { "@id": "https://www.priyanshuchamoli.dev/#person" },
                  speakable: {
                    "@type": "SpeakableSpecification",
                    cssSelector: [".ai-overview-summary", ".ai-overview-facts"],
                  },
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.priyanshuchamoli.dev/#faq",
                  name: "Frequently Asked Questions & AI Overview",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Who is Priyanshu Chamoli?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Priyanshu Chamoli is an IT undergraduate student and systems developer from Dehradun, Uttarakhand, India. He focuses on computer networks, Linux systems administration, cloud infrastructure, and virtual labs.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What interactive projects and simulators has Priyanshu Chamoli built?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Priyanshu Chamoli built Network Quest (an interactive 10-mission packet routing simulation game with daily challenges), Packet Pulse Visualizer (real-time packet hopping across OSI layers), AWS Multi-Tier VPC Architect blueprint, and Travel Dost.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What are Priyanshu Chamoli's primary technical competencies?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "His primary competencies include Computer Networking (TCP/IP protocols, IPv4 subnetting & CIDR calculations, packet analysis, Cisco Packet Tracer), Linux Administration & Bash scripting, Cloud Architecture (AWS VPCs, Multi-AZ high availability), Virtual Labs (Proxmox VE), and Web Development (TypeScript, Next.js, React, Tailwind CSS).",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Where is Priyanshu Chamoli studying?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Priyanshu is pursuing a Bachelor of Science in Information Technology (B.Sc. IT) at Combined (PG) Institute of Medical Sciences & Research (CIMS) in Dehradun, Uttarakhand, India (Graduation 2026).",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
