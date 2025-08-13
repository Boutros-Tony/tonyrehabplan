"use client";

import React from "react";
import { exercises, suggestDay, toDateInput, weekToPhase } from "@/lib/data";
import {
  avgPain7d,
  countCompletedSessions,
  defaultState,
  ensureLog,
  loadState,
  parseNumber,
  saveState,
} from "@/lib/state";
import { Exercise } from "@/lib/types";
import { Button, Input, Panel, Pill, Select, Tag } from "./ui";
import OverviewCharts from "@/components/OverviewCharts";

export function HeaderTabs({
  active,
  setActive,
}: {
  active: string;
  setActive: (t: string) => void;
}) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "today", label: "Today" },
    { id: "exercises", label: "Exercises" },
    { id: "nutrition", label: "Nutrition" },
    { id: "logs", label: "Logs" },
    { id: "settings", label: "Settings" },
  ];
  return (
    <nav className="flex gap-2 mt-3 flex-wrap">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className={
            "px-3 py-2 rounded-full border transition-all " +
            (active === t.id
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50")
          }
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}

export function OverviewSection({
  state,
}: {
  state: ReturnType<typeof loadState>;
}) {
  return (
    <Panel>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs text-gray-500">Current Week</div>
            <div className="text-xl font-semibold">
              {String(state?.settings?.currentWeek ?? 1)}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs text-gray-500">Today</div>
            <div className="text-xl font-semibold">
              {new Date().toDateString()}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs text-gray-500">Completed Sessions</div>
            <div className="text-xl font-semibold">
              {String(countCompletedSessions(state))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs text-gray-500">Avg Pain (Last 7d)</div>
            <div className="text-xl font-semibold">
              {String(avgPain7d(state) ?? "—")}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Panel>
            <h3 className="text-sm font-semibold mb-2">Weekly plan</h3>
            <div className="grid gap-2">
              <div>
                <Tag>Mon</Tag> Upper A – Cuff/Scap focus
              </div>
              <div>
                <Tag>Tue</Tag> Lower + Conditioning
              </div>
              <div>
                <Tag>Thu</Tag> Upper B – Press/Pull integration
              </div>
              <div>
                <Tag>Sat</Tag> Lower + Optional cardio
              </div>
              <div>
                <Tag>Daily</Tag> 10–15 min mobility
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-500">Pain rule</div>
                <div className="text-sm">
                  Keep pain ≤2/10, back to baseline ≤24h
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-500">Avoid (for now)</div>
                <div className="text-sm">
                  Dips, deep flys, heavy underhand rows, wide bench
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-500">Pressing cues</div>
                <div className="text-sm">
                  Neutral/close grip, elbows 30–45°, slow tempo
                </div>
              </div>
            </div>
            <h3 className="text-sm font-semibold mt-3 mb-2">
              Green Lights to Advance
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>ROM near symmetric; no night pain.</li>
              <li>
                Side‑lying ER 3×15 with ~3 kg; prone T 3×12 with 2–3 kg; floor
                push‑ups 3×12 pain‑free.
              </li>
            </ul>
          </Panel>

          <Panel>
            <h3 className="text-sm font-semibold mb-2">8‑week phases</h3>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
              <li>
                <b>Weeks 1–2</b>: Cuff/scap strength, incline DB press, elevated
                push‑ups, hammer curls/isometrics.
              </li>
              <li>
                <b>Weeks 3–4</b>: Add landmine press, flat DB bench, 90/90 ER,
                light supinated curls if calm.
              </li>
              <li>
                <b>Weeks 5–6</b>: Add light barbell bench, more pulldown volume,
                lower push‑up elevation, assisted pull‑ups (neutral).
              </li>
              <li>
                <b>Weeks 7–8</b>: Slow load progress; test partial‑ROM overhead
                DB press if criteria met.
              </li>
            </ol>
            <div className="text-xs text-gray-500 mt-2">
              If sharp/deep joint pain, catching/locking, night pain worsening,
              or loss of ROM/strength: pause pressing and consult your
              clinician.
            </div>
            <div className="mt-3">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={Boolean(state.settings.calmPec)}
                  onChange={(e) => {
                    state.settings.calmPec = e.target.checked;
                    saveState(state);
                    window.dispatchEvent(new Event("storage"));
                  }}
                />
                Calm pec‑minor mode (2 weeks): gentler mobility, swap Y, press in shorter ROM
              </label>
            </div>
          </Panel>
        </div>
        <OverviewCharts />
      </div>
    </Panel>
  );
}

export function TodaySection({
  state,
  setState,
}: {
  state: ReturnType<typeof loadState>;
  setState: (s: any) => void;
}) {
  const [date, setDate] = React.useState<string>(
    state?.lastDate || toDateInput(new Date())
  );
  const [day, setDay] = React.useState(
    state?.lastDay || suggestDay(new Date())
  );
  const [week, setWeek] = React.useState<number>(
    state?.settings?.currentWeek || 1
  );

  React.useEffect(() => {
    setState((prev: any) => ensureLog(prev, date, day));
  }, [date, day, setState]);

  const phase = weekToPhase(week);
  const todays = exercises.filter(
    (e) =>
      (e.day === day || (day === "Daily" && e.category === "Mobility")) &&
      e.phases.includes(phase)
  );

  // Adjust list when Calm Pec mode is on
  const adjusted = React.useMemo(() => {
    let list = todays;
    if (state.settings.calmPec) {
      list = list.filter((ex) => ex.id !== "prone_ity"); // remove Y/T cluster
      // Replace with wall slides if Daily
      if (day === "Daily") {
        list = list.filter((ex) => ex.id !== "pec_minor");
      }
    }
    return list;
  }, [todays, state.settings.calmPec, day]);

  function addSet(ex: Exercise, refs: HTMLInputElement[]) {
    const [repsEl, wtEl, painEl, rpeEl] = refs;
    const reps = (repsEl.value || "").trim();
    const weight = parseNumber(wtEl.value);
    const pain = parseNumber(painEl.value);
    const rpe = parseNumber(rpeEl.value);
    if (!reps && isNaN(weight) && isNaN(pain) && isNaN(rpe)) return;
    setState((prev: any) => {
      const entry = {
        reps: reps || null,
        weight: isNaN(weight) ? null : weight,
        pain: isNaN(pain) ? null : pain,
        rpe: isNaN(rpe) ? null : rpe,
      };
      const log = prev.logs?.[date] || {
        session: day,
        completed: false,
        sets: {},
        notes: {},
      };
      const nextSets = [...(log.sets[ex.id] ?? []), entry];
      const next = {
        ...prev,
        logs: {
          ...prev.logs,
          [date]: { ...log, sets: { ...log.sets, [ex.id]: nextSets } },
        },
      };
      saveState(next);
      return next;
    });
    refs.forEach((r) => (r.value = ""));
  }

  function clearEx(id: string, name: string) {
    if (!confirm(`Clear sets/notes for "${name}" on ${date}?`)) return;
    setState((prev: any) => {
      const log = prev.logs?.[date] || {
        session: day,
        completed: false,
        sets: {},
        notes: {},
      };
      const { [id]: _, ...restSets } = log.sets;
      const { [`${id}_done`]: __, [id]: ___, ...restNotes } = log.notes as any;
      const next = {
        ...prev,
        logs: {
          ...prev.logs,
          [date]: { ...log, sets: restSets, notes: restNotes },
        },
      };
      saveState(next);
      return next;
    });
  }

  function markExDone(id: string) {
    setState((prev: any) => {
      const log = prev.logs?.[date] || {
        session: day,
        completed: false,
        sets: {},
        notes: {},
      };
      const next = {
        ...prev,
        logs: {
          ...prev.logs,
          [date]: { ...log, notes: { ...log.notes, [`${id}_done`]: "done" } },
        },
      };
      saveState(next);
      return next;
    });
  }

  function markSessionComplete() {
    setState((prev: any) => {
      const log = prev.logs[date]!;
      const next = {
        ...prev,
        logs: { ...prev.logs, [date]: { ...log, completed: true } },
      };
      saveState(next);
      return next;
    });
    alert("Session marked complete!");
  }

  return (
    <Panel>
      <div className="flex flex-wrap gap-3 items-end">
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate((e.target as HTMLInputElement).value)}
        />
        <Select
          label="Session"
          value={day}
          onChange={(e) => setDay((e.target as HTMLSelectElement).value as any)}
        >
          <option value="Mon">Mon – Upper A</option>
          <option value="Tue">Tue – Lower</option>
          <option value="Thu">Thu – Upper B</option>
          <option value="Sat">Sat – Lower</option>
          <option value="Daily">Daily – Mobility</option>
        </Select>
        <Select
          label="Current Week"
          value={String(week)}
          onChange={(e) =>
            setWeek(Number((e.target as HTMLSelectElement).value))
          }
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>
        <div className="ml-auto">
          <Button onClick={markSessionComplete}>Mark Session Complete</Button>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {adjusted.length === 0 && (
          <div className="text-sm text-white/60">
            No exercises scheduled for this day/phase.
          </div>
        )}
        {adjusted.map((ex) => (
          <ExerciseRow
            key={ex.id}
            ex={ex}
            date={date}
            state={state}
            addSet={addSet}
            clearEx={clearEx}
            markExDone={markExDone}
          />
        ))}
      </div>
    </Panel>
  );
}

function ExerciseRow({
  ex,
  date,
  state,
  addSet,
  clearEx,
  markExDone,
}: {
  ex: Exercise;
  date: string;
  state: ReturnType<typeof loadState>;
  addSet: (ex: Exercise, refs: HTMLInputElement[]) => void;
  clearEx: (id: string, name: string) => void;
  markExDone: (id: string) => void;
}) {
  const ref1 = React.useRef<HTMLInputElement>(null);
  const ref2 = React.useRef<HTMLInputElement>(null);
  const ref3 = React.useRef<HTMLInputElement>(null);
  const ref4 = React.useRef<HTMLInputElement>(null);
  const noteRef = React.useRef<HTMLInputElement>(null);

  const log = state.logs[date]!;
  const sets = log?.sets?.[ex.id] ?? [];
  const done = log?.notes?.[`${ex.id}_done`] === "done";

  React.useEffect(() => {
    if (log?.notes?.[ex.id] && noteRef.current)
      noteRef.current.value = log.notes[ex.id] as string;
  }, [log, ex.id]);

  return (
    <div className="border-t border-white/10 pt-4">
      <h4 className="font-semibold">{ex.name}</h4>
      <div className="flex gap-2 flex-wrap items-center text-sm mt-1">
        <Tag>{ex.category}</Tag>
        <Tag>{ex.day}</Tag>
        <Tag>Phase {weekToPhase(state.settings.currentWeek ?? 1)}</Tag>
        <Pill tone="warn">{ex.prescription}</Pill>
        <a
          className="text-sky-300 hover:underline"
          href={ex.videoUrl}
          target="_blank"
          rel="noopener"
        >
          Video
        </a>
      </div>
      <div className="text-xs text-white/60 mt-1">
        {ex.cues.map((c) => `• ${c}`).join(" · ")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3">
        <Input placeholder="Reps or Time" ref={ref1} />
        <Input type="number" step="0.5" placeholder="Weight (kg)" ref={ref2} />
        <Input
          type="number"
          step="0.5"
          min={0}
          max={10}
          placeholder="Pain (0–10)"
          ref={ref3}
        />
        <Input
          type="number"
          step="0.5"
          min={0}
          max={10}
          placeholder="RPE (0–10)"
          ref={ref4}
        />
        <Button
          onClick={() =>
            addSet(ex, [
              ref1.current!,
              ref2.current!,
              ref3.current!,
              ref4.current!,
            ])
          }
        >
          Add set
        </Button>
      </div>

      <div className="mt-2 space-y-2 text-sm">
        {!sets?.length && (
          <div className="text-gray-500 text-xs">No sets logged yet.</div>
        )}
        {sets?.map((s, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="flex-1">
              Set {idx + 1}:{" "}
              {[
                s.reps ? `Reps/Time: ${s.reps}` : null,
                s.weight != null ? `Weight: ${s.weight} kg` : null,
                s.pain != null ? `Pain: ${s.pain}` : null,
                s.rpe != null ? `RPE: ${s.rpe}` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                // delete set
                const entry = state.logs[date]!;
                const arr = [...(entry.sets[ex.id] ?? [])];
                arr.splice(idx, 1);
                const next: any = {
                  ...state,
                  logs: {
                    ...state.logs,
                    [date]: { ...entry, sets: { ...entry.sets, [ex.id]: arr } },
                  },
                };
                saveState(next);
                // force rerender by updating state via custom event
                window.dispatchEvent(new Event("storage"));
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Input
          placeholder="Notes (optional)"
          className="flex-1"
          ref={noteRef}
          onChange={(e) => {
            const v = (e.target as HTMLInputElement).value;
            const log = state.logs[date]!;
            const next: any = {
              ...state,
              logs: {
                ...state.logs,
                [date]: { ...log, notes: { ...log.notes, [ex.id]: v } },
              },
            };
            saveState(next);
          }}
        />
        <Button variant="ghost" onClick={() => clearEx(ex.id, ex.name)}>
          Clear
        </Button>
        <Button onClick={() => markExDone(ex.id)} disabled={done}>
          {done ? "Done ✓" : "Mark Done"}
        </Button>
      </div>
    </div>
  );
}

export function ExercisesSection({
  state,
}: {
  state: ReturnType<typeof loadState>;
}) {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [ph, setPh] = React.useState("");
  const phaseNum = ph ? Number(ph) : null;

  const list = exercises
    .filter((e) => !cat || e.category === cat)
    .filter((e) => !phaseNum || e.phases.includes(phaseNum as any))
    .filter(
      (e) =>
        e.name.toLowerCase().includes(q.toLowerCase()) ||
        e.category.toLowerCase().includes(q.toLowerCase())
    );

  return (
    <Panel>
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search exercise..."
          value={q}
          onChange={(e) => setQ((e.target as HTMLInputElement).value)}
          className="flex-1"
        />
        <Select
          label="Category"
          value={cat}
          onChange={(e) => setCat((e.target as HTMLSelectElement).value)}
        >
          <option value="">All</option>
          <option>Mobility</option>
          <option>Rotator Cuff</option>
          <option>Scapular</option>
          <option>Press</option>
          <option>Pull</option>
          <option>Lower</option>
          <option>Carry</option>
          <option>Biceps</option>
          <option>Cardio</option>
        </Select>
        <Select
          label="Phase"
          value={ph}
          onChange={(e) => setPh((e.target as HTMLSelectElement).value)}
        >
          <option value="">All</option>
          <option value="1">Weeks 1–2</option>
          <option value="2">Weeks 3–4</option>
          <option value="3">Weeks 5–6</option>
          <option value="4">Weeks 7–8</option>
        </Select>
      </div>
      <div className="grid gap-3 mt-4">
        {list.map((ex) => (
          <Panel key={ex.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold mb-1">{ex.name}</h3>
                <div className="flex gap-2 flex-wrap items-center text-sm">
                  <Tag>{ex.category}</Tag>
                  <Tag>{ex.day}</Tag>
                  <Tag>Phases: {ex.phases.join(", ")}</Tag>
                  <Pill tone="warn">{ex.prescription}</Pill>
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {ex.cues.map((c) => `• ${c}`).join(" · ")}
                </div>
              </div>
              <div>
                <a
                  className="text-sky-300 hover:underline"
                  href={ex.videoUrl}
                  target="_blank"
                  rel="noopener"
                >
                  Video
                </a>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </Panel>
  );
}

export function LogsSection({
  state,
}: {
  state: ReturnType<typeof loadState>;
}) {
  const dates = Object.keys(state?.logs || {})
    .sort()
    .reverse();
  return (
    <Panel>
      {!dates.length && (
        <div className="text-sm text-gray-500">No logs yet.</div>
      )}
      <div className="grid gap-3">
        {dates.map((date) => {
          const entry = state?.logs?.[date];
          if (!entry) return null;
          const setsCount = Object.values(entry.sets || {}).reduce(
            (a, s) => a + (s?.length || 0),
            0
          );
          const painVals: number[] = [];
          Object.values(entry.sets || {}).forEach((arr) =>
            (arr || []).forEach((s) => {
              if (s.pain != null) painVals.push(s.pain);
            })
          );
          const avgPain = painVals.length
            ? (painVals.reduce((a, b) => a + b, 0) / painVals.length).toFixed(1)
            : "—";
          return (
            <Panel key={date}>
              <h3 className="font-semibold mb-1">
                {date} <Tag>{entry.session}</Tag>{" "}
                {entry.completed ? <Pill tone="good">Completed</Pill> : null}
              </h3>
              <div className="text-xs text-gray-500">
                Sets logged: {setsCount} · Avg pain: {avgPain}
              </div>
              <div className="h-px bg-white/10 my-3" />
              <div className="grid gap-2 text-sm">
                {Object.entries(entry.sets || {}).map(([exId, sets]) => {
                  const ex =
                    exercises.find((e) => e.id === exId) ||
                    ({ name: exId } as Exercise);
                  const lines = (sets || [])
                    .map(
                      (s, i) =>
                        `Set ${i + 1}: ${[
                          s.reps ? `${s.reps}` : null,
                          s.weight != null ? `${s.weight} kg` : null,
                          s.pain != null ? `Pain ${s.pain}` : null,
                          s.rpe != null ? `RPE ${s.rpe}` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}`
                    )
                    .join("\n");
                  return (
                    <div key={exId}>
                      <b>{ex.name}</b>
                      <div className="text-xs text-white/60 whitespace-pre-line">
                        {lines || "No sets"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          );
        })}
      </div>
    </Panel>
  );
}

export function SettingsSection({
  state,
  setState,
}: {
  state: any;
  setState: (s: any) => void;
}) {
  function exportLogs() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "slap_rehab_logs.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function importLogs(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result));
        localStorage.setItem("slapPlanData_v1", JSON.stringify(obj));
        alert("Imported successfully.");
        location.reload();
      } catch (err: any) {
        alert("Import failed: " + err?.message);
      }
    };
    reader.readAsText(file);
  }
  return (
    <Panel>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <h3 className="font-semibold mb-2">Progression Rules</h3>
          <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
            <li>
              Build reps to the top of the range, then add 1–2 kg keeping pain
              ≤2/10 and clean form.
            </li>
            <li>Press/pull: +2–5% per week if next‑day soreness is mild.</li>
            <li>
              If pain &gt;2/10 or soreness &gt;24h → reduce next session volume
              by 20–30%.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What to Avoid (for now)</h3>
          <ul className="list-disc pl-5 text-sm text-red-300 space-y-1">
            <li>
              Dips, deep chest flys, heavy/fast underhand rows or pulldowns
            </li>
            <li>Wide‑grip bench, behind‑the‑neck press, kipping pull‑ups</li>
          </ul>
        </div>
      </div>
      <div className="h-px bg-white/10 my-3" />
      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="ghost" onClick={exportLogs}>
          Export Logs (.json)
        </Button>
        <label className="text-xs text-white/70 border border-white/10 rounded-full px-2 py-1 cursor-pointer">
          Import Logs
          <input
            className="hidden"
            type="file"
            accept=".json,application/json"
            onChange={importLogs}
          />
        </label>
        <div className="text-xs text-white/60">
          This clears your saved logs and settings from this browser only.
        </div>
      </div>
      <div className="mt-2">
        <Button
          variant="bad"
          onClick={() => {
            if (
              !confirm(
                "This will erase all saved logs/settings in this browser. Proceed?"
              )
            )
              return;
            localStorage.removeItem("slapPlanData_v1");
            location.reload();
          }}
        >
          Reset All Data
        </Button>
      </div>
    </Panel>
  );
}
