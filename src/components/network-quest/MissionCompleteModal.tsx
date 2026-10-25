"use client";

import Link from "next/link";
import { CheckCircle2, Star, ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import type { Mission } from "@/lib/network-quest/types";

interface MissionCompleteModalProps {
  mission: Mission;
  hintsUsed: number;
  timeSeconds: number;
  onNextMission: () => void;
  onReplayMission: () => void;
}

export default function MissionCompleteModal({
  mission,
  hintsUsed,
  timeSeconds,
  onNextMission,
  onReplayMission,
}: MissionCompleteModalProps) {
  const stars = hintsUsed === 0 ? 3 : hintsUsed <= 1 ? 2 : 1;
  const baseScore = 500;
  const hintPenalty = hintsUsed * 75;
  const totalScore = Math.max(100, baseScore - hintPenalty + (hintsUsed === 0 ? 100 : 0));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-[#0c1214] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-4">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Mission {mission.number} Accomplished
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {mission.title}
            </h2>
          </div>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2 py-1">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                size={26}
                className={
                  starIdx <= stars
                    ? "text-amber-400 fill-amber-400 animate-in zoom-in duration-300"
                    : "text-zinc-700"
                }
              />
            ))}
          </div>

          {/* Score & Telemetry Breakdown */}
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Earned XP</span>
              <span className="text-base font-bold text-emerald-400">+{totalScore}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Hints Used</span>
              <span className="text-base font-bold text-white">{hintsUsed}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Time</span>
              <span className="text-base font-bold text-cyan-400">{timeSeconds}s</span>
            </div>
          </div>

          {/* Technical Learning Takeaway */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-left text-xs text-[var(--text-secondary)] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold text-[11px]">
              <BookOpen size={14} />
              <span>Core Networking Takeaway:</span>
            </div>
            <p>{mission.technicalExplanation}</p>
          </div>

          {/* Cross-Link to Portfolio Note / Lab */}
          {mission.relatedNoteSlug && (
            <div className="pt-2 text-left">
              <Link
                href={`/notes/${mission.relatedNoteSlug}`}
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-mono transition-colors"
              >
                <span>Read related technical guide:</span>
                <span className="underline">/notes/{mission.relatedNoteSlug}</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={onReplayMission}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:bg-white/5 text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Practice Again</span>
            </button>

            <button
              onClick={onNextMission}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-xs font-mono font-bold text-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Next Mission</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
