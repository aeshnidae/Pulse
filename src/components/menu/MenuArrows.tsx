import {} from "../../commands/uiCommands";
import { useAppStore } from "../../state/useAppStore";
// Arrows
import { ChevronLeftIcon } from "@animateicons/react/lucide";
import { ChevronRightIcon } from "@animateicons/react/lucide";

export function MenuArrows() {
  const themeColor = useAppStore((state) => state.themeColor);
  return (
    <div className="flex justify-between items-center w-full">
      <button>
        <ChevronLeftIcon size={24} duration={0.4} color={themeColor} />
      </button>

      <button>
        <ChevronRightIcon size={24} duration={0.4} color={themeColor} />
      </button>
    </div>
  );
}
