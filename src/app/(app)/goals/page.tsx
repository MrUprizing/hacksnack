"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Beef, Wheat, Droplets, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NutritionGoals {
  goal: "lose" | "maintain" | "gain";
  caloriesGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export default function NutritionGoalsPage() {
  const [goals, setGoals] = useState<NutritionGoals>({
    goal: "maintain",
    caloriesGoal: 2000,
    proteinGoal: 80,
    carbsGoal: 250,
    fatGoal: 65,
  });

  const handleSaveGoals = () => {
    // Here you would typically save to your database
    console.log("Saving goals:", goals);
    // Show success message or redirect
  };

  const getGoalBadgeVariant = (goal: string) => {
    switch (goal) {
      case "lose":
        return "destructive";
      case "gain":
        return "secondary";
      default:
        return "default";
    }
  };

  const getGoalText = (goal: string) => {
    switch (goal) {
      case "lose":
        return "Perder Peso";
      case "gain":
        return "Ganar Peso";
      default:
        return "Mantener Peso";
    }
  };

  return (
    <TooltipProvider>
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
      <div className="min-h-screen p-4 md:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">
                Establece tus Objetivos Nutricionales
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tu camino hacia un estilo de vida saludable comienza aquí. Define
              tus metas nutricionales personalizadas.
            </p>
            <Badge
              variant={getGoalBadgeVariant(goals.goal)}
              className="text-sm px-4 py-2"
            >
              Objetivo Actual: {getGoalText(goals.goal)}
            </Badge>
          </div>

          {/* Goal Type Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Tipo de Objetivo
              </CardTitle>
              <CardDescription>
                Selecciona tu objetivo principal de peso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={goals.goal}
                onValueChange={(value: "lose" | "maintain" | "gain") =>
                  setGoals({ ...goals, goal: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona tu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Perder Peso</SelectItem>
                  <SelectItem value="maintain">Mantener Peso</SelectItem>
                  <SelectItem value="gain">Ganar Peso</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Nutrition Goals Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Calories Goal */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Calorías Diarias
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Cantidad total de energía que planeas consumir por día
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {goals.caloriesGoal}
                  </div>
                  <div className="text-sm text-muted-foreground">kcal/día</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calories">Objetivo de Calorías</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={goals.caloriesGoal}
                    onChange={(e) =>
                      setGoals({
                        ...goals,
                        caloriesGoal: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="text-center text-lg font-semibold"
                  />
                </div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  Progreso actual: 75%
                </div>
              </CardContent>
            </Card>

            {/* Protein Goal */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beef className="h-5 w-5 text-primary" />
                  Proteínas
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Esencial para el crecimiento y reparación muscular</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {goals.proteinGoal}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    gramos/día
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Objetivo de Proteínas</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={goals.proteinGoal}
                    onChange={(e) =>
                      setGoals({
                        ...goals,
                        proteinGoal: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="text-center text-lg font-semibold"
                  />
                </div>
                <Progress value={60} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  Progreso actual: 60%
                </div>
              </CardContent>
            </Card>

            {/* Carbs Goal */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wheat className="h-5 w-5 text-primary" />
                  Carbohidratos
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Principal fuente de energía para tu cuerpo</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {goals.carbsGoal}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    gramos/día
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Objetivo de Carbohidratos</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={goals.carbsGoal}
                    onChange={(e) =>
                      setGoals({
                        ...goals,
                        carbsGoal: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="text-center text-lg font-semibold"
                  />
                </div>
                <Progress value={80} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  Progreso actual: 80%
                </div>
              </CardContent>
            </Card>

            {/* Fat Goal */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Grasas
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Necesarias para la absorción de vitaminas y hormonas
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {goals.fatGoal}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    gramos/día
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Objetivo de Grasas</Label>
                  <Input
                    id="fat"
                    type="number"
                    value={goals.fatGoal}
                    onChange={(e) =>
                      setGoals({
                        ...goals,
                        fatGoal: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="text-center text-lg font-semibold"
                  />
                </div>
                <Progress value={45} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  Progreso actual: 45%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <Button
              onClick={handleSaveGoals}
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
            >
              Guardar Objetivos
            </Button>
          </div>

          {/* Motivational Footer */}
          <div className="text-center space-y-2 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              "El éxito es la suma de pequeños esfuerzos repetidos día tras
              día."
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>Consejos Nutricionales</span>
              <span>•</span>
              <span>Comunidad</span>
              <span>•</span>
              <span>Soporte</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
