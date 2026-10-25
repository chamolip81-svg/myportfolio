/**
 * Network Quest — Domain Types & Data Models
 * Strictly typed definitions for devices, interfaces, links, packets, missions, and simulation state.
 */

export type DeviceType = "pc" | "switch" | "router" | "dns-server" | "web-server";

export type InterfaceStatus = "up" | "down";
export type DeviceStatus = "online" | "offline" | "misconfigured";
export type LinkStatus = "up" | "down";

export interface NetworkInterface {
  id: string;
  name: string; // e.g. "eth0", "gi0/0"
  mac: string; // e.g. "00:1A:2B:3C:4D:01"
  ip?: string; // e.g. "192.168.1.10"
  subnetMask?: string; // e.g. "255.255.255.0"
  prefix?: number; // e.g. 24
  gateway?: string; // e.g. "192.168.1.1"
  enabled: boolean;
  linkId?: string; // ID of the link attached to this port
}

export interface RouteEntry {
  destination: string; // Network IP or "0.0.0.0"
  prefix: number; // e.g. 24 or 0
  nextHop: string; // e.g. "10.0.0.2" or "DIRECT"
  interfaceId: string;
}

export interface DnsRecord {
  domain: string;
  ip: string;
  type: "A" | "CNAME";
}

export interface NetworkDevice {
  id: string;
  name: string;
  type: DeviceType;
  interfaces: NetworkInterface[];
  position: { x: number; y: number }; // 0-100 percentage or canvas pixel coordinates
  status: DeviceStatus;
  dnsServerIp?: string; // DNS server IP configured on the device (for hosts)
  dnsRecords?: DnsRecord[]; // Hosted DNS records (for DNS server)
  routes?: RouteEntry[]; // Routing table (for routers/hosts)
  roleDescription?: string;
}

export interface NetworkLink {
  id: string;
  sourceDeviceId: string;
  sourceInterfaceId: string;
  targetDeviceId: string;
  targetInterfaceId: string;
  status: LinkStatus;
  bandwidth?: string; // e.g. "1 Gbps"
}

export type PacketProtocol =
  | "ICMP_ECHO"
  | "ICMP_REPLY"
  | "ARP_REQ"
  | "ARP_REP"
  | "DNS_REQ"
  | "DNS_REP"
  | "TCP_SYN"
  | "TCP_SYN_ACK"
  | "TCP_ACK"
  | "HTTP_GET"
  | "HTTP_200"
  | "L2_FRAME"
  | "ROUTED_HOP";

export type PacketLayer = "L2" | "L3" | "L4" | "L7";

export type EventStatus =
  | "created"
  | "sent"
  | "forwarded"
  | "received"
  | "delivered"
  | "dropped";

export interface PacketEvent {
  step: number;
  timestampMs: number;
  nodeId: string;
  nodeName: string;
  protocol: PacketProtocol;
  layer: PacketLayer;
  status: EventStatus;
  srcIp?: string;
  dstIp?: string;
  detail: string;
  explanation: string;
}

export interface SimulationResult {
  success: boolean;
  path: string[]; // device IDs visited in chronological order
  events: PacketEvent[];
  summary: string;
  failureReason?: string;
  violatedRule?: string;
  hint?: string;
  pingStats?: {
    packetsSent: number;
    packetsReceived: number;
    packetLossPercent: number;
    avgRttMs: number;
  };
}

export type MissionDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type MissionCategory = "fundamentals" | "routing" | "protocols" | "detective";

export interface Mission {
  id: string;
  number: number;
  title: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  timeEstimate: string;
  concept: string;
  objective: string;
  scenario: string;
  initialDevices: NetworkDevice[];
  initialLinks: NetworkLink[];
  allowedEditableDevices: string[];
  allowedEditableFields: Record<
    string,
    Array<"ip" | "subnetMask" | "prefix" | "gateway" | "enabled" | "dnsServerIp">
  >;
  testScenario: {
    sourceDeviceId: string;
    targetDestination: string; // IP or hostname (e.g. "192.168.1.50" or "api.internal.corp")
    protocol: "ICMP" | "DNS" | "TCP" | "HTTP";
  };
  validationRules: {
    expectedTargetIp?: string;
    mustTraverseDeviceIds?: string[];
    prohibitedTraverseDeviceIds?: string[];
  };
  hints: string[];
  technicalExplanation: string;
  bonusGoal?: string;
  relatedNoteSlug?: string;
  relatedLabAnchor?: string;
}

export type GameMode = "campaign" | "guided" | "freelab" | "daily";

export interface MissionProgress {
  missionId: string;
  completed: boolean;
  score: number;
  stars: number; // 1 to 3
  bestTimeSeconds: number;
  completedAt: string;
  hintsUsed: number;
}

export interface SavedGameState {
  version: number;
  lastPlayed: string;
  currentMissionId: string;
  gameMode: GameMode;
  campaignProgress: Record<string, MissionProgress>;
  dailyCompletedDates: string[];
  soundEnabled: boolean;
  reducedMotion: boolean;
}
