import { TimeSelector } from "./TimeSelector";
import { useCallback } from "react";
import { useAppStore } from "../../../state/useAppStore";
import { setBeeper, toggleBeeperCommand } from "../../../commands/uiCommands";
import { Switch } from "@headlessui/react";

export function Beeper() {
  // Reactive subscriptions to the store so the component stays in sync
  const hours = useAppStore((state) => state.beeperIntervalHours);
  const minutes = useAppStore((state) => state.beeperIntervalMinutes);
  const isBeeperActive = useAppStore((state) => state.isBeeperActive);

  // 1. Define the scheduling logic
  const handleTimeChangeAndSchedule = useCallback(
    (newHours: number, newMinutes: number) => {
      // 2. Call the setBeeper directly when time changes

      console.log(`Beeper scheduled every ${newHours}:${newMinutes}`);
      setBeeper(newHours, newMinutes);
    },
    [], // Only depends on stable setters
  );

  return (
    <div
      className={`flex flex-col items-center justify-between bg-black/50 rounded-lg shadow-sm w-32 ${isBeeperActive ? "border-2 border-green-500/80" : ""}`}
    >
      {/* Container for Time Selector and Button */}
      <div className="flex items-center justify-between w-full ">
        {/* 2. Time Selector  */}
        <TimeSelector
          hours={hours}
          minutes={minutes}
          onChange={handleTimeChangeAndSchedule}
        />

        <Switch
          checked={isBeeperActive}
          onChange={toggleBeeperCommand}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
          />
        </Switch>
      </div>
    </div>
  );
}
