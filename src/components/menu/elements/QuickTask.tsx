import { TimeSelector } from "./TimeSelector";
import { PlayIcon } from "@animateicons/react/lucide";

export function QuickTask() {
    return(
        // Changed to flex-col (column) to stack items vertically
        <div className="flex flex-col items-center justify-between bg-black/50 rounded-lg shadow-sm w-32">
            
            {/* 1. Text Input Box (Task Description) - Now the top element */}
            <input
                type="text"
                placeholder=" Quick task..."
                // Added flex-grow to make it take up available width, and adjusted padding/margin for better spacing
                className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-white" 
            />

            {/* Container for Time Selector and Button - Now the bottom row */}
            <div className="flex items-center justify-center w-full ">
                
                {/* 2. Time Selector  */}
                <TimeSelector />

                {/* 3. Start Button */}
                <button
                    //className="transition duration-150 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <PlayIcon size={20} color="#ffffff" />
                </button>

            </div>

        </div >
    );
}