import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/common/Header";
import { BottomNav } from "./components/common/BottomNav";
import { MapFilters } from "./components/maps/MapFilters";
import { RegionList } from "./components/maps/RegionList";
import { MapDetail } from "./components/maps/MapDetail";
import { HistoryView } from "./components/history/HistoryView";
import { SettingsView } from "./components/settings/SettingsView";
import { ProfileManager } from "./components/profile/ProfileManager";
import { useProgress } from "./hooks/useProgress";
import type { FilterOptions, Region, GameMap } from "./types";
import { DEFAULT_LEVEL_RANGE } from "./utils/constants";
import { clearAllData } from "./utils/storage";
import { Toaster } from "./components/ui/sonner";
import { gameData } from "./data/maps";

const defaultFilters: FilterOptions = {
  search: "",
  completionStatus: "all",
  levelRange: DEFAULT_LEVEL_RANGE,
  objectiveType: "all",
};

export default function App() {
  const {
    progress,
    isLoading,
    activeProfile,
    createProfile,
    switchProfile,
    updateProfile,
    deleteProfile,
    toggleObjective,
    toggleMapComplete,
    isObjectiveCompleted,
    getMapProgress,
    getRegionProgress,
    importData,
    exportData,
  } = useProgress(gameData);

  const [activeTab, setActiveTab] = useState<"maps" | "history" | "settings">(
    "maps"
  );
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [profileDialog, setProfileDialog] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "delete" | null;
    selectedProfileId?: string;
  }>({
    isOpen: false,
    mode: null,
  });

  // Show create profile dialog if no profiles exist
  useEffect(() => {
    if (!isLoading && progress.profiles.length === 0) {
      setProfileDialog({
        isOpen: true,
        mode: "create",
      });
    }
  }, [isLoading, progress.profiles.length]);

  // Get selected map data
  const selectedMap: GameMap | null = selectedMapId
    ? gameData
        .flatMap((region) => region.maps)
        .find((map) => map.id === selectedMapId) || null
    : null;

  const handleCreateProfile = () => {
    setProfileDialog({
      isOpen: true,
      mode: "create",
    });
  };

  const handleEditProfile = (profileId: string) => {
    setProfileDialog({
      isOpen: true,
      mode: "edit",
      selectedProfileId: profileId,
    });
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfileDialog({
      isOpen: true,
      mode: "delete",
      selectedProfileId: profileId,
    });
  };

  const handleCloseProfileDialog = () => {
    setProfileDialog({
      isOpen: false,
      mode: null,
    });
  };

  const handleMapClick = (mapId: string) => {
    setSelectedMapId(mapId);
  };

  const handleBackFromMap = () => {
    setSelectedMapId(null);
  };

  const handleClearAllData = () => {
    try {
      clearAllData();
      // Force a complete page reload to reset all state
      window.location.reload();
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  const getMapProgressMemoized = useCallback(
    (mapId: string) => {
      const map = gameData.flatMap((r) => r.maps).find((m) => m.id === mapId);
      return getMapProgress(mapId, map?.availableObjectiveTypes.length || 0);
    },
    [getMapProgress]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        activeProfile={activeProfile}
        profiles={progress.profiles}
        onCreateProfile={handleCreateProfile}
        onSwitchProfile={switchProfile}
        onEditProfile={handleEditProfile}
        onDeleteProfile={handleDeleteProfile}
      />

      {/* Main Content */}
      <main className="container mx-auto px-0">
        {activeTab === "maps" && (
          <div>
            {selectedMapId && selectedMap ? (
              <MapDetail
                map={selectedMap}
                progress={getMapProgress(
                  selectedMapId,
                  selectedMap.availableObjectiveTypes.length
                )}
                isObjectiveCompleted={(objectiveType) =>
                  isObjectiveCompleted(selectedMapId, objectiveType)
                }
                onToggleObjective={(objectiveType) =>
                  toggleObjective(selectedMapId, objectiveType)
                }
                onBack={handleBackFromMap}
              />
            ) : (
              <div>
                <MapFilters filters={filters} onFiltersChange={setFilters} />
                <div className="p-4">
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
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="p-4">
            <HistoryView
              completedObjectives={activeProfile?.completedObjectives || []}
              regions={gameData}
            />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="p-4">
            <SettingsView
              profiles={progress.profiles}
              activeProfile={activeProfile}
              onExportData={exportData}
              onImportData={importData}
              onClearAllData={handleClearAllData}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      {!selectedMapId && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* Profile Manager Dialog */}
      <ProfileManager
        profiles={progress.profiles}
        activeProfileId={progress.activeProfileId}
        onCreateProfile={createProfile}
        onUpdateProfile={updateProfile}
        onDeleteProfile={deleteProfile}
        isOpen={profileDialog.isOpen}
        onClose={handleCloseProfileDialog}
        mode={profileDialog.mode}
        selectedProfileId={profileDialog.selectedProfileId}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
