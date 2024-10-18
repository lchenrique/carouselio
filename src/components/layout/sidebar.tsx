"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Inbox,
  FolderKanban,
  Clock,
  BarChart2,
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  FolderGit2,
  Shapes,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  LucideHome,
  House,
  LayoutTemplate,
  Grid2x2Plus,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useSideBarControl } from "@/store/side-bar-control";

export default function Sidebar() {
  const { open, toggle } = useSideBarControl();
  const router = usePathname();
  const active = router;

  return (
    <div className={cn("flex transition-all flex-col h-screen relative  bg-white border-r", open ? " w-64" : "w-0")}>
      <div className="px-4 py-6 flex items-center justify-between border-b ">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg" />
          <span className={cn("font-semibold text-lg transition-all", open ? "opacity-100" : "opacity-0")}>Genuis</span>
        </div>
        <Button
          className={cn("absolute transition-all p-0 size-8 z-50", open ? "right-3" : "-right-10")}
          size="icon"
          variant="ghost"
          onClick={() => toggle(!open)}
        >
          {open ? <PanelLeftClose className="size-4 text-foreground/60" /> : <PanelLeftOpen className="size-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-grow pt-3 ">
        <nav
          className={cn(
            "flex flex-col p-3 space-y-2 [&_span]:transition-all ",
            open ? "[&>a]:justify-left [&_span]:opacity-100" : "[&_span]:opacity-0 [&>a]:justify-center"
          )}
        >
          <NavItem
            to="/carousel-tool"
            icon={<Grid2x2Plus className="w-5 h-5" strokeWidth={2} />}
            label="Boards"
            badge="4"
            active={active === "/carousel-tool"}
          />
          <NavItem
            to="/templates"
            icon={<LayoutTemplate className="w-5 h-5" strokeWidth={2} />}
            label="Templates"
            badge="4"
          />
          <NavItem to="/settings" icon={<Settings2 className="w-5 h-5" strokeWidth={2} />} label="Settings" />
        </nav>
      </ScrollArea>
      <div
        className={cn("flex  mb-5 py-2 px-5   gap-3 group rounded-r-lg cursor-pointer w-min", {
          "hover:bg-background": !open,
        })}
      >
        <div className="relative  h-min">
          <div className="size-12 border-2 absolute border-muted rounded-full left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2" />

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div
          className={cn("flex flex-col transition-all ", {
            "group-hover:opacity-100 opacity-0": !open,
          })}
        >
          <span className="font-semibold whitespace-nowrap ">Carlos Henrique</span>
          <p className="text-sm  whitespace-nowrap">Admin</p>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  badge,
  active,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  active?: boolean;
  to: string;
}) {
  return (
    <Link
      href={to}
      className={cn(
        "flex items-center px-3 transition-all justify-left  py-2 rounded-lg hover:bg-gray-100   duration-200",
        {
          "bg-primary hover:bg-primary": active,
          "text-gray-700": !active,
        }
      )}
    >
      <div
        className={cn("text-primary", {
          "text-primary-foreground": active,
        })}
      >
        {icon}
      </div>
      <span
        className={cn("flex-grow absolute left-14 whitespace-nowrap text-foreground font-normal text-base", {
          "text-gray-700": !active,
          "text-primary-foreground font-bold": active,
        })}
      >
        {label}
      </span>
      {/* {badge && (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{badge}</span>
      )} */}
    </Link>
  );
}
