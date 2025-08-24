import { headers } from "next/headers";
import SectionCards from "@/components/dashboard/section-cards";
import { GlowingBarChart } from "@/components/dashboard/section-chart";
import HistoricalMeals from "@/components/dashboard/section-history";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import SectionChartServer from "@/components/dashboard/section-chart-server";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="mx-6 mb-6">
        <h2 className="pb-4 pt-2 text-xl sm:text-xl md:text-3xl lg:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 dark:from-neutral-100 to-neutral-400 dark:to-neutral-500 inset-x-0">
          How are you {session?.user?.name || "User"}?
        </h2>
        <Separator className="mb-6" />
        {/* Cards centradas */}
        <div className="w-full flex justify-center">
          <SectionCards />
        </div>
        {/* Responsive: stack en mobile, fila en md+ */}
        <div className="pt-6 w-full flex flex-col md:flex-row gap-6 items-stretch">
          {/* Chart con ancho fijo */}
          <div className="w-full md:w-[500px] flex-shrink-0">
            <SectionChartServer userId={session?.user.id ?? ""} />
          </div>
          {/* Historical ocupa el espacio restante */}
          <div className="w-full md:flex-1 max-h">
            <HistoricalMeals />
          </div>
        </div>
      </main>
    </>
  );
}
