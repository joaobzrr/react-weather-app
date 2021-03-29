import { isNumber } from "$src/utils";

export class BaseWeatherData {
    dt:           Date;
    description:  string;
    icon:         string;
    humidity:     number;
    windSpeed:    number;

    constructor(data: {[key: string]: any}) {
        this.dt = new Date(data.dt * 1000);
        this.description =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);

        const url = `https://openweathermap.org/img/wn/`;
        this.icon = `${url}${data.weather[0].icon}@2x.png`;

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
        this.precipitation = data.hourly[1].pop;
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
        this.precipitation  = data.pop;
    }
}

export type WeatherData = {
    current: CurrentWeatherData;
    daily:   ForecastedWeatherData[];
    city:    string;
}

export default async function fetchWeatherData(address: string) {
    return fetchCoordinates(address).then(({city, lat, lon}) => {
        const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
        const query = `?lat=${lat}&lon=${lon}&units=metric&appid=${__OPEN_WEATHER_MAP_API_KEY__}`; // @Note: Assuming metric system for now.

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
    const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";
    const query = `?q=${address}&appid=${__OPEN_WEATHER_MAP_API_KEY__}`;

    return fetch(baseUrl + query).then(response => response.json()).then(data => {
        const { name, lat, lon } = data;

        return {
            city: name,
            lat:  lat.toString(),
            lon:  lon.toString()
        };
    });
}
