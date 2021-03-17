const DAYS_OF_THE_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getWeekdayFromDate(d: Date) {
    return DAYS_OF_THE_WEEK[d.getDay()];
}

export function isNumber(value: any) {
    return typeof value === "number";
}
