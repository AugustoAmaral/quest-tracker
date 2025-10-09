import { createFileRoute } from "@tanstack/react-router";
import { HistoryView } from "../components/history/HistoryView";
import { useProgress } from "../hooks/useProgress";
import { gameData } from "../data/maps";

export const Route = createFileRoute("/history")({
  component: History,
});

function History() {
  const { activeProfile } = useProgress(gameData);

  return (
    <div className="p-4">
      <HistoryView
        completedObjectives={activeProfile?.completedObjectives || []}
        regions={gameData}
      />
    </div>
  );
}
