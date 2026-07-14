import { useAppStore } from "../state/useAppStore";
import { AnimatePresence, motion, Variants } from "framer-motion";

// UI
import { MenuIndicator } from "./menu/elements/MenuIndicator";
import { MenuArrows } from "./menu/elements/MenuArrows";
import { MenuElements } from "./menu/MenuElements";
import { CircleChevronDownIcon } from "@animateicons/react/lucide";

//Commands
import { toggleMenuCommand } from "../commands/uiCommands";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.2,
      staggerChildren: 0.1, // Animate buttons sequentially
      delayChildren: 0.1, // Wait slightly before starting button animations
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export function MenuEntry() {
  const isMenuActive = useAppStore((state) => state.isMenuActive);

  return (
    <AnimatePresence>
      {isMenuActive && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 z-10 bg-black/20 flex flex-col items-center justify-center"
        >
          <MenuIndicator />
          <MenuArrows />
          <MenuElements />

          {/* Back Button */}
          <button
            className="absolute bottom-3 z-20"
            onClick={toggleMenuCommand}
          >
            <CircleChevronDownIcon size={20} color="#ffffff" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
