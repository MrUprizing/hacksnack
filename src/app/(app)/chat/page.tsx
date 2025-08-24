"use client";

import { useChat } from "@ai-sdk/react";
import { Bot, Send, User } from "lucide-react";
import { useState } from "react";
import { FoodComparison } from "@/components/chat-blocks/food-comparison";
import { Weather } from "@/components/tools/weather";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DailyProgressBar } from "@/components/tools/daily-progress";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";

export default function Page() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Nutrition AI Chat</h1>
        <p className="text-muted-foreground text-sm">
          Pregunta sobre tus alimentos y nutrición
        </p>
      </div>

      {/* Messages Area */}
      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Bot className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>¡Hola! Soy tu asistente de nutrición AI.</p>
            <p className="text-sm">
              Pregúntame sobre alimentos, recetas o nutrición.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            )}

            <div
              className={cn(
                "space-y-2",
                message.role === "user" ? "max-w-[50%]" : "max-w-full flex-1",
              )}
            >
              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <Card
                      key={`${message.id}-text-${index}`}
                      className={cn(
                        "p-3 text-sm w-fit",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-card max-w-[70%]",
                      )}
                    >
                      <Markdown className="prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs">
                        {part.text}
                      </Markdown>
                    </Card>
                  );
                }

                if (part.type === "tool-displayWeather") {
                  switch (part.state) {
                    case "input-available":
                      return (
                        <Card
                          key={`${message.id}-weather-loading-${index}`}
                          className="p-3 bg-muted w-fit"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">
                              Cargando información del clima...
                            </span>
                          </div>
                        </Card>
                      );
                    case "output-available":
                      return (
                        <Card
                          key={`${message.id}-weather-${index}`}
                          className="p-3 bg-muted w-fit"
                        >
                          <Weather {...(part.output as any)} />
                        </Card>
                      );
                    case "output-error":
                      return (
                        <Card
                          key={`${message.id}-weather-error-${index}`}
                          className="p-3 bg-destructive/10 border-destructive w-fit"
                        >
                          <p className="text-destructive text-sm">
                            Error: {part.errorText}
                          </p>
                        </Card>
                      );
                    default:
                      return null;
                  }
                }

                if (part.type === "tool-compareFoods") {
                  switch (part.state) {
                    case "input-available":
                      return (
                        <Card
                          key={`${message.id}-food-loading-${index}`}
                          className="p-3 bg-muted w-fit"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">
                              Comparando alimentos...
                            </span>
                          </div>
                        </Card>
                      );
                    case "output-available":
                      return (
                        <div
                          key={`${message.id}-food-${index}`}
                          className="w-full"
                        >
                          <FoodComparison {...(part.output as any)} />
                        </div>
                      );
                    case "output-error":
                      return (
                        <Card
                          key={`${message.id}-food-error-${index}`}
                          className="p-3 bg-destructive/10 border-destructive w-fit"
                        >
                          <p className="text-destructive text-sm">
                            Error: {part.errorText}
                          </p>
                        </Card>
                      );
                    default:
                      return null;
                  }
                }
                if (part.type === "tool-dailyProgress") {
                  if (part.state === "output-available") {
                    const { goal, total } = part.output as any;
                    return (
                      <Card
                        key={`${message.id}-progress-${index}`}
                        className="p-3 bg-muted w-fit"
                      >
                        <DailyProgressBar
                          calories={total.calories}
                          caloriesGoal={goal.caloriesGoal}
                          protein={total.protein}
                          proteinGoal={goal.proteinGoal}
                          onAddFood={() => {
                            // Aquí puedes abrir un modal o navegar a la pantalla de agregar comida
                          }}
                        />
                      </Card>
                    );
                  }
                  if (part.state === "input-available") {
                    return (
                      <Card
                        key={`${message.id}-progress-loading-${index}`}
                        className="p-3 bg-muted w-fit"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm">
                            Cargando progreso diario...
                          </span>
                        </div>
                      </Card>
                    );
                  }
                  if (part.state === "output-error") {
                    return (
                      <Card
                        key={`${message.id}-progress-error-${index}`}
                        className="p-3 bg-destructive/10 border-destructive w-fit"
                      >
                        <p className="text-destructive text-sm">
                          Error: {part.errorText}
                        </p>
                      </Card>
                    );
                  }
                }

                return null;
              })}
            </div>

            {message.role === "user" && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bottom-0">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 max-w-4xl mx-auto pb-6"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta sobre nutrición..."
            className="flex-1"
            autoFocus
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
