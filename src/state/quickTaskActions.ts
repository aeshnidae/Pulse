import { useAppStore } from "../state/useAppStore";
import { } from "../utils/timeLogic";

export const processQuickTaskTick = (now: Date) => {
  const currentState = useAppStore.getState();
  
  let isQuickTaskActive = currentState.isQuickTaskActive;
  if (isQuickTaskActive && currentState.quickTaskEnd != null && now >= currentState.quickTaskEnd) {
    isQuickTaskActive = false;
    console.log("Quick task has finished");
    // Send notification
  }


  useAppStore.setState({
    isQuickTaskActive: isQuickTaskActive,
  });
};