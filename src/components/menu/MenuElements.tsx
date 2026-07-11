import { QuickTask } from "./elements/quickTask";

export function MenuElements() {
    return (
        <div className="
            items-center justify-center flex flex-col absolute gap-1">
            <QuickTask />
            <QuickTask />
        </div>
    );
}