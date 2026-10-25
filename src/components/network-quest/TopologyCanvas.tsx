"use client";

import { useMemo } from "react";
import type { NetworkDevice, NetworkLink, PacketEvent, DeviceType } from "@/lib/network-quest/types";

interface TopologyCanvasProps {
  devices: NetworkDevice[];
  links: NetworkLink[];
  selectedDeviceId: string | null;
  selectedLinkId: string | null;
  onSelectDevice: (deviceId: string) => void;
  onSelectLink: (linkId: string) => void;
  isSimulating: boolean;
  activePacketNodeId: string | null;
  activePacketEvent: PacketEvent | null;
}

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 440;

function DeviceIcon({ type }: { type: DeviceType }) {
  switch (type) {
    case "pc":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "switch":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <line x1="6" y1="12" x2="18" y2="12" />
          <polyline points="9 9 6 12 9 15" />
          <polyline points="15 9 18 12 15 15" />
        </svg>
      );
    case "router":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10" />
          <path d="m9 9 3-3 3 3M9 15l3 3 3-3" />
        </svg>
      );
    case "dns-server":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "web-server":
    default:
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
  }
}

export default function TopologyCanvas({
  devices,
  links,
  selectedDeviceId,
  selectedLinkId,
  onSelectDevice,
  onSelectLink,
  isSimulating,
  activePacketNodeId,
  activePacketEvent,
}: TopologyCanvasProps) {
  // Map device percentage positions to pixel coordinates
  const deviceCoords = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    devices.forEach((d) => {
      const px = (d.position.x / 100) * CANVAS_WIDTH;
      const py = (d.position.y / 100) * CANVAS_HEIGHT;
      map.set(d.id, { x: px, y: py });
    });
    return map;
  }, [devices]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[#09090b]/90 backdrop-blur-md shadow-2xl">
      {/* Background Topology Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Canvas Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-primary)]/80 bg-black/40 px-4 py-2.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[var(--text-secondary)] font-medium">Interactive Topology Canvas</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
          <span className="hidden sm:inline">Click device to inspect / configure</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>{devices.length} Nodes</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{links.length} Links</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[520px]">
        <svg
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          className="w-full h-full select-none"
          role="region"
          aria-label="Interactive Network Topology Diagram"
        >
          <defs>
            {/* Glow Filter for Active Elements */}
            <filter id="nq-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Linear Gradients */}
            <linearGradient id="link-up-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="link-down-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* 1. Connection Links (Layer 1 Cables) */}
          <g id="topology-links">
            {links.map((link) => {
              const srcCoord = deviceCoords.get(link.sourceDeviceId);
              const tgtCoord = deviceCoords.get(link.targetDeviceId);
              if (!srcCoord || !tgtCoord) return null;

              const isDown = link.status === "down";
              const isSelected = selectedLinkId === link.id;

              return (
                <g key={link.id} className="cursor-pointer" onClick={() => onSelectLink(link.id)}>
                  {/* Click target area */}
                  <line
                    x1={srcCoord.x}
                    y1={srcCoord.y}
                    x2={tgtCoord.x}
                    y2={tgtCoord.y}
                    stroke="transparent"
                    strokeWidth="20"
                  />

                  {/* Base Cable Line */}
                  <line
                    x1={srcCoord.x}
                    y1={srcCoord.y}
                    x2={tgtCoord.x}
                    y2={tgtCoord.y}
                    stroke={isDown ? "#f43f5e" : isSelected ? "#38bdf8" : "rgba(255, 255, 255, 0.15)"}
                    strokeWidth={isSelected ? 3.5 : isDown ? 2 : 2.5}
                    strokeDasharray={isDown ? "6 6" : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Active Link Energy Line (if link is UP) */}
                  {!isDown && (
                    <line
                      x1={srcCoord.x}
                      y1={srcCoord.y}
                      x2={tgtCoord.x}
                      y2={tgtCoord.y}
                      stroke="url(#link-up-gradient)"
                      strokeWidth={isSelected ? 3 : 2}
                      strokeOpacity={0.6}
                    />
                  )}

                  {/* Cable Midpoint Status Badge */}
                  {isDown && (
                    <g transform={`translate(${(srcCoord.x + tgtCoord.x) / 2}, ${(srcCoord.y + tgtCoord.y) / 2})`}>
                      <circle r="10" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
                      <line x1="-4" y1="-4" x2="4" y2="4" stroke="#f43f5e" strokeWidth="1.5" />
                      <line x1="4" y1="-4" x2="-4" y2="4" stroke="#f43f5e" strokeWidth="1.5" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* 2. Device Nodes */}
          <g id="topology-nodes">
            {devices.map((device) => {
              const coord = deviceCoords.get(device.id);
              if (!coord) return null;

              const isSelected = selectedDeviceId === device.id;
              const isCurrentPacketNode = activePacketNodeId === device.id;
              const primaryIface = device.interfaces[0];
              const isDown = !primaryIface?.enabled || device.status === "offline";

              return (
                <g
                  key={device.id}
                  transform={`translate(${coord.x}, ${coord.y})`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${device.name} (${device.type}), ${primaryIface?.ip || "no IP"}, status: ${isDown ? "offline" : "online"}`}
                  onClick={() => onSelectDevice(device.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectDevice(device.id);
                    }
                  }}
                  className="cursor-pointer focus:outline-none transition-transform duration-200 hover:scale-105"
                >
                  {/* Selection Glow Indicator */}
                  {isSelected && (
                    <circle
                      r="40"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-spin"
                      style={{ animationDuration: "12s" }}
                    />
                  )}

                  {/* Active Packet Transmission Halo */}
                  {isCurrentPacketNode && (
                    <circle
                      r="46"
                      fill="rgba(59, 130, 246, 0.15)"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      className="animate-ping"
                      style={{ animationDuration: "1.2s" }}
                    />
                  )}

                  {/* Device Base Circle / Icon Housing */}
                  <circle
                    r="30"
                    fill={isDown ? "#1c1417" : "#141417"}
                    stroke={
                      isCurrentPacketNode
                        ? "#3b82f6"
                        : isSelected
                        ? "#38bdf8"
                        : isDown
                        ? "#f43f5e"
                        : "var(--border-secondary)"
                    }
                    strokeWidth={isSelected || isCurrentPacketNode ? 2.5 : 1.5}
                    className="transition-colors duration-200"
                  />

                  {/* Device Icon */}
                  <g
                    transform="translate(-11, -11)"
                    className={
                      isCurrentPacketNode
                        ? "text-blue-400"
                        : isSelected
                        ? "text-cyan-300"
                        : isDown
                        ? "text-rose-400"
                        : "text-[var(--text-secondary)]"
                    }
                  >
                    <DeviceIcon type={device.type} />
                  </g>

                  {/* Interface State LED Pill */}
                  <circle
                    cx="20"
                    cy="-20"
                    r="5"
                    fill={isDown ? "#f43f5e" : "#22c55e"}
                    stroke="#09090b"
                    strokeWidth="1.5"
                  />

                  {/* Device Name Label */}
                  <text
                    x="0"
                    y="46"
                    textAnchor="middle"
                    fill={isSelected ? "#fafafa" : "var(--text-primary)"}
                    fontSize="13"
                    fontWeight={isSelected ? "bold" : "600"}
                    fontFamily="var(--font-mono)"
                  >
                    {device.name}
                  </text>

                  {/* IP Address Pill / Subtitle */}
                  {primaryIface?.ip && (
                    <g transform="translate(0, 62)">
                      <rect
                        x="-52"
                        y="-10"
                        width="104"
                        height="18"
                        rx="4"
                        fill="#18181b"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill={isDown ? "#f43f5e" : "#38bdf8"}
                        fontSize="10"
                        fontWeight="500"
                        fontFamily="var(--font-mono)"
                      >
                        {primaryIface.ip}
                        {primaryIface.prefix ? `/${primaryIface.prefix}` : ""}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* 3. Live Animated Packet Indicator */}
          {isSimulating && activePacketNodeId && (
            (() => {
              const coord = deviceCoords.get(activePacketNodeId);
              if (!coord) return null;

              return (
                <g transform={`translate(${coord.x}, ${coord.y - 48})`} className="pointer-events-none">
                  {/* Speech Bubble / Badge */}
                  <rect
                    x="-65"
                    y="-18"
                    width="130"
                    height="24"
                    rx="6"
                    fill="#1e1e22"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    filter="url(#nq-glow)"
                  />
                  <text
                    x="0"
                    y="-2"
                    textAnchor="middle"
                    fill="#60a5fa"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="var(--font-mono)"
                  >
                    {activePacketEvent?.protocol || "PACKET"}
                  </text>
                  {/* Arrow Pointing Down */}
                  <polygon points="-5,6 5,6 0,11" fill="#1e1e22" />
                </g>
              );
            })()
          )}
        </svg>
      </div>
    </div>
  );
}
