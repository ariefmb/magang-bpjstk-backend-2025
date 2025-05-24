export const calculateQuarter = (date: Date) => {
    const month = date.getMonth();
    return Math.ceil(month / 3);
};
