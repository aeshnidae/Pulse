import { useAppStore } from "../state/useAppStore";
import { calculateNextMenuIndex, calculatePrevMenuIndex } from "../utils/menuLogic";

export const handleNextMenu = () => {
    const state = useAppStore.getState();
    const nextIndex = calculateNextMenuIndex(state.currentMenuIndex, state.menuItemsCount);

    useAppStore.setState({
        currentMenuIndex: nextIndex,
        slideDirection: 1
    });
};

export const handlePrevMenu = () => {
    const state = useAppStore.getState();
    const prevIndex = calculatePrevMenuIndex(state.currentMenuIndex, state.menuItemsCount);
    
    useAppStore.setState({
        currentMenuIndex: prevIndex,
        slideDirection: -1,
    })
}