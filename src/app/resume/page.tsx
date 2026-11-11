"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Mail,
  MapPin,
  Globe,
  GraduationCap,
  Code2,
  Layers,
  Network,
} from "lucide-react";
import { siteConfig, education } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="bg-grid-fine absolute inset-0 opacity-20 pointer-events-none no-print" />

      <div className="section-container relative z-10 max-w-4xl mx-auto">
        {/* Top Controls (Hidden on Print) */}
        <div className="flex items-center justify-between gap-4 mb-8 no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="btn-primary text-xs cursor-pointer shadow-md"
            id="print-resume-btn"
            aria-label="Print or save resume as PDF"
          >
            <Printer size={14} />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* ATS Resume Sheet Container */}
        <article
          className="glass-card p-8 sm:p-12 print:p-0 print:border-none print:bg-white print:text-black print:shadow-none shadow-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        >
          {/* Header */}
          <header className="border-b border-[var(--border-primary)] pb-6 mb-8 print:border-gray-300">
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 print:text-black"
              style={{ color: "var(--text-primary)" }}
            >
              {siteConfig.name}
            </h1>
            <p
              className="text-base sm:text-lg font-mono font-medium mb-4 print:text-gray-700"
              style={{ color: "var(--accent-blue)" }}
            >
              Full-Stack & Frontend Developer • Systems & Cloud Enthusiast
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--text-secondary)] print:text-gray-600">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} /> {siteConfig.location}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                <Mail size={13} /> {siteConfig.email}
              </a>
              <a
                href={siteConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                <Globe size={13} /> priyanshuchamoli.dev
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                <GithubIcon size={13} /> github.com/chamolip81-svg
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                <LinkedinIcon size={13} /> linkedin.com/in/priyanshu-chamoli
              </a>
            </div>
          </header>

          {/* Education */}
          <section className="mb-8" aria-labelledby="resume-education">
            <h2
              id="resume-education"
              className="text-sm font-mono font-bold uppercase tracking-wider mb-4 pb-1 border-b border-[var(--border-primary)] print:border-gray-300 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <GraduationCap size={16} className="text-blue-400 no-print" />
              <span>Education</span>
            </h2>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="font-bold text-sm sm:text-base print:text-black" style={{ color: "var(--text-primary)" }}>
                  {education.degree} in {education.field}
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] print:text-gray-500">
                  {education.status} (Graduation 2026)
                </div>
              </div>
              <div className="text-xs text-[var(--text-secondary)] print:text-gray-700">
                {education.institution} • {education.location}
              </div>
              <div className="text-xs text-[var(--text-muted)] print:text-gray-600 pt-1">
                <strong>Core Coursework:</strong> {education.areas.join(", ")}
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-8" aria-labelledby="resume-skills">
            <h2
              id="resume-skills"
              className="text-sm font-mono font-bold uppercase tracking-wider mb-4 pb-1 border-b border-[var(--border-primary)] print:border-gray-300 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <Code2 size={16} className="text-blue-400 no-print" />
              <span>Technical Skills</span>
            </h2>
            <div className="space-y-2.5 text-xs">
              <div>
                <strong className="font-mono text-[var(--text-primary)] print:text-black">Languages: </strong>
                <span className="text-[var(--text-secondary)] print:text-gray-700">
                  C, C++, JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, SQL.
                </span>
              </div>
              <div>
                <strong className="font-mono text-[var(--text-primary)] print:text-black">Frontend & Full-Stack: </strong>
                <span className="text-[var(--text-secondary)] print:text-gray-700">
                  React, Next.js (App Router, Turbopack, SSG), Node.js, Express.js, REST APIs, Progressive Web Apps (PWA), Tailwind CSS.
                </span>
              </div>
              <div>
                <strong className="font-mono text-[var(--text-primary)] print:text-black">Systems & Cloud Infrastructure: </strong>
                <span className="text-[var(--text-secondary)] print:text-gray-700">
                  Linux Administration (Ubuntu, Debian, WSL2), Bash Scripting, Computer Networking (TCP/IP, Subnetting & CIDR, Routing Protocols, DNS), VirtualBox, Proxmox VE, AWS VPC Architecture.
                </span>
              </div>
              <div>
                <strong className="font-mono text-[var(--text-primary)] print:text-black">Developer Tools & Diagnostics: </strong>
                <span className="text-[var(--text-secondary)] print:text-gray-700">
                  Git, GitHub, Wireshark, Postman, Cisco Packet Tracer, VS Code.
                </span>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-8" aria-labelledby="resume-projects">
            <h2
              id="resume-projects"
              className="text-sm font-mono font-bold uppercase tracking-wider mb-4 pb-1 border-b border-[var(--border-primary)] print:border-gray-300 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <Layers size={16} className="text-blue-400 no-print" />
              <span>Verified Engineering Projects</span>
            </h2>

            <div className="space-y-6">
              {/* Project 1: Auralyn */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="font-bold text-sm text-[var(--text-primary)] print:text-black flex items-center gap-2">
                    <span>Auralyn: Full-Stack Audio Streaming Platform & API</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 no-print">
                      Full-Stack
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[var(--text-muted)] print:text-gray-500">
                    React, Node.js, Express, Python Flask
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-secondary)] print:text-gray-700 leading-relaxed">
                  <li>
                    Architected a full-stack audio streaming progressive web application with a decoupled Node.js Express REST API gateway.
                  </li>
                  <li>
                    Designed a persistent singleton audio controller outside React component lifecycles, enabling uninterrupted music playback across client route changes.
                  </li>
                  <li>
                    Configured production CORS regex validation on Express to securely proxy audio stream headers across Railway and Vercel domains.
                  </li>
                  <li>
                    Integrated Python Flask stream extractor resolving track metadata and HTTP 206 Partial Content byte ranges.
                  </li>
                </ul>
              </div>

              {/* Project 2: Network Quest */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="font-bold text-sm text-[var(--text-primary)] print:text-black flex items-center gap-2">
                    <span>Network Quest: Interactive Networking Simulator Engine</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 no-print">
                      Simulation
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[var(--text-muted)] print:text-gray-500">
                    TypeScript, Next.js, Canvas API, RFC Protocols
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-secondary)] print:text-gray-700 leading-relaxed">
                  <li>
                    Developed a 100% client-side networking simulation engine modeling OSI Layers 1 through 7 across 10 interactive missions.
                  </li>
                  <li>
                    Implemented stateful packet engines simulating ARP resolution, subnet matching, gateway routing, and TCP 3-way handshakes.
                  </li>
                  <li>
                    Engineered a deterministic daily challenge generator using seeded pseudo-random IP allocation for practice on RFC 3021 /31 subnets.
                  </li>
                  <li>
                    Rendered dynamic packet trajectories on an HTML5 Canvas node mesh with 60 FPS requestAnimationFrame animations.
                  </li>
                </ul>
              </div>

              {/* Project 3: Travel Dost */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="font-bold text-sm text-[var(--text-primary)] print:text-black flex items-center gap-2">
                    <span>Travel Dost: Hotel Discovery Web Application</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 no-print">
                      Web App
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[var(--text-muted)] print:text-gray-500">
                    HTML5, CSS3, JavaScript, Responsive UI, MySQL
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-secondary)] print:text-gray-700 leading-relaxed">
                  <li>
                    Created a responsive web application for exploring hotel listings with tiered price and accommodation filtering.
                  </li>
                  <li>
                    Implemented semantic DOM manipulation and clean CSS flexbox/grid layout systems optimized for mobile viewports.
                  </li>
                  <li>
                    Designed relational database schema in MySQL for hotel accommodations, amenities, and room inventories.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Articles & Writing */}
          <section aria-labelledby="resume-writing">
            <h2
              id="resume-writing"
              className="text-sm font-mono font-bold uppercase tracking-wider mb-4 pb-1 border-b border-[var(--border-primary)] print:border-gray-300 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <Network size={16} className="text-blue-400 no-print" />
              <span>Technical Publications & Architecture Notes</span>
            </h2>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] print:text-gray-700">
              <li>
                <strong>State Management & Buffering in In-Browser Audio Streaming Engines:</strong> First-principles analysis of HTML5 Audio events, React state synchronization, and CORS proxying.
              </li>
              <li>
                <strong>Deconstructing the TCP 3-Way Handshake & State Machine:</strong> Sequence number synchronization, SYN-ACK-ACK flows, and connection teardown.
              </li>
              <li>
                <strong>Subnetting Math: Demystifying CIDR & Host Ranges:</strong> IPv4 binary bit boundaries, usable host formulas, and point-to-point link calculations.
              </li>
              <li>
                <strong>Namespaces & Cgroups: What Separates Containers from VMs:</strong> Linux kernel isolation mechanisms, PID/NET/MNT namespaces, and CFS CPU quotas.
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
