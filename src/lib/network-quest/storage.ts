/**
 * Network Quest — Robust, Versioned Local Storage Manager
 * Safely persists mission progress, scores, and settings.
 * Resilient against private browsing restrictions, QuotaExceededError, and data corruption.
 */

import type { SavedGameState, MissionProgress } from "./types";

const STORAGE_KEY = "network_quest_save_v1";
const CURRENT_VERSION = 1;

export const defaultGameState: SavedGameState = {
  version: CURRENT_VERSION,
  lastPlayed: new Date().toISOString(),
  currentMissionId: "m1-first-wire",
  gameMode: "campaign",
  campaignProgress: {},
  dailyCompletedDates: [],
  soundEnabled: true,
  reducedMotion: false,
};

function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__nq_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadGameState(): SavedGameState {
  if (!isStorageAvailable()) {
    return { ...defaultGameState };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultGameState };

    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return { ...defaultGameState };
    }

    // Version migration check
    if (parsed.version !== CURRENT_VERSION) {
      return {
        ...defaultGameState,
        ...parsed,
        version: CURRENT_VERSION,
      };
    }

    return {
      ...defaultGameState,
      ...parsed,
      campaignProgress: parsed.campaignProgress || {},
      dailyCompletedDates: Array.isArray(parsed.dailyCompletedDates)
        ? parsed.dailyCompletedDates
        : [],
    };
  } catch (err) {
    console.warn("[NetworkQuest] Failed to load saved game, falling back to defaults.", err);
    return { ...defaultGameState };
  }
}

export function saveGameState(state: SavedGameState): boolean {
  if (!isStorageAvailable()) return false;

  try {
    const updated = {
      ...state,
      lastPlayed: new Date().toISOString(),
      version: CURRENT_VERSION,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.warn("[NetworkQuest] Failed to persist game state.", err);
    return false;
  }
}

export function recordMissionCompletion(
  missionId: string,
  score: number,
  timeSeconds: number,
  hintsUsed: number
): SavedGameState {
  const state = loadGameState();

  const existing = state.campaignProgress[missionId];
  const stars = hintsUsed === 0 ? 3 : hintsUsed <= 1 ? 2 : 1;

  const updatedProgress: MissionProgress = {
    missionId,
    completed: true,
    score: Math.max(existing?.score || 0, score),
    stars: Math.max(existing?.stars || 0, stars),
    bestTimeSeconds: existing?.bestTimeSeconds
      ? Math.min(existing.bestTimeSeconds, timeSeconds)
      : timeSeconds,
    completedAt: new Date().toISOString(),
    hintsUsed,
  };

  const newState: SavedGameState = {
    ...state,
    campaignProgress: {
      ...state.campaignProgress,
      [missionId]: updatedProgress,
    },
  };

  saveGameState(newState);
  return newState;
}

export function markDailyCompleted(dateString: string): SavedGameState {
  const state = loadGameState();
  const dates = new Set(state.dailyCompletedDates);
  dates.add(dateString);

  const newState: SavedGameState = {
    ...state,
    dailyCompletedDates: Array.from(dates),
  };

  saveGameState(newState);
  return newState;
}
