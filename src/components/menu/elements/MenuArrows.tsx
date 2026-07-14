import { handleNextMenu, handlePrevMenu } from "../../../commands/menuCommands";
import { useAppStore } from "../../../state/useAppStore";
// Arrows
import { ChevronLeftIcon } from "@animateicons/react/lucide";
import { ChevronRightIcon } from "@animateicons/react/lucide";

export function MenuArrows() {
  const themeColor = useAppStore((state) => state.themeColor);
  return (
    <div className="absolute inset-x-0 px-[0.5] flex justify-between items-center z-20 pointer-events-auto">
      <button onClick={handlePrevMenu}>
        <ChevronLeftIcon size={24} duration={0.4} color={themeColor} />
      </button>

      <button onClick={handleNextMenu}>
        <ChevronRightIcon size={24} duration={0.4} color={themeColor} />
      </button>
    </div>
  );
}
