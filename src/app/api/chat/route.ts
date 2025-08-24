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
      "Responde en markdown los text Eres un asistente especializado en nutrición y alimentación saludable. Puedes comparar alimentos, proporcionar información nutricional y ayudar con decisiones alimentarias. Cuando compares alimentos, asegúrate de proporcionar información precisa sobre calorías, pros y contras nutricionales. ",
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse();
}
