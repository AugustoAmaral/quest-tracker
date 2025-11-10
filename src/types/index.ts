export const ObjectiveType = {
  MAIN_QUEST: "main_quest",
  SIDE_QUEST: "side_quest",
  DAILY_QUEST: "daily_quest",
  SPECIAL_QUEST: "special_quest",
  KEY_QUEST: "key_quest",
  HAT_QUEST: "hat_quest",
  PHOTO_SPOT_QUEST: "photo_spot_quest",
  BARD_QUEST_TYPE1: "bard_quest_1",
  BATTLE_QUEST: "battle_quest",
  COLLECTION_QUEST_TYPE: "collection_quest",
  DELIVERY_QUEST: "delivery_quest",
  PHOTO_SPOT: "photo_spot",
  BLUE_STAR_QUEST: "blue_star_quest",
  BLUE_STAR_CHEST_QUEST: "blue_star_chest_quest",
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
  questComment?: Partial<Record<ObjectiveType, string>>;
  chestImage?: string;
  verified?: boolean;
};

export type Region = {
  id: string;
  name: string;
  levelRange: {
    min: number;
    max: number;
  };
  maps: GameMap[];
  verified?: boolean;
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
