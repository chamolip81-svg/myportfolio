"use client";

import { useState } from "react";
import { Terminal, CheckCircle, XCircle, Copy, Check, Activity } from "lucide-react";
import type { SimulationResult, PacketEvent } from "@/lib/network-quest/types";

interface DiagnosticsConsoleProps {
  result: SimulationResult | null;
  isSimulating: boolean;
}

export default function DiagnosticsConsole({ result, isSimulating }: DiagnosticsConsoleProps) {
  const [activeTab, setActiveTab] = useState<"trace" | "telemetry">("trace");
  const [copied, setCopied] = useState(false);

  const handleCopyLogs = async () => {
    if (!result) return;
    const text = result.events
      .map(
        (e) =>
          `[${e.timestampMs}ms] [${e.layer}] [${e.protocol}] ${e.nodeName} -> ${e.status.toUpperCase()}: ${e.detail}`
      )
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getStatusColor = (status: PacketEvent["status"]) => {
    switch (status) {
      case "delivered":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "dropped":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "forwarded":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "sent":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      case "received":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      default:
        return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[#09090b]/95 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Console Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-primary)] bg-black/40 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <Terminal size={14} className="text-cyan-400" />
            Packet Inspection & Diagnostics Console
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Selector */}
          <div className="flex items-center rounded-lg bg-[var(--bg-tertiary)] p-0.5 border border-white/5">
            <button
              onClick={() => setActiveTab("trace")}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                activeTab === "trace" ? "bg-blue-600 text-white" : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              Event Trace
            </button>
            <button
              onClick={() => setActiveTab("telemetry")}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                activeTab === "telemetry" ? "bg-blue-600 text-white" : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              Telemetry
            </button>
          </div>

          {result && (
            <button
              onClick={handleCopyLogs}
              className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-colors"
              title="Copy packet trace"
              aria-label="Copy packet trace"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* Outcome Status Banner */}
      {result && (
        <div
          className={`p-3.5 border-b text-xs font-mono flex items-start gap-3 ${
            result.success
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          {result.success ? (
            <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-semibold text-sm">{result.summary}</div>
            {result.failureReason && (
              <p className="text-[11px] opacity-90 text-[var(--text-secondary)]">
                <strong>Failure Cause:</strong> {result.failureReason}
              </p>
            )}
            {result.violatedRule && (
              <p className="text-[11px] opacity-80 text-amber-300">
                <strong>Rule Violated:</strong> {result.violatedRule}
              </p>
            )}
            {result.hint && (
              <p className="text-[11px] text-cyan-300">
                <strong>Actionable Hint:</strong> {result.hint}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-4 font-mono text-xs max-h-72 overflow-y-auto space-y-2">
        {isSimulating ? (
          <div className="py-8 text-center space-y-2 text-[var(--text-muted)]">
            <Activity size={24} className="mx-auto text-blue-400 animate-spin" />
            <p>Serializing packets and propagating across topology...</p>
          </div>
        ) : !result ? (
          <div className="py-8 text-center text-[var(--text-muted)]">
            <p>No transmission simulated yet. Configure the network nodes and click &quot;Test Transmission&quot;.</p>
          </div>
        ) : activeTab === "telemetry" ? (
          /* Telemetry View */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            <div className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Packets Sent</span>
              <span className="text-lg font-bold text-white">{result.pingStats?.packetsSent ?? 0}</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Packets Received</span>
              <span className="text-lg font-bold text-emerald-400">
                {result.pingStats?.packetsReceived ?? 0}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Packet Loss</span>
              <span
                className={`text-lg font-bold ${
                  (result.pingStats?.packetLossPercent ?? 0) > 0 ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {result.pingStats?.packetLossPercent ?? 0}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Avg RTT</span>
              <span className="text-lg font-bold text-cyan-400">
                {result.pingStats?.avgRttMs ? `${result.pingStats.avgRttMs} ms` : "N/A"}
              </span>
            </div>
          </div>
        ) : (
          /* Event Trace Log View */
          <div className="space-y-2">
            {result.events.map((event) => (
              <div
                key={event.step}
                className="p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-[var(--text-muted)] w-8">
                    +{event.timestampMs}ms
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-[var(--text-secondary)] border border-white/10 font-bold">
                    {event.layer}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.protocol}
                  </span>
                  <span className="text-[var(--text-primary)] font-semibold">{event.nodeName}</span>
                </div>

                <div className="text-[11px] text-[var(--text-secondary)] sm:text-right max-w-md">
                  <span>{event.detail}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
