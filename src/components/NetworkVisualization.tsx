"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  radius: number;
}

interface NetworkEdge {
  from: string;
  to: string;
}

const nodes: NetworkNode[] = [
  { id: "client", label: "Client", x: 80, y: 60, color: "#3b82f6", radius: 22 },
  { id: "dns", label: "DNS", x: 200, y: 30, color: "#8b5cf6", radius: 18 },
  { id: "router", label: "Router", x: 200, y: 100, color: "#06b6d4", radius: 20 },
  { id: "firewall", label: "Firewall", x: 320, y: 55, color: "#f59e0b", radius: 18 },
  { id: "internet", label: "Internet", x: 320, y: 130, color: "#22c55e", radius: 24 },
  { id: "server", label: "Server", x: 440, y: 80, color: "#f43f5e", radius: 22 },
  { id: "cloud", label: "Cloud", x: 440, y: 150, color: "#06b6d4", radius: 20 },
  { id: "db", label: "DB", x: 540, y: 110, color: "#8b5cf6", radius: 18 },
];

const edges: NetworkEdge[] = [
  { from: "client", to: "dns" },
  { from: "client", to: "router" },
  { from: "dns", to: "firewall" },
  { from: "router", to: "internet" },
  { from: "router", to: "firewall" },
  { from: "firewall", to: "server" },
  { from: "internet", to: "server" },
  { from: "internet", to: "cloud" },
  { from: "server", to: "db" },
  { from: "cloud", to: "db" },
];

export default function NetworkVisualization() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [packetPath, setPacketPath] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketPath((prev) => (prev + 1) % edges.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getNodeById = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-full max-w-[620px] mx-auto"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 620 190"
        className="w-full h-auto"
        role="img"
        aria-label="Network topology visualization showing client, DNS, router, firewall, internet, server, cloud, and database connections"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Packet gradient */}
          <radialGradient id="packet-glow">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection Lines */}
        {edges.map((edge, i) => {
          const from = getNodeById(edge.from);
          const to = getNodeById(edge.to);
          const isActive =
            activeNode === edge.from || activeNode === edge.to;
          return (
            <g key={`edge-${i}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "rgba(59, 130, 246, 0.4)" : "rgba(255,255,255,0.06)"}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
                className="transition-all duration-500"
              />
              {/* Animated packet */}
              {i === packetPath && (
                <motion.circle
                  r={3}
                  fill="#3b82f6"
                  filter="url(#glow)"
                  initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                  animate={{
                    cx: [from.x, to.x],
                    cy: [from.y, to.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = activeNode === node.id;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + i * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={node.label}
              onFocus={() => setActiveNode(node.id)}
              onBlur={() => setActiveNode(null)}
            >
              {/* Outer glow ring */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius + 8}
                fill="none"
                stroke={node.color}
                strokeWidth={0.5}
                opacity={isActive ? 0.3 : 0.08}
                className="transition-opacity duration-300"
              />

              {/* Node background */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill={`${node.color}10`}
                stroke={node.color}
                strokeWidth={isActive ? 1.5 : 0.8}
                opacity={isActive ? 1 : 0.6}
                className="transition-all duration-300"
              />

              {/* Pulse animation for active */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={0.5}
                  initial={{ r: node.radius, opacity: 0.6 }}
                  animate={{ r: node.radius + 16, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* Label */}
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? node.color : "rgba(255,255,255,0.5)"}
                fontSize={node.radius > 20 ? 9 : 7.5}
                fontFamily="var(--font-mono)"
                fontWeight={500}
                className="transition-colors duration-300 select-none pointer-events-none"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </motion.div>
  );
}
