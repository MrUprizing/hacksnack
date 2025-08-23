import {
  decimal,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export * from "./auth-schema";

import { user } from "./auth-schema";

export const profile = pgTable("profile", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  height: decimal("height", { precision: 5, scale: 2 }), // in cm
  weight: decimal("weight", { precision: 5, scale: 2 }), // in kg
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const goals = pgTable("goals", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  goal: varchar("goal", { length: 20 }).default("maintain"), // 'lose', 'maintain', 'gain'
  caloriesGoal: integer("calories_goal").default(2000),
  proteinGoal: real("protein_goal").default(80), // gramos
  carbsGoal: real("carbs_goal").default(250),
  fatGoal: real("fat_goal").default(65),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const foodEntry = pgTable("food_entry", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  imageUrl: text("image_url"), // URL de la imagen (Supabase Storage)
  description: text("description").notNull(), // Texto ingresado o generado por IA

  // Datos nutricionales
  calories: real("calories").notNull(),
  protein: real("protein").default(0), // gramos
  carbohydrates: real("carbohydrates").default(0),
  fat: real("fat").default(0),
  fiber: real("fiber").default(0),
  sugar: real("sugar").default(0),
  sodium: real("sodium").default(0), // mg

  // Metadatos
  mealType: varchar("meal_type", { length: 20 }), // 'breakfast', 'lunch', 'dinner', 'snack'

  // Tiempo
  consumedAt: timestamp("consumed_at").notNull(), // Cuándo se comió
  createdAt: timestamp("created_at").defaultNow(), // Cuándo se registró
  updatedAt: timestamp("updated_at").defaultNow(),
});
