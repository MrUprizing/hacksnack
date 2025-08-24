import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { getFoodEntriesByUserId } from "@/db/queries/food-entry";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function formatDate(dateString: string | null) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function HistoryPage() {
  // Obtener la sesión y los registros del usuario autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const entries = await getFoodEntriesByUserId(userId);

  // Calcular el total de calorías
  const totalCalories = entries.reduce(
    (sum, entry) => sum + (entry.calories || 0),
    0,
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-bold text-4xl text-primary mb-2 font-[family-name:var(--font-space-grotesk)]">
            Calorie History
          </h1>
          <p className="text-muted-foreground text-lg font-[family-name:var(--font-dm-sans)]">
            History of your food entries and calorie intake.
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted/30">
                <TableHead className="font-semibold text-card-foreground py-6 px-8 font-[family-name:var(--font-dm-sans)]">
                  Descripción
                </TableHead>
                <TableHead className="font-semibold text-card-foreground py-6 px-8 font-[family-name:var(--font-dm-sans)]">
                  Tipo
                </TableHead>
                <TableHead className="font-semibold text-card-foreground py-6 px-8 font-[family-name:var(--font-dm-sans)]">
                  Fecha
                </TableHead>
                <TableHead className="font-semibold text-card-foreground py-6 px-8 text-right font-[family-name:var(--font-dm-sans)]">
                  Calorías
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No hay registros aún.
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, index) => (
                  <TableRow
                    key={entry.id}
                    className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${
                      index % 2 === 1 ? "bg-muted/10" : ""
                    }`}
                  >
                    <TableCell className="py-6 px-8 font-medium text-card-foreground font-[family-name:var(--font-dm-sans)]">
                      {entry.description}
                    </TableCell>
                    <TableCell className="py-6 px-8 font-[family-name:var(--font-dm-sans)]">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ">
                        {entry.mealType ?? "-"}
                      </span>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-muted-foreground font-[family-name:var(--font-dm-sans)]">
                      {formatDate(entry.consumedAt?.toString() ?? null)}
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right font-semibold text-card-foreground font-[family-name:var(--font-dm-sans)]">
                      {entry.calories}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-card rounded-lg border border-border">
            <span className="text-muted-foreground font-[family-name:var(--font-dm-sans)]">
              Total:
            </span>
            <span className="text-2xl font-bold text-primary font-[family-name:var(--font-space-grotesk)]">
              {totalCalories} cal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
