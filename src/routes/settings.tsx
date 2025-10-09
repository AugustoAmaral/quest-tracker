import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SettingsView } from "../components/settings/SettingsView";
import { useProgress } from "../hooks/useProgress";
import { gameData } from "../data/maps";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();
  const { progress, activeProfile, importData, exportData } =
    useProgress(gameData);

  const handleClearAllData = () => {
    try {
      sessionStorage.setItem("clearDataOnReload", "true");
      navigate({ to: "/" });
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return (
    <div className="p-4">
      <SettingsView
        profiles={progress.profiles}
        activeProfile={activeProfile}
        onExportData={exportData}
        onImportData={importData}
        onClearAllData={handleClearAllData}
      />
    </div>
  );
}
