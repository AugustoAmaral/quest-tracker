import { Map, History, Settings } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "../ui/button";

const tabs = [
  { path: "/", icon: Map, label: "Maps" },
  { path: "/history", icon: History, label: "History" },
  { path: "/settings", icon: Settings, label: "Settings" },
] as const;

export function BottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  if (currentPath.startsWith("/map/")) return null;

  return (
    <nav className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-around gap-2">
          {tabs.map(({ path, icon: Icon, label }) => (
            <Link key={path} to={path} className="flex-1">
              <Button
                variant={currentPath === path ? "default" : "ghost"}
                size="sm"
                className="w-full flex flex-col gap-1 h-12 px-3"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
