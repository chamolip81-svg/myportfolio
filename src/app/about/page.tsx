"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  MapPin,
  Terminal,
  Network,
  Cloud,
  Shield,
  Code2,
  Cpu,
  Layers,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig, education } from "@/lib/data";

export default function AboutPage() {
  const milestones = [
    {
      year: "Current",
      title: "Deep Dive into Cloud & Infrastructure",
      description:
        "Actively setting up multi-tier virtual topologies, exploring AWS architecture patterns (VPCs, subnets, ALBs), Docker container isolation mechanisms, and Linux system internals.",
      icon: Cloud,
      color: "#06b6d4",
    },
    {
      year: "2025",
      title: "Networking & Linux Administration",
      description:
        "Mastered subnetting mathematics, TCP/IP protocols, OSI reference model, Wireshark packet captures, and configured headless Linux servers via SSH and bash scripting.",
      icon: Network,
      color: "#3b82f6",
    },
    {
      year: "2024",
      title: "Software & Web Development Foundations",
      description:
        "Built responsive web applications, created Travel Dost catalog UI, learned relational database design with MySQL, and practiced core programming in C, C++, and JavaScript.",
      icon: Code2,
      color: "#f43f5e",
    },
    {
      year: "2023",
      title: "Commenced B.Sc. Information Technology",
      description:
        "Started formal university studies in Dehradun, focusing on computer science fundamentals, discrete mathematics, digital logic, and computing principles.",
      icon: GraduationCap,
      color: "#8b5cf6",
    },
  ];

  const pillars = [
    {
      title: "Foundations Over Frameworks",
      description:
        "Understanding how packets move over wires, how kernels manage memory, and how DNS queries resolve is more permanent than chasing fleeting UI trends.",
      icon: Cpu,
      color: "#3b82f6",
    },
    {
      title: "Hands-on Virtual Labs",
      description:
        "Theory becomes real when you capture the packet in Wireshark, break the routing table, or inspect container cgroup limits in a sandbox.",
      icon: Terminal,
      color: "#22c55e",
    },
    {
      title: "Engineering Honesty",
      description:
        "Transparently sharing where I am in my learning curve. I don't claim senior-level cloud mastery; I demonstrate genuine curiosity and practical comprehension.",
      icon: Shield,
      color: "#f59e0b",
    },
    {
      title: "Continuous Synthesis",
      description:
        "Every concept learned in networking, databases, or operating systems directly informs how I write clean, resilient, and well-structured software.",
      icon: Layers,
      color: "#a855f7",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background Gradients */}
      <div className="bg-grid-fine absolute inset-0 opacity-20 pointer-events-none" />
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4"
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              color: "var(--accent-blue)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            About Me
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Building Ground-Up Understanding in Systems & Software
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            I am Priyanshu Chamoli — an IT student based in Dehradun, Uttarakhand,
            driven by an obsession with how computer networks, Linux operating
            systems, cloud infrastructure, and software applications connect.
          </motion.p>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Quick Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold"
                  style={{
                    background: "var(--gradient-primary)",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.25)",
                  }}
                >
                  PC
                </div>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {siteConfig.name}
                  </h3>
                  <p
                    className="text-xs font-mono"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {siteConfig.positioning}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm pt-4 border-t border-[var(--border-primary)]">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[var(--accent-blue)]" />
                  <span style={{ color: "var(--text-secondary)" }}>
                    {siteConfig.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-[var(--accent-cyan)]" />
                  <span style={{ color: "var(--text-secondary)" }}>
                    B.Sc. Information Technology
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Terminal size={16} className="text-[var(--node-green)]" />
                  <span style={{ color: "var(--text-secondary)" }}>
                    Linux & Virtual Labs Explorer
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-primary)] flex flex-col gap-3">
              <Link href="/contact" className="btn-primary justify-center text-xs">
                Get in Touch
                <ArrowRight size={14} />
              </Link>
              <Link href="/setup" className="btn-secondary justify-center text-xs">
                View My Lab Setup
              </Link>
            </div>
          </motion.div>

          {/* Narrative Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6 md:p-8 space-y-5"
          >
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              My Story & Technical Perspective
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              When I began studying Information Technology, I quickly realized
              that many developers treat the layers beneath the application code
              as a black box. Web applications don&apos;t live in a vacuum; they
              depend on DNS queries resolving in milliseconds, TCP sockets
              handshaking reliably, Linux kernels scheduling tasks, and cloud
              gateways routing packets securely.
            </p>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Rather than pretending to have years of senior enterprise experience,
              my focus as an undergraduate student is building an unshakeable
              grasp of <strong>first principles</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                className="p-3.5 rounded-lg text-xs space-y-1"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  🌐 Networking Fundamentals
                </p>
                <p style={{ color: "var(--text-tertiary)" }}>
                  Subnetting, OSI stack, routing protocols, and packet flows.
                </p>
              </div>
              <div
                className="p-3.5 rounded-lg text-xs space-y-1"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  🐧 Linux & Systems
                </p>
                <p style={{ color: "var(--text-tertiary)" }}>
                  Command line navigation, process management, and shell scripting.
                </p>
              </div>
              <div
                className="p-3.5 rounded-lg text-xs space-y-1"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  ☁️ Cloud Architecture
                </p>
                <p style={{ color: "var(--text-tertiary)" }}>
                  Virtual Private Clouds, multi-tier isolation, and load balancers.
                </p>
              </div>
              <div
                className="p-3.5 rounded-lg text-xs space-y-1"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  💻 Web & Software
                </p>
                <p style={{ color: "var(--text-tertiary)" }}>
                  Clean JavaScript, responsive UI interfaces, and SQL databases.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Guiding Principles */}
        <div className="mb-20">
          <SectionHeading
            label="Philosophy"
            title="How I Approach Learning & Engineering"
            description="Core principles that dictate how I study, practice, and build systems."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card p-6"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${pillar.color}15`,
                      color: pillar.color,
                      border: `1px solid ${pillar.color}30`,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4
                    className="text-base font-bold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {pillar.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Learning Journey Timeline */}
        <div className="mb-20 max-w-4xl mx-auto">
          <SectionHeading
            label="Timeline"
            title="Milestones & Learning Progress"
            description="A chronological record of my academic progression and skill acquisition."
          />

          <div className="relative pl-6 sm:pl-8 border-l border-[var(--border-primary)] space-y-10">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline bullet */}
                  <div
                    className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: "var(--bg-secondary)",
                      border: `2px solid ${m.color}`,
                      color: m.color,
                    }}
                  >
                    •
                  </div>

                  <div className="glass-card p-5 md:p-6 transition-transform duration-200 group-hover:-translate-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold"
                        style={{
                          background: `${m.color}15`,
                          color: m.color,
                          border: `1px solid ${m.color}30`,
                        }}
                      >
                        {m.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} style={{ color: m.color }} />
                      <h4
                        className="text-base font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {m.title}
                      </h4>
                    </div>
                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Academic Card */}
        <div className="glass-card p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: "var(--accent-blue)" }}
            >
              Formal Education
            </span>
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {education.degree} in {education.field}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              {education.institution} • {education.location}
            </p>
          </div>
          <Link href="/projects" className="btn-primary text-xs shrink-0">
            Explore Projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
