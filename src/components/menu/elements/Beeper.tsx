import { TimeSelector } from "./TimeSelector";
import { useState, useEffect } from "react";
import { useAppStore } from "../../../state/useAppStore";
import { setBeeper, toggleBeeperCommand } from "../../../commands/uiCommands";
import { Switch } from "@headlessui/react";

export function Beeper() {
  const currentState = useAppStore.getState();

  const beeperIntervalHours = currentState.beeperIntervalHours;
  const beeperIntervalMinutes = currentState.beeperIntervalMinutes;

  const [hours, setHours] = useState<number>(beeperIntervalHours);
  const [minutes, setMinutes] = useState<number>(beeperIntervalMinutes);
  const isBeeperActive = useAppStore((state) => state.isBeeperActive);

  useEffect(() => {
    if (isBeeperActive) {
      console.log(`Beeper scheduled every ${hours}:${minutes}`);
      setBeeper(hours, minutes);
    } else {
      // Optional: If deactivating, you might want to clear the schedule or log it.
      console.log("Beeper deactivated.");
    }
  }, [isBeeperActive, hours, minutes]); // Dependencies array

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
          onChange={(newHours, newMinutes) => {
            setHours(newHours);
            setMinutes(newMinutes);
          }}
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
