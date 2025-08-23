import { createAI } from "@ai-sdk/rsc";
import type { ReactNode } from "react";
import { streamChatMessage } from "@/ai/actions";

export type AIState = {
  role: "user" | "assistant";
  content: string;
}[];

export type UIState = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}[];

// Crear la instancia AI con las acciones
export const AI = createAI<AIState, UIState>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    streamChatMessage,
  },
});

// Exportar el tipo de AI para usar en useActions
export type AIActions = typeof AI;
