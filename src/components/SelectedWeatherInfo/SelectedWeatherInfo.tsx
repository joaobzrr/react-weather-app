import React from "react";
import WeatherIcon from "$components/WeatherIcon";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import {
    CurrentWeatherData,
    ForecastedWeatherData
} from "$services/fetchWeatherData";
import { LocationData } from "$types/global";
import "./SelectedWeatherInfo.scss";

type PropsType = {
    weatherData: CurrentWeatherData | ForecastedWeatherData;
    locationData: LocationData;
}

export default function SelectedWeatherInfo(props: PropsType) {
    const { weatherData, locationData } = props;

    const { description, iconCode, precipitation, humidity, windSpeed } = weatherData;
    const day = getWeekDayNameFromDate(weatherData.dt);
    const temperature = ("temperature" in weatherData) ?
        weatherData.temperature :
        weatherData.maxTemperature;

    const { city } =  locationData;

    return (
        <div className="SelectedWeatherInfo">
            <div className="SelectedWeatherInfo_city">{city}</div>
            <div className="flex justify-content-between">
                <div>
                    <span className="SelectedWeatherInfo_temperature">
                        {temperature}º
                    </span>
                </div>
                <div className="flex">
                    <div className="mr2 flex flex-column justify-content-center align-items-flex-end">
                        <div className="SelectedWeatherInfo_description">{description}</div>
                        <div className="SelectedWeatherInfo_details flex flex-column align-items-flex-end">
                            <div>Precipitation: {precipitation}%</div>
                            <div>Humidity: {humidity}%</div>
                            <div>Wind: {windSpeed} km/h</div>
                        </div>
                    </div>
                    <WeatherIcon iconCode={iconCode}/>
                </div>
            </div>
        </div>
    );
}
