import axios, { AxiosResponse } from "axios";
import { celsiusToFahrenheit, kphToMph } from "$utils/common";
import {
    BaseWeatherData,
    CurrentWeatherData,
    DailyWeatherData,
    HourlyWeatherData,
    WeatherData
} from "$types/common";

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

export class WeatherDataContainer {
    public metric:   WeatherData;
    public imperial: WeatherData;

    constructor(metric: WeatherData) {
        this.metric = metric;
        this.imperial = WeatherDataContainer.convertWeatherDataToImperialUnits(metric);
    }

    static async fetch(lat: number, lon: number): Promise<WeatherDataContainer> {
        const key = __VISUAL_CROSSING_WEATHER_API_KEY__;
        const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
        const unitGroup = "metric";
        const query = `${lat},${lon}?key=${key}&unitGroup=${unitGroup}&lang=id`;
        const response = await axios.get(baseUrl + query); // @Todd: handle errors.
        const { data } = response;

        const result = {} as WeatherData;
        const currentHourIndex = (new Date()).getHours();
        {
            const { currentConditions } = data;

            const current = {} as CurrentWeatherData;
            current.timestamp     = currentConditions.datetimeEpoch;
            current.icon          = currentConditions.icon;
            current.humidity      = Math.round(currentConditions.humidity);
            current.windSpeed     = Math.round(currentConditions.windspeed);
            current.windDirection = Math.round(currentConditions.winddir);
            current.temperature   = Math.round(currentConditions.temp);
            current.description   = "Clear"; // @Temporary

            const currentHourData = data.days[0].hours[currentHourIndex];
            current.precipitationProbability = Math.round(currentHourData.precipprob);

            result.current = current;
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
                d.timestamp                = item.datetimeEpoch;
                d.icon                     = item.icon;
                d.humidity                 = Math.round(item.humidity);
                d.windSpeed                = Math.round(item.windspeed);
                d.windDirection            = Math.round(item.winddir);
                d.description              = "Clear"; // @Temporary

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
            result.hourly = hourly;
        }

        return new WeatherDataContainer(result);
    }

    private static convertWeatherDataToImperialUnits(data: WeatherData): WeatherData {
        const result = {} as WeatherData;
        result.current = Object.assign({}, data.current);
        result.daily = [];

        for (const item of data.daily) {
            const forecasted = Object.assign({}, item);
            result.daily.push(forecasted);
        }

        const oldTemperature = result.current.temperature;
        const newTemperature = Math.round(celsiusToFahrenheit(oldTemperature));
        result.current.temperature = newTemperature;

        const oldWindSpeed = result.current.windSpeed;
        const newWindSpeed = Math.round(kphToMph(oldWindSpeed));
        result.current.windSpeed = newWindSpeed;

        for (const forecasted of result.daily) {
            const oldMaxTemperature = forecasted.maxTemperature;
            const newMaxTemperature = Math.round(celsiusToFahrenheit(oldMaxTemperature));
            forecasted.maxTemperature = newMaxTemperature;
            forecasted.temperature = newMaxTemperature;

            const oldMinTemperature = forecasted.minTemperature;
            const newMinTemperature = Math.round(celsiusToFahrenheit(oldMinTemperature));
            forecasted.minTemperature = newMinTemperature;

            const oldWindSpeed = forecasted.windSpeed;
            const newWindSpeed = Math.round(kphToMph(oldWindSpeed));
            forecasted.windSpeed = newWindSpeed;
        }

        return result;
    }
}
