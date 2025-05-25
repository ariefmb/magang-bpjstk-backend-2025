export const calculateQuarter = (date: Date): number => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let quarter = Math.ceil(month / 3);

    const isEndMonthOfQuarter = month % 3 === 0;

    if (isEndMonthOfQuarter && day > 20) quarter += 1;
    if (quarter > 4) quarter = 1;

    return quarter;
};
