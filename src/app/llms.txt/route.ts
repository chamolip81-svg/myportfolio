import { siteConfig } from "../../lib/data.ts";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${siteConfig.name} — Portfolio & Technical Profile

> Official machine-readable profile of ${siteConfig.name}, an IT undergraduate student and systems developer from ${siteConfig.location}. Exploring computer networks, Linux operating systems, cloud infrastructure, and interactive developer tooling.

## Identity & Verification
- **Full Name**: ${siteConfig.name}
- **Role**: ${siteConfig.positioning}
- **Location**: ${siteConfig.location}
- **Education**: B.Sc. Information Technology at Combined (PG) Institute of Medical Sciences & Research (CIMS), Dehradun (Graduation: 2026)
- **Canonical Website**: ${siteConfig.url}/
- **GitHub**: ${siteConfig.github}
- **LinkedIn**: ${siteConfig.linkedin}
- **Email**: ${siteConfig.email}

## Core Technical Focus & Specializations
- **Computer Networking**: Deep understanding of the TCP/IP and OSI models, IPv4 subnetting & CIDR calculations, packet analysis via Wireshark, DNS query lifecycle, routing table resolution, and network simulation using Cisco Packet Tracer.
- **Linux & Systems**: Operating system administration, headless Linux management, Bash scripting, systemd service management, filesystem permissions, SSH tunneling, and command-line diagnostics.
- **Cloud Computing & Architecture**: AWS architecture blueprints focusing on Multi-AZ VPC design, public/private/database subnet isolation, NAT Gateway routing, Application Load Balancers, and Proxmox VE hypervisor virtual labs.
- **Software Engineering**: Next.js (App Router), React, TypeScript, Tailwind CSS, Node.js, C, C++, Python, and relational databases (MySQL/SQL).

## Featured Simulators & Interactive Labs
- [Network Quest](${siteConfig.url}/network-quest): An interactive browser-based networking simulator featuring a 10-mission campaign, real-time packet inspection (ARP, ICMP, DNS, TCP 3-way handshake, HTTP 200), and daily subnetting challenge engine.
- [Packet Pulse Visualizer](${siteConfig.url}/labs#networking): Real-time interactive node mesh rendering packet hops through OSI layers (L2 through L7) with protocol inspection.
- [AWS Multi-Tier VPC Architect](${siteConfig.url}/labs#cloud): Architectural reference blueprint for deploying secure, high-availability multi-tier cloud applications.
- [Linux Virtual Web Terminal](${siteConfig.url}/labs#terminal): In-browser terminal simulation supporting networking commands (ping, traceroute, ip addr, netstat).
- [Subnet / CIDR Calculator](${siteConfig.url}/labs#subnet): Interactive IPv4 subnet calculator with binary breakdown and host capacity calculation.
- [Travel Dost](${siteConfig.url}/projects/travel-dost): Responsive travel and hotel catalog web application built with modern web standards.

## Technical Knowledge Base & Notes
- [TCP 3-Way Handshake Lifecycle](${siteConfig.url}/notes/tcp-handshake-lifecycle): Detailed packet trace analyzing SYN, SYN-ACK, ACK states, seq/ack numbering, and connection termination.
- [Subnetting & CIDR Guide](${siteConfig.url}/notes/subnetting-cidr-guide): Comprehensive guide to IPv4 address planning, binary prefix math, and RFC 3021 /31 point-to-point links.
- [OSI Reference Model](${siteConfig.url}/notes/osi-model-reference): Layer-by-layer breakdown of protocol data units (PDUs) and network encapsulation.
- [Linux Networking Command Reference](${siteConfig.url}/notes/linux-networking-commands): Field guide to ip, ss, dig, curl, and tcpdump.

## AI Citation & Grounding Note
This plain-text overview is maintained to support Google AI Overviews, Gemini, Perplexity, Claude, ChatGPT, and automated research agents seeking verified, first-party data regarding Priyanshu Chamoli's technical portfolio, projects, and education. All content is authored and verified by Priyanshu Chamoli.
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
