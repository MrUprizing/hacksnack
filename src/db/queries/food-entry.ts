import { desc, eq, sql, sum } from "drizzle-orm";
import { db } from "@/db";
import { foodEntry } from "../schema";

export async function getFoodEntriesByUserId(userId: string) {
  const result = await db
    .select()
    .from(foodEntry)
    .where(eq(foodEntry.userId, userId))
    .orderBy(desc(foodEntry.consumedAt));

  return result;
}

export async function getNutritionTotalsByUserId(userId: string) {
  const [result] = await db
    .select({
      calories: sum(foodEntry.calories).as("calories"),
      protein: sum(foodEntry.protein).as("protein"),
      carbohydrates: sum(foodEntry.carbohydrates).as("carbohydrates"),
      fat: sum(foodEntry.fat).as("fat"),
    })
    .from(foodEntry)
    .where(eq(foodEntry.userId, userId));

  return result;
}

export async function getDailyMacrosByUserId(userId: string, days: number = 2) {
  const results = await db
    .select({
      date: sql`DATE(${foodEntry.consumedAt})`.as("date"),
      protein: sum(foodEntry.protein).as("protein"),
      carbohydrates: sum(foodEntry.carbohydrates).as("carbohydrates"),
      fat: sum(foodEntry.fat).as("fat"),
    })
    .from(foodEntry)
    .where(eq(foodEntry.userId, userId))
    .groupBy(sql`DATE(${foodEntry.consumedAt})`)
    .orderBy(desc(sql`DATE(${foodEntry.consumedAt})`))
    .limit(days);

  return results?.reverse() ?? [];
}
