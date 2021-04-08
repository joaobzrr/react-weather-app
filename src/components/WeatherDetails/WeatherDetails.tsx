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
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import "./WeatherDetails.scss";

type PropsType = {
    weatherData: WeatherData;
    selectedWeatherData: SelectedWeatherData;
};

export default function WeatherDetails(props: PropsType) {
    const { weatherData, selectedWeatherData } = props;
    const { city } = weatherData;
    const { description, iconCode, precipitation, humidity, windSpeed } = selectedWeatherData;

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
            <div className="WeatherDetails_city">{city}</div>
            <div className="WeatherDetails_inner">
                <div className="WeatherDetials_left">
                    <span className="WeatherDetails_temperature">
                        {temperature}º
                    </span>
                </div>
                <div className="WeatherDetails_right">
                    <div className="WeatherDetails_extra">
                        <div className="WeatherDetails_description">{description}</div>
                        <div className="WeatherDetails_rest">
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
