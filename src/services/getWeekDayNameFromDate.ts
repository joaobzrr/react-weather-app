const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// @Todo: Move the abbreviation logic out of here.
export default function getWeekDayNameFromDate(d: Date, abbrev: boolean = false) {
    const name = weekDayNames[d.getDay()];
    return abbrev ? name.substring(0, 3) : name;
}
