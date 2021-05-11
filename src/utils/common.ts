import { NamedComponent, WeatherData } from "$types/common";

export function getFunctionalComponentName<P>(Component: NamedComponent<P>): string | undefined {
    if (Component._name !== undefined) {
        return Component._name;
    } else if (Component.displayName !== undefined) {
        return Component.displayName;
    } else {
        return Component.name;
    }
}

export function clamp(n: number, lower: number, upper: number): number {
    return Math.max(lower, Math.min(n, upper));
}

export function celsiusToFahrenheit(celsius: number) {
    return (celsius * 1.8) + 32;
}

export function kphToMph(kph: number) {
    return kph / 1.609;
}

export function cloneDate(date: Date) {
    return new Date(date.getTime());
}
