import { MapPin, Star, CheckCircle2 } from "lucide-react";
import type { GameMap } from "../../types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ProgressBar } from "../common/ProgressBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MapItemProps {
  map: GameMap;
  progress: { completed: number; percentage: number };
  onClick: () => void;
  onToggleComplete?: (mapId: string, isComplete: boolean) => void;
}

export function MapItem({
  map,
  progress,
  onClick,
  onToggleComplete,
}: MapItemProps) {
  const isComplete = progress.percentage === 100;

  const handleCheckboxChange = (checked: boolean) => {
    if (onToggleComplete) {
      onToggleComplete(map.id, checked);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`w-full justify-between h-auto p-3 hover:bg-accent/50 ${
        isComplete ? "opacity-70 bg-muted/30" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={isComplete}
          onCheckedChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0"
        />
        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <div className="text-left flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`truncate ${isComplete ? "line-through" : ""}`}>
              {map.name}
            </h4>
            {map.verified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="inline-flex"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This map has been reviewed recently</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {isComplete && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span className="text-xs text-yellow-600 font-medium">
                  Complete
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Level {map.levelRange.min}-{map.levelRange.max}
          </p>
          <div className="mt-2">
            <ProgressBar
              completed={progress.completed}
              total={map.availableObjectiveTypes.length}
              showText={false}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-3">
        <p className="text-sm font-medium">{progress.percentage}%</p>
        <p className="text-xs text-muted-foreground">
          {progress.completed}/{map.availableObjectiveTypes.length}
        </p>
      </div>
    </Button>
  );
}
