import { useAppStore } from "../state/useAppStore";
import {
  determineProgress,
  formatCurrentTime,
  getDateString,
} from "../utils/timeLogic";

export const processTimeTick = (now: Date) => {
  const currentState = useAppStore.getState();
  
  const { currentHours, currentMinutes, currentSeconds } =
    formatCurrentTime(now);

  const currentProgress = determineProgress(
    now,
    currentState.isQuickTaskActive,
    currentState.quickTaskStart,
    currentState.quickTaskEnd,
    currentState.dayStart,
    currentState.dayEnd,
  );

  let dateOrTask = currentState.isQuickTaskActive
    ? currentState.quickTaskName
    : getDateString(now); // E.g., "MON, JUL 13"

  useAppStore.setState({
    seconds: currentSeconds,
    minutes: currentMinutes,
    hours: currentHours,
    progressPercent: currentProgress,
    dateOrTask: dateOrTask,
  });
};
