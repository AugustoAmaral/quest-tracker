import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapDetail } from "../components/maps/MapDetail";
import { useProgress } from "../hooks/useProgress";
import { gameData } from "../data/maps";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { DEFAULT_LEVEL_RANGE } from "../utils/constants";

const mapSearchSchema = z.object({
  search: z.string().default(""),
  completionStatus: z
    .enum(["all", "complete", "incomplete", "partial"])
    .default("all"),
  levelMin: z.number().default(DEFAULT_LEVEL_RANGE.min),
  levelMax: z.number().default(DEFAULT_LEVEL_RANGE.max),
  objectiveType: z.string().default("all"),
});

export const Route = createFileRoute("/map/$mapId")({
  component: RouteComponent,
  validateSearch: zodValidator(mapSearchSchema),
});

function RouteComponent() {
  const { mapId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { getMapProgress, toggleObjective, isObjectiveCompleted } =
    useProgress(gameData);

  // Get selected map data
  const selectedMap = gameData
    .flatMap((region) => region.maps)
    .find((map) => map.id === mapId);

  const handleBack = () => {
    navigate({ 
      to: "/",
      search: {
        search: search.search,
        completionStatus: search.completionStatus,
        levelMin: search.levelMin,
        levelMax: search.levelMax,
        objectiveType: search.objectiveType,
      },
    });
  };

  if (!selectedMap) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Map not found</p>
      </div>
    );
  }

  return (
    <MapDetail
      map={selectedMap}
      progress={getMapProgress(
        mapId,
        selectedMap.availableObjectiveTypes.length,
      )}
      isObjectiveCompleted={(objectiveType) =>
        isObjectiveCompleted(mapId, objectiveType)
      }
      onToggleObjective={(objectiveType) =>
        toggleObjective(mapId, objectiveType)
      }
      onBack={handleBack}
    />
  );
}
