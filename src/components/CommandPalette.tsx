"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ExternalLink } from "lucide-react";
import { commandItems } from "@/lib/data";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = commandItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof commandItems>
  );

  const flatFiltered = filtered;

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleSelect = useCallback(
    (href: string, isExternal?: boolean) => {
      handleClose();
      if (isExternal) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    },
    [handleClose, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          handleClose();
        } else {
          handleOpen();
        }
      }
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleOpen, handleClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < flatFiltered.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : flatFiltered.length - 1
      );
    } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
      handleSelect(
        flatFiltered[selectedIndex].href,
        flatFiltered[selectedIndex].isExternal
      );
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all duration-200"
        style={{
          background: "var(--bg-tertiary)",
          border: "1px solid var(--border-primary)",
          color: "var(--text-tertiary)",
        }}
        aria-label="Open command palette"
        id="command-palette-trigger"
      >
        <Search size={14} />
        <span className="font-mono text-xs">⌘K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100]"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-[560px] rounded-xl overflow-hidden"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              }}
              role="dialog"
              aria-label="Command palette"
            >
              {/* Input */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: "1px solid var(--border-primary)" }}
              >
                <Search size={18} style={{ color: "var(--text-muted)" }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search portfolio..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyNavigation}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                  id="command-palette-input"
                  aria-label="Search commands"
                />
                <kbd
                  className="text-xs px-1.5 py-0.5 rounded font-mono"
                  style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div
                className="max-h-[320px] overflow-y-auto py-2"
                role="listbox"
                id="command-palette-results"
              >
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <div
                      className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {category}
                    </div>
                    {items.map((item) => {
                      const globalIndex = flatFiltered.indexOf(item);
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() =>
                            handleSelect(item.href, item.isExternal)
                          }
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100 ${
                            globalIndex === selectedIndex ? "bg-[var(--bg-tertiary)]" : ""
                          }`}
                          style={{
                            color:
                              globalIndex === selectedIndex
                                ? "var(--text-primary)"
                                : "var(--text-secondary)",
                          }}
                          role="option"
                          aria-selected={globalIndex === selectedIndex}
                          id={`command-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <Icon size={16} style={{ opacity: 0.6 }} />
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.isExternal ? (
                            <ExternalLink size={14} style={{ opacity: 0.4 }} />
                          ) : (
                            <ArrowRight size={14} style={{ opacity: 0.4 }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {flatFiltered.length === 0 && (
                  <div
                    className="px-4 py-8 text-center text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No results found.
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
