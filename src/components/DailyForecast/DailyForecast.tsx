import React, { useMemo } from "react";
import WeatherIcon from "$components/WeatherIcon";
import { Callback, DailyWeatherData } from "$types/common";
import "./DailyForecast.scss";

type PropsType = {
    weatherData: DailyWeatherData[];
}

export default function DailyForecast(props: PropsType) {
    const { weatherData } = props;

    const rows = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.entries()) {
            const { weekday, icon, maxTemperature, minTemperature } = data;
            result.push(
                <div className="DailyForecast_row" key={index}>
                    <span className="DailyForecast_weekday">{weekday}</span>
                    <span className="DailyForecast_icon"><WeatherIcon iconCode={icon} className="WeatherIcon"/></span>
                    <span className="DailyForecast_maxTemp">{maxTemperature}&#x00B0;</span>
                    <span className="DailyForecast_minTemp">{minTemperature}&#x00B0;</span>
                </div>
            );
        }
        return result;
    }, [weatherData]);

    return (
        <div className="DailyForecast">
            {rows}
        </div>
    );
}
