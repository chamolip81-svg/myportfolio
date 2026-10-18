"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Server } from "lucide-react";
import { setupData } from "@/lib/data";

export default function SetupPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
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
            Virtual Lab & Gear
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Virtual Lab, Tools & Setup
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            An inside look at the software, virtualization hypervisors, networking
            analyzers, and hardware environment I use for testing and practical exploration.
          </motion.p>
        </div>

        {/* Lab Architecture Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 md:p-8 max-w-5xl mx-auto mb-16 border-[var(--accent-blue)]/30"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-blue)]">
                <Server size={14} /> Virtualized Topology
              </span>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Isolated Local Lab Network
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Rather than experimenting directly on host systems, all network service configurations,
                firewall rule testing, and headless server testing occur inside isolated host-only / NAT
                virtual networks managed with VirtualBox and WSL2.
              </p>
            </div>
            <Link href="/labs" className="btn-primary text-xs shrink-0">
              Try In-Browser Labs
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {setupData.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <div className="mb-6">
                <h2
                  className="text-xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {category.title}
                </h2>
                <p className="text-xs sm:text-sm" style={{ color: "var(--text-tertiary)" }}>
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="glass-card p-5 flex flex-col justify-between hover:border-[var(--accent-blue)]/40 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono"
                          style={{
                            background: "var(--bg-tertiary)",
                            border: "1px solid var(--border-primary)",
                            color: "var(--accent-cyan)",
                          }}
                        >
                          {item.category}
                        </span>
                        {item.specs && (
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">
                            {item.specs}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-base font-bold mb-1.5"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
