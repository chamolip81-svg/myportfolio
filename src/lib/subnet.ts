/**
 * IPv4 Subnet and CIDR Calculation Utilities
 * Handles all prefix ranges (/0 to /32) including RFC 3021 point-to-point (/31).
 */

export interface SubnetResult {
  network: string;
  subnetMask: string;
  wildcardMask: string;
  firstHost: string;
  lastHost: string;
  broadcast: string;
  usableHosts: number;
  usableHostsFormatted: string;
  totalHosts: number;
  prefix: number;
  binaryMask: string;
  ipClass: string;
  ipType: "Private (RFC 1918)" | "Public" | "Loopback" | "Link-Local" | "Multicast" | "Reserved";
}

export interface SubnetCalculation {
  data: SubnetResult | null;
  error: string | null;
}

export function numToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

export function numToBinary(num: number): string {
  const pad = (n: number) => n.toString(2).padStart(8, "0");
  return [
    pad((num >>> 24) & 255),
    pad((num >>> 16) & 255),
    pad((num >>> 8) & 255),
    pad(num & 255),
  ].join(".");
}

function getIpClass(firstOctet: number): string {
  if (firstOctet >= 1 && firstOctet <= 126) return "Class A";
  if (firstOctet === 127) return "Class A (Loopback)";
  if (firstOctet >= 128 && firstOctet <= 191) return "Class B";
  if (firstOctet >= 192 && firstOctet <= 223) return "Class C";
  if (firstOctet >= 224 && firstOctet <= 239) return "Class D (Multicast)";
  return "Class E (Experimental)";
}

function getIpType(octets: number[]): SubnetResult["ipType"] {
  const [o1, o2] = octets;
  if (o1 === 10) return "Private (RFC 1918)";
  if (o1 === 172 && o2 >= 16 && o2 <= 31) return "Private (RFC 1918)";
  if (o1 === 192 && o2 === 168) return "Private (RFC 1918)";
  if (o1 === 127) return "Loopback";
  if (o1 === 169 && o2 === 254) return "Link-Local";
  if (o1 >= 224 && o1 <= 239) return "Multicast";
  if (o1 >= 240) return "Reserved";
  return "Public";
}

export function calculateSubnet(input: string): SubnetCalculation {
  const trimmed = input.trim();
  if (!trimmed) {
    return { data: null, error: null };
  }

  const parts = trimmed.split("/");
  if (parts.length !== 2) {
    return {
      data: null,
      error: "Enter CIDR format: IP/prefix (e.g. 192.168.1.0/24)",
    };
  }

  const [ipStr, prefixStr] = parts;
  const octetStrs = ipStr.split(".");
  if (octetStrs.length !== 4) {
    return {
      data: null,
      error: "IPv4 address must contain 4 octets separated by dots",
    };
  }

  const octets: number[] = [];
  for (const s of octetStrs) {
    if (!/^\d+$/.test(s)) {
      return {
        data: null,
        error: `Invalid octet '${s}': octets must contain digits only`,
      };
    }
    const val = Number(s);
    if (val < 0 || val > 255) {
      return {
        data: null,
        error: `Octet value ${val} out of range (must be 0-255)`,
      };
    }
    octets.push(val);
  }

  if (!/^\d+$/.test(prefixStr)) {
    return {
      data: null,
      error: "Prefix length must be a whole number between 0 and 32",
    };
  }

  const prefix = Number(prefixStr);
  if (prefix < 0 || prefix > 32) {
    return {
      data: null,
      error: `CIDR prefix /${prefix} out of range (must be 0-32)`,
    };
  }

  // Calculate unsigned 32-bit representation without signed-shift overflow
  const ipNum =
    (octets[0] * 16777216 + octets[1] * 65536 + octets[2] * 256 + octets[3]) >>> 0;

  const maskNum =
    prefix === 0 ? 0 : ((0xffffffff << (32 - prefix)) >>> 0);
  const wildcardNum = (~maskNum) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | wildcardNum) >>> 0;

  let firstHostNum: number;
  let lastHostNum: number;
  let usableHosts: number;

  if (prefix === 32) {
    firstHostNum = networkNum;
    lastHostNum = networkNum;
    usableHosts = 1;
  } else if (prefix === 31) {
    // RFC 3021 Point-to-Point Links: 2 usable hosts, no broadcast
    firstHostNum = networkNum;
    lastHostNum = broadcastNum;
    usableHosts = 2;
  } else if (prefix === 0) {
    firstHostNum = (networkNum + 1) >>> 0;
    lastHostNum = (broadcastNum - 1) >>> 0;
    usableHosts = 4294967294;
  } else {
    firstHostNum = (networkNum + 1) >>> 0;
    lastHostNum = (broadcastNum - 1) >>> 0;
    usableHosts = Math.pow(2, 32 - prefix) - 2;
  }

  const totalHosts = prefix === 0 ? 4294967296 : Math.pow(2, 32 - prefix);

  return {
    data: {
      network: numToIp(networkNum),
      subnetMask: numToIp(maskNum),
      wildcardMask: numToIp(wildcardNum),
      firstHost: numToIp(firstHostNum),
      lastHost: numToIp(lastHostNum),
      broadcast: numToIp(broadcastNum),
      usableHosts,
      usableHostsFormatted: usableHosts.toLocaleString(),
      totalHosts,
      prefix,
      binaryMask: numToBinary(maskNum),
      ipClass: getIpClass(octets[0]),
      ipType: getIpType(octets),
    },
    error: null,
  };
}
