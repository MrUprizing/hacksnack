import { eq } from "drizzle-orm";
import { db } from "@/db"; // Asegúrate de que esta sea la instancia de Drizzle
import { goals } from "../schema";

type CreateGoalInput = {
  userId: string;
  goal?: "lose" | "maintain" | "gain";
  caloriesGoal?: number;
  proteinGoal?: number;
  carbsGoal?: number;
  fatGoal?: number;
};

export async function createGoal(input: CreateGoalInput) {
  const existing = await db
    .select()
    .from(goals)
    .where(eq(goals.userId, input.userId));
  if (existing.length > 0) throw new Error("Goal already exists for this user");

  const [newGoal] = await db
    .insert(goals)
    .values({
      userId: input.userId,
      goal: input.goal,
      caloriesGoal: input.caloriesGoal,
      proteinGoal: input.proteinGoal,
      carbsGoal: input.carbsGoal,
      fatGoal: input.fatGoal,
    })
    .returning();

  return newGoal;
}

type UpdateGoalInput = {
  userId: string;
  goal?: "lose" | "maintain" | "gain";
  caloriesGoal?: number;
  proteinGoal?: number;
  carbsGoal?: number;
  fatGoal?: number;
};

export async function updateGoal(input: UpdateGoalInput) {
  // Construir el objeto de actualización solo con los campos definidos
  const updateData: Partial<Omit<UpdateGoalInput, "userId">> = {};
  if (input.goal !== undefined) updateData.goal = input.goal;
  if (input.caloriesGoal !== undefined)
    updateData.caloriesGoal = input.caloriesGoal;
  if (input.proteinGoal !== undefined)
    updateData.proteinGoal = input.proteinGoal;
  if (input.carbsGoal !== undefined) updateData.carbsGoal = input.carbsGoal;
  if (input.fatGoal !== undefined) updateData.fatGoal = input.fatGoal;

  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields to update");
  }

  const [updatedGoal] = await db
    .update(goals)
    .set(updateData)
    .where(eq(goals.userId, input.userId))
    .returning();

  if (!updatedGoal) {
    throw new Error("Goal not found for this user");
  }

  return updatedGoal;
}
