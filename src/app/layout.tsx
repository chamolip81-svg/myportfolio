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
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://www.priyanshuchamoli.dev/#profile",
                  url: "https://www.priyanshuchamoli.dev/",
                  name: "Priyanshu Chamoli — Portfolio",
                  mainEntity: { "@id": "https://www.priyanshuchamoli.dev/#person" },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
