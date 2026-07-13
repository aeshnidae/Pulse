import { processQuickTaskTick } from "../state/quickTaskActions";
import { processTimeTick } from "../state/timeActions";
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
    // Get the date
    const now = new Date();

    // Takes care of:
    // Current time - Shown on the clockface
    // Date or task - Shown on the clockface
    // Progress bar percentage based on task/day
    processTimeTick(now);

    // Takes care of:
    // Turning off the quick task when it is finished
    processQuickTaskTick(now);

  }, 1000); // Ticks every second
};
