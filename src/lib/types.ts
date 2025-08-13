export type PhaseNumber = 1 | 2 | 3 | 4;

export type SessionDay = "Mon" | "Tue" | "Thu" | "Sat" | "Daily";

export type ExerciseCategory =
  | "Mobility"
  | "Rotator Cuff"
  | "Scapular"
  | "Press"
  | "Pull"
  | "Lower"
  | "Carry"
  | "Biceps"
  | "Cardio";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  day: SessionDay;
  phases: PhaseNumber[];
  prescription: string;
  cues: string[];
  videoUrl: string;
}

export interface SetEntry {
  reps: string | null; // reps or time text
  weight: number | null; // kg
  pain: number | null; // 0-10
  rpe: number | null; // 0-10
}

export interface LogEntry {
  session: SessionDay;
  completed: boolean;
  sets: Record<string, SetEntry[] | undefined>;
  notes: Record<string, string | undefined>; // per exercise notes and done flags
}

export interface PlanSettings {
  currentWeek: number; // 1..8+
  calmPec?: boolean;
}

export interface PlanState {
  settings: PlanSettings;
  logs: Record<string, LogEntry | undefined>; // yyyy-mm-dd -> entry
  lastDate: string;
  lastDay: SessionDay;
}
