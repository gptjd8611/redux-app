export const isToday = (dateStr) => {
    const today = new Date();
    const target = new Date(dateStr);
    return (
        today.getFullYear() === target.getFullYear() &&
        today.getMonth() === target.getMonth() &&
        today.getDate() === target.getDate()
    );
};

export const isThisWeek = (dateStr) => {
    const now = new Date();
    const target = new Date(dateStr);
    const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastDay = new Date(now.setDate(firstDay.getDate() + 6));

    return target >= firstDay && target <= lastDay;
};

export const isThisMonth = (dateStr) => {
    const today = new Date();
    const target = new Date(dateStr);
    return (
        today.getFullYear() === target.getFullYear() &&
        today.getMonth() === target.getMonth()
    );
};
