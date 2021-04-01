import React, { useMemo } from "react";
import { serializeClasses } from "@bzrr/useclasses";
import WeatherIcon from "$components/WeatherIcon";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData,
    SelectedWeatherData
} from "$services/WeatherData";
import useClasses from "./useClasses";
import { getWeekDayNameFromDate } from "$src/utils";
import "./WeatherDetails.scss";

type PropsType = {
    weatherData: WeatherData;
    selectedWeatherData: SelectedWeatherData;
};

export default function WeatherDetails(props: PropsType) {
    const { weatherData, selectedWeatherData } = props;
    const { city } = weatherData;
    const { description, icon, precipitation, humidity, windSpeed } = selectedWeatherData;

    const [temperature, weekDayName] = useMemo(() => {
        let temp;
        if (selectedWeatherData instanceof CurrentWeatherData) {
            temp = (selectedWeatherData as CurrentWeatherData).temperature;
        } else {
            temp = (selectedWeatherData as ForecastedWeatherData).maxTemperature;
        }

        const day = getWeekDayNameFromDate(selectedWeatherData.dt);

        return [temp, day];
    }, [selectedWeatherData]);

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
                <span>{weekDayName} 20:20</span>
                <span>{description}</span>
            </div>
        </div>
    );
}
