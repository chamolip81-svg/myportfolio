"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ paddingTop: "var(--header-height)" }}
    >
      <div className="section-container text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal-styled 404 */}
          <div className="max-w-md mx-auto mb-8">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderBottom: "1px solid var(--border-primary)",
                }}
              >
                <Terminal size={14} style={{ color: "var(--text-muted)" }} />
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  terminal
                </span>
              </div>
              <div className="p-5 font-mono text-sm text-left">
                <p style={{ color: "#22c55e" }}>
                  $ <span style={{ color: "var(--text-primary)" }}>curl -I /this-page</span>
                </p>
                <p style={{ color: "#f43f5e" }} className="mt-2">
                  HTTP/1.1 404 Not Found
                </p>
                <p style={{ color: "var(--text-muted)" }} className="mt-1">
                  Content-Type: text/html
                </p>
                <p style={{ color: "var(--text-muted)" }}>
                  Server: portfolio-v1
                </p>
              </div>
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold mb-4 text-gradient"
          >
            404
          </h1>
          <p
            className="text-lg md:text-xl font-medium mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Page not found
          </p>
          <p
            className="text-sm mb-8 max-w-sm mx-auto"
            style={{ color: "var(--text-tertiary)" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Link href="/" className="btn-primary inline-flex" id="not-found-home">
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
