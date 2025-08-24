import { tool as createTool } from "ai";
import { getFoodEntriesByUserId } from "@/db/queries/food-entry";
import { headers } from "next/headers";
import { z } from "zod";
import { analyzeFoodImage } from "@/ai/vision";
import { addFoodEntry } from "@/db/mutations/food-entry";
import { createGoal, updateGoal } from "@/db/mutations/goals";
import { getDailyProgress } from "@/db/queries/daily-progress";
import { getGoalByUserId } from "@/db/queries/goals";
import { auth } from "@/lib/auth";
import { generateJsxFromDescription } from "./v0";

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
    } catch (_error) {
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

export const smartSuggestionsTool = createTool({
  description:
    "Show a carousel of 3 smart food suggestions with protein grams, you must provide the suggestions",
  inputSchema: z.object({
    suggestions: z
      .array(
        z.object({
          name: z.string().describe("Food name"),
          emoji: z.string().describe("Emoji for the food"),
          protein: z.number().describe("Protein in grams"),
        }),
      )
      .length(3)
      .describe("Array of 3 food suggestions"),
    context: z
      .string()
      .optional()
      .describe("Context or reason for the suggestion"),
  }),
  execute: async ({ suggestions, context }) => {
    // Solo retorna los datos, la IA ya los calculó
    return { suggestions, context };
  },
});

export const logFoodImage = createTool({
  description:
    "Save a food entry to the database by analyzing a food image. Only provide the public image URL as input. The tool will analyze the image and extract nutrition data automatically. ",
  inputSchema: z.object({
    imageUrl: z.string().describe("Public URL of the uploaded food image"),
  }),
  execute: async ({ imageUrl }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id || "anonymous";
    try {
      // Analiza la imagen con IA y obtiene el JSON nutricional
      const nutrition = await analyzeFoodImage(imageUrl);

      // nutrition debe tener: description, calories, protein, carbohydrates, fat, fiber, sugar, sodium, mealType
      const entry = await addFoodEntry({
        userId,
        imageUrl,
        description: nutrition.description,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbohydrates: nutrition.carbohydrates,
        fat: nutrition.fat,
        fiber: nutrition.fiber,
        sugar: nutrition.sugar,
        sodium: nutrition.sodium,
        mealType: nutrition.mealType ?? undefined,
      });

      return {
        success: true,
        entry,
        message: `✅ Food entry saved successfully: ${nutrition.description}`,
        nutrition,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Error saving food entry: ${error.message}`,
      };
    }
  },
});

export const renderJsxTool = createTool({
  description: `This tool receives a plain English description of the UI component to generate, along with the data to display. It uses an LLM to generate the JSX code dynamically. Do not return JSX directly, just describe what you want to render and provide the data.`,
  inputSchema: z.object({
    description: z
      .string()
      .describe(
        "A plain English description of what to render, including style instructions.",
      ),
    data: z
      .any()
      .describe("The data needed to render the component, as a JSON object."),
  }),
  execute: async ({ description, data }) => {
    const { text: jsx } = await generateJsxFromDescription(description, data);
    return { jsx };
  },
});

export const getAllFoodEntriesTool = createTool({
  description: "Get all food entries for the current authenticated user",
  inputSchema: z.object({}), // No input necesario
  execute: async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id || "anonymous";
    try {
      const entries = await getFoodEntriesByUserId(userId);
      return {
        success: true,
        entries,
        message: `✅ Retrieved all food entries for user.`,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Error retrieving food entries: ${error.message}`,
      };
    }
  },
});

export const tools = {
  compareFoods: foodComparisonTool,
  logFood: logFoodText,
  createGoal: createGoalTool,
  editGoal: editGoalTool,
  viewGoal: viewGoalTool,
  dailyProgress: dailyProgressTool,
  smartSuggestions: smartSuggestionsTool,
  logFoodImage: logFoodImage,
  getAllFoodEntries: getAllFoodEntriesTool,
  renderJsx: renderJsxTool,
};
