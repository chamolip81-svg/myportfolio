"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";

type CategoryFilter = "All" | "Web Application" | "Networking & Systems" | "Cloud & Infrastructure";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const categories: CategoryFilter[] = [
    "All",
    "Web Application",
    "Networking & Systems",
    "Cloud & Infrastructure",
  ];

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
        <div className="max-w-3xl mx-auto text-center mb-12">
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
            Portfolio Showcase
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Projects, Systems & Prototypes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A truthful collection of completed web applications, interactive
            infrastructure simulators, and cloud architecture blueprints.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20"
                  : "glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card flex flex-col justify-between overflow-hidden group hover:border-[var(--accent-blue)]/40 transition-all duration-300"
              >
                <div>
                  {/* Top Preview Banner */}
                  <div
                    className="p-6 relative overflow-hidden"
                    style={{
                      background: "var(--bg-tertiary)",
                      borderBottom: "1px solid var(--border-primary)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
                        style={{
                          background:
                            project.status === "completed"
                              ? "rgba(34, 197, 94, 0.1)"
                              : "rgba(59, 130, 246, 0.1)",
                          color:
                            project.status === "completed"
                              ? "#22c55e"
                              : "var(--accent-blue)",
                          border: `1px solid ${
                            project.status === "completed"
                              ? "rgba(34, 197, 94, 0.2)"
                              : "rgba(59, 130, 246, 0.2)"
                          }`,
                        }}
                      >
                        {project.status === "completed" ? "Completed" : "Prototype"}
                      </span>
                      <span
                        className="text-xs font-mono"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {project.category}
                      </span>
                    </div>

                    <h2
                      className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h2>
                    <p
                      className="text-xs sm:text-sm line-clamp-3 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3
                        className="text-xs font-mono uppercase tracking-wider mb-2.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Key Highlights
                      </h3>
                      <ul className="space-y-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[var(--accent-blue)] mt-0.5">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3
                        className="text-xs font-mono uppercase tracking-wider mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono"
                            style={{
                              background: "var(--bg-tertiary)",
                              border: "1px solid var(--border-primary)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div
                  className="p-6 pt-0 mt-2 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--border-primary)" }}
                >
                  <div className="pt-4 flex items-center gap-2">
                    {project.metrics && project.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="text-[10px] font-mono text-[var(--text-muted)]"
                      >
                        {m.label}: <strong className="text-[var(--text-primary)]">{m.value}</strong>
                      </span>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Link
                      href={project.href}
                      className="btn-primary text-xs"
                      id={`view-project-${project.id}`}
                    >
                      {project.id === "travel-dost" ? "Case Study" : "View Lab"}
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Labs CTA Banner */}
        <div className="mt-20 glass-card p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Looking for Interactive Live Demos?
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: "var(--text-tertiary)" }}>
              Step into the Virtual Labs to interact with live packet tracers, OSI explorers, and subnet calculators.
            </p>
          </div>
          <Link href="/labs" className="btn-secondary text-xs shrink-0">
            Open Virtual Labs
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
