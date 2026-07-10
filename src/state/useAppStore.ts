import { create } from "zustand";
import { AppStore } from "../models/store.types";
import { createTimeSlice } from "./slices/TimeSlice";
import { createUiSlice } from "./slices/UiSlice";
import { createSettingsSlice } from "./slices/SettingsSlice";

// We bind the slices together. The (...a) spreads the get/set functions
// that Zustand provides so every slice can access them if needed.
export const useAppStore = create<AppStore>()((...a) => ({
  ...createTimeSlice(...a),
  ...createUiSlice(...a),
  ...createSettingsSlice(...a),
}));
