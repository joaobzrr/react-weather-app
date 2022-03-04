import React from "react";
import WeatherIcon from "$components/WeatherIcon";
import {
    Callback,
    CurrentWeatherData,
    DailyWeatherData,
    LocationData
} from "$types/common";
import "./SelectedWeatherInfo.scss";

type PropsType = {
    weatherData:         CurrentWeatherData|DailyWeatherData;
    locationData:        LocationData;
    usingImperialSystem: boolean;
}

// @Temporary Using placeholder iconCode for now.
export default function SelectedWeatherInfo(props: PropsType) {
    const { weatherData, locationData, usingImperialSystem } = props;

    const speedUnit = usingImperialSystem ? "mph" : "km/h";

    return (
        <div className="SelectedWeatherInfo">
            <span className="SelectedWeatherInfo_temperature">
                {weatherData.temperature}&#x00B0;
            </span>
            <div className="flex">
                <div className="SelectedWeatherInfo_details">
                    <span>Precipitation: {weatherData.precipitationProbability}%</span>
                    <span>Humidity: {weatherData.humidity}%</span>
                    <span>Wind: {weatherData.windSpeed} {speedUnit}</span>
                </div>
                <div className="flex flex-column justify-content-center align-items-center">
                    <WeatherIcon
                        iconCode={weatherData.icon}
                        className="SelectedWeatherInfo_icon"
                    />
                    <div className="SelectedWeatherInfo_description">{weatherData.description}</div>
                </div>
            </div>
        </div>
    );
}
