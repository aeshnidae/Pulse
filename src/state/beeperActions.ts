import { useAppStore } from "../state/useAppStore";
import { calculateEndTime } from "../utils/timeLogic";

export const processBeeperTick = (now: Date) => {
  const currentState = useAppStore.getState();

  if (!currentState.isBeeperActive) {
    return;
  }
  
  if (!currentState.beeperNextBeep) {
    console.log("We settin up the beepa");
    const intervalHours = currentState.beeperIntervalHours;
    const intervalMinutes = currentState.beeperIntervalMinutes;
    const nextBeepDate = calculateEndTime(now, intervalHours, intervalMinutes);
    useAppStore.setState({beeperNextBeep: nextBeepDate});
    return;
  }

  const nextBeepTime = currentState.beeperNextBeep.getTime();
  const currentTimeMs = now.getTime();

  if (currentTimeMs >= nextBeepTime) {
    console.log("BEEP");
    

    useAppStore.setState({beeperNextBeep: null});
  };


};