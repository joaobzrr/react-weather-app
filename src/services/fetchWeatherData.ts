import axios, { AxiosResponse } from "axios";
import { isNumber } from "$src/utils";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData
} from "$src/types";

export default async function fetchWeatherData(lat: number, lon: number) {
    const key = __OPEN_WEATHER_MAP_API_KEY__;
    const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
    const query = `?lat=${lat}&lon=${lon}&units=metric&appid=${key}`; // @Note: Assuming metric system for now.

    return axios.get(baseUrl + query).then((response: AxiosResponse<any>) => {
        const data = response.data;

        const result: WeatherData = {} as WeatherData;

        const precipitation = data.hourly[1].pop;
        result.current = processCurrentWeatherData(data.current, precipitation);

        result.daily = [];
        for (let i = 0; i < data.daily.length - 1; i++) {
            result.daily.push(processForecastedWeatherData(data.daily[i]));
        }

        return result;
    });
}

function processBaseWeatherData(data: {[key: string]: any}) {
    const dt = new Date(data.dt * 1000);
    const description =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);

    const iconCode  = data.weather[0].icon;
    const humidity  = data.humidity;
    const windSpeed = Math.round(data.wind_speed * 3.6);

    return { dt, description, iconCode, humidity, windSpeed };
}

function processCurrentWeatherData(data: {[key: string]: any}, precipitation: number) {
    const result = processBaseWeatherData(data) as CurrentWeatherData;
    result.temperature   = Math.round(data.temp);
    result.precipitation = Math.round(precipitation * 100);
    return result;
}

function processForecastedWeatherData(data: {[key: string]: any}) {
    const result = processBaseWeatherData(data) as ForecastedWeatherData;
    result.maxTemperature = Math.round(data.temp.max);
    result.minTemperature = Math.round(data.temp.min);
    result.precipitation  = Math.round(data.pop * 100);
    return result;
}
