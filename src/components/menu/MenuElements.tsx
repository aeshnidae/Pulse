import { useAppStore } from "../../state/useAppStore";
import { motion, AnimatePresence } from "framer-motion";

import { Beeper } from "./elements/Beeper";
import { QuickTask } from "./elements/QuickTask";

const menuScreens = [
    <Beeper key="Beep"/>,
    <QuickTask key="Task"/>,
    <span key="lol">Empty Menu 3</span>, // Added text just so you can see it while testing
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
    })
}


export function MenuElements() {
    const currentIndex = useAppStore((state) => state.currentMenuIndex);
    const slideDirection = useAppStore((state) => state.slideDirection);

    return (
        <div className="relative overflow-hidden w-32 h-24 bg-black/50">
            <AnimatePresence initial={false} custom={slideDirection}>
                <motion.div
                key={currentIndex}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{type: "tween", duration: 0.3}}
                className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                >
                    {menuScreens[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
    
};
//     return (
//         <div className="
//             items-center justify-center flex flex-col absolute gap-1">
//             <QuickTask />
//             <Beeper />
//         </div>
//     );
// }