import { tool as createTool } from "ai";
import { getDailyProgress } from "@/db/queries/daily-progress";
import { headers } from "next/headers";
import { z } from "zod";
import { addFoodEntry } from "@/db/mutations/food-entry";
import { createGoal, updateGoal } from "@/db/mutations/goals";
import { getGoalByUserId } from "@/db/queries/goals";
import { auth } from "@/lib/auth";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  inputSchema: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async ({ location }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: "Sunny", temperature: 75, location };
  },
});

export const logFoodText = createTool({
  description: "Save a food entry to the database when the user eats that food",
  inputSchema: z.object({
    foodName: z.string().describe("Name of the food item"),
    calories: z.number().describe("Calories per serving"),
    protein: z.number().describe("Protein content in grams"),
    carbs: z.number().describe("Carbohydrate content in grams"),
    fat: z.number().describe("Fat content in grams"),
    mealType: z.string().optional().describe("Type of meal"),
  }),
  execute: async ({ foodName, calories, protein, carbs, fat, mealType }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id || "anonymous";
    try {
      // Guardar en la base de datos usando la mutación real
      const entry = await addFoodEntry({
        userId,
        description: foodName,
        calories,
        protein,
        carbohydrates: carbs,
        fat,
        mealType,
      });

      return {
        success: true,
        entry,
        message: `✅ Registré exitosamente: ${foodName}`,
        nutritionSummary: {
          calories,
          protein,
          carbs,
          fat,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Error al registrar la comida`,
      };
    }
  },
});

export const foodComparisonTool = createTool({
  description:
    "Compare two foods nutritionally and provide pros and cons for each",
  inputSchema: z.object({
    food1: z.object({
      name: z.string().describe("Name of the first food"),
      emoji: z.string().describe("Emoji representing the first food"),
      calories: z.number().describe("Calories per serving of the first food"),
      pros: z.string().describe("Main nutritional benefits of the first food"),
      cons: z.string().describe("Main nutritional drawbacks of the first food"),
    }),
    food2: z.object({
      name: z.string().describe("Name of the second food"),
      emoji: z.string().describe("Emoji representing the second food"),
      calories: z.number().describe("Calories per serving of the second food"),
      pros: z.string().describe("Main nutritional benefits of the second food"),
      cons: z
        .string()
        .describe("Main nutritional drawbacks of the second food"),
    }),
  }),
  execute: async ({ food1, food2 }) => {
    // Simular tiempo de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { food1, food2 };
  },
});

export const createGoalTool = createTool({
  description: "Create a nutrition goal for the current user",
  inputSchema: z.object({
    goal: z.enum(["lose", "maintain", "gain"]).describe("Goal type"),
    caloriesGoal: z.number().optional().describe("Daily calories goal"),
    proteinGoal: z.number().optional().describe("Daily protein goal (grams)"),
    carbsGoal: z.number().optional().describe("Daily carbs goal (grams)"),
    fatGoal: z.number().optional().describe("Daily fat goal (grams)"),
  }),
  execute: async ({ goal, caloriesGoal, proteinGoal, carbsGoal, fatGoal }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id || "anonymous";
    try {
      const newGoal = await createGoal({
        userId,
        goal,
        caloriesGoal,
        proteinGoal,
        carbsGoal,
        fatGoal,
      });
      return {
        success: true,
        message: `✅ Goal created successfully`,
        goal: newGoal,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Error creating goal: ${error.message}`,
      };
    }
  },
});

// Tool para editar una goal
export const editGoalTool = createTool({
  description: "Edit the nutrition goal for the current user",
  inputSchema: z.object({
    goal: z.enum(["lose", "maintain", "gain"]).optional().describe("Goal type"),
    caloriesGoal: z.number().optional().describe("Daily calories goal"),
    proteinGoal: z.number().optional().describe("Daily protein goal (grams)"),
    carbsGoal: z.number().optional().describe("Daily carbs goal (grams)"),
    fatGoal: z.number().optional().describe("Daily fat goal (grams)"),
  }),
  execute: async ({ goal, caloriesGoal, proteinGoal, carbsGoal, fatGoal }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id || "anonymous";
    try {
      const updatedGoal = await updateGoal({
        userId,
        goal,
        caloriesGoal,
        proteinGoal,
        carbsGoal,
        fatGoal,
      });
      return {
        success: true,
        message: `✅ Goal updated successfully`,
        goal: updatedGoal,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Error updating goal: ${error.message}`,
      };
    }
  },
});

export const viewGoalTool = createTool({
  description: "View the current nutrition goal for the authenticated user",
  inputSchema: z.object({}), // No necesita input
  execute: async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id || "anonymous";
    const goal = await getGoalByUserId(userId);
    if (!goal) {
      return {
        success: false,
        message: "No nutrition goal found for this user.",
      };
    }
    return {
      success: true,
      message: "Nutrition goal retrieved successfully.",
      goal,
    };
  },
});

export const dailyProgressTool = createTool({
  description:
    "Show the user's daily nutrition progress (calories and protein)",
  inputSchema: z.object({}), // No input necesario
  execute: async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id || "anonymous";
    const { goal, total } = await getDailyProgress(userId);
    if (!goal) {
      return {
        success: false,
        message: "No nutrition goal found for this user.",
      };
    }
    return {
      success: true,
      goal,
      total,
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
  compareFoods: foodComparisonTool,
  logFood: logFoodText,
  createGoal: createGoalTool,
  editGoal: editGoalTool,
  viewGoal: viewGoalTool,
  dailyProgress: dailyProgressTool,
};
