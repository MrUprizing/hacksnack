import { Card } from "@/components/ui/card";

type Suggestion = {
  name: string;
  emoji: string;
  protein: number;
};

type SmartSuggestionsCarouselProps = {
  suggestions: Suggestion[];
  context?: string;
};

export function SmartSuggestionsCarousel({
  suggestions,
  context,
}: SmartSuggestionsCarouselProps) {
  return (
    <Card className="p-4 w-full max-w-md mx-auto bg-muted border-none shadow-sm">
      {context && (
        <div className="font-medium text-primary mb-2">{context}</div>
      )}
      <div className="flex gap-3 justify-between">
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-background rounded-lg px-3 py-2 shadow-sm min-w-[80px]"
          >
            <span className="text-3xl mb-1">{s.emoji}</span>
            <span className="text-sm font-semibold">{s.name}</span>
            <span className="text-xs text-muted-foreground">+{s.protein}g</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
