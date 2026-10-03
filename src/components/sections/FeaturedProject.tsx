"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { projects } from "@/lib/data";

export default function FeaturedProject() {
  const project = projects[0];
  if (!project) return null;

  return (
    <section className="relative py-24 md:py-32" id="projects">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-primary), transparent)",
        }}
      />

      <div className="section-container">
        <SectionHeading
          label="Project"
          title="Featured Project"
          description="A practical project built to learn and apply web development skills."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card overflow-hidden">
            {/* Project Preview Area */}
            <div
              className="relative h-48 md:h-64 flex items-center justify-center"
              style={{
                background: "var(--bg-tertiary)",
                borderBottom: "1px solid var(--border-primary)",
              }}
            >
              <div className="bg-grid-fine absolute inset-0 opacity-20" />
              <div className="relative z-10 text-center">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.2)",
                  }}
                >
                  <span className="text-2xl font-bold text-white">TD</span>
                </div>
                <p
                  className="text-sm font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  Project Preview
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono rounded-full uppercase tracking-wider"
                  style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    color: "#22c55e",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Completed
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h4
                  className="text-xs font-mono uppercase tracking-wider mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent-primary)" }}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4
                  className="text-xs font-mono uppercase tracking-wider mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Technology
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={project.href}
                className="btn-primary inline-flex"
                id="featured-project-cta"
              >
                View Project
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
