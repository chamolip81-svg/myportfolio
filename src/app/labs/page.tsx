"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Info,
  ChevronRight,
  ChevronDown,
  CornerDownRight,
  Cloud,
  Shield,
  Database,
  Server,
  Lock,
} from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { osiLayers } from "@/lib/data";
import { calculateSubnet } from "@/lib/subnet";

/* ================================================
   NETWORKING LAB — Client → DNS → Router → Internet → Server
   ================================================ */
function NetworkingLab() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: "client",
      label: "Client",
      color: "#3b82f6",
      description:
        "The client (your browser or application) initiates a request. It needs to resolve the domain name to an IP address before connecting.",
    },
    {
      id: "dns",
      label: "DNS",
      color: "#8b5cf6",
      description:
        "The Domain Name System translates human-readable domain names (like google.com) into IP addresses that computers use to identify each other.",
    },
    {
      id: "router",
      label: "Router",
      color: "#06b6d4",
      description:
        "Routers forward data packets between networks. They determine the best path for data to travel from source to destination using routing tables.",
    },
    {
      id: "internet",
      label: "Internet",
      color: "#22c55e",
      description:
        "The internet is a global network of interconnected networks. Data travels through multiple routers and switches across different networks to reach its destination.",
    },
    {
      id: "server",
      label: "Server",
      color: "#f43f5e",
      description:
        "The server receives the request, processes it, and sends back a response. This could be a web page, API data, or any other resource the client requested.",
    },
  ];

  return (
    <div className="glass-card p-6 md:p-8" id="networking">
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        Networking Lab
      </h3>
      <p
        className="text-sm mb-8"
        style={{ color: "var(--text-tertiary)" }}
      >
        Click on each component to learn how data travels across a network.
      </p>

      {/* Visualization */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveStep(activeStep === index ? null : index)
              }
              className="relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer"
              style={{
                background:
                  activeStep === index
                    ? `${step.color}15`
                    : "var(--bg-tertiary)",
                border: `1.5px solid ${
                  activeStep === index ? `${step.color}50` : "var(--border-primary)"
                }`,
                minWidth: "90px",
              }}
              aria-label={`Learn about ${step.label}`}
              aria-expanded={activeStep === index}
            >
              {activeStep === index && (
                <motion.div
                  layoutId="network-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `${step.color}08`,
                    border: `1.5px solid ${step.color}30`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className="w-3 h-3 rounded-full relative z-10"
                style={{
                  background: step.color,
                  boxShadow:
                    activeStep === index
                      ? `0 0 12px ${step.color}60`
                      : "none",
                }}
              />
              <span
                className="text-xs font-mono font-medium relative z-10"
                style={{
                  color:
                    activeStep === index ? step.color : "var(--text-secondary)",
                }}
              >
                {step.label}
              </span>
            </motion.button>

            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center px-2">
                <div
                  className="w-8 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${steps[index].color}40, ${steps[index + 1].color}40)`,
                  }}
                />
                <ChevronRight
                  size={14}
                  style={{ color: "var(--text-muted)" }}
                />
              </div>
            )}
            {index < steps.length - 1 && (
              <div className="flex md:hidden items-center py-1">
                <ChevronDown
                  size={14}
                  style={{ color: "var(--text-muted)" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Description Panel */}
      <AnimatePresence mode="wait">
        {activeStep !== null && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-xl"
            style={{
              background: `${steps[activeStep].color}08`,
              border: `1px solid ${steps[activeStep].color}20`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} style={{ color: steps[activeStep].color }} />
              <span
                className="text-sm font-semibold"
                style={{ color: steps[activeStep].color }}
              >
                {steps[activeStep].label}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {steps[activeStep].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================
   OSI MODEL EXPLORER
   ================================================ */
function OSIModelExplorer() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  const activeLayer = selectedLayer !== null
    ? osiLayers.find((l) => l.number === selectedLayer) ?? null
    : null;

  return (
    <div className="glass-card p-6 md:p-8" id="osi">
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        OSI Model Explorer
      </h3>
      <p
        className="text-sm mb-8"
        style={{ color: "var(--text-tertiary)" }}
      >
        Select a layer to explore its purpose, protocols, and practical
        explanation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Layer Stack */}
        <div className="space-y-2">
          {osiLayers.map((layer) => (
            <motion.button
              key={layer.number}
              whileHover={{ x: 4 }}
              onClick={() =>
                setSelectedLayer(
                  selectedLayer === layer.number ? null : layer.number
                )
              }
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-left"
              style={{
                background:
                  selectedLayer === layer.number
                    ? `${layer.color}12`
                    : "var(--bg-tertiary)",
                border: `1px solid ${
                  selectedLayer === layer.number
                    ? `${layer.color}30`
                    : "var(--border-primary)"
                }`,
              }}
              aria-label={`Layer ${layer.number}: ${layer.name}`}
              aria-expanded={selectedLayer === layer.number}
            >
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                style={{
                  background: `${layer.color}20`,
                  color: layer.color,
                }}
              >
                {layer.number}
              </span>
              <span
                className="text-sm font-medium flex-1"
                style={{
                  color:
                    selectedLayer === layer.number
                      ? layer.color
                      : "var(--text-secondary)",
                }}
              >
                {layer.name}
              </span>
              <ChevronRight
                size={14}
                style={{
                  color:
                    selectedLayer === layer.number
                      ? layer.color
                      : "var(--text-muted)",
                  transform:
                    selectedLayer === layer.number
                      ? "rotate(90deg)"
                      : "none",
                  transition: "transform 0.2s",
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Layer Details */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeLayer ? (
              <motion.div
                key={activeLayer.number}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-xl h-full"
                style={{
                  background: `${activeLayer.color}06`,
                  border: `1px solid ${activeLayer.color}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-mono font-bold"
                    style={{
                      background: `${activeLayer.color}20`,
                      color: activeLayer.color,
                    }}
                  >
                    {activeLayer.number}
                  </span>
                  <div>
                    <h4
                      className="text-lg font-bold"
                      style={{ color: activeLayer.color }}
                    >
                      {activeLayer.name}
                    </h4>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Layer {activeLayer.number} of 7
                    </p>
                  </div>
                </div>

                {/* Purpose */}
                <div className="mb-4">
                  <h5
                    className="text-xs font-mono uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Purpose
                  </h5>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {activeLayer.purpose}
                  </p>
                </div>

                {/* Protocols */}
                <div className="mb-4">
                  <h5
                    className="text-xs font-mono uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Protocols
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLayer.protocols.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 text-[11px] font-mono rounded"
                        style={{
                          background: `${activeLayer.color}12`,
                          color: activeLayer.color,
                          border: `1px solid ${activeLayer.color}20`,
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div className="mb-4">
                  <h5
                    className="text-xs font-mono uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Examples
                  </h5>
                  <ul className="space-y-1">
                    {activeLayer.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        <CornerDownRight size={10} style={{ opacity: 0.5 }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explanation */}
                <div>
                  <h5
                    className="text-xs font-mono uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    How it works
                  </h5>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {activeLayer.explanation}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full min-h-[300px] rounded-xl"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Select a layer to explore
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ================================================
   IP / SUBNET CALCULATOR
   ================================================ */
function SubnetCalculator() {
  const [input, setInput] = useState("192.168.1.0/24");

  const { data: result, error } = useMemo(() => {
    return calculateSubnet(input);
  }, [input]);

  const presets = [
    { label: "192.168.1.0/24 (Home / LAN)", val: "192.168.1.0/24" },
    { label: "10.0.0.0/16 (Cloud VPC)", val: "10.0.0.0/16" },
    { label: "172.16.0.0/12 (Corporate)", val: "172.16.0.0/12" },
    { label: "10.0.1.0/28 (Micro-Tier)", val: "10.0.1.0/28" },
    { label: "192.0.2.0/31 (RFC 3021 P2P)", val: "192.0.2.0/31" },
    { label: "8.8.8.8/32 (Host Route)", val: "8.8.8.8/32" },
  ];

  const fields = result
    ? [
        { label: "Network Address", value: result.network, badge: "CIDR Base" },
        { label: "Subnet Mask", value: result.subnetMask, badge: `/${result.prefix}` },
        { label: "Wildcard Mask", value: result.wildcardMask, badge: "Inverse" },
        { label: "First Usable Host", value: result.firstHost, badge: "Gateway / Host 1" },
        { label: "Last Usable Host", value: result.lastHost, badge: "Max Allocable" },
        { label: "Broadcast Address", value: result.broadcast, badge: "255 All-Hosts" },
        { label: "Usable Host Count", value: result.usableHostsFormatted, badge: `${result.usableHosts} Hosts` },
        { label: "Address Scope", value: result.ipType, badge: result.ipClass },
        { label: "Binary Mask", value: result.binaryMask, badge: "32-bit Quad" },
      ]
    : [];

  return (
    <div className="glass-card p-6 md:p-8" id="subnet">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
        <h3
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          IP / Subnet Lab & CIDR Engine
        </h3>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 self-start md:self-auto">
          RFC 3021 & Classless Addressing Compatible
        </span>
      </div>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-tertiary)" }}
      >
        Enter any IPv4 address with CIDR notation (/0 to /32) to compute network boundaries, host capacities, and binary masks.
      </p>

      {/* Preset Buttons */}
      <div className="mb-6">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
          Quick Subnet Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.val}
              onClick={() => setInput(p.val)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                input === p.val
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-blue-500/40 hover:text-[var(--text-primary)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label
          htmlFor="subnet-input"
          className="block text-xs font-mono uppercase tracking-wider mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          CIDR Notation Input
        </label>
        <input
          id="subnet-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full max-w-sm px-4 py-3 rounded-lg text-sm font-mono outline-none transition-all duration-200"
          style={{
            background: "var(--bg-tertiary)",
            border: `1px solid ${error ? "#f43f5e80" : "var(--border-primary)"}`,
            color: "var(--text-primary)",
          }}
          placeholder="e.g. 192.168.1.0/24"
          aria-describedby="subnet-error"
          aria-invalid={Boolean(error)}
        />
        {error && (
          <p
            id="subnet-error"
            className="text-xs mt-2 font-mono flex items-center gap-1.5"
            style={{ color: "#f43f5e" }}
            role="alert"
          >
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {fields.map((field) => (
            <div
              key={field.label}
              className="p-4 rounded-lg flex flex-col justify-between"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {field.label}
                </p>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-[var(--text-tertiary)] border border-white/5">
                  {field.badge}
                </span>
              </div>
              <p
                className="text-sm font-mono font-medium truncate"
                style={{ color: "var(--accent-primary)" }}
              >
                {field.value}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ================================================
   HTTP REQUEST VISUALIZER
   ================================================ */
function HTTPVisualizer() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      label: "Browser",
      color: "#3b82f6",
      description: "User enters a URL. The browser parses it and prepares to make a request.",
    },
    {
      label: "DNS Lookup",
      color: "#8b5cf6",
      description: "Browser queries DNS to resolve the domain name into an IP address.",
    },
    {
      label: "TCP Handshake",
      color: "#06b6d4",
      description: "A three-way handshake (SYN → SYN-ACK → ACK) establishes a TCP connection.",
    },
    {
      label: "TLS Negotiation",
      color: "#22c55e",
      description: "For HTTPS, client and server negotiate encryption via the TLS handshake.",
    },
    {
      label: "HTTP Request",
      color: "#f59e0b",
      description: "Browser sends an HTTP request (GET, POST, etc.) with headers and optional body.",
    },
    {
      label: "Server Processing",
      color: "#f43f5e",
      description: "Server receives the request, processes it, queries databases, and prepares a response.",
    },
    {
      label: "HTTP Response",
      color: "#8b5cf6",
      description: "Server sends back an HTTP response with status code, headers, and body (HTML, JSON, etc.).",
    },
  ];

  const animate = useCallback(() => {
    setIsAnimating(true);
    setCurrentStep(-1);
    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }
      setCurrentStep(step);
      step++;
    }, 800);
  }, [steps.length]);

  return (
    <div className="glass-card p-6 md:p-8" id="http">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h3
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          HTTP Request Visualizer
        </h3>
        <button
          onClick={animate}
          disabled={isAnimating}
          className="btn-primary text-xs py-2 px-4"
          style={{ opacity: isAnimating ? 0.5 : 1 }}
          id="http-animate-btn"
        >
          {isAnimating ? "Animating..." : "Animate Request"}
        </button>
      </div>
      <p
        className="text-sm mb-8"
        style={{ color: "var(--text-tertiary)" }}
      >
        Watch how an HTTP request flows from your browser to a server and back.
      </p>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={false}
            animate={{
              opacity: currentStep >= index ? 1 : 0.3,
              x: currentStep >= index ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-4"
          >
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 flex-shrink-0"
                style={{
                  background:
                    currentStep >= index
                      ? `${step.color}20`
                      : "var(--bg-tertiary)",
                  color:
                    currentStep >= index ? step.color : "var(--text-muted)",
                  border: `1.5px solid ${
                    currentStep >= index
                      ? `${step.color}40`
                      : "var(--border-primary)"
                  }`,
                  boxShadow:
                    currentStep === index
                      ? `0 0 12px ${step.color}30`
                      : "none",
                }}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className="w-px h-6"
                  style={{
                    background:
                      currentStep > index
                        ? `${step.color}40`
                        : "var(--border-primary)",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="pt-1 flex-1 min-w-0">
              <p
                className="text-sm font-semibold mb-0.5"
                style={{
                  color:
                    currentStep >= index ? step.color : "var(--text-muted)",
                }}
              >
                {step.label}
              </p>
              {currentStep >= index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {step.description}
                </motion.p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ================================================
   LINUX TERMINAL SIMULATION
   ================================================ */
function LinuxTerminal() {
  const [history, setHistory] = useState<
    Array<{ command: string; output: string }>
  >([]);
  const [currentInput, setCurrentInput] = useState("");
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandList = [
    "whoami",
    "uname -a",
    "ip addr",
    "ip route",
    "ss -tuln",
    "df -h",
    "free -h",
    "help",
    "clear",
  ];

  const commands: Record<string, string> = {
    whoami: "priyanshu",
    hostname: "portfolio-server",
    uname: "Linux portfolio-server 5.15.0-generic x86_64 GNU/Linux",
    "uname -a":
      "Linux portfolio-server 5.15.0-generic #1 SMP x86_64 GNU/Linux (Ubuntu 22.04 LTS)",
    pwd: "/home/priyanshu",
    ls: "Documents  Downloads  Projects  .bashrc  .profile",
    "ls -la":
      "total 28\ndrwxr-xr-x  5 priyanshu priyanshu 4096 Oct  3 22:00 .\ndrwxr-xr-x  3 root      root      4096 Sep 15 10:00 ..\n-rw-r--r--  1 priyanshu priyanshu  220 Sep 15 10:00 .bashrc\n-rw-r--r--  1 priyanshu priyanshu  807 Sep 15 10:00 .profile\ndrwxr-xr-x  2 priyanshu priyanshu 4096 Oct  1 14:00 Documents\ndrwxr-xr-x  2 priyanshu priyanshu 4096 Oct  2 09:00 Downloads\ndrwxr-xr-x  3 priyanshu priyanshu 4096 Oct  3 18:00 Projects",
    "ip addr":
      "1: lo: <LOOPBACK,UP> mtu 65536 qdisc noqueue state UNKNOWN group default\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500 qdisc mq state UP group default\n    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0",
    "ip route":
      "default via 192.168.1.1 dev eth0 proto dhcp metric 100\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100",
    "ss -tuln":
      "Netid  State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port\ntcp    LISTEN  0       128     0.0.0.0:22          0.0.0.0:*\ntcp    LISTEN  0       128     0.0.0.0:80          0.0.0.0:*\ntcp    LISTEN  0       128     0.0.0.0:443         0.0.0.0:*\ntcp    LISTEN  0       128     127.0.0.1:3000      0.0.0.0:*",
    df: "Filesystem     Size  Used Avail Use% Mounted on\n/dev/sda1       50G   12G   36G  25% /\ntmpfs          2.0G     0  2.0G   0% /dev/shm",
    "df -h":
      "Filesystem     Size  Used Avail Use% Mounted on\n/dev/sda1       50G   12G   36G  25% /\ntmpfs          2.0G     0  2.0G   0% /dev/shm\n/dev/sda2      100G   24G   76G  24% /data",
    free: "              total        used        free     shared    available\nMem:        4048572     1245680     1823456      43216     2590120\nSwap:       2097148           0     2097148",
    "free -h":
      "              total        used        free     shared    available\nMem:           3.9Gi       1.2Gi       1.7Gi        42Mi       2.5Gi\nSwap:          2.0Gi          0B       2.0Gi",
    "ps aux":
      "USER       PID %CPU %MEM    VSZ   RSS TTY    STAT START   TIME COMMAND\nroot         1  0.0  0.1 169332  5432 ?      Ss   Oct03   0:01 /sbin/init\nroot        89  0.0  0.1  72296  3788 ?      Ss   Oct03   0:00 /usr/sbin/sshd\npriyanshu  234  0.0  0.1  24372  4412 pts/0  Ss   22:00   0:00 -bash\npriyanshu  567  0.0  0.0  38384  3284 pts/0  R+   22:05   0:00 ps aux",
    date: new Date().toUTCString(),
    uptime:
      " 15:45:10 up 12 days, 4:18, 1 user, load average: 0.04, 0.08, 0.06",
    "cat /etc/os-release":
      'NAME="Ubuntu"\nVERSION="22.04.4 LTS (Jammy Jellyfish)"\nID=ubuntu\nPRETTY_NAME="Ubuntu 22.04.4 LTS"\nVERSION_CODENAME=jammy',
    clear: "__CLEAR__",
    help: "Supported Commands:\n  whoami      - Print effective user identity\n  hostname    - Print system network node name\n  uname -a    - Print operating system & kernel release\n  ip addr     - Show network addresses and link status\n  ip route    - Show IP routing table & gateway\n  ss -tuln    - Dump listening TCP/UDP sockets\n  df -h       - Disk space usage in human-readable units\n  free -h     - Memory and swap consumption metrics\n  ps aux      - Snapshot of active system processes\n  date        - Current timestamp (UTC)\n  uptime      - System uptime and load averages\n  clear       - Wipe terminal output buffer\n  help        - Display this reference manual\n\n[CLIENT-SIDE SANDBOX: Safe educational simulator. Never executes arbitrary host binaries.]",
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === "clear") {
      setHistory([]);
      setCurrentInput("");
      setHistoryPointer(-1);
      return;
    }

    const output =
      commands[cmd.toLowerCase()] ||
      `bash: ${cmd}: command not found. Type 'help' for available diagnostic commands.`;

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCurrentInput("");
    setHistoryPointer(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(currentInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextPointer =
        historyPointer === -1
          ? history.length - 1
          : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setCurrentInput(history[nextPointer].command);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      if (historyPointer < history.length - 1) {
        const nextPointer = historyPointer + 1;
        setHistoryPointer(nextPointer);
        setCurrentInput(history[nextPointer].command);
      } else {
        setHistoryPointer(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <div className="glass-card overflow-hidden" id="terminal">
      {/* Header Bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full" style={{ background: "#f43f5e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          <span
            className="text-xs font-mono font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            priyanshu@portfolio-linux-sandbox:~
          </span>
        </div>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded font-medium"
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            color: "#22c55e",
            border: "1px solid rgba(34, 197, 94, 0.2)",
          }}
        >
          SAFE SIMULATION
        </span>
      </div>

      {/* Quick Command Pills for Touch & Desktop */}
      <div
        className="px-4 py-2 flex flex-wrap items-center gap-1.5 border-b border-[var(--border-primary)]"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        <span className="text-[10px] font-mono text-[var(--text-muted)] mr-1">
          Quick Run:
        </span>
        {commandList.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              executeCommand(cmd);
              if (inputRef.current) inputRef.current.focus();
            }}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-white hover:border-emerald-500/40 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Viewport */}
      <div
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 h-[350px] overflow-y-auto font-mono text-[13px] leading-relaxed cursor-text"
        style={{ background: "#09090b" }}
        role="region"
        aria-label="Simulated Linux terminal screen"
      >
        {/* Welcome Banner */}
        <div style={{ color: "var(--text-muted)" }} className="mb-3 text-xs">
          <p className="text-emerald-400 font-semibold">
            Priyanshu Linux Diagnostics Sandbox (Ubuntu 22.04 LTS Kernel 5.15)
          </p>
          <p>
            Educational simulator. Use the quick buttons above or type commands below. Type &apos;help&apos; for list.
          </p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">
            Tip: Press Up / Down arrows to cycle through previous commands.
          </p>
        </div>

        {/* History Stream */}
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-center gap-1">
              <span style={{ color: "#22c55e" }}>priyanshu@portfolio</span>
              <span style={{ color: "var(--text-muted)" }}>:</span>
              <span style={{ color: "#3b82f6" }}>~</span>
              <span style={{ color: "var(--text-muted)" }}>$</span>
              <span style={{ color: "var(--text-primary)" }} className="font-semibold ml-1">
                {entry.command}
              </span>
            </div>
            <pre
              className="whitespace-pre-wrap mt-0.5 text-xs text-[var(--text-secondary)] font-mono overflow-x-auto"
            >
              {entry.output}
            </pre>
          </div>
        ))}

        {/* Interactive Prompt */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span style={{ color: "#22c55e" }}>priyanshu@portfolio</span>
          <span style={{ color: "var(--text-muted)" }}>:</span>
          <span style={{ color: "#3b82f6" }}>~</span>
          <span style={{ color: "var(--text-muted)" }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none ml-1.5 text-sm"
            style={{ color: "var(--text-primary)", caretColor: "#22c55e" }}
            spellCheck={false}
            autoComplete="off"
            aria-label="Linux simulation terminal input command"
            id="terminal-input"
          />
        </form>
      </div>
    </div>
  );
}

/* ================================================
   CLOUD VPC ARCHITECT LAB — Multi-Tier AWS Blueprint
   ================================================ */
interface VPCComponent {
  id: string;
  name: string;
  tier: "Public Subnet" | "Private App Subnet" | "Database Subnet" | "Gateway";
  cidr: string;
  az: string;
  route: string;
  securityGroup: string;
  details: string;
}

const vpcComponents: VPCComponent[] = [
  {
    id: "igw",
    name: "Internet Gateway (IGW)",
    tier: "Gateway",
    cidr: "0.0.0.0/0",
    az: "Region-wide VPC Attachment",
    route: "Default gateway for Public Route Table (0.0.0.0/0 -> igw)",
    securityGroup: "N/A (Managed redundant VPC entry point)",
    details: "Provides bidirectional network address translation for instances with public IPs, allowing users to connect into the VPC.",
  },
  {
    id: "alb",
    name: "Application Load Balancer (ALB)",
    tier: "Public Subnet",
    cidr: "10.0.1.0/24 & 10.0.2.0/24",
    az: "Dual-AZ (us-east-1a & us-east-1b)",
    route: "Local 10.0.0.0/16, Default via IGW",
    securityGroup: "Inbound: TCP 443/80 from 0.0.0.0/0 | Outbound: Port 8080 to App-SG",
    details: "Handles SSL/TLS termination, performs continuous health checks, and evenly distributes client requests across backend app containers.",
  },
  {
    id: "nat",
    name: "Managed NAT Gateway",
    tier: "Public Subnet",
    cidr: "10.0.1.240 (Allocated Elastic IP)",
    az: "us-east-1a",
    route: "Target for default route (0.0.0.0/0) in Private Route Table",
    securityGroup: "Stateful egress translation; drops unsolicited inbound connections",
    details: "Enables private app instances to fetch security updates, OS patches, and external SaaS APIs without exposing their interfaces to the public web.",
  },
  {
    id: "app-tier",
    name: "Private App Workload Tier",
    tier: "Private App Subnet",
    cidr: "10.0.11.0/24 & 10.0.12.0/24",
    az: "Multi-AZ (us-east-1a & us-east-1b)",
    route: "0.0.0.0/0 -> NAT Gateway, 10.0.0.0/16 -> Local",
    securityGroup: "Inbound: TCP 8080 strictly from ALB-SG | Outbound: TCP 5432 to DB-SG",
    details: "Auto-scaled containerized web application cluster. Instances have private-only IPs, completely shielded from internet scrapers and port scans.",
  },
  {
    id: "db-tier",
    name: "Isolated Multi-AZ Database Tier",
    tier: "Database Subnet",
    cidr: "10.0.21.0/24 & 10.0.22.0/24",
    az: "Multi-AZ (Primary 1a, Synchronous Standby 1b)",
    route: "10.0.0.0/16 -> Local only (Strictly air-gapped from internet)",
    securityGroup: "Inbound: TCP 5432 strictly from App-SG | Outbound: Synced replica link",
    details: "Production database tier with automated synchronous replication. If the primary node experiences hardware failure, RDS initiates seamless DNS failover.",
  },
];

function CloudVPCVisualizer() {
  const [activeTraffic, setActiveTraffic] = useState<"inbound" | "outbound" | "replication">("inbound");
  const [selectedComp, setSelectedComp] = useState<VPCComponent>(vpcComponents[1]);

  return (
    <div className="glass-card p-6 md:p-8" id="cloud">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-2">
            <Cloud size={13} />
            <span>AWS Multi-Tier VPC Architect • 10.0.0.0/16</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            Cloud & VPC Architecture Blueprint
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            An interactive multi-AZ architecture model demonstrating defense-in-depth network segmentation.
          </p>
        </div>

        {/* Traffic Simulator Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
          <button
            onClick={() => setActiveTraffic("inbound")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeTraffic === "inbound"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Inbound HTTPS
          </button>
          <button
            onClick={() => setActiveTraffic("outbound")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeTraffic === "outbound"
                ? "bg-cyan-600 text-white font-semibold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Outbound NAT
          </button>
          <button
            onClick={() => setActiveTraffic("replication")}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeTraffic === "replication"
                ? "bg-purple-600 text-white font-semibold shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            DB Multi-AZ Sync
          </button>
        </div>
      </div>

      {/* Architecture Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Topology Diagram */}
        <div className="lg:col-span-2 space-y-4 p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          {/* Edge / Gateway Bar */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-[var(--text-primary)] font-semibold">Public Internet</span>
            </div>
            <button
              onClick={() => setSelectedComp(vpcComponents[0])}
              className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                selectedComp.id === "igw"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                  : "bg-black/30 text-[var(--text-secondary)] border-[var(--border-primary)] hover:text-white"
              }`}
            >
              Internet Gateway (IGW)
            </button>
          </div>

          {/* VPC Boundary */}
          <div className="p-4 rounded-xl border border-dashed border-blue-500/30 bg-blue-950/10 space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span className="text-blue-400 font-semibold">VPC CIDR: 10.0.0.0/16</span>
              <span>Region: us-east-1 (2 Availability Zones)</span>
            </div>

            {/* Public Tier */}
            <div
              onClick={() => setSelectedComp(vpcComponents[1])}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                selectedComp.id === "alb" || selectedComp.id === "nat"
                  ? "bg-blue-500/10 border-blue-500/40 shadow-sm"
                  : "bg-[var(--bg-tertiary)] border-[var(--border-primary)] hover:border-blue-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-blue-400 flex items-center gap-1.5">
                  <Shield size={14} /> Tier 1: Public Subnets (10.0.1.0/24 & 10.0.2.0/24)
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">IGW Route: 0.0.0.0/0</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComp(vpcComponents[1]);
                  }}
                  className={`p-2 rounded bg-black/40 border ${
                    selectedComp.id === "alb" ? "border-blue-400 text-blue-300" : "border-white/5 text-[var(--text-secondary)]"
                  }`}
                >
                  <div className="text-[10px] text-[var(--text-muted)]">us-east-1a / 1b</div>
                  <div className="font-semibold text-white">Dual-AZ ALB</div>
                  <div className="text-[10px] text-emerald-400">Port 443 → 8080</div>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComp(vpcComponents[2]);
                  }}
                  className={`p-2 rounded bg-black/40 border ${
                    selectedComp.id === "nat" ? "border-cyan-400 text-cyan-300" : "border-white/5 text-[var(--text-secondary)]"
                  }`}
                >
                  <div className="text-[10px] text-[var(--text-muted)]">us-east-1a</div>
                  <div className="font-semibold text-white">NAT Gateway</div>
                  <div className="text-[10px] text-cyan-400">Elastic IP Egress</div>
                </div>
              </div>
            </div>

            {/* Private App Tier */}
            <div
              onClick={() => setSelectedComp(vpcComponents[3])}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                selectedComp.id === "app-tier"
                  ? "bg-cyan-500/10 border-cyan-500/40 shadow-sm"
                  : "bg-[var(--bg-tertiary)] border-[var(--border-primary)] hover:border-cyan-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Server size={14} /> Tier 2: Private Application Subnets (10.0.11.0/24 & 10.0.12.0/24)
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">No Public IPs</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-[var(--text-muted)]">AZ 1a (Private)</div>
                  <div className="font-semibold text-white">App Microservice A</div>
                  <div className="text-[10px] text-cyan-400">IP: 10.0.11.45</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-[var(--text-muted)]">AZ 1b (Private)</div>
                  <div className="font-semibold text-white">App Microservice B</div>
                  <div className="text-[10px] text-cyan-400">IP: 10.0.12.92</div>
                </div>
              </div>
            </div>

            {/* Isolated Database Tier */}
            <div
              onClick={() => setSelectedComp(vpcComponents[4])}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                selectedComp.id === "db-tier"
                  ? "bg-purple-500/10 border-purple-500/40 shadow-sm"
                  : "bg-[var(--bg-tertiary)] border-[var(--border-primary)] hover:border-purple-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-purple-400 flex items-center gap-1.5">
                  <Database size={14} /> Tier 3: Isolated Database Subnets (10.0.21.0/24 & 10.0.22.0/24)
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Lock size={11} /> Air-Gapped Egress
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-purple-300">us-east-1a (Primary Write)</div>
                  <div className="font-semibold text-white">RDS PostgreSQL</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Port: 5432 (App SG only)</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-purple-300">us-east-1b (Standby Replica)</div>
                  <div className="font-semibold text-white">Sync Standby</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Automatic Failover Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-primary)] mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Component Inspector</span>
                <h4 className="text-base font-bold text-[var(--text-primary)] mt-0.5">{selectedComp.name}</h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {selectedComp.tier}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">CIDR / IP Range:</span>
                <span className="font-mono text-cyan-400 font-medium">{selectedComp.cidr}</span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">Availability Zone:</span>
                <span className="font-mono text-[var(--text-secondary)]">{selectedComp.az}</span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">Route Table Rule:</span>
                <span className="font-mono text-[var(--text-secondary)]">{selectedComp.route}</span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">Security Group Ingress/Egress:</span>
                <span className="font-mono text-emerald-400 text-[11px] leading-tight block">{selectedComp.securityGroup}</span>
              </div>

              <div className="pt-2 border-t border-[var(--border-primary)]">
                <span className="text-[11px] font-mono text-[var(--text-muted)] block mb-1">Architectural Role:</span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{selectedComp.details}</p>
              </div>
            </div>
          </div>

          {/* Active Flow Legend */}
          <div className="mt-6 pt-3 border-t border-[var(--border-primary)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">Current Active Traffic Simulation:</span>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>
                {activeTraffic === "inbound" && "Internet → IGW → Public ALB → Private App Container (8080)"}
                {activeTraffic === "outbound" && "App Container (10.0.11.45) → NAT GW (10.0.1.240) → IGW → External"}
                {activeTraffic === "replication" && "Primary DB (1a) == Synchronous Mirroring ==> Standby DB (1b)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================
   LABS PAGE
   ================================================ */
export default function LabsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ paddingTop: "var(--header-height)" }}
    >
      <div className="section-container py-16 md:py-24">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-200"
          style={{ color: "var(--text-tertiary)" }}
          id="labs-back-link"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <SectionHeading
          label="Interactive Labs"
          title="Learning Through Exploration"
          description="Educational interactive visualizations to explore networking, protocols, and system concepts. These are learning tools, not claimed professional projects."
          align="left"
        />

        <div className="space-y-8">
          <NetworkingLab />
          <CloudVPCVisualizer />
          <OSIModelExplorer />
          <SubnetCalculator />
          <HTTPVisualizer />
          <LinuxTerminal />
        </div>
      </div>
    </div>
  );
}
