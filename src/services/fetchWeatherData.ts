import axios, { AxiosResponse } from "axios";
import { iconCodeToDescription } from "$utils/iconCodeToDescription";
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
    const lang = "id";
    const query = `${lat},${lon}?key=${key}&unitGroup=${unitGroup}&lang=${lang}`;
    const response = await axios.get(baseUrl + query); // @Todo: handle errors.
    return processWeatherData(response.data);
}

function processWeatherData(data: Record<string, any>): WeatherDataContainer {
    const metric   = makeMetricWeatherData(data);
    const imperial = convertMetricWeatherDataToImperialUnits(metric);
    const timezone = data.timezone;

    return { metric, imperial, timezone };
}

function makeMetricWeatherData(data: Record<string, any>): WeatherData {
    const flattenedHourData    = flattenHourData(data);
    const currentHourDataIndex = findCurrentHourData(flattenedHourData);
    console.assert(currentHourDataIndex !== -1); // @Note: This should never raise an exception.

    const currentHourData = flattenedHourData[currentHourDataIndex];
    const current = makeCurrentWeatherData(data, currentHourData);

    const pertinentHourData = flattenedHourData.slice(currentHourDataIndex + 1);
    const hourly = makeHourlyWeatherData(pertinentHourData);
    hourly.unshift(current);

    const daily = makeDailyWeatherData(data);

    return { current, hourly, daily };
}

function makeCurrentWeatherData(
    data:            Record<string, any>,
    currentHourData: Record<string, any>
): CurrentWeatherData {
    const { currentConditions } = data;

    const result = <CurrentWeatherData>makeBaseWeatherData(currentConditions);
    result.temperature              = Math.round(currentConditions.temp);
    result.precipitationProbability = Math.round(currentHourData.precipprob);

    return result;
}

function makeDailyWeatherData(data: Record<string, any>): DailyWeatherData[] {
    const result = <DailyWeatherData[]>[];

    for (const item of data.days.slice(0, 7)) {
        const d = <DailyWeatherData>makeBaseWeatherData(item);
        d.temperature              = Math.round(item.tempmax); // @Note: This is on purpose.
        d.maxTemperature           = Math.round(item.tempmax);
        d.minTemperature           = Math.round(item.tempmin);
        d.precipitationProbability = Math.round(item.precipprob);

        const date = new Date(item.datetimeEpoch * 1000);
        d.weekday = daysOfTheWeek[date.getDay()];

        result.push(d);
    }

    return result;
}

function makeHourlyWeatherData(data: Record<string, any>[]): HourlyWeatherData[] {
    const result = <HourlyWeatherData[]>[];
    for (const hd of data.slice(0, 5)) {
        const d = <HourlyWeatherData>makeBaseWeatherData(hd);
        d.temperature =              Math.round(hd.temp);
        d.precipitationProbability = Math.round(hd.precipprob);

        result.push(d);
    }

    return result;
}

function makeBaseWeatherData(data: Record<string, any>): BaseWeatherData {
    const result = {} as BaseWeatherData;
    result.humidity      = Math.round(data.humidity);
    result.windSpeed     = Math.round(data.windspeed);
    result.windDirection = Math.round(data.winddir);
    result.date          = new Date(data.datetimeEpoch * 1000);
    result.icon          = data.icon;
    result.description   = iconCodeToDescription(data.icon);

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

function flattenHourData(data: Record<string, any>): Record<string, any>[] {
    const result = <any[]>[];
    for (const dd of data.days) {
        for (const hd of dd.hours) {
            result.push(hd);
        }
    }
    return result;
}

function findCurrentHourData(flattenedHourData: Record<string, any>[]): number {
    const nowTimestamp = new Date().getTime();

    for (const [hi, hd] of flattenedHourData.entries()) {
        const timestamp = hd.datetimeEpoch * 1000;

        if (timestamp == nowTimestamp) {
            return hi;
        } else if (timestamp > nowTimestamp) {
            return hi - 1;
        }
    }

    return -1;
}

