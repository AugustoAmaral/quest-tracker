import { useState } from "react";
import { ChevronDown, ChevronRight, Star } from "lucide-react";
import type { Region, FilterOptions, ObjectiveType } from "../../types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ProgressBar } from "../common/ProgressBar";
import { MapItem } from "./MapItem";

interface RegionListProps {
  regions: Region[];
  filters: FilterOptions;
  getRegionProgress: (region: Region) => {
    completed: number;
    total: number;
    percentage: number;
  };
  getMapProgress: (mapId: string) => { completed: number; percentage: number };
  onMapClick: (mapId: string) => void;
  onToggleMapComplete?: (mapId: string, isComplete: boolean) => void;
}

export function RegionList({
  regions,
  filters,
  getRegionProgress,
  getMapProgress,
  onMapClick,
  onToggleMapComplete,
}: RegionListProps) {
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(
    new Set(),
  );

  const toggleRegion = (regionId: string) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(regionId)) {
      newExpanded.delete(regionId);
    } else {
      newExpanded.add(regionId);
    }
    setExpandedRegions(newExpanded);
  };

  const filterRegions = (regions: Region[]): Region[] => {
    return regions.filter((region) => {
      // Search filter
      if (
        filters.search &&
        !region.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        // Also check if any map matches the search
        const mapMatches = region.maps.some((map) =>
          map.name.toLowerCase().includes(filters.search.toLowerCase()),
        );
        if (!mapMatches) return false;
      }

      // Level range filter
      const regionOverlaps = !(
        region.levelRange.max < filters.levelRange.min ||
        region.levelRange.min > filters.levelRange.max
      );
      if (!regionOverlaps) return false;

      // Completion status filter
      if (filters.completionStatus !== "all") {
        const progress = getRegionProgress(region);
        const isComplete = progress.percentage === 100;
        const isIncomplete = progress.percentage === 0;
        const isPartial = progress.percentage > 0 && progress.percentage < 100;

        if (filters.completionStatus === "complete" && !isComplete)
          return false;
        if (filters.completionStatus === "incomplete" && !isIncomplete)
          return false;
        if (filters.completionStatus === "partial" && !isPartial) return false;
      }

      // Objective type filter
      if (filters.objectiveType !== "all") {
        const hasObjectiveType = region.maps.some((map) =>
          map.availableObjectiveTypes.includes(
            filters.objectiveType as ObjectiveType,
          ),
        );
        if (!hasObjectiveType) return false;
      }

      return true;
    });
  };

  const filteredRegions = filterRegions(regions);

  // Sort regions: incomplete first, 100% complete last
  const sortedRegions = filteredRegions.sort((a, b) => {
    const progressA = getRegionProgress(a);
    const progressB = getRegionProgress(b);

    // Se uma região está 100% completa e a outra não, a completa vai para o final
    if (progressA.percentage === 100 && progressB.percentage !== 100) return 1;
    if (progressA.percentage !== 100 && progressB.percentage === 100) return -1;

    // Caso contrário, mantém a ordem original (alfabética)
    return a.name.localeCompare(b.name);
  });

  if (sortedRegions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No regions match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedRegions.map((region) => {
        const progress = getRegionProgress(region);
        const isExpanded = expandedRegions.has(region.id);
        const isComplete = progress.percentage === 100;

        return (
          <Card
            key={region.id}
            className={`overflow-hidden ${
              isComplete ? "opacity-70 bg-muted/30" : ""
            }`}
          >
            <div className="p-4">
              <Button
                variant="ghost"
                onClick={() => toggleRegion(region.id)}
                className="w-full justify-between h-auto p-0 hover:bg-transparent"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className={isComplete ? "line-through" : ""}>
                        {region.name}
                      </h3>
                      {isComplete && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs text-yellow-600 font-medium">
                            Complete
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Level {region.levelRange.min}-{region.levelRange.max}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{progress.percentage}%</p>
                  <p className="text-xs text-muted-foreground">
                    {progress.completed}/{progress.total}
                  </p>
                </div>
              </Button>

              <div className="mt-3">
                <ProgressBar
                  completed={progress.completed}
                  total={progress.total}
                  showText={false}
                />
              </div>

              {isExpanded && (
                <div className="mt-4 space-y-2 border-t pt-4">
                  {region.maps
                    .sort((a, b) => {
                      const progressA = getMapProgress(a.id);
                      const progressB = getMapProgress(b.id);

                      // Se um está 100% completo e o outro não, o completo vai para o final
                      if (
                        progressA.percentage === 100 &&
                        progressB.percentage !== 100
                      )
                        return 1;
                      if (
                        progressA.percentage !== 100 &&
                        progressB.percentage === 100
                      )
                        return -1;

                      // Caso contrário, mantém a ordem original (alfabética)
                      return a.name.localeCompare(b.name);
                    })
                    .map((map) => (
                      <MapItem
                        key={map.id}
                        map={map}
                        progress={getMapProgress(map.id)}
                        onClick={() => onMapClick(map.id)}
                        onToggleComplete={onToggleMapComplete}
                      />
                    ))}
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
