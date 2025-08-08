import { Exercise, PhaseNumber, SessionDay } from "@/lib/types";

export const PLAN_KEY = "slapPlanData_v1";

export function weekToPhase(week: number): PhaseNumber {
  if (week <= 2) return 1;
  if (week <= 4) return 2;
  if (week <= 6) return 3;
  return 4;
}

function yt(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.youtube.com/results?search_query=${q}`;
}

function ex(
  id: string,
  name: string,
  category: Exercise["category"],
  day: SessionDay,
  phases: PhaseNumber[],
  prescription: string,
  cues: string[],
  videoUrl: string
): Exercise {
  return { id, name, category, day, phases, prescription, cues, videoUrl };
}

export const exercises: Exercise[] = [
  // Mobility (Daily)
  ex(
    "thoracic_ext",
    "Thoracic extensions (foam roller)",
    "Mobility",
    "Daily",
    [1, 2, 3, 4],
    "1–2 min",
    ["Small arcs over the roller, mid-back only"],
    yt("thoracic extension foam roller")
  ),
  ex(
    "scap_clocks",
    "Scapular clocks (wall)",
    "Mobility",
    "Daily",
    [1, 2, 3, 4],
    "1–2 min",
    ["Slow, pain-free range; keep ribcage quiet"],
    yt("scapular clocks wall exercise")
  ),
  ex(
    "pec_minor",
    "Pec minor doorway stretch",
    "Mobility",
    "Daily",
    [1, 2, 3, 4],
    "2 × 30–45s",
    ["Arm just below shoulder level; gentle stretch only"],
    yt("pec minor doorway stretch")
  ),
  ex(
    "post_capsule",
    "Posterior capsule stretch (cross‑body)",
    "Mobility",
    "Daily",
    [1, 2, 3, 4],
    "2 × 30–45s",
    ["Pain-free only; no pinching"],
    yt("posterior capsule stretch cross body shoulder")
  ),
  ex(
    "sleeper",
    "Sleeper stretch (gentle)",
    "Mobility",
    "Daily",
    [1, 2, 3, 4],
    "2 × 30s",
    ["Keep shoulder down/back; stop at mild stretch"],
    yt("sleeper stretch shoulder safe technique")
  ),
  ex(
    "scap_pro_ret",
    "Scap protraction/retraction (wall or quadruped)",
    "Mobility",
    "Daily",
    [1, 2, 3, 4],
    "2 × 12–15",
    ["Move only the shoulder blades"],
    yt("scapular protraction retraction wall exercise")
  ),

  // Upper A – Cuff/Scap
  ex(
    "scap_ret_holds",
    "Scapular retraction holds (band/cable)",
    "Scapular",
    "Mon",
    [1, 2, 3, 4],
    "3 × 12–15 (2s hold)",
    ["Neutral grip, chest tall, no shrug"],
    yt("band scapular retraction holds cable")
  ),
  ex(
    "serratus_punch",
    "Serratus punches (supine DB)",
    "Scapular",
    "Mon",
    [1, 2, 3, 4],
    "3 × 12–15",
    ["Reach to ceiling without shrugging"],
    yt("serratus punch dumbbell supine")
  ),
  ex(
    "side_er",
    "Side‑lying external rotation (DB)",
    "Rotator Cuff",
    "Mon",
    [1, 2, 3, 4],
    "3 × 12–15",
    ["Towel under elbow, slow control"],
    yt("side lying external rotation dumbbell rotator cuff")
  ),
  ex(
    "prone_ity",
    "Prone I/T/Y (light DBs)",
    "Rotator Cuff",
    "Mon",
    [1, 2, 3, 4],
    "2–3 × 10–12 each",
    ["Thumbs up; small range if needed"],
    yt("prone I T Y exercise dumbbell")
  ),
  ex(
    "er_ir_0",
    "Standing ER/IR at 0° abduction (band/cable)",
    "Rotator Cuff",
    "Mon",
    [1, 2, 3, 4],
    "3 × 12–15 each",
    ["Elbow pinned at side; neutral wrist"],
    yt("external rotation band 0 degrees abduction")
  ),
  ex(
    "row_neutral",
    "Chest‑supported DB row (neutral grip)",
    "Pull",
    "Mon",
    [1, 2, 3, 4],
    "3 × 10–12 (RPE 6–7)",
    ["Set scapula lightly; avoid shrug"],
    yt("chest supported dumbbell row neutral grip")
  ),
  ex(
    "landmine",
    "Landmine press (arc press)",
    "Press",
    "Mon",
    [2, 3, 4],
    "3 × 8–10 (not to full overhead)",
    ["Arc forward, control range"],
    yt("landmine press arc press shoulder friendly")
  ),

  // Upper B – Press/Pull Integration
  ex(
    "incline_db_press",
    "Incline DB press (15–30°, neutral grip)",
    "Press",
    "Thu",
    [1, 2, 3, 4],
    "3–4 × 6–10 (3‑1‑2 tempo)",
    ["Elbows 30–45°, pause above deep stretch point"],
    yt("incline dumbbell press neutral grip shoulder friendly")
  ),
  ex(
    "pushup_elev",
    "Push‑up (hands elevated)",
    "Press",
    "Thu",
    [1, 2, 3, 4],
    "3 × 8–12",
    ["Ribs down, shoulder blades glide"],
    yt("elevated push up progression bench")
  ),
  ex(
    "lat_raise",
    "Lateral raises",
    "Scapular",
    "Thu",
    [1, 2, 3, 4],
    "3–4 × 10–15",
    ["Slight forward lean; pinkies slightly up"],
    yt("lateral raise proper form dumbbell")
  ),
  ex(
    "face_pull",
    "Face pulls (rope)",
    "Scapular",
    "Thu",
    [1, 2, 3, 4],
    "3 × 12–15",
    ["High elbows, thumbs back"],
    yt("face pull proper form rope")
  ),
  ex(
    "er_90",
    "External rotation at 90/90 (band/cable)",
    "Rotator Cuff",
    "Thu",
    [2, 3, 4],
    "3 × 10–12",
    ["Elbow at shoulder height; slow control"],
    yt("external rotation 90 90 band cable")
  ),
  ex(
    "lat_pulldown_oh",
    "Lat pulldown (overhand/neutral)",
    "Pull",
    "Thu",
    [1, 2, 3, 4],
    "3 × 8–12",
    ["Avoid heavy underhand for now"],
    yt("lat pulldown overhand grip proper form")
  ),
  ex(
    "farmer",
    "Farmer carry",
    "Carry",
    "Thu",
    [1, 2, 3, 4],
    "3 × 20–30 m",
    ["Shoulders down/back; steady steps"],
    yt("farmer carry proper form dumbbells")
  ),

  // Bench Re‑Intro Options
  ex(
    "floor_press",
    "Floor press (DB/BB) or DB bench with pads",
    "Press",
    "Thu",
    [1],
    "3 × 8–10 (RPE ~6)",
    ["Neutral grip, elbows 30–45°"],
    yt("floor press dumbbell neutral grip")
  ),
  ex(
    "flat_db",
    "Flat DB bench (neutral grip)",
    "Press",
    "Thu",
    [2, 3, 4],
    "3–4 × 6–10",
    ["Full ROM if pain‑free; pause above stretch"],
    yt("flat dumbbell bench press neutral grip")
  ),
  ex(
    "bb_bench_light",
    "Barbell bench (light, intro)",
    "Press",
    "Thu",
    [3, 4],
    "3 × 5 @ ~40–50% pre‑injury",
    ["Strong scap set; no bounce; no maxing"],
    yt("barbell bench press shoulder friendly setup")
  ),

  // Biceps progression
  ex(
    "bicep_iso",
    "Biceps isometric (elbow 90°, supinated)",
    "Biceps",
    "Mon",
    [1],
    "3 × 20–30s",
    ["Build tension; no pain"],
    yt("biceps isometric 90 degrees supinated")
  ),
  ex(
    "hammer",
    "Hammer curls",
    "Biceps",
    "Mon",
    [1, 2, 3, 4],
    "3 × 12–15 (light)",
    ["Elbows by side; slow lower"],
    yt("hammer curl proper form dumbbell")
  ),
  ex(
    "ecc_hammer",
    "Hammer curls (eccentric‑focused)",
    "Biceps",
    "Thu",
    [2, 3, 4],
    "3 × 10–12 (3s down)",
    ["Control the descent"],
    yt("eccentric hammer curl")
  ),
  ex(
    "sup_curl",
    "Supinated curls (light–moderate)",
    "Biceps",
    "Thu",
    [3, 4],
    "2–3 × 10–12",
    ["Stay pain‑free; no swinging"],
    yt("biceps curl supinated proper form dumbbell")
  ),

  // Lower days (Tue)
  ex(
    "goblet",
    "Goblet squat",
    "Lower",
    "Tue",
    [1, 2, 3, 4],
    "3–4 × 6–10",
    ["Torso tall; knees track over toes"],
    yt("goblet squat proper form")
  ),
  ex(
    "rdl",
    "DB Romanian deadlift",
    "Lower",
    "Tue",
    [1, 2, 3, 4],
    "3–4 × 8–12",
    ["Hips back; neutral spine"],
    yt("dumbbell romanian deadlift proper form")
  ),
  ex(
    "split_squat",
    "Split squat (DBs at sides)",
    "Lower",
    "Tue",
    [1, 2, 3, 4],
    "3 × 8–12 / side",
    ["Front shin vertical-ish; steady"],
    yt("dumbbell split squat proper form")
  ),
  ex(
    "ham_curl",
    "Hamstring curl (machine/band/ball)",
    "Lower",
    "Tue",
    [1, 2, 3, 4],
    "3 × 10–15",
    ["Full range"],
    yt("hamstring curl proper form")
  ),
  ex(
    "calf",
    "Calf raises",
    "Lower",
    "Tue",
    [1, 2, 3, 4],
    "3 × 12–15",
    ["Pause at top/bottom"],
    yt("calf raises proper form")
  ),
  ex(
    "cardio",
    "Bike/Elliptical (easy‑moderate)",
    "Cardio",
    "Tue",
    [1, 2, 3, 4],
    "10–20 min",
    ["Nasal breathing pace"],
    yt("stationary bike workout easy pace")
  ),

  // Lower days (Sat)
  ex(
    "goblet_sat",
    "Goblet squat",
    "Lower",
    "Sat",
    [1, 2, 3, 4],
    "3–4 × 6–10",
    ["Torso tall; knees track"],
    yt("goblet squat proper form")
  ),
  ex(
    "rdl_sat",
    "DB Romanian deadlift",
    "Lower",
    "Sat",
    [1, 2, 3, 4],
    "3–4 × 8–12",
    ["Hips back; neutral"],
    yt("dumbbell romanian deadlift proper form")
  ),
  ex(
    "split_squat_sat",
    "Split squat (DBs at sides)",
    "Lower",
    "Sat",
    [1, 2, 3, 4],
    "3 × 8–12 / side",
    ["Steady; full range"],
    yt("dumbbell split squat proper form")
  ),
  ex(
    "ham_curl_sat",
    "Hamstring curl (machine/band/ball)",
    "Lower",
    "Sat",
    [1, 2, 3, 4],
    "3 × 10–15",
    ["Full range"],
    yt("hamstring curl proper form")
  ),
  ex(
    "calf_sat",
    "Calf raises",
    "Lower",
    "Sat",
    [1, 2, 3, 4],
    "3 × 12–15",
    ["Pause at top/bottom"],
    yt("calf raises proper form")
  ),
  ex(
    "cardio_sat",
    "Bike/Elliptical (easy‑moderate)",
    "Cardio",
    "Sat",
    [1, 2, 3, 4],
    "10–20 min",
    ["Nasal breathing pace"],
    yt("elliptical workout easy pace")
  ),
];

export function suggestDay(d: Date): SessionDay {
  const wd = d.getDay(); // 0 Sun, 1 Mon...
  if (wd === 1) return "Mon";
  if (wd === 2) return "Tue";
  if (wd === 4) return "Thu";
  if (wd === 6) return "Sat";
  return "Daily";
}

export function toDateInput(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
