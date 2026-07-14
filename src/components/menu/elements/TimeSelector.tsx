import React from 'react';

interface TimeSelectorProps {
    hours: number;
    minutes: number;
    onChange: (hours: number, minutes: number) => void;
}

export function TimeSelector({ hours, minutes, onChange }: TimeSelectorProps) {
    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHours = parseInt(e.target.value, 10);
        onChange(isNaN(newHours) ? 0 : newHours, minutes);
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinutes = parseInt(e.target.value, 10);
        onChange(hours, isNaN(newMinutes) ? 0 : newMinutes);
    };

    return (
        <div className="flex items-center ">
            {/* Hours Input */}
            <div className="flex flex-col items-center">
                <input
                    id="hours"
                    type="number"
                    value={hours.toString().padStart(2, '0')}
                    onChange={handleHoursChange}
                    className="
                        w-8 text-center text-white bg-transparent outline-none
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
                    value={minutes.toString().padStart(2, '0')}
                    onChange={handleMinutesChange}
                    className="
                        w-8 text-center text-white bg-transparent outline-none
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    "
                    min="0"
                    max="59"
                />
            </div>
        </div>
    );
}