const weekDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export function getWeekDayNameFromDate(d: Date, abbrev: boolean = false) {
    const name = weekDayNames[d.getDay()];
    return abbrev ? name.substring(0, 3) : name;
}

export function isNumber(value: any) {
    return typeof value === "number";
}
