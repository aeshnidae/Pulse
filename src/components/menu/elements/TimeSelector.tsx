import React, { useState } from 'react';

export function TimeSelector() {
    const [hours, setHours] = useState<string>('09');
    const [minutes, setMinutes] = useState<string>('30');

    // Simple change handler for demonstration
    const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
    };

    return (
        <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg shadow-inner">
            {/* Hours Input */}
            <div className="flex flex-col items-center">
                <label htmlFor="hours" className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Hours</label>
                <input
                    id="hours"
                    type="number"
                    value={hours}
                    onChange={(e) => handleTimeChange(setHours, e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center"
                    min="0"
                    max="23"
                />
            </div>

            {/* Separator */}
            <span className="text-xl font-bold text-gray-600">:</span>

            {/* Minutes Input */}
            <div className="flex flex-col items-center">
                <label htmlFor="minutes" className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Minutes</label>
                <input
                    id="minutes"
                    type="number"
                    value={minutes}
                    onChange={(e) => handleTimeChange(setMinutes, e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center"
                    min="0"
                    max="59"
                />
            </div>
        </div>
    );
}