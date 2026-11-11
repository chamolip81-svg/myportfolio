"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  Eye,
  GitBranch,
  Layers,
  ShieldAlert,
  BookOpen,
} from "lucide-react";
import { projects } from "@/lib/data";

export default function AuralynPage() {
  const project = projects.find((p) => p.id === "auralyn-audio") || projects[0];

  const sections = [
    {
      id: "overview",
      icon: Eye,
      title: "Project Overview",
      content: (
        <div className="space-y-4">
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.longDescription}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { label: "Frontend", val: "React 18 + PWA" },
              { label: "API Gateway", val: "Node.js + Express 4" },
              { label: "Stream Extractor", val: "Python + Flask" },
              { label: "Deployment", val: "Vercel + Railway" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)]"
              >
                <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">
                  {stat.label}
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] mt-1">
                  {stat.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "architecture",
      icon: Layers,
      title: "System Architecture",
      content: (
        <div className="space-y-4">
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Auralyn is split into three decoupled services to separate UI responsiveness from heavy audio resolution and streaming proxying:
          </p>
          <div className="p-4 rounded-xl bg-black/60 border border-[var(--border-primary)] font-mono text-[11px] sm:text-xs overflow-x-auto text-cyan-300 leading-relaxed">
            <pre>{`[ Client Browser / Mobile PWA ]
       │
       │ 1. Search & Browse Query
       ▼
[ Node.js / Express Gateway (Port 5000) ] ──▶ CORS Origin Verification
       │
       │ 2. Proxy Stream Request
       ▼
[ Python Flask Service (ytmusicapi) ]
       │
       │ 3. Extract Stream URL & Track Metadata
       ▼
[ External Audio Stream CDN (Byte-Range) ]
       │
       │ 4. HTTP 206 Partial Content (Audio Chunks)
       ▼
[ In-Browser Singleton Audio Controller ] ──▶ Dispatches to React State
       │
       ▼
[ Uninterrupted Playback on Web Audio Output ]`}</pre>
          </div>
        </div>
      ),
    },
    {
      id: "challenges",
      icon: ShieldAlert,
      title: "Core Engineering Challenges & Solutions",
      content: (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Challenge 1: Uninterrupted Audio Across React Route Changes</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              In standard React architectures, mounting an <code className="text-blue-400 font-mono">&lt;audio&gt;</code> element inside page components causes audio to terminate immediately when the user changes views (e.g. from search to playlist).
            </p>
            <div className="text-xs font-mono text-emerald-400 pt-1">
              <strong>Solution:</strong> Decoupled the HTML5 Audio pipeline into a singleton controller outside the component hierarchy. Component views subscribe to state updates via hooks without possessing ownership of the native audio DOM node.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Challenge 2: Cross-Origin Resource Sharing (CORS) on Audio Streams</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Direct client requests to streaming hosts fail due to CORS browser protections when Web Audio APIs are attached for visualizers or volume normalization.
            </p>
            <div className="text-xs font-mono text-emerald-400 pt-1">
              <strong>Solution:</strong> Implemented Express.js dynamic origin validation in <code className="text-blue-400">server.js</code> allowing registered production origins (<code className="text-blue-400">auralyn.me</code>, Vercel preview URLs) while stripping blocking headers on proxied audio chunks.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Challenge 3: Mobile Memory Management & Buffer Underruns</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Buffering full 40MB audio albums into mobile RAM causes browser tab eviction on low-memory Android and iOS devices.
            </p>
            <div className="text-xs font-mono text-emerald-400 pt-1">
              <strong>Solution:</strong> Enforced HTTP 206 Byte-Range streaming. Audio chunks are prefetched in 30-second sliding windows, discarding passed audio buffers to maintain a sub-15MB memory footprint.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "technology",
      icon: Code2,
      title: "Technologies & Libraries",
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="bg-grid-fine absolute inset-0 opacity-20 pointer-events-none" />

      <div className="section-container relative z-10 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Projects Directory
        </Link>

        {/* Case Study Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 md:p-10 mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold"
              style={{
                background: "rgba(59, 130, 246, 0.1)",
                color: "var(--accent-blue)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              Full-Stack Engineering Case Study
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">•</span>
            <span className="text-xs font-mono text-emerald-400">Completed & Verified</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--border-primary)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
              >
                <GitBranch size={14} /> View Backend Repository on GitHub
              </a>
            )}
            <Link
              href="/notes/browser-audio-streaming-engine"
              className="btn-secondary text-xs"
            >
              <BookOpen size={14} /> Read In-Depth Technical Note
            </Link>
          </div>
        </motion.div>

        {/* Sections Content */}
        <div className="space-y-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border-primary)]">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h2
                    className="text-xl font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </motion.section>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-primary)]">
          <Link
            href="/projects"
            className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back to all projects
          </Link>
          <Link
            href="/network-quest"
            className="text-xs font-mono text-[var(--accent-blue)] hover:underline flex items-center gap-1.5"
          >
            Next: Play Network Quest Simulator &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
