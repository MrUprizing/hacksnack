import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type DailyProgressBarProps = {
  calories: number;
  caloriesGoal: number;
  protein: number;
  proteinGoal: number;
  onAddFood?: () => void;
};

export function DailyProgressBar({
  calories,
  caloriesGoal,
  protein,
  proteinGoal,
  onAddFood,
}: DailyProgressBarProps) {
  const caloriesPercent = Math.min((calories / caloriesGoal) * 100, 100);
  const proteinPercent = Math.min((protein / proteinGoal) * 100, 100);

  return (
    <Card className="p-4 w-full max-w-md mx-auto bg-muted border-none shadow-sm">
      <div className="font-semibold text-lg mb-2 text-primary">
        Progreso de hoy
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Calorías</span>
          <span>
            {calories.toLocaleString()}/{caloriesGoal.toLocaleString()}
          </span>
        </div>
        <Progress value={caloriesPercent} className="h-2 bg-background" />
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Proteína</span>
          <span>
            {protein}/{proteinGoal}g
          </span>
        </div>
        <Progress value={proteinPercent} className="h-2 bg-background" />
      </div>
    </Card>
  );
}
