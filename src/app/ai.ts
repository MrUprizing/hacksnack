import { createAI } from "@ai-sdk/rsc";
import { streamChatMessage } from "@/ai/actions"; // o la ruta correcta

export type AIState = { role: "user" | "assistant"; content: string }[];
export type UIState = {
  id: string;
  role: "user" | "assistant";
  content: string | React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    streamChatMessage, // <-- así debe estar registrada
  },
});
