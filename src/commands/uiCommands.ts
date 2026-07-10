import { useAppStore } from "../state/useAppStore";

export const toggleMenuCommand = () => {
  const currentState = useAppStore.getState();

  useAppStore.setState({
    isMenuActive: !currentState.isMenuActive,
  });
};
