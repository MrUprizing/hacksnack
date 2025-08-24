import { CheckCircle2, Heart, Trophy, XCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FoodComparisonProps {
  food1: {
    name: string;
    emoji: string;
    calories: number;
    pros: string;
    cons: string;
  };
  food2: {
    name: string;
    emoji: string;
    calories: number;
    pros: string;
    cons: string;
  };
}

export function FoodComparison({ food1, food2 }: FoodComparisonProps) {
  const winner = food1.calories < food2.calories ? food1 : food2;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <Zap className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <span className="break-words text-center">
            {food1.name} vs {food2.name}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-2">
            <div className="text-3xl mb-2">{food1.emoji}</div>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 justify-center text-xs"
            >
              <Heart className="h-3 w-3" />
              {food1.calories} kcal
            </Badge>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl mb-2">{food2.emoji}</div>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 justify-center text-xs"
            >
              <Heart className="h-3 w-3" />
              {food2.calories} kcal
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-green-600 bg-green-50 p-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium break-words leading-tight">
                  {food1.pros}
                </span>
              </div>
              <div className="flex items-start gap-2 text-red-500 bg-red-50 p-2 rounded-lg">
                <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium break-words leading-tight">
                  {food1.cons}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-green-600 bg-green-50 p-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium break-words leading-tight">
                  {food2.pros}
                </span>
              </div>
              <div className="flex items-start gap-2 text-red-500 bg-red-50 p-2 rounded-lg">
                <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium break-words leading-tight">
                  {food2.cons}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="text-center">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-3 py-2 text-sm font-semibold">
            <Trophy className="h-4 w-4 mr-2" />
            <span className="break-words">Ganador: {winner.name}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
