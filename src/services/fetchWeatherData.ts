import axios, { AxiosResponse } from "axios";
import { isNumber } from "$src/utils";

export default async function fetchWeatherData(lat: number, lon: number) {
    const key = __OPEN_WEATHER_MAP_API_KEY__;
    const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
    const query = `?lat=${lat}&lon=${lon}&units=metric&appid=${key}`; // @Note: Assuming metric system for now.

    return axios.get(baseUrl + query).then((response: AxiosResponse<any>) => {
        const data = response.data;

        const result: WeatherData = {} as WeatherData;
        result.current = new CurrentWeatherData(data);

        result.daily = [];
        for (let i = 0; i < data.daily.length - 1; i++) {
            result.daily.push(new ForecastedWeatherData(data.daily[i]));
        }

        return result;
    });
}

export class BaseWeatherData {
    dt:           Date;
    description:  string;
    iconCode:     string;
    humidity:     number;
    windSpeed:    number;

    constructor(data: {[key: string]: any}) {
        this.dt = new Date(data.dt * 1000);
        this.description =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);

        this.iconCode  = data.weather[0].icon;
        this.humidity  = data.humidity;
        this.windSpeed = Math.round(data.wind_speed * 3.6);
    }
}

export class CurrentWeatherData extends BaseWeatherData {
    temperature:   number;
    precipitation: number;

    constructor(data: {[key: string]: any}) {
        super(data.current);

        this.temperature   = Math.round(data.current.temp);
        this.precipitation = Math.round(data.hourly[1].pop * 100);
    }
}

export class ForecastedWeatherData extends BaseWeatherData {
    maxTemperature: number;
    minTemperature: number;
    precipitation:  number;

    constructor(data: {[key: string]: any}) {
        super(data);

        this.maxTemperature = Math.round(data.temp.max);
        this.minTemperature = Math.round(data.temp.min);
        this.precipitation  = Math.round(data.pop * 100);
    }
}

export type WeatherData = {
    current: CurrentWeatherData;
    daily:   ForecastedWeatherData[];
}
