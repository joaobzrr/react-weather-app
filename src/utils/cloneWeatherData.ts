import { cloneDate } from "$utils/common";
import { WeatherData } from "$types/common";

export default function cloneWeatherData(data: WeatherData): WeatherData {
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
