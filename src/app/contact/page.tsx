"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  CheckCircle,
  MapPin,
  Clock,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const subject = encodeURIComponent(
        formData.subject || `Message from ${formData.name} via Portfolio`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.open(
        `mailto:${siteConfig.email}?subject=${subject}&body=${body}`,
        "_self"
      );
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
    },
    [formData]
  );

  const faqs = [
    {
      q: "What kind of opportunities are you looking for?",
      a: "As an IT undergraduate student, I am actively seeking internships, student developer positions, and collaborative projects in networking, cloud infrastructure, Linux systems, and software engineering.",
    },
    {
      q: "Are you open to discussing tech or virtual labs?",
      a: "Absolutely! I enjoy discussing network topologies, TCP/IP nuances, Linux homelabs, and software design with fellow students and engineers.",
    },
    {
      q: "What is the typical response time?",
      a: "I usually respond to email and LinkedIn messages within 24 to 48 hours.",
    },
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
            Get In Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s Start a Conversation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Have a question about my labs, want to discuss systems and networking, or explore opportunities? Reach out directly.
          </motion.p>
        </div>

        {/* Contact Form & Channel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Channels Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Direct Channels
              </h3>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3.5 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-blue-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">Email</p>
                  <p className="text-[11px] font-mono text-[var(--text-muted)]">{siteConfig.email}</p>
                </div>
              </a>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-blue-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center">
                  <GithubIcon size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">GitHub</p>
                  <p className="text-[11px] font-mono text-[var(--text-muted)]">github.com/chamolip81-svg</p>
                </div>
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-blue-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center">
                  <LinkedinIcon size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">LinkedIn</p>
                  <p className="text-[11px] font-mono text-[var(--text-muted)]">Connect on LinkedIn</p>
                </div>
              </a>
            </div>

            <div className="glass-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <MapPin size={14} className="text-red-400" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <Clock size={14} className="text-emerald-400" />
                <span>IST (UTC+5:30) • Fast replies</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-page-name"
                    className="block text-xs font-mono uppercase tracking-wider mb-2 text-[var(--text-muted)]"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-page-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-page-email"
                    className="block text-xs font-mono uppercase tracking-wider mb-2 text-[var(--text-muted)]"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-page-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-page-subject"
                  className="block text-xs font-mono uppercase tracking-wider mb-2 text-[var(--text-muted)]"
                >
                  Subject
                </label>
                <input
                  id="contact-page-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, subject: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Opportunity / Question / Project discussion"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-page-message"
                  className="block text-xs font-mono uppercase tracking-wider mb-2 text-[var(--text-muted)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-page-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center text-sm py-3"
                id="contact-page-submit"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={16} /> Opening mail client...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message via Email
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers about collaboration, discussions, and availability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card p-5 space-y-2">
                <h4 className="text-sm font-bold text-[var(--text-primary)]">
                  {faq.q}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
