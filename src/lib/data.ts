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
  type LucideIcon,
} from "lucide-react";

// ==========================================
// Site Configuration
// ==========================================
export const siteConfig = {
  name: "Priyanshu Chamoli",
  title: "Priyanshu Chamoli | IT Student & Developer",
  description:
    "Priyanshu Chamoli is an IT student and developer from Dehradun, India, exploring networking, cloud computing, Linux, virtual labs, security fundamentals and software development.",
  url: "https://priyanshuchamoli.dev",
  locale: "en_IN",
  positioning: "IT Student & Developer",
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
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Labs", href: "/labs" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
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
    skills: ["Web Development", "Responsive UI", "REST / API Fundamentals"],
  },
  {
    category: "Database",
    icon: Database,
    skills: ["MySQL", "SQL"],
  },
  {
    category: "Tools",
    icon: GitBranch,
    skills: ["Git", "GitHub", "VS Code"],
  },
  {
    category: "Systems",
    icon: Cpu,
    skills: ["Linux", "Networking Fundamentals", "Virtual Machines"],
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
];

// ==========================================
// Projects
// ==========================================
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  href: string;
  status: "completed" | "in-progress" | "planned";
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "travel-dost",
    title: "Travel Dost",
    description:
      "A web interface for exploring and presenting hotel information, built as a practical web development project.",
    longDescription:
      "Travel Dost is a web application designed to help users explore and discover hotel information. The project was built as a practical exercise in web development, focusing on creating an intuitive interface for browsing and filtering hotel listings.",
    technologies: ["HTML", "CSS", "JavaScript"],
    href: "/projects/travel-dost",
    status: "completed",
    highlights: [
      "Hotel exploration and browsing interface",
      "Responsive design for multiple device sizes",
      "Clean, user-friendly layout",
      "Practical web development experience",
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
  institution: "Combined (PG) Institute of Medical Sciences & Research",
  location: "Dehradun",
  status: "Currently pursuing",
  areas: [
    "Computer Networks",
    "Data Structures",
    "Web Development",
    "Database Management",
    "Operating Systems",
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
// Command Palette
// ==========================================
export interface CommandItem {
  label: string;
  href: string;
  category: string;
  icon: LucideIcon;
  isExternal?: boolean;
}

export const commandItems: CommandItem[] = [
  { label: "About", href: "#about", category: "Navigation", icon: Code2 },
  { label: "Skills", href: "#skills", category: "Navigation", icon: Cpu },
  { label: "Labs", href: "/labs", category: "Navigation", icon: Layers },
  {
    label: "Travel Dost",
    href: "/projects/travel-dost",
    category: "Projects",
    icon: Globe,
  },
  {
    label: "Education",
    href: "#education",
    category: "Navigation",
    icon: Database,
  },
  {
    label: "GitHub",
    href: siteConfig.github,
    category: "Links",
    icon: GitBranch,
    isExternal: true,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    category: "Links",
    icon: Globe,
    isExternal: true,
  },
  {
    label: "Contact",
    href: "#contact",
    category: "Navigation",
    icon: Globe,
  },
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
