import {
  Network,
  Cloud,
  Terminal,
  Monitor,
  Shield,
  Code2,
  Globe,
  Server,
  Database,
  GitBranch,
  Cpu,
  Layers,
  BookOpen,
  Wrench,
  FileText,
  Music,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

// ==========================================
// Site Configuration
// ==========================================
export const siteConfig = {
  name: "Priyanshu Chamoli",
  title: "Priyanshu Chamoli | Full-Stack & Frontend Developer | Systems & Cloud",
  description:
    "Official engineering portfolio of Priyanshu Chamoli, a frontend and full-stack developer based in Dehradun, India, specializing in Next.js, React, Node.js, Linux infrastructure, and interactive simulators.",
  url: "https://www.priyanshuchamoli.dev",
  locale: "en_IN",
  positioning: "Frontend & Full-Stack Developer • Systems & Cloud",
  location: "Dehradun, Uttarakhand, India",
  email: "chamolip81@gmail.com",
  phone: "7668711674",
  github: "https://github.com/chamolip81-svg",
  linkedin: "https://www.linkedin.com/in/priyanshu-chamoli-67522532b",
} as const;

// ==========================================
// Navigation
// ==========================================
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Labs", href: "/labs" },
  { label: "Quest", href: "/network-quest" },
  { label: "Notes", href: "/notes" },
  { label: "Resume", href: "/resume" },
  { label: "Setup", href: "/setup" },
  { label: "Contact", href: "/contact" },
];

// ==========================================
// Technical Interests
// ==========================================
export interface TechnicalInterest {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
}

export const technicalInterests: TechnicalInterest[] = [
  {
    id: "networking",
    title: "Networking",
    description:
      "IP addressing, subnetting, routing, protocols and network fundamentals.",
    icon: Network,
    color: "#3b82f6",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    description:
      "Cloud infrastructure, services, deployment and distributed systems.",
    icon: Cloud,
    color: "#06b6d4",
    gradient: "from-cyan-500/10 to-cyan-600/5",
  },
  {
    id: "linux",
    title: "Linux",
    description:
      "Command-line tools, system administration fundamentals and Linux environments.",
    icon: Terminal,
    color: "#22c55e",
    gradient: "from-green-500/10 to-green-600/5",
  },
  {
    id: "virtual-labs",
    title: "Virtual Labs",
    description:
      "Learning through virtual machines, network simulations and isolated environments.",
    icon: Monitor,
    color: "#8b5cf6",
    gradient: "from-violet-500/10 to-violet-600/5",
  },
  {
    id: "security",
    title: "Security Fundamentals",
    description:
      "Security fundamentals, networking security concepts and secure system practices.",
    icon: Shield,
    color: "#f59e0b",
    gradient: "from-amber-500/10 to-amber-600/5",
  },
  {
    id: "development",
    title: "Software Development",
    description:
      "Web development and software development using modern tools and frameworks.",
    icon: Code2,
    color: "#f43f5e",
    gradient: "from-rose-500/10 to-rose-600/5",
  },
];

// ==========================================
// Skills
// ==========================================
export interface SkillGroup {
  category: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: Code2,
    skills: ["C", "C++", "JavaScript", "Python", "HTML", "CSS", "SQL"],
  },
  {
    category: "Development",
    icon: Globe,
    skills: ["Web Development", "Responsive UI", "REST / API Fundamentals", "Next.js & React Basics"],
  },
  {
    category: "Database",
    icon: Database,
    skills: ["MySQL", "Relational Modeling", "SQL Query Optimization"],
  },
  {
    category: "Tools",
    icon: GitBranch,
    skills: ["Git", "GitHub", "VS Code", "Postman", "Wireshark"],
  },
  {
    category: "Systems & Cloud",
    icon: Cpu,
    skills: ["Linux (Ubuntu/Debian)", "Bash Scripting", "Networking Fundamentals", "VirtualBox", "AWS Fundamentals"],
  },
];

// ==========================================
// Interactive Labs
// ==========================================
export interface Lab {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
  tag: string;
}

export const labs: Lab[] = [
  {
    id: "networking-lab",
    title: "Networking Lab",
    description:
      "Interactive visualization of how data travels from client to server through DNS, routers, and the internet.",
    icon: Network,
    color: "#3b82f6",
    href: "/labs#networking",
    tag: "Interactive",
  },
  {
    id: "osi-model",
    title: "OSI Model Explorer",
    description:
      "Explore the seven layers of the OSI model with purpose, protocols, and practical explanations.",
    icon: Layers,
    color: "#8b5cf6",
    href: "/labs#osi",
    tag: "Educational",
  },
  {
    id: "subnet-calc",
    title: "IP / Subnet Lab",
    description:
      "Enter a CIDR notation and visualize network addresses, host ranges, and subnet masks.",
    icon: Server,
    color: "#06b6d4",
    href: "/labs#subnet",
    tag: "Calculator",
  },
  {
    id: "http-visualizer",
    title: "HTTP Request Visualizer",
    description:
      "Animated walkthrough of how an HTTP request flows from browser to server and back.",
    icon: Globe,
    color: "#22c55e",
    href: "/labs#http",
    tag: "Animation",
  },
  {
    id: "linux-terminal",
    title: "Linux Terminal",
    description:
      "A simulated terminal environment demonstrating common Linux networking and system commands.",
    icon: Terminal,
    color: "#f59e0b",
    href: "/labs#terminal",
    tag: "Simulation",
  },
  {
    id: "cloud-vpc",
    title: "AWS Multi-Tier VPC Architect",
    description:
      "Interactive architectural blueprint exploring public, private, and database subnets with NAT routing and Multi-AZ replication.",
    icon: Cloud,
    color: "#06b6d4",
    href: "/labs#cloud",
    tag: "Architecture",
  },
];

// ==========================================
// Projects
// ==========================================
export interface Project {
  id: string;
  title: string;
  category: "Full-Stack" | "Web Application" | "Networking & Systems" | "Cloud & Infrastructure";
  description: string;
  longDescription: string;
  technologies: string[];
  href: string;
  status: "completed" | "in-progress" | "prototype";
  highlights: string[];
  metrics?: { label: string; value: string }[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "auralyn-audio",
    title: "Auralyn Audio Engine & Streaming Platform",
    category: "Full-Stack",
    description:
      "A full-stack audio streaming progressive web application and Express microservice with persistent playback, RESTful stream extraction, CORS proxying, and mobile-friendly UI.",
    longDescription:
      "Auralyn is a full-stack music streaming platform engineered with a decoupled React progressive web application frontend and an Express/Node.js REST backend. Built to solve the challenge of uninterrupted audio streaming across single-page application route transitions, it features custom audio event-loop synchronization, sliding-window buffer management, and secure CORS stream proxying.",
    technologies: ["React", "Node.js", "Express", "Python Flask", "PWA", "Tailwind CSS", "REST APIs", "Railway"],
    href: "/projects/auralyn-audio",
    status: "completed",
    highlights: [
      "Decoupled architecture: React PWA client + Node.js REST Gateway + Python audio indexing service",
      "Persistent singleton audio controller avoiding playback disruption across client route changes",
      "Production CORS validation on Express supporting Railway, Vercel, and local developer environments",
      "Optimized audio stream range requests preventing buffer underruns on mobile networks",
    ],
    metrics: [
      { label: "Role", value: "Full-Stack Developer" },
      { label: "Stack", value: "React + Node.js + Express" },
      { label: "Status", value: "Production Deployed" },
      { label: "Type", value: "Full-Stack Platform" },
    ],
    github: "https://github.com/chamolip81-svg/auralyn-backend",
  },
  {
    id: "network-quest",
    title: "Network Quest: Interactive Networking Simulator",
    category: "Networking & Systems",
    description:
      "An interactive, 100% client-side packet routing simulator and educational game with 10 RFC-aligned missions, topology canvas rendering, and daily challenges.",
    longDescription:
      "Network Quest is an in-browser networking simulation engine designed to educate and test engineers on foundational networking mechanics. It simulates physical link state, ARP table resolution, subnet boundary checking, default gateway routing, DNS query cascades, and full TCP 3-way handshakes with zero external server dependencies.",
    technologies: ["TypeScript", "Next.js", "React 19", "Canvas API", "Framer Motion", "RFC Protocols"],
    href: "/network-quest",
    status: "completed",
    highlights: [
      "10 RFC-aligned hands-on diagnostic missions covering Layers 1 through 7",
      "Deterministic daily subnet challenge generator with seeded pseudo-random IP allocation",
      "Interactive HTML5 Canvas topology visualization with animated packet hopping",
      "100% client-side execution with local storage persistence and social milestone sharing",
    ],
    metrics: [
      { label: "Missions", value: "10 Scenarios" },
      { label: "Engine", value: "Pure TypeScript" },
      { label: "Status", value: "Live Interactive" },
      { label: "Coverage", value: "OSI Layers 1 - 7" },
    ],
    github: "https://github.com/chamolip81-svg/myportfolio",
  },
  {
    id: "travel-dost",
    title: "Travel Dost",
    category: "Web Application",
    description:
      "A responsive web interface for exploring and presenting hotel catalogs, built as a practical web development project.",
    longDescription:
      "Travel Dost is a web application designed to help users explore and discover hotel listings and travel destinations. Built as a foundational web development project, it focuses on clean visual hierarchy, semantic HTML, mobile-friendly layouts, and intuitive filtering.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    href: "/projects/travel-dost",
    status: "completed",
    highlights: [
      "Structured hotel exploration and discovery catalog",
      "Mobile-first responsive layout with custom CSS flex & grid",
      "Interactive filtering by price and accommodation tier",
      "Practical frontend experience with DOM manipulation",
    ],
    metrics: [
      { label: "Role", value: "Solo Developer" },
      { label: "Status", value: "Completed" },
      { label: "Type", value: "Web Application" },
    ],
    github: "https://github.com/chamolip81-svg/Practice",
  },
  {
    id: "network-packet-tracer",
    title: "Packet Pulse Visualizer",
    category: "Networking & Systems",
    description:
      "An interactive browser tool that simulates and renders packet trajectories across switches, routers, DNS servers, and firewalls.",
    longDescription:
      "Designed as an educational tool to visualize what happens beneath the surface when a browser requests a webpage. Demonstrates DNS resolution, TCP three-way handshake, TLS negotiation, and HTTP payload delivery.",
    technologies: ["TypeScript", "Canvas API", "Framer Motion", "Networking Protocols"],
    href: "/labs#networking",
    status: "completed",
    highlights: [
      "Real-time visual node mesh with packet hopping simulation",
      "Inspection inspector detailing headers (IP, TCP, HTTP)",
      "Layered breakdown corresponding to OSI layers",
    ],
    metrics: [
      { label: "Simulation", value: "Client-to-Server" },
      { label: "Status", value: "Live in Labs" },
      { label: "Focus", value: "Networking Visualizer" },
    ],
  },
  {
    id: "cloud-vpc-architect",
    title: "AWS Multi-Tier VPC Architect",
    category: "Cloud & Infrastructure",
    description:
      "A visual reference and blueprint for deploying highly-available, secure multi-AZ web applications inside AWS Virtual Private Clouds.",
    longDescription:
      "A comprehensive architectural blueprint exploring cloud infrastructure patterns: public subnets for Internet Gateways and ALBs, private subnets for application workloads (EC2 / ECS), and isolated subnets for databases with Multi-AZ failover.",
    technologies: ["AWS Architecture", "VPC", "ALB", "EC2", "RDS", "Security Groups"],
    href: "/labs#cloud",
    status: "prototype",
    highlights: [
      "Public and private subnet separation with NAT Gateway routing",
      "Application Load Balancer health checking and SSL termination",
      "Database tier isolation with automated snapshotting model",
    ],
    metrics: [
      { label: "Platform", value: "AWS Cloud" },
      { label: "Topology", value: "Multi-AZ VPC" },
      { label: "Status", value: "Architectural Model" },
    ],
  },
  {
    id: "linux-sys-monitor",
    title: "Linux Virtual Web Terminal & Inspector",
    category: "Networking & Systems",
    description:
      "A browser-based terminal emulator that executes simulated Linux networking and system diagnostics commands.",
    longDescription:
      "A virtual sandbox built into the portfolio that accepts real Linux commands such as ifconfig, ping, netstat, uname, and curl to demonstrate practical command-line familiarity.",
    technologies: ["JavaScript", "Linux CLI", "ANSI Parsing", "Shell Simulation"],
    href: "/labs#terminal",
    status: "completed",
    highlights: [
      "Supports 12+ real Linux utility commands",
      "Interactive command history, autocomplete, and help flags",
      "Realistic output formatting for network interfaces and routing",
    ],
    metrics: [
      { label: "Commands", value: "12+ Supported" },
      { label: "Environment", value: "In-Browser Sandbox" },
      { label: "Status", value: "Live in Labs" },
    ],
  },
];

// ==========================================
// Technical Notes & Articles
// ==========================================
export interface TechnicalNote {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** ISO 8601 date for structured data (e.g. "2026-10-10") */
  dateISO: string;
  /** ISO 8601 last-modified date for structured data */
  dateModifiedISO: string;
  readTime: string;
  category: "Networking" | "Linux" | "Cloud" | "Architecture";
  tags: string[];
  content: string;
  /** Related interactive simulation lab for internal linking & engagement */
  relatedLab?: {
    name: string;
    description: string;
    path: string;
  };
}

export const technicalNotes: TechnicalNote[] = [
  {
    slug: "browser-audio-streaming-engine",
    title: "State Management and Buffering in In-Browser Audio Streaming Engines",
    description:
      "A first-principles engineering breakdown of in-browser audio streaming: HTML5 Audio lifecycle events, Web Audio API buffers, React state reconciliation, and CORS stream proxying.",
    date: "Nov 2026",
    dateISO: "2026-11-10",
    dateModifiedISO: "2026-11-10",
    readTime: "7 min read",
    category: "Architecture",
    tags: ["JavaScript", "React", "Web Audio API", "Streaming", "Node.js", "Express", "PWA"],
    relatedLab: {
      name: "Auralyn Audio Engine Case Study",
      description: "Explore the live full-stack implementation: React PWA client, Express REST microservice, and CORS proxy routing.",
      path: "/projects/auralyn-audio",
    },
    content: `
### The Core Engineering Challenge: Why Naive Audio Breaks in SPAs

When engineers build an audio player inside a modern Single-Page Application (SPA) using React, Vue, or Next.js, the most common beginner instinct is to drop an \`<audio>\` element directly into a component tree:

\`\`\`jsx
// The Naive Pattern (DO NOT USE IN PRODUCTION)
function Player({ currentTrack }) {
  return <audio src={currentTrack.streamUrl} autoPlay controls />;
}
\`\`\`

This approach immediately breaks when:
1. **Component Unmounting:** The user navigates from \`/search\` to \`/artist\` or \`/queue\`. The component unmounts, the DOM element is destroyed, the native C++ media pipeline in the browser tears down the playback buffer, and audio abruptly stops.
2. **Re-rendering Latency:** Any parent state change triggers re-renders. If props flutter or \`src\` re-binds, the browser resets playback to \`0:00\` or triggers a jarring buffer stutter.
3. **CORS Streaming Failures:** Audio streams fetched from external CDNs or audio servers trigger cross-origin restrictions unless an intermediate proxy handles preflight requests.

---

### Scope & Architectural Truth: Implemented vs Theoretical

To maintain strict engineering transparency, here is the exact separation between what is running in the actual **Auralyn codebase** versus advanced streaming theory:

| Architectural Tier | Implemented in Auralyn Production Codebase | Advanced / Theoretical Future Pattern |
|---|---|---|
| **Audio Controller** | Singleton \`Audio\` instance managed outside React lifecycle | Multi-threaded Web Audio API \`AudioWorklet\` with custom DSP |
| **State Synchronization** | Native DOM event listeners (\`timeupdate\`, \`waiting\`, \`canplay\`) updating centralized React state | Web Worker offloading via \`SharedArrayBuffer\` |
| **Backend Gateway** | Node.js Express 4 ES Module microservice with CORS regex validation | Distributed Edge CDN with dynamic HLS chunk packaging |
| **Stream Extraction** | Python Flask + \`ytmusicapi\` service resolving stream endpoints | In-house transcoder transcoding raw FLAC to Opus in real time |
| **Transport** | HTTP 206 Partial Content range requests handled by browser media engine | Custom WebSocket / WebTransport binary chunk streaming |

---

### The Singleton Audio Controller Pattern

The robust solution implemented in Auralyn decouples the **native browser media resource** from React's ephemeral component tree. A singleton controller instance is instantiated once in module scope, while React components merely observe its state:

\`\`\`
+-----------------------------------------------------------+
|                      React UI Layer                       |
|   [NowPlayingBar]      [QueueView]      [TrackListRow]     |
|          ^                  ^                  ^          |
|          +------------------+------------------+          |
|                             |                             |
|               React State Hook (useAudioPlayer)            |
+-----------------------------+-----------------------------+
                              | Dispatches Actions
                              v
+-----------------------------------------------------------+
|              Singleton Audio Engine (Vanilla JS)           |
|                                                           |
|   const audio = new Audio();                              |
|                                                           |
|   Audio Event Listeners:                                  |
|   - 'timeupdate'   --> update currentTime state           |
|   - 'waiting'      --> set isBuffering = true             |
|   - 'playing'      --> set isPlaying = true, buffer = false|
|   - 'ended'        --> trigger queue.next()               |
|   - 'error'        --> dispatch retry or fallback proxy   |
+-----------------------------+-----------------------------+
                              | HTTP Range Requests
                              v
+-----------------------------------------------------------+
|              Express.js REST Gateway / CORS Proxy          |
|   - Validates allowed origins (Railway / Vercel)          |
|   - Dispatches stream metadata & resolves byte streams     |
+-----------------------------------------------------------+
\`\`\`

---

### Browser Media Event Loop & Buffer State Machine

An audio stream is an asynchronous, network-dependent state machine. The browser does not load the entire file into memory at once; it negotiates chunks using **HTTP 206 Partial Content**.

Key lifecycle events that must be handled:

1. **\`loadstart\`**: The browser has initiated the socket connection to fetch audio headers.
2. **\`loadedmetadata\`**: Duration, audio codec, and sample rate have been parsed. Seek bar max value can now be initialized.
3. **\`canplay\`**: Sufficient bytes have arrived to begin playback, though future buffering will still occur.
4. **\`waiting\`**: Network stall! The playback head has caught up to the download buffer. UI must display a loading spinner without resetting time.
5. **\`playing\`**: Audio samples are physically flowing through the OS audio output device.
6. **\`ended\`**: Final frame reached. Trigger autoplay for the next queue item.

---

### Overcoming CORS Restrictions with Express Proxying

Modern browsers enforce strict cross-origin policies on \`<audio>\` elements when using Web Audio API analysis (\`createMediaElementSource\`) or custom headers. If the external audio endpoint does not return \`Access-Control-Allow-Origin\`, the browser halts decoding.

In \`auralyn-backend/src/server.js\`, CORS is configured dynamically to allow authorized frontend clients while permitting programmatic server-to-server relaying:

\`\`\`javascript
// Actual pattern implemented in auralyn-backend
const allowedOrigins = [
  'http://localhost:3000',
  'https://frontend-seven-sooty-87.vercel.app',
  'https://auralyn.me',
  'https://www.auralyn.me'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.includes('.vercel.app')) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
\`\`\`

---

### Summary of Architectural Takeaways

1. **Never tie audio engine lifecycles directly to React component lifecycles.** Use a persistent singleton controller.
2. **Respect the browser event loop.** Audio state changes originate from the media hardware and network socket, flowing *upward* into React state—never fight this natural hierarchy.
3. **Proxy through a trusted backend** when audio metadata or streams require sanitized headers or CORS compliance across mobile web environments.
    `,
  },
  {
    slug: "tcp-handshake-lifecycle",
    title: "Deconstructing the TCP 3-Way Handshake & State Machine",
    description:
      "Master the TCP 3-way handshake (SYN, SYN-ACK, ACK) and 4-way teardown with sequence number math, state machine diagrams, and Wireshark analysis.",
    date: "Oct 2026",
    dateISO: "2026-10-10",
    dateModifiedISO: "2026-10-10",
    readTime: "5 min read",
    category: "Networking",
    tags: ["TCP/IP", "Networking", "Protocols", "Wireshark"],
    relatedLab: {
      name: "Interactive Networking Lab & HTTP Visualizer",
      description: "Experiment with packet handshakes, round-trip latency, and request-response cycles in real time.",
      path: "/labs#networking",
    },
    content: `
### Why the 3-Way Handshake Exists

In modern networking, the Transmission Control Protocol (TCP) provides reliable, ordered, and error-checked delivery of a stream of octets between applications running on hosts communicating via an IP network.

Unlike UDP (which is connectionless and "fire-and-forget"), TCP guarantees delivery. But before any application data (like an HTTP GET request) can travel, both sides must synchronize their Initial Sequence Numbers (ISNs).

---

### Step-by-Step Breakdown

1. **SYN (Synchronize)**:
   - The client picks a random Initial Sequence Number (e.g., \`Seq = 1000\`).
   - It sends a TCP packet with the **SYN** control flag set to \`1\` to the server's listening port (e.g., port 443).
   - The client transitions into the \`SYN_SENT\` state.

2. **SYN-ACK (Synchronize-Acknowledgment)**:
   - The server receives the SYN.
   - It acknowledges the client's sequence number by sending \`Ack = 1001\` (client's Seq + 1).
   - The server also picks its own random Initial Sequence Number (e.g., \`Seq = 5000\`) and sets the **SYN** flag.
   - The server transitions into the \`SYN_RECEIVED\` state.

3. **ACK (Acknowledgment)**:
   - The client receives the server's SYN-ACK.
   - It acknowledges the server's sequence number by sending \`Ack = 5001\` (server's Seq + 1).
   - Both client and server transition into the \`ESTABLISHED\` state.

\`\`\`
Client (192.168.1.100)                     Server (93.184.216.34)
       |                                              |
       |  ---- SYN (Seq=1000) --------------------->  | (SYN_RECEIVED)
       |                                              |
       |  <--- SYN-ACK (Seq=5000, Ack=1001) --------- |
       |                                              |
(ESTABLISHED)                                         |
       |  ---- ACK (Seq=1001, Ack=5001) ----------->  | (ESTABLISHED)
       |                                              |
       |  ==== DATA TRANSFER BEGINS (HTTP GET) ====  |
\`\`\`

---

### Connection Teardown (4-Way Handshake)

When either endpoint is ready to close the connection, a 4-step teardown process occurs using the **FIN** (Finish) flag:
- Endpoint A sends \`FIN\` $\\rightarrow$ Endpoint B sends \`ACK\`.
- Endpoint B sends its own \`FIN\` $\\rightarrow$ Endpoint A sends \`ACK\`.
- The initiator waits in \`TIME_WAIT\` (typically 2 * Maximum Segment Lifetime) before destroying the socket to ensure late-arriving packets do not disrupt subsequent connections.
    `,
  },
  {
    slug: "cidr-subnetting-guide",
    title: "Subnetting Math: Demystifying CIDR & Host Ranges",
    description:
      "Step-by-step guide to IPv4 CIDR subnetting: learn how to calculate network, broadcast, and usable host ranges with cheat sheets and practical examples.",
    date: "Sep 2026",
    dateISO: "2026-09-20",
    dateModifiedISO: "2026-09-20",
    readTime: "6 min read",
    category: "Networking",
    tags: ["IPv4", "Subnetting", "CIDR", "Routing"],
    relatedLab: {
      name: "Interactive IPv4 Subnet & CIDR Calculator",
      description: "Verify your subnet math interactively: inspect network, broadcast, wildcard masks, and binary bit boundaries.",
      path: "/labs#subnet",
    },
    content: `
### What is CIDR?

Classless Inter-Domain Routing (CIDR) replaced the old Class A, B, and C system with a flexible prefix length notation (\`/XX\`).

An IPv4 address consists of 32 bits, represented as 4 octets separated by dots (e.g., \`192.168.1.0\`). The prefix length tells you how many of those 32 bits belong to the **Network ID**, while the remaining bits belong to **Host IDs**.

---

### Key Formulas

1. **Total IP Addresses in a Subnet**:
   $$\\text{Total IPs} = 2^{(32 - \\text{prefix})}$$

2. **Usable Host Addresses**:
   $$\\text{Usable Hosts} = 2^{(32 - \\text{prefix})} - 2$$
   *(Subtract 2 because the First address is the Network ID and the Last address is the Broadcast ID)*.

---

### Cheat Sheet: Common Prefix Sizes

| Prefix | Subnet Mask | Total IPs | Usable Hosts | Common Use Case |
|---|---|---|---|---|
| \`/30\` | \`255.255.255.252\` | 4 | 2 | Point-to-Point Router Links |
| \`/28\` | \`255.255.255.240\` | 16 | 14 | Small Subnet / Cloud DMZ |
| \`/24\` | \`255.255.255.0\` | 256 | 254 | Standard LAN / Home Network |
| \`/20\` | \`255.255.240.0\` | 4,096 | 4,094 | Corporate Branch Network |
| \`/16\` | \`255.255.0.0\` | 65,536 | 65,534 | AWS VPC Primary CIDR Block |

---

### Step-by-Step Example: \`172.16.50.0/26\`

- **Prefix length**: \`26\` $\\rightarrow$ Host bits = $32 - 26 = 6$ bits.
- **Total addresses**: $2^6 = 64$ IPs.
- **Usable hosts**: $64 - 2 = 62$ hosts.
- **Subnet Mask**: \`255.255.255.192\`
- **Network Address**: \`172.16.50.0\`
- **First Usable Host**: \`172.16.50.1\`
- **Last Usable Host**: \`172.16.50.62\`
- **Broadcast Address**: \`172.16.50.63\`
    `,
  },
  {
    slug: "containers-vs-vms",
    title: "Namespaces & Cgroups: What Actually Separates Containers from VMs?",
    description:
      "Containers vs Virtual Machines explained: discover architectural differences between hypervisors and Linux kernel namespaces, cgroups, and rootfs isolation.",
    date: "Aug 2026",
    dateISO: "2026-08-15",
    dateModifiedISO: "2026-08-15",
    readTime: "7 min read",
    category: "Architecture",
    tags: ["Linux", "Docker", "Virtualization", "Kernel"],
    relatedLab: {
      name: "Simulated Linux Terminal",
      description: "Practice Linux process, network inspection, and diagnostic commands in an interactive browser shell.",
      path: "/labs#terminal",
    },
    content: `
### The Fundamental Difference

The core distinction between Virtual Machines (VMs) and Containers comes down to one question: **Where does the hardware abstraction happen?**

- **Virtual Machines**: Virtualize physical hardware. Each VM runs a full guest operating system with its own kernel, device drivers, and memory management.
- **Containers**: Virtualize the operating system. All containers share the host's Linux kernel, running isolated user-space processes.

---

### How the Linux Kernel Powers Containers

Containers are not magical virtual computers; they are regular Linux processes constrained by two core kernel features:

#### 1. Linux Namespaces (What a process can SEE)
Namespaces provide isolation by giving processes their own private view of system resources:
- **PID Namespace**: Process isolation (container PID 1 maps to host PID 4321).
- **NET Namespace**: Private network interfaces, routing tables, and port bindings.
- **MNT Namespace**: Private filesystem mounts and root directory (\`chroot\` / \`pivot_root\`).
- **UTS Namespace**: Isolated hostname and domain name.
- **IPC Namespace**: Isolated Inter-Process Communication queues.
- **USER Namespace**: Allows root inside container to map to unprivileged user on host.

#### 2. Control Groups / cgroups (What a process can USE)
Cgroups restrict and measure resource consumption:
- **CPU limits**: Throttles CPU shares or CFS quota.
- **Memory limits**: Enforces max RAM usage and triggers OOM killer if breached.
- **I/O limits**: Controls disk read/write bandwidth.

---

### Trade-Off Summary

| Attribute | Virtual Machines | Containers (Docker) |
|---|---|---|
| **Startup Time** | Minutes / Seconds | Milliseconds |
| **Storage Footprint** | Gigabytes (GB) | Megabytes (MB) |
| **Security Isolation** | Hard boundary (Hypervisor ring) | Soft boundary (Kernel syscall boundary) |
| **Performance Overhead** | Small hypervisor overhead (~5-15%) | Near-zero (Native process speed) |
| **OS Flexibility** | Can run Windows on Linux, etc. | Must match Host Kernel (Linux on Linux) |
    `,
  },
  {
    slug: "dns-resolution-path",
    title: "From Browser URL to IP: The Complete DNS Recursive Lookup Journey",
    description:
      "Understand the DNS resolution process step-by-step: trace recursive queries from browser cache to Root hints, TLD nameservers, and authoritative responses.",
    date: "Jul 2026",
    dateISO: "2026-07-28",
    dateModifiedISO: "2026-07-28",
    readTime: "4 min read",
    category: "Networking",
    tags: ["DNS", "Networking", "Internet", "Web Architecture"],
    relatedLab: {
      name: "Interactive Networking Lab",
      description: "Trace simulated DNS queries, routing hops, and packet delays through an interactive network topology.",
      path: "/labs#networking",
    },
    content: `
### The Problem DNS Solves

Humans remember domain names (like \`example.com\`), but internet routers only understand IP addresses (like \`93.184.216.34\`). The Domain Name System (DNS) acts as the global, distributed hierarchical database that bridges this gap.

---

### The 4 Pillars of DNS Hierarchy

1. **Local DNS Cache**:
   - Browser cache $\\rightarrow$ OS cache (e.g., \`/etc/hosts\` or Windows DNS cache) $\\rightarrow$ Home router DNS cache.
2. **Recursive Resolver (ISP / 8.8.8.8 / 1.1.1.1)**:
   - The workhorse server that queries the global hierarchy on your behalf.
3. **Root Nameservers (\`.\`)**:
   - 13 logical root server IP addresses distributed globally across hundreds of physical locations using Anycast routing.
4. **TLD Nameservers (\`.com\`, \`.org\`, \`.in\`)**:
   - Maintained by registry operators (like Verisign for \`.com\`).
5. **Authoritative Nameservers**:
   - The final authority that holds the actual DNS records (A, AAAA, CNAME, MX) configured by the domain owner.

---

### Resolution Sequence Diagram

\`\`\`
[Browser] 
   |
   | 1. Query: "What is example.com?"
   v
[Recursive Resolver (8.8.8.8)]
   |
   | 2. "Where is .com?" 
   v
[Root Server (.)] --------> Returns: "Ask .com TLD Server at 192.5.6.30"
   |
   | 3. "Where is example.com?"
   v
[TLD Server (.com)] ------> Returns: "Ask Authoritative NS ns1.example.com"
   |
   | 4. "What is the A record for example.com?"
   v
[Authoritative NS] -------> Returns: "A = 93.184.216.34 (TTL: 3600s)"
   |
   v
[Browser Receives 93.184.216.34 and Initiates TCP Connection]
\`\`\`
    `,
  },
];

// ==========================================
// Virtual Lab & Setup Info
// ==========================================
export interface SetupCategory {
  title: string;
  description: string;
  items: {
    name: string;
    category: string;
    description: string;
    specs?: string;
  }[];
}

export const setupData: SetupCategory[] = [
  {
    title: "Virtualization & Systems Lab",
    description: "The software and virtualization environment used for testing and learning infrastructure.",
    items: [
      {
        name: "Oracle VM VirtualBox",
        category: "Hypervisor",
        description: "Primary Type-2 hypervisor for spinning up isolated Linux test instances and virtual test networks.",
        specs: "v7.0+",
      },
      {
        name: "Ubuntu Server 22.04 LTS",
        category: "Operating System",
        description: "Standard Linux distribution for headless server practice, systemd service management, and cron jobs.",
      },
      {
        name: "Alpine Linux VMs",
        category: "Lightweight Testing",
        description: "Minimalist ~130MB virtual machines for testing fast container base images and isolated network nodes.",
      },
      {
        name: "WSL2 (Windows Subsystem for Linux)",
        category: "Daily Dev Environment",
        description: "Direct access to full Linux bash environment, package managers, and native Unix utilities on Windows.",
      },
    ],
  },
  {
    title: "Networking & Diagnostic Tools",
    description: "Utilities used to analyze packet flows, configure routing, and inspect protocols.",
    items: [
      {
        name: "Wireshark",
        category: "Packet Analyzer",
        description: "Used to capture live network frames and analyze TCP sequence numbers, DNS queries, and TLS handshakes.",
      },
      {
        name: "Cisco Packet Tracer",
        category: "Network Simulator",
        description: "Building virtual LAN topologies, configuring virtual routers, switches, DHCP pools, and RIP/OSPF routing.",
      },
      {
        name: "Nmap & Netcat",
        category: "Network Diagnostics",
        description: "Port scanning, service discovery, testing raw socket connections, and verifying firewall rules.",
      },
      {
        name: "OpenSSH & PuTTY",
        category: "Remote Access",
        description: "Secure shell access for managing headless Linux servers and setting up SSH key pairs.",
      },
    ],
  },
  {
    title: "Development & Editor Stack",
    description: "Code editors, terminals, and version control tools configured for maximum clarity.",
    items: [
      {
        name: "Visual Studio Code",
        category: "Code Editor",
        description: "Primary editor with extensions for TypeScript, Tailwind CSS, Docker, and Remote-SSH.",
      },
      {
        name: "Windows Terminal + PowerShell / Bash",
        category: "Terminal",
        description: "Customized terminal prompt with Git status integration, custom aliases, and font rendering.",
      },
      {
        name: "Git & GitHub",
        category: "Version Control",
        description: "Branching workflows, semantic commits, and maintaining open source documentation repositories.",
      },
      {
        name: "Postman",
        category: "API Testing",
        description: "Testing REST API endpoints, inspecting headers, response payloads, and status codes.",
      },
    ],
  },
  {
    title: "Hardware Workstation",
    description: "Physical hardware used for daily development, virtualization, and coursework.",
    items: [
      {
        name: "Primary PC",
        category: "Workstation",
        description: "Multi-core processor with ample RAM allocated for running concurrent virtual machines and browser tabs.",
      },
      {
        name: "Dual Monitor Setup",
        category: "Display",
        description: "Screen 1 dedicated to active code/terminal, Screen 2 dedicated to Wireshark/documentation/diagrams.",
      },
    ],
  },
];

// ==========================================
// Education
// ==========================================
export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  status: string;
  areas: string[];
}

export const education: Education = {
  degree: "B.Sc.",
  field: "Information Technology",
  institution: "Combined (PG) Institute of Medical Sciences & Research (CIMS)",
  location: "Kuanwala, Dehradun, Uttarakhand, India",
  status: "Currently pursuing",
  areas: [
    "Computer Networks",
    "Data Structures & Algorithms",
    "Web Development",
    "Database Management Systems (DBMS)",
    "Operating Systems (OS)",
    "Cloud Computing Fundamentals",
  ],
};

// ==========================================
// Currently Exploring
// ==========================================
export interface ExploringItem {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const exploringItems: ExploringItem[] = [
  {
    number: "01",
    title: "Networking",
    description: "Protocols, routing, and how data moves across networks.",
    icon: Network,
    color: "#3b82f6",
  },
  {
    number: "02",
    title: "Linux",
    description: "System administration, CLI tools, and Linux environments.",
    icon: Terminal,
    color: "#22c55e",
  },
  {
    number: "03",
    title: "Cloud Computing",
    description: "Cloud services, deployment, and infrastructure fundamentals.",
    icon: Cloud,
    color: "#06b6d4",
  },
  {
    number: "04",
    title: "Virtualization",
    description: "Virtual machines, network simulations, and isolated labs.",
    icon: Monitor,
    color: "#8b5cf6",
  },
  {
    number: "05",
    title: "Security Fundamentals",
    description: "Network security, secure practices, and system hardening.",
    icon: Shield,
    color: "#f59e0b",
  },
  {
    number: "06",
    title: "Infrastructure",
    description: "Understanding how systems, networks, and services connect.",
    icon: Server,
    color: "#f43f5e",
  },
];

// ==========================================
// Command Palette Items
// ==========================================
export interface CommandItem {
  label: string;
  href: string;
  category: string;
  icon: LucideIcon;
  isExternal?: boolean;
}

export const commandItems: CommandItem[] = [
  { label: "Home", href: "/", category: "Navigation", icon: Globe },
  { label: "About Priyanshu", href: "/about", category: "Navigation", icon: Code2 },
  { label: "View Resume (ATS & PDF)", href: "/resume", category: "Navigation", icon: FileText },
  { label: "Projects Directory", href: "/projects", category: "Projects", icon: Globe },
  { label: "Auralyn Audio Engine Case Study", href: "/projects/auralyn-audio", category: "Projects", icon: Music },
  { label: "Network Quest Simulator", href: "/network-quest", category: "Projects", icon: Gamepad2 },
  { label: "Interactive Labs Hub", href: "/labs", category: "Labs", icon: Layers },
  { label: "Subnet & CIDR Calculator", href: "/labs#subnet", category: "Labs", icon: Server },
  { label: "OSI 7-Layer Reference", href: "/labs#osi", category: "Labs", icon: Layers },
  { label: "Interactive Packet Lab", href: "/labs#networking", category: "Labs", icon: Network },
  { label: "HTTP Request Lifecycle", href: "/labs#http", category: "Labs", icon: Globe },
  { label: "Linux Web Terminal", href: "/labs#terminal", category: "Labs", icon: Terminal },
  { label: "AWS Cloud VPC Blueprint", href: "/labs#cloud", category: "Labs", icon: Cloud },
  { label: "Technical Notes & Articles", href: "/notes", category: "Writing", icon: BookOpen },
  { label: "Note: In-Browser Audio Streaming", href: "/notes/browser-audio-streaming-engine", category: "Writing", icon: Music },
  { label: "Note: TCP 3-Way Handshake", href: "/notes/tcp-handshake-lifecycle", category: "Writing", icon: BookOpen },
  { label: "Note: CIDR & Subnetting", href: "/notes/cidr-subnetting-guide", category: "Writing", icon: BookOpen },
  { label: "Note: Containers vs VMs", href: "/notes/containers-vs-vms", category: "Writing", icon: BookOpen },
  { label: "Note: DNS Resolution Path", href: "/notes/dns-resolution-path", category: "Writing", icon: BookOpen },
  { label: "Virtual Lab & Uses", href: "/setup", category: "Setup", icon: Wrench },
  { label: "Travel Dost Case Study", href: "/projects/travel-dost", category: "Projects", icon: Globe },
  { label: "Contact Priyanshu", href: "/contact", category: "Navigation", icon: Globe },
  { label: "GitHub Profile", href: siteConfig.github, category: "External", icon: GitBranch, isExternal: true },
  { label: "LinkedIn Profile", href: siteConfig.linkedin, category: "External", icon: Globe, isExternal: true },
];

// ==========================================
// OSI Model Data
// ==========================================
export interface OSILayer {
  number: number;
  name: string;
  purpose: string;
  examples: string[];
  protocols: string[];
  explanation: string;
  color: string;
}

export const osiLayers: OSILayer[] = [
  {
    number: 7,
    name: "Application",
    purpose: "Provides network services directly to end-user applications.",
    examples: ["Web browsers", "Email clients", "File transfer"],
    protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "SSH"],
    explanation:
      "This is the layer closest to the end user. It interacts with software applications that implement a communicating component. Web browsers and email clients are examples of applications that use this layer.",
    color: "#f43f5e",
  },
  {
    number: 6,
    name: "Presentation",
    purpose: "Translates data between the application and the network.",
    examples: ["Data encryption", "Data compression", "Character encoding"],
    protocols: ["SSL/TLS", "JPEG", "MPEG", "ASCII", "GIF"],
    explanation:
      "The presentation layer handles data formatting, encryption, and compression. It ensures that data from the application layer of one system can be read by the application layer of another system.",
    color: "#f59e0b",
  },
  {
    number: 5,
    name: "Session",
    purpose: "Manages connections between applications.",
    examples: [
      "Login sessions",
      "Video conferencing",
      "Database connections",
    ],
    protocols: ["NetBIOS", "RPC", "PPTP", "SAP"],
    explanation:
      "This layer establishes, manages, and terminates sessions between two communicating hosts. It handles session setup, coordination, and teardown, including authentication and reconnection.",
    color: "#22c55e",
  },
  {
    number: 4,
    name: "Transport",
    purpose:
      "Provides reliable data transfer between hosts.",
    examples: ["TCP connections", "UDP streaming", "Port numbers"],
    protocols: ["TCP", "UDP", "SCTP"],
    explanation:
      "The transport layer provides end-to-end data transfer services. TCP ensures reliable delivery through error checking and flow control. UDP provides faster, connectionless communication.",
    color: "#06b6d4",
  },
  {
    number: 3,
    name: "Network",
    purpose: "Routes data between different networks.",
    examples: ["IP addressing", "Routing", "Packet forwarding"],
    protocols: ["IP", "ICMP", "OSPF", "BGP", "ARP"],
    explanation:
      "The network layer determines the best physical path for data to reach its destination. It handles logical addressing (IP addresses) and routing decisions across different networks.",
    color: "#3b82f6",
  },
  {
    number: 2,
    name: "Data Link",
    purpose:
      "Transfers data between directly connected nodes.",
    examples: ["MAC addresses", "Switches", "Ethernet frames"],
    protocols: ["Ethernet", "Wi-Fi (802.11)", "PPP", "HDLC"],
    explanation:
      "This layer provides node-to-node data transfer using MAC addresses. It handles frame synchronization, error detection, and access to the physical medium. Switches operate at this layer.",
    color: "#8b5cf6",
  },
  {
    number: 1,
    name: "Physical",
    purpose:
      "Transmits raw bits over a physical medium.",
    examples: ["Cables", "Fiber optics", "Radio signals", "Hubs"],
    protocols: ["USB", "Bluetooth", "Ethernet (physical)", "DSL"],
    explanation:
      "The physical layer deals with the actual hardware connections. It defines electrical signals, cable specifications, and physical data rates. This includes cables, connectors, and network interface cards.",
    color: "#71717a",
  },
];
