"use client";

import { getDb } from "@/lib/firebase";
import { getOrCreateClientId } from "@/lib/id";
import { PlanState } from "@/lib/types";

export function subscribeState(uid: string, onRemote: (s: PlanState) => void) {
  getDb().then(async (db) => {
    if (!db) return;
    const { ref, onValue } = await import("firebase/database");
    // Single-user app path
    const stateRef = ref(db, `singleUser/state`);
    onValue(stateRef, (snap) => {
      const val = snap.val();
      if (val) onRemote(val as PlanState);
    });
  });
  return () => {};
}

let lastPushedAt = 0;
export async function pushState(uid: string, state: PlanState) {
  const db = await getDb();
  if (!db) return;
  const { ref, set, serverTimestamp } = await import("firebase/database");
  const stateRef = ref(db, `singleUser/state`);
  lastPushedAt = Date.now();
  await set(stateRef, { ...state, _ts: serverTimestamp() });
}

export function getClientId(): string {
  return getOrCreateClientId();
}
