/**
 * Network Quest — Mission Definitions
 * 10 progressive, pedagogically sound networking challenges.
 */

import type { Mission } from "./types";

export const missions: Mission[] = [
  // ----------------------------------------------------
  // Mission 1: First Wire
  // ----------------------------------------------------
  {
    id: "m1-first-wire",
    number: 1,
    title: "First Wire: Physical & Link Layer",
    category: "fundamentals",
    difficulty: "Beginner",
    timeEstimate: "2 min",
    concept: "OSI Layer 1 (Physical) & Layer 2 (Data Link) connectivity",
    objective: "Enable the network interface on PC-A so it can communicate with PC-B.",
    scenario:
      "PC-A (192.168.1.10) and PC-B (192.168.1.20) are connected through Switch-1 in an office LAN. However, ping attempts from PC-A fail immediately. The physical network cable is connected, but the host interface is administratively DOWN.",
    initialDevices: [
      {
        id: "pc-a",
        name: "PC-A",
        type: "pc",
        position: { x: 18, y: 50 },
        status: "misconfigured",
        roleDescription: "Engineering Workstation",
        interfaces: [
          {
            id: "pc-a-eth0",
            name: "eth0",
            mac: "00:1A:2B:3C:4D:01",
            ip: "192.168.1.10",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: false, // Intentional fault: Interface DOWN
            linkId: "link-pca-sw1",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Switch-1",
        type: "switch",
        position: { x: 50, y: 50 },
        status: "online",
        roleDescription: "Core Access Switch",
        interfaces: [
          {
            id: "sw1-port1",
            name: "FastEthernet0/1",
            mac: "AA:BB:CC:DD:01:01",
            enabled: true,
            linkId: "link-pca-sw1",
          },
          {
            id: "sw1-port2",
            name: "FastEthernet0/2",
            mac: "AA:BB:CC:DD:01:02",
            enabled: true,
            linkId: "link-pcb-sw1",
          },
        ],
      },
      {
        id: "pc-b",
        name: "PC-B",
        type: "pc",
        position: { x: 82, y: 50 },
        status: "online",
        roleDescription: "Department File Host",
        interfaces: [
          {
            id: "pc-b-eth0",
            name: "eth0",
            mac: "00:1A:2B:3C:4D:02",
            ip: "192.168.1.20",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-pcb-sw1",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-pca-sw1",
        sourceDeviceId: "pc-a",
        sourceInterfaceId: "pc-a-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw1-port1",
        status: "up",
        bandwidth: "1 Gbps",
      },
      {
        id: "link-pcb-sw1",
        sourceDeviceId: "pc-b",
        sourceInterfaceId: "pc-b-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw1-port2",
        status: "up",
        bandwidth: "1 Gbps",
      },
    ],
    allowedEditableDevices: ["pc-a"],
    allowedEditableFields: {
      "pc-a": ["enabled"],
    },
    testScenario: {
      sourceDeviceId: "pc-a",
      targetDestination: "192.168.1.20",
      protocol: "ICMP",
    },
    validationRules: {
      expectedTargetIp: "192.168.1.20",
      mustTraverseDeviceIds: ["pc-a", "sw-1", "pc-b"],
    },
    hints: [
      "Select PC-A in the topology or device inspector to view its interface properties.",
      "Notice that the status of interface 'eth0' is currently disabled (Administrative DOWN).",
      "Click the toggle switch to set eth0 to 'UP / Enabled', then run Test Ping.",
    ],
    technicalExplanation:
      "At Layer 1 and 2, a network adapter must be administratively UP and have link carrier before the operating system kernel can place frames onto the wire. Even with correct IP addressing, a down interface drops all outbound packets before serialization.",
    bonusGoal: "Solve without using any hints (+100 XP)",
    relatedNoteSlug: "tcp-handshake-lifecycle",
    relatedLabAnchor: "networking",
  },

  // ----------------------------------------------------
  // Mission 2: IP Alignment
  // ----------------------------------------------------
  {
    id: "m2-ip-alignment",
    number: 2,
    title: "IP Alignment: Subnet Matching",
    category: "fundamentals",
    difficulty: "Beginner",
    timeEstimate: "3 min",
    concept: "IPv4 Subnet Boundaries & Masking (/24)",
    objective: "Reconfigure PC-A's IP address so it resides on the same 192.168.1.0/24 subnet as Server-1.",
    scenario:
      "A technician manually typed 192.168.2.10 into PC-A. Because Server-1 is located at 192.168.1.50 with mask 255.255.255.0 (/24), PC-A thinks Server-1 is on an alien remote network and cannot communicate via the local switch.",
    initialDevices: [
      {
        id: "pc-a",
        name: "PC-A",
        type: "pc",
        position: { x: 20, y: 50 },
        status: "misconfigured",
        roleDescription: "Finance Workstation",
        interfaces: [
          {
            id: "pc-a-eth0",
            name: "eth0",
            mac: "00:1A:2B:3C:4D:11",
            ip: "192.168.2.10", // Intentional fault: wrong subnet (2.x instead of 1.x)
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-pca-sw1",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Switch-1",
        type: "switch",
        position: { x: 50, y: 50 },
        status: "online",
        roleDescription: "Unmanaged Layer 2 Switch",
        interfaces: [
          {
            id: "sw1-p1",
            name: "port1",
            mac: "AA:BB:CC:11:01",
            enabled: true,
            linkId: "link-pca-sw1",
          },
          {
            id: "sw1-p2",
            name: "port2",
            mac: "AA:BB:CC:11:02",
            enabled: true,
            linkId: "link-srv-sw1",
          },
        ],
      },
      {
        id: "srv-1",
        name: "Server-1",
        type: "web-server",
        position: { x: 80, y: 50 },
        status: "online",
        roleDescription: "Accounting Server (192.168.1.50)",
        interfaces: [
          {
            id: "srv1-eth0",
            name: "eth0",
            mac: "00:1A:2B:3C:4D:50",
            ip: "192.168.1.50",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-srv-sw1",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-pca-sw1",
        sourceDeviceId: "pc-a",
        sourceInterfaceId: "pc-a-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw1-p1",
        status: "up",
      },
      {
        id: "link-srv-sw1",
        sourceDeviceId: "srv-1",
        sourceInterfaceId: "srv1-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw1-p2",
        status: "up",
      },
    ],
    allowedEditableDevices: ["pc-a"],
    allowedEditableFields: {
      "pc-a": ["ip"],
    },
    testScenario: {
      sourceDeviceId: "pc-a",
      targetDestination: "192.168.1.50",
      protocol: "ICMP",
    },
    validationRules: {
      expectedTargetIp: "192.168.1.50",
      mustTraverseDeviceIds: ["pc-a", "sw-1", "srv-1"],
    },
    hints: [
      "Check Server-1's IP address: it is 192.168.1.50 with mask 255.255.255.0.",
      "Notice PC-A's 3rd octet is '2' (192.168.2.10). In a /24 subnet, the first 3 octets define the network ID.",
      "Change PC-A's IP to an address in the 192.168.1.0/24 subnet (e.g. 192.168.1.10).",
    ],
    technicalExplanation:
      "With a /24 subnet mask (255.255.255.0), the network ID is the first 24 bits (192.168.1.0). Hosts with 192.168.2.x belong to a different network. Without a Layer 3 router, devices in different subnets cannot communicate, even if plugged into the same Layer 2 switch.",
    bonusGoal: "Keep IP in valid host range 192.168.1.2 - 192.168.1.254",
    relatedNoteSlug: "cidr-subnetting-guide",
    relatedLabAnchor: "subnet",
  },

  // ----------------------------------------------------
  // Mission 3: The Gateway Key
  // ----------------------------------------------------
  {
    id: "m3-gateway-key",
    number: 3,
    title: "The Gateway Key: Default Gateway Configuration",
    category: "routing",
    difficulty: "Beginner",
    timeEstimate: "3 min",
    concept: "Default Gateway Role & Reachability (RFC 1122)",
    objective: "Configure the correct Default Gateway on PC-1 so it can send packets to the External Cloud Server.",
    scenario:
      "PC-1 (10.0.0.15/24) wants to reach the External Server (172.16.0.50/24). Router-1's LAN interface is 10.0.0.1, but PC-1 has its gateway accidentally set to 192.168.1.1 (an unreachable IP).",
    initialDevices: [
      {
        id: "pc-1",
        name: "PC-1",
        type: "pc",
        position: { x: 15, y: 50 },
        status: "misconfigured",
        roleDescription: "Internal Workstation",
        interfaces: [
          {
            id: "pc1-eth0",
            name: "eth0",
            mac: "00:1A:2B:01:00:15",
            ip: "10.0.0.15",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "192.168.1.1", // Intentional fault: gateway is in wrong subnet
            enabled: true,
            linkId: "link-pc1-r1",
          },
        ],
      },
      {
        id: "r-1",
        name: "Router-1",
        type: "router",
        position: { x: 50, y: 50 },
        status: "online",
        roleDescription: "Edge Gateway Router",
        interfaces: [
          {
            id: "r1-gi0",
            name: "gi0/0 (LAN)",
            mac: "AA:01:02:03:00:01",
            ip: "10.0.0.1",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-pc1-r1",
          },
          {
            id: "r1-gi1",
            name: "gi0/1 (WAN)",
            mac: "AA:01:02:03:00:02",
            ip: "172.16.0.1",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-r1-srv",
          },
        ],
      },
      {
        id: "ext-srv",
        name: "Cloud-Server",
        type: "web-server",
        position: { x: 85, y: 50 },
        status: "online",
        roleDescription: "External Web Server (172.16.0.50)",
        interfaces: [
          {
            id: "ext-eth0",
            name: "eth0",
            mac: "00:99:88:77:00:50",
            ip: "172.16.0.50",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "172.16.0.1",
            enabled: true,
            linkId: "link-r1-srv",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-pc1-r1",
        sourceDeviceId: "pc-1",
        sourceInterfaceId: "pc1-eth0",
        targetDeviceId: "r-1",
        targetInterfaceId: "r1-gi0",
        status: "up",
      },
      {
        id: "link-r1-srv",
        sourceDeviceId: "r-1",
        sourceInterfaceId: "r1-gi1",
        targetDeviceId: "ext-srv",
        targetInterfaceId: "ext-eth0",
        status: "up",
      },
    ],
    allowedEditableDevices: ["pc-1"],
    allowedEditableFields: {
      "pc-1": ["gateway"],
    },
    testScenario: {
      sourceDeviceId: "pc-1",
      targetDestination: "172.16.0.50",
      protocol: "ICMP",
    },
    validationRules: {
      expectedTargetIp: "172.16.0.50",
      mustTraverseDeviceIds: ["pc-1", "r-1", "ext-srv"],
    },
    hints: [
      "Target 172.16.0.50 is on a different network than PC-1 (10.0.0.15). That requires a Default Gateway.",
      "Check Router-1's LAN interface: gi0/0 is configured with IP 10.0.0.1.",
      "A host's Default Gateway must be in the host's own local subnet. Set PC-1's gateway to 10.0.0.1.",
    ],
    technicalExplanation:
      "When a host detects that the destination IP does not match its local subnet mask, it must encapsulate the frame with the MAC address of its Default Gateway. If the gateway address itself is in a foreign subnet, the host cannot resolve it via ARP and drops the packet locally.",
    relatedNoteSlug: "cidr-subnetting-guide",
    relatedLabAnchor: "cloud",
  },

  // ----------------------------------------------------
  // Mission 4: CIDR Expansion
  // ----------------------------------------------------
  {
    id: "m4-cidr-expansion",
    number: 4,
    title: "CIDR Expansion: Subnet Mask Boundary",
    category: "fundamentals",
    difficulty: "Intermediate",
    timeEstimate: "4 min",
    concept: "Variable-Length Subnet Masking (/28 vs /24)",
    objective: "Fix PC-1's subnet mask so it can reach PC-2 at 192.168.1.130.",
    scenario:
      "PC-1 is set to 192.168.1.10 with a /28 mask (255.255.255.240), restricting its local subnet to 192.168.1.0 - 192.168.1.15. Because PC-2 is at 192.168.1.130, PC-1 incorrectly treats it as remote and cannot connect.",
    initialDevices: [
      {
        id: "pc-1",
        name: "PC-1",
        type: "pc",
        position: { x: 20, y: 50 },
        status: "misconfigured",
        roleDescription: "Dev Machine (192.168.1.10)",
        interfaces: [
          {
            id: "pc1-eth0",
            name: "eth0",
            mac: "00:1A:11:22:33:01",
            ip: "192.168.1.10",
            subnetMask: "255.255.255.240",
            prefix: 28, // Intentional fault: /28 only covers .0 to .15
            enabled: true,
            linkId: "link-pc1-sw",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Switch-1",
        type: "switch",
        position: { x: 50, y: 50 },
        status: "online",
        roleDescription: "Flat LAN Switch",
        interfaces: [
          { id: "sw1-p1", name: "fa0/1", mac: "SW:01:01", enabled: true, linkId: "link-pc1-sw" },
          { id: "sw1-p2", name: "fa0/2", mac: "SW:01:02", enabled: true, linkId: "link-pc2-sw" },
        ],
      },
      {
        id: "pc-2",
        name: "PC-2",
        type: "pc",
        position: { x: 80, y: 50 },
        status: "online",
        roleDescription: "Staging Server (192.168.1.130)",
        interfaces: [
          {
            id: "pc2-eth0",
            name: "eth0",
            mac: "00:1A:11:22:33:02",
            ip: "192.168.1.130",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-pc2-sw",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-pc1-sw",
        sourceDeviceId: "pc-1",
        sourceInterfaceId: "pc1-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw1-p1",
        status: "up",
      },
      {
        id: "link-pc2-sw",
        sourceDeviceId: "pc-2",
        sourceInterfaceId: "pc2-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw1-p2",
        status: "up",
      },
    ],
    allowedEditableDevices: ["pc-1"],
    allowedEditableFields: {
      "pc-1": ["subnetMask", "prefix"],
    },
    testScenario: {
      sourceDeviceId: "pc-1",
      targetDestination: "192.168.1.130",
      protocol: "ICMP",
    },
    validationRules: {
      expectedTargetIp: "192.168.1.130",
      mustTraverseDeviceIds: ["pc-1", "sw-1", "pc-2"],
    },
    hints: [
      "A /28 subnet mask only provides 14 usable hosts (range .1 to .14 with broadcast at .15).",
      "Because PC-2 is at .130, PC-1 calculates that .130 is outside its subnet.",
      "Change PC-1's subnet mask to 255.255.255.0 (/24) to expand the local subnet to .1 - .254.",
    ],
    technicalExplanation:
      "Subnet masks determine the boundary between the Network prefix and Host identifiers. A /28 mask splits the final octet into 16-address blocks. Because .10 and .130 reside in different /28 blocks, PC-1 refuses to ARP directly without a router.",
    relatedNoteSlug: "cidr-subnetting-guide",
    relatedLabAnchor: "subnet",
  },

  // ----------------------------------------------------
  // Mission 5: Router Dual-Homing
  // ----------------------------------------------------
  {
    id: "m5-router-dual-homing",
    number: 5,
    title: "Dual-Homed Routing: Inter-VLAN Transit",
    category: "routing",
    difficulty: "Intermediate",
    timeEstimate: "5 min",
    concept: "Router Interface Addressing across Subnets",
    objective: "Configure Router-1's Subnet B interface (gi0/1) so PC-1 can route packets to Database-1.",
    scenario:
      "PC-1 (192.168.10.5/24) needs to query Database-1 (192.168.20.100/24). Router-1 is already connected to both LANs, but its gi0/1 interface on Subnet B has no IP address assigned.",
    initialDevices: [
      {
        id: "pc-1",
        name: "PC-1",
        type: "pc",
        position: { x: 15, y: 50 },
        status: "online",
        roleDescription: "Client (192.168.10.5)",
        interfaces: [
          {
            id: "pc1-eth0",
            name: "eth0",
            mac: "00:AA:01:05",
            ip: "192.168.10.5",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "192.168.10.1",
            enabled: true,
            linkId: "link-pc1-r1",
          },
        ],
      },
      {
        id: "r-1",
        name: "Router-1",
        type: "router",
        position: { x: 50, y: 50 },
        status: "misconfigured",
        roleDescription: "Inter-Subnet Router",
        interfaces: [
          {
            id: "r1-gi0",
            name: "gi0/0 (Subnet A)",
            mac: "00:RR:01:01",
            ip: "192.168.10.1",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-pc1-r1",
          },
          {
            id: "r1-gi1",
            name: "gi0/1 (Subnet B)",
            mac: "00:RR:01:02",
            ip: "", // Intentional fault: missing IP for Subnet B gateway
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-r1-db",
          },
        ],
      },
      {
        id: "db-1",
        name: "Database-1",
        type: "web-server",
        position: { x: 85, y: 50 },
        status: "online",
        roleDescription: "PostgreSQL Node (192.168.20.100)",
        interfaces: [
          {
            id: "db1-eth0",
            name: "eth0",
            mac: "00:DB:01:10",
            ip: "192.168.20.100",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "192.168.20.1",
            enabled: true,
            linkId: "link-r1-db",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-pc1-r1",
        sourceDeviceId: "pc-1",
        sourceInterfaceId: "pc1-eth0",
        targetDeviceId: "r-1",
        targetInterfaceId: "r1-gi0",
        status: "up",
      },
      {
        id: "link-r1-db",
        sourceDeviceId: "r-1",
        sourceInterfaceId: "r1-gi1",
        targetDeviceId: "db-1",
        targetInterfaceId: "db1-eth0",
        status: "up",
      },
    ],
    allowedEditableDevices: ["r-1"],
    allowedEditableFields: {
      "r-1": ["ip"],
    },
    testScenario: {
      sourceDeviceId: "pc-1",
      targetDestination: "192.168.20.100",
      protocol: "ICMP",
    },
    validationRules: {
      expectedTargetIp: "192.168.20.100",
      mustTraverseDeviceIds: ["pc-1", "r-1", "db-1"],
    },
    hints: [
      "Inspect Database-1: its default gateway is set to 192.168.20.1.",
      "Router-1 connects to Subnet B via interface gi0/1, but it has no IP configured.",
      "Assign IP 192.168.20.1 to Router-1's gi0/1 interface so it can forward packets onto Subnet B.",
    ],
    technicalExplanation:
      "A router joins two distinct broadcast domains by having a unique IP interface in each subnet. Each interface serves as the Default Gateway for devices in that respective subnet.",
    relatedNoteSlug: "cidr-subnetting-guide",
    relatedLabAnchor: "networking",
  },

  // ----------------------------------------------------
  // Mission 6: The Broken Link
  // ----------------------------------------------------
  {
    id: "m6-broken-link",
    number: 6,
    title: "Switch & Port Triage: Physical Disconnect",
    category: "fundamentals",
    difficulty: "Intermediate",
    timeEstimate: "3 min",
    concept: "Layer 1/2 Fault Isolation in Switched Topologies",
    objective: "Identify and repair the severed physical link between Switch-1 and the Department Gateway.",
    scenario:
      "PC-1 is attempting to access the Router, but packets are dropped at the switch. Physical inspection reveals the cable linking Switch-1 to Router-1 was unplugged during rack maintenance.",
    initialDevices: [
      {
        id: "pc-1",
        name: "PC-1",
        type: "pc",
        position: { x: 18, y: 50 },
        status: "online",
        roleDescription: "Finance PC (192.168.1.10)",
        interfaces: [
          {
            id: "pc1-eth0",
            name: "eth0",
            mac: "00:11:22:33:44:01",
            ip: "192.168.1.10",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "192.168.1.1",
            enabled: true,
            linkId: "link-pc-sw",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Switch-1",
        type: "switch",
        position: { x: 50, y: 50 },
        status: "misconfigured",
        roleDescription: "Floor Access Switch",
        interfaces: [
          { id: "sw-p1", name: "port1", mac: "SW:01:P1", enabled: true, linkId: "link-pc-sw" },
          { id: "sw-p2", name: "port2", mac: "SW:01:P2", enabled: true, linkId: "link-sw-r1" },
        ],
      },
      {
        id: "r-1",
        name: "Router-1",
        type: "router",
        position: { x: 82, y: 50 },
        status: "online",
        roleDescription: "Core Gateway (192.168.1.1)",
        interfaces: [
          {
            id: "r1-eth0",
            name: "gi0/0",
            mac: "AA:BB:00:11:22:33",
            ip: "192.168.1.1",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-sw-r1",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-pc-sw",
        sourceDeviceId: "pc-1",
        sourceInterfaceId: "pc1-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p1",
        status: "up",
      },
      {
        id: "link-sw-r1",
        sourceDeviceId: "sw-1",
        sourceInterfaceId: "sw-p2",
        targetDeviceId: "r-1",
        targetInterfaceId: "r1-eth0",
        status: "down", // Intentional fault: Physical cable disconnected
      },
    ],
    allowedEditableDevices: ["sw-1"],
    allowedEditableFields: {
      "sw-1": ["enabled"],
    },
    testScenario: {
      sourceDeviceId: "pc-1",
      targetDestination: "192.168.1.1",
      protocol: "ICMP",
    },
    validationRules: {
      expectedTargetIp: "192.168.1.1",
      mustTraverseDeviceIds: ["pc-1", "sw-1", "r-1"],
    },
    hints: [
      "Notice the dotted/red line between Switch-1 and Router-1 in the topology canvas.",
      "Inspect the link or Switch-1's port2 connection: the link status is DOWN.",
      "Toggle the link connection state to UP to reconnect the Ethernet carrier.",
    ],
    technicalExplanation:
      "Layer 1 signal integrity is mandatory before Layer 2 frames can travel. A broken cable or dead SFP transceiver prevents carrier detection, causing the switch to drop frames intended for that port.",
    relatedNoteSlug: "tcp-handshake-lifecycle",
    relatedLabAnchor: "networking",
  },

  // ----------------------------------------------------
  // Mission 7: The Silent Server (DNS Resolution)
  // ----------------------------------------------------
  {
    id: "m7-silent-server",
    number: 7,
    title: "The Silent Resolver: DNS Lookup Failure",
    category: "protocols",
    difficulty: "Intermediate",
    timeEstimate: "4 min",
    concept: "Application Layer (DNS Port 53) & Recursive A-Records",
    objective: "Configure the correct DNS Server IP on PC-1 so it can resolve 'api.internal.corp'.",
    scenario:
      "PC-1 is trying to connect to 'api.internal.corp'. However, its DNS server address is blank, meaning it has no nameserver to query for translating the domain name into an IP address.",
    initialDevices: [
      {
        id: "pc-1",
        name: "PC-1",
        type: "pc",
        position: { x: 18, y: 50 },
        status: "misconfigured",
        roleDescription: "Workstation Client",
        dnsServerIp: "", // Intentional fault: No DNS server set
        interfaces: [
          {
            id: "pc1-eth0",
            name: "eth0",
            mac: "00:AA:11:22",
            ip: "192.168.1.10",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "192.168.1.1",
            enabled: true,
            linkId: "link-pc1-sw",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Switch-1",
        type: "switch",
        position: { x: 50, y: 50 },
        status: "online",
        roleDescription: "Campus Switch",
        interfaces: [
          { id: "sw-p1", name: "port1", mac: "SW:01", enabled: true, linkId: "link-pc1-sw" },
          { id: "sw-p2", name: "port2", mac: "SW:02", enabled: true, linkId: "link-dns-sw" },
          { id: "sw-p3", name: "port3", mac: "SW:03", enabled: true, linkId: "link-api-sw" },
        ],
      },
      {
        id: "dns-1",
        name: "DNS-Server",
        type: "dns-server",
        position: { x: 50, y: 15 },
        status: "online",
        roleDescription: "Internal BIND Resolver (192.168.1.53)",
        dnsRecords: [
          { domain: "api.internal.corp", ip: "192.168.1.99", type: "A" },
          { domain: "portal.internal.corp", ip: "192.168.1.88", type: "A" },
        ],
        interfaces: [
          {
            id: "dns-eth0",
            name: "eth0",
            mac: "00:DD:53:01",
            ip: "192.168.1.53",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-dns-sw",
          },
        ],
      },
      {
        id: "api-srv",
        name: "API-Server",
        type: "web-server",
        position: { x: 82, y: 50 },
        status: "online",
        roleDescription: "Microservice Node (192.168.1.99)",
        interfaces: [
          {
            id: "api-eth0",
            name: "eth0",
            mac: "00:AA:99:01",
            ip: "192.168.1.99",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-api-sw",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-pc1-sw",
        sourceDeviceId: "pc-1",
        sourceInterfaceId: "pc1-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p1",
        status: "up",
      },
      {
        id: "link-dns-sw",
        sourceDeviceId: "dns-1",
        sourceInterfaceId: "dns-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p2",
        status: "up",
      },
      {
        id: "link-api-sw",
        sourceDeviceId: "api-srv",
        sourceInterfaceId: "api-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p3",
        status: "up",
      },
    ],
    allowedEditableDevices: ["pc-1"],
    allowedEditableFields: {
      "pc-1": ["dnsServerIp"],
    },
    testScenario: {
      sourceDeviceId: "pc-1",
      targetDestination: "api.internal.corp",
      protocol: "DNS",
    },
    validationRules: {
      expectedTargetIp: "192.168.1.99",
      mustTraverseDeviceIds: ["pc-1", "sw-1", "dns-1"],
    },
    hints: [
      "Notice that the destination is a domain name: 'api.internal.corp'. Computers need DNS to find its IP.",
      "Inspect the DNS-Server device: its IP is 192.168.1.53.",
      "Open PC-1's configuration and set its DNS Server IP to 192.168.1.53.",
    ],
    technicalExplanation:
      "When an application requests a socket to a domain name, the operating system's stub resolver sends a UDP query to the DNS server specified in its network configuration (e.g. in /etc/resolv.conf). If no DNS server is defined, resolution fails immediately.",
    relatedNoteSlug: "dns-resolution-path",
    relatedLabAnchor: "networking",
  },

  // ----------------------------------------------------
  // Mission 8: The 3-Way Handshake
  // ----------------------------------------------------
  {
    id: "m8-tcp-handshake",
    number: 8,
    title: "Transport Synchronization: TCP 3-Way Handshake",
    category: "protocols",
    difficulty: "Intermediate",
    timeEstimate: "4 min",
    concept: "TCP State Machine (SYN -> SYN-ACK -> ACK)",
    objective: "Establish a reliable TCP connection between Client-1 and Web-Server.",
    scenario:
      "Client-1 is attempting to establish a TCP session to Web-Server (10.10.1.80). However, the firewall interface on Web-Server was disabled, rejecting the initial SYN packet.",
    initialDevices: [
      {
        id: "client-1",
        name: "Client-1",
        type: "pc",
        position: { x: 20, y: 50 },
        status: "online",
        roleDescription: "Browser Host (10.10.1.10)",
        interfaces: [
          {
            id: "c1-eth0",
            name: "eth0",
            mac: "00:C1:01",
            ip: "10.10.1.10",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-c1-sw",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Switch-1",
        type: "switch",
        position: { x: 50, y: 50 },
        status: "online",
        roleDescription: "Datacenter Top-of-Rack Switch",
        interfaces: [
          { id: "sw-p1", name: "p1", mac: "SW:01", enabled: true, linkId: "link-c1-sw" },
          { id: "sw-p2", name: "p2", mac: "SW:02", enabled: true, linkId: "link-ws-sw" },
        ],
      },
      {
        id: "web-srv",
        name: "Web-Server",
        type: "web-server",
        position: { x: 80, y: 50 },
        status: "misconfigured",
        roleDescription: "Nginx HTTP Server (10.10.1.80)",
        interfaces: [
          {
            id: "ws-eth0",
            name: "eth0",
            mac: "00:WS:80",
            ip: "10.10.1.80",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: false, // Intentional fault: Server port disabled
            linkId: "link-ws-sw",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-c1-sw",
        sourceDeviceId: "client-1",
        sourceInterfaceId: "c1-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p1",
        status: "up",
      },
      {
        id: "link-ws-sw",
        sourceDeviceId: "web-srv",
        sourceInterfaceId: "ws-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p2",
        status: "up",
      },
    ],
    allowedEditableDevices: ["web-srv"],
    allowedEditableFields: {
      "web-srv": ["enabled"],
    },
    testScenario: {
      sourceDeviceId: "client-1",
      targetDestination: "10.10.1.80",
      protocol: "TCP",
    },
    validationRules: {
      expectedTargetIp: "10.10.1.80",
      mustTraverseDeviceIds: ["client-1", "sw-1", "web-srv"],
    },
    hints: [
      "Select Web-Server in the topology.",
      "Notice that eth0 on Web-Server is administratively DOWN, preventing it from listening for TCP SYN packets.",
      "Enable the interface and initiate the TCP connection test.",
    ],
    technicalExplanation:
      "TCP provides reliable, in-order byte stream delivery. Before payload data can travel, both sides must synchronize initial sequence numbers (ISNs) through the SYN, SYN-ACK, and ACK exchange.",
    relatedNoteSlug: "tcp-handshake-lifecycle",
    relatedLabAnchor: "http",
  },

  // ----------------------------------------------------
  // Mission 9: HTTP Web Delivery
  // ----------------------------------------------------
  {
    id: "m9-http-delivery",
    number: 9,
    title: "Full Stack Delivery: DNS, TCP & HTTP 200",
    category: "protocols",
    difficulty: "Advanced",
    timeEstimate: "5 min",
    concept: "End-to-End Application Delivery (DNS -> TCP -> HTTP GET)",
    objective: "Configure Host-1 so it can resolve 'priyanshu.dev' and fetch the homepage via HTTP 200 OK.",
    scenario:
      "Host-1 needs to retrieve 'priyanshu.dev'. It has the wrong DNS server configured (10.0.0.99 instead of 10.0.0.53) and an incorrect default gateway.",
    initialDevices: [
      {
        id: "host-1",
        name: "Host-1",
        type: "pc",
        position: { x: 15, y: 50 },
        status: "misconfigured",
        roleDescription: "Web Client (10.0.0.10)",
        dnsServerIp: "10.0.0.99", // Wrong DNS IP
        interfaces: [
          {
            id: "h1-eth0",
            name: "eth0",
            mac: "00:H1:01",
            ip: "10.0.0.10",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "10.0.0.1",
            enabled: true,
            linkId: "link-h1-sw",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Switch-1",
        type: "switch",
        position: { x: 45, y: 50 },
        status: "online",
        roleDescription: "Core Distribution Switch",
        interfaces: [
          { id: "sw-p1", name: "p1", mac: "SW:01", enabled: true, linkId: "link-h1-sw" },
          { id: "sw-p2", name: "p2", mac: "SW:02", enabled: true, linkId: "link-dns-sw" },
          { id: "sw-p3", name: "p3", mac: "SW:03", enabled: true, linkId: "link-web-sw" },
        ],
      },
      {
        id: "dns-1",
        name: "DNS-Resolver",
        type: "dns-server",
        position: { x: 45, y: 15 },
        status: "online",
        roleDescription: "DNS Server (10.0.0.53)",
        dnsRecords: [
          { domain: "priyanshu.dev", ip: "10.0.0.80", type: "A" },
        ],
        interfaces: [
          {
            id: "dns-eth0",
            name: "eth0",
            mac: "00:DNS:53",
            ip: "10.0.0.53",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-dns-sw",
          },
        ],
      },
      {
        id: "web-srv",
        name: "Web-Cluster",
        type: "web-server",
        position: { x: 80, y: 50 },
        status: "online",
        roleDescription: "Production Web Server (10.0.0.80)",
        interfaces: [
          {
            id: "web-eth0",
            name: "eth0",
            mac: "00:WEB:80",
            ip: "10.0.0.80",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-web-sw",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-h1-sw",
        sourceDeviceId: "host-1",
        sourceInterfaceId: "h1-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p1",
        status: "up",
      },
      {
        id: "link-dns-sw",
        sourceDeviceId: "dns-1",
        sourceInterfaceId: "dns-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p2",
        status: "up",
      },
      {
        id: "link-web-sw",
        sourceDeviceId: "web-srv",
        sourceInterfaceId: "web-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p3",
        status: "up",
      },
    ],
    allowedEditableDevices: ["host-1"],
    allowedEditableFields: {
      "host-1": ["dnsServerIp"],
    },
    testScenario: {
      sourceDeviceId: "host-1",
      targetDestination: "priyanshu.dev",
      protocol: "HTTP",
    },
    validationRules: {
      expectedTargetIp: "10.0.0.80",
      mustTraverseDeviceIds: ["host-1", "sw-1", "dns-1", "web-srv"],
    },
    hints: [
      "The client wants to load 'priyanshu.dev', but it cannot resolve the domain.",
      "Check the DNS-Resolver device: its IP is 10.0.0.53.",
      "Update Host-1's DNS Server IP from 10.0.0.99 to 10.0.0.53.",
    ],
    technicalExplanation:
      "Real web traffic requires the synthesis of multiple layers: L7 DNS lookup via UDP 53, L4 TCP 3-way handshake over port 80/443, followed by L7 HTTP request and response framing.",
    relatedNoteSlug: "dns-resolution-path",
    relatedLabAnchor: "http",
  },

  // ----------------------------------------------------
  // Mission 10: Network Detective
  // ----------------------------------------------------
  {
    id: "m10-network-detective",
    number: 10,
    title: "Network Detective: Multi-Fault Incident Triage",
    category: "detective",
    difficulty: "Advanced",
    timeEstimate: "6 min",
    concept: "Full-Stack Incident Response & Multi-Layer Diagnostics",
    objective: "Triage and resolve multiple interacting faults so Client-1 can communicate with the Cloud Database.",
    scenario:
      "ALERT: Critical outages reported on branch connectivity. Client-1 (192.168.1.10/24) cannot reach Cloud-DB (10.0.50.100/24). A misconfigured IP, a broken router port, and an erroneous default gateway are all contributing to the outage.",
    initialDevices: [
      {
        id: "client-1",
        name: "Branch-PC",
        type: "pc",
        position: { x: 15, y: 50 },
        status: "misconfigured",
        roleDescription: "Branch Workstation",
        interfaces: [
          {
            id: "bpc-eth0",
            name: "eth0",
            mac: "00:AA:BB:10",
            ip: "192.168.1.10",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "192.168.1.254", // Wrong gateway: Router-1 is 192.168.1.1
            enabled: true,
            linkId: "link-bpc-sw",
          },
        ],
      },
      {
        id: "sw-1",
        name: "Branch-Switch",
        type: "switch",
        position: { x: 40, y: 50 },
        status: "online",
        roleDescription: "Access Switch",
        interfaces: [
          { id: "sw-p1", name: "fa0/1", mac: "SW:01", enabled: true, linkId: "link-bpc-sw" },
          { id: "sw-p2", name: "fa0/2", mac: "SW:02", enabled: true, linkId: "link-sw-r1" },
        ],
      },
      {
        id: "r-1",
        name: "Edge-Router",
        type: "router",
        position: { x: 65, y: 50 },
        status: "misconfigured",
        roleDescription: "Border Router",
        interfaces: [
          {
            id: "r1-gi0",
            name: "gi0/0 (LAN)",
            mac: "00:RR:01",
            ip: "192.168.1.1",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: true,
            linkId: "link-sw-r1",
          },
          {
            id: "r1-gi1",
            name: "gi0/1 (WAN)",
            mac: "00:RR:02",
            ip: "10.0.50.1",
            subnetMask: "255.255.255.0",
            prefix: 24,
            enabled: false, // Fault: WAN interface is down!
            linkId: "link-r1-db",
          },
        ],
      },
      {
        id: "cloud-db",
        name: "Cloud-DB",
        type: "web-server",
        position: { x: 88, y: 50 },
        status: "online",
        roleDescription: "Cloud RDS Replica (10.0.50.100)",
        interfaces: [
          {
            id: "cdb-eth0",
            name: "eth0",
            mac: "00:CC:50:10",
            ip: "10.0.50.100",
            subnetMask: "255.255.255.0",
            prefix: 24,
            gateway: "10.0.50.1",
            enabled: true,
            linkId: "link-r1-db",
          },
        ],
      },
    ],
    initialLinks: [
      {
        id: "link-bpc-sw",
        sourceDeviceId: "client-1",
        sourceInterfaceId: "bpc-eth0",
        targetDeviceId: "sw-1",
        targetInterfaceId: "sw-p1",
        status: "up",
      },
      {
        id: "link-sw-r1",
        sourceDeviceId: "sw-1",
        sourceInterfaceId: "sw-p2",
        targetDeviceId: "r-1",
        targetInterfaceId: "r1-gi0",
        status: "up",
      },
      {
        id: "link-r1-db",
        sourceDeviceId: "r-1",
        sourceInterfaceId: "r1-gi1",
        targetDeviceId: "cloud-db",
        targetInterfaceId: "cdb-eth0",
        status: "up",
      },
    ],
    allowedEditableDevices: ["client-1", "r-1"],
    allowedEditableFields: {
      "client-1": ["gateway"],
      "r-1": ["enabled"],
    },
    testScenario: {
      sourceDeviceId: "client-1",
      targetDestination: "10.0.50.100",
      protocol: "ICMP",
    },
    validationRules: {
      expectedTargetIp: "10.0.50.100",
      mustTraverseDeviceIds: ["client-1", "sw-1", "r-1", "cloud-db"],
    },
    hints: [
      "Check Branch-PC's Default Gateway: it is set to 192.168.1.254, but Edge-Router's LAN IP is 192.168.1.1.",
      "Check Edge-Router's interfaces: interface gi0/1 (WAN) is disabled (Administrative DOWN).",
      "Correct the gateway on Branch-PC to 192.168.1.1, and enable gi0/1 on Edge-Router.",
    ],
    technicalExplanation:
      "Enterprise outages frequently stem from multi-point failures. Isolating faults systematically from Layer 1 physical link up to Layer 3 default gateway resolution allows engineers to restore connectivity methodically.",
    relatedNoteSlug: "containers-vs-vms",
    relatedLabAnchor: "cloud",
  },
];
