import { ObjectiveType } from "../types";

export const OBJECTIVE_ICONS: Record<ObjectiveType, string> = {
  [ObjectiveType.MAIN_QUEST]: "/icon-unknown.png",
  [ObjectiveType.SIDE_QUEST]: "/icon-side-quest.png",
  [ObjectiveType.DAILY_QUEST]: "/icon-daily-quest.png",
  [ObjectiveType.SPECIAL_QUEST]: "/icon-special-quest.png",
  [ObjectiveType.KEY_QUEST]: "/icon-key-quest.png",
  [ObjectiveType.HAT_QUEST]: "/icon-hat-quest.png",
  [ObjectiveType.PHOTO_SPOT_QUEST]: "/icon-photo-quest.png",
  [ObjectiveType.BARD_QUEST_TYPE1]: "/icon-bard-quest.png",
  [ObjectiveType.BARD_QUEST_TYPE2]: "/icon-unknown.png",
  [ObjectiveType.BATTLE_QUEST]: "/icon-battle-quest.png",
  [ObjectiveType.COLLECTION_QUEST_TYPE]: "/icon-delivery-quest.png",
  [ObjectiveType.DELIVERY_QUEST]: "/icon-unknown.png",
  [ObjectiveType.PHOTO_SPOT]: "/icon-photo.png",
  [ObjectiveType.CHEST]: "/icon-chest.png",
};

export const OBJECTIVE_LABELS: Record<ObjectiveType, string> = {
  [ObjectiveType.MAIN_QUEST]: "Main Quest",
  [ObjectiveType.SIDE_QUEST]: "Side Quest",
  [ObjectiveType.DAILY_QUEST]: "Daily Quest",
  [ObjectiveType.SPECIAL_QUEST]: "Special Quest",
  [ObjectiveType.KEY_QUEST]: "Key Quest",
  [ObjectiveType.HAT_QUEST]: "Hat Quest",
  [ObjectiveType.PHOTO_SPOT_QUEST]: "Photo Quest",
  [ObjectiveType.BARD_QUEST_TYPE1]: "Bard Quest",
  [ObjectiveType.BARD_QUEST_TYPE2]: "Bard Quest Type 2",
  [ObjectiveType.BATTLE_QUEST]: "Battle Quest",
  [ObjectiveType.COLLECTION_QUEST_TYPE]: "Collection Quest (Toys)",
  [ObjectiveType.DELIVERY_QUEST]: "Delivery Quest",
  [ObjectiveType.PHOTO_SPOT]: "Photo Spot",
  [ObjectiveType.CHEST]: "Chest",
};

export const APP_VERSION = "1.0.0";

export const COMPLETION_COLORS = {
  EMPTY: "#ef4444", // red-500
  PARTIAL: "#eab308", // yellow-500
  COMPLETE: "#22c55e", // green-500
};

export const DEFAULT_LEVEL_RANGE = {
  min: 0,
  max: 150,
};

export const WELCOME_DIALOG_KEY = "hasSeenWelcomeDialog";

// Filter out all the options that are not fully created (they have the icon: icon-unknown.png)
export const getVisibleObjectiveTypes = (): ObjectiveType[] => {
  return Object.values(ObjectiveType).filter(
    (type) => OBJECTIVE_ICONS[type] !== "/icon-unknown.png",
  );
};
