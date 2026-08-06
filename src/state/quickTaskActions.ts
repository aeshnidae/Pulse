import { useAppStore } from "../state/useAppStore";

export const processQuickTaskTick = (now: Date) => {
  const currentState = useAppStore.getState();

  if (!currentState.isQuickTaskActive) {
    return;
  }
  
  if (currentState.quickTaskEnd != null && now >= currentState.quickTaskEnd) {
    console.log("Quick task has finished");
    // Send notification
    useAppStore.setState({
      isQuickTaskActive: false,
    });
  }
};