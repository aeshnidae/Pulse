// 1. Domain Types

// Everything related to time
export interface TimeSlice {
    progressPercent: number;

    seconds: string;
    minutes: string;
    hours: string;
    dateOrTask: string;

}


// Everything related to the UI state, but can be forgotten on restart
export interface UiSlice {
    isMenuActive: boolean;
    currentMenuIndex: number;
    slideDirection: number;
    menuItemsCount: number,
    // activeTab: 'tasks' | 'settings' | 'none';
}


// Everything related to things that will need to be remembered after a restart
// TODO - Implement setting persistancy after a restart
export interface SettingsSlice {
    // Quick Task
    isQuickTaskActive: boolean;
    quickTaskStart: Date | null;
    quickTaskEnd: Date | null;
    quickTaskName: string;

    // Day Progress
    dayStart: number; // Minutes 
    dayEnd: number; // Minutes

    // Beeper
    isBeeperActive: boolean;
    beeperIntervalHours: number;
    beeperIntervalMinutes: number;
    beeperNextBeep: Date | null;

    // Theme
    scale: number;
    opacity: number;
    themeColor: string;
    // activeTaskName: string | null;
}



















// 2. The Master Type
// This intersects all our slices into one giant object type
export type AppStore = TimeSlice & UiSlice & SettingsSlice;