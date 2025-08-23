import { IconInnerShadowTop } from "@tabler/icons-react";
import { Link } from "lucide-react";
import { headers } from "next/headers";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import SearchSidebar from "./sidebar-search";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <Link href="#">
              <IconInnerShadowTop />
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        <SearchSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
