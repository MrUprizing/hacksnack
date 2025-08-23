"use server";

import { anthropic } from "@ai-sdk/anthropic";
import { getMutableAIState, streamUI } from "@ai-sdk/rsc";
import type { ReactNode } from "react";
import { z } from "zod";

export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
};

const ShowNumberComponent = ({ number }: { number: number }) => (
  <div className="border p-2 rounded bg-card text-xl text-center">{number}</div>
);

export async function streamChatMessage(input: string): Promise<ClientMessage> {
  const history = getMutableAIState();

  const result = await streamUI({
    model: anthropic("claude-3-haiku-20240307"),
    messages: [...history.get(), { role: "user", content: input }],
    system:
      "Eres un asistente útil. Responde en español a lo que sea y si te dan un numeor usas la tool",
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }
      return (
        <div className="bg-green-100 text-green-900 p-3 rounded-lg">
          {content}
        </div>
      );
    },
    tools: {
      showNumber: {
        description: "Muestra un número en pantalla dentro de un div grande",
        inputSchema: z.object({ number: z.number() }),
        generate: async ({ number }) => <ShowNumberComponent number={number} />,
      },
      showLetters: {
        description: "Muestra una letra que da el usuario",
        inputSchema: z.object({ letter: z.string() }),
        generate: async ({ letter }) => (
          <div>
            hola
            <div className="border p-2 rounded bg-white text-black text-xl text-center">
              {letter}
            </div>
          </div>
        ),
      },
    },
  });

  return {
    id: Date.now().toString() + "-ai",
    role: "assistant",
    display: result.value,
  };
}
