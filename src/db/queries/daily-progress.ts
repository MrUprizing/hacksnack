import { db } from "@/db";
import { goals, foodEntry } from "../schema";
import { eq, and, gte, lte } from "drizzle-orm";

export async function getDailyProgress(
  userId: string,
  date: Date = new Date(),
) {
  // Obtener la meta del usuario
  const [goal] = await db
    .select()
    .from(goals)
    .where(eq(goals.userId, userId))
    .limit(1);

  // Calcular el rango de hoy
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  // Sumar los alimentos de hoy
  const entries = await db
    .select()
    .from(foodEntry)
    .where(
      and(
        eq(foodEntry.userId, userId),
        gte(foodEntry.consumedAt, start),
        lte(foodEntry.consumedAt, end),
      ),
    );

  const total = entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + (entry.calories || 0),
      protein: acc.protein + (entry.protein || 0),
    }),
    { calories: 0, protein: 0 },
  );

  return { goal, total };
}
