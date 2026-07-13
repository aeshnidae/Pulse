//----------------------------------------------------------
// A pure formatting helper for getting the current time
export const formatCurrentTime = (now: Date) => {
  return {
    currentHours: now.getHours().toString().padStart(2, "0"),
    currentMinutes: now.getMinutes().toString().padStart(2, "0"),
    currentSeconds: now.getSeconds().toString(),
  };
};
//----------------------------------------------------------

// ---------------------------------------------------------
// A pure routing helper for calculating progress percentage
export const determineProgress = (
  now: Date,
  isQuickTaskActive: boolean,
  quickTaskStart: Date | null,
  quickTaskEnd: Date | null,
  dayStart: number,
  dayEnd: number,
): number => {
  if (isQuickTaskActive && quickTaskStart && quickTaskEnd) {
    return calculateQuickTaskProgress(quickTaskStart, now, quickTaskEnd);
  }
  return calculateDayProgress(dayStart, now, dayEnd);
};

// Calculate progress for the Quick Task
export const calculateQuickTaskProgress = (
  start: Date,
  now: Date,
  end: Date,
): number => {
  const diff = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  if (diff <= 0) {
    return 0;
  }

  const progress = (elapsed / diff) * 100;
  return Math.round(progress);
};

// Calculate progress for the day
export const calculateDayProgress = (
  dayStart: number,
  now: Date,
  dayEnd: number,
): number => {
  const minutesInDay = 1440;
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  let minutesDuration: number;

  if (dayEnd > dayStart) {
    // Case 1: Normal case (e.g. 09:00 to 17:00). Duration is simply End - Start.
    minutesDuration = dayEnd - dayStart;
  } else if (dayEnd < dayStart) {
    // Case 2: Wrap-around case (e.g. 23:00 to 01:00). Duration crosses midnight.
    // Duration is (minutes left in the first day) + (minutes passed in the next day).
    minutesDuration = minutesInDay - dayStart + dayEnd;
  } else {
    // Case 3: Start time equals End time (e.g., 03:00 to 03:00).
    // We treat this as a full 24-hour cycle for progress calculation.
    minutesDuration = minutesInDay;
  }

  if (minutesDuration <= 0) {
    // Fallback
    const elapsed = minutesNow - dayStart;
    return Math.round((elapsed / minutesInDay) * 100);
  }

  // Calculate the elapsed time from the start of the window up to 'now'.
  const elapsedFromStart = minutesNow - dayStart;

  // Calculate progress as a percentage of the duration.
  const progress = (elapsedFromStart / minutesDuration) * 100;

  return Math.round(progress);
};
//----------------------------------------------------------

//----------------------------------------------------------
// Get the current date string (26 MAY WED)
export function getDateString(now: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric", // ex 13
    month: "short", // ex May
    weekday: "short", // ex Wed
  };
  return now.toLocaleDateString("en-US", options).toUpperCase();
}
//----------------------------------------------------------

//----------------------------------------------------------
// Offset the date with provided hours and minutes
export function calculateEndTime(now: Date, hours: number, minutes: number) {
  const offsetMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  const endTime = new Date(now.getTime() + offsetMs);
  return endTime;
}
//----------------------------------------------------------
