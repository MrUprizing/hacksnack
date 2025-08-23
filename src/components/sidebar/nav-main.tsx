"use client";

import { usePathname } from "next/navigation";
import {
  BarChart2,
  History,
  LayoutDashboard,
  MessageCircle,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  const items = [
    {
      title: "Dasboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart2,
    },
    {
      title: "Goals",
      url: "/goals",
      icon: Target,
    },
    {
      title: "Insights",
      url: "/insights",
      icon: Sparkles,
    },

    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ];
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link
                href={item.url}
                className={`flex items-center gap-2 link${pathname === item.url ? " bg-sidebar-accent" : ""}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
