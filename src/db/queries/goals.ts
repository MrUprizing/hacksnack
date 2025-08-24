import { eq } from "drizzle-orm";
import { db } from "@/db";
import { goals } from "../schema";

export async function getGoalByUserId(userId: string) {
  const result = await db
    .select()
    .from(goals)
    .where(eq(goals.userId, userId))
    .limit(1);

  return result[0] || null;
}
