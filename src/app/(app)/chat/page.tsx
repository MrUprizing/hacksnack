"use client";

import { useChat } from "@ai-sdk/react";
import { Bot, Send, User, Plus } from "lucide-react";
import { useState } from "react";
import { FoodComparison } from "@/components/chat-blocks/food-comparison";
import { DailyProgressBar } from "@/components/tools/daily-progress";
import { SmartSuggestionsCarousel } from "@/components/tools/smart-suggestions-carousel";
import { Weather } from "@/components/tools/weather";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Markdown } from "@/components/ui/markdown";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { UploadImageButton } from "@/components/upload-image";
import { cn } from "@/lib/utils";
import { JSXPreviewWithCapture } from "@/components/jsx-caputer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  // Esta función se pasa al botón de upload
  const handleImageUpload = (url: string) => {
    setInput(`Acabo de comer esto: '${url}'`);
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Goals</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="relative min-h-screen flex flex-col">
        {/* Fondo con efecto */}
        {messages.length === 0 && (
          <div className="absolute inset-0 z-20">
            <div className="w-full h-full">
              <TextHoverEffect text="CHAT" />
            </div>
          </div>
        )}

        <div className="px-6 pb-2 z-20">
          <h1 className="text-2xl font-semibold">Nutrition AI Chat</h1>
        </div>

        {/* Área de mensajes con scroll */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4 ">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 ">
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
                          "p-3 text-sm w-fit z-20",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-card max-w-[70%]",
                        )}
                      >
                        <Markdown className="prose z-20 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs">
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

                  if (part.type === "tool-smartSuggestions") {
                    if (part.state === "output-available") {
                      const { suggestions, context } = part.output as any;
                      return (
                        <Card
                          key={`${message.id}-suggestions-${index}`}
                          className="p-3 bg-muted w-fit"
                        >
                          <SmartSuggestionsCarousel
                            suggestions={suggestions}
                            context={context}
                          />
                        </Card>
                      );
                    }
                    if (part.state === "input-available") {
                      return (
                        <Card
                          key={`${message.id}-suggestions-loading-${index}`}
                          className="p-3 bg-muted w-fit"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">
                              Generando sugerencias inteligentes...
                            </span>
                          </div>
                        </Card>
                      );
                    }
                    if (part.state === "output-error") {
                      return (
                        <Card
                          key={`${message.id}-suggestions-error-${index}`}
                          className="p-3 bg-destructive/10 border-destructive w-fit"
                        >
                          <p className="text-destructive text-sm">
                            Error: {part.errorText}
                          </p>
                        </Card>
                      );
                    }
                  }
                  if (part.type === "tool-renderJsx") {
                    switch (part.state) {
                      case "input-available":
                        return (
                          <Card
                            key={`${message.id}-jsx-loading-${index}`}
                            className="p-3 bg-muted w-fit"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              <span className="text-sm">
                                Cargando bloque visual...
                              </span>
                            </div>
                          </Card>
                        );
                      case "output-available":
                        return (
                          <div key={`${message.id}-jsx-${index}`}>
                            <JSXPreviewWithCapture
                              jsx={(part.output as { jsx: string }).jsx}
                            />
                          </div>
                        );
                      case "output-error":
                        return (
                          <Card
                            key={`${message.id}-jsx-error-${index}`}
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
        <div className="flex items-center gap-2 px-6 mt-10 z-20">
          <UploadImageButton onUpload={handleImageUpload} />
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 max-w-4xl mx-auto pb-6 flex-1"
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
    </>
  );
}
