"use client";

import { Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import {
  ChartSplineIcon,
  type ChartSplineIconHandle,
} from "@/components/sidebar/icons/icon-analytics";
import {
  MessageCircleIcon,
  type MessageCircleIconHandle,
} from "@/components/sidebar/icons/icon-chat";
import {
  LayoutPanelTopIcon,
  type LayoutPanelTopIconHandle,
} from "@/components/sidebar/icons/icon-dashboard";
import {
  HistoryIcon,
  type HistoryIconHandle,
} from "@/components/sidebar/icons/icon-history";
import {
  UserIcon,
  type UserIconHandle,
} from "@/components/sidebar/icons/icon-profile";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  const pathname = usePathname();
  const dashboardIconRef = useRef<LayoutPanelTopIconHandle>(null);
  const historyIconRef = useRef<HistoryIconHandle>(null);
  const messageIconRef = useRef<MessageCircleIconHandle>(null);
  const analyticsIconRef = useRef<ChartSplineIconHandle>(null);
  const profileIconRef = useRef<UserIconHandle>(null);

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Dashboard">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 link${pathname === "/dashboard" ? " bg-sidebar-accent" : ""}`}
              onMouseEnter={() => dashboardIconRef.current?.startAnimation()}
              onMouseLeave={() => dashboardIconRef.current?.stopAnimation()}
            >
              <LayoutPanelTopIcon
                ref={dashboardIconRef}
                size={16}
                className="w-4 h-4"
              />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Chat">
            <Link
              href="/chat"
              className={`flex items-center gap-2 link${pathname === "/chat" ? " bg-sidebar-accent" : ""}`}
              onMouseEnter={() => messageIconRef.current?.startAnimation()}
              onMouseLeave={() => messageIconRef.current?.stopAnimation()}
            >
              <MessageCircleIcon
                ref={messageIconRef}
                size={16}
                className="w-4 h-4"
              />
              <span>Chat</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="History">
            <Link
              href="/history"
              className={`flex items-center gap-2 link${pathname === "/history" ? " bg-sidebar-accent" : ""}`}
              onMouseEnter={() => historyIconRef.current?.startAnimation()}
              onMouseLeave={() => historyIconRef.current?.stopAnimation()}
            >
              <HistoryIcon ref={historyIconRef} size={16} className="w-4 h-4" />
              <span>History</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Analytics">
            <Link
              href="/analytics"
              className={`flex items-center gap-2 link${pathname === "/analytics" ? " bg-sidebar-accent" : ""}`}
              onMouseEnter={() => analyticsIconRef.current?.startAnimation()}
              onMouseLeave={() => analyticsIconRef.current?.stopAnimation()}
            >
              <ChartSplineIcon
                ref={analyticsIconRef}
                size={16}
                className="w-4 h-4"
              />
              <span>Analytics</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Goals">
            <Link
              href="/goals"
              className={`flex items-center gap-2 link${pathname === "/goals" ? " bg-sidebar-accent" : ""}`}
            >
              <Target className="w-4 h-4" />
              <span>Goals</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Insights">
            <Link
              href="/insights"
              className={`flex items-center gap-2 link${pathname === "/insights" ? " bg-sidebar-accent" : ""}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Insights</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Profile">
            <Link
              href="/profile"
              className={`flex items-center gap-2 link${pathname === "/profile" ? " bg-sidebar-accent" : ""}`}
              onMouseEnter={() => profileIconRef.current?.startAnimation()}
              onMouseLeave={() => profileIconRef.current?.stopAnimation()}
            >
              <UserIcon ref={profileIconRef} size={16} className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
