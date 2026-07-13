// State
import { useAppStore } from "../../state/useAppStore";
import { motion } from "framer-motion";

export function Time() {
  // Read the context
  const isMenuActive = useAppStore((state) => state.isMenuActive);
  const hours = useAppStore((state) => state.hours);
  const minutes = useAppStore((state) => state.minutes);
  const dateOrTask = useAppStore((state) => state.dateOrTask);
  return (
    <div
      className={`flex flex-col items-center absolute text-5xl text-white/90 text-shadow-sm text-shadow-neutral-800 select-none
                        translation-all duration-300 ease-in-out transform
                        ${isMenuActive ? "-translate-y-16 scale-50" : "translate-y scale-100"}
                        `}
    >
      <div>
        <span>{hours}</span>
        <span className="animate-pulse mx-2">:</span>
        <span>{minutes}</span>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: isMenuActive ? 0 : 1,
          visibility: isMenuActive ? "hidden" : "visible",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-[10px] translate-y-2 font-medium tracking-[0.2em] uppercase bg-red-500/0 text-center">
          {dateOrTask}
        </div>
      </motion.div>
    </div>
  );
}
