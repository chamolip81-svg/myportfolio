"use client";

import { useState } from "react";
import {
  Play,
  RotateCcw,
  Lightbulb,
  Award,
  Clock,
} from "lucide-react";
import type { Mission, GameMode } from "@/lib/network-quest/types";

interface MissionHUDProps {
  mission: Mission;
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  onRunSimulation: () => void;
  onResetMission: () => void;
  isSimulating: boolean;
  hintsUsedCount: number;
  onUseHint: () => void;
  totalMissions: number;
  completedMissionsCount: number;
}

export default function MissionHUD({
  mission,
  gameMode,
  onSelectGameMode,
  onRunSimulation,
  onResetMission,
  isSimulating,
  hintsUsedCount,
  onUseHint,
  totalMissions,
  completedMissionsCount,
}: MissionHUDProps) {
  const [showHintModal, setShowHintModal] = useState(false);

  const difficultyColors = {
    Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Advanced: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="space-y-4">
      {/* 1. Mode Switcher & Progress Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs font-mono">
        {/* Game Mode Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(
            [
              { id: "campaign", label: "Campaign" },
              { id: "guided", label: "Guided Learning" },
              { id: "daily", label: "Daily Challenge" },
              { id: "freelab", label: "Free Lab" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectGameMode(m.id)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                gameMode === m.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Progress Counters */}
        <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] self-end sm:self-auto">
          {gameMode === "campaign" && (
            <div className="flex items-center gap-1.5">
              <Award size={14} className="text-amber-400" />
              <span>
                Progress: <strong className="text-white">{completedMissionsCount}</strong> / {totalMissions}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock size={13} />
            <span>Est: {mission.timeEstimate}</span>
          </div>
        </div>
      </div>

      {/* 2. Active Mission Objective Card */}
      <div className="p-5 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]/90 backdrop-blur-md relative overflow-hidden shadow-lg">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold text-[var(--accent-blue)]">
                MISSION {mission.number}
              </span>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  difficultyColors[mission.difficulty]
                }`}
              >
                {mission.difficulty}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Concept: {mission.concept}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              {mission.title}
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {mission.objective}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            {/* Hint Button */}
            <button
              id="hints-modal-btn"
              onClick={() => {
                setShowHintModal(true);
                onUseHint();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:border-amber-400/40 text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-all cursor-pointer"
              title="Reveal progressive hint"
            >
              <Lightbulb size={14} className="text-amber-400" />
              <span>Hints ({hintsUsedCount}/{mission.hints.length})</span>
            </button>

            {/* Reset Mission */}
            <button
              id="reset-mission-btn"
              onClick={onResetMission}
              className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:bg-white/5 text-[var(--text-secondary)] hover:text-white transition-all cursor-pointer"
              title="Reset mission topology to default"
              aria-label="Reset Mission"
            >
              <RotateCcw size={15} />
            </button>

            {/* Test Simulation Button */}
            <button
              id="test-transmission-btn"
              onClick={onRunSimulation}
              disabled={isSimulating}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-white shadow-lg transition-all cursor-pointer ${
                isSimulating
                  ? "bg-blue-600/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-500/25 hover:shadow-cyan-500/30 active:scale-95"
              }`}
            >
              <Play size={14} className={isSimulating ? "animate-spin" : "fill-current"} />
              <span>{isSimulating ? "Simulating Traffic..." : "Test Transmission"}</span>
            </button>
          </div>
        </div>

        {/* Target Destination & Protocol Pill */}
        <div className="mt-4 pt-3 border-t border-[var(--border-primary)] flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span>Transmission Target:</span>
            <span className="px-2 py-0.5 rounded bg-black/40 text-cyan-400 font-semibold border border-cyan-500/20">
              {mission.testScenario.targetDestination} ({mission.testScenario.protocol})
            </span>
            <span className="text-[11px] hidden md:inline">
              Source: <strong className="text-white">{mission.testScenario.sourceDeviceId}</strong>
            </span>
          </div>

          <div className="text-[11px] text-[var(--text-tertiary)]">
            Click devices to diagnose and edit configurations.
          </div>
        </div>
      </div>

      {/* Progressive Hint Modal */}
      {showHintModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
                <Lightbulb size={18} />
                <span>Mission Diagnostics & Hints</span>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="text-[var(--text-muted)] hover:text-white"
                aria-label="Close Hint Modal"
              >
                ✕
              </button>
            </div>

            <div className="my-5 space-y-3">
              {mission.hints.slice(0, Math.max(1, hintsUsedCount)).map((hint, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-amber-500/20 text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <p>{hint}</p>
                  </div>
                </div>
              ))}

              {hintsUsedCount < mission.hints.length && (
                <p className="text-[11px] text-[var(--text-muted)] text-center font-mono">
                  {mission.hints.length - hintsUsedCount} more progressive hint(s) available.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-primary)]">
              {hintsUsedCount < mission.hints.length ? (
                <button
                  onClick={() => onUseHint()}
                  className="px-3.5 py-2 rounded-xl text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors cursor-pointer"
                >
                  Unlock Next Hint
                </button>
              ) : (
                <span className="text-xs font-mono text-emerald-400">All hints unlocked</span>
              )}

              <button
                onClick={() => setShowHintModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
