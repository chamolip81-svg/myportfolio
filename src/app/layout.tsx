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
  metadataBase: new URL("https://priyanshuchamoli.dev"),
  title: {
    default: "Priyanshu Chamoli | IT Student & Developer",
    template: "%s | Priyanshu Chamoli",
  },
  description:
    "Priyanshu Chamoli is an IT student and developer from Dehradun, India, exploring networking, cloud computing, Linux, virtual labs, security fundamentals and software development.",
  keywords: [
    "Priyanshu Chamoli",
    "IT student",
    "developer",
    "Dehradun",
    "networking",
    "cloud computing",
    "Linux",
    "web development",
    "virtual labs",
    "TCP/IP",
  ],
  authors: [{ name: "Priyanshu Chamoli", url: "https://priyanshuchamoli.dev" }],
  creator: "Priyanshu Chamoli",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://priyanshuchamoli.dev",
    title: "Priyanshu Chamoli | IT Student & Developer",
    description:
      "IT student and developer from Dehradun, India, exploring networking, cloud computing, Linux, virtual labs, security fundamentals and software development.",
    siteName: "Priyanshu Chamoli",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Chamoli | IT Student & Developer",
    description:
      "IT student and developer from Dehradun, India, exploring networking, cloud computing, Linux, and software development.",
    creator: "@chamolip81",
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
                  "@id": "https://priyanshuchamoli.dev/#person",
                  name: "Priyanshu Chamoli",
                  jobTitle: "IT Student & Developer",
                  description:
                    "IT undergraduate student and developer exploring networking, cloud computing, Linux administration, and software development.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Dehradun",
                    addressRegion: "Uttarakhand",
                    addressCountry: "IN",
                  },
                  email: "chamolip81@gmail.com",
                  url: "https://priyanshuchamoli.dev",
                  sameAs: [
                    "https://github.com/chamolip81-svg",
                    "https://www.linkedin.com/in/priyanshu-chamoli-67522532b",
                  ],
                  knowsAbout: [
                    "Computer Networking",
                    "TCP/IP Protocols",
                    "Subnetting & CIDR",
                    "Linux Administration",
                    "Cloud Computing",
                    "Web Development",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://priyanshuchamoli.dev/#website",
                  name: "Priyanshu Chamoli",
                  url: "https://priyanshuchamoli.dev",
                  description:
                    "Portfolio and technical lab environment of Priyanshu Chamoli, an IT student and developer from Dehradun, India.",
                  author: { "@id": "https://priyanshuchamoli.dev/#person" },
                  publisher: { "@id": "https://priyanshuchamoli.dev/#person" },
                  inLanguage: "en-IN",
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://priyanshuchamoli.dev/#profile",
                  url: "https://priyanshuchamoli.dev",
                  name: "Priyanshu Chamoli — Portfolio",
                  mainEntity: { "@id": "https://priyanshuchamoli.dev/#person" },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
