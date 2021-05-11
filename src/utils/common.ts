export function clamp(n: number, lower: number, upper: number): number {
    return Math.max(lower, Math.min(n, upper));
}

export function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 1.8) + 32;
}

export function kphToMph(kph: number): number {
    return kph / 1.609;
}

export function cloneDate(date: Date): Date {
    return new Date(date.getTime());
}

export function makeClassName(obj: any, ...classes: string[]): string {
    if (!obj.hasOwnProperty("className")) {
        return "";
    }

    const temp = obj.className;
    delete obj.className;

    const result = [temp, ...classes].join(" ");
    return result;
}
