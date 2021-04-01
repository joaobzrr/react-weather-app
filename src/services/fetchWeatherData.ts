import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData
} from "$services/WeatherData";
import { isNumber } from "$src/utils";

export default async function fetchWeatherData(address: string) {
    return fetchCoordinates(address).then(({city, lat, lon}) => {
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
    });
}

export async function fetchCoordinates(address: string) {
    const key = __OPEN_WEATHER_MAP_API_KEY__;

    const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";
    const query = `?q=${address}&appid=${key}`;

    return fetch(baseUrl + query).then(response => response.json()).then(data => {
        const { name, lat, lon } = data[0];

        return {
            city: name,
            lat:  lat.toString(),
            lon:  lon.toString()
        };
    });
}
