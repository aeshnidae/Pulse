// UI
import { Time } from "./clockface/Time";
import { MenuEntry } from "./menu/MenuEntry";
// State
import { useAppStore } from "../state/useAppStore";
// Commands
import { toggleMenuCommand } from "../commands/uiCommands";


export function ClockFace() {
  const isMenuActive = useAppStore((state) => state.isMenuActive);
  return (
    <div
      onClick={!isMenuActive ? toggleMenuCommand : undefined}
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
            cursor-pointer
            overflow-hidden"
    >
      <Time />
      <MenuEntry />
    </div>
  );
}
