"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import type { TechnicalNote } from "@/lib/data";

function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative group my-5 rounded-xl overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-primary)] bg-black/40">
        <span className="text-[11px] font-mono text-[var(--text-muted)]">Code Snippet</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white cursor-pointer"
          aria-label={copied ? "Code snippet copied" : "Copy code snippet"}
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 font-mono text-xs overflow-x-auto text-[#38bdf8] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function NoteDetailClient({ note }: { note: TechnicalNote }) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="bg-grid-fine absolute inset-0 opacity-20 pointer-events-none" />

      <div className="section-container relative z-10 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to all notes
        </Link>

        {/* Note Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 md:p-10 mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-[var(--text-muted)]">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(59, 130, 246, 0.1)",
                color: "var(--accent-blue)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              {note.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} /> {note.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {note.readTime}
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {note.title}
          </h1>

          <p
            className="text-sm sm:text-base leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {note.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-primary)]">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded text-xs font-mono"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-secondary)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Note Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 md:p-10"
        >
          <div
            className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed space-y-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {note.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="text-xl font-bold mt-8 mb-3 text-[var(--text-primary)]"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h4
                    key={idx}
                    className="text-base font-bold mt-6 mb-2 text-[var(--text-primary)]"
                  >
                    {trimmed.replace("#### ", "")}
                  </h4>
                );
              }
              if (trimmed.startsWith("```")) {
                const code = trimmed.replace(/```[a-z]*\n?/g, "").trim();
                return <CodeSnippet key={idx} code={code} />;
              }
              if (trimmed.startsWith("|")) {
                const rawRows = trimmed.split("\n").filter(Boolean);
                const headerRow = rawRows[0];
                const dataRows = rawRows.slice(1).filter((r) => !r.includes("---"));
                const headerCells = headerRow.split("|").filter(Boolean).map((c) => c.trim());

                return (
                  <div key={idx} className="overflow-x-auto my-6 rounded-lg border border-[var(--border-primary)]">
                    <table className="w-full text-xs font-mono text-left border-collapse">
                      <caption className="text-left text-xs text-[var(--text-muted)] p-3 font-sans border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                        Technical Reference Table: {note.title}
                      </caption>
                      <thead>
                        <tr style={{ background: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-primary)" }}>
                          {headerCells.map((cell, cIdx) => (
                            <th key={cIdx} scope="col" className="p-2.5 font-bold text-[var(--text-primary)]">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dataRows.map((row, rIdx) => {
                          const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                          return (
                            <tr
                              key={rIdx}
                              style={{
                                borderBottom: "1px solid var(--border-primary)",
                                background: rIdx % 2 === 1 ? "rgba(255, 255, 255, 0.01)" : "transparent",
                              }}
                            >
                              {cells.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2.5 text-[var(--text-secondary)]">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (trimmed.startsWith("---")) {
                return (
                  <hr
                    key={idx}
                    className="my-6 border-[var(--border-primary)]"
                  />
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <Link href="/notes" className="btn-secondary text-xs">
            <ArrowLeft size={14} /> Back to Notes
          </Link>
          <Link href="/labs" className="btn-primary text-xs">
            Explore Simulation Labs
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
