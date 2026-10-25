/**
 * Network Quest — Automated Engine & Simulation Unit Tests
 * Verifies IPv4/CIDR math, L2 switching, L3 routing, DNS resolution,
 * TCP handshakes, mission validation, and deterministic daily challenge generation.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  parseIpv4,
  isValidIpv4,
  ipToNumber,
  numberToIp,
  prefixToMaskString,
  maskStringToPrefix,
  getNetworkAddress,
  isSameSubnet,
  simulateTransmission,
} from "./engine.ts";
import { missions } from "./missions.ts";
import { generateDailyChallenge } from "./daily.ts";
import { defaultGameState } from "./storage.ts";

test("IP & Subnet Math Helpers", () => {
  // Parsing & validation
  assert.deepEqual(parseIpv4("192.168.1.1"), [192, 168, 1, 1]);
  assert.equal(parseIpv4("256.1.1.1"), null);
  assert.equal(parseIpv4("abc.1.1.1"), null);
  assert.equal(isValidIpv4("10.0.0.1"), true);
  assert.equal(isValidIpv4("10.0.0"), false);

  // Conversion
  assert.equal(numberToIp(ipToNumber("192.168.1.1")!), "192.168.1.1");
  assert.equal(prefixToMaskString(24), "255.255.255.0");
  assert.equal(prefixToMaskString(16), "255.255.0.0");
  assert.equal(prefixToMaskString(28), "255.255.255.240");
  assert.equal(maskStringToPrefix("255.255.255.0"), 24);
  assert.equal(maskStringToPrefix("255.255.255.240"), 28);

  // Subnet checks
  assert.equal(getNetworkAddress("192.168.1.135", 24), "192.168.1.0");
  assert.equal(getNetworkAddress("192.168.1.135", 28), "192.168.1.128");
  assert.equal(isSameSubnet("192.168.1.10", "192.168.1.20", 24), true);
  assert.equal(isSameSubnet("192.168.1.10", "192.168.2.10", 24), false);
  assert.equal(isSameSubnet("192.168.1.10", "192.168.1.130", 28), false);
  assert.equal(isSameSubnet("192.168.1.10", "192.168.1.130", 24), true);
});

test("Mission 1 (First Wire) - Physical Interface State", () => {
  const m1 = missions.find((m) => m.id === "m1-first-wire")!;
  assert.ok(m1);

  // Initial state should fail because eth0 on PC-A is disabled
  const initialRes = simulateTransmission({
    devices: m1.initialDevices,
    links: m1.initialLinks,
    sourceDeviceId: m1.testScenario.sourceDeviceId,
    targetDestination: m1.testScenario.targetDestination,
    protocol: m1.testScenario.protocol,
  });
  assert.equal(initialRes.success, false);
  assert.ok(initialRes.failureReason?.includes("disabled") || initialRes.failureReason?.includes("down"));

  // Fix: Enable eth0
  const fixedDevices = JSON.parse(JSON.stringify(m1.initialDevices));
  fixedDevices[0].interfaces[0].enabled = true;
  fixedDevices[0].status = "online";

  const fixedRes = simulateTransmission({
    devices: fixedDevices,
    links: m1.initialLinks,
    sourceDeviceId: m1.testScenario.sourceDeviceId,
    targetDestination: m1.testScenario.targetDestination,
    protocol: m1.testScenario.protocol,
  });
  assert.equal(fixedRes.success, true);
  assert.deepEqual(fixedRes.path, ["pc-a", "sw-1", "pc-b"]);
  assert.equal(fixedRes.events[fixedRes.events.length - 1].status, "delivered");
});

test("Mission 2 (IP Alignment) - Subnet Matching", () => {
  const m2 = missions.find((m) => m.id === "m2-ip-alignment")!;
  assert.ok(m2);

  // Initial state: PC-A has 192.168.2.10, Server is 192.168.1.50/24 (mismatched subnet)
  const initialRes = simulateTransmission({
    devices: m2.initialDevices,
    links: m2.initialLinks,
    sourceDeviceId: m2.testScenario.sourceDeviceId,
    targetDestination: m2.testScenario.targetDestination,
    protocol: m2.testScenario.protocol,
  });
  assert.equal(initialRes.success, false);
  assert.ok(initialRes.failureReason?.includes("Gateway") || initialRes.summary.includes("Gateway"));

  // Fix: Set PC-A IP to 192.168.1.10
  const fixedDevices = JSON.parse(JSON.stringify(m2.initialDevices));
  fixedDevices[0].interfaces[0].ip = "192.168.1.10";

  const fixedRes = simulateTransmission({
    devices: fixedDevices,
    links: m2.initialLinks,
    sourceDeviceId: m2.testScenario.sourceDeviceId,
    targetDestination: m2.testScenario.targetDestination,
    protocol: m2.testScenario.protocol,
  });
  assert.equal(fixedRes.success, true);
  assert.deepEqual(fixedRes.path, ["pc-a", "sw-1", "srv-1"]);
});

test("Mission 3 (Gateway Key) - Default Gateway Resolution", () => {
  const m3 = missions.find((m) => m.id === "m3-gateway-key")!;
  assert.ok(m3);

  // Initial state: PC-1 has gateway 192.168.1.1, which is not on PC-1's subnet 10.0.0.0/24
  const initialRes = simulateTransmission({
    devices: m3.initialDevices,
    links: m3.initialLinks,
    sourceDeviceId: m3.testScenario.sourceDeviceId,
    targetDestination: m3.testScenario.targetDestination,
    protocol: m3.testScenario.protocol,
  });
  assert.equal(initialRes.success, false);
  assert.ok(initialRes.failureReason?.includes("subnet") || initialRes.summary.includes("Gateway"));

  // Fix: Set gateway to 10.0.0.1 (Router-1 LAN IP)
  const fixedDevices = JSON.parse(JSON.stringify(m3.initialDevices));
  fixedDevices[0].interfaces[0].gateway = "10.0.0.1";

  const fixedRes = simulateTransmission({
    devices: fixedDevices,
    links: m3.initialLinks,
    sourceDeviceId: m3.testScenario.sourceDeviceId,
    targetDestination: m3.testScenario.targetDestination,
    protocol: m3.testScenario.protocol,
  });
  assert.equal(fixedRes.success, true);
  assert.deepEqual(fixedRes.path, ["pc-1", "r-1", "ext-srv"]);
});

test("Mission 7 (The Silent Server) - DNS Name Resolution", () => {
  const m7 = missions.find((m) => m.id === "m7-silent-server")!;
  assert.ok(m7);

  // Initial: PC-1 lacks DNS server
  const initialRes = simulateTransmission({
    devices: m7.initialDevices,
    links: m7.initialLinks,
    sourceDeviceId: m7.testScenario.sourceDeviceId,
    targetDestination: m7.testScenario.targetDestination,
    protocol: m7.testScenario.protocol,
  });
  assert.equal(initialRes.success, false);
  assert.ok(initialRes.failureReason?.includes("DNS"));

  // Fix: Set DNS server to 192.168.1.53
  const fixedDevices = JSON.parse(JSON.stringify(m7.initialDevices));
  fixedDevices[0].dnsServerIp = "192.168.1.53";

  const fixedRes = simulateTransmission({
    devices: fixedDevices,
    links: m7.initialLinks,
    sourceDeviceId: m7.testScenario.sourceDeviceId,
    targetDestination: m7.testScenario.targetDestination,
    protocol: m7.testScenario.protocol,
  });
  assert.equal(fixedRes.success, true);
  assert.ok(fixedRes.events.some((e) => e.protocol === "DNS_REP"));
});

test("Mission 8 (Transport) - TCP 3-Way Handshake Simulation", () => {
  const m8 = missions.find((m) => m.id === "m8-tcp-handshake")!;
  assert.ok(m8);

  const fixedDevices = JSON.parse(JSON.stringify(m8.initialDevices));
  fixedDevices[2].interfaces[0].enabled = true; // Web server port enabled

  const res = simulateTransmission({
    devices: fixedDevices,
    links: m8.initialLinks,
    sourceDeviceId: m8.testScenario.sourceDeviceId,
    targetDestination: m8.testScenario.targetDestination,
    protocol: "TCP",
  });
  assert.equal(res.success, true);
  const protocols = res.events.map((e) => e.protocol);
  assert.ok(protocols.includes("TCP_SYN"));
  assert.ok(protocols.includes("TCP_SYN_ACK"));
  assert.ok(protocols.includes("TCP_ACK"));
});

test("Mission 9 (Application) - Full HTTP 200 Flow", () => {
  const m9 = missions.find((m) => m.id === "m9-http-delivery")!;
  assert.ok(m9);

  const fixedDevices = JSON.parse(JSON.stringify(m9.initialDevices));
  fixedDevices[0].dnsServerIp = "10.0.0.53";

  const res = simulateTransmission({
    devices: fixedDevices,
    links: m9.initialLinks,
    sourceDeviceId: m9.testScenario.sourceDeviceId,
    targetDestination: m9.testScenario.targetDestination,
    protocol: "HTTP",
  });
  assert.equal(res.success, true);
  const protocols = res.events.map((e) => e.protocol);
  assert.ok(protocols.includes("DNS_REQ"));
  assert.ok(protocols.includes("DNS_REP"));
  assert.ok(protocols.includes("TCP_SYN"));
  assert.ok(protocols.includes("HTTP_GET"));
  assert.ok(protocols.includes("HTTP_200"));
});

test("Daily Challenge - Determinism", () => {
  const c1 = generateDailyChallenge("2026-10-25");
  const c2 = generateDailyChallenge("2026-10-25");
  assert.equal(c1.id, c2.id);
  assert.equal(c1.title, c2.title);
  assert.equal(c1.initialDevices.length, c2.initialDevices.length);
});

test("Storage Defaults Validation", () => {
  assert.equal(defaultGameState.version, 1);
  assert.equal(defaultGameState.currentMissionId, "m1-first-wire");
  assert.equal(defaultGameState.gameMode, "campaign");
});
