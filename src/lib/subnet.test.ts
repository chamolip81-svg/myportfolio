import test from "node:test";
import assert from "node:assert/strict";
import { calculateSubnet, numToIp, numToBinary } from "./subnet.ts";

test("calculateSubnet - standard /24 subnet", () => {
  const { data, error } = calculateSubnet("192.168.1.50/24");
  assert.equal(error, null);
  assert.ok(data);
  assert.equal(data.network, "192.168.1.0");
  assert.equal(data.subnetMask, "255.255.255.0");
  assert.equal(data.firstHost, "192.168.1.1");
  assert.equal(data.lastHost, "192.168.1.254");
  assert.equal(data.broadcast, "192.168.1.255");
  assert.equal(data.usableHosts, 254);
  assert.equal(data.ipClass, "Class C");
  assert.equal(data.ipType, "Private (RFC 1918)");
});

test("calculateSubnet - standard /16 Class A private", () => {
  const { data, error } = calculateSubnet("10.5.20.1/16");
  assert.equal(error, null);
  assert.ok(data);
  assert.equal(data.network, "10.5.0.0");
  assert.equal(data.subnetMask, "255.255.0.0");
  assert.equal(data.firstHost, "10.5.0.1");
  assert.equal(data.lastHost, "10.5.255.254");
  assert.equal(data.broadcast, "10.5.255.255");
  assert.equal(data.usableHosts, 65534);
  assert.equal(data.ipClass, "Class A");
  assert.equal(data.ipType, "Private (RFC 1918)");
});

test("calculateSubnet - RFC 3021 /31 point-to-point link", () => {
  const { data, error } = calculateSubnet("10.0.0.0/31");
  assert.equal(error, null);
  assert.ok(data);
  assert.equal(data.network, "10.0.0.0");
  assert.equal(data.subnetMask, "255.255.255.254");
  assert.equal(data.firstHost, "10.0.0.0");
  assert.equal(data.lastHost, "10.0.0.1");
  assert.equal(data.usableHosts, 2);
});

test("calculateSubnet - /32 single host route", () => {
  const { data, error } = calculateSubnet("8.8.8.8/32");
  assert.equal(error, null);
  assert.ok(data);
  assert.equal(data.network, "8.8.8.8");
  assert.equal(data.subnetMask, "255.255.255.255");
  assert.equal(data.firstHost, "8.8.8.8");
  assert.equal(data.lastHost, "8.8.8.8");
  assert.equal(data.usableHosts, 1);
  assert.equal(data.ipType, "Public");
});

test("calculateSubnet - /0 default route", () => {
  const { data, error } = calculateSubnet("0.0.0.0/0");
  assert.equal(error, null);
  assert.ok(data);
  assert.equal(data.network, "0.0.0.0");
  assert.equal(data.subnetMask, "0.0.0.0");
  assert.equal(data.usableHosts, 4294967294);
});

test("calculateSubnet - handles invalid inputs gracefully", () => {
  // Octet > 255
  assert.ok(calculateSubnet("256.0.0.1/24").error);
  // Negative octet
  assert.ok(calculateSubnet("-1.0.0.1/24").error);
  // Prefix > 32
  assert.ok(calculateSubnet("192.168.1.1/33").error);
  // Missing prefix
  assert.ok(calculateSubnet("192.168.1.1").error);
  // Malformed characters
  assert.ok(calculateSubnet("192.168.1.a/24").error);
  // Empty input
  const empty = calculateSubnet("");
  assert.equal(empty.data, null);
  assert.equal(empty.error, null);
});

test("numToIp and numToBinary conversion helpers", () => {
  assert.equal(numToIp(0), "0.0.0.0");
  assert.equal(numToIp(0xffffffff), "255.255.255.255");
  assert.equal(numToBinary(0xffffff00), "11111111.11111111.11111111.00000000");
});
