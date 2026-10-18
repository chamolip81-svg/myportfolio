"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  CheckCircle,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

type SubmissionStatus = "idle" | "submitting" | "success" | "activation" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setStatus("submitting");
      setStatusMessage("");

      try {
        const response = await fetch(
          `https://formsubmit.co/ajax/${siteConfig.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              subject: formData.subject || `Message from ${formData.name}`,
              message: formData.message,
              _subject: formData.subject || `Portfolio Message from ${formData.name}`,
              _template: "table",
              _captcha: "false",
            }),
          }
        );

        const data = await response.json().catch(() => ({}));

        if (response.ok && (data.success === "true" || data.success === true)) {
          setStatus("success");
          setStatusMessage(
            `Thank you, ${formData.name}! Your message has been sent directly to ${siteConfig.email}. I will review it and reply as soon as possible.`
          );
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else if (
          typeof data.message === "string" &&
          data.message.toLowerCase().includes("activation")
        ) {
          setStatus("activation");
          setStatusMessage(
            `Your message was received! If you are the site owner, FormSubmit sent a one-time activation link to ${siteConfig.email}. Click that link once to enable instant forwarding.`
          );
        } else {
          throw new Error(data.message || "Failed to deliver message");
        }
      } catch (err: unknown) {
        console.error("Direct send error:", err);
        setStatus("error");
        setStatusMessage(
          "Could not send directly from browser. You can dispatch your message instantly with 1 click using the Gmail or Mail Client buttons below."
        );
      }
    },
    [formData, validate]
  );

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  // Compute pre-filled mail URLs for 1-click fallback
  const mailSubject = encodeURIComponent(
    formData.subject ||
      (formData.name
        ? `Portfolio Message from ${formData.name}`
        : "Message via Portfolio")
  );
  const mailBody = encodeURIComponent(
    formData.name || formData.message
      ? `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      : "Hi Priyanshu,\n\nI was viewing your portfolio and wanted to connect.\n"
  );
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}&su=${mailSubject}&body=${mailBody}`;
  const mailtoUrl = `mailto:${siteConfig.email}?subject=${mailSubject}&body=${mailBody}`;

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
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Direct Channels
              </h2>

              <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3.5 hover:text-blue-400 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">Email</p>
                    <p className="text-[11px] font-mono text-[var(--text-muted)] truncate">{siteConfig.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-primary)]/40">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 py-1 px-2 rounded text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors border bg-[var(--bg-card)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    {copied ? "Copied" : "Copy Email"}
                  </button>
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1 px-2 rounded text-[11px] font-mono flex items-center justify-center gap-1 text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                  >
                    Gmail Web <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-blue-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center flex-shrink-0">
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
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center flex-shrink-0">
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
            <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)]">
              Send a Direct Message
            </h2>
            {status === "success" ? (
              <div
                className="text-center py-10 px-4 space-y-4"
                role="alert"
                aria-live="polite"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle size={28} />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Message Sent Successfully!
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-md mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {statusMessage}
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setStatusMessage("");
                    }}
                    className="btn-secondary text-xs"
                  >
                    <RotateCcw size={14} />
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {status === "activation" && (
                  <div
                    className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-2.5"
                    role="alert"
                  >
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">Notice for Priyanshu:</p>
                      <p>{statusMessage}</p>
                      <div className="pt-2">
                        <a
                          href={gmailComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono underline text-amber-200"
                        >
                          Send directly via Gmail Web instead <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div
                    className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed flex items-start gap-2.5"
                    role="alert"
                  >
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p>{statusMessage}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a
                          href={gmailComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/20 text-rose-200 font-mono text-[11px]"
                        >
                          <Mail size={12} /> Open in Gmail <ExternalLink size={10} />
                        </a>
                        <a
                          href={mailtoUrl}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/20 text-rose-200 font-mono text-[11px]"
                        >
                          <Send size={12} /> Open Mail App
                        </a>
                      </div>
                    </div>
                  </div>
                )}

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
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, name: e.target.value }));
                        if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: "var(--bg-tertiary)",
                        border: `1px solid ${errors.name ? "#f43f5e80" : "var(--border-primary)"}`,
                        color: "var(--text-primary)",
                      }}
                      placeholder="Jane Doe"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs font-mono mt-1 text-rose-400">
                        {errors.name}
                      </p>
                    )}
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
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, email: e.target.value }));
                        if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: "var(--bg-tertiary)",
                        border: `1px solid ${errors.email ? "#f43f5e80" : "var(--border-primary)"}`,
                        color: "var(--text-primary)",
                      }}
                      placeholder="jane@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs font-mono mt-1 text-rose-400">
                        {errors.email}
                      </p>
                    )}
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
                    name="subject"
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
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, message: e.target.value }));
                      if (errors.message) setErrors((p) => ({ ...p, message: "" }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: `1px solid ${errors.message ? "#f43f5e80" : "var(--border-primary)"}`,
                      color: "var(--text-primary)",
                    }}
                    placeholder="Write your message here..."
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs font-mono mt-1 text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center text-sm py-3"
                  id="contact-page-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending message to {siteConfig.email}...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message to {siteConfig.email}</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-[var(--border-primary)]" />
                    <span className="flex-shrink mx-3 text-[11px] font-mono text-[var(--text-muted)]">
                      or dispatch directly from your email
                    </span>
                    <div className="flex-grow border-t border-[var(--border-primary)]" />
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 transition-colors"
                      title="Open pre-filled draft in Gmail Web"
                    >
                      <Mail size={12} />
                      Open in Gmail Web
                      <ExternalLink size={10} />
                    </a>
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/25 transition-colors"
                      title="Open in your default mail application"
                    >
                      <Send size={12} />
                      Default Mail App
                    </a>
                  </div>
                </div>
              </form>
            )}
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
