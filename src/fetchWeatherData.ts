import { isNumber } from "$src/utils";

export type WeatherInfo = {
    dt:                 Date;
    description:        string;
    icon:               string;
    precipitation:      number;
    humidity:           number;
    windSpeed:          number;
    currentTemperature: number;
    maxTemperature:     number;
    minTemperature:     number;
}

export type WeatherData = {
    current: WeatherInfo;
    daily:   WeatherInfo[];
    city:    string;
}

// @nocommit: Where do we put this?
const key = "c75584bd99a68993548367d046a5e341";

export default async function fetchWeatherData(address: string) {
    return fetchCoordinates(address).then(({city, lat, lon}) => {
        const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
        const query = `?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`; // @Note: Assuming metric system for now.

        return fetch(baseUrl + query).then(response => response.json()).then(data => {
            const result: WeatherData = {} as WeatherData;
            result.city = city;

            const earliestPrecipitationPrediction = data.hourly[1].pop;
            result.current = getWeatherInfo(data.current, earliestPrecipitationPrediction);

            result.daily = [];
            for (let i = 0; i < data.daily.length - 1; i++) {
                result.daily.push(getWeatherInfo(data.daily[i], null));
            }

            return result;
        });
    });
}

export async function fetchCoordinates(address: string) {
    const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";
    const query = `?q=${address}&appid=${key}`

    return fetch(baseUrl + query).then(response => response.json()).then(data => {
        return {
            city: data[0].name,
            lat:  data[0].lat.toString(),
            lon:  data[0].lon.toString()
        };
    });
}

function getWeatherInfo(data: any, precipitation: number|null): WeatherInfo {
    let { icon, description } = data.weather[0];

    const result = {} as WeatherInfo;

    result.dt            = new Date(data.dt * 1000);
    result.description   = formatDescription(description);
    result.icon          = getIconURL(icon);
    result.humidity      = data.humidity;
    result.windSpeed     = Math.round(data.wind_speed * 3.6);
    result.precipitation = Math.round(((precipitation !== null) ? precipitation : data.pop) * 100); // @Todo: Use daily data instead of hourly for this.

    if (isNumber(data.temp)) {
        result.currentTemperature = Math.round(data.temp);

        // @Note: Assume max/min temperatures are equal to current temperature.
        result.maxTemperature = result.currentTemperature;
        result.minTemperature = result.currentTemperature;

    } else {
        result.maxTemperature = Math.round(data.temp.max);
        result.minTemperature = Math.round(data.temp.min);

        // @Note: Assume current temperature is equal to maximum temperature.
        result.currentTemperature = result.maxTemperature;
    }

    return result;
}

function getIconURL(iconId: string) {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
}

function formatDescription(description: string) {
    return description.charAt(0).toUpperCase() + description.slice(1);
}
