"use client";

import { PLAN_KEY } from "@/lib/data";
import { LogEntry, PlanState, SessionDay } from "@/lib/types";
import { toDateInput } from "@/lib/data";

export function defaultState(): PlanState {
  const todayStr = toDateInput(new Date());
  return {
    settings: {
      currentWeek: 1,
      calmPec: false,
    },
    logs: {},
    lastDate: todayStr,
    lastDay: suggestDay(new Date()),
  } as PlanState;
}

export function sanitizeState(
  input: Partial<PlanState> | null | undefined
): PlanState {
  const base = defaultState();
  const s: any = { ...(input || {}) };
  const settings =
    s.settings && typeof s.settings === "object" ? s.settings : {};
  const logs = s.logs && typeof s.logs === "object" ? s.logs : {};
  return {
    settings: {
      currentWeek: Number(settings.currentWeek) || base.settings.currentWeek,
    },
    logs: logs as PlanState["logs"],
    lastDate: typeof s.lastDate === "string" ? s.lastDate : base.lastDate,
    lastDay: s.lastDay || base.lastDay,
  };
}

export function loadState(): PlanState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    if (!raw) return defaultState();
    const obj = JSON.parse(raw) as Partial<PlanState>;
    return sanitizeState({ ...defaultState(), ...obj });
  } catch {
    return defaultState();
  }
}

export function saveState(state: PlanState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLAN_KEY, JSON.stringify(state));
}

export function ensureLog(
  state: PlanState,
  date: string,
  day: SessionDay
): PlanState {
  const existing = state.logs?.[date];
  const entry: LogEntry = existing ?? {
    session: day,
    completed: false,
    sets: {},
    notes: {},
  };
  entry.session = day;
  const next: PlanState = {
    ...state,
    logs: { ...state.logs, [date]: entry },
    lastDate: date,
    lastDay: day,
  };
  saveState(next);
  return next;
}

export function parseNumber(v: string | number | null | undefined): number {
  if (v === null || v === undefined || v === "") return NaN;
  const n = Number(v);
  return isNaN(n) ? NaN : n;
}

export function countCompletedSessions(state: PlanState): number {
  const logs = state?.logs || {};
  return Object.values(logs).filter((l) => l && (l as any).completed).length;
}

export function avgPain7d(state: PlanState): string | null {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  const pains: number[] = [];
  for (const [date, entry] of Object.entries(state?.logs || {})) {
    if (!entry || !entry.sets) continue;
    const d = new Date(date);
    if (d >= cutoff) {
      Object.values(entry.sets || {}).forEach((arr) =>
        (arr || []).forEach((s) => {
          if (s.pain != null) pains.push(s.pain);
        })
      );
    }
  }
  if (!pains.length) return null;
  return (pains.reduce((a, b) => a + b, 0) / pains.length).toFixed(1);
}

export function suggestDay(d: Date): SessionDay {
  const wd = d.getDay();
  if (wd === 1) return "Mon";
  if (wd === 2) return "Tue";
  if (wd === 4) return "Thu";
  if (wd === 6) return "Sat";
  return "Daily";
}
