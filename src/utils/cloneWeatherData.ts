import { WeatherData } from "$types/common";

export default function cloneWeatherData(data: WeatherData): WeatherData {
    const result = {} as WeatherData;

    result.current = Object.assign({}, data.current);

    result.daily = [];
    for (const item of data.daily) {
        const forecasted = Object.assign({}, item);
        result.daily.push(forecasted);
    }

    return result;
}
