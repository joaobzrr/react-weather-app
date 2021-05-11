import { cloneDate } from "$utils/common";
import { CurrentWeatherData, ForecastedWeatherData } from "$types/common";

export default function forecastedToCurrentWeatherData(data: ForecastedWeatherData): CurrentWeatherData {
    const { maxTemperature, minTemperature, ...rest } = data;
    const result = Object.assign({}, {temperature: maxTemperature}, rest);
    result.dt = cloneDate(result.dt);
    return result;
}
