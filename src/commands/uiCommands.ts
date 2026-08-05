import { useAppStore } from "../state/useAppStore";
import { calculateEndTime } from "../utils/timeLogic";

export const toggleMenuCommand = () => {
  useAppStore.setState((state) => ({
    isMenuActive: !state.isMenuActive,
  }));
};

export const setQuickTask = (
  taskName: string,
  hours: number,
  minutes: number,
) => {
  const now = new Date();
  const quickTaskEnd = calculateEndTime(now, hours, minutes);
  useAppStore.setState({
    isQuickTaskActive: true,
    quickTaskName: taskName,
    quickTaskStart: now,
    quickTaskEnd: quickTaskEnd,
  });
};

export const stopQuickTask = () => {
  useAppStore.setState({
    isQuickTaskActive: false,
    quickTaskName: "",
  });
};

export const toggleBeeperCommand = () => {
  useAppStore.setState((state) => ({
    isBeeperActive: !state.isBeeperActive,
  }));
};

export const setBeeper = (hours: number, minutes: number) => {
  useAppStore.setState({
    beeperIntervalHours: hours,
    beeperIntervalMinutes: minutes,
    beeperNextBeep: null,
  });
};
