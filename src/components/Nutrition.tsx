"use client";

import React from "react";
import { Button, Input, Panel, Select, Tag } from "@/components/ui";
import {
  FOODS,
  NutritionSettings,
  buildTargets,
  defaultMealPlan,
  defaultWeeklyPlan,
  estimateTDEE,
  mealPlanTotals,
  MealItem,
  MealPlan,
  WeeklyPlan,
  weeklyTotals,
} from "@/lib/nutrition";

export default function Nutrition() {
  const [settings, setSettings] = React.useState<NutritionSettings>({
    weightKg: 83,
    heightCm: 176,
    bodyFatPercent: 20,
    activityFactor: 1.6, // developer + 2 football/week
    footballPerWeek: 2,
    kcalSurplus: 300,
    proteinPerKg: 2.2,
    fatPerKg: 0.8,
  });
  const [plan, setPlan] = React.useState<MealPlan>(defaultMealPlan());
  const [weekly, setWeekly] = React.useState<WeeklyPlan>(defaultWeeklyPlan());

  const tdee = estimateTDEE(settings);
  const targets = buildTargets(settings, tdee);
  const totals = mealPlanTotals(plan);

  function adjustItem(mIdx: number, iIdx: number, amount: number) {
    setPlan((p) => {
      const copy = structuredClone(p) as MealPlan;
      copy.meals[mIdx].items[iIdx].amount = amount;
      return copy;
    });
  }

  function addItem(mIdx: number) {
    setPlan((p) => {
      const copy = structuredClone(p) as MealPlan;
      copy.meals[mIdx].items.push({ foodId: "chicken_breast", amount: 100 });
      return copy;
    });
  }

  function removeItem(mIdx: number, iIdx: number) {
    setPlan((p) => {
      const copy = structuredClone(p) as MealPlan;
      copy.meals[mIdx].items.splice(iIdx, 1);
      return copy;
    });
  }

  return (
    <Panel>
      <h2 className="text-lg font-semibold mb-2">Nutrition (Clean Bulk)</h2>
      <div className="grid md:grid-cols-3 gap-3">
        <Panel>
          <h3 className="font-semibold mb-2">Your Stats</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Weight (kg)"
              type="number"
              value={String(settings.weightKg)}
              onChange={(e) =>
                setSettings({ ...settings, weightKg: Number(e.target.value) })
              }
            />
            <Input
              label="Height (cm)"
              type="number"
              value={String(settings.heightCm)}
              onChange={(e) =>
                setSettings({ ...settings, heightCm: Number(e.target.value) })
              }
            />
            <Input
              label="Body Fat (%)"
              type="number"
              value={String(settings.bodyFatPercent)}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bodyFatPercent: Number(e.target.value),
                })
              }
            />
            <Input
              label="Football sessions per week"
              type="number"
              value={String(settings.footballPerWeek)}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  footballPerWeek: Number(e.target.value),
                })
              }
            />
            <Input
              label="Daily activity factor (1.2-1.9)"
              type="number"
              step="0.1"
              value={String(settings.activityFactor)}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  activityFactor: Number(e.target.value),
                })
              }
            />
            <Input
              label="Calorie surplus (kcal)"
              type="number"
              value={String(settings.kcalSurplus)}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  kcalSurplus: Number(e.target.value),
                })
              }
            />
            <Input
              label="Protein target (g/kg bodyweight)"
              type="number"
              step="0.1"
              value={String(settings.proteinPerKg)}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  proteinPerKg: Number(e.target.value),
                })
              }
            />
            <Input
              label="Fat target (g/kg bodyweight)"
              type="number"
              step="0.1"
              value={String(settings.fatPerKg)}
              onChange={(e) =>
                setSettings({ ...settings, fatPerKg: Number(e.target.value) })
              }
            />
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <div>
              <b>Total Daily Energy Expenditure (TDEE):</b> {tdee} kcal/day
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-white border border-gray-200 rounded-lg p-2">
                <div className="text-xs text-gray-500">
                  Daily target calories
                </div>
                <div className="text-lg font-semibold">{targets.kcal}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-2">
                <div className="text-xs text-gray-500">Protein</div>
                <div className="text-lg font-semibold">{targets.protein} g</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-2">
                <div className="text-xs text-gray-500">Carbohydrates</div>
                <div className="text-lg font-semibold">{targets.carbs} g</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-2">
                <div className="text-xs text-gray-500">Fat</div>
                <div className="text-lg font-semibold">{targets.fat} g</div>
              </div>
            </div>
          </div>
        </Panel>

        <div className="md:col-span-2">
          <Panel>
            <h3 className="font-semibold mb-2">Meal Plan (Editable)</h3>
            <div className="space-y-4">
              {plan.meals.map((meal, mIdx) => (
                <div key={mIdx} className="border-t border-gray-200 pt-3">
                  <div className="font-medium mb-2">{meal.name}</div>
                  <div className="grid gap-2">
                    {meal.items.map((it, iIdx) => (
                      <div key={iIdx} className="flex items-center gap-2">
                        <Select
                          value={it.foodId}
                          onChange={(e) => {
                            const val = e.target.value as keyof typeof FOODS;
                            setPlan((p) => {
                              const copy = structuredClone(p) as MealPlan;
                              copy.meals[mIdx].items[iIdx].foodId = val;
                              return copy;
                            });
                          }}
                        >
                          {Object.values(FOODS).map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.name}
                            </option>
                          ))}
                        </Select>
                        <Input
                          type="number"
                          value={String(it.amount)}
                          onChange={(e) =>
                            adjustItem(mIdx, iIdx, Number(e.target.value))
                          }
                          className="w-24"
                        />
                        <span className="text-xs text-gray-500">
                          {FOODS[it.foodId].unit}
                        </span>
                        <Button
                          variant="ghost"
                          onClick={() => removeItem(mIdx, iIdx)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <div>
                      <Button variant="ghost" onClick={() => addItem(mIdx)}>
                        + Add item
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <h3 className="font-semibold mb-2">Weekly Plan (7 days)</h3>
            <div className="space-y-4">
              {weekly.days.map((d, idx) => {
                const t = mealPlanTotals(d.plan);
                return (
                  <div key={idx} className="border-t border-gray-200 pt-3">
                    <div className="font-medium mb-2">{d.name}</div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="bg-white border border-gray-200 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Calories</div>
                        <div className="font-semibold">{t.kcal}</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Protein</div>
                        <div className="font-semibold">{t.protein} g</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Carbs</div>
                        <div className="font-semibold">{t.carbs} g</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Fat</div>
                        <div className="font-semibold">{t.fat} g</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Meals: {d.plan.meals.map((m) => m.name).join(", ")}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
          <div className="grid grid-cols-4 gap-2 mt-3">
            <div className="bg-white border border-gray-200 rounded-lg p-2">
              <div className="text-xs text-gray-500">Plan Calories</div>
              <div className="text-lg font-semibold">{totals.kcal}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-2">
              <div className="text-xs text-gray-500">Protein</div>
              <div className="text-lg font-semibold">{totals.protein} g</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-2">
              <div className="text-xs text-gray-500">Carbs</div>
              <div className="text-lg font-semibold">{totals.carbs} g</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-2">
              <div className="text-xs text-gray-500">Fat</div>
              <div className="text-lg font-semibold">{totals.fat} g</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Tip: Nudge oats/yogurt amounts up to meet carbs. Use
            chicken/tuna/burger to adjust protein. Keep salad generous for
            micronutrients.
          </div>
        </div>
      </div>
    </Panel>
  );
}
