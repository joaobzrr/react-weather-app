import axios, { AxiosResponse } from "axios";
import {
    BaseWeatherData,
    CurrentWeatherData,
    DailyWeatherData,
    HourlyWeatherData,
    WeatherData
} from "$types/common";

const daysOfTheWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

export default async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const key = __VISUAL_CROSSING_WEATHER_API_KEY__;
    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const unitGroup = "metric";
    const query = `${lat},${lon}?key=${key}&unitGroup=${unitGroup}&lang=id`;

    // @Todo: Handle errors.
    const response = await axios.get(baseUrl + query);
    return makeWeatherData(response.data);
}

function makeWeatherData(data: Record<string, any>): WeatherData {
    const currentHourIndex = (new Date()).getHours();

    const result = {} as WeatherData;

    {
        const { currentConditions } = data;

        const current = makeBaseWeatherData(currentConditions) as CurrentWeatherData;
        current.temperature = Math.round(currentConditions.temp);
        current.description = "Clear"; // @Temporary

        // @Note: We take the probability of precipitation from the hourly data
        // which corresponds to the current hour.
        const currentHourData = data.days[0].hours[currentHourIndex];
        current.precipitationProbability = Math.round(currentHourData.precipprob);

        result.current = current;
    }

    const hourlyData = [] as Record<string, any>[];

    {
        const daily = [] as DailyWeatherData[];
        for (const [index, item] of data.days.slice(8).entries()) {
            hourlyData.push(...item.hours)

            const d = makeBaseWeatherData(item) as DailyWeatherData;
            d.description    = "Clear"; // @Temporary
            d.temperature    = Math.round(item.tempmax); // @Note This is on purpose.
            d.maxTemperature = Math.round(item.tempmax);
            d.minTemperature = Math.round(item.tempmin);
            d.precipitationProbability = Math.round(item.precipprob);

            const date = new Date(item.datetimeEpoch * 1000);
            const weekdayIndex = date.getDay();
            d.weekday = daysOfTheWeek[weekdayIndex];

            daily.push(d);
        }
        result.daily = daily;
    }

    {
        const hourly = [] as HourlyWeatherData[];
        for (const item of hourlyData.slice(currentHourIndex)) {
            const d = makeBaseWeatherData(item) as HourlyWeatherData;
            d.temperature = Math.round(item.temp);
            d.precipitationProbability = Math.round(item.precipprob);
            hourly.push(d);
        }
        result.hourly = hourly;
    }

    return result;
}

function makeBaseWeatherData(data: Record<string, any>): BaseWeatherData {
    const result = {} as BaseWeatherData;
    result.timestamp     = data.datetimeEpoch;
    result.icon          = data.icon;
    result.humidity      = Math.round(data.humidity);
    result.windSpeed     = Math.round(data.windspeed);
    result.windDirection = Math.round(data.winddir);
    return result;
}
