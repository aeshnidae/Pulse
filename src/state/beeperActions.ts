import { useAppStore } from "../state/useAppStore";
import { calculateEndTime } from "../utils/timeLogic";

export const processBeeperTick = (now: Date) => {
  const currentState = useAppStore.getState();

  if (!currentState.isBeeperActive) {
    return;
  }
  
  if (!currentState.beeperNextBeep) {
    console.log("We settin up the beepa");
    setNextBeep(now);
    return;
  }

  const nextBeepTime = currentState.beeperNextBeep.getTime();
  const currentTimeMs = now.getTime();

  if (currentTimeMs >= nextBeepTime) {
    console.log("BEEP");
    

    setNextBeep(now);
  };


};

const setNextBeep = (now: Date): void => {
  const currentState = useAppStore.getState();
  const intervalHours = currentState.beeperIntervalHours;
  const intervalMinutes = currentState.beeperIntervalMinutes;
  const nextBeepDate = calculateEndTime(now, intervalHours, intervalMinutes);
  useAppStore.setState({beeperNextBeep: nextBeepDate});
};