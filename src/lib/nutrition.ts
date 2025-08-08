export type FoodId =
  | "eggs"
  | "chicken_breast"
  | "tuna"
  | "burger_meat"
  | "oats"
  | "yogurt"
  | "salad" // tomato + cucumber mix
  | "rice_cooked"
  | "pasta_cooked"
  | "potato_boiled"
  | "lentils_cooked"
  | "beans_canned"
  | "olive_oil";

export interface Food {
  id: FoodId;
  name: string;
  unit: "g" | "unit";
  gramsPerUnit?: number; // for eggs
  // macros per 100g (or per unit if unit=="unit")
  per: 100 | 1;
  kcal: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

// Approximate macros
export const FOODS: Record<FoodId, Food> = {
  eggs: {
    id: "eggs",
    name: "Egg (large)",
    unit: "unit",
    gramsPerUnit: 60,
    per: 1,
    kcal: 78,
    protein: 6.3,
    carbs: 0.6,
    fat: 5.3,
  },
  chicken_breast: {
    id: "chicken_breast",
    name: "Chicken breast",
    unit: "g",
    per: 100,
    kcal: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  tuna: {
    id: "tuna",
    name: "Tuna (canned, in water)",
    unit: "g",
    per: 100,
    kcal: 132,
    protein: 29,
    carbs: 0,
    fat: 1,
  },
  burger_meat: {
    id: "burger_meat",
    name: "Burger meat (90% lean)",
    unit: "g",
    per: 100,
    kcal: 214,
    protein: 26,
    carbs: 0,
    fat: 10,
  },
  oats: {
    id: "oats",
    name: "Oats (dry)",
    unit: "g",
    per: 100,
    kcal: 389,
    protein: 13.2,
    carbs: 67.7,
    fat: 6.5,
  },
  yogurt: {
    id: "yogurt",
    name: "Greek yogurt 2%",
    unit: "g",
    per: 100,
    kcal: 73,
    protein: 10,
    carbs: 3.6,
    fat: 2,
  },
  salad: {
    id: "salad",
    name: "Salad (tomato+cucumber)",
    unit: "g",
    per: 100,
    kcal: 16,
    protein: 0.8,
    carbs: 3.8,
    fat: 0.1,
  },
  rice_cooked: {
    id: "rice_cooked",
    name: "White rice (cooked)",
    unit: "g",
    per: 100,
    kcal: 130,
    protein: 2.4,
    carbs: 28,
    fat: 0.3,
  },
  pasta_cooked: {
    id: "pasta_cooked",
    name: "Pasta (cooked)",
    unit: "g",
    per: 100,
    kcal: 157,
    protein: 5.8,
    carbs: 30.4,
    fat: 0.9,
  },
  potato_boiled: {
    id: "potato_boiled",
    name: "Potato (boiled)",
    unit: "g",
    per: 100,
    kcal: 87,
    protein: 2.0,
    carbs: 20,
    fat: 0.1,
  },
  lentils_cooked: {
    id: "lentils_cooked",
    name: "Lentils (cooked)",
    unit: "g",
    per: 100,
    kcal: 116,
    protein: 9.0,
    carbs: 20,
    fat: 0.4,
  },
  beans_canned: {
    id: "beans_canned",
    name: "Beans (canned, drained)",
    unit: "g",
    per: 100,
    kcal: 110,
    protein: 7.0,
    carbs: 19,
    fat: 0.4,
  },
  olive_oil: {
    id: "olive_oil",
    name: "Olive oil",
    unit: "g",
    per: 100,
    kcal: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
  },
};

export interface NutritionSettings {
  weightKg: number;
  heightCm: number;
  bodyFatPercent: number; // 0..100
  activityFactor: number; // 1.2..1.9
  footballPerWeek: number; // number of games
  kcalSurplus: number; // e.g. +300 for lean bulk
  proteinPerKg: number; // g/kg
  fatPerKg: number; // g/kg
}

export interface MacroTarget {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function estimateTDEE(settings: NutritionSettings): number {
  const leanMassKg = settings.weightKg * (1 - settings.bodyFatPercent / 100);
  // Katch-McArdle BMR
  const bmr = 370 + 21.6 * leanMassKg;
  // Activity factor baseline
  let tdee = bmr * settings.activityFactor;
  // Rough add for football games (~300-500 kcal per moderate game)
  tdee += settings.footballPerWeek * 350 * (1 / 7);
  return Math.round(tdee);
}

export function buildTargets(
  settings: NutritionSettings,
  tdee: number
): MacroTarget {
  const kcal = tdee + settings.kcalSurplus;
  const protein = Math.round(settings.proteinPerKg * settings.weightKg);
  const fat = Math.round(settings.fatPerKg * settings.weightKg);
  const kcalProtein = protein * 4;
  const kcalFat = fat * 9;
  const carbs = Math.max(0, Math.round((kcal - kcalProtein - kcalFat) / 4));
  return { kcal, protein, carbs, fat };
}

export function macrosOf(foodId: FoodId, amount: number): MacroTarget {
  const f = FOODS[foodId];
  const ratio = amount / f.per;
  return {
    kcal: f.kcal * ratio,
    protein: f.protein * ratio,
    carbs: f.carbs * ratio,
    fat: f.fat * ratio,
  };
}

export function sumMacros(items: MacroTarget[]): MacroTarget {
  return items.reduce(
    (a, b) => ({
      kcal: a.kcal + b.kcal,
      protein: a.protein + b.protein,
      carbs: a.carbs + b.carbs,
      fat: a.fat + b.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export interface MealItem {
  foodId: FoodId;
  amount: number; // g or unit depending on food
}
export interface MealPlan {
  meals: { name: string; items: MealItem[] }[];
}

export function defaultMealPlan(): MealPlan {
  return {
    meals: [
      {
        name: "Meal 1",
        items: [
          { foodId: "oats", amount: 100 },
          { foodId: "yogurt", amount: 200 },
          { foodId: "eggs", amount: 2 },
        ],
      },
      {
        name: "Meal 2",
        items: [
          { foodId: "chicken_breast", amount: 200 },
          { foodId: "rice_cooked", amount: 200 },
          { foodId: "salad", amount: 250 },
        ],
      },
      {
        name: "Meal 3",
        items: [
          { foodId: "tuna", amount: 150 },
          { foodId: "yogurt", amount: 200 },
          { foodId: "pasta_cooked", amount: 200 },
        ],
      },
      {
        name: "Meal 4",
        items: [
          { foodId: "burger_meat", amount: 180 },
          { foodId: "salad", amount: 250 },
          { foodId: "potato_boiled", amount: 250 },
        ],
      },
    ],
  };
}

export function mealPlanTotals(plan: MealPlan): MacroTarget {
  const all = plan.meals.flatMap((m) =>
    m.items.map((it) => macrosOf(it.foodId, it.amount))
  );
  const m = sumMacros(all);
  return {
    kcal: Math.round(m.kcal),
    protein: Math.round(m.protein),
    carbs: Math.round(m.carbs),
    fat: Math.round(m.fat),
  };
}

export interface WeeklyPlan {
  days: { name: string; plan: MealPlan }[];
}

export function defaultWeeklyPlan(): WeeklyPlan {
  // 7-day variety using provided foods
  const D = (
    name: string,
    meals: MealPlan["meals"]
  ): { name: string; plan: MealPlan } => ({ name, plan: { meals } });
  return {
    days: [
      D("Day 1", defaultMealPlan().meals),
      D("Day 2", [
        {
          name: "Meal 1",
          items: [
            { foodId: "oats", amount: 90 },
            { foodId: "yogurt", amount: 250 },
            { foodId: "eggs", amount: 2 },
          ],
        },
        {
          name: "Meal 2",
          items: [
            { foodId: "chicken_breast", amount: 220 },
            { foodId: "rice_cooked", amount: 220 },
            { foodId: "salad", amount: 250 },
          ],
        },
        {
          name: "Meal 3",
          items: [
            { foodId: "tuna", amount: 180 },
            { foodId: "pasta_cooked", amount: 180 },
          ],
        },
        {
          name: "Meal 4",
          items: [
            { foodId: "burger_meat", amount: 180 },
            { foodId: "potato_boiled", amount: 300 },
          ],
        },
      ]),
      D("Day 3", [
        {
          name: "Meal 1",
          items: [
            { foodId: "oats", amount: 100 },
            { foodId: "yogurt", amount: 200 },
          ],
        },
        {
          name: "Meal 2",
          items: [
            { foodId: "chicken_breast", amount: 200 },
            { foodId: "lentils_cooked", amount: 200 },
            { foodId: "salad", amount: 250 },
          ],
        },
        {
          name: "Meal 3",
          items: [
            { foodId: "tuna", amount: 150 },
            { foodId: "rice_cooked", amount: 250 },
          ],
        },
        {
          name: "Meal 4",
          items: [
            { foodId: "burger_meat", amount: 160 },
            { foodId: "pasta_cooked", amount: 220 },
          ],
        },
      ]),
      D("Day 4", [
        {
          name: "Meal 1",
          items: [
            { foodId: "eggs", amount: 3 },
            { foodId: "oats", amount: 80 },
            { foodId: "yogurt", amount: 200 },
          ],
        },
        {
          name: "Meal 2",
          items: [
            { foodId: "chicken_breast", amount: 220 },
            { foodId: "potato_boiled", amount: 350 },
            { foodId: "salad", amount: 250 },
          ],
        },
        {
          name: "Meal 3",
          items: [
            { foodId: "tuna", amount: 170 },
            { foodId: "oats", amount: 60 },
          ],
        },
        {
          name: "Meal 4",
          items: [
            { foodId: "beans_canned", amount: 250 },
            { foodId: "rice_cooked", amount: 250 },
          ],
        },
      ]),
      D("Day 5", [
        {
          name: "Meal 1",
          items: [
            { foodId: "oats", amount: 100 },
            { foodId: "yogurt", amount: 200 },
          ],
        },
        {
          name: "Meal 2",
          items: [
            { foodId: "burger_meat", amount: 200 },
            { foodId: "rice_cooked", amount: 250 },
            { foodId: "salad", amount: 250 },
          ],
        },
        {
          name: "Meal 3",
          items: [
            { foodId: "chicken_breast", amount: 200 },
            { foodId: "pasta_cooked", amount: 220 },
          ],
        },
        {
          name: "Meal 4",
          items: [
            { foodId: "yogurt", amount: 250 },
            { foodId: "oats", amount: 60 },
          ],
        },
      ]),
      D("Day 6", [
        {
          name: "Meal 1",
          items: [
            { foodId: "eggs", amount: 3 },
            { foodId: "oats", amount: 90 },
          ],
        },
        {
          name: "Meal 2",
          items: [
            { foodId: "chicken_breast", amount: 220 },
            { foodId: "rice_cooked", amount: 300 },
          ],
        },
        {
          name: "Meal 3",
          items: [
            { foodId: "tuna", amount: 150 },
            { foodId: "beans_canned", amount: 200 },
          ],
        },
        {
          name: "Meal 4",
          items: [
            { foodId: "pasta_cooked", amount: 250 },
            { foodId: "salad", amount: 250 },
          ],
        },
      ]),
      D("Day 7", [
        {
          name: "Meal 1",
          items: [
            { foodId: "yogurt", amount: 250 },
            { foodId: "oats", amount: 100 },
          ],
        },
        {
          name: "Meal 2",
          items: [
            { foodId: "burger_meat", amount: 180 },
            { foodId: "potato_boiled", amount: 350 },
            { foodId: "salad", amount: 250 },
          ],
        },
        {
          name: "Meal 3",
          items: [
            { foodId: "chicken_breast", amount: 200 },
            { foodId: "rice_cooked", amount: 250 },
          ],
        },
        {
          name: "Meal 4",
          items: [
            { foodId: "tuna", amount: 150 },
            { foodId: "pasta_cooked", amount: 220 },
          ],
        },
      ]),
    ],
  };
}

export function weeklyTotals(weekly: WeeklyPlan) {
  return weekly.days.map((d) => mealPlanTotals(d.plan));
}
