import { StateCreator } from "zustand";
import { AppStore, UiSlice } from "../../models/store.types";

export const createUiSlice: StateCreator<AppStore, [], [], UiSlice> = () => ({
    isMenuActive: false,
    menuIndicator: "B",
})