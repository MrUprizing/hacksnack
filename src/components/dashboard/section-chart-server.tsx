import { getDailyMacrosByUserId } from "@/db/queries/food-entry";
import { GlowingBarChart } from "./section-chart";

export default async function SectionChartServer({
  userId,
}: {
  userId: string;
}) {
  const rawData = await getDailyMacrosByUserId(userId, 10);

  // Normaliza los datos para que coincidan con el tipo DailyMacro
  const data = (rawData ?? []).map((row) => ({
    date:
      typeof row.date === "string"
        ? row.date
        : row.date instanceof Date
          ? row.date.toISOString().slice(0, 10)
          : "",
    protein: row.protein ? Number(row.protein) : 0,
    carbohydrates: row.carbohydrates ? Number(row.carbohydrates) : 0,
    fat: row.fat ? Number(row.fat) : 0,
  }));

  return <GlowingBarChart data={data} />;
}
