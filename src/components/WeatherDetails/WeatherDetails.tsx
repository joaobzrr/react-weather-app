import React from "react";
import { serializeClasses } from "@bzrr/useclasses";
import WeatherIcon from "$components/WeatherIcon";
import { WeatherData } from "$services/fetchWeatherData";
import useClasses from "./useClasses";
import "./WeatherDetails.scss";

type PropsType = {
    weatherData: WeatherData;
};

export default function WeatherDetails(props: PropsType) {
    const { description, icon, precipitation, humidity, windSpeed, temperature } = props.weatherData.current;
    const city = props.weatherData.city;

    const { classes, setClasses } = useClasses();

    return (
        <div className={serializeClasses(classes)}>
            <WeatherIcon src={icon} />
            <span className="WeatherDetails_temperature">
                {temperature}
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
