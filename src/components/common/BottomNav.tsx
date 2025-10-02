import { Map, History, Settings } from "lucide-react";
import { Button } from "../ui/button";

interface BottomNavProps {
  activeTab: "maps" | "history" | "settings";
  onTabChange: (tab: "maps" | "history" | "settings") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "maps" as const, icon: Map, label: "Maps" },
    { id: "history" as const, icon: History, label: "History" },
    { id: "settings" as const, icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4">
        <div className="flex h-16 items-center justify-around">
          {tabs.map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(id)}
              className="flex flex-col gap-1 h-12 px-3"
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
