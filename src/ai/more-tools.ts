import { generateText, tool } from "ai";
import { z } from "zod";

export const moreToolsGenerate = async (task: string) => {
  return await generateText({
    model: "anthropic/claude-3-haiku-20240307",
    tools: {
      weather: tool({
        description: "Get the weather in a location",
        inputSchema: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      }),
    },
    prompt: task,
  });
};
