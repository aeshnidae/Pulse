import { useAppStore } from "../state/useAppStore";
import { determineProgress, formatCurrentTime, getDate } from "./timeLogic";

// Quick note, i am saving development time and running this in my own browser for seeing the changes instantly without having to
// recompile everything in tauri. So this Daemon might actually be more bulletproof if we tick it from the rust backend.
// TODO - Reconsider if we should tick from Rust Tokio

// Prevents double mounts
let isDaemonRunning = false;

export const startTimeDaemon = () => {
  // Prevent double start
  if (isDaemonRunning) {
    console.warn("Time Daemon is already running!");
    return;
  }

  isDaemonRunning = true;
  console.log("Time Daemon started.");

  setInterval(() => {
    // Get the current state
    const currentState = useAppStore.getState();

    // Get the date
    const now = new Date();

    // 1. Standard time formatting
    const { currentHours, currentMinutes, currentSeconds } =
      formatCurrentTime(now);

    // 2. Calculate the progress circle
    const currentProgress = determineProgress(
      now,
      currentState.isQuickTaskActive,
      currentState.quickTaskStart,
      currentState.quickTaskEnd,
      currentState.dayStart,
      currentState.dayEnd,
    );

    // 3. Determine the text under the time
    let dateOrTask: string; // Initialize with a type annotation for clarity
    if (currentState.isQuickTaskActive) {
      dateOrTask = currentState.quickTaskName;
    } else {
      dateOrTask = getDate(now); 
    }

    // END: Update the Store
    useAppStore.setState({
      seconds: currentSeconds,
      minutes: currentMinutes,
      hours: currentHours,
      progressPercent: currentProgress,
      dateOrTask: dateOrTask,
    });
  }, 1000); // Ticks every second
};
