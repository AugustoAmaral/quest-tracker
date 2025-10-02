import { type Region, ObjectiveType } from "../types";

export const gameData: Region[] = [
  {
    id: "prontera",
    name: "Prontera",
    levelRange: {
      min: 1,
      max: 20,
    },
    maps: [
      {
        id: "prontera_field_01",
        name: "Prontera Field 01",
        levelRange: {
          min: 1,
          max: 10,
        },
        availableObjectiveTypes: [
          ObjectiveType.MAIN_QUEST,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.DAILY_QUEST,
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT_TYPE1,
        ],
        chestImage:
          "https://images.unsplash.com/photo-1557682634-4a2a14ea1b13?w=800&h=600&fit=crop",
      },
      {
        id: "prontera_field_02",
        name: "Prontera Field 02",
        levelRange: {
          min: 8,
          max: 15,
        },
        availableObjectiveTypes: [
          ObjectiveType.MAIN_QUEST,
          ObjectiveType.BATTLE_QUEST,
          ObjectiveType.CHEST,
          ObjectiveType.DELIVERY_QUEST_TYPE1,
        ],
      },
    ],
  },
  {
    id: "geffen",
    name: "Geffen",
    levelRange: {
      min: 20,
      max: 40,
    },
    maps: [
      {
        id: "geffen_field_01",
        name: "Geffen Field 01",
        levelRange: {
          min: 20,
          max: 30,
        },
        availableObjectiveTypes: [
          ObjectiveType.MAIN_QUEST,
          ObjectiveType.SPECIAL_QUEST,
          ObjectiveType.BARD_QUEST_TYPE1,
          ObjectiveType.PHOTO_QUEST,
          ObjectiveType.CHEST,
        ],
        chestImage:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      },
      {
        id: "geffen_tower",
        name: "Geffen Tower",
        levelRange: {
          min: 25,
          max: 40,
        },
        availableObjectiveTypes: [
          ObjectiveType.MAIN_QUEST,
          ObjectiveType.BATTLE_QUEST,
          ObjectiveType.CHEST,
          ObjectiveType.DAILY_QUEST,
        ],
        chestImage:
          "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    id: "payon",
    name: "Payon",
    levelRange: {
      min: 15,
      max: 35,
    },
    maps: [
      {
        id: "payon_forest_01",
        name: "Payon Forest 01",
        levelRange: {
          min: 15,
          max: 25,
        },
        availableObjectiveTypes: [
          ObjectiveType.MAIN_QUEST,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.BARD_QUEST_TYPE2,
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT_TYPE2,
        ],
      },
    ],
  },
  {
    id: "morroc",
    name: "Morroc",
    levelRange: {
      min: 30,
      max: 60,
    },
    maps: [
      {
        id: "morroc_field_01",
        name: "Morroc Field 01",
        levelRange: {
          min: 30,
          max: 45,
        },
        availableObjectiveTypes: [
          ObjectiveType.MAIN_QUEST,
          ObjectiveType.DELIVERY_QUEST_TYPE2,
          ObjectiveType.BATTLE_QUEST,
          ObjectiveType.CHEST,
          ObjectiveType.SPECIAL_QUEST,
        ],
      },
    ],
  },
];
