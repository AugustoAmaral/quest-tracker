import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapDetail } from "../components/maps/MapDetail";
import { useProgress } from "../hooks/useProgress";
import { gameData } from "../data/maps";

export const Route = createFileRoute("/map/$mapId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mapId } = Route.useParams();
  const navigate = useNavigate();
  const { getMapProgress, toggleObjective, isObjectiveCompleted } =
    useProgress(gameData);

  // Get selected map data
  const selectedMap = gameData
    .flatMap((region) => region.maps)
    .find((map) => map.id === mapId);

  const handleBack = () => {
    navigate({ to: "/" });
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
