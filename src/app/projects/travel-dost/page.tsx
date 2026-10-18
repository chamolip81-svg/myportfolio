"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Tag, CheckCircle2, Lightbulb, Code2, Eye, Wrench } from "lucide-react";
import { projects } from "@/lib/data";

export default function TravelDostPage() {
  const project = projects[0];

  const sections = [
    {
      id: "overview",
      icon: Eye,
      title: "Overview",
      content: (
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.longDescription}
        </p>
      ),
    },
    {
      id: "objective",
      icon: Tag,
      title: "Objective",
      content: (
        <div className="space-y-3">
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            The objective of Travel Dost was to create a practical web
            application that demonstrates core web development skills. The
            project focused on:
          </p>
          <ul className="space-y-2">
            {[
              "Building a clean, responsive user interface",
              "Implementing hotel browsing and exploration features",
              "Applying HTML, CSS, and JavaScript fundamentals",
              "Creating an intuitive information architecture",
              "Practicing responsive design for multiple devices",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                <CheckCircle2
                  size={14}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "#22c55e" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "technology",
      icon: Code2,
      title: "Technology",
      content: (
        <div className="space-y-4">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Built with fundamental web technologies to focus on learning core concepts.
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-mono rounded-lg"
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
      ),
    },
    {
      id: "development",
      icon: Wrench,
      title: "Development Process",
      content: (
        <div className="space-y-4">
          {[
            {
              step: "01",
              title: "Planning & Design",
              description:
                "Defined the layout, user flow, and information architecture for browsing hotel information.",
            },
            {
              step: "02",
              title: "Structure",
              description:
                "Built the HTML structure with semantic elements and organized content sections.",
            },
            {
              step: "03",
              title: "Styling",
              description:
                "Applied CSS styling with a focus on responsive design and visual consistency.",
            },
            {
              step: "04",
              title: "Interactivity",
              description:
                "Added JavaScript functionality for dynamic content and user interactions.",
            },
          ].map((phase) => (
            <div
              key={phase.step}
              className="flex items-start gap-4 p-4 rounded-lg"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <span
                className="text-xs font-mono font-bold flex-shrink-0 mt-0.5"
                style={{ color: "var(--accent-primary)" }}
              >
                {phase.step}
              </span>
              <div>
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {phase.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "learnings",
      icon: Lightbulb,
      title: "What I Learned",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Structuring web pages with semantic HTML",
            "Responsive layout techniques with CSS",
            "DOM manipulation with JavaScript",
            "Planning user interface architecture",
            "Writing clean, maintainable code",
            "Problem-solving through development",
          ].map((learning) => (
            <div
              key={learning}
              className="flex items-start gap-2.5 p-3 rounded-lg text-sm"
              style={{
                background: "rgba(59, 130, 246, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
                color: "var(--text-secondary)",
              }}
            >
              <Lightbulb
                size={14}
                className="mt-0.5 flex-shrink-0"
                style={{ color: "#f59e0b" }}
              />
              {learning}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ paddingTop: "var(--header-height)" }}
    >
      <div className="section-container py-16 md:py-24 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors duration-200"
          style={{ color: "var(--text-tertiary)" }}
          id="project-back-link"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Project Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 8px 32px rgba(59, 130, 246, 0.2)",
            }}
          >
            <span className="text-2xl font-bold text-white">TD</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
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

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Project Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden mb-12"
        >
          <div
            className="relative h-56 md:h-80 flex items-center justify-center"
            style={{
              background: "var(--bg-tertiary)",
            }}
          >
            <div className="bg-grid-fine absolute inset-0 opacity-20" />
            <div className="relative z-10 text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 12px 48px rgba(59, 130, 246, 0.25)",
                }}
              >
                <span className="text-3xl font-bold text-white">TD</span>
              </div>
              <p
                className="text-sm font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                Project Preview
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Screenshots available upon request
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                className="glass-card p-6 md:p-8"
                id={`project-${section.id}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
