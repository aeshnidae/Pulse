// State
import { useAppStore } from "../state/useAppStore";

export function ProgressCircle() {
  const radius = 120;
  const strokeWidth = 10;

  const progressPercent = useAppStore((state) => state.progressPercent);
  const themeColor = useAppStore((state) => state.themeColor);

  const circumference = 2 * Math.PI * radius;
  const progress = (progressPercent / 100) * circumference;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      transform="rotate(-90)"
      viewBox="-25 -25 250 250"
      className="absolute -z-1"
    >
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="transparent"
        stroke={themeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-linear"
      />
    </svg>
  );
}
