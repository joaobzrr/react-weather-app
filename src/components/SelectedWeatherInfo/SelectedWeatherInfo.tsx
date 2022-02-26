import React from "react";
import MeasurementSystemSelector from "$components/MeasurementSystemSelector";
import WeatherIcon from "$components/WeatherIcon";
import {
    Callback,
    CurrentWeatherData,
    DailyWeatherData,
    LocationData,
    MeasurementSystem
} from "$types/common";
import "./SelectedWeatherInfo.scss";

type PropsType = {
    onSelectMeasurementSystem: Callback<[MeasurementSystem]>;
    weatherData:               CurrentWeatherData|DailyWeatherData;
    locationData:              LocationData;
    measurementSystem:         MeasurementSystem;
}

// @Temporary Using placeholder iconCode for now.
export default function SelectedWeatherInfo(props: PropsType) {
    const { onSelectMeasurementSystem, weatherData, locationData, measurementSystem } = props;

    const speedUnit = (measurementSystem === "metric") ? "km/h" : "mph";

    return (
        <div className="SelectedWeatherInfo">
            <div className="flex justify-content-between">
                <div className="flex">
                    <span className="SelectedWeatherInfo_temperature">
                        {weatherData.temperature}º
                    </span>
                    <MeasurementSystemSelector
                        onSelectMeasurementSystem={onSelectMeasurementSystem}
                        measurementSystem={measurementSystem}
                    />
                </div>
                <div className="flex">
                    <div className="mr2 flex flex-column justify-content-center align-items-flex-end">
                        <div className="SelectedWeatherInfo_description">{"Clear"}</div>
                        <div className="SelectedWeatherInfo_details flex flex-column align-items-flex-end">
                            <div>Precipitation: {weatherData.precipitationProbability}%</div>
                            <div>Humidity: {weatherData.humidity}%</div>
                            <div>Wind: {weatherData.windSpeed} {speedUnit}</div>
                        </div>
                    </div>
                    <WeatherIcon
                        iconCode={weatherData.icon}
                        className="SelectedWeatherInfo_icon"
                    />
                </div>
            </div>
        </div>
    );
}
