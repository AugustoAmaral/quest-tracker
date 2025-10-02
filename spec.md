# Ragnarok Mobile Classic - Progress Tracker System Documentation

## 1. System Overview

### 1.1 Objective

Develop a web application for individual progress tracking in Ragnarok Mobile Classic, allowing players to mark completed objectives in each game map.

### 1.2 Main Features

- **No Backend**: Data stored locally (LocalStorage)
- **Mobile-First**: Responsive interface optimized for mobile devices
- **Multi-Character**: Support for multiple progress profiles
- **Offline-First**: Works completely offline after initial load

## 2. Data Structure

### 2.1 Map Hierarchy

```typescript
interface Region {
  id: string; // Unique region ID (e.g., "prontera")
  name: string; // Region name
  levelRange: {
    min: number;
    max: number;
  };
  maps: Map[];
}

interface Map {
  id: string; // Unique map ID (e.g., "prontera_field_01")
  name: string; // Map name
  levelRange: {
    min: number;
    max: number;
  };
  objectives: Objective[];
  chestImage?: string; // Path to image showing chest locations
}

interface Objective {
  id: string; // Unique objective ID
  type: ObjectiveType;
  name: string; // Objective description
  repeatable: boolean; // If repeatable (only for dailies)
}

enum ObjectiveType {
  MAIN_QUEST = "main_quest",
  SIDE_QUEST = "side_quest",
  DAILY_QUEST = "daily_quest",
  SPECIAL_QUEST = "special_quest",
  BARD_QUEST_TYPE1 = "bard_quest_1",
  BARD_QUEST_TYPE2 = "bard_quest_2",
  PHOTO_QUEST = "photo_quest",
  BATTLE_QUEST = "battle_quest",
  DELIVERY_QUEST_TYPE1 = "delivery_quest_1",
  DELIVERY_QUEST_TYPE2 = "delivery_quest_2",
  PHOTO_SPOT_TYPE1 = "photo_spot_1",
  PHOTO_SPOT_TYPE2 = "photo_spot_2",
  CHEST = "chest",
}
```

### 2.2 User Progress Structure

```typescript
interface UserProgress {
  profiles: Profile[];
  activeProfileId: string;
  lastUpdated: number;
  version: string; // Schema version for future compatibility
}

interface Profile {
  id: string; // Generated UUID
  name: string; // Character/profile name
  createdAt: number; // Creation timestamp
  completedObjectives: CompletedObjective[];
  statistics: Statistics;
}

interface CompletedObjective {
  mapId: string;
  objectiveId: string;
  objectiveType: ObjectiveType;
  completedAt: number; // Timestamp
}

interface Statistics {
  totalCompleted: number;
  completedByType: Record<ObjectiveType, number>;
  regionsCompleted: number;
  mapsCompleted: number;
  lastActivity: number;
}
```

## 3. System Features

### 3.1 Core Features

#### 3.1.1 Profile Management

- **Create Profile**: Add new profile with custom name
- **Select Profile**: Switch between existing profiles
- **Edit Profile**: Rename existing profile
- **Delete Profile**: Remove profile (with confirmation)
- **Active Profile**: Visual indication of currently selected profile

#### 3.1.2 Map Navigation

- **Region List**: Display all available regions
- **Maps per Region**: Expand region to see maps
- **Search**: Search regions/maps by name or level
- **Filters**:
  - By completion status (complete/incomplete/partial)
  - By level range
  - By available objective type

#### 3.1.3 Objective Tracking

- **Check/Uncheck**: Radio button for each objective
- **Progress Visualization**:
  - Progress bar per map
  - Completion percentage
  - Visual indicators (colors and star)
- **Chest Image**: View chest locations when available

#### 3.1.4 History

- **Automatic Recording**: Save timestamp for each action
- **Visualization**: Chronological list of completed objectives
- **History Filters**: By date, objective type, region

#### 3.1.5 Import/Export

- **Export**: Download JSON with all LocalStorage data
- **Import**: Load JSON and replace/merge data
- **Validation**: Check imported data integrity
- **Automatic Backup**: Before importing, create backup of current state

### 3.2 Secondary Features

#### 3.2.1 Statistics

- **Dashboard**: Progress overview
- **Charts**: Progress by objective type
- **Achievements**: Progress milestones (25%, 50%, 75%, 100%)

#### 3.2.2 Settings

- **Theme**: Light/Dark
- **Language**: EN/PT-BR
- **Default Sorting**: How to list regions/maps
- **Auto-Save**: Save frequency

## 4. User Interface (UI/UX)

### 4.1 Main Layout

```
┌─────────────────────────────────┐
│  Header                         │
│  ┌──────────┬─────────────────┐│
│  │ Profile ▼│ Ragnarok Tracker││
│  └──────────┴─────────────────┘│
├─────────────────────────────────┤
│  Search Bar                     │
│  ┌─────────────────────────────┐│
│  │ 🔍 Search map...           ││
│  └─────────────────────────────┘│
├─────────────────────────────────┤
│  Filters                        │
│  [Level] [Status] [Type]       │
├─────────────────────────────────┤
│  Region List                    │
│  ┌─────────────────────────────┐│
│  │ ▶ Prontera (Lv 1-20)       ││
│  │   ⭐ 100% Complete          ││
│  ├─────────────────────────────┤│
│  │ ▼ Geffen (Lv 20-40)        ││
│  │   📍 Map 1 [████░░] 60%    ││
│  │   📍 Map 2 [██████] 100% ⭐ ││
│  └─────────────────────────────┘│
├─────────────────────────────────┤
│  Bottom Navigation              │
│  [Maps] [History] [Settings]   │
└─────────────────────────────────┘
```

### 4.2 Map Details Screen

```
┌─────────────────────────────────┐
│  < Back     Map Name            │
├─────────────────────────────────┤
│  Progress Bar                   │
│  [████████░░░░░░] 8/13          │
├─────────────────────────────────┤
│  Chest Locations                │
│  ┌─────────────────────────────┐│
│  │     [Map Image]             ││
│  └─────────────────────────────┘│
├─────────────────────────────────┤
│  Objectives List                │
│  ┌─────────────────────────────┐│
│  │ Main Quests                 ││
│  │ ○ Quest 1                   ││
│  │ ● Quest 2 ⭐                ││
│  ├─────────────────────────────┤│
│  │ Chests                      ││
│  │ ● Chest 1 ⭐                ││
│  │ ○ Chest 2                   ││
│  └─────────────────────────────┘│
└─────────────────────────────────┘
```

### 4.3 Visual Indicators

- **Progress Colors**:
  - 🔴 Red: 0% complete
  - 🟡 Yellow: 1-99% complete
  - 🟢 Green: 100% complete
  - ⭐ Star: Completed objective

- **Icons by Type**:
  - 📜 Main quests
  - 📋 Side quests
  - 🔄 Daily quests
  - ✨ Special quests
  - 🎵 Bard quests
  - 📸 Photo quests/spots
  - ⚔️ Battle quests
  - 📦 Delivery quests
  - 💎 Chests

## 5. User Flows

### 5.1 First Access

1. User accesses the site
2. System checks LocalStorage
3. If empty, display welcome screen
4. Request first profile name
5. Create profile and redirect to region list

### 5.2 Mark Objective as Complete

1. User selects region
2. Expands to see maps
3. Clicks on desired map
4. Views available objectives
5. Marks objective as complete (radio button)
6. System automatically saves to LocalStorage
7. Updates statistics and visual indicators

### 5.3 Export/Import Data

1. User accesses settings
2. Clicks "Export Data"
3. System generates JSON and downloads
4. To import:
   - Click "Import Data"
   - Select JSON file
   - System validates structure
   - Confirm replace/merge
   - Update LocalStorage

## 6. React Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── BottomNav.jsx
│   │   └── ProgressBar.jsx
│   ├── regions/
│   │   ├── RegionList.jsx
│   │   ├── RegionItem.jsx
│   │   └── RegionFilter.jsx
│   ├── maps/
│   │   ├── MapDetail.jsx
│   │   ├── MapObjectives.jsx
│   │   └── ChestImage.jsx
│   ├── profile/
│   │   ├── ProfileSelector.jsx
│   │   └── ProfileManager.jsx
│   └── settings/
│       ├── ImportExport.jsx
│       └── Settings.jsx
├── data/
│   └── maps.json          # Static map data
├── hooks/
│   ├── useLocalStorage.js
│   ├── useProgress.js
│   └── useProfile.js
├── utils/
│   ├── storage.js
│   ├── validators.js
│   └── constants.js
├── styles/
│   ├── global.css
│   └── components/
└── App.jsx
```

## 7. Static Maps JSON Structure Example

```json
{
  "version": "1.0.0",
  "regions": [
    {
      "id": "prontera",
      "name": "Prontera",
      "levelRange": {
        "min": 1,
        "max": 20
      },
      "maps": [
        {
          "id": "prontera_field_01",
          "name": "Prontera Field 01",
          "levelRange": {
            "min": 1,
            "max": 10
          },
          "chestImage": "/images/chests/prontera_field_01.png",
          "objectives": [
            {
              "id": "pf01_main_01",
              "type": "main_quest",
              "name": "Defeat Porings",
              "repeatable": false
            },
            {
              "id": "pf01_chest_01",
              "type": "chest",
              "name": "Hidden Chest Near Tree",
              "repeatable": false
            },
            {
              "id": "pf01_daily_01",
              "type": "daily_quest",
              "name": "Daily Poring Hunt",
              "repeatable": true
            }
          ]
        }
      ]
    }
  ]
}
```

## 8. Error Handling

### 8.1 LocalStorage Errors

- **Storage Full**: Alert user and suggest export/cleanup
- **Parse Error**: Show message and offer reset with backup
- **Corrupted Data**: Validate structure and offer partial recovery

### 8.2 Import Errors

- **Invalid Format**: Show specific invalid fields
- **Version Mismatch**: Attempt automatic migration or alert
- **Missing Required Fields**: List missing required fields

## 9. Optimizations and Performance

### 9.1 LocalStorage

- ~5-10MB limit
- Data compression if necessary
- Clean old data (history > 1 year)

### 9.2 React Optimizations

- Lazy loading for detail components
- Memoization of progress calculations
- Virtual scrolling for long lists
- Debounce on search fields

## 10. Future Implementations

### Phase 2

- Interactive clickable world map
- Achievement system
- Progress sharing (unique URL)
- PWA with complete offline functionality

### Phase 3

- Cloud sync (optional)
- Daily reset notifications
- Guides and tips per map
- Estimated time calculator for 100%

## 11. Deploy and Maintenance

### 11.1 Build and Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### 11.2 Data Updates

1. Edit `src/data/maps.json`
2. Increment version
3. Create new build and deploy
4. Users receive new maps automatically

## 12. Security Considerations

- Validation of all user inputs
- Data sanitization before saving
- Size limit for imports
- Automatic backup before destructive operations
