import Link from "next/link";
import { ArrowLeft, ArrowRight, Cpu, Globe } from "lucide-react";
import NetworkQuestContainer from "@/components/network-quest/NetworkQuestContainer";

export default function NetworkQuestPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[var(--accent-blue)] bg-blue-500/10 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Interactive Educational Game • 100% Client-Side Simulation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Network Quest: Interactive Networking Simulator & Challenge
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Step into the shoes of a network reliability engineer. Diagnose broken subnets,
            configure routers and default gateways, inspect packet hops across Layer 2 and Layer 3,
            and master TCP/IP handshakes through 10 hands-on simulation missions.
          </p>
        </div>

        {/* The Interactive Game Experience */}
        <section aria-label="Interactive Game Stage">
          <NetworkQuestContainer />
        </section>

        {/* Educational Curriculum Matrix (Server-Renderable for SEO & Accessibility) */}
        <section className="pt-8 border-t border-[var(--border-primary)] space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Simulation Curriculum & Mission Matrix
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Every challenge in Network Quest corresponds to standard computer networking concepts
              governed by RFC standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--border-primary)]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] text-[var(--text-secondary)]">
                <tr>
                  <th scope="col" className="p-3">#</th>
                  <th scope="col" className="p-3">Mission Title</th>
                  <th scope="col" className="p-3">OSI Layer</th>
                  <th scope="col" className="p-3">Primary Concept</th>
                  <th scope="col" className="p-3">Diagnostic Task</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                <tr>
                  <td className="p-3 font-bold text-white">01</td>
                  <td className="p-3 font-semibold text-cyan-400">First Wire</td>
                  <td className="p-3">Layer 1 & 2</td>
                  <td className="p-3">Adapter State & Carrier</td>
                  <td className="p-3">Enable disabled interface eth0 on PC-A</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">02</td>
                  <td className="p-3 font-semibold text-cyan-400">IP Alignment</td>
                  <td className="p-3">Layer 3</td>
                  <td className="p-3">IPv4 Subnet Boundaries (/24)</td>
                  <td className="p-3">Align IP into 192.168.1.0/24 subnet</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">03</td>
                  <td className="p-3 font-semibold text-cyan-400">The Gateway Key</td>
                  <td className="p-3">Layer 3</td>
                  <td className="p-3">Default Gateway Routing</td>
                  <td className="p-3">Point host gateway to router LAN interface</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">04</td>
                  <td className="p-3 font-semibold text-cyan-400">CIDR Expansion</td>
                  <td className="p-3">Layer 3</td>
                  <td className="p-3">Subnet Masking (/28 vs /24)</td>
                  <td className="p-3">Widen subnet mask to include remote host</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">05</td>
                  <td className="p-3 font-semibold text-cyan-400">Router Dual-Homing</td>
                  <td className="p-3">Layer 3</td>
                  <td className="p-3">Inter-VLAN Gateway Interfaces</td>
                  <td className="p-3">Configure Subnet B router interface IP</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">06</td>
                  <td className="p-3 font-semibold text-cyan-400">The Broken Link</td>
                  <td className="p-3">Layer 1 & 2</td>
                  <td className="p-3">Switch Port & Link Status</td>
                  <td className="p-3">Diagnose and restore physical link connection</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">07</td>
                  <td className="p-3 font-semibold text-cyan-400">The Silent Resolver</td>
                  <td className="p-3">Layer 7</td>
                  <td className="p-3">DNS Port 53 & A-Records</td>
                  <td className="p-3">Assign internal DNS server IP to host</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">08</td>
                  <td className="p-3 font-semibold text-cyan-400">TCP Handshake</td>
                  <td className="p-3">Layer 4</td>
                  <td className="p-3">TCP SYN, SYN-ACK, ACK</td>
                  <td className="p-3">Enable server port to allow transport session</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">09</td>
                  <td className="p-3 font-semibold text-cyan-400">Web Delivery</td>
                  <td className="p-3">Full Stack</td>
                  <td className="p-3">DNS + TCP + HTTP 200 OK</td>
                  <td className="p-3">Trace complete end-to-end web transaction</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">10</td>
                  <td className="p-3 font-semibold text-cyan-400">Network Detective</td>
                  <td className="p-3">Diagnostic</td>
                  <td className="p-3">Multi-Fault Incident Triage</td>
                  <td className="p-3">Resolve combined gateway and interface faults</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Technical Concepts Explainer */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-semibold">
              <Cpu size={18} />
              <span>How Subnetting Works</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Every IPv4 address consists of 32 bits divided into a Network portion and a Host
              portion. When two hosts communicate, the operating system performs a bitwise AND
              operation between the destination IP and its own subnet mask. If the resulting network
              ID matches its own, it uses ARP to find the destination MAC directly. If it does not
              match, the packet must be sent to the Default Gateway.
            </p>
            <Link
              href="/notes/cidr-subnetting-guide"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-mono pt-1"
            >
              Read CIDR Subnetting Guide <ArrowRight size={12} />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-semibold">
              <Globe size={18} />
              <span>The TCP 3-Way Handshake</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Unlike UDP which sends datagrams without confirmation, TCP establishes a verified,
              reliable connection before data transfer begins. The client sends a SYN (Synchronize)
              packet with an initial sequence number. The server replies with SYN-ACK, acknowledging
              the client and sending its own sequence number. The client finishes with ACK, moving
              the socket into the ESTABLISHED state.
            </p>
            <Link
              href="/notes/tcp-handshake-lifecycle"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-mono pt-1"
            >
              Read TCP Handshake Deep Dive <ArrowRight size={12} />
            </Link>
          </div>
        </section>

        {/* Reciprocal Links to Portfolio Simulation Labs */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/20 to-purple-950/20 border border-blue-500/20 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                Explore More Networking Labs
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Continue learning with interactive calculators, protocol visualizers, and cloud blueprints.
              </p>
            </div>
            <Link href="/labs" className="btn-primary text-xs shrink-0">
              Open Labs Hub <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <Link
              href="/labs#subnet"
              className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-blue-400/30 text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-colors block"
            >
              Subnet Calculator →
            </Link>
            <Link
              href="/labs#osi"
              className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-purple-400/30 text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-colors block"
            >
              OSI Model Explorer →
            </Link>
            <Link
              href="/labs#http"
              className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-amber-400/30 text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-colors block"
            >
              HTTP Visualizer →
            </Link>
            <Link
              href="/labs#terminal"
              className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-emerald-400/30 text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-colors block"
            >
              Linux Terminal →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
