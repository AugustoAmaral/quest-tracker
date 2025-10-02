import {
  type UserProgress,
  type Profile,
  type CompletedObjective,
  type Statistics,
  ObjectiveType,
} from "../types";

const STORAGE_KEY = "ragnarok_progress";
const BACKUP_KEY = "ragnarok_progress_backup";

export const createEmptyStatistics = (): Statistics => ({
  totalCompleted: 0,
  completedByType: Object.values(ObjectiveType).reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {} as Record<ObjectiveType, number>),
  regionsCompleted: 0,
  mapsCompleted: 0,
  lastActivity: Date.now(),
});

export const createNewProfile = (name: string): Profile => ({
  id: crypto.randomUUID(),
  name,
  createdAt: Date.now(),
  completedObjectives: [],
  statistics: createEmptyStatistics(),
});

export const getStoredProgress = (): UserProgress | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    if (!isValidUserProgress(parsed)) {
      console.warn("Invalid stored progress data");
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Error reading stored progress:", error);
    return null;
  }
};

export const saveProgress = (progress: UserProgress): boolean => {
  try {
    progress.lastUpdated = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error("Error saving progress:", error);
    return false;
  }
};

export const createBackup = (): boolean => {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      localStorage.setItem(BACKUP_KEY, current);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error creating backup:", error);
    return false;
  }
};

export const restoreBackup = (): boolean => {
  try {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      localStorage.setItem(STORAGE_KEY, backup);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error restoring backup:", error);
    return false;
  }
};

export const exportProgress = (): string => {
  const progress = getStoredProgress();
  return JSON.stringify(progress, null, 2);
};

export const importProgress = (
  jsonData: string
): { success: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(jsonData);

    if (!isValidUserProgress(parsed)) {
      return { success: false, error: "Invalid data format" };
    }

    // Create backup before importing
    createBackup();

    // Save imported data
    const success = saveProgress(parsed);

    if (!success) {
      return { success: false, error: "Failed to save imported data" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Invalid JSON format" };
  }
};

export const calculateStatistics = (
  completedObjectives: CompletedObjective[],
  regions: any[]
): Statistics => {
  const stats = createEmptyStatistics();

  stats.totalCompleted = completedObjectives.length;

  // Calculate by type
  completedObjectives.forEach((obj) => {
    stats.completedByType[obj.objectiveType]++;
  });

  // Calculate last activity
  if (completedObjectives.length > 0) {
    stats.lastActivity = Math.max(
      ...completedObjectives.map((obj) => obj.completedAt)
    );
  }

  // TODO: Calculate regions and maps completed based on actual game data

  return stats;
};

const isValidUserProgress = (data: any): data is UserProgress => {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray(data.profiles) &&
    typeof data.activeProfileId === "string" &&
    typeof data.lastUpdated === "number" &&
    typeof data.version === "string"
  );
};

export const clearAllData = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    return false;
  }
};
