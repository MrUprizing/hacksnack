import { desc, eq } from "drizzle-orm";
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
