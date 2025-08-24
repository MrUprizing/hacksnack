import { db } from "@/db";
import { foodEntry } from "../schema";

type NewFoodEntry = {
  userId: string;
  imageUrl?: string;
  description: string;
  calories: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  mealType?: string;
};

export async function addFoodEntry(data: NewFoodEntry) {
  // Inserta una nueva entrada de alimento en la base de datos
  const [entry] = await db
    .insert(foodEntry)
    .values({
      userId: data.userId,
      imageUrl: data.imageUrl,
      description: data.description,
      calories: data.calories,
      protein: data.protein ?? 0,
      carbohydrates: data.carbohydrates ?? 0,
      fat: data.fat ?? 0,
      fiber: data.fiber ?? 0,
      sugar: data.sugar ?? 0,
      sodium: data.sodium ?? 0,
      mealType: data.mealType,
    })
    .returning();
  return entry;
}
