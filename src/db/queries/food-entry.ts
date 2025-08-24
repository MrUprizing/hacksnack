import { db } from "@/db";
import { foodEntry } from "../schema";
import { eq, desc } from "drizzle-orm";

export async function getFoodEntriesByUserId(userId: string) {
  const result = await db
    .select()
    .from(foodEntry)
    .where(eq(foodEntry.userId, userId))
    .orderBy(desc(foodEntry.consumedAt));

  return result;
}
