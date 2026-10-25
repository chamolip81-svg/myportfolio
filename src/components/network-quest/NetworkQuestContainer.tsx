"use client";

import { useState, useEffect } from "react";
import TopologyCanvas from "./TopologyCanvas";
import DeviceInspector from "./DeviceInspector";
import MissionHUD from "./MissionHUD";
import DiagnosticsConsole from "./DiagnosticsConsole";
import MissionCompleteModal from "./MissionCompleteModal";
import FreeLabControls from "./FreeLabControls";

import type {
  Mission,
  NetworkDevice,
  NetworkLink,
  SimulationResult,
  GameMode,
  PacketEvent,
} from "@/lib/network-quest/types";
import { missions } from "@/lib/network-quest/missions";
import { simulateTransmission } from "@/lib/network-quest/engine";
import { generateDailyChallenge, getTodayDateString } from "@/lib/network-quest/daily";
import {
  loadGameState,
  recordMissionCompletion,
  markDailyCompleted,
} from "@/lib/network-quest/storage";

interface PlayfieldProps {
  mission: Mission;
  gameMode: GameMode;
  onMissionVictory: (hintsUsed: number, timeSeconds: number) => void;
  onNextMission: () => void;
  onReplayMission: () => void;
  onResetMission: () => void;
  onSelectGameMode: (mode: GameMode) => void;
  completedMissionsCount: number;
  totalMissions: number;
}

function NetworkQuestPlayfield({
  mission,
  gameMode,
  onMissionVictory,
  onNextMission,
  onReplayMission,
  onResetMission,
  onSelectGameMode,
  completedMissionsCount,
  totalMissions,
}: PlayfieldProps) {
  // Dynamic Topology State (initialized once per mission key)
  const [devices, setDevices] = useState<NetworkDevice[]>(() =>
    JSON.parse(JSON.stringify(mission.initialDevices))
  );
  const [links, setLinks] = useState<NetworkLink[]>(() =>
    JSON.parse(JSON.stringify(mission.initialLinks))
  );
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(
    () => mission.initialDevices[0]?.id || null
  );
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

  // Free Lab custom test inputs
  const [freeLabSourceId, setFreeLabSourceId] = useState<string>(
    () => mission.testScenario.sourceDeviceId
  );
  const [freeLabTarget, setFreeLabTarget] = useState<string>(
    () => mission.testScenario.targetDestination
  );
  const [freeLabProtocol, setFreeLabProtocol] = useState<"ICMP" | "DNS" | "TCP" | "HTTP">(
    () => mission.testScenario.protocol
  );

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [activePacketNodeId, setActivePacketNodeId] = useState<string | null>(null);
  const [activePacketEvent, setActivePacketEvent] = useState<PacketEvent | null>(null);

  // Gamification & Telemetry State
  const [hintsUsed, setHintsUsed] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Mission timer
  useEffect(() => {
    if (showCompleteModal || isSimulating) return;
    const interval = setInterval(() => {
      setTimeSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showCompleteModal, isSimulating]);

  // Selected Device Reference
  const selectedDevice = devices.find((d) => d.id === selectedDeviceId) || null;
  const allowedFields = mission.allowedEditableFields[selectedDeviceId || ""] || [];

  // Update a device after player configuration
  const handleUpdateDevice = (updatedDevice: NetworkDevice) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === updatedDevice.id ? updatedDevice : d))
    );
  };

  // Toggle link state when clicked
  const handleSelectLink = (linkId: string) => {
    setSelectedLinkId(linkId);
    if (gameMode === "freelab" || mission.id === "m6-broken-link") {
      setLinks((prev) =>
        prev.map((l) =>
          l.id === linkId ? { ...l, status: l.status === "up" ? "down" : "up" } : l
        )
      );
    }
  };

  // Run the Network Simulation Engine
  const handleRunSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setSimulationResult(null);

    const targetDest =
      gameMode === "freelab" ? freeLabTarget : mission.testScenario.targetDestination;
    const srcId =
      gameMode === "freelab" ? freeLabSourceId : mission.testScenario.sourceDeviceId;
    const proto =
      gameMode === "freelab" ? freeLabProtocol : mission.testScenario.protocol;

    const result = simulateTransmission({
      devices,
      links,
      sourceDeviceId: srcId,
      targetDestination: targetDest,
      protocol: proto,
    });

    let stepIndex = 0;
    const eventCount = result.events.length;

    if (eventCount === 0) {
      setSimulationResult(result);
      setIsSimulating(false);
      return;
    }

    const interval = setInterval(() => {
      if (stepIndex >= eventCount) {
        clearInterval(interval);
        setIsSimulating(false);
        setActivePacketNodeId(null);
        setActivePacketEvent(null);
        setSimulationResult(result);

        if (result.success && gameMode !== "freelab") {
          onMissionVictory(hintsUsed, timeSeconds);
          setShowCompleteModal(true);
        }
        return;
      }

      const evt = result.events[stepIndex];
      setActivePacketNodeId(evt.nodeId);
      setActivePacketEvent(evt);
      stepIndex++;
    }, 550);
  };

  // Free Lab preset loader
  const handleLoadFreeLabPreset = (presetId: string) => {
    const presetMission =
      presetId === "p1-lan" ? missions[0] : presetId === "p2-router" ? missions[4] : missions[6];

    setDevices(JSON.parse(JSON.stringify(presetMission.initialDevices)));
    setLinks(JSON.parse(JSON.stringify(presetMission.initialLinks)));
    setSelectedDeviceId(presetMission.initialDevices[0]?.id || null);
    setSelectedLinkId(null);
    setSimulationResult(null);
    setFreeLabSourceId(presetMission.testScenario.sourceDeviceId);
    setFreeLabTarget(presetMission.testScenario.targetDestination);
    setFreeLabProtocol(presetMission.testScenario.protocol);
  };

  return (
    <div className="space-y-6">
      {/* 1. HUD & Mission Objectives */}
      <MissionHUD
        mission={mission}
        gameMode={gameMode}
        onSelectGameMode={onSelectGameMode}
        onRunSimulation={handleRunSimulation}
        onResetMission={onResetMission}
        isSimulating={isSimulating}
        hintsUsedCount={hintsUsed}
        onUseHint={() => setHintsUsed((h) => Math.min(h + 1, mission.hints.length))}
        totalMissions={totalMissions}
        completedMissionsCount={completedMissionsCount}
      />

      {/* Free Lab Controls */}
      {gameMode === "freelab" && (
        <FreeLabControls
          onLoadPreset={handleLoadFreeLabPreset}
          devices={devices}
          sourceDeviceId={freeLabSourceId}
          onChangeSourceDevice={setFreeLabSourceId}
          targetDestination={freeLabTarget}
          onChangeTargetDestination={setFreeLabTarget}
          protocol={freeLabProtocol}
          onChangeProtocol={setFreeLabProtocol}
        />
      )}

      {/* 2. Interactive Topology & Device Inspector Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TopologyCanvas
            devices={devices}
            links={links}
            selectedDeviceId={selectedDeviceId}
            selectedLinkId={selectedLinkId}
            onSelectDevice={(id) => setSelectedDeviceId(id)}
            onSelectLink={handleSelectLink}
            isSimulating={isSimulating}
            activePacketNodeId={activePacketNodeId}
            activePacketEvent={activePacketEvent}
          />

          {/* 3. Diagnostics & Packet Inspection Console */}
          <DiagnosticsConsole result={simulationResult} isSimulating={isSimulating} />
        </div>

        {/* 4. Device Inspector Sidebar */}
        <div className="lg:col-span-1">
          <DeviceInspector
            device={selectedDevice}
            allowedFields={allowedFields}
            onUpdateDevice={handleUpdateDevice}
            onClose={() => setSelectedDeviceId(null)}
          />
        </div>
      </div>

      {/* 5. Mission Complete Celebration Modal */}
      {showCompleteModal && (
        <MissionCompleteModal
          mission={mission}
          hintsUsed={hintsUsed}
          timeSeconds={timeSeconds}
          onNextMission={onNextMission}
          onReplayMission={onReplayMission}
        />
      )}
    </div>
  );
}

export default function NetworkQuestContainer() {
  const [gameMode, setGameMode] = useState<GameMode>("campaign");
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [resetNonce, setResetNonce] = useState(0);
  const [savedProgress, setSavedProgress] = useState(loadGameState);

  const currentMission =
    gameMode === "daily"
      ? generateDailyChallenge(getTodayDateString())
      : missions[currentMissionIdx] || missions[0];

  const handleMissionVictory = (hintsUsed: number, timeSeconds: number) => {
    const updatedState =
      gameMode === "daily"
        ? markDailyCompleted(getTodayDateString())
        : recordMissionCompletion(
            currentMission.id,
            Math.max(100, 500 - hintsUsed * 70),
            timeSeconds,
            hintsUsed
          );
    setSavedProgress(updatedState);
  };

  const handleNextMission = () => {
    if (currentMissionIdx < missions.length - 1) {
      setCurrentMissionIdx((idx) => idx + 1);
    } else {
      setGameMode("freelab");
    }
  };

  const handleReplayMission = () => {
    setResetNonce((n) => n + 1);
  };

  const handleResetMission = () => {
    setResetNonce((n) => n + 1);
  };

  const handleSelectGameMode = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === "guided") {
      setCurrentMissionIdx(0);
    }
  };

  const completedMissionsCount = Object.values(savedProgress.campaignProgress).filter(
    (p) => p.completed
  ).length;

  return (
    <NetworkQuestPlayfield
      key={`${gameMode}-${currentMission.id}-${resetNonce}`}
      mission={currentMission}
      gameMode={gameMode}
      onMissionVictory={handleMissionVictory}
      onNextMission={handleNextMission}
      onReplayMission={handleReplayMission}
      onResetMission={handleResetMission}
      onSelectGameMode={handleSelectGameMode}
      completedMissionsCount={completedMissionsCount}
      totalMissions={missions.length}
    />
  );
}
