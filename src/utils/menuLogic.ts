export const calculateNextMenuIndex = (currentIndex: number, maxItems: number) => {
    return (currentIndex + 1) % maxItems;
};

export const calculatePrevMenuIndex = (currentIndex: number, maxItems: number) => {
    return (currentIndex - 1 + maxItems) % maxItems;
}