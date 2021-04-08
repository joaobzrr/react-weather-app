export function formatTemperature(value: number) {
    return value.toString() + " º";
}

export function isNumber(value: any) {
    return typeof value === "number";
}
