import { useAppStore } from "../state/useAppStore";
import { calculateEndTime } from "../utils/timeLogic";

export const toggleMenuCommand = () => {
  const currentState = useAppStore.getState();

  useAppStore.setState({
    isMenuActive: !currentState.isMenuActive,
  });
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
  })
}