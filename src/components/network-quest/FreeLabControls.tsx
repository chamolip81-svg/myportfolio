"use client";

import { Network, Server, Cpu } from "lucide-react";
import type { NetworkDevice } from "@/lib/network-quest/types";

interface FreeLabControlsProps {
  onLoadPreset: (presetId: string) => void;
  devices: NetworkDevice[];
  sourceDeviceId: string;
  onChangeSourceDevice: (id: string) => void;
  targetDestination: string;
  onChangeTargetDestination: (dest: string) => void;
  protocol: "ICMP" | "DNS" | "TCP" | "HTTP";
  onChangeProtocol: (proto: "ICMP" | "DNS" | "TCP" | "HTTP") => void;
}

export default function FreeLabControls({
  onLoadPreset,
  devices,
  sourceDeviceId,
  onChangeSourceDevice,
  targetDestination,
  onChangeTargetDestination,
  protocol,
  onChangeProtocol,
}: FreeLabControlsProps) {
  const presets = [
    { id: "p1-lan", title: "Two-Host Switched LAN", icon: Cpu, desc: "Direct L2 ARP & ICMP" },
    { id: "p2-router", title: "Dual-Subnet Router", icon: Network, desc: "L3 Gateway Forwarding" },
    { id: "p3-dns-web", title: "DNS & Web Cluster", icon: Server, desc: "Port 53 & Port 80 Delivery" },
  ];

  return (
    <div className="p-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-xs font-mono space-y-4">
      {/* Preset Topology Selector */}
      <div>
        <span className="text-[10px] uppercase text-[var(--text-muted)] tracking-wider block mb-2 font-bold">
          Free Lab Topologies
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {presets.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => onLoadPreset(p.id)}
                className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-blue-500/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Icon size={14} className="group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-white">{p.title}</span>
                </div>
                <p className="text-[11px] text-[var(--text-tertiary)]">{p.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Transmission Injector */}
      <div className="pt-3 border-t border-[var(--border-primary)] flex flex-wrap items-center gap-3">
        {/* Source Select */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--text-muted)]">Source:</span>
          <select
            value={sourceDeviceId}
            onChange={(e) => onChangeSourceDevice(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-[var(--border-primary)] text-white text-xs font-mono"
          >
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.interfaces[0]?.ip || "No IP"})
              </option>
            ))}
          </select>
        </div>

        {/* Target Input */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <span className="text-[11px] text-[var(--text-muted)]">Target:</span>
          <input
            type="text"
            value={targetDestination}
            onChange={(e) => onChangeTargetDestination(e.target.value)}
            placeholder="IP (e.g. 192.168.1.50) or domain"
            className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-[var(--border-primary)] text-white text-xs font-mono"
          />
        </div>

        {/* Protocol Select */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--text-muted)]">Protocol:</span>
          <select
            value={protocol}
            onChange={(e) => onChangeProtocol(e.target.value as "ICMP" | "DNS" | "TCP" | "HTTP")}
            className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-[var(--border-primary)] text-white text-xs font-mono"
          >
            <option value="ICMP">ICMP Echo</option>
            <option value="TCP">TCP SYN</option>
            <option value="HTTP">HTTP GET</option>
            <option value="DNS">DNS Query</option>
          </select>
        </div>
      </div>
    </div>
  );
}
