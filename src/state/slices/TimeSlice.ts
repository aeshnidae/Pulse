import { StateCreator } from "zustand";
import { AppStore, TimeSlice } from "../../models/store.types";

export const createTimeSlice: StateCreator<AppStore, [], [], TimeSlice> = () => ({
    progressPercent: 50,
    seconds: "0",
    minutes: "00",
    hours: "12",
    dateOrTask: "12 JUN FRI"
})