import { useState, useEffect, useCallback, useMemo } from "react";
import {
  type UserProgress,
  type Profile,
  type CompletedObjective,
  ObjectiveType,
  type Region,
} from "../types";
import {
  getStoredProgress,
  saveProgress,
  createNewProfile,
  calculateStatistics,
} from "../utils/storage";
import { useLocalStorage } from "./useLocalStorage";

const createInitialProgress = (): UserProgress => ({
  profiles: [],
  activeProfileId: "",
  lastUpdated: Date.now(),
  version: "1.0.0",
});

export function useProgress(gameData: Region[]) {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    "ragnarok_progress",
    createInitialProgress()
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const getActiveProfile = useCallback((): Profile | null => {
    return (
      progress.profiles.find((p) => p.id === progress.activeProfileId) || null
    );
  }, [progress.profiles, progress.activeProfileId]);

  const createProfile = useCallback(
    (name: string): string => {
      const newProfile = createNewProfile(name);
      const newProgress = {
        ...progress,
        profiles: [...progress.profiles, newProfile],
        activeProfileId: newProfile.id,
        lastUpdated: Date.now(),
      };

      setProgress(newProgress);
      saveProgress(newProgress);

      return newProfile.id;
    },
    [progress.profiles, progress.activeProfileId, setProgress]
  );

  const switchProfile = useCallback(
    (profileId: string) => {
      if (progress.profiles.find((p) => p.id === profileId)) {
        const newProgress = {
          ...progress,
          activeProfileId: profileId,
          lastUpdated: Date.now(),
        };

        setProgress(newProgress);
        saveProgress(newProgress);
      }
    },
    [progress.profiles, progress.activeProfileId, setProgress]
  );

  const updateProfile = useCallback(
    (profileId: string, updates: Partial<Profile>) => {
      const newProgress = {
        ...progress,
        profiles: progress.profiles.map((p) =>
          p.id === profileId ? { ...p, ...updates } : p
        ),
        lastUpdated: Date.now(),
      };

      setProgress(newProgress);
      saveProgress(newProgress);
    },
    [progress.profiles, progress.activeProfileId, setProgress]
  );

  const deleteProfile = useCallback(
    (profileId: string) => {
      const remainingProfiles = progress.profiles.filter(
        (p) => p.id !== profileId
      );
      const newActiveId =
        progress.activeProfileId === profileId
          ? remainingProfiles[0]?.id || ""
          : progress.activeProfileId;

      const newProgress = {
        ...progress,
        profiles: remainingProfiles,
        activeProfileId: newActiveId,
        lastUpdated: Date.now(),
      };

      setProgress(newProgress);
      saveProgress(newProgress);
    },
    [progress.profiles, progress.activeProfileId, setProgress]
  );

  const toggleObjective = useCallback(
    (mapId: string, objectiveType: ObjectiveType) => {
      const activeProfile = getActiveProfile();
      if (!activeProfile) return;

      const existingIndex = activeProfile.completedObjectives.findIndex(
        (obj) => obj.mapId === mapId && obj.objectiveType === objectiveType
      );

      let newCompletedObjectives: CompletedObjective[];

      if (existingIndex >= 0) {
        // Remove objective (mark as incomplete)
        newCompletedObjectives = activeProfile.completedObjectives.filter(
          (_, index) => index !== existingIndex
        );
      } else {
        // Add objective (mark as complete)
        const newObjective: CompletedObjective = {
          mapId,
          objectiveType,
          completedAt: Date.now(),
        };
        newCompletedObjectives = [
          ...activeProfile.completedObjectives,
          newObjective,
        ];
      }

      // Recalculate statistics
      const newStatistics = calculateStatistics(
        newCompletedObjectives,
        gameData
      );

      updateProfile(activeProfile.id, {
        completedObjectives: newCompletedObjectives,
        statistics: newStatistics,
      });
    },
    [getActiveProfile, updateProfile, gameData]
  );

  const isObjectiveCompleted = useCallback(
    (mapId: string, objectiveType: ObjectiveType): boolean => {
      const activeProfile = getActiveProfile();
      if (!activeProfile) return false;

      return activeProfile.completedObjectives.some(
        (obj) => obj.mapId === mapId && obj.objectiveType === objectiveType
      );
    },
    [getActiveProfile]
  );

  const getMapProgress = useCallback(
    (
      mapId: string,
      totalObjectiveTypes: number
    ): { completed: number; percentage: number } => {
      const activeProfile = getActiveProfile();
      if (!activeProfile) return { completed: 0, percentage: 0 };

      const completed = activeProfile.completedObjectives.filter(
        (obj) => obj.mapId === mapId
      ).length;
      const percentage =
        totalObjectiveTypes > 0
          ? Math.round((completed / totalObjectiveTypes) * 100)
          : 0;

      return { completed, percentage };
    },
    [getActiveProfile]
  );

  const getRegionProgress = useCallback(
    (
      region: Region
    ): { completed: number; total: number; percentage: number } => {
      const activeProfile = getActiveProfile();
      if (!activeProfile) return { completed: 0, total: 0, percentage: 0 };

      let totalObjectives = 0;
      let completedObjectives = 0;

      region.maps.forEach((map) => {
        totalObjectives += map.availableObjectiveTypes.length;
        completedObjectives += activeProfile.completedObjectives.filter(
          (obj) => obj.mapId === map.id
        ).length;
      });

      const percentage =
        totalObjectives > 0
          ? Math.round((completedObjectives / totalObjectives) * 100)
          : 0;

      return {
        completed: completedObjectives,
        total: totalObjectives,
        percentage,
      };
    },
    [getActiveProfile]
  );

  const importData = useCallback(
    (jsonData: string): { success: boolean; error?: string } => {
      try {
        const parsed = JSON.parse(jsonData);

        // Basic validation
        if (!parsed.profiles || !Array.isArray(parsed.profiles)) {
          return {
            success: false,
            error: "Invalid data format: missing profiles",
          };
        }

        setProgress(parsed);
        saveProgress(parsed);

        return { success: true };
      } catch (error) {
        return { success: false, error: "Invalid JSON format" };
      }
    },
    [setProgress]
  );

  const exportData = useCallback((): string => {
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  const toggleMapComplete = useCallback(
    (mapId: string, isComplete: boolean) => {
      const activeProfile = getActiveProfile();
      if (!activeProfile) return;

      const map = gameData.flatMap((r) => r.maps).find((m) => m.id === mapId);
      if (!map) return;

      if (isComplete) {
        // Mark all objective types as complete for this map
        const newObjectives = map.availableObjectiveTypes.map((type) => ({
          mapId,
          objectiveType: type,
          completedAt: Date.now(),
        }));

        // Remove existing objectives for this map and add new ones
        const filteredObjectives = activeProfile.completedObjectives.filter(
          (obj) => obj.mapId !== mapId
        );
        const allObjectives = [...filteredObjectives, ...newObjectives];

        const newStatistics = calculateStatistics(allObjectives, gameData);

        updateProfile(activeProfile.id, {
          completedObjectives: allObjectives,
          statistics: newStatistics,
        });
      } else {
        // Remove all objectives for this map
        const newCompletedObjectives = activeProfile.completedObjectives.filter(
          (obj) => obj.mapId !== mapId
        );
        const newStatistics = calculateStatistics(
          newCompletedObjectives,
          gameData
        );

        updateProfile(activeProfile.id, {
          completedObjectives: newCompletedObjectives,
          statistics: newStatistics,
        });
      }
    },
    [getActiveProfile, updateProfile, gameData]
  );

  const activeProfile = useMemo(() => getActiveProfile(), [getActiveProfile]);

  return {
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
  };
}
