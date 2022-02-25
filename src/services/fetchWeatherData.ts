import axios, { AxiosResponse } from "axios";
import { celsiusToFahrenheit, kphToMph } from "$utils/common";
import {
    BaseWeatherData,
    CurrentWeatherData,
    DailyWeatherData,
    HourlyWeatherData,
    WeatherData,
    WeatherDataContainer
} from "$types/common";

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherDataContainer> {
    const key = __VISUAL_CROSSING_WEATHER_API_KEY__;
    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const unitGroup = "metric";
    const query = `${lat},${lon}?key=${key}&unitGroup=${unitGroup}&lang=id`;
    const response = await axios.get(baseUrl + query); // @Todd: handle errors.
    const { data } = response;

    const metric = {} as WeatherData;
    const currentHourIndex = (new Date()).getHours();
    {
        const { currentConditions } = data;

        const current = {} as CurrentWeatherData;
        current.humidity      = Math.round(currentConditions.humidity);
        current.windSpeed     = Math.round(currentConditions.windspeed);
        current.windDirection = Math.round(currentConditions.winddir);
        current.temperature   = Math.round(currentConditions.temp);
        current.timestamp     = currentConditions.datetimeEpoch;
        current.icon          = currentConditions.icon;
        current.description   = "Clear"; // @Temporary

        const currentHourData = data.days[0].hours[currentHourIndex];
        current.precipitationProbability = Math.round(currentHourData.precipprob);

        metric.current = current;
    }

    const hourlyData = [] as Record<string, any>[];
    {
        const daily = [] as DailyWeatherData[];
        for (const [index, item] of data.days.slice(9).entries()) {
            hourlyData.push(...item.hours);

            const d = {} as DailyWeatherData;
            d.temperature              = Math.round(item.tempmax); // @Note This is on purpose.
            d.maxTemperature           = Math.round(item.tempmax);
            d.minTemperature           = Math.round(item.tempmin);
            d.precipitationProbability = Math.round(item.precipprob);
            d.humidity                 = Math.round(item.humidity);
            d.windSpeed                = Math.round(item.windspeed);
            d.windDirection            = Math.round(item.winddir);
            d.timestamp                = item.datetimeEpoch;
            d.icon                     = item.icon;
            d.description              = "Clear"; // @Temporary

            const date = new Date(item.datetimeEpoch * 1000);
            const weekdayIndex = date.getDay();
            d.weekday = daysOfTheWeek[weekdayIndex];

            daily.push(d);
        }
        metric.daily = daily;
    }

    {
        const hourly = [] as HourlyWeatherData[];
        for (const item of hourlyData.slice(currentHourIndex)) {
            const d = {} as HourlyWeatherData;
            d.timestamp                = item.datetimeEpoch;
            d.icon                     = item.icon;
            d.humidity                 = Math.round(item.humidity);
            d.windSpeed                = Math.round(item.windspeed);
            d.windDirection            = Math.round(item.winddir);
            d.temperature              = Math.round(item.temp);
            d.precipitationProbability = Math.round(item.precipprob);

            hourly.push(d);
        }
        metric.hourly = hourly;
    }

    const imperial = {} as WeatherData;
    imperial.current = Object.assign({}, metric.current);
    imperial.daily = [];

    for (const item of metric.daily) {
        const forecasted = Object.assign({}, item);
        imperial.daily.push(forecasted);
    }

    imperial.current.temperature = Math.round(celsiusToFahrenheit(metric.current.temperature));
    imperial.current.windSpeed   = Math.round(kphToMph(metric.current.windSpeed));

    for (const forecasted of imperial.daily) {
        forecasted.windSpeed      = Math.round(kphToMph(forecasted.windSpeed));
        forecasted.minTemperature = Math.round(celsiusToFahrenheit(forecasted.minTemperature));
        forecasted.maxTemperature = Math.round(celsiusToFahrenheit(forecasted.maxTemperature));
        forecasted.temperature    = forecasted.maxTemperature;
    }

    return { metric, imperial };
}
