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
    const response = await axios.get(baseUrl + query); // @Todo: handle errors.
    return processWeatherData(response.data);
}

function processWeatherData(data: Record<string, any>): WeatherDataContainer {
    const currentHourIndex = (new Date()).getHours();

    const metric = <WeatherData>{};
    metric.current = makeCurrentWeatherData(data, currentHourIndex);
    metric.daily   = makeDailyWeatherData(data);
    metric.hourly  = makeHourlyWeatherData(data, currentHourIndex);

    const imperial = convertMetricWeatherDataToImperialUnits(metric);

    return { metric, imperial };
}

function makeCurrentWeatherData(data: Record<string, any>, currentHourIndex: number): CurrentWeatherData {
    const { currentConditions } = data;

    const result = <CurrentWeatherData>makeBaseWeatherData(currentConditions);
    result.temperature = Math.round(currentConditions.temp);
    result.description = "Clear"; // @Temporary

    const currentHourData = data.days[0].hours[currentHourIndex];
    result.precipitationProbability = Math.round(currentHourData.precipprob);

    return result;
}

function makeDailyWeatherData(data: Record<string, any>): DailyWeatherData[] {
    const result = <DailyWeatherData[]>[];

    for (const item of data.days.slice(0, 7)) {
        const d = <DailyWeatherData>makeBaseWeatherData(item);
        d.temperature              = Math.round(item.tempmax); // @Note This is on purpose.
        d.maxTemperature           = Math.round(item.tempmax);
        d.minTemperature           = Math.round(item.tempmin);
        d.precipitationProbability = Math.round(item.precipprob);
        d.description              = "Clear"; // @Temporary

        const date = new Date(item.datetimeEpoch * 1000);
        d.weekday = daysOfTheWeek[date.getDay()];

        result.push(d);
    }

    return result;
}

function makeHourlyWeatherData(data: Record<string, any>, currentHourIndex: number): HourlyWeatherData[] {
    const result = <HourlyWeatherData[]>[];

    for (const dailyData of data.days.slice(0, 7)) {
        for (const hourlyData of dailyData.hours) {
            const d = <HourlyWeatherData>makeBaseWeatherData(hourlyData);
            d.temperature =              Math.round(hourlyData.temp);
            d.precipitationProbability = Math.round(hourlyData.precipprob);

            const date = new Date(hourlyData.datetimeEpoch * 1000);
            const hourIndex = date.getHours();
            const half = (hourIndex <= 12) ? "AM" : "PM";
            const hour = (hourIndex % 12) + 1;
            d.time = `${hour} ${half}`;

            result.push(d);
        }
    }

    return result;
}

function makeBaseWeatherData(data: Record<string, any>): BaseWeatherData {
    const result = {} as BaseWeatherData;
    result.humidity        = Math.round(data.humidity);
    result.windSpeed       = Math.round(data.windspeed);
    result.windDirection   = Math.round(data.winddir);
    result.timestamp       = data.datetimeEpoch;
    result.icon            = data.icon;
    return result;
}

function convertMetricWeatherDataToImperialUnits(metric: WeatherData): WeatherData {
    const result = cloneWeatherData(metric);

    result.current.temperature = Math.round(celsiusToFahrenheit(metric.current.temperature));
    result.current.windSpeed   = Math.round(kphToMph(metric.current.windSpeed));

    for (const forecasted of result.daily) {
        forecasted.windSpeed      = Math.round(kphToMph(forecasted.windSpeed));
        forecasted.minTemperature = Math.round(celsiusToFahrenheit(forecasted.minTemperature));
        forecasted.maxTemperature = Math.round(celsiusToFahrenheit(forecasted.maxTemperature));
        forecasted.temperature    = forecasted.maxTemperature;
    }

    for (const forecasted of result.hourly) {
        forecasted.windSpeed   = Math.round(kphToMph(forecasted.windSpeed));
        forecasted.temperature = Math.round(celsiusToFahrenheit(forecasted.temperature));
    }

    return result;
}

function cloneWeatherData(data: WeatherData): WeatherData {
    const result = { daily: [], hourly: [] } as unknown as WeatherData;
    result.current = Object.assign({}, data.current);

    for (const item of data.daily) {
        const forecasted = Object.assign({}, item);
        result.daily.push(forecasted);
    }

    for (const item of data.hourly) {
        const forecasted = Object.assign({}, item);
        result.hourly.push(forecasted);
    }

    return result;
}
