import { anthropic } from "@ai-sdk/anthropic";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { tools } from "@/ai/tools";

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: anthropic("claude-3-haiku-20240307"),
    system:
      "You are an assistant specialized in nutrition and healthy eating. Try to use the renderJsxTool a lot and, if necessary, combine it with others to provide a better experience. Pass the data as you see fit. Also, if you call another tool, use renderJsxTool to display the data.",
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse();
}
