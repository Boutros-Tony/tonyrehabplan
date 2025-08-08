import React from "react";
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const items = [
  { id: "overview", label: "Overview", icon: HomeIcon },
  { id: "today", label: "Today", icon: CalendarIcon },
  { id: "exercises", label: "Exercises", icon: ClipboardDocumentListIcon },
  { id: "nutrition", label: "Nutrition", icon: HeartIcon },
  { id: "logs", label: "Logs", icon: ChartBarIcon },
  { id: "settings", label: "Settings", icon: Cog6ToothIcon },
];

export default function Sidebar({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  return (
    <aside className="h-screen sticky top-0 p-4 border-r border-gray-200 bg-white hidden md:flex md:flex-col min-w-[220px]">
      <div className="text-lg font-semibold mb-4">Rehab Dashboard</div>
      <nav className="space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setActive(it.id)}
              className={
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition-all " +
                (isActive
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50")
              }
            >
              <Icon className="w-5 h-5" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto text-xs text-gray-400">
        Data stays on your device
      </div>
    </aside>
  );
}
