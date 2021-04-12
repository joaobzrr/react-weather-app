import fetchCoordinates from "$services/fetchCoordinates";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData
} from "$services/WeatherData";
import { isNumber } from "$src/utils";

export default async function fetchWeatherData(city: string, lat: number, lon: number) {
    const key = __OPEN_WEATHER_MAP_API_KEY__;
    const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
    const query = `?lat=${lat}&lon=${lon}&units=metric&appid=${key}`; // @Note: Assuming metric system for now.

    return fetch(baseUrl + query).then(response => response.json()).then(data => {
        const result: WeatherData = {} as WeatherData;
        result.city = city;

        result.current = new CurrentWeatherData(data);

        result.daily = [];
        for (let i = 0; i < data.daily.length - 1; i++) {
            result.daily.push(new ForecastedWeatherData(data.daily[i]));
        }

        return result;
    });
}
