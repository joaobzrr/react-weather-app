import { WeatherData, NormalizedWeatherData } from "$types/common";

export default function normalizeWeatherData(
    data: WeatherData,
    selected: number
): NormalizedWeatherData {
    if (selected > -1) {
        const { maxTemperature, ...rest } = data.daily[selected];
        const result = Object.assign({}, {temperature: maxTemperature}, rest);
        return result;
    } else {
        const result = data.current as NormalizedWeatherData;
        return result;
    }
}
