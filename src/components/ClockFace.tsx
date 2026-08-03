// UI
import { Time } from "./clockface/Time";
import { MenuEntry } from "./MenuEntry";
// State
import { useAppStore } from "../state/useAppStore";
// Commands
import { toggleMenuCommand } from "../commands/uiCommands";


export function ClockFace() {
  const isMenuActive = useAppStore((state) => state.isMenuActive);
  return (
    <div
      onClick={(event) => {
        if (!isMenuActive) {
          event.stopPropagation();
          toggleMenuCommand();
        }
      }}
      className="
            absolute
            flex
            items-center
            justify-center
            size-44
            rounded-full
            bg-black/30
            backdrop-blur-xs
            ring-2
            ring-black/30
            shadow-[0_0_20px_rgba(0,0,0,0.3)]
            cursor-auto
            overflow-hidden"
    >
      <Time />
      <MenuEntry />
    </div>
  );
}
