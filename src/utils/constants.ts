import { ObjectiveType } from '../types';

export const OBJECTIVE_ICONS: Record<ObjectiveType, string> = {
  [ObjectiveType.MAIN_QUEST]: '📜',
  [ObjectiveType.SIDE_QUEST]: '📋',
  [ObjectiveType.DAILY_QUEST]: '🔄',
  [ObjectiveType.SPECIAL_QUEST]: '✨',
  [ObjectiveType.BARD_QUEST_TYPE1]: '🎵',
  [ObjectiveType.BARD_QUEST_TYPE2]: '🎶',
  [ObjectiveType.PHOTO_QUEST]: '📸',
  [ObjectiveType.BATTLE_QUEST]: '⚔️',
  [ObjectiveType.DELIVERY_QUEST_TYPE1]: '📦',
  [ObjectiveType.DELIVERY_QUEST_TYPE2]: '📫',
  [ObjectiveType.PHOTO_SPOT_TYPE1]: '📷',
  [ObjectiveType.PHOTO_SPOT_TYPE2]: '🏞️',
  [ObjectiveType.CHEST]: '💎'
};

export const OBJECTIVE_LABELS: Record<ObjectiveType, string> = {
  [ObjectiveType.MAIN_QUEST]: 'Main Quest',
  [ObjectiveType.SIDE_QUEST]: 'Side Quest',
  [ObjectiveType.DAILY_QUEST]: 'Daily Quest',
  [ObjectiveType.SPECIAL_QUEST]: 'Special Quest',
  [ObjectiveType.BARD_QUEST_TYPE1]: 'Bard Quest Type 1',
  [ObjectiveType.BARD_QUEST_TYPE2]: 'Bard Quest Type 2',
  [ObjectiveType.PHOTO_QUEST]: 'Photo Quest',
  [ObjectiveType.BATTLE_QUEST]: 'Battle Quest',
  [ObjectiveType.DELIVERY_QUEST_TYPE1]: 'Delivery Quest Type 1',
  [ObjectiveType.DELIVERY_QUEST_TYPE2]: 'Delivery Quest Type 2',
  [ObjectiveType.PHOTO_SPOT_TYPE1]: 'Photo Spot Type 1',
  [ObjectiveType.PHOTO_SPOT_TYPE2]: 'Photo Spot Type 2',
  [ObjectiveType.CHEST]: 'Chest'
};

export const APP_VERSION = '1.0.0';

export const COMPLETION_COLORS = {
  EMPTY: '#ef4444', // red-500
  PARTIAL: '#eab308', // yellow-500  
  COMPLETE: '#22c55e' // green-500
};

export const DEFAULT_LEVEL_RANGE = {
  min: 1,
  max: 150
};