"use client";

import { useState } from "react";
import { X, Cpu, Network, CheckCircle2, AlertTriangle, Power } from "lucide-react";
import type { NetworkDevice, NetworkInterface } from "@/lib/network-quest/types";
import { isValidIpv4, maskStringToPrefix } from "@/lib/network-quest/engine";

interface DeviceInspectorProps {
  device: NetworkDevice | null;
  allowedFields: Array<"ip" | "subnetMask" | "prefix" | "gateway" | "enabled" | "dnsServerIp">;
  onUpdateDevice: (updated: NetworkDevice) => void;
  onClose: () => void;
}

export default function DeviceInspector(props: DeviceInspectorProps) {
  if (!props.device) return null;
  return <DeviceInspectorForm key={props.device.id} {...props} device={props.device} />;
}

function DeviceInspectorForm({
  device,
  allowedFields,
  onUpdateDevice,
  onClose,
}: {
  device: NetworkDevice;
  allowedFields: Array<"ip" | "subnetMask" | "prefix" | "gateway" | "enabled" | "dnsServerIp">;
  onUpdateDevice: (updated: NetworkDevice) => void;
  onClose: () => void;
}) {
  const primaryIface = device.interfaces[0] || ({} as NetworkInterface);

  // Local form state (reset on key change)
  const [ipVal, setIpVal] = useState(primaryIface.ip || "");
  const [maskVal, setMaskVal] = useState(primaryIface.subnetMask || "255.255.255.0");
  const [gatewayVal, setGatewayVal] = useState(primaryIface.gateway || "");
  const [dnsVal, setDnsVal] = useState(device.dnsServerIp || "");
  const [enabledVal, setEnabledVal] = useState(primaryIface.enabled ?? true);

  const canEdit = (field: "ip" | "subnetMask" | "prefix" | "gateway" | "enabled" | "dnsServerIp") =>
    allowedFields.includes(field);

  // Apply changes to parent
  const handleApply = (newValues: {
    ip?: string;
    mask?: string;
    gateway?: string;
    dns?: string;
    enabled?: boolean;
  }) => {
    const newInterfaces = device.interfaces.map((iface, idx) => {
      if (idx !== 0) return iface;

      const updatedIface: NetworkInterface = {
        ...iface,
        ip: newValues.ip !== undefined ? newValues.ip : ipVal,
        subnetMask: newValues.mask !== undefined ? newValues.mask : maskVal,
        prefix:
          newValues.mask !== undefined
            ? maskStringToPrefix(newValues.mask) ?? iface.prefix
            : maskStringToPrefix(maskVal) ?? iface.prefix,
        gateway: newValues.gateway !== undefined ? newValues.gateway : gatewayVal,
        enabled: newValues.enabled !== undefined ? newValues.enabled : enabledVal,
      };
      return updatedIface;
    });

    const updatedDevice: NetworkDevice = {
      ...device,
      interfaces: newInterfaces,
      dnsServerIp: newValues.dns !== undefined ? newValues.dns : dnsVal,
      status: (newValues.enabled ?? enabledVal) ? "online" : "offline",
    };

    onUpdateDevice(updatedDevice);
  };

  const isIpValid = isValidIpv4(ipVal);
  const isGatewayValid = !gatewayVal || isValidIpv4(gatewayVal);
  const isDnsValid = !dnsVal || isValidIpv4(dnsVal);

  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]/95 backdrop-blur-md p-5 shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--accent-blue)]">
            {device.type === "router" ? <Network size={18} /> : <Cpu size={18} />}
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] font-mono flex items-center gap-2">
              {device.name}
              <span className="text-[10px] uppercase font-normal px-2 py-0.5 rounded bg-white/5 text-[var(--text-secondary)] border border-white/10">
                {device.type}
              </span>
            </h3>
            <p className="text-xs text-[var(--text-tertiary)]">{device.roleDescription || "Network Node"}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-secondary)] hover:text-white transition-colors"
          aria-label="Close Device Inspector"
        >
          <X size={16} />
        </button>
      </div>

      {/* Interface Toggle Bar */}
      <div className="mt-4 p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[var(--text-secondary)]">Interface {primaryIface.name || "eth0"}:</span>
          <span
            className={`font-semibold inline-flex items-center gap-1 ${
              enabledVal ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {enabledVal ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
            {enabledVal ? "UP (Connected)" : "DOWN (Disabled)"}
          </span>
        </div>

        {canEdit("enabled") ? (
          <button
            type="button"
            id="toggle-interface-btn"
            onClick={() => {
              const nextVal = !enabledVal;
              setEnabledVal(nextVal);
              handleApply({ enabled: nextVal });
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              enabledVal
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
            }`}
          >
            <Power size={13} />
            {enabledVal ? "Disable Interface" : "Enable Interface"}
          </button>
        ) : (
          <span className="text-[11px] font-mono text-[var(--text-muted)]">Fixed</span>
        )}
      </div>

      {/* Configuration Fields */}
      <div className="mt-4 space-y-3.5 text-xs font-mono">
        {/* IPv4 Address */}
        <div>
          <label className="block text-[11px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">
            IPv4 Address
          </label>
          {canEdit("ip") ? (
            <div>
              <input
                type="text"
                value={ipVal}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setIpVal(val);
                  if (isValidIpv4(val)) {
                    handleApply({ ip: val });
                  }
                }}
                placeholder="e.g. 192.168.1.10"
                className={`w-full px-3 py-2 rounded-lg bg-black/40 border text-sm text-[var(--text-primary)] font-mono transition-colors focus:outline-none ${
                  isIpValid
                    ? "border-[var(--border-primary)] focus:border-blue-500"
                    : "border-rose-500/50 focus:border-rose-500"
                }`}
              />
              {!isIpValid && ipVal && (
                <span className="text-[11px] text-rose-400 mt-1 block">
                  Must be 4 octets (0-255) separated by dots.
                </span>
              )}
            </div>
          ) : (
            <div className="px-3 py-2 rounded-lg bg-black/20 border border-white/5 text-[var(--text-secondary)]">
              {primaryIface.ip || "Unassigned"}
            </div>
          )}
        </div>

        {/* Subnet Mask */}
        <div>
          <label className="block text-[11px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">
            Subnet Mask / Prefix
          </label>
          {canEdit("subnetMask") ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={maskVal}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setMaskVal(val);
                  if (maskStringToPrefix(val) !== null) {
                    handleApply({ mask: val });
                  }
                }}
                placeholder="255.255.255.0"
                className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-[var(--border-primary)] focus:border-blue-500 text-sm text-[var(--text-primary)] font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const newMask = maskVal === "255.255.255.0" ? "255.255.255.240" : "255.255.255.0";
                  setMaskVal(newMask);
                  handleApply({ mask: newMask });
                }}
                className="px-2.5 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[11px] text-[var(--text-secondary)] hover:text-white"
              >
                Toggle /24 ↔ /28
              </button>
            </div>
          ) : (
            <div className="px-3 py-2 rounded-lg bg-black/20 border border-white/5 text-[var(--text-secondary)]">
              {primaryIface.subnetMask || "255.255.255.0"} (/{primaryIface.prefix ?? 24})
            </div>
          )}
        </div>

        {/* Default Gateway */}
        <div>
          <label className="block text-[11px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">
            Default Gateway
          </label>
          {canEdit("gateway") ? (
            <div>
              <input
                type="text"
                value={gatewayVal}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setGatewayVal(val);
                  if (!val || isValidIpv4(val)) {
                    handleApply({ gateway: val });
                  }
                }}
                placeholder="e.g. 192.168.1.1"
                className={`w-full px-3 py-2 rounded-lg bg-black/40 border text-sm text-[var(--text-primary)] font-mono transition-colors focus:outline-none ${
                  isGatewayValid
                    ? "border-[var(--border-primary)] focus:border-blue-500"
                    : "border-rose-500/50 focus:border-rose-500"
                }`}
              />
              {!isGatewayValid && (
                <span className="text-[11px] text-rose-400 mt-1 block">Invalid gateway IP format.</span>
              )}
            </div>
          ) : (
            <div className="px-3 py-2 rounded-lg bg-black/20 border border-white/5 text-[var(--text-secondary)]">
              {primaryIface.gateway || "None (Direct LAN only)"}
            </div>
          )}
        </div>

        {/* DNS Server IP (Host devices) */}
        {device.type === "pc" && (
          <div>
            <label className="block text-[11px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">
              DNS Server IP
            </label>
            {canEdit("dnsServerIp") ? (
              <div>
                <input
                  type="text"
                  value={dnsVal}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    setDnsVal(val);
                    if (!val || isValidIpv4(val)) {
                      handleApply({ dns: val });
                    }
                  }}
                  placeholder="e.g. 192.168.1.53"
                  className={`w-full px-3 py-2 rounded-lg bg-black/40 border text-sm text-[var(--text-primary)] font-mono transition-colors focus:outline-none ${
                    isDnsValid
                      ? "border-[var(--border-primary)] focus:border-blue-500"
                      : "border-rose-500/50 focus:border-rose-500"
                  }`}
                />
                {!isDnsValid && (
                  <span className="text-[11px] text-rose-400 mt-1 block">Invalid DNS IP format.</span>
                )}
              </div>
            ) : (
              <div className="px-3 py-2 rounded-lg bg-black/20 border border-white/5 text-[var(--text-secondary)]">
                {device.dnsServerIp || "Not Configured"}
              </div>
            )}
          </div>
        )}

        {/* Hardware MAC Address */}
        <div>
          <label className="block text-[11px] text-[var(--text-muted)] mb-1 uppercase tracking-wider">
            Layer 2 Hardware Address (MAC)
          </label>
          <div className="px-3 py-2 rounded-lg bg-black/20 border border-white/5 text-[var(--text-secondary)] text-[11px]">
            {primaryIface.mac || "52:54:00:12:34:56"}
          </div>
        </div>
      </div>
    </div>
  );
}
