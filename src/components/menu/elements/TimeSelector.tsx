import React, { useState } from 'react';

export function TimeSelector() {
    const [hours, setHours] = useState<string>('09');
    const [minutes, setMinutes] = useState<string>('30');

    // Simple change handler for demonstration
    const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
    };

    return (
        <div className="flex items-center ">
            {/* Hours Input */}
            <div className="flex flex-col items-center">
                
                <input
                    id="hours"
                    type="number"
                    value={hours}
                    onChange={(e) => handleTimeChange(setHours, e.target.value)}
                    className="
                        text-center text-white 
                        focus:ring-blue-500 focus:border-blue-500 
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    "
                    min="0"
                    max="23"
                />
            </div>

            {/* Minutes Input */}
            <div className="flex flex-col items-center">
                
                <input
                    id="minutes"
                    type="number"
                    value={minutes}
                    onChange={(e) => handleTimeChange(setMinutes, e.target.value)}
                    className="
                        text-center text-white 
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    "
                    min="0"
                    max="59"
                />
            </div>
        </div>
    );
}

// Notes
// <label htmlFor="hours" className="text-xs text-gray-500 mb-1 uppercase tracking-wider">HH</label>
// <span className="text-xl font-bold text-gray-600">:</span>
// border border-gray-300/10