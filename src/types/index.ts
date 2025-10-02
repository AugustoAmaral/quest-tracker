export const ObjectiveType = {
  MAIN_QUEST: "main_quest",
  SIDE_QUEST: "side_quest",
  DAILY_QUEST: "daily_quest",
  SPECIAL_QUEST: "special_quest",
  BARD_QUEST_TYPE1: "bard_quest_1",
  BARD_QUEST_TYPE2: "bard_quest_2",
  PHOTO_QUEST: "photo_quest",
  BATTLE_QUEST: "battle_quest",
  DELIVERY_QUEST_TYPE1: "delivery_quest_1",
  DELIVERY_QUEST_TYPE2: "delivery_quest_2",
  PHOTO_SPOT_TYPE1: "photo_spot_1",
  PHOTO_SPOT_TYPE2: "photo_spot_2",
  CHEST: "chest",
} as const;

export type ObjectiveType = (typeof ObjectiveType)[keyof typeof ObjectiveType];

export type GameMap = {
  id: string;
  name: string;
  levelRange: {
    min: number;
    max: number;
  };
  availableObjectiveTypes: ObjectiveType[];
  chestImage?: string;
};

export type Region = {
  id: string;
  name: string;
  levelRange: {
    min: number;
    max: number;
  };
  maps: GameMap[];
};

export type CompletedObjective = {
  mapId: string;
  objectiveType: ObjectiveType;
  completedAt: number;
};

export type Statistics = {
  totalCompleted: number;
  completedByType: Record<ObjectiveType, number>;
  regionsCompleted: number;
  mapsCompleted: number;
  lastActivity: number;
};

export type Profile = {
  id: string;
  name: string;
  createdAt: number;
  completedObjectives: CompletedObjective[];
  statistics: Statistics;
};

export type UserProgress = {
  profiles: Profile[];
  activeProfileId: string;
  lastUpdated: number;
  version: string;
};

export type GameData = {
  version: string;
  regions: Region[];
};

export type FilterOptions = {
  search: string;
  completionStatus: "all" | "complete" | "incomplete" | "partial";
  levelRange: {
    min: number;
    max: number;
  };
  objectiveType: ObjectiveType | "all";
};
