/**
 * Network Quest — Deterministic Daily Challenge Generator
 * Generates an educational networking challenge based on a date seed.
 * Requires no backend or database; reproducible for any given YYYY-MM-DD.
 */

import type { Mission } from "./types";
import { missions } from "./missions.ts";

/**
 * Fast, deterministic 32-bit pseudo-random number generator (Mulberry32)
 */
function createPrng(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function generateDailyChallenge(dateString: string = getTodayDateString()): Mission {
  const seed = stringToSeed(`network-quest-daily-${dateString}`);
  const rng = createPrng(seed);

  // Pick a base template mission (from missions 2 through 10)
  const templateIdx = Math.floor(rng() * (missions.length - 1)) + 1;
  const baseMission = missions[templateIdx];

  // Deep clone to prevent mutating original templates
  const dailyMission: Mission = JSON.parse(JSON.stringify(baseMission));

  dailyMission.id = `daily-${dateString}`;
  dailyMission.title = `Daily Challenge: ${baseMission.title.split(":")[0]} (${dateString})`;
  dailyMission.timeEstimate = "3-5 min";

  return dailyMission;
}
