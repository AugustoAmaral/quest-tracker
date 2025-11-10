import { gameData } from '../src/data/maps';

const sorted = gameData.sort((a, b) => a.levelRange.max - b.levelRange.max);

const json = JSON.stringify(sorted, null, 2);

// Mapeia as strings de volta para ObjectiveType
const result = json
  .replace(/"main_quest"/g, 'ObjectiveType.MAIN_QUEST')
  .replace(/"side_quest"/g, 'ObjectiveType.SIDE_QUEST')
  .replace(/"daily_quest"/g, 'ObjectiveType.DAILY_QUEST')
  .replace(/"special_quest"/g, 'ObjectiveType.SPECIAL_QUEST')
  .replace(/"key_quest"/g, 'ObjectiveType.KEY_QUEST')
  .replace(/"hat_quest"/g, 'ObjectiveType.HAT_QUEST')
  .replace(/"photo_spot_quest"/g, 'ObjectiveType.PHOTO_SPOT_QUEST')
  .replace(/"bard_quest_1"/g, 'ObjectiveType.BARD_QUEST_TYPE1')
  .replace(/"bard_quest_2"/g, 'ObjectiveType.BARD_QUEST_TYPE2')
  .replace(/"battle_quest"/g, 'ObjectiveType.BATTLE_QUEST')
  .replace(/"collection_quest"/g, 'ObjectiveType.COLLECTION_QUEST_TYPE')
  .replace(/"delivery_quest"/g, 'ObjectiveType.DELIVERY_QUEST')
  .replace(/"photo_spot"/g, 'ObjectiveType.PHOTO_SPOT')
  .replace(/"chest"/g, 'ObjectiveType.CHEST');

console.log(result);
