/**
 * Network Quest — Deterministic Network Simulation Engine
 * Performs IPv4 subnet calculations, L2 switching, L3 routing,
 * DNS resolution, TCP handshake flows, and packet trace generation.
 */

import type {
  NetworkDevice,
  NetworkLink,
  NetworkInterface,
  PacketEvent,
  SimulationResult,
  PacketProtocol,
  PacketLayer,
  EventStatus,
} from "./types";

// ==========================================
// IP & Subnet Math Helpers
// ==========================================

export function parseIpv4(ip: string): number[] | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  const octets: number[] = [];
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const n = Number(p);
    if (n < 0 || n > 255) return null;
    octets.push(n);
  }
  return octets;
}

export function isValidIpv4(ip: string): boolean {
  return parseIpv4(ip) !== null;
}

export function ipToNumber(ip: string): number | null {
  const octets = parseIpv4(ip);
  if (!octets) return null;
  return ((octets[0] * 16777216 + octets[1] * 65536 + octets[2] * 256 + octets[3]) >>> 0);
}

export function numberToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

export function prefixToMaskNumber(prefix: number): number {
  if (prefix <= 0) return 0;
  if (prefix >= 32) return 0xffffffff >>> 0;
  return ((0xffffffff << (32 - prefix)) >>> 0);
}

export function prefixToMaskString(prefix: number): string {
  return numberToIp(prefixToMaskNumber(prefix));
}

export function maskStringToPrefix(mask: string): number | null {
  const maskNum = ipToNumber(mask);
  if (maskNum === null) return null;
  let prefix = 0;
  let seenZero = false;
  for (let i = 31; i >= 0; i--) {
    const bit = (maskNum >>> i) & 1;
    if (bit === 1) {
      if (seenZero) return null; // Non-contiguous mask is invalid
      prefix++;
    } else {
      seenZero = true;
    }
  }
  return prefix;
}

export function getNetworkAddress(ip: string, prefix: number): string | null {
  const ipNum = ipToNumber(ip);
  if (ipNum === null) return null;
  const maskNum = prefixToMaskNumber(prefix);
  return numberToIp((ipNum & maskNum) >>> 0);
}

export function isSameSubnet(ipA: string, ipB: string, prefix: number): boolean {
  const netA = getNetworkAddress(ipA, prefix);
  const netB = getNetworkAddress(ipB, prefix);
  if (netA === null || netB === null) return false;
  return netA === netB;
}

// ==========================================
// Topology Traversal Helpers
// ==========================================

export function findDevice(devices: NetworkDevice[], deviceId: string): NetworkDevice | undefined {
  return devices.find((d) => d.id === deviceId);
}

export function findDeviceByIp(devices: NetworkDevice[], ip: string): { device: NetworkDevice; iface: NetworkInterface } | null {
  for (const device of devices) {
    for (const iface of device.interfaces) {
      if (iface.ip === ip && iface.enabled) {
        return { device, iface };
      }
    }
  }
  return null;
}

export function findConnectedLink(
  links: NetworkLink[],
  deviceIdA: string,
  ifaceIdA: string
): { link: NetworkLink; peerDeviceId: string; peerInterfaceId: string } | null {
  for (const link of links) {
    if (link.sourceDeviceId === deviceIdA && link.sourceInterfaceId === ifaceIdA) {
      return { link, peerDeviceId: link.targetDeviceId, peerInterfaceId: link.targetInterfaceId };
    }
    if (link.targetDeviceId === deviceIdA && link.targetInterfaceId === ifaceIdA) {
      return { link, peerDeviceId: link.sourceDeviceId, peerInterfaceId: link.sourceInterfaceId };
    }
  }
  return null;
}

export function getDeviceLinks(links: NetworkLink[], deviceId: string): NetworkLink[] {
  return links.filter(
    (l) => l.sourceDeviceId === deviceId || l.targetDeviceId === deviceId
  );
}

// ==========================================
// Simulation Event Logger
// ==========================================

class EventRecorder {
  private events: PacketEvent[] = [];
  private step = 1;
  private currentMs = 0;

  record(
    node: NetworkDevice,
    protocol: PacketProtocol,
    layer: PacketLayer,
    status: EventStatus,
    detail: string,
    explanation: string,
    srcIp?: string,
    dstIp?: string
  ): PacketEvent {
    const event: PacketEvent = {
      step: this.step++,
      timestampMs: this.currentMs,
      nodeId: node.id,
      nodeName: node.name,
      protocol,
      layer,
      status,
      srcIp,
      dstIp,
      detail,
      explanation,
    };
    this.events.push(event);
    this.currentMs += 12; // Simulated RTT / serialization time
    return event;
  }

  getEvents(): PacketEvent[] {
    return [...this.events];
  }
}

// ==========================================
// Main Network Simulation Engine
// ==========================================

export interface SimulateTransmissionParams {
  devices: NetworkDevice[];
  links: NetworkLink[];
  sourceDeviceId: string;
  targetDestination: string; // IP address or Domain Name
  protocol?: "ICMP" | "DNS" | "TCP" | "HTTP";
}

export function simulateTransmission({
  devices,
  links,
  sourceDeviceId,
  targetDestination,
  protocol = "ICMP",
}: SimulateTransmissionParams): SimulationResult {
  const recorder = new EventRecorder();
  const visitedPath: string[] = [];

  const sourceDevice = findDevice(devices, sourceDeviceId);
  if (!sourceDevice) {
    return {
      success: false,
      path: [],
      events: [],
      summary: "Source device not found in topology.",
      failureReason: `Device '${sourceDeviceId}' does not exist.`,
    };
  }

  visitedPath.push(sourceDevice.id);

  // Check device status
  if (sourceDevice.status === "offline") {
    recorder.record(
      sourceDevice,
      "ICMP_ECHO",
      "L3",
      "dropped",
      `${sourceDevice.name} is powered off or disabled.`,
      "A device cannot originate network packets while in an offline state."
    );
    return {
      success: false,
      path: visitedPath,
      events: recorder.getEvents(),
      summary: `${sourceDevice.name} is offline.`,
      failureReason: "Device is offline.",
      violatedRule: "Operating state must be 'online'.",
      hint: "Inspect the device and ensure its interfaces are up and operational.",
    };
  }

  const primaryIface = sourceDevice.interfaces[0];
  if (!primaryIface || !primaryIface.enabled) {
    recorder.record(
      sourceDevice,
      "ICMP_ECHO",
      "L2",
      "dropped",
      `Interface ${primaryIface?.name || "eth0"} is administratively down.`,
      "Packets cannot be transmitted out of a disabled network interface."
    );
    return {
      success: false,
      path: visitedPath,
      events: recorder.getEvents(),
      summary: `Interface on ${sourceDevice.name} is down.`,
      failureReason: "Network interface is administratively down (disabled).",
      violatedRule: "Interface status must be enabled (UP).",
      hint: "Toggle the interface status to UP in the device configuration panel.",
    };
  }

  if (!primaryIface.ip || !isValidIpv4(primaryIface.ip)) {
    recorder.record(
      sourceDevice,
      "ICMP_ECHO",
      "L3",
      "dropped",
      `No valid IPv4 address assigned to ${primaryIface.name}.`,
      "A host must have a configured IPv4 address to participate in IP communications."
    );
    return {
      success: false,
      path: visitedPath,
      events: recorder.getEvents(),
      summary: `Missing IPv4 address on ${sourceDevice.name}.`,
      failureReason: "No IP address configured on the originating interface.",
      violatedRule: "Valid IPv4 address required (RFC 791).",
      hint: "Assign a valid IPv4 address in the required subnet.",
    };
  }

  const srcIp = primaryIface.ip;

  // ----------------------------------------------------
  // Stage 1: Domain Name Resolution (if target is hostname)
  // ----------------------------------------------------
  let targetIp = targetDestination.trim();
  const isDomainName = !isValidIpv4(targetIp);

  if (isDomainName) {
    recorder.record(
      sourceDevice,
      "DNS_REQ",
      "L7",
      "created",
      `DNS Query: Resolve '${targetIp}' A record`,
      `Application requested hostname resolution for '${targetIp}' via UDP port 53.`,
      srcIp
    );

    if (!sourceDevice.dnsServerIp) {
      recorder.record(
        sourceDevice,
        "DNS_REQ",
        "L7",
        "dropped",
        "No DNS server configured on this host.",
        "The host cannot resolve domain names without a configured DNS resolver IP."
      );
      return {
        success: false,
        path: visitedPath,
        events: recorder.getEvents(),
        summary: `DNS resolution failed for '${targetIp}'.`,
        failureReason: "Host lacks a configured DNS server IP address.",
        violatedRule: "DNS Client Configuration (RFC 1035).",
        hint: "Configure a valid DNS server IP on the host (e.g. 192.168.1.53 or 8.8.8.8).",
      };
    }

    // Attempt to route to DNS Server
    const dnsRouteRes = simulateRouteHop(
      sourceDevice,
      sourceDevice.dnsServerIp,
      devices,
      links,
      visitedPath,
      recorder,
      "DNS_REQ"
    );

    if (!dnsRouteRes.success) {
      return {
        success: false,
        path: visitedPath,
        events: recorder.getEvents(),
        summary: `Cannot reach DNS Server at ${sourceDevice.dnsServerIp}.`,
        failureReason: dnsRouteRes.reason,
        violatedRule: dnsRouteRes.violatedRule,
        hint: dnsRouteRes.hint,
      };
    }

    const dnsServer = findDevice(devices, dnsRouteRes.finalDeviceId);
    if (!dnsServer || dnsServer.type !== "dns-server") {
      recorder.record(
        sourceDevice,
        "DNS_REQ",
        "L7",
        "dropped",
        `Device at ${sourceDevice.dnsServerIp} is not a functional DNS server.`,
        "Queried IP does not answer DNS queries."
      );
      return {
        success: false,
        path: visitedPath,
        events: recorder.getEvents(),
        summary: "DNS Query refused.",
        failureReason: "Target DNS IP is not a DNS server node.",
        hint: "Point DNS to the dedicated DNS Server in the topology.",
      };
    }

    // Look up record
    const matchRecord = dnsServer.dnsRecords?.find(
      (r) => r.domain.toLowerCase() === targetIp.toLowerCase()
    );

    if (!matchRecord) {
      recorder.record(
        dnsServer,
        "DNS_REP",
        "L7",
        "dropped",
        `NXDOMAIN: '${targetIp}' not found in DNS zone database.`,
        "The DNS server does not have an authoritative or cached A record for this domain."
      );
      return {
        success: false,
        path: visitedPath,
        events: recorder.getEvents(),
        summary: `DNS NXDOMAIN: '${targetIp}' cannot be resolved.`,
        failureReason: `Domain '${targetIp}' is not registered on DNS server.`,
        hint: "Verify domain spelling or ensure records are populated.",
      };
    }

    targetIp = matchRecord.ip;
    recorder.record(
      dnsServer,
      "DNS_REP",
      "L7",
      "sent",
      `DNS Response: ${matchRecord.domain} -> ${matchRecord.ip}`,
      `Resolved domain '${matchRecord.domain}' to IPv4 address ${matchRecord.ip}.`,
      dnsServer.interfaces[0]?.ip,
      srcIp
    );
  }

  // ----------------------------------------------------
  // Stage 2: IP Delivery to targetIp
  // ----------------------------------------------------
  if (protocol === "TCP" || protocol === "HTTP") {
    recorder.record(
      sourceDevice,
      "TCP_SYN",
      "L4",
      "created",
      `TCP SYN: Client initiating connection to ${targetIp}:80 (Seq=1000)`,
      `Client creates socket in SYN_SENT state with Initial Sequence Number (ISN).`,
      srcIp,
      targetIp
    );
  } else {
    recorder.record(
      sourceDevice,
      "ICMP_ECHO",
      "L3",
      "created",
      `Packet generated: ${srcIp} -> ${targetIp}`,
      `Payload prepared for transmission with destination IP ${targetIp}.`,
      srcIp,
      targetIp
    );
  }

  const routeResult = simulateRouteHop(
    sourceDevice,
    targetIp,
    devices,
    links,
    visitedPath,
    recorder,
    protocol === "TCP" || protocol === "HTTP" ? "TCP_SYN" : "ICMP_ECHO"
  );

  if (!routeResult.success) {
    return {
      success: false,
      path: visitedPath,
      events: recorder.getEvents(),
      summary: routeResult.summary,
      failureReason: routeResult.reason,
      violatedRule: routeResult.violatedRule,
      hint: routeResult.hint,
      pingStats: {
        packetsSent: 4,
        packetsReceived: 0,
        packetLossPercent: 100,
        avgRttMs: 0,
      },
    };
  }

  const destinationDevice = findDevice(devices, routeResult.finalDeviceId);
  if (!destinationDevice) {
    return {
      success: false,
      path: visitedPath,
      events: recorder.getEvents(),
      summary: "Destination device not located.",
      failureReason: "Internal routing anomaly.",
    };
  }

  // ----------------------------------------------------
  // Stage 3: Protocol Handshake / Response Phase
  // ----------------------------------------------------
  if (protocol === "TCP" || protocol === "HTTP") {
    // SYN-ACK from server
    recorder.record(
      destinationDevice,
      "TCP_SYN_ACK",
      "L4",
      "sent",
      `SYN-ACK Packet: Server accepts connection (Seq=5000, Ack=1001)`,
      "Server responds to initial SYN packet with SYN-ACK flag set.",
      targetIp,
      srcIp
    );

    // Client ACK
    recorder.record(
      sourceDevice,
      "TCP_ACK",
      "L4",
      "sent",
      `ACK Packet: Connection ESTABLISHED (Ack=5001)`,
      "Client completes 3-way handshake. State transitions to ESTABLISHED.",
      srcIp,
      targetIp
    );

    if (protocol === "HTTP") {
      recorder.record(
        sourceDevice,
        "HTTP_GET",
        "L7",
        "sent",
        `HTTP GET /index.html (Host: ${isDomainName ? targetDestination : targetIp})`,
        "Client sends application payload request over the established TCP socket.",
        srcIp,
        targetIp
      );

      recorder.record(
        destinationDevice,
        "HTTP_200",
        "L7",
        "delivered",
        "HTTP/1.1 200 OK (Content-Type: text/html; 2048 bytes)",
        "Web server processes request and returns HTTP 200 Success payload.",
        targetIp,
        srcIp
      );
    }
  } else {
    // ICMP Echo Reply
    recorder.record(
      destinationDevice,
      "ICMP_REPLY",
      "L3",
      "delivered",
      `ICMP Echo Reply: bytes=64 ttl=64 time=1.42ms`,
      "Destination host replied to ICMP echo request successfully.",
      targetIp,
      srcIp
    );
  }

  return {
    success: true,
    path: visitedPath,
    events: recorder.getEvents(),
    summary: `Transmission successful! ${sourceDevice.name} communicated with ${destinationDevice.name} (${targetIp}).`,
    pingStats: {
      packetsSent: 4,
      packetsReceived: 4,
      packetLossPercent: 0,
      avgRttMs: 1.4,
    },
  };
}

// ==========================================
// Subnet & Hop Traversal Logic
// ==========================================

interface HopResult {
  success: boolean;
  finalDeviceId: string;
  summary: string;
  reason?: string;
  violatedRule?: string;
  hint?: string;
}

function simulateRouteHop(
  currentNode: NetworkDevice,
  targetIp: string,
  devices: NetworkDevice[],
  links: NetworkLink[],
  visitedPath: string[],
  recorder: EventRecorder,
  protocol: PacketProtocol
): HopResult {
  const currentIface = currentNode.interfaces[0];
  if (!currentIface || !currentIface.enabled || !currentIface.ip) {
    return {
      success: false,
      finalDeviceId: currentNode.id,
      summary: "Invalid interface state on current node.",
      reason: `Node ${currentNode.name} interface is down or unconfigured.`,
    };
  }

  const srcIp = currentIface.ip;
  const prefix = currentIface.prefix ?? 24;

  // Case A: Are we on the same local subnet?
  const isLocal = isSameSubnet(srcIp, targetIp, prefix);

  if (isLocal) {
    recorder.record(
      currentNode,
      "ARP_REQ",
      "L2",
      "sent",
      `ARP Request: Who has ${targetIp}? Tell ${srcIp}`,
      `Target ${targetIp} is on the local subnet (${getNetworkAddress(srcIp, prefix)}/${prefix}). Broadcasting ARP request.`,
      srcIp,
      targetIp
    );

    // Follow physical link to next node
    const linkInfo = findConnectedLink(links, currentNode.id, currentIface.id);
    if (!linkInfo) {
      recorder.record(
        currentNode,
        "L2_FRAME",
        "L2",
        "dropped",
        `Physical port ${currentIface.name} is unconnected (no cable attached).`,
        "A physical Ethernet connection is required to transmit data frames."
      );
      return {
        success: false,
        finalDeviceId: currentNode.id,
        summary: `No link connected to ${currentNode.name}.`,
        reason: `Port ${currentIface.name} has no cable connected.`,
        violatedRule: "Layer 1 Physical Link missing.",
        hint: "Connect the interface to the switch or destination device.",
      };
    }

    if (linkInfo.link.status === "down") {
      recorder.record(
        currentNode,
        "L2_FRAME",
        "L2",
        "dropped",
        `Link between ${currentNode.name} and peer is disconnected or severed.`,
        "Carrier signal is lost on this cable."
      );
      return {
        success: false,
        finalDeviceId: currentNode.id,
        summary: `Disconnected link on ${currentNode.name}.`,
        reason: "The physical cable connection is marked DOWN.",
        violatedRule: "Physical Link State must be UP.",
        hint: "Check cable connection status and repair the link.",
      };
    }

    // Traverse intermediate switches to find the target device
    const forwardRes = forwardThroughSwitches(
      linkInfo.peerDeviceId,
      targetIp,
      devices,
      links,
      visitedPath,
      recorder,
      new Set([currentNode.id])
    );

    return forwardRes;
  }

  // Case B: Destination is outside local subnet -> Requires Default Gateway
  if (!currentIface.gateway) {
    recorder.record(
      currentNode,
      "ICMP_ECHO",
      "L3",
      "dropped",
      `Routing Error: Target ${targetIp} is remote, but no Default Gateway is configured.`,
      `Destination is on network ${getNetworkAddress(targetIp, prefix)}/${prefix}, while host is on ${getNetworkAddress(srcIp, prefix)}/${prefix}.`,
      srcIp,
      targetIp
    );
    return {
      success: false,
      finalDeviceId: currentNode.id,
      summary: "Missing Default Gateway.",
      reason: `Host ${currentNode.name} has no Default Gateway configured to reach external subnets.`,
      violatedRule: "Default Gateway Required for Off-Subnet Routing (RFC 1122).",
      hint: "Set the Default Gateway to the router's IP address on the local subnet.",
    };
  }

  const gatewayIp = currentIface.gateway;

  // Gateway MUST be on the local subnet
  if (!isSameSubnet(srcIp, gatewayIp, prefix)) {
    recorder.record(
      currentNode,
      "ICMP_ECHO",
      "L3",
      "dropped",
      `Configuration Error: Gateway ${gatewayIp} is NOT on the local subnet (${getNetworkAddress(srcIp, prefix)}/${prefix}).`,
      `A default gateway must reside within the host's own broadcast domain to be reachable via ARP.`,
      srcIp,
      gatewayIp
    );
    return {
      success: false,
      finalDeviceId: currentNode.id,
      summary: "Invalid Default Gateway Subnet.",
      reason: `Default gateway ${gatewayIp} is in a different subnet than ${srcIp}/${prefix}.`,
      violatedRule: "Gateway must be in the same subnet as the host interface.",
      hint: `Change the default gateway to an IP in the ${getNetworkAddress(srcIp, prefix)}/${prefix} range (e.g. router interface IP).`,
    };
  }

  // Forward packet to the Default Gateway
  recorder.record(
    currentNode,
    "L2_FRAME",
    "L2",
    "forwarded",
    `Forwarding frame to Default Gateway at ${gatewayIp} for off-subnet delivery.`,
    `Next hop selected: ${gatewayIp}.`,
    srcIp,
    gatewayIp
  );

  const linkToGateway = findConnectedLink(links, currentNode.id, currentIface.id);
  if (!linkToGateway || linkToGateway.link.status === "down") {
    recorder.record(
      currentNode,
      "L2_FRAME",
      "L2",
      "dropped",
      "Cable to gateway or switch is disconnected.",
      "Cannot reach default gateway due to physical link failure."
    );
    return {
      success: false,
      finalDeviceId: currentNode.id,
      summary: "Physical link down while reaching gateway.",
      reason: "Link is disconnected.",
      hint: "Ensure the cable between the device and switch/router is connected and enabled.",
    };
  }

  // Traverse through switch to gateway
  const reachGatewayRes = forwardThroughSwitches(
    linkToGateway.peerDeviceId,
    gatewayIp,
    devices,
    links,
    visitedPath,
    recorder,
    new Set([currentNode.id])
  );

  if (!reachGatewayRes.success) {
    return reachGatewayRes;
  }

  // We have arrived at the Gateway (Router)
  const routerNode = findDevice(devices, reachGatewayRes.finalDeviceId);
  if (!routerNode || routerNode.type !== "router") {
    return {
      success: false,
      finalDeviceId: reachGatewayRes.finalDeviceId,
      summary: "Gateway device is not a router.",
      reason: `Configured gateway IP belongs to a ${routerNode?.type || "unknown device"}, not a router.`,
      hint: "Set default gateway to the router's IP address.",
    };
  }

  // Router forwarding logic
  return routeFromRouter(routerNode, targetIp, devices, links, visitedPath, recorder, protocol);
}

function forwardThroughSwitches(
  nextDeviceId: string,
  targetIp: string,
  devices: NetworkDevice[],
  links: NetworkLink[],
  visitedPath: string[],
  recorder: EventRecorder,
  visitedNodes: Set<string>
): HopResult {
  const current = findDevice(devices, nextDeviceId);
  if (!current) {
    return {
      success: false,
      finalDeviceId: nextDeviceId,
      summary: "Peer device missing.",
      reason: "Unknown node ID in link table.",
    };
  }

  if (visitedNodes.has(current.id)) {
    return {
      success: false,
      finalDeviceId: current.id,
      summary: "Switching loop detected (Spanning Tree loop).",
      reason: "A Layer 2 forwarding loop occurred.",
    };
  }
  visitedNodes.add(current.id);

  if (!visitedPath.includes(current.id)) {
    visitedPath.push(current.id);
  }

  // Did we reach a host or router with the target IP?
  for (const iface of current.interfaces) {
    if (iface.ip === targetIp && iface.enabled) {
      recorder.record(
        current,
        "ARP_REP",
        "L2",
        "received",
        `Frame delivered to ${current.name} (${iface.name} - ${iface.mac})`,
        `Host ${current.name} matched target IP ${targetIp} and accepted the packet.`,
        undefined,
        targetIp
      );
      return {
        success: true,
        finalDeviceId: current.id,
        summary: `Reached target ${current.name}`,
      };
    }
  }

  // If this node is a Switch, flood / forward along active links to other devices
  if (current.type === "switch") {
    recorder.record(
      current,
      "L2_FRAME",
      "L2",
      "forwarded",
      `Switch ${current.name} forwarding frame across active ports.`,
      `Switch performs transparent MAC-table learning and forwarding.`
    );

    const switchLinks = getDeviceLinks(links, current.id);
    for (const l of switchLinks) {
      if (l.status === "down") continue;
      const peerId = l.sourceDeviceId === current.id ? l.targetDeviceId : l.sourceDeviceId;
      if (visitedNodes.has(peerId)) continue;

      const subRes = forwardThroughSwitches(
        peerId,
        targetIp,
        devices,
        links,
        visitedPath,
        recorder,
        visitedNodes
      );
      if (subRes.success) {
        return subRes;
      }
    }
  }

  // Destination host unreachable on this broadcast domain
  return {
    success: false,
    finalDeviceId: current.id,
    summary: `Host with IP ${targetIp} not found on local network segment.`,
    reason: `ARP Request timed out. No host answered for ${targetIp}.`,
    violatedRule: "Host IP must be configured and attached to the broadcast domain.",
    hint: `Verify that target device has IP ${targetIp} assigned and its interface is enabled.`,
  };
}

function routeFromRouter(
  router: NetworkDevice,
  targetIp: string,
  devices: NetworkDevice[],
  links: NetworkLink[],
  visitedPath: string[],
  recorder: EventRecorder,
  protocol: PacketProtocol
): HopResult {
  recorder.record(
    router,
    protocol,
    "L3",
    "received",
    `Router ${router.name} inspecting destination IP ${targetIp}`,
    "Router examines its routing table and directly attached interfaces."
  );

  // Check router interfaces for a directly connected network matching targetIp
  let matchingIface: NetworkInterface | undefined;
  for (const iface of router.interfaces) {
    if (!iface.enabled || !iface.ip) continue;
    const prefix = iface.prefix ?? 24;
    if (isSameSubnet(iface.ip, targetIp, prefix)) {
      matchingIface = iface;
      break;
    }
  }

  if (!matchingIface) {
    // Check routing table
    const route = router.routes?.find((r) => {
      const net = getNetworkAddress(targetIp, r.prefix);
      return net === r.destination;
    });

    if (route) {
      matchingIface = router.interfaces.find((i) => i.id === route.interfaceId && i.enabled);
    }
  }

  if (!matchingIface) {
    recorder.record(
      router,
      "ICMP_ECHO",
      "L3",
      "dropped",
      `ICMP Network Unreachable: Router has no route to ${targetIp}.`,
      `Router ${router.name} checked its routing table and found no matching route for destination ${targetIp}.`
    );
    return {
      success: false,
      finalDeviceId: router.id,
      summary: "Destination Network Unreachable.",
      reason: `Router ${router.name} has no interface or route matching the subnet of ${targetIp}.`,
      violatedRule: "Routing Table Entry Required (RFC 1812).",
      hint: `Configure an IP interface on ${router.name} that shares a subnet with ${targetIp}.`,
    };
  }

  recorder.record(
    router,
    "ROUTED_HOP",
    "L3",
    "forwarded",
    `Routing via ${matchingIface.name} (${matchingIface.ip}) -> destination subnet.`,
    `Router decrements IPv4 TTL and forwards packet out interface ${matchingIface.name}.`
  );

  const outLink = findConnectedLink(links, router.id, matchingIface.id);
  if (!outLink || outLink.link.status === "down") {
    recorder.record(
      router,
      "L2_FRAME",
      "L2",
      "dropped",
      `Outgoing link on ${matchingIface.name} is down or disconnected.`,
      "Router cannot forward frame onto a disconnected network link."
    );
    return {
      success: false,
      finalDeviceId: router.id,
      summary: "Router outgoing link disconnected.",
      reason: `Cable on ${router.name}:${matchingIface.name} is down.`,
      hint: "Check and enable the physical link connected to this router interface.",
    };
  }

  return forwardThroughSwitches(
    outLink.peerDeviceId,
    targetIp,
    devices,
    links,
    visitedPath,
    recorder,
    new Set([router.id])
  );
}
