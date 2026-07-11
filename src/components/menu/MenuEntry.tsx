import { useAppStore } from "../../state/useAppStore";
import { AnimatePresence, motion, Variants } from "framer-motion";

// UI
import { MenuIndicator } from "./MenuIndicator";
import { MenuArrows } from "./MenuArrows";
import { MenuElements } from "./MenuElements";
import { CircleChevronDownIcon } from "@animateicons/react/lucide";

//Commands
import { toggleMenuCommand } from "../../commands/uiCommands";

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

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.1 },
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
          className="size-44 rounded-full bg-black/20 flex items-center justify-center"
        >
          <MenuIndicator />
          <MenuArrows />
          <MenuElements />

          {/* Back Button */}
          <button
            className="absolute translate-y-16"
            onClick={toggleMenuCommand}
          >
            <CircleChevronDownIcon size={20} color="#ffffff" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
