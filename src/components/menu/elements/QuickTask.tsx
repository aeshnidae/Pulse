import { useState } from "react";
import { TimeSelector } from "./TimeSelector";
import { PlayIcon, XIcon } from "@animateicons/react/lucide";
import { useAppStore } from "../../../state/useAppStore";
import { setQuickTask, stopQuickTask } from "../../../commands/uiCommands";

export function QuickTask() {
  const isQuickTaskActive = useAppStore((state) => state.isQuickTaskActive);
  const defaultTaskName = useAppStore((state) => state.quickTaskName);
  const [taskName, setTaskName] = useState<string>(defaultTaskName);

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(10);



  const prepQuickTask = () => {
    console.log(`Task: "${taskName}" scheduled for ${hours}:${minutes}`);
    setQuickTask(taskName, hours, minutes);
  };

  return (
    // Flex-col (column) to stack items vertically
    <div
      className={`flex flex-col items-center justify-between bg-black/50 rounded-lg shadow-sm w-32 ${isQuickTaskActive ? "border-2 border-green-500/80" : ""}`}
    >
      {/* 1. Text Input Box (Task Description) */}
      <input
        type="text"
        placeholder=" Quick task..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        // Added flex-grow to make it take up available width, and adjusted padding/margin for better spacing
        className="w-full border-gray-300 rounded-md text-sm text-white text-center"
      />

      {/* Container for Time Selector and Button */}
      <div className="flex items-center justify-center w-full ">
        {/* 2. Time Selector  */}
        <TimeSelector
          hours={hours}
          minutes={minutes}
          onChange={(newHours, newMinutes) => {
            setHours(newHours);
            setMinutes(newMinutes);
          }}
        />

        {/* 3. Start / Stop Button */}
        <button type="button" onClick={stopQuickTask}>
          <XIcon size={20} color="#ffffff" />
        </button>
        <button type="button" onClick={prepQuickTask}>
          <PlayIcon size={20} color="#ffffff" />
        </button>

      </div>
    </div>
  );
}
