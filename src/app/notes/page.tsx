"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
} from "lucide-react";
import { technicalNotes } from "@/lib/data";

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Networking", "Architecture"];

  const filteredNotes = technicalNotes.filter((note) => {
    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
            Study Notes & Research
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Technical Notes & Architecture Logs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Deep-dive notes, packet flow diagrams, and first-principles breakdowns
            written while exploring systems, protocols, and infrastructure.
          </motion.p>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes or tags..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-xs font-mono outline-none transition-all"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-semibold"
                    : "glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredNotes.map((note, idx) => (
            <motion.div
              key={note.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between group hover:border-[var(--accent-blue)]/50 transition-all duration-300"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {note.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {note.readTime}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Link href={`/notes/${note.slug}`}>
                    {note.title}
                  </Link>
                </h3>
                <p
                  className="text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {note.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono"
                      style={{
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-primary)",
                        color: "var(--text-muted)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/notes/${note.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-blue)] hover:underline"
                >
                  Read Note <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-16 text-sm text-[var(--text-muted)] font-mono">
            No notes found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
