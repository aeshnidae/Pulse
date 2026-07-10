import { StateCreator } from "zustand";
import { AppStore, TimeSlice } from "../../models/store.types";

export const createTimeSlice: StateCreator<AppStore, [], [], TimeSlice> = () => ({
    progressPercent: 17,
    seconds: "0",
    minutes: "0",
    hours: "0",
    dateOrTask: "26 MAY WED"
})