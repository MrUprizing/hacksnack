import { tool as createTool } from "ai";
import { z } from "zod";

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

export const tools = {
  displayWeather: weatherTool,
  compareFoods: foodComparisonTool,
};
