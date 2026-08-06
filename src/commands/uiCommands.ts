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
  useAppStore.setState((state) => {
    const isBeeperActive = !state.isBeeperActive;
    return {
      isBeeperActive,
      // Reset the scheduled beep when turning off, so re-enabling
      // schedules a fresh beep from that point instead of firing a stale one.
      beeperNextBeep: isBeeperActive ? state.beeperNextBeep : null,
    };
  });
};

export const setBeeper = (hours: number, minutes: number) => {
  useAppStore.setState({
    beeperIntervalHours: hours,
    beeperIntervalMinutes: minutes,
    beeperNextBeep: null,
  });
};
