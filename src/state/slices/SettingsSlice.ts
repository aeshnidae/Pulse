import { StateCreator } from "zustand";
import { AppStore, SettingsSlice } from "../../models/store.types";

export const createSettingsSlice: StateCreator<AppStore, [], [], SettingsSlice> = () => ({
    // Default settings

    // Quick Task
    isQuickTaskActive: false,
    quickTaskStart: null,
    quickTaskEnd: null,
    quickTaskName: "",

    // Day Progress
    dayStart: 0,
    dayEnd: 0,

    // Beeper
    isBeeperActive: false,
    beeperInterval: 0,

    // Theme
    scale: 1,
    opacity: 0.8,
    themeColor: "#f45b48"
})