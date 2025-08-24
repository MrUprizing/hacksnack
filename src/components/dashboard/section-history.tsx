import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentMeals = [
  {
    name: "Pizza Margherita",
    timeAgo: "2 horas",
  },
  {
    name: "Ensalada César",
    timeAgo: "5 horas",
  },
  {
    name: "Tacos de Pollo",
    timeAgo: "1 día",
  },
];

export default function HistoricalMealsPage() {
  return (
    <Card className="shadow-lg max-h">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          Recient Meals
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentMeals.map((meal, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/50 border rounded-lg"
          >
            <span className="font-medium text-foreground">{meal.name}</span>
            <span className="text-sm text-muted-foreground">
              {meal.timeAgo}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
