import React from "react";
import WeatherIcon from "$components/WeatherIcon";
import { WeatherData } from "$src/fetchWeatherData";
import { useClasses, serializeClasses } from "./useClasses";
import "./WeatherDetails.scss";

type PropsType = {
    weatherData: WeatherData;
};

export default function WeatherDetails(props: PropsType) {
    const { description, icon, precipitation, humidity, windSpeed, currentTemperature } = props.weatherData.current;
    const city = props.weatherData.city;

    const { classes, setClasses } = useClasses();

    return (
        <div className={serializeClasses(classes)}>
            <WeatherIcon src={icon} />
            <span className="WeatherDetails_temperature">
                {currentTemperature}
            </span>
            <span className="WeatherDetails_temperatureSelector">
                ºC | ºF
            </span>
            <div className="WeatherDetails_extra">
                <span>Precipitation: {precipitation}%</span>
                <span>Humidity: {humidity}%</span>
                <span>Wind: {windSpeed} km/h</span>
            </div>
            <div className="WeatherDetails_location">
                <span className="WeatherDetails_city">{city}</span>
                <span>Wednesday 20:20</span>
                <span>{description}</span>
            </div>
        </div>
    );
}
