import { type Region, ObjectiveType } from "../types";

export const gameData: Region[] = [
  {
    id: "gingerbreadcity",
    name: "Gingerbread City",
    levelRange: {
      min: 78,
      max: 91,
    },
    maps: [
      {
        id: "gingerbreadcity",
        name: "Gingerbread City",
        levelRange: {
          min: 78,
          max: 91,
        },
        availableObjectiveTypes: [ObjectiveType.PHOTO_SPOT],
      },
      {
        id: "toyfactory1f",
        name: "Toy Factory 1F",
        levelRange: {
          min: 78,
          max: 83,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.DELIVERY_QUEST,
        ],
      },
      {
        id: "toyfactory2f",
        name: "Toy Factory 2F",
        levelRange: {
          min: 87,
          max: 91,
        },
        availableObjectiveTypes: [ObjectiveType.DELIVERY_QUEST],
      },
    ],
  },
  {
    id: "niflheim",
    name: "Niflheim",
    levelRange: {
      min: 0,
      max: 0,
    },
    maps: [
      {
        id: "niflheim",
        name: "Niflheim",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "amatsu",
    name: "Amatsu",
    levelRange: {
      min: 0,
      max: 0,
    },
    maps: [
      {
        id: "amatsu",
        name: "Amatsu",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "skellington",
    name: "Skellington",
    levelRange: {
      min: 125,
      max: 129,
    },
    maps: [
      {
        id: "skellington",
        name: "Skellington",
        levelRange: {
          min: 125,
          max: 129,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/skellington.JPG",
      },
      {
        id: "hamelin",
        name: "Hamelin",
        levelRange: {
          min: 127,
          max: 129,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "themistyforest",
    name: "The Misty Forest",
    levelRange: {
      min: 124,
      max: 130,
    },
    maps: [
      {
        id: "themistyforest",
        name: "The Misty Forest",
        levelRange: {
          min: 124,
          max: 130,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/the-misty-forest.JPG",
      },
    ],
  },
  {
    id: "bayanisland",
    name: "Bayan Island",
    levelRange: {
      min: 23,
      max: 45,
    },
    verified: true,
    maps: [
      {
        id: "bayanisland",
        name: "Bayan Island",
        levelRange: {
          min: 23,
          max: 45,
        },
        availableObjectiveTypes: [
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.PHOTO_SPOT,
        ],
        verified: true,
      },
      {
        id: "underwatercave",
        name: "Underwater Cave",
        levelRange: {
          min: 29,
          max: 40,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.BATTLE_QUEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        chestImage: "/chests/underwater-cave.JPG",
        verified: true,
      },
      {
        id: "underwatertemple",
        name: "Underwater Temple",
        levelRange: {
          min: 23,
          max: 45,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.BATTLE_QUEST,
        ],
        chestImage: "/chests/underwater-temple.JPG",
        verified: true,
      },
    ],
  },
  {
    id: "payonforest",
    name: "Payon Forest",
    levelRange: {
      min: 59,
      max: 62,
    },
    verified: true,
    maps: [
      {
        id: "payonforest",
        name: "Payon Forest",
        levelRange: {
          min: 59,
          max: 62,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        verified: true,
        chestImage: "/chests/payon-forest.JPG",
      },
    ],
  },
  {
    id: "abyssallake",
    name: "Abyssal Lake",
    levelRange: {
      min: 110,
      max: 110,
    },
    maps: [
      {
        id: "abyssallake",
        name: "Abyssal Lake",
        levelRange: {
          min: 110,
          max: 110,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "ghostship",
    name: "Ghost Ship",
    levelRange: {
      min: 26,
      max: 40,
    },
    verified: true,
    maps: [
      {
        id: "ghostship",
        name: "Ghost Ship",
        levelRange: {
          min: 26,
          max: 40,
        },
        availableObjectiveTypes: [ObjectiveType.PHOTO_SPOT],
        verified: true,
      },
    ],
  },
  {
    id: "payon",
    name: "Payon",
    levelRange: {
      min: 61,
      max: 72,
    },
    verified: true,
    maps: [
      {
        id: "payon",
        name: "Payon",
        levelRange: {
          min: 61,
          max: 72,
        },
        availableObjectiveTypes: [
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.HAT_QUEST,
          ObjectiveType.BARD_QUEST_TYPE1,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.SPECIAL_QUEST,
        ],
        verified: true,
      },
      {
        id: "payoncave1f",
        name: "Payon Cave 1F",
        levelRange: {
          min: 61,
          max: 65,
        },
        availableObjectiveTypes: [ObjectiveType.PHOTO_SPOT_QUEST],
        verified: true,
      },
      {
        id: "payoncave2f",
        name: "Payon Cave 2F",
        levelRange: {
          min: 65,
          max: 72,
        },
        availableObjectiveTypes: [
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
        ],
        verified: true,
      },
      {
        id: "payoncave3f",
        name: "Payon Cave 3F",
        levelRange: {
          min: 65,
          max: 72,
        },
        availableObjectiveTypes: [],
        verified: true,
      },
      {
        id: "poringisland",
        name: "Poring Island",
        levelRange: {
          min: 61,
          max: 72,
        },
        availableObjectiveTypes: [],
        verified: true,
      },
    ],
  },
  {
    id: "payonsouth",
    name: "Payon South",
    levelRange: {
      min: 56,
      max: 60,
    },
    verified: true,
    maps: [
      {
        id: "payonsouth",
        name: "Payon South",
        levelRange: {
          min: 56,
          max: 60,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        verified: true,
        chestImage: "/chests/payon-south.JPG",
      },
    ],
  },
  {
    id: "payonforestsouth",
    name: "Payon Forest South",
    levelRange: {
      min: 56,
      max: 60,
    },
    verified: true,
    maps: [
      {
        id: "payonforestsouth",
        name: "Payon Forest South",
        levelRange: {
          min: 56,
          max: 60,
        },
        availableObjectiveTypes: [],
        verified: true,
      },
    ],
  },
  {
    id: "sunkenship",
    name: "Sunken Ship",
    levelRange: {
      min: 23,
      max: 28,
    },
    verified: true,
    maps: [
      {
        id: "sunkenship",
        name: "Sunken Ship",
        levelRange: {
          min: 23,
          max: 28,
        },
        availableObjectiveTypes: [
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.PHOTO_SPOT,
        ],
        verified: true,
      },
    ],
  },
  {
    id: "izludeisland",
    name: "Izlude Island",
    levelRange: {
      min: 0,
      max: 0,
    },
    verified: true,
    maps: [
      {
        id: "izludeisland",
        name: "Izlude Island",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.BARD_QUEST_TYPE1,
        ],
        verified: true,
      },
    ],
  },
  {
    id: "yuno",
    name: "Yuno",
    levelRange: {
      min: 0,
      max: 0,
    },
    maps: [
      {
        id: "yuno",
        name: "Yuno",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "thanatostower",
        name: "Thanatos Tower",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "unlimitedlibrary",
        name: "Unlimited Library",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "einbrochfield",
    name: "Einbroch Field",
    levelRange: {
      min: 116,
      max: 124,
    },
    maps: [
      {
        id: "einbrochfield",
        name: "Einbroch Field",
        levelRange: {
          min: 116,
          max: 119,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "magmadungeon1f",
        name: "Magma Dungeon 1F",
        levelRange: {
          min: 119,
          max: 124,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/magma-1f.JPG",
      },
      {
        id: "magmadungeon2f",
        name: "Magma Dungeon 2F",
        levelRange: {
          min: 120,
          max: 122,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/magma-2f.JPG",
      },
      {
        id: "magmadungeon3f",
        name: "Magma Dungeon 3F",
        levelRange: {
          min: 119,
          max: 124,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "bordercheckpooint",
    name: "Border Checkpooint",
    levelRange: {
      min: 118,
      max: 119,
    },
    maps: [
      {
        id: "bordercheckpooint",
        name: "Border Checkpooint",
        levelRange: {
          min: 118,
          max: 119,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/border-checkpoint.JPG",
      },
    ],
  },
  {
    id: "aldebaran",
    name: "Al De Baran",
    levelRange: {
      min: 98,
      max: 109,
    },
    maps: [
      {
        id: "aldebaran",
        name: "Al De Baran",
        levelRange: {
          min: 98,
          max: 109,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "clocktower1f",
        name: "Clock Tower 1F",
        levelRange: {
          min: 98,
          max: 105,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/clock-tower-1f.JPG",
      },
      {
        id: "clocktower2f",
        name: "Clock Tower 2F",
        levelRange: {
          min: 101,
          max: 108,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "clocktowerb1",
        name: "Clock Tower B1",
        levelRange: {
          min: 105,
          max: 109,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "pronteranorth",
    name: "Prontera North",
    levelRange: {
      min: 55,
      max: 65,
    },
    verified: true,
    maps: [
      {
        id: "pronteranorth",
        name: "Prontera North",
        levelRange: {
          min: 55,
          max: 65,
        },
        availableObjectiveTypes: [
          ObjectiveType.COLLECTION_QUEST_TYPE,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
        ],
        verified: true,
      },
    ],
  },
  {
    id: "prontera",
    name: "Prontera",
    levelRange: {
      min: 11,
      max: 30,
    },
    verified: true,
    maps: [
      {
        id: "prontera",
        name: "Prontera",
        levelRange: {
          min: 11,
          max: 30,
        },
        availableObjectiveTypes: [
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.DAILY_QUEST,
          ObjectiveType.HAT_QUEST,
          ObjectiveType.BARD_QUEST_TYPE1,
          ObjectiveType.KEY_QUEST,
        ],
        verified: true,
      },
      {
        id: "capitalsewer1f",
        name: "Capital Sewer 1F",
        levelRange: {
          min: 11,
          max: 17,
        },
        availableObjectiveTypes: [
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        verified: true,
      },
      {
        id: "capitalsewer2f",
        name: "Capital Sewer 2F",
        levelRange: {
          min: 20,
          max: 30,
        },
        availableObjectiveTypes: [],
        verified: true,
      },
    ],
  },
  {
    id: "pronterasouthgate",
    name: "Prontera South Gate",
    levelRange: {
      min: 1,
      max: 10,
    },
    verified: true,
    maps: [
      {
        id: "pronterasouthgate",
        name: "Prontera South Gate",
        levelRange: {
          min: 1,
          max: 10,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.COLLECTION_QUEST_TYPE,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.KEY_QUEST,
        ],
        chestImage: "/chests/prontera-south-gate.JPG",
        verified: true,
      },
    ],
  },
  {
    id: "sogratdesert",
    name: "Sograt Desert",
    levelRange: {
      min: 40,
      max: 51,
    },
    verified: true,
    maps: [
      {
        id: "sogratdesert",
        name: "Sograt Desert",
        levelRange: {
          min: 40,
          max: 51,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.BATTLE_QUEST,
          ObjectiveType.PHOTO_SPOT,
        ],
        chestImage: "/chests/sograt-desert.JPG",
        verified: true,
      },
      {
        id: "anthell1f",
        name: "Ant Hell 1F",
        levelRange: {
          min: 40,
          max: 48,
        },
        availableObjectiveTypes: [],
        verified: true,
      },
      {
        id: "anthell2f",
        name: "Ant Hell 2F",
        levelRange: {
          min: 40,
          max: 48,
        },
        availableObjectiveTypes: [],
        verified: true,
      },
    ],
  },
  {
    id: "labyrinthforest",
    name: "Labyrinth Forest",
    levelRange: {
      min: 13,
      max: 35,
    },
    verified: true,
    maps: [
      {
        id: "labyrinthforest",
        name: "Labyrinth Forest",
        levelRange: {
          min: 13,
          max: 35,
        },
        availableObjectiveTypes: [
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.PHOTO_SPOT,
        ],
        verified: true,
      },
    ],
  },
  {
    id: "pronterawestgate",
    name: "Prontera West Gate",
    levelRange: {
      min: 13,
      max: 21,
    },
    verified: true,
    maps: [
      {
        id: "pronterawestgate",
        name: "Prontera West Gate",
        levelRange: {
          min: 13,
          max: 21,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
          ObjectiveType.BATTLE_QUEST,
          ObjectiveType.SIDE_QUEST,
        ],
        chestImage: "/chests/prontera-west-gate.JPG",
        verified: true,
      },
    ],
  },
  {
    id: "morrroc",
    name: "Morrroc",
    levelRange: {
      min: 49,
      max: 55,
    },
    verified: true,
    maps: [
      {
        id: "morrroc",
        name: "Morrroc",
        levelRange: {
          min: 49,
          max: 55,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.BATTLE_QUEST,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.HAT_QUEST,
          ObjectiveType.BARD_QUEST_TYPE1,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        chestImage: "/chests/morroc.JPG",
        verified: true,
      },
    ],
  },
  {
    id: "lesterlighthouse",
    name: "Lester Lighthouse",
    levelRange: {
      min: 0,
      max: 0,
    },
    maps: [
      {
        id: "lesterlighthouse",
        name: "Lester Lighthouse",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "kordtforest",
    name: "Kordt Forest",
    levelRange: {
      min: 72,
      max: 75,
    },
    verified: true,
    maps: [
      {
        id: "kordtforest",
        name: "Kordt Forest",
        levelRange: {
          min: 72,
          max: 75,
        },
        verified: true,
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.SPECIAL_QUEST,
          ObjectiveType.BARD_QUEST_TYPE1,
        ],
        chestImage: "/chests/kordt-forest.JPG",
      },
      {
        id: "kordtforestdepth",
        name: "Kordt Forest Depth",
        levelRange: {
          min: 72,
          max: 75,
        },
        verified: true,
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "geffen",
    name: "Geffen",
    levelRange: {
      min: 74,
      max: 80,
    },
    verified: true,
    maps: [
      {
        id: "geffen",
        name: "Geffen",
        levelRange: {
          min: 74,
          max: 80,
        },
        verified: true,
        availableObjectiveTypes: [
          ObjectiveType.HAT_QUEST,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.BARD_QUEST_TYPE1,
          ObjectiveType.PHOTO_SPOT,
        ],
      },
      {
        id: "geffendungeon",
        name: "Geffen Dungeon",
        levelRange: {
          min: 74,
          max: 80,
        },
        verified: true,
        availableObjectiveTypes: [
          ObjectiveType.COLLECTION_QUEST_TYPE,
          ObjectiveType.BARD_QUEST_TYPE1,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.SPECIAL_QUEST,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.PHOTO_SPOT,
        ],
      },
      {
        id: "undergroundgeffen2f",
        name: "Underground Geffen 2F",
        levelRange: {
          min: 74,
          max: 80,
        },
        verified: true,
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "pyramid1f",
    name: "Pyramid 1F",
    levelRange: {
      min: 52,
      max: 68,
    },
    verified: true,
    maps: [
      {
        id: "pyramid1f",
        name: "Pyramid 1F",
        levelRange: {
          min: 52,
          max: 57,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        chestImage: "/chests/pyramid-1f.JPG",
        verified: true,
      },
      {
        id: "pyramid2f",
        name: "Pyramid 2F",
        levelRange: {
          min: 64,
          max: 68,
        },
        availableObjectiveTypes: [ObjectiveType.COLLECTION_QUEST_TYPE],
        verified: true,
      },
      {
        id: "pyramid3f",
        name: "Pyramid 3F",
        levelRange: {
          min: 64,
          max: 68,
        },
        availableObjectiveTypes: [],
        verified: true,
      },
    ],
  },
  {
    id: "mjolnirmountains",
    name: "Mjolnir Mountains",
    levelRange: {
      min: 20,
      max: 45,
    },
    verified: true,
    maps: [
      {
        id: "mjolnirmountains",
        name: "Mjolnir Mountains",
        levelRange: {
          min: 20,
          max: 45,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.PHOTO_SPOT_QUEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        chestImage: "/chests/mt-mjolnir.JPG",
        verified: true,
      },
    ],
  },
  {
    id: "goblinforest",
    name: "Goblin Forest",
    levelRange: {
      min: 35,
      max: 39,
    },
    verified: true,
    maps: [
      {
        id: "goblinforest",
        name: "Goblin Forest",
        levelRange: {
          min: 35,
          max: 39,
        },
        availableObjectiveTypes: [
          ObjectiveType.COLLECTION_QUEST_TYPE,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.PHOTO_SPOT_QUEST,
        ],
        verified: true,
      },
    ],
  },
  {
    id: "orcvilage",
    name: "Orc Vilage",
    levelRange: {
      min: 70,
      max: 81,
    },
    verified: true,
    maps: [
      {
        id: "orcvilage",
        name: "Orc Vilage",
        levelRange: {
          min: 70,
          max: 73,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.SPECIAL_QUEST,
        ],
        verified: true,
        chestImage: "/chests/orc-village.JPG",
      },
      {
        id: "orcdungeon",
        name: "Orc Dungeon",
        levelRange: {
          min: 75,
          max: 81,
        },
        verified: true,
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "orcvilagesouth",
    name: "Orc Vilage South",
    levelRange: {
      min: 70,
      max: 73,
    },
    verified: true,
    maps: [
      {
        id: "orcvilagesouth",
        name: "Orc Vilage South",
        levelRange: {
          min: 70,
          max: 73,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/orc-village.JPG",
        verified: true,
      },
    ],
  },
  {
    id: "lighthalzenplain",
    name: "Lighthalzen Plain",
    levelRange: {
      min: 95,
      max: 99,
    },
    maps: [
      {
        id: "lighthalzenplain",
        name: "Lighthalzen Plain",
        levelRange: {
          min: 95,
          max: 99,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/lighthalzen-plain.JPG",
      },
    ],
  },
  {
    id: "lighthalzen",
    name: "Lighthalzen",
    levelRange: {
      min: 101,
      max: 112,
    },
    maps: [
      {
        id: "lighthalzen",
        name: "Lighthalzen",
        levelRange: {
          min: 101,
          max: 112,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "homunculuslabb1f",
        name: "Homunculus Lab B1F",
        levelRange: {
          min: 101,
          max: 112,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/homunculus-lab-b1f.JPG",
      },
      {
        id: "homunculuslabb2feast",
        name: "Homunculus Lab B2F East",
        levelRange: {
          min: 103,
          max: 107,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/homunculus-lab-b2f-east.JPG",
      },
      {
        id: "homunculuslabb2fwest",
        name: "Homunculus Lab B2F West",
        levelRange: {
          min: 103,
          max: 110,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "homunculuslaboratoryunderground3f",
        name: "Homunculus Laboratory Underground 3F",
        levelRange: {
          min: 105,
          max: 110,
        },
        availableObjectiveTypes: [ObjectiveType.CHEST],
        chestImage: "/chests/homunculus-lab-underground-3f.JPG",
      },
    ],
  },
  {
    id: "glastheimoutskirts",
    name: "Glast Heim Outskirts",
    levelRange: {
      min: 76,
      max: 82,
    },
    verified: true,
    maps: [
      {
        id: "glastheimoutskirts",
        name: "Glast Heim Outskirts",
        levelRange: {
          min: 76,
          max: 82,
        },
        verified: true,
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "glastheimoutskirt",
    name: "Glast Heim Outskirt",
    levelRange: {
      min: 76,
      max: 82,
    },
    verified: true,
    maps: [
      {
        id: "glastheimoutskirt",
        name: "Glast Heim Outskirt",
        levelRange: {
          min: 76,
          max: 82,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.SPECIAL_QUEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        verified: true,
        chestImage: "/chests/glast-heim-outskirt.JPG",
      },
    ],
  },
  {
    id: "glastheim",
    name: "Glast Heim",
    levelRange: {
      min: 80,
      max: 99,
    },
    verified: true,
    maps: [
      {
        id: "glastheim",
        name: "Glast Heim",
        levelRange: {
          min: 80,
          max: 82,
        },
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.PHOTO_SPOT,
          ObjectiveType.SIDE_QUEST,
          ObjectiveType.SPECIAL_QUEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
          ObjectiveType.BARD_QUEST_TYPE1,
          ObjectiveType.HAT_QUEST,
        ],
        verified: true,
        chestImage: "/chests/glast-heim.JPG",
      },
      {
        id: "glastheimculvert",
        name: "Glast Heim Culvert",
        levelRange: {
          min: 83,
          max: 89,
        },
        verified: true,
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
        chestImage: "/chests/glast-heim-culvert.JPG",
      },
      {
        id: "glastheimchivalry",
        name: "Glast Heim Chivalry",
        levelRange: {
          min: 91,
          max: 95,
        },
        verified: true,
        availableObjectiveTypes: [ObjectiveType.DELIVERY_QUEST],
      },
      {
        id: "glastheimhall",
        name: "Glast Heim Hall",
        levelRange: {
          min: 94,
          max: 99,
        },
        verified: true,
        availableObjectiveTypes: [
          ObjectiveType.DELIVERY_QUEST,
          ObjectiveType.DAILY_QUEST,
        ],
      },
      {
        id: "glastheimwing",
        name: "Glast Heim Wing",
        levelRange: {
          min: 94,
          max: 99,
        },
        verified: true,
        availableObjectiveTypes: [],
      },
      {
        id: "glastheimchurchyard",
        name: "Glast Heim Churchyard",
        levelRange: {
          min: 84,
          max: 90,
        },
        verified: true,
        availableObjectiveTypes: [
          ObjectiveType.CHEST,
          ObjectiveType.COLLECTION_QUEST_TYPE,
        ],
      },
      {
        id: "glastheimchurchyard2f",
        name: "Glast Heim Churchyard 2F",
        levelRange: {
          min: 84,
          max: 90,
        },
        verified: true,
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "umbala",
    name: "Umbala",
    levelRange: {
      min: 0,
      max: 0,
    },
    maps: [
      {
        id: "umbala",
        name: "Umbala",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "hvergelmir",
        name: "Hvergelmir",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "theplainofida",
    name: "The Plain of Ida",
    levelRange: {
      min: 133,
      max: 138,
    },
    maps: [
      {
        id: "theplainofida",
        name: "The Plain of Ida",
        levelRange: {
          min: 133,
          max: 137,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "holyicecave",
        name: "Holy Ice Cave",
        levelRange: {
          min: 134,
          max: 138,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "rachel",
    name: "Rachel",
    levelRange: {
      min: 132,
      max: 141,
    },
    maps: [
      {
        id: "rachel",
        name: "Rachel",
        levelRange: {
          min: 132,
          max: 141,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "holyground",
        name: "Holy Ground",
        levelRange: {
          min: 132,
          max: 141,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "holygroundunderground",
        name: "Holy Ground Underground",
        levelRange: {
          min: 132,
          max: 141,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "luoyang",
    name: "Luoyang",
    levelRange: {
      min: 0,
      max: 0,
    },
    maps: [
      {
        id: "luoyang",
        name: "Luoyang",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "flowerstreet",
        name: "Flower Street",
        levelRange: {
          min: 0,
          max: 0,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "sunsetbeach",
    name: "Sunset Beach",
    levelRange: {
      min: 121,
      max: 125,
    },
    maps: [
      {
        id: "sunsetbeach",
        name: "Sunset Beach",
        levelRange: {
          min: 121,
          max: 125,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "eclage",
    name: "Eclage",
    levelRange: {
      min: 127,
      max: 135,
    },
    maps: [
      {
        id: "eclage",
        name: "Eclage",
        levelRange: {
          min: 127,
          max: 135,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "mercurypalace",
        name: "Mercury Palace",
        levelRange: {
          min: 127,
          max: 135,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "birthplaceofgod",
        name: "Birthplace of God",
        levelRange: {
          min: 127,
          max: 135,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "floatingstarrock",
        name: "Floating Star Rock",
        levelRange: {
          min: 127,
          max: 135,
        },
        availableObjectiveTypes: [],
      },
      {
        id: "seaofazureclouds",
        name: "Sea of Azure Clouds",
        levelRange: {
          min: 127,
          max: 135,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
  {
    id: "timegarden",
    name: "Time Garden",
    levelRange: {
      min: 126,
      max: 131,
    },
    maps: [
      {
        id: "timegarden",
        name: "Time Garden",
        levelRange: {
          min: 126,
          max: 131,
        },
        availableObjectiveTypes: [],
      },
    ],
  },
];
