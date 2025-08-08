"use client";

import React from "react";
import {
  HeaderTabs,
  OverviewSection,
  TodaySection,
  ExercisesSection,
  LogsSection,
  SettingsSection,
} from "@/components/Sections";
import Nutrition from "@/components/Nutrition";
import { defaultState, loadState } from "@/lib/state";
import { Panel } from "@/components/ui";
import Sidebar from "@/components/Sidebar";
import { getClientId, pushState, subscribeState } from "@/lib/sync";

export default function Home() {
  const [tab, setTab] = React.useState("overview");
  const [state, setState] = React.useState(loadState());
  const uidRef = React.useRef<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const onStorage = () => setState(loadState());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Firebase realtime sync
  React.useEffect(() => {
    uidRef.current = getClientId();
    const uid = uidRef.current;
    const unsub = subscribeState(uid, (remote) => {
      // Merge remote into local (simple replace for now)
      setState(remote);
    });
    return () => unsub();
  }, []);

  // Debounced push when state changes
  React.useEffect(() => {
    const uid = uidRef.current;
    if (!uid) return;
    const t = setTimeout(() => {
      pushState(uid, state).catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [state]);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr]">
        <Sidebar active={tab} setActive={setTab} />
        <div className="p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">
              SLAP Repair Rehab Tracker
            </h1>
            <div className="text-sm text-gray-600">
              12+ weeks post‑op progression with logging, videos, and
              pain‑guided loading.
            </div>
          </div>
          <div className="space-y-4">
            {tab === "overview" && <OverviewSection state={state} />}
            {tab === "today" && (
              <TodaySection state={state} setState={setState} />
            )}
            {tab === "exercises" && <ExercisesSection state={state} />}
            {tab === "nutrition" && <Nutrition />}
            {tab === "logs" && <LogsSection state={state} />}
            {tab === "settings" && (
              <SettingsSection state={state} setState={setState} />
            )}
          </div>
          <footer className="border-t border-gray-200 mt-8">
            <div className="p-4 text-xs text-gray-500">
              Built with Next.js and Tailwind. Data stays in your browser.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
