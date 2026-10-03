"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/lib/data";
import NetworkVisualization from "../NetworkVisualization";
import { GithubIcon } from "@/components/Icons";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="gradient-fade-b absolute bottom-0 left-0 right-0 h-32" />

      <div className="section-container relative z-10 text-center py-20 md:py-0">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "var(--node-green)" }}
          />
          <span
            className="text-xs font-mono"
            style={{ color: "var(--text-secondary)" }}
          >
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {siteConfig.name.split(" ").map((word, i) => (
            <span key={i}>
              {i === 1 ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}
              {i === 0 ? " " : ""}
            </span>
          ))}
        </motion.h1>

        {/* Positioning */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl font-mono mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {siteConfig.positioning}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-tertiary)" }}
        >
          Exploring networks, cloud infrastructure, Linux, virtual labs and
          software development.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a href="#about" className="btn-primary" id="hero-explore-cta">
            <ArrowDown size={16} />
            Explore my work
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            id="hero-github-cta"
          >
            <GithubIcon size={16} />
            View GitHub
          </a>
        </motion.div>

        {/* Network Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <NetworkVisualization />
        </motion.div>
      </div>
    </section>
  );
}
