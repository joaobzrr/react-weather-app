import React from "react";
import MeasurementSystemSelector from "$components/MeasurementSystemSelector";
import WeatherIcon from "$components/WeatherIcon";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import {
    CurrentWeatherData,
    LocationData,
    MeasurementSystem
} from "$types/common";
import "./SelectedWeatherInfo.scss";

type PropsType = {
    onSelectMeasurementSystem: (measurementSystem: MeasurementSystem) => void;
    weatherData: CurrentWeatherData;
    locationData: LocationData;
    measurementSystem: MeasurementSystem;
}

export default function SelectedWeatherInfo(props: PropsType) {
    const { onSelectMeasurementSystem, weatherData, locationData, measurementSystem } = props;

    const speedUnit = (measurementSystem === "metric") ? "km/h" : "mph";

    return (
        <div className="SelectedWeatherInfo">
            <div className="SelectedWeatherInfo_city">{locationData.city}</div>
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
                        <div className="SelectedWeatherInfo_description">{weatherData.description}</div>
                        <div className="SelectedWeatherInfo_details flex flex-column align-items-flex-end">
                            <div>Precipitation: {weatherData.precipitation}%</div>
                            <div>Humidity: {weatherData.humidity}%</div>
                            <div>Wind: {weatherData.windSpeed} {speedUnit}</div>
                        </div>
                    </div>
                    <WeatherIcon iconCode={weatherData.iconCode}/>
                </div>
            </div>
        </div>
    );
}
