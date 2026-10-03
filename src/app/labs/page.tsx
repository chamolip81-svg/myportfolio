"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Info, ChevronRight, ChevronDown, CornerDownRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { osiLayers } from "@/lib/data";

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
    const match = input.match(
      /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/
    );
    if (!match) {
      return {
        data: null,
        error: input.length > 0 ? "Enter a valid CIDR notation (e.g., 192.168.1.0/24)" : null,
      };
    }

    const octets = [
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
      parseInt(match[4]),
    ];
    const prefix = parseInt(match[5]);

    if (octets.some((o) => o > 255) || prefix > 32) {
      return {
        data: null,
        error: "Invalid IP address or prefix length",
      };
    }

    const ipNum =
      (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
    const maskNum = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const networkNum = (ipNum & maskNum) >>> 0;
    const broadcastNum = (networkNum | ~maskNum) >>> 0;
    const firstHostNum = prefix >= 31 ? networkNum : (networkNum + 1) >>> 0;
    const lastHostNum =
      prefix >= 31 ? broadcastNum : (broadcastNum - 1) >>> 0;
    const usableHosts =
      prefix >= 31 ? (prefix === 32 ? 1 : 2) : Math.pow(2, 32 - prefix) - 2;

    const toIP = (num: number) =>
      `${(num >>> 24) & 255}.${(num >>> 16) & 255}.${(num >>> 8) & 255}.${num & 255}`;

    return {
      data: {
        network: toIP(networkNum),
        subnetMask: toIP(maskNum),
        firstHost: toIP(firstHostNum),
        lastHost: toIP(lastHostNum),
        broadcast: toIP(broadcastNum),
        usableHosts: usableHosts.toLocaleString(),
        prefix,
      },
      error: null,
    };
  }, [input]);

  const fields = result
    ? [
        { label: "Network Address", value: result.network },
        { label: "Subnet Mask", value: result.subnetMask },
        { label: "First Host", value: result.firstHost },
        { label: "Last Host", value: result.lastHost },
        { label: "Broadcast Address", value: result.broadcast },
        { label: "Usable Hosts", value: result.usableHosts },
        { label: "CIDR Prefix", value: `/${result.prefix}` },
      ]
    : [];

  return (
    <div className="glass-card p-6 md:p-8" id="subnet">
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        IP / Subnet Lab
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-tertiary)" }}
      >
        Enter a CIDR notation to calculate subnet details.
      </p>

      {/* Input */}
      <div className="mb-6">
        <label
          htmlFor="subnet-input"
          className="block text-xs font-mono uppercase tracking-wider mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          CIDR Notation
        </label>
        <input
          id="subnet-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full max-w-sm px-4 py-3 rounded-lg text-sm font-mono outline-none transition-all duration-200"
          style={{
            background: "var(--bg-tertiary)",
            border: `1px solid ${error ? "#f43f5e40" : "var(--border-primary)"}`,
            color: "var(--text-primary)",
          }}
          placeholder="192.168.1.0/24"
          aria-describedby="subnet-error"
        />
        {error && (
          <p
            id="subnet-error"
            className="text-xs mt-2"
            style={{ color: "#f43f5e" }}
            role="alert"
          >
            {error}
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
              className="p-4 rounded-lg"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <p
                className="text-[10px] font-mono uppercase tracking-wider mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                {field.label}
              </p>
              <p
                className="text-sm font-mono font-medium"
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
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string> = {
    whoami: "priyanshu",
    hostname: "portfolio-server",
    uname: "Linux portfolio-server 5.15.0-generic x86_64 GNU/Linux",
    "uname -a":
      "Linux portfolio-server 5.15.0-generic #1 SMP x86_64 GNU/Linux",
    pwd: "/home/priyanshu",
    ls: "Documents  Downloads  Projects  .bashrc  .profile",
    "ls -la":
      "total 28\ndrwxr-xr-x  5 priyanshu priyanshu 4096 Oct  3 22:00 .\ndrwxr-xr-x  3 root      root      4096 Sep 15 10:00 ..\n-rw-r--r--  1 priyanshu priyanshu  220 Sep 15 10:00 .bashrc\n-rw-r--r--  1 priyanshu priyanshu  807 Sep 15 10:00 .profile\ndrwxr-xr-x  2 priyanshu priyanshu 4096 Oct  1 14:00 Documents\ndrwxr-xr-x  2 priyanshu priyanshu 4096 Oct  2 09:00 Downloads\ndrwxr-xr-x  3 priyanshu priyanshu 4096 Oct  3 18:00 Projects",
    "ip addr":
      "1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0",
    "ip route":
      "default via 192.168.1.1 dev eth0\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100",
    "ss -tuln":
      "Netid  State   Recv-Q  Send-Q  Local Address:Port\ntcp    LISTEN  0       128     0.0.0.0:22\ntcp    LISTEN  0       128     0.0.0.0:80\ntcp    LISTEN  0       128     0.0.0.0:443\ntcp    LISTEN  0       128     127.0.0.1:3000",
    df: "Filesystem     Size  Used Avail Use% Mounted on\n/dev/sda1       50G   12G   36G  25% /\ntmpfs          2.0G     0  2.0G   0% /dev/shm",
    "df -h":
      "Filesystem     Size  Used Avail Use% Mounted on\n/dev/sda1       50G   12G   36G  25% /\ntmpfs          2.0G     0  2.0G   0% /dev/shm",
    free: "              total        used        free     shared    available\nMem:        4048572     1245680     1823456      43216     2590120\nSwap:       2097148           0     2097148",
    "free -h":
      "              total        used        free     shared    available\nMem:           3.9G        1.2G        1.7G         42M        2.5G\nSwap:          2.0G          0B        2.0G",
    "ps aux":
      "USER       PID %CPU %MEM    VSZ   RSS TTY    STAT START   TIME COMMAND\nroot         1  0.0  0.1 169332  5432 ?      Ss   Oct03   0:01 /sbin/init\nroot        89  0.0  0.1  72296  3788 ?      Ss   Oct03   0:00 /usr/sbin/sshd\npriyanshu  234  0.0  0.1  24372  4412 pts/0  Ss   22:00   0:00 -bash\npriyanshu  567  0.0  0.0  38384  3284 pts/0  R+   22:05   0:00 ps aux",
    date: new Date().toString(),
    uptime:
      " 22:05:30 up 5 days, 10:23,  1 user,  load average: 0.08, 0.12, 0.10",
    "cat /etc/os-release":
      'NAME="Ubuntu"\nVERSION="22.04.3 LTS (Jammy Jellyfish)"\nID=ubuntu\nPRETTY_NAME="Ubuntu 22.04.3 LTS"',
    clear: "__CLEAR__",
    help: "Available commands:\n  whoami, hostname, uname, pwd, ls, ip addr, ip route,\n  ss -tuln, df, free, ps aux, date, uptime, clear, help\n\n⚠ This is a portfolio simulation for learning purposes.",
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = currentInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setCurrentInput("");
      return;
    }

    const output = commands[cmd] || `bash: ${currentInput}: command not found`;
    setHistory((prev) => [...prev, { command: currentInput, output }]);
    setCurrentInput("");
  };

  return (
    <div className="glass-card overflow-hidden" id="terminal">
      <div className="flex items-center justify-between px-4 py-3" style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid var(--border-primary)"
      }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#f43f5e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          <span
            className="text-xs font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            priyanshu@portfolio:~
          </span>
        </div>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded"
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            color: "#f59e0b",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          }}
        >
          simulation
        </span>
      </div>

      <div
        ref={terminalRef}
        className="p-4 h-[350px] overflow-y-auto font-mono text-[13px] leading-relaxed"
        style={{ background: "#0a0a0c" }}
      >
        {/* Welcome message */}
        <div style={{ color: "var(--text-muted)" }} className="mb-3">
          <p>Welcome to the portfolio terminal simulation.</p>
          <p>Type &apos;help&apos; for available commands.</p>
          <br />
        </div>

        {/* History */}
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            <div>
              <span style={{ color: "#22c55e" }}>priyanshu@portfolio</span>
              <span style={{ color: "var(--text-muted)" }}>:</span>
              <span style={{ color: "#3b82f6" }}>~</span>
              <span style={{ color: "var(--text-muted)" }}>$ </span>
              <span style={{ color: "var(--text-primary)" }}>
                {entry.command}
              </span>
            </div>
            <pre
              className="whitespace-pre-wrap"
              style={{ color: "var(--text-tertiary)" }}
            >
              {entry.output}
            </pre>
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span style={{ color: "#22c55e" }}>priyanshu@portfolio</span>
          <span style={{ color: "var(--text-muted)" }}>:</span>
          <span style={{ color: "#3b82f6" }}>~</span>
          <span style={{ color: "var(--text-muted)" }}>$ </span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent outline-none ml-1"
            style={{ color: "var(--text-primary)", caretColor: "#22c55e" }}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            id="terminal-input"
          />
        </form>
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
          <OSIModelExplorer />
          <SubnetCalculator />
          <HTTPVisualizer />
          <LinuxTerminal />
        </div>
      </div>
    </div>
  );
}
