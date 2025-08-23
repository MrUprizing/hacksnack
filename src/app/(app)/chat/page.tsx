"use client";

import { useActions, useUIState } from "@ai-sdk/rsc";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useUIState();
  // biome-ignore lint/suspicious/noExplicitAny: <Ai sdk>
  const { streamChatMessage } = useActions() as any;
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, []);

  return (
    <div className="flex flex-col h-full ">
      {/* Header */}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {conversation.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <Bot className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  ¡Hola! Soy tu asistente de nutrición
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Puedo ayudarte a registrar tus alimentos, analizar tu dieta y
                  darte consejos nutricionales personalizados.
                </p>
              </div>
            </div>
          )}

          {conversation.map((message: any) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <Avatar className="h-8 w-8 border">
                {message.role === "user" ? (
                  <>
                    <AvatarImage src="/user-avatar.png" alt="Usuario" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </>
                )}
              </Avatar>

              {/* Message Content */}
              <div
                className={`flex flex-col max-w-[80%] ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground px-4 py-2"
                      : "bg-muted"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="whitespace-pre-wrap text-sm">
                      {message.display}
                    </p>
                  ) : (
                    <div className="text-sm">{message.display}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t backdrop-blur p-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!input.trim()) return;

            setConversation((current: any[]) => [
              ...current,
              {
                id: `${Date.now().toString()}-user`,
                role: "user",
                display: input,
              },
            ]);

            const message = await streamChatMessage(input);
            setConversation((current: any[]) => [...current, message]);
            setInput("");
          }}
          className="max-w-4xl mx-auto flex items-center gap-2"
        >
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cuéntame qué comiste hoy o pregúntame sobre nutrición..."
              className="pr-12 min-h-[44px] resize-none"
              aria-label="Campo de texto para enviar un mensaje"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-[44px] w-[44px]"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
