import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { MapFilters } from "../components/maps/MapFilters";
import { RegionList } from "../components/maps/RegionList";
import { WelcomeDialog } from "../components/common/WelcomeDialog";
import { useProgress } from "../hooks/useProgress";
import type { FilterOptions } from "../types";
import { DEFAULT_LEVEL_RANGE } from "../utils/constants";
import { gameData } from "../data/maps";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const filterSearchSchema = z.object({
  search: z.string().default(""),
  completionStatus: z
    .enum(["all", "complete", "incomplete", "partial"])
    .default("all"),
  levelMin: z.number().default(DEFAULT_LEVEL_RANGE.min),
  levelMax: z.number().default(DEFAULT_LEVEL_RANGE.max),
  objectiveType: z.string().default("all"),
});

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: zodValidator(filterSearchSchema),
});

function Index() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { getMapProgress, toggleMapComplete } = useProgress(gameData);

  // Convert search params to FilterOptions format
  const filters: FilterOptions = {
    search: search.search,
    completionStatus: search.completionStatus,
    levelRange: {
      min: search.levelMin,
      max: search.levelMax,
    },
    objectiveType: search.objectiveType as FilterOptions["objectiveType"],
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    navigate({
      to: ".",
      search: {
        search: newFilters.search,
        completionStatus: newFilters.completionStatus,
        levelMin: newFilters.levelRange.min,
        levelMax: newFilters.levelRange.max,
        objectiveType: newFilters.objectiveType,
      },
    });
  };

  const handleMapClick = (mapId: string) => {
    navigate({ 
      to: "/map/$mapId", 
      params: { mapId },
      search: {
        search: search.search,
        completionStatus: search.completionStatus,
        levelMin: search.levelMin,
        levelMax: search.levelMax,
        objectiveType: search.objectiveType,
      },
    });
  };

  const getMapProgressMemoized = useCallback(
    (mapId: string) => {
      const map = gameData.flatMap((r) => r.maps).find((m) => m.id === mapId);
      return getMapProgress(mapId, map?.availableObjectiveTypes.length || 0);
    },
    [getMapProgress],
  );

  const getRegionProgress = useCallback(
    (region: {
      id: string;
      maps: Array<{ id: string; availableObjectiveTypes: Array<string> }>;
    }) => {
      const regionMaps = region.maps;
      let completedMaps = 0;

      regionMaps.forEach((map) => {
        const progress = getMapProgress(
          map.id,
          map.availableObjectiveTypes.length,
        );
        if (progress.percentage === 100) {
          completedMaps++;
        }
      });

      return {
        completed: completedMaps,
        total: regionMaps.length,
        percentage:
          regionMaps.length > 0
            ? Math.round((completedMaps / regionMaps.length) * 100)
            : 0,
      };
    },
    [getMapProgress],
  );

  return (
    <div>
      <WelcomeDialog />
      <MapFilters filters={filters} onFiltersChange={handleFiltersChange} />
      <div className="p-4 space-y-6">
        <div className="border border-yellow-500/50 bg-yellow-500/10 rounded-lg p-4 text-center">
          <h3 className="font-medium text-yellow-600 mb-2">
            Under Development
          </h3>
          <p className="text-sm text-yellow-600/90">
            This site is still under active development and being updated daily
            with new information. Bugs, changes, and adjustments are expected.
          </p>
          <p className="text-sm text-yellow-600/90 mt-3">
            If you'd like to help fill in map data, feel free to contact me on
            Discord. You can find my contact information in the Settings page.
          </p>
        </div>
        <RegionList
          regions={gameData}
          filters={filters}
          getRegionProgress={getRegionProgress}
          getMapProgress={getMapProgressMemoized}
          onMapClick={handleMapClick}
          onToggleMapComplete={toggleMapComplete}
        />
      </div>
    </div>
  );
}
