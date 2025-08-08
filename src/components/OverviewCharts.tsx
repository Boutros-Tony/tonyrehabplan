"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Panel } from "@/components/ui";
import { loadState } from "@/lib/state";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function OverviewCharts() {
  const [state, setState] = React.useState(loadState());
  React.useEffect(() => {
    const onStorage = () => setState(loadState());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const dates = Object.keys(state.logs || {}).sort();
  const painPoints: number[] = dates.map((d) => {
    const entry = state.logs?.[d];
    if (!entry || !entry.sets) return NaN;
    const vals: number[] = [];
    Object.values(entry.sets || {}).forEach((arr) =>
      (arr || []).forEach((s) => {
        if (s.pain != null) vals.push(s.pain);
      })
    );
    if (!vals.length) return NaN;
    return Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2));
  });
  const sessions: number[] = dates.map((d) =>
    state.logs?.[d]?.completed ? 1 : 0
  );

  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Panel>
        <h3 className="font-semibold mb-2">Avg Pain per Day</h3>
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: "Pain (0-10)",
                data: painPoints,
                borderColor: "#4f46e5",
                backgroundColor: "rgba(79,70,229,0.15)",
                tension: 0.3,
                spanGaps: true,
              },
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 10 } },
          }}
        />
      </Panel>
      <Panel>
        <h3 className="font-semibold mb-2">Completed Sessions</h3>
        <Bar
          data={{
            labels: dates,
            datasets: [
              {
                label: "Sessions",
                data: sessions,
                backgroundColor: "rgba(16,185,129,0.5)",
                borderColor: "#10b981",
              },
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
          }}
        />
      </Panel>
    </div>
  );
}
