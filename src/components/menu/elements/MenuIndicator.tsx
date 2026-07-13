import { useAppStore } from "../../../state/useAppStore";
import { motion } from "framer-motion";


// 1. Converts polar coordinates (angle + radius) to cartesian (x, y) for the SVG
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// 2. Generates the SVG `<path d="...">` string for an arc
const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

export function MenuIndicator() {
  const currentState = useAppStore((state) => state.currentMenuIndex);
  // Using a 100x100 viewBox. Radius 48 leaves a 2px padding at the edges.
  const center = 50;
  const radius = 48;

  // Bottom center is 180 degrees.
  // Each segment spans 24 degrees, with a 4-degree gap between them.
  const segments = [
    { id: 2, start: 140, end: 164 },
    { id: 1, start: 168, end: 192 },
    { id: 0, start: 196, end: 220 },
  ] as const;

  return (
    
    <div className="absolute inset-0 pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {segments.map((seg) => {
          const isActive = currentState === seg.id;

          return (
            <motion.path
              key={seg.id}
              d={describeArc(center, center, radius, seg.start, seg.end)}
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={false}
              animate={{
                
                stroke: isActive ? "#5eb339" : "#e6ffdb",
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
}
