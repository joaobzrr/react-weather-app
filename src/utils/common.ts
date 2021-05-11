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

export function cloneDate(date: Date) {
    return new Date(date.getTime());
}

export function cloneWeatherData(data: WeatherData): WeatherData {
    const result = {} as WeatherData;

    result.current = Object.assign({}, data.current);
    result.current.dt = new Date(cloneDate(result.current.dt));

    result.daily = [];
    for (const item of data.daily) {
        const forecasted = Object.assign({}, item);
        forecasted.dt = cloneDate(item.dt);
        result.daily.push(forecasted);
    }

    return result;
}
