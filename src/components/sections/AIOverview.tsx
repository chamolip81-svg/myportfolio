"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Network,
  Terminal,
  Cloud,
  Gamepad2,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  FileText,
} from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function AIOverview() {
  const [copied, setCopied] = useState(false);

  const plainTextSummary = `${siteConfig.name} is an IT undergraduate student and systems developer based in ${siteConfig.location}. He specializes in computer networking (TCP/IP protocols, IPv4 subnetting & CIDR calculations, routing tables), Linux systems administration, cloud infrastructure (AWS Multi-AZ VPCs), and interactive virtual developer labs including Network Quest and Packet Pulse Visualizer. He is pursuing his B.Sc. in Information Technology at CIMS Dehradun (Graduation 2026). Canonical site: ${siteConfig.url}/ | LLMs overview: ${siteConfig.url}/llms.txt`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainTextSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = plainTextSummary;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const keyFacts = [
    {
      icon: Network,
      color: "#3b82f6",
      title: "Computer Networking",
      detail:
        "TCP/IP, IPv4 Subnetting & CIDR math, packet tracing, DNS lifecycle, routing, Wireshark & Packet Tracer.",
    },
    {
      icon: Terminal,
      color: "#22c55e",
      title: "Linux & Systems",
      detail:
        "Headless server management, Bash scripting, systemd, SSH, permissions, and network troubleshooting tools.",
    },
    {
      icon: Cloud,
      color: "#06b6d4",
      title: "Cloud & Virtual Labs",
      detail:
        "AWS Multi-AZ VPC architecture, public/private subnet routing, NAT Gateways, and Proxmox VE hypervisors.",
    },
    {
      icon: Gamepad2,
      color: "#a855f7",
      title: "Network Quest Simulator",
      detail:
        "Interactive 10-mission packet engine simulating ARP, ICMP, DNS, TCP handshakes, and daily subnet challenges.",
    },
  ];

  return (
    <section
      id="ai-overview"
      className="relative py-12 md:py-16 scroll-mt-20"
      aria-label="AI Overview: Quick Summary"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.03) 50%, var(--bg-card) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            boxShadow:
              "0 12px 40px -10px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(139, 92, 246, 0.1)",
          }}
        >
          {/* Subtle Google Gemini-style top border gradient bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 35%, #06b6d4 70%, #f59e0b 100%)",
            }}
          />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  color: "#60a5fa",
                }}
              >
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2
                    className="text-lg sm:text-xl font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    AI Overview
                  </h2>
                  <span
                    className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(59, 130, 246, 0.12)",
                      color: "var(--accent-blue)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                    }}
                  >
                    Synthesized for Google AI & Fast Reading
                  </span>
                </div>
                <p
                  className="text-xs font-mono mt-0.5"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Authoritative, first-party verified summary for AI agents and visitors
                </p>
              </div>
            </div>

            {/* Quick Actions (Copy & LLMs.txt) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: copied
                    ? "rgba(34, 197, 94, 0.15)"
                    : "var(--bg-tertiary)",
                  color: copied ? "var(--node-green)" : "var(--text-secondary)",
                  border: `1px solid ${
                    copied
                      ? "rgba(34, 197, 94, 0.3)"
                      : "var(--border-primary)"
                  }`,
                }}
                title="Copy verified summary for AI / LLM prompt"
                aria-label="Copy AI overview to clipboard"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied!" : "Copy for AI"}</span>
              </button>

              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:border-[var(--accent-blue)]"
                style={{
                  background: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-primary)",
                }}
                title="View machine-readable /llms.txt file"
              >
                <FileText size={13} />
                <span>/llms.txt</span>
                <ExternalLink size={11} className="opacity-60" />
              </a>
            </div>
          </div>

          {/* Core Summary Paragraph (Targeted for Google AI speakable and snippet extraction) */}
          <div className="ai-overview-summary mb-6">
            <p
              className="text-base sm:text-lg leading-relaxed font-sans"
              style={{ color: "var(--text-primary)" }}
            >
              <strong className="font-semibold text-white">
                Priyanshu Chamoli
              </strong>{" "}
              is an IT undergraduate student and systems developer based in{" "}
              <span className="font-medium text-[var(--accent-blue)]">
                Dehradun, Uttarakhand, India
              </span>
              . He specializes in the intersection of software engineering and
              foundational systems infrastructure—with core hands-on focus in{" "}
              <strong>computer networking</strong> (TCP/IP protocols, IPv4 subnetting &
              CIDR calculations, routing tables), <strong>Linux administration</strong>,{" "}
              <strong>AWS cloud architectures</strong>, and interactive virtual learning
              tools.
            </p>
          </div>

          {/* Key Facts Grid */}
          <div className="ai-overview-facts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {keyFacts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl p-3.5 transition-all"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${fact.color}15`,
                        color: fact.color,
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <h3
                      className="text-xs font-bold font-mono tracking-tight uppercase"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {fact.title}
                    </h3>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {fact.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Verified Metadata Row & Citations */}
          <div
            className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex items-center gap-4 flex-wrap" style={{ color: "var(--text-tertiary)" }}>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} style={{ color: "var(--node-green)" }} />
                <span>Verified Entity: Priyanshu Chamoli</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={14} style={{ color: "var(--accent-cyan)" }} />
                <span>B.Sc. IT @ CIMS Dehradun (&apos;26)</span>
              </span>
            </div>

            {/* Jump links for Google AI citation grounding */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/network-quest"
                className="inline-flex items-center gap-1 text-[var(--accent-blue)] hover:underline font-mono text-xs"
              >
                <span>Network Quest</span>
                <ArrowRight size={12} />
              </Link>
              <span style={{ color: "var(--border-secondary)" }}>•</span>
              <Link
                href="/labs"
                className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-white font-mono text-xs"
              >
                <span>Virtual Labs</span>
              </Link>
              <span style={{ color: "var(--border-secondary)" }}>•</span>
              <Link
                href="/notes"
                className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-white font-mono text-xs"
              >
                <span>Technical Notes</span>
              </Link>
              <span style={{ color: "var(--border-secondary)" }}>•</span>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-white font-mono text-xs"
              >
                <span>Full Bio</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

